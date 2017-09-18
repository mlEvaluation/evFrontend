var MlApiConnector = require('./../connector/MlApiConnector');
var MlApiTransformer = require('./../transformer/MlApiTransformer');

class MlApiService {

  getItems(req, res){
    MlApiConnector.getItems({
      querySearch : req.query.q,
    }).then((response) => {
      res.json(MlApiTransformer.transformItems(response))
    }).catch((error) => {
      console.log(error)
      res.status(500).json({ description: error.toString() })
    });
  }

  getDetailItem(req, res){
    MlApiConnector.getDetailItem({
      id : req.params.id
    }).then((response) => {
      res.json(MlApiTransformer.transformDetailItem(response))
    }).catch((error) => {
      console.log(error)
      res.status(500).json({ description: error.toString() })
    });
  }

}

module.exports = new MlApiService();
