var conn = require('./db'); // Garante a importação do banco de dados

module.exports = {

    render(req, res, error, success) { // Adicionado o parâmetro error e corrigido success

        res.render('contacts', {
            title: 'Contato - Restaurante Saboroso!',
            background: '/images/img_bg_3.jpg',
            h1: 'diga um oi',
            body: req.body,
            isHome: false,
            error,
            success //  Nome da variável ajustado
        });
    }, //  Fechamento do método render

    save(fields) {

        return new Promise((resolve, reject) => {

            // Adicionado crases para envolver a string SQL e corrigido o nome da tabela para tb_contacts
            conn.query(`
                INSERT INTO tb_contacts (name, email, message) VALUES (?, ?, ?)
            `, [
                fields.name,
                fields.email,
                fields.message
            ], (err, results) => {
                
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
                
            }); //  Fechamento correto do callback da query

        }); //  Fechamento da Promise
    } //  Fechamento do método save

}; //  Fechamento do module.exports