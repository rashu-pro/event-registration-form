/**
 * Created by Rashu on 07-03-22.
 */

let J = Payment.J,
    creditCardField = $('.cc-number'),
    creditCardHolder = $('.cc-number-holder'),
    creditCardImageHolder = $('.cc-card-identity'),
    btnAddAnotherTicket = $('.btn-add-another-js'),
    pageLoader = $('.loader-div'),
    bannerHeight = $('.main-banner').height();

let ticketHtml = `
<div class="form-row form-row-ticket-individual active">
    <div class="form-row-head">
        <div class="form-row-head-inner">
            <h3 class="form-row-title">Registration Ticket #<span class="ticket-row">1</span></h3>

            <div class="form-row-head-btn">
                <button type="button" class="btn btn-dark btn-collapse btn-ticket-collapse">
                    <i class="fa fa-plus"></i>
                </button>

                <button type="button" class="btn btn-default btn-collapse btn-delete-ticket-js">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        </div>
    </div>

    <div class="form-row-body">
        <div class="form-fields-wrapper">

            <!-- //=== CONTACT INFORMATION -->
            <div class="contact-information-wrapper b-t-1 mt-4 pt-3">
            
                <!-- //=== CONTACT INFORMATION -->
                <div class="contact-information-inner contact-information-single">
                    <div class="contact-information-grouped-wrapper" data-grouped="1">
                    <div class="contact-information-grouped-single" data-contact="1">
                    <h3 class="text-center font-bold section-title"><span>Primary Registrant <p style="display:inline-block;margin:0; padding-left:10px;" class="contact-number"></p></span></h3>

                    <div class="row mt-3">
                        <div class="col-12 col-sm-9">
                                                                    <div class="row">
                                                                        <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                                                                            <div class="form-group required-group">
                                                                                <label class="form-control-label">First Name <span class="required-mark">*</span></label>
                                                                                <input type="text" name="TicketHolderFirstName[]" class="form-control first-name mask-text">
                                                                            </div>
                                                                        </div>

                                                                        <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                                                                            <div class="form-group required-group">
                                                                                <label class="form-control-label">Last Name <span class="required-mark">*</span></label>
                                                                                <input type="text" name="TicketHolderLastName[]" class="form-control last-name">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-12 col-sm-3">
                                                                    <div class="form-group required-group field-validated">
                                                                        <label>Gender <span class="required-mark">*</span></label>
                                                                        <select class="form-control gender-selector" name="TicketHolderGender[]">
                                                                            <option value="male">Male</option>
                                                                            <option value="female">Female</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                        <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                            <div class="form-group email-field required-group">
                                <label class="form-control-label">Email <span class="required-mark">*</span></label>
                                <input type="email" name="TicketHolderEmail[]" class="form-control email" data-validation="email">
                            </div>
                        </div>

                        <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                            <div class="form-group required-group">
                                <label class="form-control-label">Phone Number <span class="required-mark">*</span></label>
                                <input type="text" name="TicketHolderPhoneNumber[]" class="form-control phone-number-mask">
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
                   
                </div>
                
                <div class="contact-information-inner contact-information-grouped">
                    <div class="contact-information-grouped-wrapper" data-grouped="1">
                    </div>
                    
                    <div class="btn-holder">
                        <a href="javascript:void(0)" class="add-another-link btn-add-group-js">
                            <span class="btn-text">Add More</span>
                        </a>
                    </div>
                </div>
                
               
            </div>
        </div>

        <div class="form-row-foot">
            <div class="text-center">
                <a href="javascript:void(0)" class="btn btn-dark btn-add-another-js">
                    <img src="https://res.cloudinary.com/secure-api/image/upload/v1652709692/secure-api/Common/assets/plus_circle.png" class="img-left">
                    <span class="btn-text">Save and Add Another Ticket</span>
                </a>
            </div>
        </div>
    </div>
</div>
`;

$('.quantity-increase').on('click', function () {
    let self = $(this),
        quantitySelector = self.closest('.quantity-wrap').find('.form-control'),
        quantityValue = quantitySelector.val();

    if (quantityValue < 10) {
        quantitySelector.val(parseInt(quantityValue) + 1);
    }

    collectData(self);
});

$('.quantity-decrease').on('click', function () {
    let self = $(this),
        quantitySelector = self.closest('.quantity-wrap').find('.form-control'),
        quantityValue = quantitySelector.val();

    if (quantityValue > 0) {
        quantitySelector.val(parseInt(quantityValue) - 1);
    }

    collectData(self);
});

$('.quantity-wrap .form-control').on('keyup', function () {
    let self = $(this);
    collectData(self);
});

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
    console.log("not validated field", notValidatedField.length);
    console.log("payment fields", paymentFields);
    console.log("payment valid fields", paymentValidFields);
    console.log("billing required fields", billingRequiredFields);
    console.log("billing validated fields", billingValidFields);
    console.log("billing not validated fields", notValidatedBillingFields);

    if(notValidatedField.length>0){
        console.log('Contact Fields Validation Needed...');
        focusToNotValidFields(notValidatedField);
    }else if(notValidatedBillingFields>0){
        console.log('Billing Fields Validation Needed...');
        focusToNotValidFields(notValidatedBillingFieldsSelector);
    }else{
        console.log('Payment Fields...');
        if ((paymentFields) == paymentValidFields) {
            console.log('payment fields validated');
            let isChecked = $('#tc-2').prop('checked');
            if(isChecked){
                registrationConfirmation();
                // $('.loader-div').addClass('active');
                // setTimeout(function (e) {
                //     window.location.href='thank_you.html';
                // },600);
            }else{
                console.log('Terms & Condition Field Validation Needed...');
                $('#tc-2').closest('.tc-wrapper').find('.alert').css('border','2px solid #dc3545');
                setTimeout(function () {
                    $('#tc-2').closest('.tc-wrapper').find('.alert').css('border','1px solid #084298');
                },300)
            }

            //setTimeout(function (e) {
            //    $('.registration-form-wrapper').hide();
            //    $('.thank-wrapper').show();
            //    $('.loader-div').removeClass('active');
            //}, 1000);
        } else {
            console.log('Payment Fields Validation Needed...');
            console.log(paymentFieldNotValidated);
            paymentFieldNotValidatdSelector.first().focus();
        }
    }

});

//===== ON DOCUMENT READY
$(document).on('ready', function (e) {
    fixHeight();
    if ($('.cc-number').length > 0) {
        card_validation()
    }
});

//======= NAME ON CARD VALIDATION
$('.cc-name').on('keyup blur focus', function (e) {
    let self = $(this);
    // if (nameOnCardValidation(self.val())) {
    if (self.val()=='') {
        self.removeClass('valid');
        self.addClass('invalid');
        // self.closest('.input-wrap').find('.warning-message').hide();
    } else {
        self.removeClass('invalid');
        self.addClass('valid');
    }
});

creditCardField.on('keyup', function (e) {
    card_validation();
});

$('.cc-number-holder .cc-card-identity').on('click', function (e) {
    $(this).parent().find('input').focus();
});

//===== ADD ANOTHER TICKET ACTION
$(document).on('click', '.btn-add-another-js', function (e) {
    e.preventDefault();
    // REQUIRED FIELD CHECKING
    let self = $(this),
        invalidField = self.closest('.form-row-body').find('.form-group.required-group'),
        validField = self.closest('.form-row-body').find('.form-group.field-validated'),
        notValidatedField = $('.form-row-ticket-individual.active .required-group:not(.field-validated)');
    let isChecked = self.closest('.form-row-body').find('.tc').prop('checked');
    let isTicket = self.closest('.form-row-body').find('.ticket-type-js').val();

    console.log('invalid field: '+invalidField.length);
    console.log('valid field: '+validField.length);
    console.log('not valid field: '+notValidatedField.length);
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

    }else{
        notValidatedField.first().find('.form-control').focus();
        if(notValidatedField.hasClass('radiobox')){
            notValidatedField.first().find('input').focus();
            notValidatedField.first().addClass('focused');
        }
    }
});

//==== PRIMARY REGISTRANT CHANGING FROM SECOND ROW
function registrantTextChanging(mainParent){
    mainParent.closest('.form-body').find('.form-row-ticket-individual:not(.first-row)').find('.contact-information-grouped-single').first().find('.section-title').html("<span>Registrant</span>");
}

$(document).on('click', '.btn-ticket-collapse', function (e) {
    e.preventDefault();
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual');

    mainParent.toggleClass('active');
});

$(document).on('click', '.btn-delete-ticket-js', function (e) {
    e.preventDefault();
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual'),
        dataRow = mainParent.attr('data-row');
    $('#confirm-modal-delete .modal-confirm').attr('data-row', dataRow);
    $('#confirm-modal-delete').modal('show');
});
$('.btn-delete-row-confirm').on('click', function () {
    let self = $(this);
    deleteRow(self.closest('.modal-confirm').attr('data-row'));
    $('#confirm-modal-delete').modal('hide');
});


//===== TICKET TYPE SELECT ACTION
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


    if(parseInt(ticketDataGroup)!=0){
        ticketGroupManipulation(ticketDataGroup, ticketDataGroup, self);
    }else{
        self.closest('.form-row-ticket-individual').find('.contact-information-inner.contact-information-grouped .contact-information-grouped-single').remove();
        self.closest('.form-row-ticket-individual').find('.contact-information-inner.contact-information-grouped').hide();
        self.closest('.form-row-ticket-individual').find('.contact-information-inner.contact-information-single').show();
        self.closest('.form-row-ticket-individual').find('.contact-information-inner.contact-information-single .contact-information-grouped-wrapper').html(contactInformationHtml);
        let radioHolder = self.closest('.form-row-ticket-individual').find('.contact-information-inner.contact-information-single .contact-information-grouped-wrapper .checkbox-holder');
        radioBoxIdGenerating(radioHolder);

        self.closest('.form-row-ticket-individual').find('.contact-information-grouped-single-copy').addClass('contact-information-grouped-single');
        self.closest('.form-row-ticket-individual').find('.contact-information-grouped-single-copy').find('.section-title span').html('Primary Registrant');
        registrantTextChanging(mainParent);
    }

    self.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').find('.gender-selector').closest('.form-group.required-group').addClass('field-validated');

    //=== WHEN DATA-ADDON IS TRUE
    if(parseInt(ticketDataAddon)===1){
        removeContactFields(mainParent);
    }

    calculateTotalPrice(mainParent, self);

});

//===== REMOVE CONTACT FIELDS BASED ON ADDON
function removeContactFields(mainParent){
    mainParent.find('.contact-information-grouped-wrapper .email').closest('.form-group').remove();
    mainParent.find('.contact-information-grouped-wrapper .phone-number-mask').closest('.form-group').remove();
}




//===== PAY NOW BUTTON CLICK ACTION
$(document).on('click', '.btn-pay-direction-js', function (e) {
    e.preventDefault();
    let self = $(this);
    fieldValidation(self);

    let invalidField = self.closest('.form-row-body').find('.form-group.required-group'),
        validField = self.closest('.form-row-body').find('.form-group.field-validated');
    console.log('required-field: ' + invalidField.length);
    console.log('validated-field: ' + validField.length);
    if (invalidField.length === validField.length) {
        $('.btn-event-register').removeClass('disabled');
        $('.btn-event-register').prop('disabled', false);
        let paymentInformationHeight = $('#payment-information').height();
        window.scrollTo({ top: paymentInformationHeight, behavior: 'smooth' });
        $('#payment-information .sidebar-block-description').removeClass('disabled-block');
        $('.cc-name').focus();
    }
});

$(document).on('keyup blur change', '.form-group.required-group .form-control', function (e) {
    let self = $(this);
    singleValidation(self, self.parent());
    // activateButtons(self);
});

$(document).on('change', '.gender-radio.required-group input[name=gender]', function (e) {
    let self = $(this);
    self.closest('.form-group').find('.form-control').val(self.val());
    singleValidation(self.closest('.form-group').find('.form-control'), self.parent());
    activateButtons(self.closest('.form-group').find('.form-control'));
});


$(document).on('change', '.tc', function (e) {
    let self = $(this);
    singleValidation(self, self.parent());
    // activateButtons(self);
});

$(document).on('change', '.copy-information input[type=checkbox]', function (e) {
    let self = $(this);
    if (self.prop('checked')) {
        let firstName = $('.form-row.first-row .first-name').val(),
            lastName = $('.form-row.first-row .last-name').val(),
            email = $('.form-row.first-row .email').val(),
            phone = $('.form-row.first-row .phone').val(),
            address = $('.form-row.first-row .address').val(),
            country = $('.form-row.first-row .country').val(),
            zipCode = $('.form-row.first-row .zip-code').val(),
            state = $('.form-row.first-row .state').val(),
            city = $('.form-row.first-row .city').val();

        $('.billing-information .first-name').val(firstName);
        $('.billing-information .last-name').val(lastName);
        $('.billing-information .email').val(email);
        $('.billing-information .phone').val(phone);
        $('.billing-information .address').val(address);
        $('.billing-information .country').val(country);
        $('.billing-information .zip-code').val(zipCode);
        $('.billing-information .state').val(state);
        $('.billing-information .city').val(city);
        fieldValidation(self);
    } else {
        $('.billing-information .first-name').val('');
        $('.billing-information .last-name').val('');
        $('.billing-information .email').val('');
        $('.billing-information .phone').val('');
        $('.billing-information .address').val('');
        $('.billing-information .country').val('');
        $('.billing-information .zip-code').val('');
        $('.billing-information .state').val('');
        $('.billing-information .city').val('');
    }
});

//===== ON LOST BADGE FEE CHANGE
$(document).on('change', '.lost-badge-check', function (e) {
    console.log('checked');
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual');
    calculateTotalPrice(mainParent, self);
});


//===== INPUT MASKING
let textMask = $('.mask-text'),
    phoneNumberMask = $('.phone-number-mask'),
    zipcodeMask = $('.mask-zipcode');

$(document).on('focus', '.form-body', function (e) {
    $('.phone-number-mask').inputmask({
        "mask": "(999) 999-9999",
        "onKeyValidation": function (key, result) {
            if (result) {
                // console.log(result);
            }
        }
    });

    $('.mask-zipcode').inputmask({
        "mask": "99999"
    });
});

$('.payment-information .mask-zipcode').inputmask({
    "mask": "99999"
});

$('.mask-cvv').inputmask({
    "mask": "999"
});

$('.mask-cvv').on('keyup', function () {
    let self = $(this);
    if ($('.mask-cvv').inputmask("isComplete")) {
        self.addClass('valid');
        self.removeClass('invalid');
    } else {
        self.removeClass('valid');
        self.addClass('invalid');
    }
});

$('.payment-information .mask-zipcode').on('keyup',function (e) {
    let self = $(this);
    if ($('.payment-information .mask-zipcode').inputmask("isComplete")) {
        self.addClass('valid');
        self.removeClass('invalid');
    } else {
        self.removeClass('valid');
        self.addClass('invalid');
    }
});

$('.cc-year, .cc-month').on('change', function (e) {
    let self = $(this);
    if (parseInt(self.val()) != 0) {
        self.addClass('valid');
        self.removeClass('invalid');
    } else {
        self.removeClass('valid');
        self.addClass('invalid');
    }
});





//===== DEFINITION FOR FUNCTIONS
function card_validation() {
    let number = document.querySelector('.cc-number');
    Payment.formatCardNumber(number);
    J.toggleClass(document.querySelectorAll('input'), 'invalid');
    let cardType = Payment.fns.cardType(J.val(number));
    // J.toggleClass(number, 'invalid', !Payment.fns.validateCardNumber(J.val(number)));
    if (cardType) {
        creditCardField.addClass(cardType);
        creditCardImageHolder.html("<img src='/beta/Content/event-management-assets/individual-multiple-assets/images/" + cardType + ".png'>");
    } else {
        console.log('no card selected');
        creditCardImageHolder.html("<img src='/beta/Content/event-management-assets/individual-multiple-assets/images/unknown.png'>");
    }
    if (Payment.fns.validateCardNumber(J.val(number))) {
        creditCardField.removeClass('invalid');
        creditCardField.addClass('valid');
        creditCardField.closest('.input-wrap').find('.warning-message').hide();
    } else {
        creditCardField.addClass('invalid');
        creditCardField.removeClass('valid');
        creditCardField.closest('.input-wrap').find('.warning-message').show();
    }
}

function collectData(self) {
    let ticketNumber = parseInt(self.closest('.quantity-wrap').find('.form-control').val()) ? parseInt(self.closest('.quantity-wrap').find('.form-control').val()) : 0,
        ticketPrice = parseInt(self.closest('tr').find('.per-price .amount').text()),
        ticketType = self.closest('.quantity-wrap').attr('ticket-type');

    console.log('ticket number: ' + ticketNumber);
    console.log('ticket price: ' + ticketPrice);
    console.log('ticket type: ' + ticketType);

    updateTicketData(ticketNumber, ticketPrice, ticketType);
}

function updateTicketData(ticketNumber, ticketPrice, ticketType) {
    $('.' + ticketType + '-quantity').text(ticketNumber);
    $('.' + ticketType + '-price .amount').text(ticketNumber * ticketPrice);

    //PRICE ADDITION
    let belowPrice = parseInt($('.ticket-summary-table .below-10-price .amount').text()),
        abovePrice = parseInt($('.ticket-summary-table .above-10-price .amount').text()),
        adultPrice = parseInt($('.ticket-summary-table .adult-price .amount').text()),
        totalPrice = belowPrice + abovePrice + adultPrice;
    $('.total-price .amount').text(totalPrice);
}

function fixHeight() {
    let headerHeight = parseFloat($('.header').css('height')),
        footerHeight = parseFloat($('.footer').css('height')),
        mainWrapperMarginTop = parseFloat($('.main-wrapper').css('margin-top')),
        mainWrapperMarginBottom = parseFloat($('.main-wrapper').css('margin-bottom')),
        heightToMinusReady = headerHeight + footerHeight + mainWrapperMarginTop + mainWrapperMarginBottom,
        heightToMinus = "calc(100vh - " + heightToMinusReady + "px)";
    $('.main-wrapper').css('min-height', heightToMinus);

}

function activateButtons(self) {
    let invalidField = self.closest('.form-row-body').find('.form-group.required-group'),
        validField = self.closest('.form-row-body').find('.form-group.field-validated');
    // console.log("invalid fields: "+invalidField.length);
    // console.log("valid fields: "+validField.length);
    let isChecked = self.closest('.form-row-body').find('.tc').prop('checked');
    let isTicket = self.closest('.form-row-body').find('.ticket-type-js').val();
    if (invalidField.length === validField.length && isChecked) {
        self.closest('.form-row-body').find('.btn-add-another-js').removeClass('disabled');
        if ($('.billing-information-wrapper').hasClass('active')) {

        } else {
            let firstName = $('.form-row.first-row .first-name').val(),
                lastName = $('.form-row.first-row .last-name').val(),
                fullName = firstName + " " + lastName;
            $('.copy-information .name').text(fullName);
            $('.billing-information-wrapper').addClass('active');
        }

    } else {
        self.closest('.form-row-body').find('.btn-add-another-js').addClass('disabled');
        if ($('.billing-information-wrapper').hasClass('active')) {

        } else {
            $('.billing-information-wrapper').removeClass('active');
        }
    }
}

function fieldValidation(clickedElement) {
    let formGroup = clickedElement.closest('.form-row-body').find('.form-group.required-group');
    let formGroupInvalid = clickedElement.closest('.form-row-body').find('.form-group.field-invalid');
    if (formGroup.length > 0) {
        console.log('the form is invalid!');
        formGroup.each(function (i, element) {
            let formControl = $(element).find('.form-control');
            singleValidation(formControl, $(element));
        });
    }
    clickedElement.closest('.form-row-body').find('.form-group.field-invalid .form-control').focus();
}

//======= EMAIL VALIDATION
function validateMail(formGroup) {
    let pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
        email = formGroup.find('.form-control').val();
    if (!pattern.test(email)) {
        return true;
    } else {
        return false;
    }
}

//======= ZIP CODE VALIDATION
function zipCodeValidation(code) {
    let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(code);
    return isValidZip;
}

//======= NAME ON CARD VALIDATION
function nameOnCardValidation(name) {
    let isValidName = /[-a-zA-Z' ]{6,26}/g.test(name);
    return isValidName;
}

let errorMessage = "The field is required";
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

function calculateTotalPrice(mainParent, self) {

    let ticketText = mainParent.find('.ticket-type-js').children('option:selected').attr('data-text'),
        ticketKey = mainParent.find('.ticket-type-js').val(),
        // ticketDataGroup = mainParent.find('.ticket-type-js').children('option:selected').attr('data-group'),
        ticketDataGroup = 1,
        ticketDescription = mainParent.find('.ticket-type-js').children('option:selected').attr('data-description'),
        price = mainParent.find('.ticket-type-js option:selected').attr('data-price'),
        // price = mainParent.find('.ticket-type-js').val(),
        dataRow = mainParent.attr('data-row'),
        trRowId = mainParent.find('.ticket-type-js').val()+"-"+dataRow,
        lostBadge = mainParent.find('.lost-badge-check'),
        isLostBadgeChecked = lostBadge.prop('checked'),
        lostBadgePrice = parseInt(lostBadge.data('value'));

    if(parseInt(ticketDataGroup)<1) {
        ticketDataGroup = 1;
    }

    if(ticketDataGroup == 'couple') {
        ticketDataGroup = 1;
    }

    console.log("data-group: " + ticketDataGroup);

    //Have to call

    let row = `<tr id='row-${trRowId}' class='price-row ticket-price-row price-${dataRow}' data-row="${dataRow}">
                                    <td class="tr-ticket-text">
                                        <span class="row-number"></span>
                                        <span class="row-text">${ticketText}</span>
                                        <span> X </span>
                                        <span class="row-quantity">${ticketDataGroup}</span>
                                    </td>
                                    <th>
                                        <span class="">
                                            <span class="currency">$</span>
                                            <span class="amount">${price}</span>
                                        </span>
                                    </th>
                                </tr>`;

    //changed by emdad
    //changed to attr from value
    if (parseInt(mainParent.find('.ticket-type-js option:selected').attr('data-price')) != 0) {
        /*
        if ($('.price-' + dataRow).length > 0) {
            if (price == 0) {
                console.log('no data');
                $('.price-' + dataRow).hide();
                $('.price-' + dataRow).find('.amount').html('');
            } else {
                $('.price-' + dataRow).show();
                // $('.price-' + dataRow).next().show();
                $('.price-' + dataRow).attr('id','row-'+trRowId);
                $('.price-' + dataRow).find('.tr-ticket-text .row-text').html(ticketText);
                $('.price-' + dataRow).find('.tr-ticket-text .row-quantity').html(ticketDataGroup);
                $('.price-' + dataRow).find('.amount').html(price);

                // $('.price-' + dataRow).next().remove();
                // $(".ticket-summary-table table tbody").append(row);
                // $('.price-' + dataRow).next().remove();
                ticketSummaryInputField(mainParent, self);

            }

        } else {
            $(".ticket-summary-table table tbody").append(row);
            ticketSummaryInputField(mainParent, self);
        }*/
        $('.price-' + dataRow).remove();
        if(mainParent.next().hasClass('form-row-ticket-individual')){
            let dataRowNext = mainParent.next().data('row'),
                isAddonPriceRow = $('.addon-price-'+dataRow);
            if(isAddonPriceRow.length>0){
                console.log('addon exist');
                isAddonPriceRow.first().before(row);
                ticketSummaryInputField(mainParent, self);
            }else{
                console.log('addon does not exist');
                $('.price-' + dataRowNext).before(row);
                ticketSummaryInputField(mainParent, self);
            }
        }else{
            console.log('no next ticket');
            console.log('data row', dataRow);
            let isAddonPriceRow = $('.addon-price-'+dataRow);
            $('.price-' + dataRow).remove();
            if(isAddonPriceRow.length>0){
                isAddonPriceRow.first().before(row);
            }else{
                $(".ticket-summary-table table tbody").append(row);
            }
            ticketSummaryInputField(mainParent, self);
        }

    } else {
        //=== WHEN TICKET TYPE IS NONE
        $('.price-' + dataRow).remove();
        $('.ticket-summary-input-fields .summary-row-'+ dataRow).remove();


        /**
        if ($('.price-' + dataRow).length > 0) {
            $('.price-' + dataRow).hide();
            $('.price-' + dataRow).find('.amount').html(price);
            // $('.price-' + dataRow).find('.tr-ticket-text .row-text').html(ticketText);
            // $('.price-' + dataRow).find('.tr-ticket-text .row-quantity').html(ticketDataGroup);
            // $('.price-' + dataRow).find('.amount').html(price);

            // $('.price-' + dataRow).next().remove();
            // $(".ticket-summary-table table tbody").append(row);
            // $('.price-' + dataRow).next().remove();
            $('.ticket-summary-input-fields .summary-row-'+ dataRow).remove();

        } else {
            $(".ticket-summary-table table tbody").append(row);
            ticketSummaryInputField(mainParent, self);
        }**/
    }

    ticketSummaryRowNumber(mainParent, self);
    calculateTotal();
}

//=== CALCULATING TICKET SUMMARY TABLE
function calculateTotal() {
    let totalPrice = 0,
        sidebarPriceRow = $('.sidebar-block .price-row'),
        sidebarTicketPriceRow = $('.sidebar-block .ticket-price-row'),
        ticketCount = sidebarTicketPriceRow.length;

    sidebarPriceRow.each(function (i, obj) {
        totalPrice = totalPrice + parseInt($(obj).find('.amount').text());
    });

    $('.ticket-summary-table .total-price .amount').html(totalPrice);

    $('.billing-information-wrapper .price-note .ticket-count').html(ticketCount);
    $('.billing-information-wrapper .price-note .total-price').html(totalPrice);
    console.log('total price: ' + totalPrice);
    //changed by Emdad
    //Update total price hidden field
    $('#total-price').val(totalPrice);
}

//=== GENERATING INPUT FIELD FOR TICKET SUMMARY
function ticketSummaryInputField(mainParent, self){
    let ticketText = mainParent.find('.ticket-type-js').children('option:selected').attr('data-text'),
        ticketKey = mainParent.find('.ticket-type-js').val(),
        ticketDataGroup = mainParent.find('.ticket-type-js').children('option:selected').attr('data-group'),
        ticketPersonQuantity = mainParent.find('.ticket-type-js').children('option:selected').attr('data-group'),
        isAddOnTicket = self.closest('.addon-ticket-holder').length,
        ticketDescription = mainParent.find('.ticket-type-js').children('option:selected').attr('data-description'),
        price = mainParent.find('.ticket-type-js option:selected').attr('data-unitprice'),
        dataRow = mainParent.attr('data-row'),
        currentQuantity = parseInt($('.ticket-summary-input-fields .summary-row-'+dataRow).find('.ticket-receipt-ticket-quantity').val()),
        divClass = "summary-row-"+dataRow;

    price = parseInt($('.ticket-summary-table .price-'+dataRow).find('.amount').text());

    if(isAddOnTicket>0){
        ticketText = self.closest('.addon-ticket-holder').find('.addon-ticket-input').data('text');
        ticketKey = self.closest('.addon-ticket-holder').find('.addon-ticket-input').val();
        ticketDataGroup = self.val();
        ticketPersonQuantity = self.val();
        price = self.data('price');
        divClass = "summary-row-csrl-"+dataRow;
        price = parseInt($('.ticket-summary-table .addon-price-'+dataRow).find('.amount').text());
    }else{
        if(ticketDataGroup>1){
            ticketDataGroup = parseInt($('.ticket-summary-table .price-'+dataRow).find('.row-quantity').text());
        }else if(ticketDataGroup == "couple"){
            ticketDataGroup = 1;
            ticketPersonQuantity = 2;
        }else{
            ticketDataGroup = 1;
            ticketPersonQuantity = 1;
        }
    }

    if(self.hasClass('btn-add-group-js')){
        ticketPersonQuantity = currentQuantity + 1;
    }

    if(self.hasClass('person-close')){
        ticketPersonQuantity = currentQuantity - 1;
    }


    let clonedInputFieldHidden = $('.hidden-field-receipt-html-wrapper .hidden-input-field').clone();
    clonedInputFieldHidden.addClass(divClass);
    clonedInputFieldHidden.find('.ticket-receipt-category-name').val(ticketText);
    clonedInputFieldHidden.find('.ticket-receipt-category-key').val(ticketKey);
    clonedInputFieldHidden.find('.ticket-receipt-category-quantity').val(ticketDataGroup);
    clonedInputFieldHidden.find('.ticket-receipt-ticket-quantity').val(ticketPersonQuantity);
    clonedInputFieldHidden.find('.ticket-receipt-category-price').val(price);

    if(isAddOnTicket>0){
        $('.ticket-summary-input-fields .summary-row-csrl-'+ dataRow).remove();
        $('.ticket-summary-input-fields').append(clonedInputFieldHidden);
    }else{
        $('.ticket-summary-input-fields .summary-row-' + dataRow).remove();
        $('.ticket-summary-input-fields').append(clonedInputFieldHidden);
    }
}

//=== GIVING ROW NUMBER TO THE TICKET SUMMARY TABLE
function ticketSummaryRowNumber(){
    $('.ticket-summary-table tbody tr').each(function(i, element){
        $(element).find('.row-number').text((i+1)+".");
    });
}

//=== UPDATE TICKET PRICE AFTER ADD ANOTHER PERSON ACTION
function updateTotalOnAddPerson(dataRow, unitPrice, functionality){
    let currentAmount = parseInt($('.ticket-summary-table .price-'+dataRow).find('.amount').text());
    let totalPrice = currentAmount;
    if(functionality == "add"){
        totalPrice = totalPrice + parseInt(unitPrice);
    }else{
        totalPrice = totalPrice - parseInt(unitPrice);
    }

    $('.ticket-summary-table .price-'+dataRow).find('.amount').html(totalPrice);

    calculateTotal();

}

function deleteRow(dataRow) {
    let mainParent = $(".form-body").find("[data-row='" + dataRow + "']");
    pageLoader.addClass('active');
    //changed by Emdad
    updateTicketQuantity(dataRow);
    setTimeout(function () {
        mainParent.remove();
        $('.ticket-summary-table .price-' + dataRow).remove();
        $('.ticket-summary-table .price-badge-' + dataRow).remove();
        $('.ticket-summary-input-fields .summary-row-'+ dataRow).remove();
        $('.ticket-summary-input-fields .summary-row-csrl-'+ dataRow).remove();
        ticketSummaryRowNumber();
        calculateTotal();

        $('.form-row-ticket-individual').each(function (i, element) {
            $(element).find('.ticket-row').html(i + 1);
        });
        if ($('.form-row-ticket-individual').length==1) {
            $('.form-body .form-row-ticket-individual:first').addClass('first-row');
        }
        $('.form-row.form-row-ticket-individual').last().removeClass('edited');
        $('.form-row.form-row-ticket-individual').last().addClass('active');

        pageLoader.removeClass('active');
    }, 600)
}

//=== RADIO FIELD ID GENERATOR FUNCTION
function radioFieldNameAndId(clonedFields, addontext, dataRow){
    let attrName = "grouped-gender-"+addontext+dataRow,
        genderMaleId = "grouped-gender-male-"+addontext+dataRow,
        genderFemaleId = "grouped-gender-female-"+addontext+dataRow;
    clonedFields.attr('data-contact',1);

    clonedFields.find('.form-control').val('');
    // clonedFields.find('.checkbox-holder input').prop('checked', false);
    // clonedFields.find('.checkbox-holder input').attr('name',attrName);
    // clonedFields.find('.checkbox-holder.radio-male input').attr('id',genderMaleId);
    // clonedFields.find('.checkbox-holder.radio-male label').attr('for',genderMaleId);

    clonedFields.find('.checkbox-holder.radio-female input').attr('id',genderFemaleId);
    clonedFields.find('.checkbox-holder.radio-female label').attr('for',genderFemaleId);
}

//=== CSRL TICKET SELECT FUNCTIONALITY
$(document).on('change','.csrl-field',function (e) {
    e.preventDefault();
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual'),
        dataRow = mainParent.attr('data-row'),
        totalCsrlTicketPrice = parseInt(self.attr('data-price'))*parseInt(self.val());

    let clonedCsrlSummaryRow = $('.csrl-price-html-wrapper .csrl-price').clone();
    console.log(clonedCsrlSummaryRow);
    clonedCsrlSummaryRow.addClass('csrl-price-'+dataRow);
    clonedCsrlSummaryRow.addClass('addon-price-'+dataRow);
    clonedCsrlSummaryRow.find('.row-quantity').html(self.val());
    clonedCsrlSummaryRow.find('.amount').html(totalCsrlTicketPrice);

    if (parseInt(self.val())!=0) {

        $('.ticket-summary-input-fields .summary-row-csrl-'+ dataRow).remove();
        $('.csrl-price-'+dataRow).remove();
        if($('.ticket-summary-table .price-'+dataRow).length>0){
            console.log('csrl quantity', self.val());
            $('.ticket-summary-table .price-'+dataRow).after(clonedCsrlSummaryRow);
        }else{
            $('.ticket-summary-table tbody').append(clonedCsrlSummaryRow);
        }
        ticketSummaryInputField(mainParent, self);

    } else {
        $('.ticket-summary-input-fields .summary-row-csrl-'+ dataRow).remove();
        $('.csrl-price-'+dataRow).remove();
    }
    ticketSummaryRowNumber();
    calculateTotal();
});


//==== USA STATE FILLER
let countryField = $('.country'),
    stateFieldGroup = $('.state-field-group'),
    statesJson = {
        "Alabama": "Alabama",
        "Alaska": "Alaska",
        "Arizona": "Arizona",
        "Arkansas": "Arkansas",
        "California": "California",
        "Colorado": "Colorado",
        "Connecticut": "Connecticut",
        "Delaware": "Delaware",
        "Florida": "Florida",
        "Georgia": "Georgia",
        "Hawaii": "Hawaii",
        "Idaho": "Idaho",
        "Illinois": "Illinois",
        "Indiana": "Indiana",
        "Iowa": "Iowa",
        "Kansas": "Kansas",
        "Kentucky": "Kentucky",
        "Louisiana": "Louisiana",
        "Maine": "Maine",
        "Maryland": "Maryland",
        "Massachusetts": "Massachusetts",
        "Michigan": "Michigan",
        "Minnesota": "Minnesota",
        "Mississippi": "Mississippi",
        "Missouri": "Missouri",
        "Montana": "Montana",
        "Nebraska": "Nebraska",
        "Nevada": "Nevada",
        "NewHampshire": "NewHampshire",
        "NewJersey": "NewJersey",
        "NewMexico": "NewMexico",
        "NewYork": "NewYork",
        "NorthCarolina": "NorthCarolina",
        "NorthDakota": "NorthDakota",
        "Ohio": "Ohio",
        "Oklahoma": "Oklahoma",
        "Oregon": "Oregon",
        "Pennsylvania": "Pennsylvania",
        "RhodeIsland": "RhodeIsland",
        "SouthCarolina": "SouthCarolina",
        "SouthDakota": "SouthDakota",
        "Tennessee": "Tennessee",
        "Texas": "Texas",
        "Utah": "Utah",
        "Vermont": "Vermont",
        "Virginia": "Virginia",
        "Washington": "Washington",
        "WestVirginia": "WestVirginia",
        "Wisconsin": "Wisconsin",
        "Wyoming": "Wyoming",
        "zUnknown": "zUnknown"
    },
    statesCanadaJson = {
        "Alberta": "Alberta",
        "British Columbia": "British Columbia",
        "Manitoba": "Manitoba",
        "New Brunswick": "New Brunswick",
        "Newfoundland and Labrador": "Newfoundland and Labrador",
        "Northwest Territories": "Northwest Territories",
        "Nova Scotia": "Nova Scotia",
        "Nunavut": "Nunavut",
        "Ontario": "Ontario",
        "Prince Edward Island": "Prince Edward Island",
        "Quebec": "Quebec",
        "Saskatchewan": "Saskatchewan",
        "Yukon":"Yukon"
    };

statesFiller(countryField);

countryField.on('change',function (e) {
    let self = $(this);
    statesFiller(self);
});

function statesFiller(countryFieldSelector){
    if(countryFieldSelector.val()=="USA"){
        countryFieldSelector.closest('.form-row').find('.state-field-group .state-holder').html("<select class='form-control state' name='State'></select>");
        countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='0'>Select a State</option>");
        for (let key in statesJson){
            countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='"+statesJson[key]+"'>"+statesJson[key]+"</option>")
        }
    }else{
        countryFieldSelector.closest('.form-row').find('.state-field-group .state-holder').html("<select class='form-control state' name='State'></select>");
        countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='0'>Select a State</option>");
        for (let key in statesCanadaJson){
            countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='"+statesCanadaJson[key]+"'>"+statesCanadaJson[key]+"</option>")
        }
    }
}

//==== RADIO BOX CHANGE
// $('.radiobox.required-group input').on('change',function (e) {
$(document).on('change','.radiobox.required-group input',function (e) {
    let self = $(this);
    self.closest('.form-group.radiobox').addClass('field-validated');
    self.closest('.form-group.radiobox').removeClass('focused');
});

//==== ADDING ANOTHER GROUP OF TICKETS
$(document).on('click','.btn-add-group-js',function (e) {
    e.preventDefault();

    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual'),
        parent = self.closest('.contact-information-inner'),
        dataRow = self.closest('.form-row').attr('data-row'),
        unitPrice = self.closest('.form-row').find('.ticket-type-js option:selected').attr('data-unitPrice'),
        uniqueKeys = self.closest('.form-row').find('.ticket-type-js').val(),
        invalidField = parent.find('.form-group.required-group'),
        validField = parent.find('.form-group.required-group.field-validated'),
        notValidatedField = parent.find('.contact-information-grouped-single').find('.required-group:not(.field-validated)');

    if(notValidatedField.length>0){
        notValidatedField.first().find('input').focus();
        if(notValidatedField.hasClass('radiobox')){
            notValidatedField.first().find('input').focus();
            notValidatedField.first().addClass('focused');
        }

    }else{
        let dataContactNumber = parseInt(parent.find('.contact-information-grouped-single').length)+1,
            clonedFields = parent.find('.contact-information-grouped-single').first().clone();


        clonedFields.find('.section-title p').html('#'+dataContactNumber);
        clonedFields.attr('data-contact',dataContactNumber);
        let attrName = "grouped-gender-"+dataContactNumber+"-"+dataRow;
        clonedFields.find('.required-group').removeClass('field-validated');
        clonedFields.find('.required-group.radiobox').addClass('field-validated');
        clonedFields.find('.form-control').val('');
        clonedFields.find('.checkbox-holder input').attr('name',attrName);
        clonedFields.append("<input type='hidden' value='"+uniqueKeys+"' class='ticket-category-keys' name='TicketCategoryKeys[]'>");
        updateTotalOnAddPerson(dataRow, unitPrice, "add");
        clonedFields.find('.checkbox-holder').first().find('input').prop('checked', true);
        // radioFieldNameAndId(clonedFields, dataContactNumber, "dataRow");
        clonedFields.prepend("<span class='person-close'>Delete</span>");
        self.closest('.contact-information-inner').find('.contact-information-grouped-wrapper').append(clonedFields);
        ticketQuantityUpdate(dataRow, "add");
        ticketSummaryInputField(mainParent, self);
        let contactNumber = self.closest('.contact-information-inner').find('.contact-information-grouped-wrapper .contact-information-grouped-single').last().attr('data-contact');
        self.closest('.contact-information-inner').find('.contact-information-grouped-wrapper .contact-information-grouped-single').last().find('.section-title').html("<span>Registrant <p style='display:inline-block;margin:0; padding-left:10px;' class='contact-number'># "+contactNumber+"</p>");
        self.closest('.contact-information-inner').find('.contact-information-grouped-wrapper .contact-information-grouped-single').last().find('.gender-selector').val('male');
        self.closest('.contact-information-inner').find('.contact-information-grouped-wrapper .contact-information-grouped-single').last().find('.gender-selector').closest('.form-group.required-group').addClass('field-validated');
    }

});

//=== TICKET QUANTITY UPDATE ON TICKET SUMMARY TABLE
function ticketQuantityUpdate(dataRow, calculationMethod){
    let ticketQuantity = parseInt($('.ticket-summary-table .price-'+dataRow).find('.row-quantity').text());

    if(calculationMethod=="add"){
        ticketQuantity = ticketQuantity + 1;
    }else{
        ticketQuantity = ticketQuantity - 1;
    }
    // $('.ticket-summary-table .price-'+dataRow).find('.row-quantity').html(ticketQuantity);
}

function ticketGroupManipulation(ticketDataGroup, ticketDataGroup2, typeSelector){
    let clonedFields = $('.contact-information-html .contact-information-grouped-single-copy');
    let mainParent = typeSelector.closest('.form-row-ticket-individual');
    let dataRow = typeSelector.closest('.form-row-ticket-individual').data('row');
    let unitPrice = typeSelector.closest('.form-row').find('.ticket-type-js option:selected').attr('data-unitPrice');
    let uniqueKeys = typeSelector.closest('.form-row').find('.ticket-type-js').val();
    let ticketDataAddon = typeSelector.children(':selected').attr('data-addon');
    // clonedFields.removeClass('contact-information-inner contact-information-single');
    // clonedFields.addClass('contact-information-grouped-single');
    // clonedFields.find('.form-control.first-name').attr('name','grouped-first-name[]');
    // clonedFields.find('.form-control.last-name').attr('name','grouped-last-name[]');
    // clonedFields.find('.form-control.email').attr('name','grouped-email[]');
    // clonedFields.find('.form-control.phone-number-mask').attr('name','grouped-phone[]');
    clonedFields.find('.form-group').removeClass('field-validated');
    clonedFields.find('.form-group.radiobox.required-group').addClass('field-validated');
    clonedFields.find('.form-group').removeClass('focused');
    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-single').hide();
    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-single').remove();
    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped').show();


    if(ticketDataGroup=="couple"){
        ticketDataGroup = 2;
    }
    console.log('couple: '+ticketDataGroup2);
    for(let i=1; i<=parseInt(ticketDataGroup); i++){
        let attrName = "grouped-gender-"+i+dataRow,
            genderMaleId = "grouped-gender-male-"+i+dataRow,
            genderFemaleId = "grouped-gender-female-"+i+dataRow;
        clonedFields.attr('data-contact',i);

        clonedFields.find('.form-control').val('');
        // clonedFields.find('.checkbox-holder input').prop('checked', false);
        clonedFields.find('.checkbox-holder input').attr('name',attrName);
        // clonedFields.find('.checkbox-holder.radio-male input').attr('id',genderMaleId);
        // clonedFields.find('.checkbox-holder.radio-male label').attr('for',genderMaleId);

        // clonedFields.find('.checkbox-holder.radio-female input').attr('id',genderFemaleId);
        // clonedFields.find('.checkbox-holder.radio-female label').attr('for',genderFemaleId);
        //=== RADIOID GENERATION
        let radioHolder = clonedFields.find('.checkbox-holder');
        radioBoxIdGenerating(radioHolder);

        if(clonedFields.find('.contact-number').length>0){
            clonedFields.find('.section-title').html("<span>Registrant <p style='display:inline-block;margin:0; padding-left:10px;' class='contact-number'># "+i+"</p></span>");
        }
        // typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-single-copy.contact-information-grouped-single').first().find('.section-title').html("<span>Primary Registrant</span>");

        typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped .contact-information-grouped-wrapper').append(clonedFields.clone());
        $('.form-row .contact-information-grouped-single-copy').addClass('contact-information-grouped-single');

        if(ticketDataGroup2=="couple"){
            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').find('.section-title span').html('Contact Information');
            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').last().find('.section-title span').html('Spouse Information');
            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-inner .btn-holder').hide();
            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').first().find('.checkbox-holder').first().find('input').prop('checked', true);
            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').last().find('.checkbox-holder').last().find('input').prop('checked', true);

            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').last().find('.gender-selector').val('female');
            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').first().find('.gender-selector').val('male');

        }else{
            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-inner .btn-holder').show();
        }

    }
    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-single-copy.contact-information-grouped-single').first().find('.section-title').html("<span>Primary Registrant</span>");
    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped .contact-information-grouped-wrapper .contact-information-grouped-single').append("<input type='hidden' value='"+uniqueKeys+"' class='ticket-category-keys' name='TicketCategoryKeys[]'>");
    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped .contact-information-grouped-wrapper .contact-information-grouped-single').first().find('.ticket-category-keys').remove();
    registrantTextChanging(mainParent);
    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').find('.gender-selector').closest('.form-group.required-group').addClass('field-validated');

    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped .contact-information-grouped-single').show();

}

$(document).on('click','.person-close',function (e) {
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual'),
        dataRow = self.closest('.form-row').attr('data-row'),
        unitPrice = self.closest('.form-row').find('.ticket-type-js option:selected').attr('data-unitPrice');
    updateTotalOnAddPerson(dataRow, unitPrice, "remove");

    self.parent().remove();
    ticketQuantityUpdate(dataRow, "subtract");
    ticketSummaryInputField(mainParent, self)

});

//=== RADIOBOX ID GENERATING
function radioBoxIdGenerating(radioHolder) {
    let randomUniqueIdMale = (Math.random() + 1).toString(36).substring(4,7);
    radioHolder.first().find('input').attr('id',randomUniqueIdMale);
    radioHolder.first().find('label').attr('for',randomUniqueIdMale);

    radioHolder.first().find('input').prop('checked', true);

    let randomUniqueIdFemale = (Math.random() + 1).toString(36).substring(4,7);
    radioHolder.last().find('input').attr('id',randomUniqueIdFemale);
    radioHolder.last().find('label').attr('for',randomUniqueIdFemale);
}
let radioHolder = $('.contact-information-inner.contact-information-single .contact-information-grouped-wrapper .checkbox-holder');
radioBoxIdGenerating(radioHolder);

//==== GIVING FOCUS TO THE INVALID FIELDS
function focusToNotValidFields(notValidatedFields){
    notValidatedFields.first().find('input').focus();
    if(notValidatedFields.find('select')){
        notValidatedFields.first().find('select').focus();
    }

    if(notValidatedFields.hasClass('radiobox')){
        notValidatedFields.first().addClass('focused');
    }
}

if ($('.ticket-summary-table').length > 0) {
    $('.ticket-summary-table').closest('.sidebar-block').addClass('sidebar-block-ticket-summary');
}

// created by Emdad
//DataRow added as ticket quantity on #ticket-quantity field
function updateTicketQuantity(dataRow) {
    $('#ticket-quantity').val(dataRow);
}

