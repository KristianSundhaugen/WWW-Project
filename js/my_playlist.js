$('document').ready(function() { // Når scriptet til tilkaldt
	/* validation */
    $("#playlist-form").validate({ // valider det brukeren skriver inn
        rules:
        {         
            playlist: {
                required: true // feltet kan ikke stå tomt
            },
        },
        messages:
        {
            playlist:{
                required: "Provide a Playlist name"
            }
        },
        submitHandler: createPlaylist // starter createPlaylist funksjonen
    });
    /* validation */
  /* form submit */
    function createPlaylist()
    {
        var data = $("#playlist-form").serialize();

        $.ajax({

            type : 'POST',
            url  : 'php/create_playlist.php',
            data : data,
            beforeSend: function()
            {
                $("#error").fadeOut();
                $("#form_submit_btn").html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; sending ...');
            },
            success :  function(data)
            {
                if(data=="playlist already exists"){
                    $("#error").fadeIn(1000, function(){
                        $("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp;Playlist already exists !</div>');

                        $("#form_submit_btn").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Log in');
                    });
                }
                else if(data=="Successfully created playlist")
                {
                    $("#form_submit_btn").html('Creating');
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
    //Displayer spillelistene til brukeren
    $.ajax({
        url:'php/display_playlists.php',
        type:'POST',
        success:function(data){
            var result = $.parseJSON(data);
            $.each(result, function(key, value){
                $.each(value, function(k, v){
                    if(k === "pName"){
                        $("#playlist_table >tbody:last").append(
                            $('<tr>').append(
                                $('<td>').append(v)
                                .append(
                                    $('</td>').append(
                                        $('</tr>')
                                    )
                                )
                            )
                        );
                    }
                    if(k === "pId"){
                        $("#playlist_table >tbody >tr:last").append(
                           $("<td><input type='button' id='" + v + "' value='enter playlist' class='enter-button'/></td>")
                        );
                        $("#playlist_table >tbody >tr:last").append(
                           $("<td><input type='button' id='" + v + "' value='delete playlist' class='delete-button'/></td>")
                        );
                        if(localStorage.getItem('vid')) {   //Hvis det er medsendt en video
                            $("#playlist_table >tbody >tr:last").append(
                            $("<td><input type='button' id='" + v + "' value='add to playlist' class='add-button'/></td>"));
                        }
                    }
                });
            });
        }
    });
    //Funksjon for knappen enter
    $("#playlist_table").on("click", ".enter-button", function(event) {
        var id = $(this).attr('id');
        localStorage.setItem('pid', id);     //Lagrer spilleliste iden slik at den kan brukes etter pageload
        window.location.href = "#playlist";
    });
    //Funksjon for knappen delete
    $("#playlist_table").on("click", ".delete-button", function(event) {
        var id = $(this).attr('id');
        console.log(id);
        $.ajax({
            url: 'php/delete_playlist.php',
            type: 'POST',
            data: 'id=' + id,
            success: function (data) {
                window.location.href = "#member";
            }
        });
    });
    //Funksjon for å legge til video i spilleliste
    $("#playlist_table").on("click", ".add-button", function(event) {
        var pid = $(this).attr('id');
        var vid = localStorage.getItem('vid');
        console.log(pid);
        console.log(vid);
        $.ajax({
            url: 'php/add_to_playlist.php',
            type: 'POST',
            dataType: 'json',
            data: {'pid': pid, 'vid': vid},
            success: function (data) {
                localStorage.removeItem('vid');
                localStorage.removeItem('pid');
                window.location.href = "#member";
            }

        });
    });
});