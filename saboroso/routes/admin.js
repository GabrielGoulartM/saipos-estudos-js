var express = require('express');
var users = require('../inc/users');
var router = express.Router();

/* Dashboard Principal */
router.get('/', function(req, res, next) {
    res.render('admin/index', {});
});

/* Autenticação do Usuário */
router.post("/login", function(req, res, next) {

    if (!req.body.email) {
        users.render(req, res, "Preencha o campo e-mail.");
    } else if (!req.body.password) {
        users.render(req, res, "Preencha o campo senha.");
    } else {
        users.login(req.body.email, req.body.password).then(user => {
            req.session.user = user;
            res.redirect("/admin");
        }).catch(err => {
            users.render(req, res, err.message || err);
        });
    }

}); // CORRIGIDO: Fechamento completo do router.post

/* Tela de Login */
router.get('/login', function(req, res, next) {
    users.render(req, res, null);
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