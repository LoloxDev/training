const express = require('express');
const app = express();
const port = 3033;
const transactions = require('../data/transaction.json');
const fs = require('fs');
const path = require('path');

app.use(express.static(path.join(__dirname, '../front')));
app.use(express.json());

// FONCTIONS MATHEMATIQUES

// Fonction pour obtenir le dernier ID
function getLastId(list) {
  return (list[list.length - 1].id + 1);
}

// Fonction pour obtenir le plus petit montant
function getMinAmount(list) {
  return list.reduce((minAmount, transaction) => Math.min(minAmount, transaction.amount), Infinity);
}

// Fonction pour obtenir le plus gros montant
function getMaxAmount(list) {
  return list.reduce((maxAmount, transaction) => Math.max(maxAmount, transaction.amount), -Infinity);
}

// Fonction pour obtenir la somme des montants
function getSumAmount(list) {
  return list.reduce((sum, transaction) => sum + transaction.amount, 0);
}



// REQUETTES HTTP

// Liste de toutes les transactions
app.get('/transactions', (req, res) => {
  try {
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la lecture du fichier JSON.');
  }
});

// Somme / Max / Min des transactions
app.get('/transactions/:operation', (req, res) => {

  const operation = req.params.operation;

  try {

    switch (operation) {
      case 'min':
        res.json(getMinAmount(transactions));
        break;
      case 'max':
        res.json(getMaxAmount(transactions));
        break;
      case 'sum':
        res.json(getSumAmount(transactions));
        break;
      default:
        console.error(error);
        res.status(500).send('Merci de rentrer une opération.');
        break;
    }

  } catch (error) {

    console.error(error);
    res.status(500).send('Erreur lors de la lecture du fichier JSON.');

  }
});

// Ajout d'une transaction
app.post('/transactions', (req, res) => {
  try {
    const nouvelleTransaction = req.body;
    nouvelleTransaction.id = getLastId(transactions);
    transactions.push(nouvelleTransaction);
    fs.writeFileSync(path.join(__dirname, '../data/transaction.json'), JSON.stringify(transactions, null, 2));
    res.json({ success: true, message: 'Nouvelle transaction ajoutée' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur lors de l\'ajout de la nouvelle transaction.' });
  }
});

if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

module.exports = { app, getLastId };
