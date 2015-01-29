# JSON Supplier
Created this small server just so I don't have to wait for my backend guys to finish delivering on a working back end. I can code to a URL and work with real JSON responses, and can even send the backend guys what my models look like

## Building
Requires node, mongo db (running locally), and bower

1. `npm install`
2. `bower install`
3. `npm start`
4. Go to `http://localhost:5001`

Note, if you're mongo server isnt running, be sure to run `mongod` before anything

## TODO
1. Better validation on the backend, especially for URL path and response codes
2. Improve UI
3. Limit stored JSON data and headers
