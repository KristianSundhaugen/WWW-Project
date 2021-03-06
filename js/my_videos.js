//Displayer videoene til brukeren
$(document).ready(function() { // Starter når scriptet blir tilkaldt

    $.ajax({
        url:'php/my_videos.php', // Sender forspørsel til my_videos.php
        type:'POST',
        success:function(data){
            var result = $.parseJSON(data); // svar i JSON
            $.each(result, function(key, value){
                $.each(value, function(k, v){
                     if(k === "name"){ // skriver ut navnet på siden
                        $("#video_table >tbody:last").append(
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
                    if(k === "name"){ // skriver ut videoen som hører til navnet som hører til innlogget bruker.
                        $("#video_table >tbody >tr:last").append(
                        $('<td><video id="myvideo" height="300" width="700" controls><source src="html/Uploads/videos/' + v +'" type="video/mp4"> Your Browser does not support the video tag.</video></td>'));
                    }
                    if(k === "vid") {
                        $("#video_table >tbody >tr:last").append(
                           $("<td><input type='button' id='" + v + "' value='delete video' class='delete-button'/></td>")
                        );
                    }
                });
            });
        }
    });
    
    //script for knappen delete
    $("#video_table").on("click", ".delete-button", function(event) {
        var id = $(this).attr('id');
        console.log(id);
        $.ajax({
            url: 'php/delete_video.php',
            type: 'POST',
            data: 'id=' + id,
            success: function (data) {
                window.location.href = "#member";
            }
        });
    });
});