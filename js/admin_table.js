$(document).ready(function(){
    //Displayer hele user lista for adminer/teachere
    $.ajax({
        url:'php/admin_table.php',
        type:'POST',
        success:function(data){
            var result = $.parseJSON(data);
            $.each(result, function(key, value){
                $.each(value, function(k, v){
                    if(k === "firstname"){
                        $("#admin_table >tbody:last").append(
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
                    if(k === "lastname"){
                        $("#admin_table >tbody >tr:last").append(
                            $('<td>').append(v)
                            .append(
                                $('</td>')
                            )
                        );
                    }
                    if(k === "admin"){
                        if(v){  //hvis brukeren er admin
                            $("#admin_table >tbody >tr:last").append(
                                $('<td>').append('admin')
                                .append(
                                    $('</td>')
                                )
                            );
                        }else {
                            $("#admin_table >tbody >tr:last").append(
                                $('<td>').append('member')
                                .append(
                                    $('</td>')
                                )
                            );
                        }
                    }
                    if(k === "email"){
                        $("#admin_table >tbody >tr:last").append(
                            $('<td>').append(v)
                            .append(
                                $('</td>')
                            )
                        );
                    }
                    if(k === "bid"){
                        $("#admin_table >tbody >tr:last").append(
                            $("<td><input type='button' id='" + v + "' value='edit' class='edit-button'/></td>")
                        );
                        $("#admin_table >tbody >tr:last").append(
                           $("<td><input type='button' id='" + v + "' value='delete' class='delete-button'/></td>")
                        );
                    }
                });
            });
        }
    });
    //Funksjon for knappen edit
    $("#admin_table").on("click", ".edit-button", function(event) {
        
        var id = $(this).attr('id');
        console.log(id);
        $.ajax({
            url: 'php/edit_admin.php',
            type: 'POST',
            data: 'id=' + id,
            success: function (data) {
                alert('successfully updated user to admin');
                window.location.href = "#teacher";
            }
        });
    });
    //Funksjon for knappen delete
    $("#admin_table").on("click", ".delete-button", function(event) {
        var id = $(this).attr('id');
        console.log(id);
        $.ajax({
            url: 'php/delete_user.php',
            type: 'POST',
            data: 'id=' + id,
            success: function (data) {
                alert('successfully deleted user');
                window.location.href = "#teacher";
            }
        });
    });
});

