const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456', // <-- Atualize a senha aqui
  database: 'saboroso'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Erro ao conectar ao MySQL:', err.message);
    return;
  }
  console.log('✅ Conectado com sucesso ao banco de dados MySQL!');
});

module.exports = connection;