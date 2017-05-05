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
                    if(k === "vid"){
                        $("#display_table >tbody >tr:last").append(
                            $("<td><input type='button' id='" + v + "' value='Subtitles' class='sub-button'/></td>")
                        );
                        $("#display_table >tbody >tr:last").append(
                           $("<td><input type='button' id='" + v + "' value='delete' class='delete-button'/></td>")
                        );
                    }
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
});

