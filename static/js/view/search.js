
define(["model/search", "view/categories", "view/items"], function (SearchModel, Categories, Items) {

  let SearchView = Backbone.View.extend({
    el : "#container",

    events : {
      "click li.searchItem": "onClickItem"
    },

    initialize: function(){
      let _that = this;

      this.listenTo(this.model, 'change:searchText', function(){
        this.$el.html("<div style='margin-top: 15px;'>Buscando...</div>");
        this.model.fetch({
          success : function(){
              _that.render();
          },
          error : function(){
            _that.model.clear({silent: true});
            _that.render();
          }
        });
      });
    },

    onClickItem : function(element){
      let itemId = element.currentTarget.getAttribute("data-item-id");
      window.location.hash = "items/" + itemId;
    },

    render : function(){
      this.$el.empty();

      if(!_.isEmpty(this.model.get("items"))){
        Items.model.set("items", this.model.get("items"));
        Categories.model.set("categories", this.model.get("categories"));

        this.$el.append(Categories.render());
        this.$el.append(Items.render());
      } else {
        this.$el.html("<div style='margin-top: 15px;'>No se han encontrado resultados con el termino buscado.</div>");
      }
    }
  });

  return new SearchView({ model : new SearchModel({}) });

});
