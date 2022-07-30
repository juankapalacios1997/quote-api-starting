const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes);
    if (randomQuote) {
        res.send({
            quote: {
            quote: randomQuote.quote,
            person: randomQuote.person
            }
        });
    } else {
        res.status(404).send();
    }
})

app.get('/api/quotes', (req, res) => {
    if (req.query.person) {
        res.send({ quotes: quotes.filter(x => x.person === req.query.person) });
    } else {
        res.send({quotes})
    }
})

app.post('/api/quotes', (req, res) => {
    const receivedQuote = {
        quote: req.query.quote,
        person: req.query.person,
    }
    if (receivedQuote) {
        if (!receivedQuote.person) {
            quotes.push({
                quote: req.query.quote,
                person: 'Anonymous'
                
            });
            res.status(201).send({
                quote: {
                    quote: req.query.quote,
                    person: 'Anonymous'
                }
            })
        } else if (receivedQuote.person) {
            quotes.push(receivedQuote)
            res.status(201).send({quote: receivedQuote});
        }
    } else {
        res.status(400).send();
    }
});

