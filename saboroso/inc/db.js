const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '192.168.1.6', 
  user: 'node_user',     
  password: '123456', 
  database: 'saboroso',
  port: 3300
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Erro ao conectar ao MySQL:', err.message);
    return;
  }
  console.log('✅ Conectado com sucesso ao banco de dados MySQL na porta 3300!');
});

module.exports = connection;