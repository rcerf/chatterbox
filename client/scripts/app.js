$(function(){ // on ready

  if(!('contains' in String.prototype))
    String.prototype.contains = function(str, startIndex) { return -1 !== String.prototype.indexOf.call(this, str, startIndex); };

  var timelineLength = 0;
  window.username = window.location.search.slice(10);
  window.roomname = "default";

  var displayMessages = function(){
    $.get( "https://api.parse.com/1/classes/chatterbox", function( data ) {
      var chatRooms = {};
      window.messages = data.results;
      for (var i = timelineLength; i < window.messages.length; i++){
        var mes = window.messages[i];
        $('.timeline').append($("<div>"));
        $('.timeline > div').last().addClass('username');
        $('.username').last().text(mes.username + ": ");
        $('.username').last().append($('<span>'));
        $('.username > span').last().addClass('message');
        $('.message').last().text(mes.text);
        if (!chatRooms[mes.roomname]) {
          chatRooms[mes.roomname] = true;
        }
      }
      for (var keys in chatRooms){
        $('.room-option').append($("<option>"));
        $('.room-option > option').last().text(keys);
      } // breaks?
      timelineLength = messages.length;
    });
  };
  displayMessages();
  setInterval(displayMessages, 3000);

  var postMessage = function(e){
    e.preventDefault();
    // window.username = $('option:selected');
    var text = $('input[name=post]').val();
    var message = {
      'username': window.username,
      'text': text,
      'roomname': window.roomname
    };
    console.log(message);

    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
    // see https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
      }
    });
  };

  $('input[type=submit]').on('click', postMessage);

  $(".username-option").prepend($('<option>'));
  $('.username-option > option').first().text(username || "anonymous");
  // $(".username-option").append($('<option>'));
  // $('.username-option > option').last().addClass("addUsername").text("add username");

  $('.addUsername').on('click',function(e){
    e.preventDefault();
    var newUsername = prompt("Add new username:" || 'anonymous');
    $(".username-option").append($('<option>'));
    $('.username-option > option').last().text(newUsername);
    window.username = newUsername;
  });

  $('#usernames').change(function(){
    console.log('changed');
    window.username = $('#usernames :selected').text();
  });

  var appendDiv = function(mes){
    $('.timeline').append($("<div>"));
    $('.timeline > div').last().addClass('username');
    $('.username').last().text(mes.username + ": ");
    $('.username').last().append($('<span>'));
    $('.username > span').last().addClass('message');
    $('.message').last().text(mes.text);
  };

  $('#rooms').change(function(){
    $('.timeline').empty();
    if ($('#rooms :selected').text() === "All chat rooms"){
      for (var i = 0; i < window.messages.length; i++){
        var mes = window.messages[i];
        appendDiv(mes);
      }
    } else {
      for (var i = 0; i < window.messages.length; i++){
        var mes = window.messages[i];
        if (mes.roomname === $('#rooms :selected').text()) {
          appendDiv(mes);
        }
      }
    }
  });

  $('.addChatroom').on('click',function(e){
    e.preventDefault();
    var newChatroom = prompt("Add new chatroom:" || 'default');
    $(".room-option").append($('<option>'));
    $('.room-option > option').last().text(newChatroom);
    window.roomname = newChatroom;
  });

});
