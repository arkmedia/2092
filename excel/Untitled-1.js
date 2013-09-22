// JavaScript Document

var donorView = function(page){
		/* donor list variables */
	/*donorGridButtons = document.querySelectorAll('.page_style_d .donor-grid li'),
	donorGridButtonsLength = donorGridButtons.length,
	lists =  document.querySelectorAll('.donor-list-container ul'),
	listsLength = lists.length,*/
	this.page = page;

	
}

donorView.prototype = {
	
	//container: this.page.querySelector('.donor-list'),
	
	getContent: function(){
		alert(this.page.type);
		/*$.ajax({
			url: 'http://www.thierryblais.com/2092/donor-lists/st_josephs_hospital_donors.php',
			dataType: 'html',
			success: function(a,b,c){
				document.querySelector('#st_josephs_hospital_donors .donor-table').innerHTML = a;
			}
		});	*/	
	}	
	
}