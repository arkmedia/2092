// JavaScript Document



function initAmbientState(){
	/*document.body.removeEventListener('touchstart', resetAmbientTimer);
	document.body.removeEventListener('touchmove', resetAmbientTimer);
	document.body.removeEventListener('touchend', resetAmbientTimer);*/
	document.body.removeEventListener('mousedown', resetAmbientTimer);
	document.body.removeEventListener('mousemove', resetAmbientTimer);
	
	//init animations
	ambientMenu.classList.remove("ambient-state-off");
	universalFooter.classList.remove("menu-ambient-off");
	universalFooter.classList.remove("universalFooter-down");
	universalFooter.classList.remove("universalFooter-up");
	if ($.mobile.activePage[0].id == 'front_page'){	
		universalFooter.classList.add("menu-ambient-state");
	} else {
		universalFooter.classList.add("menu-ambient-state-2");
	}
	
	//resume video
	ambientVideo.play();
	
	//change to front page;
	$.mobile.changePage('#front_page');
	
}

function resetAmbientTimer(){
	//clear ambietn timer
	clearTimeout(ambientTimer);
	
	//reset timer to reintate ambiten state
	ambientTimer = setTimeout(initAmbientState,(1000*60*ambientAnimations.ambientTimerMinutes));
}

function breakAmbientState(){
	//stop video
	ambientVideo.pause();
	
	ambientMenu.classList.add('ambient-state-off');
	setTimeout(function(){	
		
	
		//remove ambient state from kiosk
		universalFooter.classList.add("menu-ambient-off");	
		universalFooter.classList.remove("menu-ambient-state");
		universalFooter.classList.remove("menu-ambient-state-2");		
		
		//bind event to reset ambient timer
		/*document.body.addEventListener('touchstart', resetAmbientTimer, false);
		document.body.addEventListener('touchmove', resetAmbientTimer, false);
		document.body.addEventListener('touchend', resetAmbientTimer, false);*/
		document.body.addEventListener('mousedown', resetAmbientTimer, false);
		document.body.addEventListener('mousemove', resetAmbientTimer, false);
		resetAmbientTimer();
		
	}, ambientAnimations.menuDown);
}	

//ambientTouch.addEventListener('touchstart', breakAmbientState, false);
ambientTouch.addEventListener('mousedown', breakAmbientState, false);



//hide universal footer
universalFooter.classList.add("menu-ambient-state");