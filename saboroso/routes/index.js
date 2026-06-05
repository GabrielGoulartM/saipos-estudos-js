var conn = require('./../inc/db');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  conn.query(`
      SELECT * FROM tb_menus ORDER BY title  
    `, (err, results) => {

      // SE DER ERRO: Mostra o erro e PARA TUDO (não tenta renderizar a página)
      if (err) {
        console.log("ERRO NO BANCO:", err);
        return res.send("Ocorreu um erro ao buscar os menus no banco de dados.");
      }

      // SE DEU TUDO CERTO: O return ali de cima não foi chamado, então renderiza a página
      res.render('index', {
          title: 'Restaurante Saboroso!', 
          menus: results
      });
      
    });

});

/* GET menus page. */
router.get('/menus', function(req, res, next) {
  
    // Fazemos a mesma busca no banco de dados para a página de menus
    conn.query(`
        SELECT * FROM tb_menus ORDER BY title  
    `, (err, results) => {

        if (err) {
            console.log("ERRO NO BANCO:", err);
            return res.send("Ocorreu um erro ao buscar os menus no banco de dados.");
        }

        // Renderiza o arquivo views/menus.ejs (ou view/menu.ejs dependendo de como você nomeou)
        res.render('menus', {
            title: 'Nossos Menus - Restaurante Saboroso!', 
            menus: results
        });
      
    });
});

module.exports = router;