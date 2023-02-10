import { httpUtility } from "utils/http";
import { securityUtility } from "utils/security";
import { productRepository } from "../repository/product.repository";

class productControllerClass {

    public async addProduct(httpStack, requestJSON): Promise<any> {

        // var path = require('path');
        // console.log(path.resolve(httpStack.req.file.path));
        // requestJSON.product.image = (path.resolve(httpStack.req.file.path));
        // requestJSON.product = httpStack.req.body;

        requestJSON.product = JSON.parse(httpStack.req.body.payload);
        requestJSON.product.image=`http://172.24.144.1:2022/uploads/${httpStack.req.file.originalname}`; 

        productRepository.addProduct(requestJSON).then((productId) => {
            httpUtility.sendSuccess(httpStack, productId);
        }).catch((error) => {
            httpUtility.sendError(httpStack, error)

        })
    }

    public async updateProduct(httpStack, requestJSON): Promise<any> {

        // var path = require('path');
        // console.log(path.resolve(httpStack.req.file.path));
        // requestJSON.product.image = (path.resolve(httpStack.req.file.path));
        // requestJSON.product = httpStack.req.body;
        
        requestJSON.product = JSON.parse(httpStack.req.body.payload);
        requestJSON.product.image=`http://172.24.144.1:2022/uploads/${httpStack.req.file.originalname}`; 

        requestJSON.id = httpStack.req.params.id;

        productRepository.updateProduct(requestJSON).then((productId) => {
            httpUtility.sendSuccess(httpStack, productId);
        }).catch((error) => {
            httpUtility.sendError(httpStack, error)

        })
    }

    public async getProducts(httpStack, requestJSON): Promise<any> {

        requestJSON.params = httpStack.req.query;
        productRepository.getProducts(requestJSON).then((products) => {
            httpUtility.sendSuccess(httpStack, products);
        }).catch((error) => {
            httpUtility.sendError(httpStack, error)

        })
    }


    public async getProductById(httpStack, requestJSON): Promise<any> {

        requestJSON.id = httpStack.req.params.id;
        productRepository.getProductById(requestJSON).then((products) => {
            httpUtility.sendSuccess(httpStack, products);
        }).catch((error) => {
            httpUtility.sendError(httpStack, error)

        })
    }

    public async deleteProduct(httpStack, requestJSON): Promise<any> {

        requestJSON.id = httpStack.req.params.id;
        productRepository.deleteProduct(requestJSON).then((products) => {
            httpUtility.sendSuccess(httpStack, products);
        }).catch((error) => {
            httpUtility.sendError(httpStack, error)

        })
    }

    public async customerLogin(httpStack,requestJSON):Promise<any>{

        requestJSON.customer=httpStack.req.body;
        productRepository.customerLogin(requestJSON).then((customers:any)=>{
            if(customers.length>0){
                let customer =customers[0];
                let token= securityUtility.generateToken(customer.username)
                httpUtility.sendSuccess(httpStack,customers);
                customer.token=token;
            }else{
                let response={message:'Invalid username or password'};
                httpStack.statusCode=401;
                httpUtility.sendError(httpStack,response)
            }
        }).catch((error)=>{
            httpUtility.sendError(httpStack,error)
        })
    }
}

export const productController = new productControllerClass();