// This script implements simple routing by loading partial HTML files 
// named corresponding to fragment identifiers.
//
// By Curran Kelleher October 2014

// Wrap everything in an immediately invoked function expression,
// so no global variables are introduced.
(function () {

  // Stores the cached partial HTML pages.
  // Keys correspond to fragment identifiers.
  // Values are the text content of each loaded partial HTML file.
  var partialsCache = {}

  // Gets the appropriate content for the given fragment identifier.
  // This function implements a simple cache.
  function getContent(fragmentId, callback){

    // If the page has been fetched before,
    if(partialsCache[fragmentId]) {

      // pass the previously fetched content to the callback.
      callback(partialsCache[fragmentId]);

    } else {
      // If the page has not been fetched before, fetch it.
      $.get(fragmentId + ".html", function (content) {
      
        // Store the fetched content in the cache.
        partialsCache[fragmentId] = content;

        // Pass the newly fetched content to the callback.
        callback(content);
      });
    }
  }

  function getHeader(fragmentId, callback) {
  	 $.get("headers/" + fragmentId + "_header.html", function (header) {

  	 	$('.sidebar').load("sidebar/sidebar.html");
  	 	partialsCache[fragmentId] = header;
  	 	callback(header);
  	 });
  }

  // Sets the "active" class on the active navigation link.
  function setActiveLink(fragmentId){
    $("#navbar a").each(function (i, linkElement) {
      var link = $(linkElement),
          pageName = link.attr("href").substr(1);
      if(pageName === fragmentId) {
        link.attr("class", "active");
      } else {
        link.removeAttr("class");
      }
    });
  }

  // Updates dynamic content based on the fragment identifier.
  function navigate(){

    // Isolate the fragment identifier using substr.
    // This gets rid of the "#" character.
    var fragmentId = location.hash.substr(1);

    // Set the "content" div innerHTML based on the fragment identifier.
    getContent(fragmentId, function (content) {
      $("#content").html(content);
    });

     getHeader(fragmentId, function (header) {
      $("#header").html(header);
    });
  
    // Toggle the "active" class on the link currently navigated to.
    setActiveLink(fragmentId);
  }

    

  // If no fragment identifier is provided,
  if(!location.hash) {

    // default to #home.
    location.hash = "#non_member";
  }

  // Navigate once to the initial fragment identifier.
  navigate();

  // Navigate whenever the fragment identifier value changes.
  $(window).bind('hashchange', navigate);
}());




/* $(document).ready(function(){
	//Viser rett nettside i forhold til brukerrettigheter
    $.ajax({
        url:'db_class.php', "success" : function(response){
        	alert("ajax call success returns: "+ response);
            if(response==true){
            	$('.header').load("headers/teacher_header.html");
        		// $('.sidebar').load("sidebar/sidebar.html");
            	
            }else{
                $('.header').load("headers/non_member_header.html");
            }
        }
    });
});


$(document).ready(function(){
	//Henter session for å gi rett hjemmeside til rett bruker
	var session;
	$.ajaxSetup({cache: false})
	$.get('get_session.php', function (sessionSet) {
    	sessionSet = data;
    	$("#admin").load("headers/teacher_header.html")
	});
});
*/