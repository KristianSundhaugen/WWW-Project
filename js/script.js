// This script implements simple routing by loading partial HTML files 
// named corresponding to fragment identifiers.
//


// Wrap everything in an immediately invoked function expression,
// so no global variables are introduced.
(function () {
  // Stores the cached partial HTML pages.
  // Keys correspond to fragment identifiers.
  // Values are the text content of each loaded partial HTML file.
  var partialsCache = {}

  // Gets the appropriate content for the given fragment identifier.
  function getContent(fragmentId, callback){

      // If the page has not been fetched before, fetch it.
      $.get("html/" + fragmentId + ".html", function (content) {
      
        // Store the fetched content in the cache.
        // partialsCache[fragmentId] = content;

        // Pass the newly fetched content to the callback.
        callback(content);
      });   
  }

  // Get the appropriate header for the given fragment identifier.
  // This function implements a simple cache.
  function getHeader(fragmentId, callback) {
  	 $.get("headers/" + fragmentId + "_header.html", function (header) {

  		// If the user is a non_member, he will not be able to use the sidebar.
  	 	if(fragmentId == "non_member" || fragmentId == "login") { 
  	 		callback(header);
  		} else {
	  	 	$('.sidebar').load("sidebar/sidebar.html");
	  	 	callback(header);
	  	 }
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
  
  $(window).bind("hashchange", navigate);

 // Function to validate and run script on input from user, this is for the user to log in.


  // We can attach the `fileselect` event to the file inputs on the page
  $(document).on('change', ':file', function() {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
  });

  // We watch our custom `fileselect` event like this
  $(document).ready( function() {
      $(':file').on('fileselect', function(event, numFiles, label) {

          var input = $(this).parents('.input-group').find(':text'),
              log = numFiles > 1 ? numFiles + ' files selected' : label;

          if( input.length ) {
              input.val(log);
          } else {
              if( log ) alert(log);
          }

      });
  });
}());

