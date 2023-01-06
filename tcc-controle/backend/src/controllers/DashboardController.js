const Movement = require("../models/Movement");

module.exports = {
    
    // DEVOLUÇÃO URGENTE: Listar todas as retiradas urgentes, específicas do usuário
    async show(req,res) {
        const { user_id } = req.headers;
        const ativos = "";
        const urgenteTag = "SIM";

        const movements = await Movement.find({ user: user_id, responsibleDevolution: ativos, emergency: urgenteTag });

        return res.json(movements);
    },

    // DEVOLUÇÃO URGENTE: Atualizar registro com o nome da pessoa que está devolvendo, data/hora e patrimônio do equipamento da devolução .
    async update(req,res) {

        const { _id, user_name } = req.headers;
        const { patrimony, dateHourDevolution } = req.body;

        const movement = await Movement.findByIdAndUpdate( { _id} ,{
            responsibleDevolution: user_name,
            dateHourDevolution,
            patrimony,
        })

        return res.json(movement);
    },

        // DEVOLUÇÃO URGENTE: Listar a retirada específica que não é urgente.
        async indexI(req,res) {

            const { _id } = req.headers;
            const movements = await Movement.findById( _id )
    
            return res.json(movements);
        },
    
}