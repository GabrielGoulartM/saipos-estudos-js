var express = require('express');
const formidable = require('formidable');
const path = require('path');
var users = require('../inc/users');
var admin = require('../inc/admin'); 
var router = express.Router();
var menus = require('../inc/menus'); // Importa o módulo de menus para usar na middleware

/* ========================================================
   MIDDLEWARE A NÍVEL DE ROTEADOR (Controle de Acesso)
   ======================================================== */
router.use(function(req, res, next) {

    // Se a requisição for para a página ou rota de login, libera direto
    if (req.url.includes('/login')) {
        return next();
    }

    // Se não houver sessão ou usuário logado no Redis, joga para o login
    if (!req.session || !req.session.user) {
        return res.redirect('/admin/login');
    }

   
    req.menus = admin.getMenus(req);

    // Usuário autenticado, segue para a rota desejada
    next();
});

/* ========================================================
   ROTAS DE AUTENTICAÇÃO (Login)
   ======================================================== */

/* Tela de Login (GET) */
router.get('/login', function(req, res, next) {
    users.render(req, res, null);
});

/* Processamento do Login (POST) */
router.post("/login", function(req, res, next) {

    if (!req.body.email) {
        users.render(req, res, "Preencha o campo e-mail.");
    } else if (!req.body.password) {
        users.render(req, res, "Preencha o campo senha.");
    } else {
        
        users.login(req.body.email, req.body.password).then(user => {
            
            // Salva o objeto do usuário na sessão do Redis
            req.session.user = user;
            
            // Zera o contador de visitas temporário após logar
            if (req.session.views) req.session.views = 0;
            
            res.redirect("/admin");

        }).catch(err => {
            users.render(req, res, err.message || err);
        });

    }
});

/* ========================================================
   ROTAS DO PAINEL ADMINISTRATIVO (Protegidas)
   ======================================================== */

/* Dashboard Principal */


router.get('/', async function(req, res, next) {

    try {
        // 2. BUSCA OS DADOS DO BANCO (dashboard retorna a Promise)
        const dashboardData = await admin.dashboard();

        // 3. PASSA OS DADOS dentro do segundo parâmetro do getParams
        res.render('admin/index', admin.getParams(req, {
            data: dashboardData
        }));

    } catch (err) {
        // Se houver algum erro no banco de dados, joga para a tela de erro do Express
        next(err);
    }

});

/* Gerenciamento de Contatos */
router.get('/contacts', function(req, res, next) {
    // menus e user injetados de forma limpa automaticamente!
    res.render('admin/contacts', admin.getParams(req));
});

/* Lista de E-mails / Newsletter */
router.get('/emails', function(req, res, next) {
    res.render('admin/emails', admin.getParams(req));
});

/* Controle do Cardápio */
router.get('/menus', function(req, res, next) {
    
    menus.getMenus().then(results => {          
        res.render('admin/menus', admin.getParams(req, {
            data: results // Injeta a lista de pratos do banco no template!
        }));
    }).catch(err => {
        next(err); // Trata o erro caso o banco falhe
    });

}); // <-- fecha o .then e a rota do Express !

router.post('/menus', function(req, res, next) {

    // 1. Configura o Formidable para receber a foto e salvar na pasta certa
    let form = new formidable.IncomingForm({
        uploadDir: path.join(__dirname, '/../public/images'), // caminho para a pasta de imagens do seu projeto
        keepExtensions: true // mantém o .jpg ou .png original
    });

    // 2. Parseia a requisição (separa os textos dos arquivos binários)
    form.parse(req, function(err, fields, files) {

        if (err) {
            return res.status(500).send(err);
        }

       
            menus.save(fields, files)
            .then(results => {
                res.send(results);
            })
            .catch(err => {
                // 👇 ADICIONE ESSA LINHA PARA O ERRO APARECER NO TERMINAL:
                console.error("❌ ERRO NO BANCO DE DADOS:", err); 
                
                res.status(500).send(err);
            });

    });

});

/* Gestão de Reservas */
router.get('/reservations', function(req, res, next) {
    // Como essa rota precisa do objeto "date" específico dela, 
    // passamos ele como segundo parâmetro e o Object.assign junta tudo!
    res.render('admin/reservations', admin.getParams(req, {
        date: {
            start: '',
            end: ''
        }
    }));
})

/* Controle de Usuários / Admins */
router.get('/users', function(req, res, next) {
    res.render('admin/users', admin.getParams(req));
});

module.exports = router;