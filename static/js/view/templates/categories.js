
define(function () {

  var CategoriesTemplate = _.template([
    "<ul>",
      "<% _.each(categories, function(categorie){ %>",
        "<li><%= categorie %></li>",
      "<% }) %>",
    "</ul>"
  ].join(""));

  return CategoriesTemplate;

});
