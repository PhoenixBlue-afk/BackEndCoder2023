const express = require('express')
const fs = require('fs')
const {Manager, ManagerCarrito} = require('../app.js')
const PORT = 8080;
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', (req, res) => {
  const limite = parseInt(req.query.limite) || Manager.products.length;
  const productosLimitados = Manager.products.slice(0, limite);
  res.json(productosLimitados);
})

app.get('/:id', (req, res) => {
  res.send (Manager.getProductsById(req.params.id))
})

app.post('/', (req, res) => {
  const body = req.body
  const {title, description, code, price, stock, category, thumbnail} = body

  if (!title || !description || !code || !price || !stock || !category ) {
    return res.status(404).json({message:'Todos los campos son necesarios para agregar el producto.'})
  }else{
    
    const newProd= Manager.addProduct(title, description, price, thumbnail, code, stock, category)

    res.status(201).json(newProd)
  }

})

app.put('/:id', (req, res) => {
  const body = req.body
  const {title, description, code, price, stock, category, thumbnail} = body
  const {id} = req.params
  const modifiedProd = Manager.products.find((p) => p.id === parseInt(id))
  if (!modifiedProd) {
    return res.status(404).json({message:"El producto no fue encontrado"})
  }else if (!title || !description || !code || !price || !stock || !category ) {
    return res.status(404).json({message:'Todos los campos son necesarios para modificar el producto.'})
  }if (modifiedProd==0) {
    Manager.updateProductsById(id, title, description, code, price, stock, category, thumbnail)
    res.status(201).json({message:'El producto fue modificado con exito'})
  }else{
    Manager.updateProductsById(id, title, description, code, price, stock, category, thumbnail)
    res.status(201).json({message:'El producto fue modificado con exito'})
  }
  
})

app.delete('/:id',(req,res)=>{
  const {id} = req.params
  const delItem = Manager.products.find((p) => p.id === parseInt(id))
  if (!delItem) {
    return res.status(404).json({message:'El producto con el id: '+ id + ' no existe.'})
  }else if (delItem.id==0) {
    Manager.deleteProductsById(0)
    res.status(201).json({message:'El producto se elimino correctamente'})
  }else{
    Manager.deleteProductsById(id)
    res.status(201).json({message:'El producto se elimino correctamente'})
  }
})


app.get ('/carts', (req,res)=>{
  res.send(ManagerCarrito.carritos)
})
app.get('/carts/:cid',(req,res)=>{
  const {cid} = req.params
  res.send(ManagerCarrito.getCarritoById(cid))
})
app.post('/:cid/product/:pid',(req,res)=>{
  const {cid,pid} = req.params
  res.status(201).json(ManagerCarrito.addCarrito(cid,pid))

})

app.listen(PORT, () => {
  console.log('Listening on port 8080')
})