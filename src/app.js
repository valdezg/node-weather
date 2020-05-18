const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'German Valdez'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'German Valdez'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title:'Help',
    helpText: 'This is some Helpful text',
    name:'German Valdez'
  })
})

app.get('/weather', ( req, res ) => {
  if(!req.query.address ) {
    return res.send({
      error:'You must provide an address'
    })
  }

  geocode(req.query.address,(error, { lattitude, longitude, location } = {} ) => {
    if(error) {
      return res.send({ error })
    }

    forecast(lattitude,longitude, (error, forecastData) => {
      if(error) {
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})




app.get('/products',(req, res)=> {
  if (!req.query.search) {
    return res.send({
      error:'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products:[]
  })
})


app.get('/help/*',(req,res) => {
  res.render('404', {
    title:'404',
    name:'German Valdez',
    errorMessage: 'Help page not found'
  })
})

app.get('*', (req,res) => {
  res.render('404',{
    title: '404',
    name: 'German Valdez',
    errorMessage: 'Page not found'
  })
})



app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
