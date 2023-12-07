document.getElementById('transactionForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const transaction = {};
            
    formData.forEach((value, key) => {
        transaction[key] = key === 'amount' ? Number(value) : value;
    });

    fetch(`/transactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Ajout OK');
        }})

})

