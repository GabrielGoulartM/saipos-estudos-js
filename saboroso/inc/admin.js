module.exports = {

    // Método que junta os parâmetros padrão com os específicos de cada rota
    getParams(req, params) {

        return Object.assign({}, {
            menus: req.menus,
            user: req.session.user,
        }, params);

    }, // <-- CORRIGIDO: Adicionada a vírgula crucial para separar os métodos do objeto!
        
    // Método que gera a lista de menus dinâmicos com a classe active automática
    getMenus(req) {    
        let menus = [
            {
                text: "Tela Inicial",
                href: "/admin",
                icon: "home"
            },
            {
                text: "Menu",
                href: "/admin/menus",
                icon: "cutlery"
            },
            {
                text: "Reservas",
                href: "/admin/reservations",
                icon: "calendar-check-o"
            },
            {
                text: "Contatos",
                href: "/admin/contacts",
                icon: "comments"
            },
            {
                text: "Usuários",
                href: "/admin/users",
                icon: "users"
            },
            {
                text: "E-mails",
                href: "/admin/emails",
                icon: "envelope"
            }
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