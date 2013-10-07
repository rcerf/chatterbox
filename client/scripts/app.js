$.get( "https://api.parse.com/1/classes/chatterbox", function( data ) {
  $( ".timeline" ).html( data );
  console.log(data);
  // console.log(data.results);
  var messages = data.results;
  for(var i=12; i<messages.length; i++){
    $(".timeline").append("<div>"+messages[i]["text"]+"</div>");
  }
});