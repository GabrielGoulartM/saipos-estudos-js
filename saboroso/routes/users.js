var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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
