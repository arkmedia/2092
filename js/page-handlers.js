// JavaScript Document


/***
Page element binding
***/


/* use jQuery mobile page event as trigger for animation */
$('#front_page')	.on('pagehide', function(event){ //retract main menu when you leave front page
						if (!footerRetracted){
							//initate footer down animation
							universalFooter.classList.add('universalFooter-down');
							//clear ambien classes if they're in place
							universalFooter.classList.remove('menu-ambient-off');
							universalFooter.classList.remove('menu-ambient-state');
							//clear up state
							universalFooter.classList.remove('universalFooter-up');
							footerRetracted = true;
						}
					})
					.on('pageshow', function(event){ //retract main menu when you leave front page
						if (footerRetracted){
							//init fotter up animation
							universalFooter.classList.add('universalFooter-up');
							//remove footer down state
							universalFooter.classList.remove('universalFooter-down');
							footerRetracted = false;
						}						
					});


//Video popup handlers
					//Play video when popup appears
$('.hasVideo')		.on('popupafteropen', function(e){ 
						var vid = this.querySelector('video');
						vid.play();
						})
						
					//Stop video when popup appears
					.on('popupafterclose', function(e){
						var vid = this.querySelector('video');
						vid.pause(); 
						vid.currentTime = 0;
						});


//resize popup images
$( ".photopopup" )	.on({
						popupbeforeposition: function() {
							var maxHeight = $( window ).height() - 60 + "px";
							$( ".photopopup img" ).css( "max-height", maxHeight );
						}	
					});

// init keyboard
jsKeyboard.init("virtualKeyboard");