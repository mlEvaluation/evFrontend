
define(["model/detail", "view/categories", "view/product"], function (DetailModel, Categories, Product) {

  let DetailView = Backbone.View.extend({
    el : "#container",

    initialize: function(){
      let _that = this;

      this.listenTo(this.model, 'change:id', function(){
        this.$el.html("<div style='margin-top: 15px;'>Cargando...</div>");
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

    render : function(){
      this.$el.empty();

      if(!_.isEmpty(this.model.get("item"))){
        Categories.model.set("categories", this.model.get("categories"));
        Product.model.set("item", this.model.get("item"));
        this.$el.append(Categories.render());
        this.$el.append(Product.render());
      } else {
        this.$el.html("<div style='margin-top: 15px;'>Ha ocurrido un error, vuelva a intentarlo.</div>");
      }
    }
  });

  let detailModel = new DetailModel({});
  return new DetailView({ model : detailModel });

});
