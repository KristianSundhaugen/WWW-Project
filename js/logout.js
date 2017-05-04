$(document).ready(function(){
        $.ajax({
            url: 'php/logout.php',
            type: 'POST',
            data: 'data',
            success: function (data) {
                window.location.href = "#non_member";
            }
        });
});