
define(function () {

  var ProductTemplate = _.template([
    "<div class='image'>",
      "<img src='<%= item.picture %>' alt='' />",
      "<div class='descriptionContainer'>",
        "<p class='title'>Description del producto</p>",
        "<div class='description'><%= item.description %></div>",
      "</div>",
    "</div>",
    "<div class='productInfo'>",
      "<p class='condition'>",
        "<span><% if (item.condition === 'new') { %> Nuevo <% } else { %> Usado <% } %></span> - <span><%= item.sold_quantity %> vendidos</span>",
      "</p>",
      "<p class='title'><%= item.title %></p>",
      "<p class='price'><%= item.price.currency %> <%= item.price.amount %></p>",
      "<div class='buyContainer'>",
        "<button class='buy'><span>Comprar</span></button>",
      "</div>",
    "</div>"
  ].join(""));

  return ProductTemplate;

});
