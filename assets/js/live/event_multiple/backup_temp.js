/**
 * Created by rashu on 10/2/2022.
 */
//=== ADD ANOTHER TICKET BUTTON CLICK EVENT
$(document).on('click', btnAddAnother, function (e) {
    e.preventDefault();
    // REQUIRED FIELD CHECKING
    let self = $(this),
        invalidField = self.closest('.form-row-body').find('.form-group.required-group'),
        validField = self.closest('.form-row-body').find('.form-group.field-validated'),
        notValidatedField = $('.form-row-ticket-individual.active .required-group:not(.field-validated)');
    let isChecked = self.closest('.form-row-body').find('.tc').prop('checked');
    let isTicket = self.closest('.form-row-body').find('.ticket-type-js').val();

    console.log('invalid field: ' + invalidField.length);
    console.log('valid field: ' + validField.length);
    console.log('not valid field: ' + notValidatedField.length);
    if (invalidField.length === validField.length) {

        let mainParent = self.closest('.form-row-ticket-individual'),
            dataRow = parseInt(mainParent.attr('data-row')) + 1,
            genderName = "gender-name" + dataRow,
            genderMaleRadioId = "gender-male" + dataRow,
            genderFemaleRadioId = "gender-female" + dataRow,
            lostBadgeId = "lostBadge-" + dataRow;
        let clonedHtml = mainParent.clone();
        // let clonedTicketCategory = mainParent.find('.ticket-type').clone();
        let clonedTicketCategory = $('.ticket-type-new .ticket-type').clone();
        // clonedTicketCategory.find('.required-group').removeClass('field-validated');
        // clonedTicketCategory.find('.lost-badge-check').prop('checked', false);
        // clonedTicketCategory.find('.ticket-type-details').hide();

        //changed by Emdad
        updateTicketQuantity(dataRow);
        //if (parseInt(mainParent.find('.ticket-type-js').val()) != 0) {

        if (parseInt(mainParent.find('.ticket-type-js option:selected').attr('data-price')) != 0) {

            pageLoader.addClass('active');
            mainParent.removeClass('active').addClass('edited');
            setTimeout(function () {
                self.closest('.form-body').append(ticketHtml);
                // self.closest('.form-body').append(clonedHtml);
                mainParent.next().find('.form-fields-wrapper').prepend(clonedTicketCategory);
                mainParent.next().attr('data-row', dataRow);
                mainParent.next().find('.ticket-row').html(dataRow);
                // mainParent.next().find('.gender-male').attr('name', genderName);
                // mainParent.next().find('.gender-female').attr('name', genderName);
                // mainParent.next().find('.gender-male').attr('id', genderMaleRadioId);
                // mainParent.next().find('.gender-male').next().attr('for', genderMaleRadioId);
                // mainParent.next().find('.gender-female').attr('id', genderFemaleRadioId);
                // mainParent.next().find('.gender-female').next().attr('for', genderFemaleRadioId);
                // mainParent.next().find('.tc').attr('id', dataRow);
                // mainParent.next().find('.tc').next().attr('for', dataRow);
                mainParent.next().find('.lost-badge-check').attr('id', lostBadgeId);
                mainParent.next().find('.lost-badge-check').next().attr('for', lostBadgeId);
                registrantTextChanging(mainParent);


                pageLoader.removeClass('active');
                window.scrollTo({ top: bannerHeight, behavior: 'smooth' });
            }, 1000);
        } else {
            mainParent.find('.ticket-type-js').focus();
        }

    } else {
        notValidatedField.first().find('.form-control').focus();
        if (notValidatedField.hasClass('radiobox')) {
            notValidatedField.first().find('input').focus();
            notValidatedField.first().addClass('focused');
        }
    }
});


function singleValidation(formControl, formGroup) {
    errorMessage = "The field is required";
    if (formControl.val() !== '') {
        formControl.closest('.form-group.required-group').removeClass('field-invalid');
        formControl.closest('.form-group.required-group').find('.error-message').remove();
        formControl.closest('.form-group.required-group').addClass('field-validated');
        //email validation
        if (formControl.data('validation') === "email") {
            if (formControl.val() != '') {
                errorMessage = "Invalid Email!"
            }
            if (validateMail(formControl.parent())) {
                formControl.closest('.form-group.required-group').removeClass('field-validated');
                notifyError(formControl, errorMessage);
            }
        }

        //zip code validation
        if (formControl.data('validation') === "zipcode") {
            if (formControl.val() != '') {
                errorMessage = "Invalid ZIP code!"
            }

            if (!zipCodeValidation(formControl.val())) {
                formControl.closest('.form-group.required-group').removeClass('field-validated');
                notifyError(formControl, errorMessage);
            }
        }

        //ticket type validation
        if (formControl.val() == 0) {
            formControl.closest('.form-group.required-group').removeClass('field-validated');
            notifyError(formControl, errorMessage);
        }

    } else {
        notifyError(formControl, errorMessage);
    }
}

function notifyError(formControl, errorMessage) {
    formControl.parent().removeClass('field-validated');
    formControl.parent().addClass('field-invalid');
    if (formControl.parent().find('.error-message')) {
        formControl.parent().find('.error-message').remove();
        setTimeout(function () {
            formControl.parent().append('<p class="error-message text-danger m-0">' + errorMessage + '</p>');
        }, 200);
    } else {
        formControl.parent().append('<p class="error-message text-danger m-0">' + errorMessage + '</p>');
    }
}