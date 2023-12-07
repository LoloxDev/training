
function getLastId() {
    return fetch('../data/transaction.json')
      .then(response => response.json())
      .then(data => {
        const lastItem = data[data.length - 1].id;
        console.log(lastItem);
        return lastItem;
       })
}

const postData = {
    id: getLastId(),
    amount: "100€",
    type: "credit",
    date: "2023-01-01T12:00:00Z",
    category: "salaire"
}

console.log(postData);

function addTransac(){
    fetch(`/addTransactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Ajout OK');
        }})
}

 window.addEventListener('load', function() {
     addTransac();
 });