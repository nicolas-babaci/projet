'use strict';

const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
const ent = require('ent');

const cookieParser = require('cookie-parser');
const session = require('express-session');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb+srv://mongodb:Junta08+@cluster0-qyuut.mongodb.net/test?retryWrites=true';
const dbName = 'projet-back';

//pour analyser le corps de la requete
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

app.use(cookieParser());
app.use(session({
    secret: '1234',
    saveUninitialized: false,
    resave: false
}));

// Gestion des fichiers statiques
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/src', express.static(__dirname + '/src'));
app.use('/jeux', express.static(__dirname + '/jeux'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/jeux_cv', express.static(__dirname + '/jeux_cv'));
app.use('/deco', express.static(__dirname + '/images/deco'));

// Utilisation de pug
app.set('view engine', 'pug');

// Gestion des routes
app.get('/', function (req, res, next) {
    res.render('accueil');
});

app.get('/jeux', function (req, res, next) {
    res.render('jeux');
});

app.get('/score', function (req, res, next) {
    res.render('jeux');
});

app.get('/jeux-reseaux', urlencodedParser, function (req, res, next) {
    // Connection au serveur de bases de données
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        // Demande d'une base de données
        const db = client.db(dbName);
        // Obtention d'une collection de la base de données
        const collection = db.collection('users');

        collection.find({}).toArray(function (err, data) {
            for (var i = 0; i < data.length; i++) {
                if (req.query.pseudo === data[i].identifiant) {
                    client.close();
                    res.render('jeux-reseaux', {
                        pseudo: req.query.pseudo,
                        score: req.query.score,
                        data: data
                    });  
                };
            }; // boucle for
        });
        collection.find({identifiant: req.body.id}).toArray(function(err, data){
            if(data.length === 0){
                client.close();
                res.render('jeux', {message:'Ce pseudo n\'existe pas !'});
            };
        });
    });
});

app.get('/jeux-cv', function (req, res, next) {
    res.render('jeux-cv');
});

app.get('/cv', function (req, res, next) {
    res.render('cv');
});

app.get('/inscription', function (req, res, next) {
    res.render('inscription');
});

app.get('/inscription/:id', function (req, res, next) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection('users');
        const id = new ObjectId(req.params.id);
        collection.find({
            _id: id
        }).toArray(function (err, data) {
            client.close();
            res.render('inscription', {
                data: data
            });
        });
    });
});

app.get('/liste-users', function (req, res, next) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection('users');
        collection.find({}).sort({score: -1}).toArray(function (err, data) {
        // collection.find({}).sort(function(a,b){
        //     a.score - b.score
        // }).toArray(function (err, data) {
            client.close();
            res.render('liste-users', {
                data: data
            });
        });
    });
});

app.post('/liste-users', function (req, res, next) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection('users');
        collection.find({identifiant: req.body.id}).toArray(function(err, data){
            if(data.length === 1){
              res.render('inscription', {message:'Ce Pseudo existe déjà !'});
            }else{
                collection.insertOne({
                    identifiant: req.body.id,
                    prenom: req.body.prenom,
                    nom: req.body.nom,
                    mdp: req.body.mdp,
                    score: 0
                }, function (err, result) {
                    if (err) {
                        res.status(503);
                        next();
                    };
                    client.close();
                    res.render('inscription', {
                        message: req.body.id + ' a été ajouté !'
                    });
                });
            };
        });    
    });
});

app.post('/inscription', function (req, res, next) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection('users');
        const id = new ObjectId(req.body.idmongo);
        collection.updateOne({
            _id: id
        }, {
            $set: {
                identifiant: req.body.id,
                prenom: req.body.prenom,
                nom: req.body.nom,
                mdp: req.body.mdp
            }
        }, function (err, result) {
            if (err) {
                res.status(503);
                next();
            };
            client.close();
            res.render('inscription', {
                message: req.body.id + ' a été modifié !'
            });
        });
    });
});

app.use(function (req, res, next) {
    if (res.statusCode == 503) {
        res.render('503');
    } else {
        res.status(404).render('404');
    };
});

let persos = {};

io.sockets.on('connection', function (socket, pseudo, score) {

    socket.on('new_utilisateur', function (pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('new_utilisateur', pseudo);
    });

    socket.on('message', function (message) {
        message = ent.encode(message);
        socket.broadcast.emit('message', {
            pseudo: socket.pseudo,
            message: message
        });
    });

    socket.on('disconnect', function () {
        socket.broadcast.emit('utilisateur_parti', socket.pseudo);
    });

    socket.on('score', function(score, pseudo, req, res, next) {
        MongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, client) {
            const db = client.db(dbName);
            const collection = db.collection('users');

            collection.find({identifiant: pseudo}).toArray(function (err, data) {

                for (var i = 0; i < data.length; i++) {
                    if (pseudo === data[i].identifiant) {

                        collection.updateOne({
                            identifiant: pseudo
                        }, {
                            $set: {
                                score: parseFloat(score)
                            }
                        }, function (err, result) {
                            if (err) {
                                res.status(503);
                                next();
                            };
                            client.close();
                        });
                    };
                }; // boucle for
            });
        });
    });

    let perso = {
        top: '540px',
        left: '200px'
    };

    socket.emit('personnage', perso);

    socket.on('deplacement', function (code) {
        persos[perso.id] = perso;
        io.emit('personnage', perso);
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8888;
};

http.listen(port);