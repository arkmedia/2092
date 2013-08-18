// JavaScript Document
var footerRetracted = false,
	movingMenuPosition = 1;

$(document).on('mobileinit', function(e){
	
	/* resize footerNavSubMenuContainer to accomodate menu */
	var footerNavSubMenuContainer = $('.footer-nav-sub-menu-container');
	footerNavSubMenuContainer.width(function(){
		var l = footerNavSubMenuContainer.find('td').length * 100;
		return l + '%';
		});

	});
	
$('#page_style_0')	.on('pagehide', function(event){
						if (!footerRetracted){
							$('#universalFooter').animate({
								bottom: '-30%'
								}, 300, function(){
									console.log('exec');
									footerRetracted = true;
									});
							}
						})
					.on('pageshow', function(event){
						if (footerRetracted){
							$('#universalFooter').animate({
								bottom: '0px'
								}, 300, function(){
									console.log('exec');
									footerRetracted = false;
									});
							}						
						});
						
$('a.footer-btn').on('touchstart mousedown', function(){
	var movingMenu = $('.footer-nav-sub-menu-container'),
		numberOfMovingMenuItems = movingMenu.find('td.footer-nav-sub-menu-item').length,
		destination = this.getAttribute('href'),
		destinationIndex = parseInt(destination.replace( /^\D+/g, ''), 10);
	
	/* move sub menu */	
	movingMenu.animate({
		left: '-' + $(destination).position().left
		}, 300,function(){
			movingMenuPosition = destinationIndex;
			/* change destinations */
			$('.footer-btn').each(function(index, element){
				if (element.classList.contains('footer-prev-btn')){
					element.setAttribute('href', '#sub_menu_' + (movingMenuPosition-1));
					/* disabled state */
					element.style.visibility = ((movingMenuPosition-1) < 1) ? 'hidden' : 'visible' ;
					} else if (element.classList.contains('footer-next-btn')){
						element.setAttribute('href', '#sub_menu_' + (movingMenuPosition+1));
						/* disabled state */
						element.style.visibility = ((movingMenuPosition+1) > numberOfMovingMenuItems) ? 'hidden' : 'visible' ;
						}									
				});

			})
		
	
	
		
	return false;
	})
