const Movement = require('../models/Movement');
const User = require('../models/User');

module.exports = {
    
    // DEVOLUÇÃO: Listar todas as retiradas que não são urgentes, independente do usuário
    async index(req,res) {

        const ativos = "";
        const urgenteTag = "NÃO";

        const movements = await Movement.find({ responsibleDevolution: ativos, emergency: urgenteTag})

        return res.json(movements);
    },

    // DEVOLUÇÃO: Listar a retirada específica que não é urgente.
    async indexI(req,res) {

        const { _id } = req.headers;
        const movements = await Movement.findById( _id )

        return res.json(movements);
    },

    // DEVOLUÇÃO: Atualizar registro com o nome da pessoa que está devolvendo e data/hora da devolução.
    async update(req,res) {

        const { _id, user_name } = req.headers;
        const { dateHourDevolution } = req.body;

        const movement = await Movement.findByIdAndUpdate( { _id} ,{
            responsibleDevolution: user_name,
            dateHourDevolution 
        })

        return res.json(movement);
    },

    // RETIRADA: Rota para criar uma RETIRADA URGENTE, definindo emergency="SIM"
    async storeU(req,res) {
        const { 
            equipament,
            dateHourWithdraw,
            patrimony,
            responsibleDevolution,
            dateHourDevolution } = req.body;

        const { user_id, user_name } = req.headers;
        const urgenteTag = "SIM";

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(400).json({ error: 'Usuário não está cadastrado' })
        }

        const movement = await Movement.create({
            user: user_id,
            responsibleWithDraw: user_name,
            equipament,
            dateHourWithdraw,
            emergency: urgenteTag,
            patrimony,
            responsibleDevolution,
            dateHourDevolution
        })

        return res.json(movement) 
    },



    // RETIRADA: Rota para criar uma RETIRADA NÃO URGENTE, definindo emergency="NÃO"
    async store(req,res) {
        const { 
            equipament,
            dateHourWithdraw,
            patrimony,
            responsibleDevolution,
            dateHourDevolution } = req.body;

        const { user_id, user_name } = req.headers;
        const urgenteTag = "NÃO";

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(400).json({ error: 'Usuário não está cadastrado' })
        }

        const movement = await Movement.create({
            user: user_id,
            responsibleWithDraw: user_name,
            equipament,
            dateHourWithdraw,
            emergency: urgenteTag,
            patrimony,
            responsibleDevolution,
            dateHourDevolution
        })

        return res.json(movement) 
    }
};