
define(["view/templates/product"], function (ProductTemplate) {

  let Product = Backbone.View.extend({
    tagName: "div",
    className: "productDetail",

    render: function(){
      this.$el.html(ProductTemplate(this.model.toJSON()));
      return this.$el;
    }
  });

  let ProductModel = Backbone.Model.extend({});
  return new Product({ model : new ProductModel() });

});
