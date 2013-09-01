// JavaScript Document

/* global variables */
var footerRetracted = false, //footer state

	/* donor list variables */
	donorGridButtons = document.querySelectorAll('.page_style_d .donor-grid li'),
	donorGridButtonsLength = donorGridButtons.length,
	lists =  document.querySelectorAll('.donor-list-container ul'),
	listsLength = lists.length,
	
	/* footer button variables */
	footerButtons = document.querySelectorAll('a.footer-btn'),
	footerButtonsLength = footerButtons.length,
	footerButtonCategories = [],
	currentFooterButtonCategory = 0;

$(document).on('mobileinit', function(){ // set defaults

	var allFooterButtonLinks = document.querySelectorAll('.menu-lists li div'),
		allFooterButtonLinksLength = allFooterButtonLinks.length;
	
	for (i=0;i<allFooterButtonLinksLength;i++){
		var elem = allFooterButtonLinks[i],
			myCat = elem.getAttribute('data-cat');
				
		if (footerButtonCategories.indexOf(myCat) == -1) {
			footerButtonCategories.push(myCat);
		}	
	}	
	/* hide all other footer button on init */
	$('.menu-lists li div:not([data-cat="' + footerButtonCategories[currentFooterButtonCategory] + '"])').addClass('gone');	
	});

/* use jQuery mobile page event as trigger for animation */
$('#front_page')	.on('pagehide', function(event){
						if (!footerRetracted){
							document.getElementById('universalFooter').classList.add('universalFooter-down');
							footerRetracted = true;
						}
					})
					.on('pageshow', function(event){
						if (footerRetracted){
							document.getElementById('universalFooter').classList.remove('universalFooter-down');
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
		from = document.querySelectorAll('ul.menu-lists li div[data-cat="' + footerButtonCategories[currentFooterButtonCategory] + '"]'),
		fromLength = from.length,
		to,
		toLength,
		getNextCat = ((currentFooterButtonCategory+1) <= (footerButtonCategories.length-1)) ? (currentFooterButtonCategory+1) : 0,
		getPrevCat = ((currentFooterButtonCategory-1) < 0) ? (footerButtonCategories.length-1) : (currentFooterButtonCategory-1);
	

	if (self.classList.contains('footer-next-btn')){
		/* get destination */
		to = document.querySelectorAll('ul.menu-lists li div[data-cat="' + footerButtonCategories[getNextCat] + '"]'),
		toLength = to.length;		
		currentFooterButtonCategory = getNextCat;
		for (i=0;i<fromLength;i++){
			var elem = from[i], time = i*1000;
			slideOutLeft(elem, i);		
		}
		for (i=0;i<toLength;i++){
			var elem = to[i], time = i*1000;
			slideInLeft(elem, i);		
		}
	} else if (self.classList.contains('footer-prev-btn')){
		to = document.querySelectorAll('ul.menu-lists li div[data-cat="' + footerButtonCategories[getPrevCat] + '"]'),
		toLength = to.length;	
		currentFooterButtonCategory = getPrevCat;
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


/* attach appropriate mouse and touch handlers to footer buttons */	
for (i=0;i<footerButtonsLength;i++){
	var elem = footerButtons[i];
	elem.addEventListener('mousedown',goToNextFooterSubMenu);
	elem.addEventListener('touchstart',goToNextFooterSubMenu);
	}
	


						
