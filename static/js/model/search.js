
define(function () {

  return Backbone.Model.extend({
    defaults : {
      searchText : "",
      items: [],
      categories: []
    },

    url : function(){
      return "api/items?q=" + this.get("searchText");
    }
  });

});
