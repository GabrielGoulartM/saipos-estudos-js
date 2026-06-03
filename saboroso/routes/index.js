var express = require('express');
var router = express.Router();

// 1. Importando o nosso arquivo de conexão
var db = require('../inc/db'); 

/* GET home page e teste do banco. */
router.get('/', function(req, res, next) {
  
  // 2. Fazendo uma pergunta simples ao banco (Qual a versão do MySQL?)
  db.query('SELECT VERSION() AS versao_mysql', function(err, results) {
    
    // 3. Se der erro, ele avisa no terminal e na tela do navegador
    if (err) {
      console.error("❌ Erro ao buscar dados:", err.message);
      res.status(500).send("Erro de conexão com o banco de dados.");
    } else {
      // 4. Se der certo, ele imprime a resposta do banco na tela do navegador
      res.send({
        mensagem: "Conexão estabelecida com sucesso!",
        dados_do_banco: results
      }); 
    }
    
  });
});

module.exports = router;