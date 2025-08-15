// index.js - LA VERSIONE COMMONJS PIÙ MINIMALE E ROBUSTA PER IL DEPLOYMENT

const express = require('express'); // Usa require
const app = express();

// Cloud Functions usa la variabile d'ambiente PORT.
const port = process.env.PORT || 8080;

// Middleware per analizzare il corpo delle richieste in formato JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello, Cloud Functions! Function is running successfully with CommonJS!');
});

// Endpoint POST che Zantara si aspetta (solo placeholder per ora)
app.post('/api/zantara', (req, res) => {
    const prompt = req.body.prompt;
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required in the request body.' });
    }
    console.log(`Received prompt: ${prompt}`);
    res.json({
        status: 'success',
        message: `Prompt received and processed. Minimal AI logic placeholder.`,
        receivedPrompt: prompt
    });
});

// La tua app Express si mette in ascolto sulla porta fornita.
// Necessario per il healthcheck di Cloud Run.
app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
});

// Esporta l'app Express con il nome della funzione (CommonJS)
module.exports.zanExecute = app;