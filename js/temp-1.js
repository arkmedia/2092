// JavaScript Document

.ajax({
		type: "GET",
		url: "./excel/SJH_Donor_List.xml",
		dataType: 'xml',
		success: function(xml){
			$("#donor_test5 .donor-grid").empty();
			$("#donor_test5 .donor-list-container").empty();
			var allMyChildren = $(xml).children().first().children();
			var lastCat;
			var count = 0;
			allMyChildren.each(function(index, element) {
               if (element.tagName == "category"){
				   lastCat =  element.childNodes[0].nodeValue;
				   var newContainer = document.createElement('ul');
				   if (count == 0){
					  newContainer.classList.add('default');
					  newContainer.classList.add('donor-active'); 
					}
				   newContainer.setAttribute('data-contains', element.childNodes[0].nodeValue);
				   newContainer.setAttribute('data-iscroll', '');
				   var newCat = document.createElement('li');
				   newCat.setAttribute('data-for', element.childNodes[0].nodeValue);
				   newCat.innerHTML = element.childNodes[0].nodeValue;
				   document.querySelector('#donor_test5 .donor-grid').appendChild(newCat);
				   document.querySelector('#donor_test5 .donor-list-container').appendChild(newContainer);
				   count++;
			   } else {
				   //console.log($(element).children('firstname')[0].childNodes[0]);
				   /*var newDonor = document.createElement('li');
				   newDonor.innerHTML = element.childNodes[0].nodeValue + ' ' + element.childNodes[1].nodeValue;
				   $('#donor_test5 .donor-list-container ul').last().append(newDonor);*/
				  // console.log(element.getElementsByTagName('*'));
				   
				}
            });
				donorGridButtons = document.querySelectorAll('.page_style_d .donor-grid li');
				donorGridButtonsLength = donorGridButtons.length;
				lists =  document.querySelectorAll('.donor-list-container ul');
				listsLength = lists.length;
				/* attach appropriate mouse and touch handlers to donors list */	
for (i=0;i<donorGridButtonsLength;i++){
	donorGridButtons[i].addEventListener('mouseover', donorGridButtonAction);
	donorGridButtons[i].addEventListener('touchstart', donorGridButtonAction);
}
			}
		
		});
	//$("#donor_test5")