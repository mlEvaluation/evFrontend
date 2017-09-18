define(["router/router"], function (Router) {

  var App = Backbone.View.extend({
    el: "#frmSearch",

    domElements : {
      txtSearch : null
    },

    events: {
      "submit": "onSubmit"
    },

    initialize: function() {
      this.domElements.txtSearch = this.$el.find("#txtSearchBox");
      this.domElements.txtSearch.focus();
    },

    onSubmit: function(e){
      e.preventDefault();
      let searchText = this.domElements.txtSearch.val();
      Router.doSearch(searchText);
    }
  });

  return new App();

});
