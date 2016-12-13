$(document).ready(function() {
  var colorRanNum = 1;
  var msg;
  console.log(msg);
  
    $.ajax( {
      url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      type: 'GET',
      crossDomain: true,
      success: function(data) {
        var post = data.shift(); // The data is an array of posts. Grab the first one.
        $('#quote-title').text(post.title);
        $('#quote-content').html(post.content);
      },
      error: function() { alert('Failed!'); },
      cache: false
    });


  $("#get-quote").on("click", function(e) {
    e.preventDefault();
    $.ajax( {
      url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      type: 'GET',
      crossDomain: true,
      success: function(data) {
        var post = data.shift(); // The data is an array of posts. Grab the first one.
        $('#quote-title').text(post.title);
        $('#quote-content').html(post.content);
        var msg = (post.content).replace(/<\/?[^>]+>/gi, '').replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&#8211;/g, "-").replace(/&mdash;/g, "--");
        msg = msg.replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&#8230;/g, "...").replace(/&#038;/g, "&");
        msg = msg.slice(0, (msg.length -2));
        msg = msg
        var author = (post.title).replace(" ", "");
        msg = msg + " #" + author;

        $('#tweetBtn iframe').remove();
        var tweetBtn = $('<a></a>')
          .addClass('twitter-share-button')
          .attr('href', 'http://twitter.com/share')
          .attr('data-size', "large")
          .attr('data-text', msg);
        $('#tweetBtn').append(tweetBtn);
        twttr.widgets.load();
      },
      error: function() { alert('Failed!'); },
      cache: false
    });
    changeColor();

  });

  // function setHeader(xhr) {
  //   xhr.setRequestHeader('Authorization', token);
  // }


  function changeColor() {
    if (colorRanNum >= 8) {
      colorRanNum = 9;
      $("#background-color").removeClass().addClass("background" + colorRanNum);
      $("#get-quote").removeClass().addClass("background" + colorRanNum);
      colorRanNum = 0;
    } else {
      colorRanNum += 1;
      $("#background-color").removeClass().addClass("background" + colorRanNum);
      $("#get-quote").removeClass().addClass("background" + colorRanNum);
    }
  }

});


// $('#tweet').on('click', function() {
//
//   ev.preventDefault();
//   $('#tweetBtn iframe').remove();
//   // $("#tweet").attr("data-text",msg);
//   // var tweetBtn = $('<a></a>')
//   //   .addClass('twitter-share-button')
//   //   .attr('href', 'http://twitter.com/share')
//   //   .attr('data-url', 'http://test.com')
//   //   .attr('data-text', msg);
//   // $('#tweetBtn').append(tweetBtn);
//   // twttr.widgets.load();
//
// });
