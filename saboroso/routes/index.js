var conn = require('./../inc/db');
var express = require('express');
var router = express.Router();
var reservations = require('./../inc/reservations');
var contacts = require('./../inc/contacts');

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
    contacts.render(req, res);
});

router.post('/contacts', function(req, res, next) {
    
    if (!req.body.name) {
        contacts.render(req, res, "Digite o nome");
    } else if (!req.body.email) {
        contacts.render(req, res, "Digite o e-mail");
    } else if (!req.body.message) {
        contacts.render(req, res, "Digite a mensagem");
    } else {
        
        // Chama o método que salva no MySQL retornando a Promise
        contacts.save(req.body).then(results => {  

            // CORRIGIDO: Nome da variável ajustado para contacts e limpando o form no sucesso
            req.body = {}; 
            contacts.render(req, res, null, "Contato enviado com sucesso!");

        }).catch(err => {

            // CORRIGIDO: Fechamento do bloco catch tratando o erro do banco de dados
            contacts.render(req, res, err.message);

        }); // <-- Parênteses e chaves do .then().catch() fechados aqui

    }

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
            
            //Se salvou com sucesso, limpa o formulário e manda a mensagem verde
            req.body = {}; // Limpa os campos para o formulário não vir preenchido
            reservations.render(req, res, null, "Reserva realizada com sucesso!");

        }).catch(err => {
            
            // Se o banco falhar, devolve o erro para a tela
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