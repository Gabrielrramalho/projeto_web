const express = require('express');
const mustacheExpress = require('mustache-express');
const db = require('./db');


const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views',__dirname+'/src/views');


app.use('/', require('./src/routes/indexRutes'));

db.sync(()=> console.log("Banco de dados conectado!!"));

const app_porta = 8000;

app.listen(app_porta,function(){
    console.log("App Rodando na porta"+app_porta+"!!");
})
