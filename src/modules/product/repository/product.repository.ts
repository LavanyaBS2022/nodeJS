import { resolve } from "path";
import { db, dbUtility } from "utils/database";

class productRepositoryClass{

    public addProduct(requestJSON){
        const dbPromise = new Promise((resolve,reject)=>{
          
          requestJSON.configSQL.table='customers';
          let dbSQL=dbUtility.insertManySql(requestJSON.product,requestJSON.configSQL); 
          
          db.many(dbSQL,requestJSON.configSQL).
          then((productId) => {
               resolve(productId);
          }).catch((error) => {
                reject(error);
          })
        });
        return dbPromise;
    }

}

export const productRepository = new productRepositoryClass();
