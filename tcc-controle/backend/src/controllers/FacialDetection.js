const express = require('express');
const app = express();
const { spawn } = require('child_process');

app.use(express.json());

app.post('/api/detectar-rosto', (req, res) => {
  // Executar o arquivo Python
  const pythonProcess = spawn('python', ['./modelo_facial_2.py']);

  pythonProcess.stdout.on('data', (data) => {
    // Processar os dados da detecção facial (opcional)
    const resultado = data.toString();
    // Retornar o resultado para o frontend
    res.json({ resultado });
  });

  pythonProcess.stderr.on('data', (error) => {
    // Lidar com erros (opcional)
    console.error(error.toString());
    res.status(500).json({ error: 'Ocorreu um erro na detecção facial.' });
  });
});

app.listen(3000, () => {
  console.log('Servidor Node.js em execução na porta 3000.');
});
