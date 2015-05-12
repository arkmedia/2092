// JavaScript Document

var donorView = function(page){
	this.page = page;
	this.container = page.querySelector('.donor-table');
}

donorView.prototype = {	
	//get content and fill donor list container
	getContent: function(){
		/*var self = this,
			page = self.page,
			container = self.container,
			baseURL = '',
			fileURL = page.getAttribute('data-source');
		if (fileURL != undefined || fileURL == ''){
			$.ajax({
				url: baseURL + fileURL,
				dataType: 'html',
				success: function(a,b,c){
					container.innerHTML = a;
					self.render();
				},
				error: function(){
					console.error('There was an error retrieving source for elementID: ' + page.id);	
				}
			});
		}*/
	},
	
	//bind donor list functionality
	render: function(){
		var self = this,
			page = self.page,
			container = self.container,
			donorGridButtons = container.querySelectorAll('.donor-grid li'),
			donorGridLists =  container.querySelectorAll('.donor-list-container ul');	
				
		// attach appropriate mouse and touch handlers to donors list
		for (i=0;i<donorGridButtons.length;i++){
			var button = donorGridButtons[i];
			button.siblings = donorGridButtons;
			button.target = container.querySelector('[data-list="' + button.getAttribute("data-for") + '"]'); //this donor categorie's list	
			button.addEventListener('mouseover', self.donorGridButtonAction, false);
			button.addEventListener('touchstart', self.donorGridButtonAction, false);
		}

		// make sure that top category gets top billing on page show
		$(page).on('pagebeforeshow', function(e){
			var firstCat = donorGridButtons[0],
				siblings = firstCat.siblings;
			for (h=0;h<siblings.length;h++){
				var sibling = siblings[h];
				sibling.target.style.display = 'none';
				sibling.classList.remove('donor-active'); // remove active donor status on all
			}
			firstCat.classList.add('donor-active');
			firstCat.target.style.display = 'inline-block';
		});
	},	
	donorGridButtonAction: function(event){
		var self = this,
			siblings = self.siblings,
			target = self.target;

		for (h=0;h<siblings.length;h++){
			var sibling = siblings[h];
			sibling.target.style.display = 'none';
			sibling.classList.remove('donor-active'); // remove active donor status on all
		}

		self.classList.add('donor-active'); // add donor active status to self

		target.style.display = 'block'; // display associated list
		
		if (target.iscrollInitiated == undefined){
			target.iscrollInitiated = true;		
			$(target).iscrollview('refresh');
		}
	}
}