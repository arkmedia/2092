// JavaScript Document


/***
Page element binding
***/

/* use jQuery mobile page event as trigger for animation */
//$('#front_page')	.on('pagehide', footerControls().down);

$('[data-role="page"]').not('#front_page')	.on('pageshow', footerControls().down)
											.on('pageshow', highlightBottomLink)
											.on('pagehide', resetMenus);

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