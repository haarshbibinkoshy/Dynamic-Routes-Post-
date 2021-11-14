const fs = require('fs')

const path = require('path');

const p=path.join(path.dirname(require.main.filename),
'data',
'cart.json')  

module.exports=class Cart{

    static addProduct(id,productPrice,size){
        fs.readFile(p,(err,fileContent) => {
            let cart={products:[],totalPrice:0}
            if (!err) {
                cart=JSON.parse(fileContent)
            }
            const existingProductIndex=cart.products.findIndex(pd=>pd.id==id)
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct;
            if (existingProduct) {
                updatedProduct={...existingProduct}

                if (size==`small`) {
                    updatedProduct.qty.small=updatedProduct.qty.small+1
                }else if (size==`medium`) {
                    updatedProduct.qty.medium=updatedProduct.qty.medium+1
                }

                updatedProduct.qty=updatedProduct.qty+1
                cart.products=[...cart.products]
                cart.products[existingProductIndex]=updatedProduct
            }else{
                if (size==`small`) {
                    updatedProduct={id:id, qty:{small:1,medium:0}}
                }else if (size==`medium`) {
                    updatedProduct={id:id, qty:{small:0,medium:1}}
                }
                updatedProduct={id:id,qty:1}
                cart.products=[...cart.products,updatedProduct]
            }
            cart.totalPrice=cart.totalPrice+ +productPrice
            fs.writeFile(p,JSON.stringify(cart),(err)=>{
                console.log(err);
            })
        })
    }
}

