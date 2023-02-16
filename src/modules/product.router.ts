import * as express from 'express';
import { httpUtility } from 'utils/http';
import { productController } from './product/controller/product.controller';

const multer  = require('multer')


class productRouterClass {
    upload;
    public router: express.Router = express.Router();

    constructor() {     
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
        console.log(file)
          cb(null,file.originalname)
        }
      })
      
      this.upload = multer({ storage: storage })
      this.config();
    }

    public config(): void {
        this.router.get("/:id", (req, res, next) => { httpUtility.action(req, res, next, productController.getProductById) });
        this.router.get("/", (req, res, next) => { httpUtility.action(req, res, next, productController.getProducts) });
        this.router.post("/",this.upload.single('image'), (req, res, next) => { httpUtility.action(req, res, next, productController.addProduct) });
        this.router.put("/:id",this.upload.single('image'), (req, res, next) => { httpUtility.action(req, res, next, productController.updateProduct) });
        this.router.delete("/:id", (req, res, next) => { httpUtility.action(req, res, next, productController.deleteProduct) });
        this.router.post("/login", (req, res, next) => { httpUtility.action(req, res, next, productController.customerLogin) });
        this.router.post("/sign-up", (req, res, next) => { httpUtility.action(req, res, next, productController.addCustomer) });
    }
}

export const productRouter = new productRouterClass().router;