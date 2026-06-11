var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Biblio do fomidable
var formidable = require('formidable');
var path = require('path');

// Pacotes para a Sessão com Redis
var session = require('express-session');
var { RedisStore } = require('connect-redis');
var { createClient } = require('redis');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();


app.use(function (req, res, next) {
  if (req.method === 'POST' && req.url === '/admin/prato/salvar') {
    const form = new formidable.IncomingForm({
      uploadDir: path.join(__dirname, 'public/images'), // Pasta onde as imagens serão salvas
      keepExtensions: true // Mantém a extensão original do arquivo
    });

    form.parse(req, function (err, fields, files) {
      if (err) {
        return next(err);
      }

      req.fields = fields; // Campos do formulário
      req.files = files;   // Arquivos enviados

      next(); // Passa para a próxima etapa do processamento da requisição
    });
  } else {
    next(); // Para outras rotas, segue normalmente
  }
});


//  Cria o cliente e conecta
const redisClient = createClient();
redisClient.connect().catch(console.error);

// Initialize store.
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "saboroso:", // Tag para organizar as chaves no Redis
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//  Ativa o Redis no Express
app.use(session({
    store: redisStore,
    secret: 'senha-secreta-do-restaurante', // Chave para criptografar o cookie
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // Sessão dura 1 hora
}));

// 4Middleware específico para a rota /admin/login
app.use('/admin/login', function(req, res, next) {
    // Se não existir o contador na sessão, começa com 0
    if (!req.session.views) {
        req.session.views = 0;
    }
    
    // Incrementa +1 a cada F5
    req.session.views++;
    
    // Mostra no terminal do VS Code para você ver funcionando
    console.log(`[REDIS TEST] Você acessou a tela de login ${req.session.views} vezes nesta sessão!`);
    
    next(); // Passa o bastão para a rota real carregar o HTML
});

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;