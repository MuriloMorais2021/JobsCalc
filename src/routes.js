const express = require('express');
const routes = express.Router();
const ProfileController = require('./controllers/ProfileController');
const JobController = require('./controllers/JobController');
const DashBoardController = require('./controllers/DashBoardController');



//rotas, no primeiro parametro recebo a rota e no segundo estou chamando as functions que vão ficar responsaveis por entregar o conteudo, no caso o meu controller
routes.get('/', DashBoardController.index);
routes.get('/perfil', ProfileController.index);
routes.post('/perfil', ProfileController.update);
routes.get('/Novo-Trabalho', JobController.create);
routes.post('/Novo-Trabalho', JobController.save);
routes.get('/Editar-Trabalho/:id', JobController.show);
routes.post('/Editar-Trabalho/delete/:id', JobController.delete);
routes.post('/job/delete/:id', JobController.delete);
routes.post('/Editar-Trabalho/:id', JobController.update);

module.exports = routes;