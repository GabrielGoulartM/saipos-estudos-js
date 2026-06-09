// Importa a conexão com o banco de dados
const conn = require('./db');

module.exports = {

    // Método que busca as contagens para os blocos da Dashboard
    dashboard() {
        return new Promise((resolve, reject) => {
            
            // A query do seu print do MySQL
            const query = `
                SELECT 
                    (SELECT COUNT(*) FROM tb_contacts) AS nrcontacts,
                    (SELECT COUNT(*) FROM tb_menus) AS nrmenus,
                    (SELECT COUNT(*) FROM tb_reservations) AS nrreservations,
                    (SELECT COUNT(*) FROM tb_users) AS nrusers;
            `;

            conn.query(query, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    // results[0] pega a primeira (e única) linha de resposta que o banco traz
                    resolve(results[0]);
                }
            });

        });
    }, // <-- Vírgula adicionada para separar o dashboard() do próximo método!

    // Método que junta os parâmetros padrão com os específicos de cada rota
    getParams(req, params) {

        return Object.assign({}, {
            menus: req.menus,
            user: req.session.user,
        }, params);

    }, 
        
    // Método que gera a lista de menus dinâmicos com a classe active automática
    getMenus(req) {    
        let menus = [
            { text: "Tela Inicial", href: "/admin", icon: "home" },
            { text: "Menu", href: "/admin/menus", icon: "cutlery" },
            { text: "Reservas", href: "/admin/reservations", icon: "calendar-check-o" },
            { text: "Contatos", href: "/admin/contacts", icon: "comments" },
            { text: "Usuários", href: "/admin/users", icon: "users" },
            { text: "E-mails", href: "/admin/emails", icon: "envelope" }
        ];

        // Mágica do MAP: Injeta a propriedade 'active' avaliando a URL atual
        return menus.map(menu => {
            return {
                text: menu.text,
                href: menu.href,
                icon: menu.icon,
                active: req.url.includes(menu.href)
            };
        });
    }

};