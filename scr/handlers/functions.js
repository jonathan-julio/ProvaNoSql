const EventoModel = require('../models/evento')
const UserModel = require('../models/user')

const getAll = async (request, h) => {
    const eventos =  await EventoModel.find({});
    console.log(eventos);
    return eventos;
};
const getMeusEventos = async (req, h) => {
    const id = req.params.id;
    const user = await UserModel.findOne({_id : id});
    const arr = user.meusEventos;
    var eventos = [];
    for (var i = 0; i < arr.length; i++){
        const evento =  await EventoModel.find({_id : arr[i]});
        console.log(evento);
        eventos.push(evento);
    }
    //console.log(eventos[1][0]['longitude2']);
    return eventos;
};

const getEventoId = async (request, h) => {
    const evento =  await EventoModel.find({_id : request.params.id});
    console.log(evento);
    return evento;
};

const addEvento = async (req, h) => {
    const { 
        name ,
        sobre, 
        address1,
        latitude1,
        longitude1, 
        address2 ,
        latitude2,
        longitude2, 
        data1,
        data2,
        dataVotacao,
        hora1,
        hora2,
        publico,
    } = req.payload;
    const product = new EventoModel;
    product.name = name;
    product.sobre = sobre;
    product.address1= address1;
    product.latitude1 = latitude1;
    product.longitude1 = longitude1;
    product.address2= address2;
    product.latitude2 = latitude2;
    product.longitude2 = longitude2;
    product.data1= data1;
    product.data2= data2;
    product.dataVotacao= dataVotacao;
    product.hora1= hora1;
    product.hora2= hora2;
    product.publico = publico;
    try {
        await product.save();
        console.log("_ID : " + String(h.response(product.id)));
        return h.response(product.id).code(200);
    } catch (a) {
        console.log(a);
        return h.response(a).code(404);
    };
};
const saveUser = async (req, h) => {
    const { name , email , senha } = req.payload;
    const product = new UserModel;
    product.name = name;
    product.email = email;
    product.senha = senha;
    await product.save();
    console.log('_ID :' + String(product._id));
    return h.response('_id :' + String(product._id)).code(200);
};
const addEventoEmUser = async (req, h) => {
    const id = req.params.id;
    const id_evento = req.params.id_evento;
    const user = await UserModel.findById({_id : id})
        if (user == undefined){
            return h.response("Usuario não encontrado").code(404);
        }else{
            console.log(user.name);
            if(id_evento){
                var arr = user.eventos;
                arr.push(id_evento);
                function arrayNovo(arr){
                    var tmp = [];
                    for(var i = 0; i < arr.length; i++){
                        if(tmp.indexOf(arr[i]) == -1){
                        tmp.push(arr[i]);
                        }
                    }
                    return tmp;
                }
                user.eventos = arrayNovo(arr);
            }
            try {
                user.save();
                console.log("Evento adicionado em usuario.")
                return h.response().code(200);
            } catch (erro) {
                console.log(erro)
                return h.response(erro).code(404);
            }
        }
};
const addMeuEvento = async (req, h) => {
    try {
        const id = req.payload.id;
        const idEvento = req.payload.idEvento;
        const user = await UserModel.findById({_id : id});
        var arr = user.meusEventos;
        arr.push(idEvento);
        function arrayNovo(arr){
            var tmp = [];
            for(var i = 0; i < arr.length; i++){
                if(tmp.indexOf(arr[i]) == -1){
                    tmp.push(arr[i]);
                }
            }
                return tmp;
            }
        user.meusEventos = arrayNovo(arr);
        user.save();
        console.log("Evento adicionado.");
        return h.response().code(200);
    } catch (a){
        console.log(a);
        return h.response(a).code(status);
    }
    
    
};
const login = async (req, h) => {
    var email = req.payload.email;
    const user = await UserModel.findOne({email : email});
    if (!user){
        const status = 404;
        const response = "Usuario não encontrado."
        console.log(response);
        return h.response(response).code(status);
    } else {
        if (user.senha == req.payload.senha){
            const status = 200;
            const response = user;
            console.log(response);
            return h.response(response).code(status);
        } else {
            const status = 404;
            const response = "Senha invalida.";
            console.log(response);
            return h.response(response).code(status);
        }
    }
};
const getUserId = async (req, h) => {
    var id = req.params.id;
    const user = await UserModel.findById({_id : id});
    if (!user){
        console.log("Usuario não encontrado.");
        return h.response("Usuario não encontrado.").code(404);
    } else {
        console.log(user);
        return h.response(user).code(200);
    }
};
module.exports = {
    getAll,
    saveUser,
    addEventoEmUser,
    addEvento,
    getEventoId,
    login,
    addMeuEvento,
    getUserId,
    getMeusEventos
};