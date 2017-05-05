$(document).ready(function(){
    // Displayer alt fra databasen om videoene som er lastet opp, samt displayer videoen.
    $.ajax({
        url:'php/display.php', // Sender data til display.php
        type:'POST', // type POST
        success:function(data){ // Henter in returdata
            var result = $.parseJSON(data); // som JSON
            $.each(result, function(key, value){ // får tilbake en key og en value
                $.each(value, function(k, v){ // foreach hele denne funksjonen, for hver k og v skriv ut
                    if(k === "name"){ // hvis Key === name
                        $("#display_table >tbody:last").append( // skriv ut value til name 
                            $('<tr>').append(
                                $('<td>').append(v) // i non_member.html og member.html
                                .append(
                                    $('</td>').append(
                                        $('</tr>')
                                    )
                                )
                            )
                        );
                            
                    }
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
                    if(k === "vid"){ // Knappene for delete ved siden av videoen.
                        $("#display_table >tbody >tr:last").append(
                            $("<td><input type='button' id='" + v + "' value='delete' class='delete-button'/></td>")
                        );
                        $("#display_table >tbody >tr:last").append(
                           $("<td><input type='button' id='" + v + "' value='delete' class='delete-button'/></td>")
                        );
                    }
                    if(k==="name") { // display av selve videoen på non_member og member.
                            $("#display_table >tbody >tr:last").append(
                        $('<td><video id="myvideo" height="300" width="700" controls><source src="html/Uploads/videos/' + v +'" type="video/mp4"> Your Browser does not support the video tag.</video></td>'));                               
                    }
                });
            });
        }
    });
});

