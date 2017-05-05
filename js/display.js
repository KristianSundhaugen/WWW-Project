$(document).ready(function(){
    // Displayer alt fra databasen om videoene som er lastet opp, samt displayer videoen.
    $.ajax({
        url:'php/display.php',
        type:'POST',
        success:function(data){
            var result = $.parseJSON(data);
            $.each(result, function(key, value){
                $.each(value, function(k, v){
                    if(k === "name"){
                        $("#display_table >tbody:last").append(
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
                    /*
                    if(k === "type"){
                        var temp = v; // For bruk i video show, trenger fileextensionvalue (mp4, ogg osv..)
                        $("#display_table >tbody >tr:last").append(
                            $('<td>').append(v)
                            .append(
                                $('</td>')
                            )
                        );
                    }
                    if(k === "size"){                       
                        $("#display_table >tbody >tr:last").append(
                            $('<td>').append(v)
                            .append(
                                $('</td>')
                            )
                        );
                    }
                    if(k === "bid"){
                        $("#display_table >tbody >tr:last").append(
                            $('<td>').append(v)
                            .append(
                                $('</td>')
                            )
                        );
                    }
                    */
                    if(k === "vid"){
                        /*
                        $("#display_table >tbody >tr:last").append(
                            $("<td><input type='button' id='" + v + "' value='delete' class='delete-button'/></td>")
                        );
                        */
                        $("#display_table >tbody >tr:last").append(
                           $("<td><input type='button' id='" + v + "' value='add to playlist' class='add-button'/></td>")
                        );
                    }
                    if(k==="name") {
                            $("#display_table >tbody >tr:last").append(
                        $('<td><video id="myvideo" height="300" width="700" controls><source src="html/Uploads/videos/' + v +'" type="video/mp4"> Your Browser does not support the video tag.</video></td>'));                               
                    }
                });
            });
        }
    });
    //funksjon for å legge til video i spilleliste
    $("#display_table").on("click", ".add-button", function(event) {
        var id = $(this).attr('id');
        console.log(id);
        localStorage.setItem('vid', id);     //Lagrer videons id slik at den kan brukes etter pageload
        window.location.href = "#my_playlists";
    });
});

