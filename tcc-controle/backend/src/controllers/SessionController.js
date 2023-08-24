// index, show, store, update, destroy
const { PythonShell } = require("python-shell");
const {spawn} = require('child_process');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

module.exports = {

    async pythonExecFacial(req, res) {
        const scriptPathFacial = 'C:/Users/lgome/OneDrive/Área de Trabalho/TCC/ControleSegurancaEquip/tcc-controle/backend/src/controllers/modelo_facial_2.py';
      
        const pythonProcessFacial = spawn('python', [scriptPathFacial]);
      
        const filePathFacial = path.join(__dirname, '..', '..', 'output.txt');
      
        pythonProcessFacial.stdout.on('data', (data) => {
          const output = data.toString().trim();
        });
      
        pythonProcessFacial.stderr.on('data', (data) => {
          console.error(data.toString());
        });

        pythonProcessFacial.on('close', (code) => {
            pythonProcessFacial.removeAllListeners();
            pythonProcessFacial.kill();
            if (code === 0) {
                const fileContentFacial = fs.readFileSync(filePathFacial, 'utf8');
                const lines_facial = fileContentFacial.trim().split('\n');
                const lastLine_facial = lines_facial[0].trim();
    
                res.json(lastLine_facial);
            } else {
                res.status(500).json({ error: 'Ocorreu um erro ao executar o script Python.' });
            }
        
        });
    },

    async pythonExecObject(req, res) {
        const scriptPathObjects = 'C:/Users/lgome/OneDrive/Área de Trabalho/TCC/ControleSegurancaEquip/tcc-controle/backend/src/controllers/modelo_objetos.py';
      
        const pythonProcessObjects = spawn('python', [scriptPathObjects]);
      
        const filePathObjects = path.join(__dirname, '..', '..', 'output2.txt');
      
        pythonProcessObjects.stdout.on('data', (data) => {
          const output = data.toString().trim();
        });
      
        pythonProcessObjects.stderr.on('data', (data) => {
          console.error(data.toString());
        });

        pythonProcessObjects.on('close', (code) => {
            pythonProcessObjects.removeAllListeners();
            pythonProcessObjects.kill();
            if (code === 0) {
                const fileContentObjects = fs.readFileSync(filePathObjects, 'utf8');
                const lines_objects = fileContentObjects.trim().split('\n');
                const lastLine_objects = lines_objects[0].trim();
    
                res.json(lastLine_objects);
            } else {
                res.status(500).json({ error: 'Ocorreu um erro ao executar o script Python.' });
            }
        
        });
    },

    async store(req,res) {
        const { name } = req.body;

        let user = await User.findOne({ name });

        if (!user) {
            user = await User.create({ name });
        }

        return res.json(user);
    }
};