const fs = require('fs')

class ProductManager {
    constructor(){
        this.id = 0;
        this.title = "";
        this.description = "";
        this.price = 0;
        this.thumbnail = "";
        this.code = 0;
        this.stock = 0;
        this.products = []
        this.codes=[]
        this.status= true
    }
     addProduct = ( title, description, price, thumbnail, code, stock)=>{
         let newProd={id:this.id,title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock, status: this.status}
         
        if (newProd.code) {
            this.codes.push(newProd.code)
                
                if (this.codes.filter(p=>p==newProd.code).length<=1) {
                    this.products.push(newProd)
                    this.id++
                    if ('./files/products.txt') {
                        fs.unlinkSync('./files/products.txt')
                    }
                    fs.appendFileSync('./files/products.txt', JSON.stringify(this.products))
                }else{
                    console.log("Code ya utilizado: " + newProd.code);
                }
                
        }else{
            console.log("Es necesario un Code para ingresar " + newProd.title);
            
        }
     }
     getProducts=()=>{
        return this.products
     }
     getProductsByCode=(num)=>{
        if (num) {
            return this.products.filter(p=>p.code==num)
        }else if (!num||num!=code){
            return console.log('Not Found');
        }
     }
     getProductsById=(num)=>{
        if (num) {
            return this.products.filter(p=>p.id==num)
        }else if (num === 0){
            return this.products.filter(p=>p.id==num)
            
        }else{
            return console.log('Not Found');
        }
     }
     updateProductsById = (num,newTitle,newDescription,newPrice,newThumnail,newCode,newStock)=>{
        if (num) {
            this.products[num] ={id:this.products[num].id,title: newTitle, description: newDescription, price: newPrice, thumbnail: newThumnail, code: newCode, stock: newStock}
            
        }else if (num===0) {
            this.products[num] ={id:this.products[num].id,title: newTitle, description: newDescription, price: newPrice, thumbnail: newThumnail, code: newCode, stock: newStock}
        }else{
            return console.log('Not Found');
        }
     }
     deleteProductsById = (num)=>{
        if (num) {
            return this.products.splice(num,1)
        }else if (num === 0){
            return this.products.splice(0,1)
            
        }else{
            return console.log('Not Found');
        }
    }
}
class Carrito{
    constructor(id){
        this.id = id
        this.carritos=[]
        this.products = []
    }
    

    
    addCarrito =(num)=>{
        if (this.carritos.length===0) {
            let newCarrito ={id:0, products:this.products}
            this.carritos.push(newCarrito)

        }else if(num){
            if (this.carritos.filter(cart=>cart.id===num)) {
                console.log("Carrito ya existente");
            }else{
            let newCarrito ={id:num, products:this.products}
            this.carritos.push(newCarrito)
            
            }
        }
    }
    addProductsToCart =(num)=>{
        let products = []
        let count = 0
        let newProd = {id:num, quantity:count}
        if (!products.filter(product=>product.id===num)|| !products) {
            newProd.quantity+=1
            products.push(newProd)
            
        }else{
            products.filter(product=>product.id===num)

        }
        
    }
    getCarrito=()=>{
        return this.carritos
     }
     
     getCarritoById=(num)=>{
        if (num) {
            return this.carritos.filter(p=>p.id==num)
        }else if (num === 0){
            return this.carritos.filter(p=>p.id==num)
            
        }else{
            return console.log('Not Found');
        }
     }
}
    
let Manager = new ProductManager
let ManagerCarrito = new Carrito

module.exports = {Manager, ManagerCarrito}