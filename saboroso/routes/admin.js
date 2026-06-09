var express = require('express');
var router = express.Router();

/* Dashboard Principal */
router.get('/', function(req, res, next) {
    
    res.render('admin/index', {
        
    });

});

/* Tela de Login */
router.get('/login', function(req, res, next) {
    
    res.render('admin/login', {
        
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