
define(function () {

  return Backbone.Model.extend({
    defaults : {
      id : "",
      item : {}
    },

    url : function(){
      return "api/items/" + this.get("id");
    }
  });

});
