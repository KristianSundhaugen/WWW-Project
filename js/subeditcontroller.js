/*The functions for controlling the editing of video
  subtitles
*/


var SubEditController = {


	//Setup th controller
	init:function() {

		//Create new caption set
		this.captions = [];
		//Create connection to video
		this.video = document.getElementById("myvideo");
			

	},

	startVideo: function(){
	//Plays video that you have connection with  
		this.video.play();
	},

	// Called when the user wants to pause the video
	// and write a caption. Enables the caption editing controls. 
	startCaption: function(){
		//Pauses video
		this.video.pause();
		//Sets "now" to have the current time value of the video
		this.now = this.video.currentTime;
		
		//Show all the caption tools for editing of video
		//Controller groups wouldn't work, so we have to
		//show each induvidual id of the buttons.
		$("#captionTools").show();
		$("#vtt_out").show();
		$("#captionTrigger").hide();
		$("#playButton").show();
        $("#okButton").show();
		$("#pauseButton").show();
		$("#deleteButton").show();
		$("#cancelButton").show();
		$("#saveButton").show();
		$("#helpButton").show();
		$("#captionText").show();

	},

	//Called when the user has finished writing a caption
	//Updates the textarea with the new text
	endCaption: function(){
		//Initialize caption
		var caption = {};
		//Sets caption text to be equals to the values entered in captionText field
		caption.text = document.getElementById('captionText').value;
		
		//Multiplys current time so it counts in seconds
		caption.start = this.formatDate(this.now * 1000);
		
		// We end the caption 2 seconds after the caption start
		caption.end = this.formatDate((this.now + 2) * 1000);
		//Pushes the caption text onto the array captions
		this.captions.push(caption);
		//Updates captions so that the text apper in the textarea
		this.updateCaptions();
	},

	//Called if the user cancels writing a caption
	cancelCaption: function(){
		//If user cancels, the textbox will be wiped so there is no text left
		document.getElementById('vtt_out').innerHTML = ' ';

		//Shows edit button and hides all the others.
		$("#captionTrigger").show();
		$("#vtt_out").hide();
		$("#captionText").hide(); 
	 	$("#playButton").hide();
        $("#okButton").hide();
		$("#pauseButton").hide();
		$("#deleteButton").hide();
		$("#cancelButton").hide();
		$("#saveButton").hide();
		$("#helpButton").hide();
	},

	//Function for deleting last inserted caption from the textarea
	deleteCaption: function(){
		//Removes last entered text entered into the captions array
		this.captions.pop();
		//Runs the update code again, to renew the textarea for the changes
		var vtt = "WEBVTT FILE";
		//Se til updateCaptions for mer info
		for (i=0; i<this.captions.length;i++){
			vtt += "\n";
			vtt += "\n" + this.captions[i].start + " --> " + this.captions[i].end;
			vtt += "\n" + this.captions[i].text;
		}
		
		document.getElementById('vtt_out').innerHTML = vtt; 

	},

	// Update the Web-VTT serialization of the captions
	updateCaptions: function(){
		//Sets vtt to have WEBVTT FILE on the top of the page 
		var vtt = "WEBVTT FILE";
		//Loop to add timestamps and text from the user
		for (i=0; i<this.captions.length;i++){
		//Newline after WEBVTT FILE
			vtt += "\n";
		//Adds the start time of the captions then a --> and the end time
			vtt += "\n" + this.captions[i].start + " --> " + this.captions[i].end;
		//Adds the text written by the user gotten from the push in endCaption
			vtt += "\n" + this.captions[i].text;
		}
		//Gets the text from vtt_out and writes it to vtt.
		document.getElementById('vtt_out').innerHTML = vtt; 
	},

	// Turns a JS date into a Web-VTT timestamp get it on format 00:00:00.000
	formatDate: function(inputDate){
		//Gets the inputdate on the date format and assign it to date
		var date = new Date(inputDate);
        //Initilize timestamp
        var timestamp;
	        //Get hours if less than 10 add behind the zero
	        //Problem where the getHours adds an random hour, so have
	        //to subtract one
	        if (date.getHours() < 10){
	            timestamp = "0"+(date.getHours()-1);
	        } else {
	            timestamp = (date.getHours()-1);        
	        }
		        //Adds a : between hours and minutes 00:00
		        timestamp +=":";

	        //Get minutes if less than 10 add behind the zero
	        if (date.getMinutes() < 10){
	            timestamp += "0"+date.getMinutes();
	        } else {
	            timestamp += date.getMinutes();        
	        }
		        //Adds a : between minutes and seconds 00:00
		        timestamp +=":";

	        //Get minutes if less than 10 add behind the zero
	        if (date.getSeconds() < 10){
	            timestamp += "0"+date.getSeconds();
	        } else {
	            timestamp += date.getSeconds();        
	        }

		        //Adds a . between seconds and milliseconds 00.00
		        timestamp += ".";

	        //Get milliseconds if less than 100 add behind the zero
	        if (date.getMilliseconds() < 100){
	            timestamp += "0";
	        }
	        timestamp += date.getMilliseconds();
        
        //Retrurn the timestamp value 
		return timestamp;
    },
    //Help text show to user if he wishes to know how to use the edit functions 
    helpText: function(){
    $("#editingInstructions").show();
    document.getElementById("editingInstructions").innerHTML = 'To edit subtitles, press the <b>Pause</b> button at preffered time. Then proceed to type in the '
    + 'captions in the field, when finished press <b>Add</b>. The captions will be in a two seconds period from when you paused. You should see it apper in the '
    + 'textfield to the right of the video, with timestamps. If you wish to delete last inserted captions, press the '
    + '<b>Delete</b> button. To exit editing press <b>Cancel</b>. If you are finished reading press the <b>OK</b> button on the right';
    $("#hideHelpButton").show();
    },

    //Hides the ok button and the help text 
    hideEditingInstructions: function(){
    	
    	$("#editingInstructions").hide();
    	$("#hideHelpButton").hide();
    },

    //Tried to make the save function to save the text file to the uploads/subtitles directory
    //But there are problems with changing the wished directorys of which we want to upload to.
    //Pluss ran out of time.
    saveTextAsFile: function()
	{
	//Which text we want to save.
    var textToSave = document.getElementById("vtt_out").value;
    //Save it as a blob, but the content type wont lett us save it as a 'text/vtt', only 'text/plain'
    var textToSaveAsBlob = new Blob([textToSave], {type: 'text/plain'});
    //URL to save the object to
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    //Won't get the name of video through the video id, only sets the file name as 'undefined'
    var fileNameToSaveAs = document.getElementById("myvideo").value;
 
 	//Make a element
    var downloadLink = document.createElement("a");
    //Name to save as
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    //Href to URL
    downloadLink.href = textToSaveAsURL;
    downloadLink.style.display = "none";
    //Set downloadLink as appendedChild
    document.body.appendChild(downloadLink);
 
    downloadLink.click();

	},

}