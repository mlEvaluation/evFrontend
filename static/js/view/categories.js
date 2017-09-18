
define(["view/templates/categories"], function (CategoriesTemplate) {

  let Categories = Backbone.View.extend({
    tagName: "nav",

    className: "categories",

    render : function(){
      this.$el.html(CategoriesTemplate(this.model.toJSON()));
      return this.$el;
    }
  });

  let CategoriesModel = Backbone.Model.extend({});
  return new Categories({ model : new CategoriesModel() });

});
