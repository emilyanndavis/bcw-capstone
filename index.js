;(function(){

    let express = require('express'),
        bodyParser = require('body-parser'),
        server = express(),
        routes = require('./server_assets/routes/route-index'),
        port = process.env.PORT || 4200;

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({extended: true}));

    server.use('/', express.static(`${__dirname}/public`));

    server.use('/api', routes.router);

    server.listen(port, function(){
        console.log(`Populating the foothills on port ${port}`);
    });

}());