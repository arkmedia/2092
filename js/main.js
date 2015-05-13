// JavaScript Document

/* global variables */
var footerRetracted = false, //footer state
	
	/* Universal Footer button variables */
	universalFooter = document.getElementById('universalFooter'),
	
	/* footer content links */
	footerContentLinks = document.querySelectorAll('.content-footer-links ul'),
	
	/* footer data objects */
	footerMenus = document.getElementsByClassName('menu-parent')
	
	//slider previous buttons
	sliderPrevButtons = document.getElementsByClassName('footer-prev-btn'),
	
	//subheader elements
	subHeads = document.getElementsByClassName('subhead'),
	
	//get all back buttons
	backButtons = document.getElementsByClassName('back-button'),
	
	//get donor list pages
	donorPages = document.getElementsByClassName('page_style_d'),
	
	//animation timers
	animations = {cascadeDelay: 200, contentSlide: 1000},
	
	//get ambient touch here menu
	ambientMenu = document.getElementById('ambient-menu'),
	
	//get ambien touch button
	ambientTouch = document.getElementById('ambient-touch'),
	
	//set ambient timers
	ambientAnimations = {menuDown: 500, ambientTimerMinutes: 5},
	
	//get ambient video
	ambientVideo = document.getElementById('videoAmbient'),
	
	//Ambient state timer object
	ambientTimer = null;


//force all subhead text to UPPERCASE
for (i=0;i<subHeads.length;i++){
	var subHead = subHeads[i];
	subHead.innerHTML = subHead.innerHTML.toUpperCase();
}
	
// bind action to all "back buttons"
for (i=0;i<backButtons.length;i++){
	backButtons[i].addEventListener('mousedown', backOnePage, false);
	backButtons[i].addEventListener('touchstart', backOnePage, false);
}
	
// init donors lists
for (i=0;i<donorPages.length;i++){		
	var donorPage = donorPages[i],
		donors = new donorView(donorPage);		
	donors.getContent();		
}

// function to bind back buttons
function backOnePage(){
	history.back();
	}

// slide content out to left	
function slideOutLeft(elem, i){
	var time = i*animations.cascadeDelay;
	setTimeout(function(){
		elem.setAttribute('class', '');
		elem.classList.add('gone');
		elem.classList.add('slideOut'); 
		elem.classList.add('slideOutLeft');
	}, time);
}

//slide content in from left
function slideInLeft(elem, i){
	var time = i*animations.cascadeDelay;
	setTimeout(function(){
		elem.setAttribute('class', '');
		elem.classList.add('slideIn'); 
		elem.classList.add('slideInLeft');
	}, time);
}

//slide content out to right
function slideOutRight(elem, i){
	var time = i*animations.cascadeDelay;
	setTimeout(function(){
		elem.setAttribute('class', '');
		elem.classList.add('gone'); 
		elem.classList.add('slideOut'); 
		elem.classList.add('slideOutRight');
	}, time);
}

//slide content in from right
function slideInRight(elem, i){
	var time = i*animations.cascadeDelay;
	setTimeout(function(){
		elem.setAttribute('class', '');
		elem.classList.add('slideIn'); 
		elem.classList.add('slideInRight');
	}, time);
}


function footerControls(){
	var footerControls = this;

	footerControls.up = function(){
		//init fotter up animation
		universalFooter.classList.add('universalFooter-up');
		//remove footer down state
		universalFooter.classList.remove('universalFooter-down');

		footerRetracted = false;	
	}

	footerControls.down = function(){
		//initate footer down animation
		universalFooter.classList.add('universalFooter-down');
		//clear ambien classes if they're in place
		universalFooter.classList.remove('menu-ambient-off');
		universalFooter.classList.remove('menu-ambient-state');
		//clear up state
		universalFooter.classList.remove('universalFooter-up');	

		footerRetracted = true;	
	}

	footerControls.toggle = function(){
		if (!footerRetracted){
			footerControls.down()
		} else {
			footerControls.up();
		}
	}

	return footerControls;
}


//manage next menu animation
function goToNextFooterSubMenu(event){
	var self = this,
		menu = $(this).closest('.menu-parent')[0],
		siblings = menu.querySelectorAll('.footer-btn'),
		from = menu.querySelectorAll('ul.menu-lists li div[data-cat="' + menu.footerButtonCategories[menu.currentFooterButtonCategory] + '"]'),
		fromLength = from.length,
		to,
		toLength,
		FBCLength = menu.footerButtonCategories.length,
		getNextCat = ((menu.currentFooterButtonCategory+1) <= (FBCLength-1)) ? (menu.currentFooterButtonCategory+1) : 0,
		getPrevCat = ((menu.currentFooterButtonCategory-1) < 0) ? (FBCLength-1) : (menu.currentFooterButtonCategory-1);
		
	// hide buttons if they'bve reached the end of the line
	for (i=0; i<siblings.length; i++){
		var sibling = siblings[i];
		sibling.classList.remove('invisible');		
		if ((self.classList.contains('footer-next-btn') && (getNextCat === (FBCLength-1))) ||
			(self.classList.contains('footer-prev-btn') && (getPrevCat === 0))){
			self.classList.add('invisible');			
		} 	
	}
	
	if (self.classList.contains('footer-next-btn')){
		/* get destination */
		to = menu.querySelectorAll('ul.menu-lists li div[data-cat="' + menu.footerButtonCategories[getNextCat] + '"]'),
		toLength = to.length;				
		menu.currentFooterButtonCategory = getNextCat;
		for (i=0;i<fromLength;i++){
			var elem = from[i], time = i*animations.contentSlide;
			slideOutLeft(elem, i);		
		}
		for (i=0;i<toLength;i++){
			var elem = to[i], time = i*animations.contentSlide;
			slideInLeft(elem, i);		
		}
	} else if (self.classList.contains('footer-prev-btn')){
		to = menu.querySelectorAll('ul.menu-lists li div[data-cat="' + menu.footerButtonCategories[getPrevCat] + '"]'),
		toLength = to.length;	
		menu.currentFooterButtonCategory = getPrevCat;
		for (i=0;i<fromLength;i++){
			var elem = from[i], time = i*animations.contentSlide;
			slideOutRight(elem, i);		
		}
		for (i=0;i<toLength;i++){
			var elem = to[i], time = i*animations.contentSlide;
			slideInRight(elem, i);		
		}
	}	
}

//bind animation to footer menu items
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
		//elem.addEventListener('touchstart',goToNextFooterSubMenu);
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
		var thisItem = items[h];
		thisItem.style.height = newHeight;
		if (thisItem.getElementsByTagName('div')[0]){
			thisItem.getElementsByTagName('div')[0].style.height = newHeight;
		}	
	}
}

// hide menu slider previous button on init
for (i=0;i<sliderPrevButtons.length;i++){
	sliderPrevButtons[i].classList.add('invisible');
}



