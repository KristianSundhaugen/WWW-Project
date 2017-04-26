
$(document).ready(function(){
	//Viser rett nettside i forhold til brukerrettigheter
    $.ajax({
        url:'get_session.php',
        cache:false,
        success:function(data){
        	alert("ajax call success returns: "+ data);
            if(data==true){
            	$('.header').load("headers/teacher_header.html");
        		$('.sidebar').load("sidebar/sidebar.html");
            	/*
            	$.ajax({
			        url:'get_privileges.php',
			        cache:false,
			        success:function(priv){
			        	alert("ajax call success returns: "+ priv);
			        	if(priv==true){
			        		$('.header').load("headers/teacher_header.html");
			        		$('.sidebar').load("sidebar/sidebar.html");
			        	}else{
			        		$('.header').load("headers/member_header.html");
			        		$('.sidebar').load("sidebar/sidebar.html");
			        	}
			        }
			    });
			    */
            }else{
                $('.header').load("headers/non_member_header.html");
            }
        }
    });
});

/*
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