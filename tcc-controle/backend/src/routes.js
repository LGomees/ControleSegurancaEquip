const express = require('express');
const SessionController = require('./controllers/SessionController');
const MovementController = require('./controllers/MovementController');
const DashboardController = require('./controllers/DashboardController');

const routes = express.Router();

// SESSION - Rota para criar usuário novo
routes.post('/sessions', SessionController.store);

// MOVEMENT - Rota para criar retirada de equipamento
routes.post('/movimentacao/retiradaUrgente', MovementController.storeU);

// MOVEMENT - Rota para criar retirada de equipamento
routes.post('/movimentacao/retiradaNaoUrgente', MovementController.store);

// MOVEMENT - Rota para listar retiradas sem devolução e sem caso de urgência (listar todas as retiradas feitas independente da pessoa)
routes.get('/movimentacao/devolucaoNaoUrgente', MovementController.index);

// MOVEMENT - Rota para listar retiradas ESPECÍFICAS sem devolução e sem caso de urgência
routes.get('/movimentacao/devolucaoNaoUrgenteId/', MovementController.indexI);

// MOVEMENT - Rota para atualizar retiradas ESPECÍFICAS com sua devolução e sem caso de urgência
routes.put('/movimentacao/finalizaDevolucao', MovementController.update);

// DASHBOARD - Rota para listar retiradas em caso de urgência (listar apenas retiradas feitas pela própria pessoa)
routes.get('/movimentacao/devolucaoUrgente', DashboardController.show);

module.exports = routes;