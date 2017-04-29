
// alert($("#login-form").serialize())

$(document).on("click", "#form_submit_btn", function(e) {
	$.ajax ({
		type: "post",
		url: "php/login.php",
		cache: false,
		data: $("#login-form").serialize(),
		success: function (response) {	
			var result = response;
			console.log(result);								
			window.location.href="#member";	
			alert(response);	
		}
	});
});