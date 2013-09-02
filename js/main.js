// JavaScript Document

/* global variables */
var footerRetracted = false, //footer state

	/* donor list variables */
	donorGridButtons = document.querySelectorAll('.page_style_d .donor-grid li'),
	donorGridButtonsLength = donorGridButtons.length,
	lists =  document.querySelectorAll('.donor-list-container ul'),
	listsLength = lists.length,
	
	/* Universal Footer button variables */
	universalFooter = document.getElementById('universalFooter'),
	
	/* footer content links */
	footerContentLinks = document.querySelectorAll('.content-footer ul'),
	
	/* footer data objects */
	footerMenus = document.getElementsByClassName('menu-parent');

$(document).on('mobileinit', function(){ // set defaults
	
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

/* donor pages actions */	
function donorGridButtonAction(event){
	var self = event.target, // this donor category
		myList = document.getElementById(event.target.getAttribute('data-for')); //this donor categorie's list
	
	for (h=0;h<donorGridButtonsLength;h++){
		donorGridButtons[h].classList.remove('donor-active'); // remove ative donor status on all
	}
	self.classList.add('donor-active'); // add donor active status to self
	
	for (h=0;h<listsLength;h++){ //remove all lists from display
		if (lists[h].classList.contains('default')) {lists[h].classList.remove('default');}
		lists[h].style.display = 'none';
		}		
	myList.style.display = 'inline-block'; // display associated list
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


/* attach appropriate mouse and touch handlers to donors list */	
for (i=0;i<donorGridButtonsLength;i++){
	donorGridButtons[i].addEventListener('mouseover', donorGridButtonAction);
	donorGridButtons[i].addEventListener('touchstart', donorGridButtonAction);
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

						
