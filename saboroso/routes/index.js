var conn = require('./../inc/db');
var express = require('express');
var router = express.Router();
var reservations = require('./../inc/reservations');

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
    // Agora a variável aponta para o nome correto com 'r'
    reservations.render(req, res);
});

/* ================================
   ROTA: RESERVAS VIA POST (Reservations via POST)
   ================================ */
router.post('/reservations', function(req, res, next) {
    
    if (!req.body.name) {
        reservations.render(req, res, "Digite o nome");
    } else if (!req.body.email) {
        reservations.render(req, res, "Digite o e-mail");
    } else if (!req.body.people) {
        reservations.render(req, res, "Selecione o número de pessoas");
    } else if (!req.body.date) {
        reservations.render(req, res, "Selecione a data");
    } else if (!req.body.time) {
        reservations.render(req, res, "Selecione a hora");
    } else {

        // Chama o método que salva no MySQL retornando a Promise
        reservations.save(req.body).then(results => {
            
            // CORRIGIDO: Se salvou com sucesso, limpa o formulário e manda a mensagem verde
            req.body = {}; // Limpa os campos para o formulário não vir preenchido
            reservations.render(req, res, null, "Reserva realizada com sucesso!");

        }).catch(err => {
            
            // CORRIGIDO: Se o banco falhar, devolve o erro para a tela
            reservations.render(req, res, err.message);

        }); 

    }

});

/* ================================
   ROTA: SERVIÇOS (Services)
   ================================ */
router.get('/services', function(req, res, next) {
    res.render('services', {
        title: 'Serviços - Restaurante Saboroso!',
        background: '/images/img_bg_1.jpg',
        h1: 'Um prazer poder servir',
        isHome: false
    });
});

module.exports = router;