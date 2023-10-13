const fs = require('fs');
const { stringify } = require('querystring');

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
         fs.appendFileSync('./files/products.txt', JSON.stringify(this.products)) 
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
let Manager = new ProductManager

class Carrito{
    constructor(){
        this.id = 0
        this.carritos=[]
        this.products = []
    }
    

    
    addCarrito =(num,pid)=>{
        let buscador =this.carritos.find(e=>e.id === num)
        let repetidos = []
        if (num >= 0) {
            
            this.addProductsToCart(pid)
            this.carritos.push({id:num, Productos:this.products})
            
            if (buscador) {
                //this.initializeP()
                repetidos.push(buscador)
                
            }
            console.log(repetidos);
            fs.appendFileSync('./files/carts.txt', JSON.stringify(this.carritos))

                
            //console.log(this.carritos);
                  
        }else{
            console.log("debe ingresar el id del carrito = a un numero");
            
        }
        
       
        
    }

    addProductsToCart =(pid)=>{
        
            if (pid>0 || pid===0) {

                
                if (this.products.find(e=>e.id==pid)) {
                    
                    this.products.find(e=>e.id==pid).Quantity++     
                }      
            }else{
                console.log("debe ingresar el id = a un numero");
                
            }    
    }
    
    initializeP=()=>{
        Manager.products.forEach(e => {
            this.products.push({id:e.id,Quantity:0})
        });
        
    }
    
    //initializeC=(num)=>{
        
    //    this.carritos=[{id:num||0, Productos:this.products}]
    //}
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
    

let ManagerCarrito = new Carrito
ManagerCarrito.initializeP()




module.exports = {Manager, ManagerCarrito}
