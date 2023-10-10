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
    }
     addProduct = ( title, description, price, thumbnail, code, stock)=>{
         let newProd={id:this.id,title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock}
         
        if (newProd.code) {
            this.codes.push(newProd.code)
                
                if (this.codes.filter(p=>p==newProd.code).length<=1) {
                    this.products.push(newProd)
                    this.id++
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

module.exports = {Manager}