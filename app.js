var express = require('express');
var bodyparser = require('body-parser');
var _ = require('underscore');
var moment = require('moment');
var app = express();
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var ObjectID = require('mongodb').ObjectID;

// ***** DB Connection **** //

function wrapdb( db ) {
	return {
		suppliers: function () {
			return db.collection('suppliers');
		},
		close: function() {
			db.close();
		}
	};
}

function dbInstance (callback) {
	if ( process.env.MONGOLAB_URI ) {
		Db.connect( process.env.MONGOLAB_URI, function(err, db) {
			if( err ) throw err;
			callback(wrapdb(db));
		});
	} else {
		var options = {safe: true, strict: true, fsync:false, journal:true};
		var db = new Db('json_supplier', new Server('127.0.0.1', 27017, {}), options);
		db.open(function (err, db) {
			if( err ) throw err;
			callback(wrapdb(db));
		});
	}
}

// ***** REPOSITORIES **** //
var JsonRepository = function (db) {
	return {
		load: function (url, action, success, failure) {
			db.suppliers().findOne({_id: url, action: action}, function (err, supplier) {
				if ( err ) { failure(500, 'db.load.failed'); }
				else if (supplier) { success(supplier); }
				else { failure(404, 'db.load.object.not.found'); }
			});			
		},
		save: function (supplier, success, failure) {
			var query = {_id: supplier.url, action: supplier.action};
			var sort = [['_id','1']];
			var options = {upsert:true, 'new':true};
			var update = supplier;

			db.suppliers().findAndModify(query, sort, update, options, function (err, supplier) {
				if (err) { failure(500, 'db.save.failed'); }
				else { success(supplier); }
			});			
		}
	};
};

// ***** MIDDLEWARE **** //

function loadRepositories(req, res, next) {
	dbInstance(function(db) {
		req.jsonRepository = new JsonRepository(db);
		res.on('finish', function() {
			db.close();
		});
		next();
	});
}

function isValidJSON(data) {
	try {
		JSON.parse(data);
		return true;
	} catch (e) {
		return false;
	}
}

function validateJsonData(req, res, next) {
	console.log("Validating json: ");
	console.log(req.body);

	var supplier = req.body;
	req.supplier = {};
	if (!isValidJSON(supplier.data)) {
		res.status(400).json({error: 'invalid.json.data'});
	} else if (!isValidJSON(supplier.headers)) {
		res.status(400).json({error: 'invalid.headers'});
	} else if (_.isNaN(supplier.code) || !_.isFinite(supplier.code) || !_.isNumber(supplier.code)) {
		res.status(400).json({error: 'invalid.response.code'});
	} else if (_.isEmpty(supplier.url)) {
		res.status(400).json({error: 'invalid.url'});
	} else {
		req.supplier.url = supplier.url;
		req.supplier.data = JSON.stringify(supplier.data);
		req.supplier.headers = JSON.stringify(supplier.headers);
		req.supplier.action = supplier.action;
		req.supplier.code = supplier.code;
		req.supplier.echo = supplier.echo;

		next();
	}
}

function validateEndpoint(req, res, next) {
	console.log("Validating url: " + req.params[0]);
	var json_url = req.params[0];
	if (_.isEmpty(json_url)) {
		res.status(400).json({error: 'invalid.url'});
	} else {
		req.json_url = json_url;
		next();
	}
}

// ***** ENPOINT **** //

app.use(
	bodyparser.json({})
).use(
	express.static('./public')
).get('/', function (req, res) {
	res.sendfile('./public/views/index.html');
}).post('/', loadRepositories, validateJsonData, function (req, res) {
	req.jsonRepository.save(req.body, function (supplier) {
		res.status(200).json(req.supplier);
	}, function (code, error) {
		res.status(code).json({error: error});
	})
}).put('/', function (req, res) {
	res.status(403).json({ message: 'Nice Try' });
}).delete('/', function (req, res) {
	res.status(403).json({ message: 'Nice Try'});
}).all('/*', validateEndpoint, loadRepositories, function (req, res) {
	req.jsonRepository.load(req.json_url, req.method, function (supplier) {
		var headers = JSON.parse(supplier.headers);
		var data = supplier.echo ? req.body : JSON.parse(supplier.data);
		res.status(supplier.code).set(headers).json(data);
	}, function (code, error) {
		res.status(code).json({error: error});
	});
}).listen(process.env.PORT || 5001);
