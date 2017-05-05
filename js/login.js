 $("document").ready(function() // Når scriptet blir tilkalt kjør:
  {
    /* validation */
    $("#login_form_id").validate({ // Validerer det brukeren skriver inn underveis
        rules: // reglene for validate
        {         
            pwd: {
                required: true, // feltet må ha innhold
                minlength: 5, // Må ha tekst som er lengre en 5 tegn
                maxlength: 15 // må ha tekst som er innenfor 15 tegn
            },
            email: {
                required: true, // Må ha innhold
                email: true // dette skal være en email (Inneholder @ og .)
            },
        },
        messages: // Meldinger om reglene blir brudt
        {
            pwd:{
                required: "Provide a Password",
                minlength: "Password Needs To Be Minimum of 5 Characters"
            },
            email: "Enter a Valid Email",
        },
        submitHandler: loginForm
    });
    /* validation */
  /* form submit */
    function loginForm()
    {
        var data = $("#login_form_id").serialize(); // serializerer dataene på feltet login_form_id
        $.ajax({

            type : 'POST',
            url  : 'php/login.php', // sender til login.php
            data : data,
            beforeSend: function()
            {
                $("#error").fadeOut(); // error tekst om noe gikk galt
                $("#form_submit_btn").html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; sending ...');
            },
            success :  function(data) // Ser etter returdata med forskjellige resultat i forhold til svar
            {
                if(data=="Invalid username or password"){

                    $("#error").fadeIn(1000, function(){


                        $("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; echo Invalid username or password !</div>');

                        $("#form_submit_btn").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Log in');

                    });

                }
                else if(data=="Logged in")
                {

                    $("#form_submit_btn").html('Loggin In');
                    window.location.href = "#member"; // Om brukeren fikk logget inn blir han sendt til member siden

                }
                else{

                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; '+data+' !</div>');

                        $("#form_submit_btn").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Log In');

                    });

                }
            }
        });
        return false;
    }
    /* form submit */
});