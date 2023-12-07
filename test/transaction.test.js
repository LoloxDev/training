const request = require('supertest');
const appModule = require('../back/server');
const transactions = require('../data/transaction.json');

const { app, getLastId } = appModule;

describe('Tests backend', () => {
  it('Devrait obtenir les meme données que transaction.json et un status 200', async () => {
    const response = await request(app).get('/transactions');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(transactions);
  });

  it('Devrait obtenir le maximum des montats et un status 200', async () => {
    const response = await request(app).get('/transactions/max');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(500);
  });

  it('Devrait obtenir le minimum des montats et un status 200', async () => {
    const response = await request(app).get('/transactions/min');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(25.5);
  });

  it('Devrait obtenir la somme des montats et un status 200', async () => {
    const response = await request(app).get('/transactions/sum');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(675.5);
  });

  it('Test getId, doit récupérer le dernier ID de la liste et lui rajouter 1', () => {
    const mockTransactions = [
      { id: 1 },
      { id: 1 },
      { id: 3 },
      { id: 3 },
      { id: 3 },
      { id: 8 },
    ];

    const result = getLastId(mockTransactions);
    expect(result).toBe(9);
  });
});
