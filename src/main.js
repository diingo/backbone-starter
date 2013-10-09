// 10 Views listening to Models exercise
var Stock = Backbone.Model.extend({
  change: function(amount){
    this.set({ price: this.get('price') + amount });
  }

});

var StockView = Backbone.View.extend({
  initialize: function(options){
    this.listenTo(this.model, 'change:price', this.render);
  },
  render: function(){
    $(this.el).html("<p>" + this.model.get('name') + ":" + this.model.get('price')+ "</p>");
  }
});

var stock = new Stock({
  name: 'YHOO',
  price: 34.03
});




var stockView = new StockView({ model: stock });
var newView = new StockView({ model: burt })
// Render and add to page
stockView.render();
$('.stocks').append(stockView.el); // HOW DOES stockView.el WORK? TYPED IN CONSOLE, IT OUTPUTS <div>"<p>" + this.model.get('name') + ":" + this.model.get('price')+ "</p>"</div>

// Perform an update every two seconds
var updateLoop = function(){
  var priceChangeAmount = Math.round(Math.random() * 300-150) / 100;

  stock.change(priceChangeAmount);

  setTimeout(updateLoop, 2000);
};

updateLoop();