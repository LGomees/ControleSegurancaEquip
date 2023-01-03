const Movement = require('../models/Movement');
const User = require('../models/User');

module.exports = {
    
    async index(req,res) {
        const { ativos } = req.query;

        const movements = await Movement.find({ responsibleDevolution: ativos })

        return res.json(movements);
    },

    async store(req,res) {
        const { 
            equipament,
            dateHourWithdraw,
            emergency,
            patrimony,
            responsibleDevolution,
            dateHourDevolution } = req.body;

        const { user_id, user_name } = req.headers;

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(400).json({ error: 'Usuário não está cadastrado' })
        }

        const movement = await Movement.create({
            user: user_id,
            responsibleWithDraw: user_name,
            equipament,
            dateHourWithdraw,
            emergency,
            patrimony,
            responsibleDevolution,
            dateHourDevolution
        })

        return res.json(movement) 
    }
};