// index, show, store, update, destroy
const { PythonShell } = require("python-shell");
const {spawn} = require('child_process');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

module.exports = {

    async pythonExecFacial(req, res) {
        const scriptPath = 'C:/Users/lgome/OneDrive/Área de Trabalho/TCC/ControleSegurancaEquip/tcc-controle/backend/src/controllers/modelo_facial.py';
      
        const pythonProcess = spawn('python', [scriptPath]);
      
        const filePath = path.join(__dirname, '..', '..', 'output.txt');
      
        pythonProcess.stdout.on('data', (data) => {
          const output = data.toString().trim();
        });
      
        pythonProcess.stderr.on('data', (data) => {
          console.error(data.toString());
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                const lines = fileContent.trim().split('\n');
                const lastLine = lines[lines.length - 1];
    
                res.json(lastLine);
            } else {
                res.status(500).json({ error: 'Ocorreu um erro ao executar o script Python.' });
            }
        
        });
    },

    async pythonExecObject(req, res) {
        const scriptPath = 'C:/Users/lgome/OneDrive/Área de Trabalho/TCC/ControleSegurancaEquip/tcc-controle/backend/src/controllers/modelo_objetos.py';
      
        const pythonProcess = spawn('python', [scriptPath]);
      
        const filePath = path.join(__dirname, '..', '..', 'output2.txt');
      
        pythonProcess.stdout.on('data', (data) => {
          const output = data.toString().trim();
        });
      
        pythonProcess.stderr.on('data', (data) => {
          console.error(data.toString());
        });

        pythonProcess.on('close', (code) => {
            if (code === 0) {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                const lines = fileContent.trim().split('\n');
                const lastLine = lines[lines.length - 1];
    
                res.json(lastLine);
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