
define(["app", "view/templates/items"], function (Router, SearchItemsTemplate) {

  let Items = Backbone.View.extend({
    tagName: "ul",
    className: "searchResults",

    render: function(){
      this.$el.html(SearchItemsTemplate(this.model.toJSON()));
      return this.$el;
    }
  });

  let ItemsModel = Backbone.Model.extend({});
  return new Items({ model : new ItemsModel() });

});
