// JavaScript Document



function initAmbientState(){
	document.body.removeEventListener('touchstart');
	document.body.removeEventListener('touchmove');
	document.body.removeEventListener('touchend');
	document.body.removeEventListener('mousedown');
	document.body.removeEventListener('mousemove');
	ambientState = true;
	
	$.mobile.changePage('#front_page');	
}

function resetAmbientTimer(){
	//clear ambietn timer
	clearTimeout(ambientTimer);
	
	//reset timer to reintate ambiten state
	ambientTimer = setTimeout(initAmbientState,(1000*60*ambientAnimations.ambientTimerMinutes));
}

function breakAmbientState(){
	ambientMenu.classList.add('ambient-state-off');
	setTimeout(function(){	
		//remove ambient state from kiosk
		universalFooter.classList.add("menu-ambient-off");	
		universalFooter.classList.remove("menu-ambient-state");		
		
		//bind event to reset ambient timer
		document.body.addEventListener('touchstart', resetAmbientTimer, false);
		document.body.addEventListener('touchmove', resetAmbientTimer, false);
		document.body.addEventListener('touchend', resetAmbientTimer, false);
		document.body.addEventListener('mousedown', resetAmbientTimer, false);
		document.body.addEventListener('mousemove', resetAmbientTimer, false);
		resetAmbientTimer();
		ambientState = false;
		
	}, ambientAnimations.menuDown);
}	

ambientTouch.addEventListener('touch', breakAmbientState, false);
ambientTouch.addEventListener('mousedown', breakAmbientState, false);



//hide universal footer
universalFooter.classList.add("menu-ambient-state");