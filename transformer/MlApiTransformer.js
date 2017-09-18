const CurrenciesSnapshot = require('./../snapshots/currencies');
const AUTHOR = {
  name : "Gonzalo",
  lastname : "Montero"
}

class MlApiTransformer {

  transformItems(response){
    let _that = this;
    let items = response.results.slice(0,4).map(function(item){
      return _that.transformItem(item);
    });

    let categoryFilter = response.filters.find(function(filter){
      return filter.id === "category";
    });

    let categories = (categoryFilter) ? [].concat.apply([], categoryFilter.values.map(function(element){
      return element.path_from_root.map(function(path){
        return path.name;
      });
    })) : [];

    return {
      author : AUTHOR,
      items : items,
      categories : categories
    }
  }

  transformDetailItem(response){
    let detailItem = response[0],
        itemDescription = response[1],
        baseDetailItem = this.transformBaseItem(detailItem),
        customDetailItem =  {
          picture : detailItem.pictures[0].url,
          sold_quantity : detailItem.sold_quantity,
          description : (itemDescription.text || itemDescription.plain_text)
        },
        item = Object.assign({}, baseDetailItem, customDetailItem);

    return {
      author : AUTHOR,
      item : item,
      categories : detailItem.categories
    }
  }

  transformBaseItem(searchItem){
    let currencyData = CurrenciesSnapshot.getById(searchItem.currency_id);
    let decimalPart = Math.round((searchItem.price  - parseInt(searchItem.price)) * 100);
    let roundedPrice = this.decoratePrice(Math.round(searchItem.price));

    return {
      id : searchItem.id,
      title : searchItem.title,
      condition : searchItem.condition,
      free_shipping : searchItem.shipping.free_shipping,
      price : {
        currency: currencyData.symbol,
        amount: roundedPrice,
        decimals: decimalPart
      }
    }
  }

  transformItem(searchItem){
    let baseItem = this.transformBaseItem(searchItem)
    let customItem = {
      picture : searchItem.thumbnail,
      address : {
        state_name : searchItem.address.state_name
      }
    }

    return Object.assign({}, baseItem, customItem);
  }

  decoratePrice(price){
    price = price.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
    return price.split('').reverse().join('').replace(/^[\.]/,'');
  }

}

module.exports = new MlApiTransformer();
