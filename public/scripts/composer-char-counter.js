//Counter function for textbook that holds new tweets
//This function will also turn counter red if below 140

$(document).ready(function() {
  
  $(".tweet-text").on("keyup", function() {
    
    let counter = $(this).parent().children().children(".counter");
    let tweet = $(this).val().length;

    counter.text(140 - tweet);
    
    if (tweet > 140) {
      counter.addClass('below140');
    } else {
      counter.removeClass('below140');
    }
  });
});
