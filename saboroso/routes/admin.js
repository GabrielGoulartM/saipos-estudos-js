var express = require('express');
var users = require('../inc/users');
var router = express.Router();

/* ========================================================
   MIDDLEWARE A NÍVEL DE ROTEADOR (Controle de Acesso)
   ======================================================== */
router.use(function(req, res, next) {

    // Se a requisição for para a página ou rota de login, libera direto
    if (req.url.includes('/login')) {
        return next();
    }

    // Se não houver sessão ou usuário logado no Redis, joga para o login
    if (!req.session || !req.session.user) {
        return res.redirect('/admin/login');
    }

    // Usuário autenticado, segue para a rota desejada
    next();
});

/* ========================================================
   ROTAS DE AUTENTICAÇÃO (Login)
   ======================================================== */

/* Tela de Login (GET) */
router.get('/login', function(req, res, next) {
    users.render(req, res, null);
});

/* Processamento do Login (POST) */
router.post("/login", function(req, res, next) {

    if (!req.body.email) {
        users.render(req, res, "Preencha o campo e-mail.");
    } else if (!req.body.password) {
        users.render(req, res, "Preencha o campo senha.");
    } else {
        
        users.login(req.body.email, req.body.password).then(user => {
            
            // Salva o objeto do usuário na sessão do Redis
            req.session.user = user;
            
            // Zera o contador de visitas temporário após logar
            if (req.session.views) req.session.views = 0;
            
            res.redirect("/admin");

        }).catch(err => {
            users.render(req, res, err.message || err);
        });

    }
});

/* ========================================================
   ROTAS DO PAINEL ADMINISTRATIVO (Protegidas)
   ======================================================== */

/* Dashboard Principal */
router.get('/', function(req, res, next) {
    res.render('admin/index', {
        // dados gerais do sistema
    });
});

/* Gerenciamento de Contatos */
router.get('/contacts', function(req, res, next) {
    res.render('admin/contacts', {
        // listagem de mensagens recebidas
    });
});

/* Lista de E-mails / Newsletter */
router.get('/emails', function(req, res, next) {
    res.render('admin/emails', {
        // leads cadastrados
    });
});

/* Controle do Cardápio */
router.get('/menus', function(req, res, next) {
    res.render('admin/menus', {
        // pratos e valores cadastrados
    });
});

/* Gestão de Reservas */
router.get('/reservations', function(req, res, next) {
    res.render('admin/reservations', {
        // controle de mesas ocupadas
    });
});

/* Controle de Usuários / Admins */
router.get('/users', function(req, res, next) {
    res.render('admin/users', {
        // permissões de acesso
    });
});

module.exports = router;