import * as express from 'express';
import { productRouter } from 'modules/product.router';


class baseRouterClass {

    public router: express.Router = express.Router();

    constructor() {
        this.config();
    }

    public config(): void {

        this.router.use("/products", productRouter);

    }
}

export const baseRouter = new baseRouterClass().router;