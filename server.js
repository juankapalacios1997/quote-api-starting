const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, getElementById } = require('./utils');

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
        console.log({quotes});
    }
})

app.post('/api/quotes', (req, res) => {
    const newId = quotes.length + 1;
    const receivedQuote = {
        id: newId,
        quote: req.query.quote,
        person: req.query.person,
    }
    if (receivedQuote) {
        if (!receivedQuote.person) {
            quotes.push({
                id: newId,
                quote: req.query.quote,
                person: 'Anonymous'
                
            });
            res.status(201).send({
                id: newId,
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

app.put('/api/quotes/:id', (req, res) => {
    const quote = getElementById(req.params.id, quotes);
    const quoteId = quote.id;
    if (req.query.quote && req.query.person) {
        if (quoteId !== -1) {
            quotes[quoteId] = {
                id: quoteId,
                quote: req.query.quote,
                person: req.query.person,
            };
            res.send({quote: {
                id: quoteId,
                quote: req.query.quote,
                person: req.query.person,
            }
        })
        }
        else {
            res.status(404).send();
        }
    } else {
        res.status(400).send('Missing Parameter')
    }
    console.log(quoteId)
})