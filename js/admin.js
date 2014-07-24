(function ($) {
	"use strict";
	$(function () {
		
		$.fn.bootstrapSwitch.defaults.offColor = 'warning';
		$.fn.bootstrapSwitch.defaults.onText = 'Live';
		$.fn.bootstrapSwitch.defaults.offText = 'Test';

        $('input[name="sc_settings_keys[enable_live_key]"]').bootstrapSwitch();
		
		$('.license-wrap button').on( 'click', function(e) {
			
			var button = $(this);
			
			e.preventDefault();
			
			if( button.parent().find('input[type="text"]').val().length < 1 ) {
				button.html( 'Activate' );
				button.attr( 'data-sc-action', 'activate_license' );
				button.parent().find('.sc-license-message').html( 'License Inactive' ).removeClass('sc-valid sc-invalid').addClass( 'sc-inactive' );
			} else {
				button.parent().find('.sc-spinner-wrap').show();
				
				var data = {
					action: 'sc_activate_license',
					license: button.parent().find('input[type="text"]').val(),
					item: button.attr('data-sc-item'),
					sc_action: button.attr('data-sc-action'),
					id: button.parent().find('input[type="text"]').attr('id')
				}

				$.post( ajaxurl, data, function(response) {

					button.parent().find('.sc-spinner-wrap').hide();
					
					if( response == 'valid' ) {
						button.html( 'Deactivate' );
						button.attr('data-sc-action', 'deactivate_license');
						button.parent().find('.sc-license-message').html( 'License is valid and active.' ).removeClass('sc-inactive sc-invalid').addClass( 'sc-valid' );
					} else if( response == 'deactivated' ) {
						button.html( 'Activate' );
						button.attr( 'data-sc-action', 'activate_license' );
						button.parent().find('.sc-license-message').html( 'License is inactive.' ).removeClass('sc-valid sc-invalid').addClass( 'sc-inactive' );
					} else if( response == 'invalid' ) {
						button.parent().find('.sc-license-message').html( 'Sorry, but this license key is invalid.' ).removeClass('sc-inactive sc-valid').addClass( 'sc-invalid' );
					} else if( response == 'notfound' ) {
						button.parent().find('.sc-license-message').html( 'License service could not be found. Please contact support for assistance.' ).removeClass('sc-inactive sc-valid').addClass( 'sc-invalid' );
					} else if ( response == 'error' ) {
						button.parent().find('.sc-license-message').html( 'An error has occurred, please try again.' ).removeClass('sc-inactive sc-valid').addClass( 'sc-invalid' );
					}
				});
			}
			
		});
	});
}(jQuery));
