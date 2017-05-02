 $("document").ready(function()
  {
    /* validation */
    $("#login_form_id").validate({
        rules:
        {         
            pwd: {
                required: true,
                minlength: 5,
                maxlength: 15
            },
            email: {
                required: true,
                email: true
            },
        },
        messages:
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
        var data = $("#login_form_id").serialize();
        $.ajax({

            type : 'POST',
            url  : 'php/login.php',
            data : data,
            beforeSend: function()
            {
                $("#error").fadeOut();
                $("#form_submit_btn").html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; sending ...');
            },
            success :  function(data)
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
                    window.location.href = "#member";

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