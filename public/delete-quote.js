const submitButton = document.getElementById('delete');
const toDeleteQuoteContainer = document.getElementById('to-delete-quote');

submitButton.addEventListener('click', () => {
    const id = document.getElementById('id').value; 

    fetch(`/api/quotes/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(({quote}) => {
        console.log(quote);
        const toDeleteQuote = document.createElement('div');
        toDeleteQuote.innerHTML = `
        <h3>Congrats, you deleted a quote succesfully!</h3>
        <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
        `
        toDeleteQuoteContainer.appendChild(toDeleteQuote);
    });
});