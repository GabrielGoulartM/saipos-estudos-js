let conn = require('./db');
let path = require('path');

module.exports = {
    getMenus() {
        return new Promise((resolve, reject) => {
            conn.query(
                `SELECT * FROM tb_menus ORDER BY title`,
                (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results);
                }
            );
        });
    },

    save(fields, files) {
    return new Promise((resolve, reject) => {
        
        // 1. CORREÇÃO DE OURO: Verifica se photo é um array. Se for, pega o primeiro item [0]
        let photoFile = Array.isArray(files.photo) ? files.photo[0] : files.photo;

        if (!photoFile) {
            return reject(new Error("Nenhum arquivo de foto foi enviado ou detectado."));
        }

        // 2. Pega o caminho do arquivo (filepath para versões novas, path para antigas)
        let photoPath = photoFile.filepath || photoFile.path;

        if (!photoPath) {
            return reject(new Error("Não foi possível encontrar o caminho do arquivo de foto."));
        }

        // Configura a string que vai salvar no banco
        fields.photo = `images/${path.parse(photoPath).base}`;

        // Limpa os campos de texto caso eles também tenham vindo como array
        let title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
        let description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
        let price = Array.isArray(fields.price) ? fields.price[0] : fields.price;

        conn.query(
            `
            INSERT INTO tb_menus (title, description, price, photo)
            VALUES (?, ?, ?, ?)
            `,
            [
                title,
                description,
                price,
                fields.photo
            ],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            }
        );
    });
}
};