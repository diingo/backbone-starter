// 9 Listening to Models in Views

var Stock = Backbone.Model.extend({
  raise: function(amount){
    this.set({ price: this.get('price') + amount });
    // this.price += amount; // this line is wrong - fix it
  }
});

var StockView = Backbone.View.extend({
  initialize: function(options) {
    this.listenTo(this.model, 'change:price', this.onPriceChange);
  },
  onPriceChange: function(model) {
    console.log('New price for', this.model.get('name'), this.model.get('price'));
    this.render();
  },
  render: function(){
    console.log('Rendering', this.model.get('name'));
  }
});

var stock = new Stock({
  name: 'AAPL',
  price: 480
});

var stockView = new StockView({
  model: stock
});

// Raising the price causes the view to re-render
stock.raise(0.5);


