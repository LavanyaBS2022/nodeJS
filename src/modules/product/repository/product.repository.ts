import { dbUtility, db } from "utils/database";
import { ProductSQL } from "./sql/_product.sql";

class productRepositoryClass {

  public addProduct(requestJSON) {
    const dbPromise = new Promise((resolve, reject) => {

      requestJSON.configSQL.table = 'product';
      let dbSQL = dbUtility.insertSql(requestJSON.product, requestJSON.configSQL);

      db.many(dbSQL, requestJSON.configSQL).
        then((productId) => {
          resolve(productId);
        }).catch((error) => {
          reject(error);
        })
    });
    return dbPromise;
  }

  public updateProduct(requestJSON) {
    const dbPromise = new Promise((resolve, reject) => {

      requestJSON.configSQL.table = 'product';
      let dbSQL = dbUtility.updateSQL(requestJSON.product, requestJSON.configSQL, requestJSON.id);

      db.many(dbSQL, requestJSON.configSQL).
        then((productId) => {
          resolve(productId);
        }).catch((error) => {
          reject(error);
        })
    });
    return dbPromise;
  }

  public getProducts(requestJSON) {
    const dbPromise = new Promise((resolve, reject) => {

      requestJSON.configSQL.table = 'product';
      let dbSQL = ProductSQL.getProducts;

      db.any(dbSQL, requestJSON.configSQL).
        then((products) => {
          resolve(products);
        }).catch((error) => {
          reject(error);
        })
    });
    return dbPromise;
  }
  
  public getProductById(requestJSON) {
    const dbPromise = new Promise((resolve, reject) => {

      requestJSON.configSQL.table = 'product';
      let dbSQL = ProductSQL.getCustomerById;
      requestJSON.configSQL.id = requestJSON.id;

      db.one(dbSQL, requestJSON.configSQL).
        then((products) => {
          resolve(products);
        }).catch((error) => {
          reject(error);
        })
    });
    return dbPromise;
  }

 public deleteProduct(requestJSON) {
    const dbPromise = new Promise((resolve, reject) => {

      requestJSON.configSQL.table = 'product';
      let dbSQL = ProductSQL.deleteProduct;
      requestJSON.configSQL.id = requestJSON.id;


      db.any(dbSQL, requestJSON.configSQL).
        then((products) => {
          resolve(products);
        }).catch((error) => {
          reject(error);
        })
    });
    return dbPromise;
  }

  public customerLogin(requestJSON){
    const dbPromise = new Promise((resolve, reject) => {

      requestJSON.configSQL.table = 'customer';
      let dbSQL=ProductSQL.customerLogin;
      requestJSON.configSQL.username=requestJSON.customer.username;
      requestJSON.configSQL.password=requestJSON.customer.password;
  
      db.any(dbSQL, requestJSON.configSQL).
        then((customers) => {
          resolve(customers);
        }).catch((error) => {
          reject(error);
        })
    });
    return dbPromise;
  }

  public addCustomer(requestJSON){
    const dbPromise = new Promise((resolve,reject) => {
        requestJSON.configSQL.table = 'customer';
        let dbSQL = dbUtility.insertSql(requestJSON.customer,requestJSON.configSQL)
        db.any(dbSQL, requestJSON.configSQL).then((customerId)=> {
            resolve(customerId);
        }).catch((error) =>{
            reject(error);
        })
    })
    return dbPromise;
}

}

export const productRepository = new productRepositoryClass();
