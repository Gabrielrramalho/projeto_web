const express = require('express');
const mustacheExpress = require('mustache-express');
const db = require('./src/db');




const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views',__dirname+'/src/views');

app.use(express.urlencoded({extended: true}));

app.use('/',require('./src/routes/pessoaRoutes'));
app.use('/', require('./src/routes/indexRutes'));


db.sync({ force: true }).then(() => {
    console.log('Tabelas criadas');
  }).catch((error) => {
    console.error('Erro ao criar tabelas:', error);
  });

const app_porta = 8000;

app.listen(app_porta,function(){
    console.log("App Rodando na porta"+app_porta+"!!");
})
