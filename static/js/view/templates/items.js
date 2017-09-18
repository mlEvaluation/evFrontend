
define(function () {

  var SearchItemsTemplate = _.template([
    '<% _.each(items, function(item){ %>',
      '<li class="searchItem" data-item-id="<%= item.id %>">',
          '<div class="imageContainer">',
            '<img alt="" class="image" src="<%= item.picture %>">',
          '</div>',
          '<div class="itemInfo">',
            '<p class="price">',
              '<%= item.price.currency %> <%= item.price.amount %>',
              '<% if (item.free_shipping) { %>',
                  '<span class="freeShipping"></span>',
                '<% } %>',
            '</p>',
            '<p class="title"><%= item.title %></p>',
          '</div>',
          '<div class="location">',
            '<p class="city"><%= item.address.state_name %></p>',
          '</div>',
      '</li>',
    '<% }) %>'
  ].join(""));

  return SearchItemsTemplate;

});
