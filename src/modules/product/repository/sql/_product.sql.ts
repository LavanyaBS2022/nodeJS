import { dbUtility } from "utils/database";

let sqlPath = __dirname + '/';

export const ProductSQL = {
    getProducts: dbUtility.getSQL(sqlPath + 'get.products.sql'),
    getCustomerById:dbUtility.getSQL(sqlPath+'get.product.id.sql'),
    deleteProduct:dbUtility.getSQL(sqlPath+'delete.product.sql'),
    customerLogin:dbUtility.getSQL(sqlPath+'customer.login.sql')
}