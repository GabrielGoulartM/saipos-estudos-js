var conn = require('./db');

module.exports = {

    render(req, res, error, success) {

        res.render('reservations', {
            title: 'Reservas - Restaurante Saboroso!',
            background: '/images/img_bg_2.jpg',
            h1: 'Reserve uma mesa!',
            body: req.body,
            error
        });
    },

    save(fields) {
        
        return new Promise((resolve, reject) => {

            // Aqui você quebra a string '30/06/2026'
            let date = fields.date.split('/');
            // E aqui você monta '2026-06-30'
            date = `${date[2]}-${date[1]}-${date[0]}`;
            
            conn.query(`
                INSERT INTO tb_reservations (name, email, people, date, time) VALUES (?, ?, ?, ?, ?)
            `, [
                fields.name,
                fields.email,
                fields.people,
                date, // <-- CORRIGIDO: Agora sim enviando a variável com a data convertida!
                fields.time
            ], (err, results) => {
                
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
                
            });

        }); // Fechamento da Promise
    } // Fechamento do método save

}; // Fechamento do module.exports