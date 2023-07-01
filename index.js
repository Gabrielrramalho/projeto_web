const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const db = require('./src/db');




const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views',__dirname+'/src/views');

app.use(express.urlencoded({extended: true}));

app.use(session({
  secret: 'a2b8c3d4e5',
  name: 'sessionId',
  resave: false,
  saveUninitialized: true
}));

app.use('/',require('./src/routes/movimentoRoutes'));
app.use('/',require('./src/routes/pessoaRoutes'));
app.use('/', require('./src/routes/indexRutes'));
app.use('/',require('./src/routes/contaRoutes'));
app.use('/',require('./src/routes/autenticacaoRoutes'));







db.sync( {}).then(() => {
    console.log('Tabelas criadas');
  }).catch((error) => {
    console.error('Erro ao criar tabelas:', error);
  });

const app_porta = 8000;

app.listen(app_porta,function(){
    console.log("App Rodando na porta"+app_porta+"!!");
})
