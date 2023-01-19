import * as express from 'express';
import { httpUtility } from 'utils/http';
import { productController } from './product/controller/product.controller';



class productRouterClass {

    public router: express.Router = express.Router();

    constructor() {
        this.config();
    }

    public config(): void {
        this.router.get("/:id", (req, res, next) => { httpUtility.action(req, res, next, productController.getProductById)});
        this.router.get("/", (req, res, next) => { httpUtility.action(req, res, next, productController.getProducts) });
        this.router.post("/", (req, res, next) => { httpUtility.action(req, res, next, productController.addProduct) });
        this.router.put("/:id", (req, res, next) => { httpUtility.action(req, res, next, productController.updateProduct) });
        this.router.delete("/:id", (req, res, next) => { httpUtility.action(req, res, next, productController.deleteProduct) });        
    }   
}

export const productRouter = new productRouterClass().router;