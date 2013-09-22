// JavaScript Document

/* global variables */
var footerRetracted = false, //footer state
	
	/* Universal Footer button variables */
	universalFooter = document.getElementById('universalFooter'),
	
	/* footer content links */
	footerContentLinks = document.querySelectorAll('.content-footer ul'),
	
	/* footer data objects */
	footerMenus = document.getElementsByClassName('menu-parent');

$(document).on('mobileinit', function(){ // set defaults
	//resize popup images
	$( ".photopopup" ).on({
        popupbeforeposition: function() {
            var maxHeight = $( window ).height() - 60 + "px";
            $( ".photopopup img" ).css( "max-height", maxHeight );
        }	
    });
	
	/* bring up keyboard when popup form appears */
	$('.popup-form').on({
		popupbeforeposition: function(){
			$('#virtualKeyboard').animate({bottom: '200px'}, 300);
		},
		popupafteropen: function(){
			$(this).find('#firstname').focus();	
		},
		popupafterclose: function(){
			//remove keyboard
			$('#virtualKeyboard').animate({bottom: '-350px'}, 300);
			//clear inputs
			$('.hycmad_input').each(function(index, element) {
                element.value = null;
            });
		}	
	});
	
	/* change element modified by keayboard on focus */
	$('.hycmad_input').on('focus', function(){
		jsKeyboard.currentElement = $(this);	
	});
	 
	//close popup on cancel 
	$('.hycmad_cancel').on('mousedown touchstart', function(){	
		$('.popup-form').popup('close');
	});

	
	$('.hycmad_submit').on('mousedown touchstart', function(){
		var form = $(this).closest('form'),
			popup = form.closest('[data-role="popup"]'),
			data = form.serialize();
		
		// Validation for First Name
		if(form.find("[name='firstname']").val().length == 0) {
			popup.find(".validation").html("Please enter your first name");
			return false;
		}
		
		// Validation for Last name
		if(form.find("[name='lastname']").val().length == 0) {
			popup.find(".validation").html("Please enter your last name");
			return false;
		}		
		
			
		var phone_number = form.find("[name='phone']").val().replace(/\s+|\./g, "");
		if (!phone_number.length > 9 || !phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/)){
			popup.find(".validation").html("Please provide a valid phone number");
			return false;
			} 	
			
		
		if(!/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(form.find("[name='email']").val())) {
			popup.find(".validation").html("Please provide a valid email");
			return false;
		}
		
		$.post('./backend/hycmad_form_backend.php', data, function(resp) {			
			$('.popup-form').popup('close');
		}, "text");
	});
	
	// bind action to all "back buttons"
	var backButtons = document.getElementsByClassName('back-button');
	for (i=0;i<backButtons.length;i++){
		backButtons[i].addEventListener('mousedown', backOnePage, false);
		backButtons[i].addEventListener('touchstart', backOnePage, false);
		}
	
	
	// init keyboard
	jsKeyboard.init("virtualKeyboard");
	
	// init donors lists
	var donorPages = document.getElementsByClassName('page_style_d');
	for (i=0;i<donorPages.length;i++){		
		var donorPage = donorPages[i],
			donors = new donorView(donorPage);		
		donors.getContent();		
	}
});



/* use jQuery mobile page event as trigger for animation */
$('#front_page')	.on('pagehide', function(event){
						if (!footerRetracted){
							universalFooter.classList.add('universalFooter-down');
							footerRetracted = true;
						}
					})
					.on('pageshow', function(event){
						if (footerRetracted){
							universalFooter.classList.remove('universalFooter-down');
							footerRetracted = false;
						}						
					});



$('.hasVideo')		.on('popupafteropen', function(e){
						var vid = this.querySelector('video');
						vid.play();
						})
					.on('popupafterclose', function(e){
						var vid = this.querySelector('video');
						vid.pause();
						vid.currentTime = 0;
						});

function backOnePage(){
	history.back();
	}
		
		

						
	
	
	
function slideOutLeft(elem, i){
	var time = i*200;
	setTimeout(function(){
		elem.setAttribute('class', '');
		elem.classList.add('gone');
		elem.classList.add('slideOut'); 
		elem.classList.add('slideOutLeft');
	}, time);
	}

function slideInLeft(elem, i){
	var time = i*200;
	setTimeout(function(){
		elem.setAttribute('class', '');
		elem.classList.add('slideIn'); 
		elem.classList.add('slideInLeft');
	}, time);
	}

function slideOutRight(elem, i){
	var time = i*200;
	setTimeout(function(){
		elem.setAttribute('class', '');
		elem.classList.add('gone'); 
		elem.classList.add('slideOut'); 
		elem.classList.add('slideOutRight');
	}, time);
	}

function slideInRight(elem, i){
	var time = i*200;
	setTimeout(function(){
		elem.setAttribute('class', '');
		elem.classList.add('slideIn'); 
		elem.classList.add('slideInRight');
	}, time);
	}

function goToNextFooterSubMenu(event){
	var self = this,
		menu = $(this).closest('.menu-parent')[0],
		from = menu.querySelectorAll('ul.menu-lists li div[data-cat="' + menu.footerButtonCategories[menu.currentFooterButtonCategory] + '"]'),
		fromLength = from.length,
		to,
		toLength,
		getNextCat = ((menu.currentFooterButtonCategory+1) <= (menu.footerButtonCategories.length-1)) ? (menu.currentFooterButtonCategory+1) : 0,
		getPrevCat = ((menu.currentFooterButtonCategory-1) < 0) ? (menu.footerButtonCategories.length-1) : (menu.currentFooterButtonCategory-1);
	

	if (self.classList.contains('footer-next-btn')){
		/* get destination */
		to = menu.querySelectorAll('ul.menu-lists li div[data-cat="' + menu.footerButtonCategories[getNextCat] + '"]'),
		toLength = to.length;		
		menu.currentFooterButtonCategory = getNextCat;
		for (i=0;i<fromLength;i++){
			var elem = from[i], time = i*1000;
			slideOutLeft(elem, i);		
		}
		for (i=0;i<toLength;i++){
			var elem = to[i], time = i*1000;
			slideInLeft(elem, i);		
		}
	} else if (self.classList.contains('footer-prev-btn')){
		to = menu.querySelectorAll('ul.menu-lists li div[data-cat="' + menu.footerButtonCategories[getPrevCat] + '"]'),
		toLength = to.length;	
		menu.currentFooterButtonCategory = getPrevCat;
		for (i=0;i<fromLength;i++){
			var elem = from[i], time = i*1000;
			slideOutRight(elem, i);		
		}
		for (i=0;i<toLength;i++){
			var elem = to[i], time = i*1000;
			slideInRight(elem, i);		
		}
	}	

}


for (i=0;i<footerMenus.length;i++){
		var thisFooterMenu = footerMenus[i];
		
		thisFooterMenu.footerButtons = thisFooterMenu.querySelectorAll('a.footer-btn'),
		thisFooterMenu.footerButtonsLength = thisFooterMenu.footerButtons.length,
		thisFooterMenu.footerButtonCategories = [],
		thisFooterMenu.currentFooterButtonCategory = 0,
		thisFooterMenu.allFooterButtonLinks = thisFooterMenu.querySelectorAll('.menu-lists li div'),
		thisFooterMenu.allFooterButtonLinksLength = thisFooterMenu.allFooterButtonLinks.length;
	
	for (h=0;h<thisFooterMenu.allFooterButtonLinksLength;h++){
		var elem = thisFooterMenu.allFooterButtonLinks[h],
			myCat = elem.getAttribute('data-cat');
				
		if (thisFooterMenu.footerButtonCategories.indexOf(myCat) == -1) {
			thisFooterMenu.footerButtonCategories.push(myCat);
		}	
	}	
	/* hide all other footer button on init */
	thisFooterMenu.otherFooterButtons = thisFooterMenu.querySelectorAll('.menu-lists li div:not([data-cat="' + thisFooterMenu.footerButtonCategories[thisFooterMenu.currentFooterButtonCategory] + '"])');
	for (h=0;h<thisFooterMenu.otherFooterButtons.length;h++){
		thisFooterMenu.otherFooterButtons[h].classList.add('gone');
	}
	
	/* attach appropriate mouse and touch handlers to footer buttons */
	for (h=0;h<thisFooterMenu.footerButtonsLength;h++){
		var elem = thisFooterMenu.footerButtons[h];
		elem.addEventListener('mousedown',goToNextFooterSubMenu);
		elem.addEventListener('touchstart',goToNextFooterSubMenu);
	}
}


/* Match content footer button for height */
for (i=0;i<footerContentLinks.length;i++){
	var list = footerContentLinks[i],
		items = list.getElementsByTagName('li'),
		heights = [],
		newHeight;
		
	for (h=0;h<items.length;h++){
		heights.push(items[h].clientHeight);	
	}	
	newHeight = Math.max.apply(null, heights) + 'px';
	for (h=0;h<items.length;h++){
		items[h].style.height = newHeight;	
	}
}

						
