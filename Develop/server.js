const express = require('express');
const path = require('path');
const fs = require('fs');
let reviews = require('./db/db.json');

const { v4: uuidv4 } = require('uuid');


const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));




// GET request for reviews
app.get('/api/notes', (req, res) => {
    // req.body // <--- fetch sent in a POST request
    res.status(200).json(reviews);
    
});

app.post('/api/notes', (req, res) => {
    // req.body // <--- fetch sent in a POST request
    reviews.push({
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    })
    fs.writeFile('db/db.json', JSON.stringify(reviews), (err) =>
        err ? console.error(err) : console.log('Success!')
    );

    res.status(200).json(reviews);
});

app.delete('/api/notes/:id', (req, res) => {
    // req.body // <--- fetch sent in a POST request
    fs.readFile('db/db.json', "utf-8", (err,data) => {
        if (err) throw err
    let temp = JSON.parse(data)
    console.log(req.params.id)
    const filtered = temp.filter( note => note.id !== req.params.id)
    console.log(filtered)
    fs.writeFile('db/db.json', JSON.stringify(filtered), (err) =>
        err ? console.error(err) : res.redirect('/notes')
    );

})
    
});



app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);


