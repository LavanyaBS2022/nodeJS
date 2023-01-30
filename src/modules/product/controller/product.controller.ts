
import { productRepository } from '../repository/product.repository';
import { httpUtility } from './../../../utils/http';
var fs = require("fs")

class productControllerClass {

    public async getProductById(httpStack, requestJSON): Promise<any> {

        try {
            let productId = httpStack.req.params.id;

            let filePath = `${__dirname}\\product.json`;
            fs.readFile(filePath, function (err, data) {
                if (err) {
                    httpUtility.sendError(httpStack, err);
                    return;
                }
                let products = JSON.parse(data);
                let product = products.find((c) => c.id == productId);

                httpUtility.sendSuccess(httpStack, product);
            });

        } catch (error) {
            httpUtility.sendError(httpStack, error)
        }

    }

    public async getProducts(httpStack, requestJSON): Promise<any> {

        try {
            let params = httpStack.req.query;
            let productName = params.name;

            let filePath = `${__dirname}\\product.json`;
            fs.readFile(filePath, function (err, data) {
                if (err) {
                    httpUtility.sendError(httpStack, err);
                    return;
                }
                let products = JSON.parse(data);
                if (productName) {
                    products = products.filter((p) => p.name == productName);

                }
                httpUtility.sendSuccess(httpStack, products);
            });

        } catch (error) {
            httpUtility.sendError(httpStack, error)
        }

    }
    // public async addProduct(httpStack, requestJSON): Promise<any> {

    //     let product = httpStack.req.body;
    //     let filePath = `${__dirname}\\product.json`;
    //     product.id = new Date().getMilliseconds();

    //     fs.readFile(filePath, function (err, data) {
    //         if (err) {
    //             httpUtility.sendError(httpStack, err);
    //             return;
    //         }

    //         let products = JSON.parse(data);
    //         products.push(product);

    //         fs.writeFile(filePath, JSON.stringify(products), function (err) {
    //             if (err) {
    //                 return console.error(err);
    //             }
    //             httpUtility.sendSuccess(httpStack, 'Product Added')
    //         });
    //     });

    // }

    // public async updateProduct(httpStack, requestJSON): Promise<any> {
    //     try {

    //         let productId = httpStack.req.params.id;
    //         let filePath = `${__dirname}\\product.json`;
    //         let product=httpStack.req.body;

    //         fs.readFile(filePath, function (err, data) {
    //             if (err) {
    //                 httpUtility.sendError(httpStack, err);
    //                 return;
    //             }
    //             let products = JSON.parse(data);
    //             const productIndex=products.findIndex((obj)=>obj.id==productId);
    //             products[productIndex].name=product.name;
    //             products[productIndex].email=product.email;
    //             fs.writeFile(filePath, JSON.stringify(products[productIndex]), function (err) {
    //                 if (err) {
    //                     return console.error(err);
    //                 }
    //                 httpUtility.sendSuccess(httpStack, products[productIndex]);
    //             });

    //         });

    //     } catch (error) {
    //         httpUtility.sendError(httpStack, error)
    //     }

    // }

    // public async deleteProduct(httpStack, requestJSON): Promise<any> {

    //     try {

    //         let productId = httpStack.req.params.id;
    //         let filePath = `${__dirname}\\product.json`;
    //         fs.readFile(filePath, function (err, data) {
    //             if (err) {
    //                 httpUtility.sendError(httpStack, err);
    //                 return;
    //             }
    //             let products = JSON.parse(data);
    //             let product = products.find((c) => c.id == productId);
    //             let productIndex=products.findIndex((obj)=>obj.id==product.id);
    //             products.splice(productIndex,1);
    //             fs.writeFile(filePath, JSON.stringify(products), function (err) {
    //                 if (err) {
    //                     return console.error(err);
    //                 }
    //                 httpUtility.sendSuccess(httpStack, products);
    //             });
    //         });
    //     } catch (error) {
    //         httpUtility.sendError(httpStack, error)
    //     }

    // }


    public async addProduct(httpStack, requestJSON): Promise<any> {

        requestJSON.product=httpStack.req.body;

        productRepository.addProduct(requestJSON).then((productId)=>{
            httpUtility.sendSuccess(httpStack, productId);
        }).catch((error)=>{
           httpUtility.sendError(httpStack, error)

        })
    }

    public async updateProduct(httpStack, requestJSON): Promise<any> {

    }
}

export const productController = new productControllerClass();