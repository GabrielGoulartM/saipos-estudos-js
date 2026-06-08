const mysql = require('mysql2');

const connection = mysql.createPool({
  host: '192.168.1.6', 
  user: 'node_user',     
  password: '123456', 
  database: 'saboroso',
  port: 3300
});

// CORRIGIDO: Para Pool, usamos getConnection para testar se a ponte está funcionando
connection.getConnection((err, conn) => {
  if (err) {
    console.error('❌ Erro ao conectar ao MySQL via Pool:', err.message);
    return;
  }
  console.log('✅ Pool de conexões MySQL ativo e pronto na porta 3300!');
  
  // Importante: libera essa conexão de teste de volta para o Pool
  conn.release(); 
});

module.exports = connection;