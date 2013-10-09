//http://learn.themakersquare.com/pages/week-5/backbone-models

// var Todo = Backbone.Model.extend({

//   uncheck: function() {
//     this.set({ complete: false });
//   }
// });

// 4 - Partner ex #1 - Player Mario 
var Player = Backbone.Model.extend({

  initialize: function(options){
    this.hp = options.hp;
  },

  hurt: function(health){
    this.hp = this.hp - health;
    this.set({ hp: this.hp });
  }
});

// 5 Model Defaults
var Profile = Backbone.Model.extend({
  species: 'human',
  defaults: {
    mood: 'contemplative'
  }
});

var alice = new Profile({
  name: 'Alice',
  favoriteFood: 'Apples'
});

  // note this does not use .get
console.log('Species?', alice.species);

  // These two use .get
console.log('Favorite food?', alice.get('favoriteFood'));
console.log('Mood?', alice.get('mood'));

// 6 - Partner Exercise #2
var Entity = Backbone.Model.extend({

    defaults: {
      hp: 20,
      strength: 9
    },

    attack: function(target){
      enemyHealth = target.get('hp');
      playerStrength = this.get('strength');
      
      if (enemyHealth - playerStrength >= 0){
        result = enemyHealth - playerStrength;
      } else {
        result = 0;
      }
      target.set({hp: result});

    }
});

var player = new Entity({ hp: 45, strength: 17 });
var enemy = new Entity();

player.attack(enemy);
enemy.attack(player);

console.log('Player should have 36 hp:', player.get('hp'));
console.log('Enemy should have 3 hp:', enemy.get('hp'));

player.attack(enemy);
console.log('Enemy should have 0 hp:', enemy.get('hp'));



// 7 Model Events

var Todo = Backbone.Model.extend({
  uncheck: function(){
    this.set({ complete: false })
  }
});

window.todo = new Todo({ name: 'Learn models' });

  //
  // Listen for ALL property changes
  //
todo.on('change', function(model){
  console.log("\nSomething changed in model: " + model.get('name'));
});

  //
  // Listen for ONLY a property change on 'complete'
  //
todo.on('change:complete', function(model, newComplete){
  if (newComplete) {
    alert(model.get('name') + " is now complete!");
  } else {
    alert("Oops, " + model.get('name') + " isn't done yet.");
  }
});

// 8 Exercise 

var KungFuBoard = Backbone.Model.extend({
  
  initialize: function(attrs){
    this.size = attrs.hp;
    this.on('change:hp', this.break);
  },
  damage: function(amount){
    var kungFuBoardHP = this.get('hp');
    if(kungFuBoardHP - amount >= 0 ) {
      result = kungFuBoardHP - amount;
    } else {
      result = 0;
    }

    this.set({hp: result});
  },
  break: function(){
    var kungFuBoardHP = this.get('hp');
    if(kungFuBoardHP === 0){
      
      console.log("A " + this.size + " board breaks!")
    } else {
      console.log("Still alive (HP: " + this.get('hp') + ")")
    }
  }

});

var smallBoard = new KungFuBoard({ hp: 5 });
var bigBoard = new KungFuBoard({ hp: 10 });

smallBoard.damage(4);
smallBoard.damage(3);
console.log('Small board hp should be zero:', smallBoard.get('hp'));

bigBoard.damage(4);
bigBoard.damage(4);
bigBoard.damage(4);
console.log('Big board hp should be zero:', bigBoard.get('hp'));




