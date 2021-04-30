const productHandler = require('./handlers/functions');

module.exports = [
    {
        method: 'GET',
        path: '/api/v1/evento',
        handler: productHandler.getAll,
    },
    {
        method: 'GET',
        path: '/api/v1/meus-eventos/{id}',
        handler: productHandler.getMeusEventos,
    },
    {
        method: 'GET',
        path: '/api/v1/evento/{id}',
        handler: productHandler.getEventoId,
    },
    {
        method: 'GET',
        path: '/api/v1/user/{id}',
        handler: productHandler.getUserId,
    },
    {
        method: 'POST',
        path: '/api/v1/user',
        handler: productHandler.saveUser
    },
    {
        method: 'POST',
        path: '/api/v1/login',
        handler: productHandler.login
    },
    {
        method: 'POST',
        path: '/api/v1/user/update/{id}/{id_evento}',
        handler: productHandler.addEventoEmUser
    },
    {
        method: 'POST',
        path: '/api/v1/evento',
        handler: productHandler.addEvento
    },
    {
        method: 'POST',
        path: '/api/v1/add-meu-evento',
        handler: productHandler.addMeuEvento
    }
]
