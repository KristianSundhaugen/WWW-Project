


var SubEditController = {


	//Setup th controller
	init:function() {

		//Create new caption set
		this.captions = [];
		//Create connection to video
		this.video = document.getElementById("myVideo");
			
			//Hide every button except the "Edit" button
			$("#captionTrigger").show(); 
	        $("#captionTools").hide();
	        $("#vtt_out").hide();

	},

	startVideo: function(){
	//Plays video with connection 
		this.video.play();
	},

	// Called when the user wants to pause the video
	// and write a caption. Enables the caption editing controls. 
	startCaption: function(){
		
		this.video.pause();
		
		this.now = this.video.currentTime;
		
		$("#captionTools").show();
		$("#vtt_out").show();
		$("#captionTrigger").hide(); 
	},

	//Called when the user has finished writing a caption
	// Saves the caption and resumes the video
	endCaption: function(){
		var caption = {};
		
		caption.text = document.getElementById('captionText').value;
		
		//Multiplys current time so it counts in seconds
		caption.start = this.formatDate(this.now * 1000);
		
		// We end the caption 2 seconds after the caption start
		caption.end = this.formatDate((this.now + 2) * 1000);
		
		this.captions.push(caption);
		this.updateCaptions();
	},

	//Called if the user cancels writing a caption
	cancelCaption: function(){
		
		this.video.play();
		
		$("#captionTools").hide();
		$("#vtt_out").hide();
		$("#captionTrigger").show(); 
	},

	deleteCaption: function(){
		//document.getElementById('vtt_out').innerHTML = '';
		this.captions.pop();
		
		var vtt = "WEBVTT FILE";
		
		document.getElementById('vtt_out').innerHTML = vtt; 
		
		for (i=0; i<this.captions.length;i++){
			vtt += "\n";
			var x = i + 1;
			vtt += "\n" + x;
			vtt += "\n" + this.captions[i].start + " --> " + this.captions[i].end;
			vtt += "\n" + this.captions[i].text;
		}
		
		document.getElementById('vtt_out').innerHTML = vtt; 

	},

	// Update the Web-VTT serialization of the captions
	updateCaptions: function(){
		
		var vtt = "WEBVTT FILE";
		
		for (i=0; i<this.captions.length;i++){
			vtt += "\n";
			var x = i + 1;
			vtt += "\n" + x;
			vtt += "\n" + this.captions[i].start + " --> " + this.captions[i].end;
			vtt += "\n" + this.captions[i].text;
		}
		
		document.getElementById('vtt_out').innerHTML = vtt; 
	},

	// Turns a JS date into a Web-VTT timestamp
	formatDate: function(inputDate){
		
		var date = new Date(inputDate);
        
        var timestamp;
        
        if (date.getHours() < 10){
            timestamp = "0"+(date.getHours()-1);
        } else {
            timestamp = (date.getHours()-1);        
        }
        timestamp +=":";
        if (date.getMinutes() < 10){
            timestamp += "0"+date.getMinutes();
        } else {
            timestamp += date.getMinutes();        
        }
        timestamp +=":";
        if (date.getSeconds() < 10){
            timestamp += "0"+date.getSeconds();
        } else {
            timestamp += date.getSeconds();        
        }
        timestamp += ".";
        if (date.getMilliseconds() < 100){
            timestamp += "0";
        }
        timestamp += date.getMilliseconds();
        
		return timestamp;
    },

}