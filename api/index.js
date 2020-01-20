// /* eslint-disable no-console */
// const express = require('express')
// const bodyParser = require('body-parser')
// const axios = require('axios')
// const app = express()
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// )
// app.use(express.json())
// app.post('/', async (req, res) => {
//   const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify'
//   const data = await postData(verifyUrl, req.body).then((data) => data)
//   // eslint-disable-next-line no-console
//   res.send({ success: '' + data })
// })

// async function postData(url = '', data = {}) {
//   const urldata = JSON.parse(JSON.stringify(data))

//   const result = await axios({
//     method: 'post',
//     url: `${url}?secret=${urldata.secret}&response=${urldata.response}`,

//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
//     }
//   })
//     .then(function(response) {
//       return response.data.success
//     })
//     .catch(function(error) {
//       // eslint-disable-next-line no-console
//       console.log(error)
//       return false
//     })

//   return result
// }

// module.exports = {
//   path: '/api/',
//   handler: app
// }