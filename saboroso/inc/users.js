var conn = require('./db');

module.exports = {

    render(req, res, error) {
        // CORRIGIDO: Objeto de dados envelopado corretamente dentro do res.render
        res.render("admin/login", {
            body: req.body,
            error
        });
    }, // CORRIGIDO: Adicionada a vírgula para separar os métodos do objeto

    login(email, password) {

        return new Promise((resolve, reject) => {

            conn.query(`
                SELECT * FROM tb_users WHERE email = ? AND password = ?
            `, [
                email,
                password
            ], (err, results) => {
                
                if (err) {
                    reject(err);
                } else {
                    
                    // CORRIGIDO: Se a busca trouxe resultados, o login está correto
                    if (results.length > 0) {    
                        
                        let row = results[0];
                        resolve(row); // Retorna os dados do usuário autenticado

                    } else {
                        
                        // Se não encontrou nenhum registro com aquele e-mail e senha
                        reject("Usuário ou senha incorretos.");

                    }
                }
                
            });

        });
    }

};