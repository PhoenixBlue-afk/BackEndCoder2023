const express = require('express')
const {Manager} = require('./Entregable2')
const PORT = 8080;
const app = express()

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, rest) => {
  rest.send('Hello World!')
})

app.get('/products', (req, res) => {
  const limite = parseInt(req.query.limite) || Manager.products.length;
  const productosLimitados = Manager.products.slice(0, limite);
  res.json(productosLimitados);
})

app.get('/products/:id', (req, res) => {
  res.send (Manager.getProductsById(req.params.id))
})

app.listen(PORT, () => {
  console.log('Listening on port 8080')
})