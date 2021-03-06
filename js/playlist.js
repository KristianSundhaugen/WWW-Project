$(document).ready(function() {

	var playlistId = localStorage.getItem('pid'); // variabel for å finne hvilke videor ligger i spilleliste
	console.log(playlistId);

	$.ajax({
        url:'php/videos_in_playlist.php',
        type:'POST',
        data: {'pid': playlistId},
        success:function(data){
            var result = $.parseJSON(data);
            $.each(result, function(key, value){
                $.each(value, function(k, v){
                     if(k === "name"){
                        $("#playlist_video_table >tbody:last").append(
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
                    if(k === "name"){
                        $("#playlist_video_table >tbody >tr:last").append(
                        $('<td><video id="myvideo" height="300" width="700" controls><source src="html/Uploads/videos/' + v +'" type="video/mp4"> Your Browser does not support the video tag.</video></td>'));
                    }
                    if(k === "vid") {
                        $("#playlist_video_table >tbody >tr:last").append(
                           $("<td><input type='button' id='" + v + "' value='delete from playlist' class='delete-button'/></td>")
                        );
                    }
                });
            });
        }
    });
    //script for knappen delete
    $("#playlist_video_table").on("click", ".delete-button", function(event) {
    	var playlistId = localStorage.getItem('pid');
        var vid = $(this).attr('id');
        console.log(id);
        $.ajax({
            url: 'php/delete_video_from_playlist.php',
            type: 'POST',
            dataType: 'json',
            data: {'pid': playlistId, 'vid': vid},
            success: function (data) {
                window.location.href = "#member";
            }
        });
    });
});