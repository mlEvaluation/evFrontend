
define(["view/search", "view/detail"], function (SearchView, DetailView) {

  var AppRouter = Backbone.Router.extend({
      routes: {
          "items/:id": "routeDetail",
          "items?search=:search": "routeSearch"
      },

      doSearch : function(searchText){
        this.navigate("/items?search=" + searchText);
        document.getElementById("txtSearchBox").value = searchText;
        SearchView.model.set({"searchText" : searchText}, {silent:true});
        SearchView.model.trigger("change:searchText");
      },

      doDetail : function(id){
        this.navigate("/items/" + id);
        DetailView.model.set({"id" : id}, {silent:true});
        DetailView.model.trigger("change:id");
      }
  });

  var router = new AppRouter();
  router.on('route:routeSearch', function (searchText) {
    this.doSearch(searchText);
  });

  router.on('route:routeDetail', function (id) {
    this.doDetail(id);
  });

  Backbone.history.start();

  return router;

});
