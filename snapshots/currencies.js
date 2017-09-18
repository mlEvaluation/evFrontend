var MlApiConnector = require('./../connector/MlApiConnector');

class CurrenciesSnapshot {
  constructor() {
    this.currencyMap = {};
  }

  getById(currencyId){
    return this.currencyMap[currencyId];
  }

  create(){
    let _that = this;

    return new Promise((resolve, reject) => {
      MlApiConnector.getCurrencies().then((response) => {
        response.map(function(currencyData){
          _that.currencyMap[currencyData.id] = currencyData;
        })
        console.log("[OK] Create currencies snapshot")
        resolve()
      }).catch(() => {
        console.log("[FAIL] Create currencies snapshot")
        reject()
      })
    })
  }

}

module.exports = new CurrenciesSnapshot();
