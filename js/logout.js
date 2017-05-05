$(document).ready(function(){ // Hvis kanppen logout har blitt trykt og hashvalue blir endret til #logout
        $.ajax({
            url: 'php/logout.php', // så sendes dette til logout.php som fjerner brukerID
            type: 'POST',
            data: 'data',
            success: function (data) {
                window.location.href = "#non_member"; // og sender brukeren til #non_member siden
            }
        });
});