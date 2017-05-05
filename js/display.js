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
                    
                    if(k === "vid"){
                        $("#display_table >tbody >tr:last").append(
                           $("<td><input type='button' id='" + v + "' value='add to playlist' class='add-button'/></td>")
                        );
                    }
                    // display av selve videoen på non_member og member.
                    //Samt alle knappene, tekstfelt og tekstarea for editering av subtitles
                    if(k==="name") { 
                            $("#display_table >tbody >tr:last").append(
                        $('<td><video id="myvideo" height="300" width="700" controls><source src="html/Uploads/videos/' + v +'" type="video/mp4"> Your Browser does not support the video tag.</video></td>'))
                        .append('<div id="captionTrigger"><button id="startButton" onclick="SubEditController.init(); SubEditController.startCaption();">Edit</button></div>')
                        .append('<textarea style="width:200px; height:250px; display: none; font-family: courier" id="vtt_out"></textarea>')
                        .append('<div><input id="captionText" style="display: none;"/>')
                        .append('<button id="playButton" style="display: none;" onclick="SubEditController.startVideo()">Play</button>')  
                        .append('<button id="okButton" style="display: none;" onclick="SubEditController.endCaption()">Add</button>')   
                        .append('<button id="pauseButton" style="display: none;" onclick="SubEditController.startCaption()">Pause</button>') 
                        .append('<button id="deleteButton" style="display: none;" onclick="SubEditController.deleteCaption()">Delete</button>')
                        .append('<button id="cancelButton" style="display: none;" onclick="SubEditController.cancelCaption()">Cancel</button>')
                        .append('<button id="saveButton" style="display: none;" onclick="SubEditController.saveTextAsFile()">Save</button>')
                        .append('<button id="helpButton" style="display: none;" onclick="SubEditController.helpText()">?</button>')
                        .append('<button id="hideHelpButton" style="display: none;" onclick="SubEditController.hideEditingInstructions()">OK</button>')
                        .append('<p id="editingInstructions">')
                        .append('</div></div>');                      
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

