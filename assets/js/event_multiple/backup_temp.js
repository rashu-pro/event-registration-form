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

//=== REGISTER BUTTON CLICK EVENT
$('.btn-event-register').on('click', function () {
    let self = $(this),
        paymentFieldsSelector = $('.payment-information .form-control'),
        paymentFields = paymentFieldsSelector.length,
        paymentFieldValidSelector = $('.payment-information .form-control.valid'),
        paymentValidFields = paymentFieldValidSelector.length,
        paymentFieldinvalidSelector = $('.payment-information .form-control.invalid'),
        paymentFieldNotValidatdSelector = $('.payment-information .form-control:not(.valid)'),
        paymentFieldNotValidated = paymentFieldNotValidatdSelector.length,

        billinRequiredFieldsSelector = $('.form-row.billing-information-wrapper .form-group.required-group'),
        billingRequiredFields = billinRequiredFieldsSelector.length,
        billingValidFieldsSelector = $('.form-row.billing-information-wrapper .form-group.required-group.field-validated'),
        billingValidFields = billingValidFieldsSelector.length,
        notValidatedBillingFieldsSelector = $('.form-row.billing-information-wrapper .required-group:not(.field-validated)'),
        notValidatedBillingFields = notValidatedBillingFieldsSelector.length,
        formRowActive = $('.form-row.active'),
        formGroupRequired = formRowActive.find('.required-group'),
        formGroupValidated = formRowActive.find('.field-validated'),
        notValidatedField = $('.form-row.active .required-group:not(.field-validated)');


    let isChecked = $('#tc-2').prop('checked');
    if(notValidatedField.length>0){
        //=== Contact Fields Validation Needed
        focusToNotValidFields(notValidatedField);
        return;
    }
    if(notValidatedBillingFields>0){
        //=== Billing Fields Validation Needed
        focusToNotValidFields(notValidatedBillingFieldsSelector);
        return;
    }
    if(parseInt($('.grand-total-price .amount').text())>0){
        if ((paymentFields) != paymentValidFields) {
            //=== Payment Fields Validation Needed
            paymentFieldNotValidatdSelector.first().focus();
            return;
        }
    }
    if(!isChecked){
        //=== Terms & Condition Field Validation Needed
        $('#tc-2').closest('.tc-wrapper').find('.alert').css('border','2px solid #dc3545');
        setTimeout(function () {
            $('#tc-2').closest('.tc-wrapper').find('.alert').css('border','1px solid #084298');
        },300);
        return;
    }
    registrationConfirmation();

});

$(document).on('change', '.ticket-type-js', function (e) {
    e.preventDefault();
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual'),
        ticketText = self.children(':selected').attr('data-text'),
        ticketDataGroup = self.children(':selected').attr('data-group'),
        ticketDataAddon = self.children(':selected').attr('data-addon'),
        ticketDescription = self.children(':selected').attr('data-description'),
        //change made by Emdad
        //price = self.val(),
        price = self.children(':selected').attr('data-price'),
        unitPrice = self.children(':selected').attr('data-unitPrice'),
        dataRow = mainParent.attr('data-row');
    let contactInformationHtml = $('.contact-information-html .contact-information-grouped-single-copy').clone();

    if (self.val() != 0) {
        self.closest('.ticket-type').find('.ticket-type-details').show();
        self.closest('.ticket-type').find('.ticket-type-text').text(ticketText);
        self.closest('.ticket-type').find('.ticket-type-price').text(unitPrice);
        self.closest('.ticket-type').find('.ticket-type-description').text(ticketDescription);
    } else {
        self.closest('.ticket-type').find('.ticket-type-details').hide();
    }

    if (ticketText == 'Childcare Ticket') {
        $('.child-care-wrapper').show();
    } else {
        $('.child-care-wrapper').hide();
    }


    if (parseInt(ticketDataGroup) != 0) {
        ticketGroupManipulation(ticketDataGroup, ticketDataGroup, self);
    } else {
        self.closest('.form-row-ticket-individual').find('.contact-information-inner.contact-information-grouped .contact-information-grouped-single').remove();
        self.closest('.form-row-ticket-individual').find('.contact-information-inner.contact-information-grouped').hide();
        self.closest('.form-row-ticket-individual').find('.contact-information-inner.contact-information-single').show();
        self.closest('.form-row-ticket-individual').find('.contact-information-inner.contact-information-single .contact-information-grouped-wrapper').html(contactInformationHtml);
        let radioHolder = self.closest('.form-row-ticket-individual').find('.contact-information-inner.contact-information-single .contact-information-grouped-wrapper .checkbox-holder');
        radioBoxIdGenerating(radioHolder);

        self.closest('.form-row-ticket-individual').find('.contact-information-grouped-single-copy').addClass('contact-information-grouped-single');
        self.closest('.form-row-ticket-individual').find('.contact-information-grouped-single-copy').find('.section-title span').html('Perticipant Information');
        registrantTextChanging(mainParent);
    }

    self.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').find('.gender-selector').closest('.form-group.required-group').addClass('field-validated');

    //=== WHEN DATA-ADDON IS TRUE
    if (parseInt(ticketDataAddon) === 1) {
        removeContactFields(mainParent);
    }

    calculateTotalPrice(mainParent);
    calculateCoupon($('.btn-apply-voucher-js'), false);
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

//=== CARD VALIDATION
function card_validation() {
    let number = document.querySelector('.cc-number');
    //Payment.formatCardNumber(number);
    if(number!== '') J.toggleClass(document.querySelectorAll('input'), 'invalid');
    let cardType = Payment.fns.cardType(J.val(number));
    // J.toggleClass(number, 'invalid', !Payment.fns.validateCardNumber(J.val(number)));
    if (cardType) {
        creditCardField.addClass(cardType);
        //file from server
        // creditCardImageHolder.html("<img src='https://secure-api.net/Content/event-management-assets/individual-multiple-assets/images/" + cardType + ".png'>");

        // local file
        creditCardImageHolder.html("<img src='assets/images/" + cardType + ".png'>");
    } else {
        console.log('no card selected');
        // file from server
        // creditCardImageHolder.html("<img src='https://secure-api.net/Content/event-management-assets/individual-multiple-assets/images/card_mockup.png'>");
        // local file
        creditCardImageHolder.html("<img src='assets/images/unknown.png'>");
    }
    if (number!== '' && Payment.fns.validateCardNumber(J.val(number))) {
        creditCardField.removeClass('invalid');
        creditCardField.addClass('valid');
        creditCardField.closest('.input-wrap').find('.warning-message').hide();
    } else {
        creditCardField.addClass('invalid');
        creditCardField.removeClass('valid');
        creditCardField.closest('.input-wrap').find('.warning-message').show();
    }
}