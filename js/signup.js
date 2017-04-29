$(document).ready(function(){
	alert($('#sign-up-form').length) // if is == 0, not found form
	$("#sign-up-form").on('submit', function(e){
		e.preventDefault(); //prevent form from submitting
		alert($('#sign-up-form').length) // if is == 0, not found form
		//check the form is not currently submitting
    	if($(this).data('formstatus') !== 'submitting'){

			//Setup variabler
			var form = $(this),
				formData = form.serialize(),
				formMethod = form.attr('method'),
				responseMsg = $('#signup-response');

			//add status data til form
			form.data('formstatus', 'submitting');

			window.alert("du e her");
			console.log(form);
			//Vis respons melding - venter
			responseMsg.hide()
				.addClass('response-waiting')
				.text('Please Wait...')
				.fadeIn(200);
			//Send data til serveren
			$.ajax({
				url: 'php/signup.php',
				tyoe: formMethod,
				data: formData,
				success: function(data){
					console.log(form);
					//Setup variabler
					var responseData = jQuery.parseJSON(data), // holder parsed json responsen
						klass = '';
					console.log(responseData);
					//Respons konditional
					switch(responseData.status){
						case 'error':
							klass = 'response-error';
						break;
						case 'success':
							klass = 'response-success';
						break;
					}

					//Vis responsmelding
					responseMsg.fadeOut(200, function(){
						$(this).removeClass('response-waiting')
							.addClass(klass)
							.text(responseData.message)
							.fadeIn(200, function(){
								//set timeout for å gjemme melding
								setTimeout(function(){
									responseMsg.fadeOut(200, function(){
										$(this).removeClass(klass);
									});
								}, 3000)
							});
					});
				}
			});
		}
		//forhindre formen fra å bli submitta
		return false;
	});
})
/*
$(document).on("click", "#sign-up", function(e) {
	$.ajax ({
		type: "post",
		url: "php/signup.php",
		cache: false,
		data: $("#sign-up-form").serialize(),
		success: function (data) {
			window.location.href="#member";
			alert(response);
		},
		error: function(data) {
			window.location.href="#non-member";
			alert(response);
		},
	});
});
*/