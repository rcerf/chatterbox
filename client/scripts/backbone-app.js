var Message = Backbone.Model.extend({
  url: "https://api.parse.com/1/classes/chatterbox"
});

var Messages = Backbone.Collection.extend({
  model: Message,
});

var NewMessageView = Backbone.View.extend({
  events: {
    "submit form": "addMessage"
  },

  initialize: function(){
    this.collection.on('add', this.clearInput, this);
  },

  addMessage: function(e) {
    e.preventDefault();
    //do we create a new collection of messages or do we post directly to the server?
    this.collection.create({
      username: window.location.search.slice(10), //how do we grab the username? this.$()
      text: this.$('input[name=post]').val(),
      roomname: this.$("#rooms :selected").val() //maybe??
    });
  },

  clearInput: function(){
    this.$("input[name=post]").val('');
  }
});

var MessagesView = Backbone.View.extend({
  initialize: function(){
    this.collection.on("add", this.appendMessage, this);
  },

  appendMessage: function(mes){
    console.log(mes);
    this.$('.timeline').append($("<div>"));
    this.$('.timeline > div').last().addClass('post');
    this.$('.post').last().append($("<span>"));
    this.$('.post > span').last().addClass('username').text(mes.attributes.username + ": ");
    this.$('.username').last().append($("<span>"));
    this.$('.username > span').last().addClass('message').text(mes.attributes.text);
  }
});

$(document).ready(function(){
  var messages = new Messages();
  new NewMessageView({el: $("#main"), collection: messages});
  new MessagesView({el: $("#main"), collection: messages});
});