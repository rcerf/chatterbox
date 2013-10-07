var timelineLength = 12;

var displayMessages = function(){
  $.get( "https://api.parse.com/1/classes/chatterbox", function( data ) {
    console.log("refreshed");
    // console.log(data.results);
    var messages = data.results;
    for(var i = timelineLength; i < messages.length; i++){
      var mes = messages[i];
      $(".timeline").append("<div>"+
        "<span class = 'username'>"+
        mes.username +
        ": </span>" +
        "<span class = 'message'>"+ mes.text+ "</span>" + "</div>");
    }
    timelineLength = messages.length;
  });
};
displayMessages();
setInterval(displayMessages, 3000);
