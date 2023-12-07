const express = require('express');
const app = express();
const port = 3033;
const transactions = require('../data/transaction.json');
const fs = require('fs');
const path = require('path');

app.use(express.static(path.join(__dirname, '../front'))); 
app.use(express.json());

app.get('/transactions', (req, res) => {
  try {
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la lecture du fichier JSON.');
  }
});

app.post('/addTransactions', (req, res) => {
  try {
    const nouvelleTransaction = req.body;
    transactions.push(nouvelleTransaction);
    fs.writeFileSync(path.join(__dirname, '../data/transaction.json'), JSON.stringify(transactions, null, 2));
    res.json({ success: true, message: 'Nouvelle transaction ajoutée' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur lors de l\'ajout de la nouvelle transaction.' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
