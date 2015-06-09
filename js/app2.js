$(document).ready(function(){

	var Slot = function(idNum){
		this.id = idNum;
		this.machine = $("#machine" + idNum).slotMachine({
											active	: idNum,
											delay	: 300
										});
		this.result = null;
		this.complete = false;
		this.hold = false;
	}; 
	// ideally, the Slot class would be integrated more with the SlotMachine class
	// from jquery.slotmachine.js, but in the interest of time I didn't look too
	// far into it.

	Slot.prototype.setHold = function(){
		this.hold = !this.hold;
		$("#hold"+this.id).toggleClass("toggle-active");
	};

	Slot.prototype.spin = function(){
		!this.hold  ? ( this.complete = false, this.machine.shuffle(5, onComplete) ) 
									: this.setComplete;
	};

	Slot.prototype.setComplete = function(){
		this.complete = true;
		this.result = this.machine.active;
	};

	// add a drink to the machine by naming it here, adding html, and including pictures in css
	var	drinks = ["Coffee",
								"Tea",
								"Espresso"
								];

	// add a slot to the machine by adding html and change in css							
	var slots = [];
	for ( var i = 0 ; i < $(".slotMachine").length ; i++ ){
		slots[i] = new Slot(i);
	};
	
	function onComplete(){
		switch(this.element[0].id){
			case 'machine0':
				slots[0].setComplete();
				break;
			case 'machine1':
				slots[1].setComplete();
				break;
			case 'machine2':
				slots[2].setComplete();
				break;
		}; // I would like to do away with this switch by passing onComplete() an iterator var i 
			// and calling slots[i].setComplete() but the way jquery.slotmachine.js passes the
			// callback function in shuffle() complicates this and I don't think it's worth it to
			// figure out a more effective way for this project.
		if( allEqual(slots, "complete") ){
			checkWin();
		};

	}

	function allEqual(array, property){
		for(var i = 1; i < array.length; i++){
      if(array[i][property] !== array[0][property] || array[i][property] === null)
        	return false;
    }
    return true;
	}

	function checkWin(){
		if (allEqual(slots,"result")) {
    	$("#prize").text(drinks[slots[0].result]);
    	$("#win-image").addClass("win-"+slots[0].result + " slideRight");
    	$(".winner").removeClass("hidden");
    	$(".hold").removeClass("toggle-active");
    	slots.forEach(function(slot){slot.hold = false});
    }; 
	}

	$("#spin").click(function(){
		$(".winner").addClass("hidden").removeClass("slideRight");
		$("#win-image").removeClass().addClass("winner slot animated");
		slots[0].spin();
		setTimeout(function(){
			slots[1].spin();
		}, 100);
		setTimeout(function(){
			slots[2].spin();
		}, 200);
	})

	$("#hold0").click(function(){
		slots[0].setHold();
	})
	$("#hold1").click(function(){
		slots[1].setHold();
	})
	$("#hold2").click(function(){
		slots[2].setHold();
	})

	/*
	$("#test").click(function(){
		var temp =[];
		slots.forEach(function(slot){temp.push(slot.result)});
		console.log(temp);
	}) 

	$("#cheat").click(function(){
		var cheatWith = 0;
		slots[0].machine.setRandomize(function(){return cheatWith});
		slots[1].machine.setRandomize(function(){return cheatWith});
		slots[2].machine.setRandomize(function(){return cheatWith});
	})
	/**/
});