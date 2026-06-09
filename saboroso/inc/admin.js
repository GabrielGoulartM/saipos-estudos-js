module.exports = {

    // Retorna a lista de menus para o painel
    getMenus(req) {    
        return [
            {
                text: "Tela Inicial",
                href: "/admin",
                icon: "home",
                active: (req.url === '/' || req.url === '/admin')
            },
            {
                text: "Menu",
                href: "/admin/menus",
                icon: "cutlery",
                active: req.url.includes('/menus')
            },
            {
                text: "Reservas",
                href: "/admin/reservations",
                icon: "calendar-check-o",
                active: req.url.includes('/reservations')
            },
            {
                text: "Contatos",
                href: "/admin/contacts",
                icon: "comments",
                active: req.url.includes('/contacts')
            },
            {
                text: "Usuários",
                href: "/admin/users",
                icon: "users",
                active: req.url.includes('/users')
            },
            {
                text: "E-mails",
                href: "/admin/emails",
                icon: "envelope",
                active: req.url.includes('/emails')
            }
        ];
    }

};