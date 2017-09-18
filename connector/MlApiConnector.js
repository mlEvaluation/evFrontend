
const API_SEARCH_ITEMS_ENDPOINT = "https://api.mercadolibre.com/sites/MLA/search";
const API_DETAIL_ITEM_ENDPOINT = "https://api.mercadolibre.com/items/:id";
const API_DETAIL_ITEM_DESCRIPTION_ENDPOINT = "https://api.mercadolibre.com/items/:id/description";
const API_CURRENCIES_ENDPOINT = "https://api.mercadolibre.com/currencies";
const API_CATEGORIES_ENDPOINT = "https://api.mercadolibre.com/categories/:id";
const unirest = require('unirest');
const extend = require('util')._extend;

class MlApiConnector {

  getItems(options){
    console.log("getItems options: "  + JSON.stringify(options));

    return new Promise((resolve, reject) => {
      unirest.get(API_SEARCH_ITEMS_ENDPOINT)
        .query({'q': options.querySearch})
        .end(function(res) {
          if (res.error) {
            reject(res.error);
          } else {
            resolve(res.body);
          }
        })
    });
  }

  getDetailItem(options){
    console.log("getDetailItem options: "  + JSON.stringify(options));

    let promiseDetailItem = new Promise((resolve, reject) => {
      unirest.get(API_DETAIL_ITEM_ENDPOINT.replace(":id", options.id)).end(function(itemResponse) {
        if (itemResponse.error) {
          reject(itemResponse.error);
        } else {
          unirest.get(API_CATEGORIES_ENDPOINT.replace(":id", itemResponse.body.category_id)).end(function(categoriesResponse) {
            if (categoriesResponse.error) {
              reject(categoriesResponse.error);
            } else {
              let categories = categoriesResponse.body.path_from_root.map(function(path){
                return path.name;
              });

              resolve(extend(itemResponse.body, {categories:categories}));
            }
          });
        }
      })
    });

    let promiseDetailItemDescription = new Promise((resolve, reject) => {
      unirest.get(API_DETAIL_ITEM_DESCRIPTION_ENDPOINT.replace(":id", options.id))
        .end(function(res) {
          if (res.error) {
            reject(res.error);
          } else {
            resolve(res.body);
          }
        })
    });

    return Promise.all([promiseDetailItem, promiseDetailItemDescription]);
  }

  getCurrencies(options){
    return new Promise((resolve, reject) => {
      unirest.get(API_CURRENCIES_ENDPOINT)
        .end(function(res) {
          if (res.error) {
            reject(res.error);
          } else {
            resolve(res.body);
          }
        })
    });
  }

}

module.exports = new MlApiConnector();
