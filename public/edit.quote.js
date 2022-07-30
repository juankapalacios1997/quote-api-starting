const submitButton = document.getElementById('submit-changes');
const updatedQuoteContainer = document.getElementById('edited-quote');

submitButton.addEventListener('click', () => {
    const id = document.getElementById('id').value; 
    const quote = document.getElementById('quote').value;
    const person = document.getElementById('person').value;

    fetch(`/api/quotes/${id}?quote=${quote}&person=${person}`, {
        method: 'PUT',
    })
    .then(response => response.json())
    .then(({quote}) => {
        const updatedQuote = document.createElement('div');
        updatedQuote.innerHTML = `
        <h3>Congrats, you edited a quote succesfully!</h3>
        <div class="quote-text">${quote.id}</div>
        <div class="quote-text">${quote.quote}</div>
        <div class="attribution">- ${quote.person}</div>
        <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
        `
        updatedQuoteContainer.appendChild(updatedQuote);
    });
});