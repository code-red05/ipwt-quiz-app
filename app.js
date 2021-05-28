const express = require('express')
const app = express()
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
        res.sendFile(__dirname + '/home.html');
})

app.get('/attempt_quiz', (req, res) => {
    res.sendFile(__dirname + '/attempt_quiz.html')
})
  
app.listen(3000, () => {
    console.log('App listening at http://localhost:3000')
})