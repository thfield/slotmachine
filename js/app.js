"use strict";

$(document).ready(function () {
	
	$(document).on('click', '#spin', function () {

		$(".winner").addClass("hidden");
		$("h1").removeClass("shake");

    var reels = randIntArray(3,3);
    //var reels = [0,0,0];
    if (reels[0] == reels[1] && reels[0] == reels[2]) {
    	$(".winner").removeClass("hidden");
    	var result = "";
    	switch (reels[0]) {
    		case 0:
    		result = "A Cup of Coffee!";
    		break;
    		case 1:
    		result = "A Cup of Tea!";
    		break;
    		case 2:
    		result = "A Cup of Espresso!";
    		break;
    	}
    	$("#result").text(result);
    	$("h1").addClass("shake");
    }; 
    for (var i in reels){
    	var reel = $("#w"+i);
			//reel.text(reels[i]);
			reel.removeClass();
			reel.addClass("reel reel"+i+"-"+reels[i]);
		};
  });
	
	function randIntArray(bins, choices){
		var result = [];
		for ( var i = 0 ; i < bins ; i++ ) {
			result[i] = randomIntFromInterval(0,choices-1);
		}
		return result;
	}

	function randomIntFromInterval(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	}

});