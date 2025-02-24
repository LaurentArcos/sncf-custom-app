// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Autoriser les requêtes depuis votre application Angular
app.use(cors());
app.use(express.json());

const SNCF_API_BASE = 'https://api.sncf.com/v1/coverage/sncf';
const SNCF_API_KEY = process.env.SNCF_API_KEY; // Votre clé API dans le fichier .env

// Fonction utilitaire pour générer le header d'authentification Basic
function getAuthHeader() {
  return 'Basic ' + Buffer.from(`${SNCF_API_KEY}:`).toString('base64');
}

// Proxy pour récupérer les itinéraires (journeys)
app.get('/api/journeys', async (req, res) => {
  try {
    const { from, to, datetime } = req.query;
    const url = `${SNCF_API_BASE}/journeys`;
    const response = await axios.get(url, {
      params: { from, to, datetime },
      headers: {
        'Authorization': getAuthHeader()
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json(
      error.response ? error.response.data : { message: error.message }
    );
  }
});

// Proxy pour récupérer les alertes trafic d'une ligne
app.get('/api/lines/:lineId/alerts', async (req, res) => {
  try {
    const { lineId } = req.params;
    const url = `${SNCF_API_BASE}/lines/${lineId}/alerts`;
    const response = await axios.get(url, {
      headers: {
        'Authorization': getAuthHeader()
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json(
      error.response ? error.response.data : { message: error.message }
    );
  }
});

app.listen(port, () => {
  console.log(`Express proxy server listening on port ${port}`);
});
