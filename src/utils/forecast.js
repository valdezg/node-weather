const request = require('request')

const forecast = (lattitude,longitude,callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=bce20b28899ad02113caf62be9057d08&query=' + lattitude + ',' + longitude +'&units=f'

  request({ url, json:true }, (error, { body }) => {
    if(error) {
        callback('Unable to connect',undefined)
      } else if (body.error) {
        callback('Unable to find location',undefined)
      } else {
        callback(undefined,body.current.weather_descriptions + ' Temperature is ' + body.current.temperature + '. There is a ' + body.current.precip + '% chance of rain')

      }

  })
}




module.exports = forecast
