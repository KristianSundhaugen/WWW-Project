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

       $('#submit_form').on('submit', function(e) {
        e.preventDefault();
         var formData = new FormData($(this)[0]);
         console.log(formData);
          $.ajax({
            url: "php/upload.php",
            method: "post",
            data: formData,
            processData: false,
            contentType: false,
            success: function(svar) {

              if(svar=="Uploaded") {
                window.location.href = "#member";
              } else if (svar=="Query could not execute !") {
                alert("Query could not execute !");
              } else {
                alert("Could not execute");
              }
            }

          });
      });
});
  

  