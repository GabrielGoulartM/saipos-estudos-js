var conn = require('./../inc/db');
var express = require('express');
var router = express.Router();

/* ================================
   ROTA: HOME (Página Inicial)
   ================================ */
router.get('/', function(req, res, next) {

  conn.query(`
      SELECT * FROM tb_menus ORDER BY title  
    `, (err, results) => {

      if (err) {
        console.log("ERRO NO BANCO:", err);
        return res.send("Ocorreu um erro ao buscar os menus no banco de dados.");
      }

      res.render('index', {
          title: 'Restaurante Saboroso!', 
          menus: results,
          isHome: true
      });
      
    });
});

/* ================================
   ROTA: MENUS
   ================================ */
router.get('/menus', function(req, res, next) {
  
    conn.query(`
        SELECT * FROM tb_menus ORDER BY title  
    `, (err, results) => {

        if (err) {
            console.log("ERRO NO BANCO:", err);
            return res.send("Ocorreu um erro ao buscar os menus no banco de dados.");
        }

        res.render('menus', {
            title: 'Nossos Menus - Restaurante Saboroso!', 
            menus: results,
            background: '/images/img_bg_1.jpg',
            h1: 'Saboreie nosso menu!',
            isHome: false
            
        });
      
    });
});

/* ================================
   ROTA: CONTATOS (Contacts)
   ================================ */
router.get('/contacts', function(req, res, next) {
    // Renderiza o arquivo views/contact.ejs
    res.render('contacts', {
        title: 'Contato - Restaurante Saboroso!',
        background: '/images/img_bg_3.jpg',
        h1: 'diga um oi',
        isHome: false
    });
});

/* ================================
   ROTA: RESERVAS (Reservations)
   ================================ */
router.get('/reservations', function(req, res, next) {
    // Renderiza o arquivo views/reservation.ejs
    res.render('reservations', {
        title: 'Reservas - Restaurante Saboroso!',
        background: '/images/img_bg_2.jpg',
        h1: 'Reserve uma mesa!',
        isHome: false
    });
});

/* ================================
   ROTA: RESERVAS (Reservations)
   ================================ */
router.post('/reservations', function(req, res, next) {
    // Renderiza o arquivo views/reservation.ejs
    res.send('req.body',);
});

/* ================================
   ROTA: SERVIÇOS (Services)
   ================================ */
router.get('/services', function(req, res, next) {
    // Renderiza o arquivo views/services.ejs
    res.render('services', {
        title: 'Serviços - Restaurante Saboroso!',
        background: '/images/img_bg_1.jpg',
        h1: 'Um prazer poder servir',
        isHome: false
    });
});

module.exports = router;