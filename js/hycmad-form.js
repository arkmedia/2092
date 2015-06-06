// JavaScript Document

/***
How you can make a difference form handlers
***/

/* bring up keyboard when popup form appears */
$('.popup-form').on({
		
	//animate keyboard before popup is rendered
	popupbeforeposition: function(){
		$('#virtualKeyboard').animate({bottom: '200px'}, 300);
	},
	
	//automatically move cursor to first name field
	popupafteropen: function(){
		$(this).find('#firstname').focus();	
	},
	
	//reset form value on popup close
	popupafterclose: function(){
		
		//remove keyboard
		$('#virtualKeyboard').animate({bottom: '-350px'}, 300);
		
		//clear inputs
		$('.hycmad_input').each(function(index, element) {
			element.value = null;
		});
	}	
});

/* change element modified by keyboard on focus */
$('.hycmad_input').on('focus', function(){
	jsKeyboard.currentElement = $(this);	
});
 
//close popup on cancel 
$('.hycmad_cancel').on('mousedown', function(){	
	$('.popup-form').popup('close');
});

//How you can make a difference form submit button handler
$('.hycmad_submit').on('mousedown', function(){
	var form = $(this).closest('form'), //get form
		popup = form.closest('[data-role="popup"]'), //get popup
		data = form.serialize(), //get field values
		phone_number = form.find("[name='phone']").val().replace(/\s+|\./g, ""); //get phone number field
	
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
	
	// Verify for valid phone number	
	if (!phone_number.length > 9 || !phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/)){
		popup.find(".validation").html("Please provide a valid phone number");
		return false;
		} 	
		
	// Verify for valid email address
	if(!/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(form.find("[name='email']").val())) {
		popup.find(".validation").html("Please provide a valid email");
		return false;
	}
	
	//close popup after submit
	$.post('./backend/hycmad_form_backend.php', data, function(resp) {			
		$('.popup-form').popup('close');
	}, "text");
});