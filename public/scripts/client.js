/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 * Please disregard linting on lines 10, 42, 64, 80. They are a result of Prettier extension
 */

//Dependency attempting to fetch correct time for line 33

// const moment = require('moment'); // require
// moment().format();

//Creating the element that will be appeded to the webpage

// eslint-disable-next-line func-style
function createTweetElement(tweet) {
  
  //Creating tweet varible to store tweet
  let $tweet = $("<article>");
  //Creating HTML template
  let header =
  `
  <header class="head">
  <div class="user-info">
  <img class='avatar' src="${tweet.user.avatars}"/>
  <h2 class="user-name">${tweet.user.name}</h2>
  </div>
  <p class="user-handle">${tweet.user.handle}</p>
  </header>
  <div class="tweet">
  <p class="tweet-content">${tweet.content.text}</p>
  </div>
  <div class="tweet-date">
  <p>${new Date(tweet.created_at).toLocaleDateString()}</p>
  <p>🇨🇦♺❤️</p>
  </div>
  `;
  //Appending incoming tweets to header
  $tweet.append(header);
  //Returning tweet
  console.log($tweet);
  return $tweet;

}

//Error message function

// eslint-disable-next-line func-style
function isErrorTweets(input) {
  //If textbox is empty
  if (input === '') {
    //Targetting .error class and outputting error message
    $('.error').text("🚨------------Please enter a tweet! Thank you!------------🚨 ");
    $(".error").css('border-width', '2px');
    //Return if true
    return true;
  }
  //If textbook has more than 140 characters
  if (input.length > 140) {
    //Targetting .error class and outputting error message
    $('.error').text("You cant tweet that much!!!!!!");
    $(".error").css('border-width', '2px');
    //Return if true
    return true;
  }
};

//Function that will render tweets

// eslint-disable-next-line func-style
function renderTweets(tweets) {
  //Creating varible to store tweets
  let newTweets = $(".tweets").html('');
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    let tweetElement = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    newTweets.prepend(tweetElement);
  }
};


//Loading tweets to DOM

// eslint-disable-next-line func-style
function loadTweets() {

  $.ajax('/tweets', {
    method: 'GET'
  })
  .done(function(allTweets) {
    return renderTweets(allTweets)
  })
  .fail(error => console.log(error))
}


//Making sure DOM is ready
$(document).ready(() => {

  

  $('form').on('submit', (event) => {
    //Preventing page reload
    event.preventDefault();
    const input = $('form').find('textarea').val();
      
    if (isErrorTweets(input) === true) {
      return false;
    }
    //AJAX request
    $.ajax({

      url: '/tweets',
      method: 'POST',
      data: $('form').serialize()

    })
      .done((tweetData) => {

        return loadTweets();
      })
      .fail((error) => {

        console.log(error.message);
      })
      .always(() => {
        console.log('Request complted');
      });
  });

  loadTweets();
});










