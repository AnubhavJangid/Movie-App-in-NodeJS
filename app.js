const { error } = require('console')
const express = require('express')
const app = express()
const path = require('path')
const request = require('request')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.listen(3000, () => {
    console.log('Server running at port 3000')
})

app.get('/search', (req, res) => {
    res.render('search')
})

app.get('/movie', (req, res) => {
    res.render('movie')
})

app.get('/results', (req, res) => {

    let query = req.query.search

    request('https://api.themoviedb.org/3/search/movie?api_key={Place your Api Key Here}&query='+ query, (error, response, body) => {
        if(error)
        {
            console.log(error)
        }
        
        let data = JSON.parse(body)
        res.render('movie', {data:data , searchQuery: query})
    })
})