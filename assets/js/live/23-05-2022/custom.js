/**
 * Created by Rashu on 07-03-22.
 */

console.log('way to go!');
let totalPrice = 0,
    totalTicketCount = 0;
$('.quantity-increase').on('click', function () {
    let self = $(this),
        quantitySelector = self.closest('.quantity-wrap').find('.form-control'),
        quantityValue = quantitySelector.val();

    if (quantityValue < 10) {
        quantitySelector.val(parseInt(quantityValue) + 1);
    }
    chooseTicketWarning(quantitySelector);
    collectData(self);
});

$('.quantity-decrease').on('click', function () {
    let self = $(this),
        quantitySelector = self.closest('.quantity-wrap').find('.form-control'),
        quantityValue = quantitySelector.val();

    if (quantityValue > 0) {
        quantitySelector.val(parseInt(quantityValue) - 1);
    }
    chooseTicketWarning(quantitySelector);
    collectData(self);
});

$('.quantity-wrap .form-control').on('keyup', function () {
    let self = $(this),
        quantitySelector = self.closest('.quantity-wrap').find('.form-control'),
        quantityValue = quantitySelector.val();

    if (quantityValue > 10) {
        quantitySelector.val(0);
    }

    chooseTicketWarning(quantitySelector);
    collectData(self);
});


$(document).on('click', '.btn-reg-js', function (e) {
    e.preventDefault();
    let self = $(this),
        formSelector = self.closest('#event-reg-form'),
        formGroupRequiredSelector = formSelector.find('.form-row .form-group.required-group'),
        formGroupValidatedSelector = formSelector.find('.form-row .form-group.field-validated'),
        notValidatedField = formSelector.find('.form-row .required-group:not(.field-validated)'),

        paymentFormGroupRequiredSelector = formSelector.find('.payment-information-div .form-group.required-group'),
        paymentFormGroupValidatedSelector = formSelector.find('.payment-information-div .form-group.field-validated'),
        paymentFormGroupNotValidatedSelector = formSelector.find('.payment-information-div .required-group:not(.field-validated)'),
        ticketFieldSelector = $('.ticket-field'),
        ticketFieldValidated = false;

    console.log('not validated form field',notValidatedField.length);
    console.log('not validated payment fields',paymentFormGroupNotValidatedSelector.length);

    ticketFieldSelector.each(function (i, object) {
        if($(object).val()>0){
            ticketFieldValidated = true;
        }
    });

    if(!ticketFieldValidated){
        ticketFieldSelector.first().focus();
        if(ticketFieldSelector.closest('.cart-table').find('.error-message')){
            ticketFieldSelector.closest('.cart-table').find('.error-message').remove();
            setTimeout(function (e) {
                ticketFieldSelector.first().closest('tr').after("<p class='error-message text-danger'>Please select a ticket</p>");
            },300);
        }else{
            ticketFieldSelector.first().closest('tr').after("<p class='error-message text-danger'>Please select a ticket</p>");
        }

        return;
    }

    if(notValidatedField.length>0){
        notValidatedField.first().find('.form-control').focus();
        return;
    }

    if($('.payment-information-div').css('display')==="block"){
        if(paymentFormGroupNotValidatedSelector.length>0){
            paymentFormGroupNotValidatedSelector.first().find('.form-control').focus();
            return;
        }
    }
    console.log('all fields validated!');
    allFieldsValidated(true);
});

let creditCardField = $('.cc-number');
if (creditCardField.length > 0) {
    card_validation()
}

creditCardField.on('keyup', function (e) {
    card_validation();
});

$(document).on('keyup blur change', '.form-group.required-group .form-control', function (e) {
    let self = $(this);
    singleValidation(self, self.parent());
});

//===== INPUT MASKING
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

$('#card-info-area .mask-zipcode').inputmask({
    "mask": "99999"
});

$('.mask-cvv').inputmask({
    "mask": "9999"
});

$('.mask-cvv').on('keyup', function () {
    let self = $(this),
        formGroup = self.closest('.form-group');
    cvvValidate(self, formGroup)
});


$('#card-info-area .mask-zipcode').on('keyup',function (e) {
    let self = $(this);
    if ($('#card-info-area .mask-zipcode').inputmask("isComplete")) {
        self.removeClass('invalid');
        self.addClass('valid');
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


//==== FUNCTIONS DEFINITION

function chooseTicketWarning(quantitySelector){
    let ticketFieldSelector = $('.ticket-field'),
        ticketFieldValidated = false;
    ticketFieldSelector.each(function (i, object) {
        if($(object).val()>0){
            ticketFieldValidated = true;
        }
    });

    if(ticketFieldValidated){
        $('.cart-table').find('.error-message').remove();
    }else{
        $('.cart-table tbody tr').first().after("<p class='error-message text-danger'>Please select a ticket</p>");
    }
}

//======= EMAIL VALIDATION
function validateMail(formGroup) {
    let pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
        email = formGroup.find('.form-control').val();
    if(!pattern.test(email)) {
        return true;
    } else {
        return false;
    }
}

//======= PHONE NUMBER VALIDATION
function validatePhoneNumber(formGroup) {
    let pattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/i,
        phoneNumber = formGroup.find('.form-control').val();
    // if(!pattern.test(phoneNumber)) {
    //     return true;
    // } else {
    //     return false;
    // }
    return pattern.test(phoneNumber);
}

//======= CVV VALIDATION
function cvvValidate(self, formGroup) {
    if (self.val().length > 2) {
        self.removeClass('invalid');
        self.addClass('valid');
        return true;
    } else {
        console.log('not completed!');
        self.removeClass('valid');
        self.addClass('invalid');
        return false;
    }
}

//======= ZIP CODE VALIDATION
function zipCodeValidation(code) {
    let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(code);
    return isValidZip;
}

let errorMessage = "The field is required";
function notifyError(formControl, errorMessage) {
    let formGroup = formControl.closest('.form-group');
    formGroup.removeClass('field-validated');
    formGroup.addClass('field-invalid');
    if (formGroup.find('.error-message')) {
        formGroup.find('.error-message').remove();
        setTimeout(function () {
            formGroup.append('<p class="error-message text-danger m-0">' + errorMessage + '</p>');
        }, 200);
    } else {
        formGroup.append('<p class="error-message text-danger m-0">' + errorMessage + '</p>');
    }
}

//==== VALIDATION FOR REQUIRED FIELDS
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

        //phone number validation
        if (formControl.data('validation') === "phone-number") {
            if (formControl.val() != '') {
                errorMessage = "Invalid phone number!"
            }
            if (!validatePhoneNumber(formControl.parent())) {
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

        //credit card number validation
        if (formControl.data('validation') === "credit-card") {
            if (formControl.val() != '') {
                errorMessage = "Invalid card number!"
            }
            if(!card_validation()){
                formControl.closest('.form-group.required-group').removeClass('field-validated');
                notifyError(formControl, errorMessage);
            }
        }

        //credit card number validation
        if (formControl.data('validation') === "cvv") {
            if (formControl.val() != '') {
                errorMessage = "Invalid CVV"
            }
            if(!cvvValidate(formControl)){
                formControl.closest('.form-group.required-group').removeClass('field-validated');
                notifyError(formControl, errorMessage);
            }
        }

        //SELECT FIELD VALIDATION
        if (formControl.val() == 0) {
            formControl.closest('.form-group.required-group').removeClass('field-validated');
            notifyError(formControl, errorMessage);
        }

    } else {
        notifyError(formControl, errorMessage);
    }
}

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

function collectData(self) {

    if (parseInt(self.closest('.quantity-wrap').find('.form-control').val()) < 0) {
        self.closest('.quantity-wrap').find('.form-control').val(0);
    }

    let ticketNumber = parseInt(self.closest('.quantity-wrap').find('.form-control').val()) ? parseInt(self.closest('.quantity-wrap').find('.form-control').val()) : 0,
        ticketPrice = parseInt(self.closest('tr').find('.per-price .amount').text()),
        ticketType = self.closest('.quantity-wrap').attr('ticket-type'),
        ticketTypeKey = self.closest('.quantity-wrap').attr('ticket-type-key');

    var ticketCount = ticketNumber;

    if (ticketType == 'kids-11-to-20') {
        console.log(self.closest('tr').next().find('.form-control').val());
        ticketCount += parseInt(self.closest('tr').next().find('.form-control').val() ? parseInt(self.closest('tr').next().find('.form-control').val()) : 0);
        console.log(ticketCount);
    }

    if (ticketType == 'kids-under-11') {
        console.log(self.closest('tr').prev().find('.form-control').val());

        ticketCount += parseInt(self.closest('tr').prev().find('.form-control').val() ? parseInt(self.closest('tr').prev().find('.form-control').val()) : 0);
        console.log(ticketCount);
    }

    //console.log('ticket number: '+ticketNumber);
    //console.log('ticket price: '+ticketPrice);
    //console.log('ticket type: '+ticketType);
    //console.log('ticket type key: ' + ticketTypeKey);

    // checkTicketLimit(ticketTypeKey, ticketCount, self);
    updateTicketData(ticketNumber, ticketPrice, ticketType);
}

function updateTicketData(ticketNumber, ticketPrice, ticketType) {
    $('.' + ticketType + '-quantity').text(ticketNumber);
    $('.' + ticketType + '-price .amount').text(ticketNumber * ticketPrice);

    let belowPrice = $('.ticket-summary-table .' + ticketType + '-price .amount').text() ? parseInt($('.ticket-summary-table .' + ticketType + '-price .amount').text()) : 0;
    //abovePrice = $('.ticket-summary-table .above-10-price .amount').text() ? parseInt($('.ticket-summary-table .above-10-price .amount').text()) : 0,
    //adultPrice = $('.ticket-summary-table .adult-price .amount').text() ? parseInt($('.ticket-summary-table .adult-price .amount').text()) : 0;
    var amount = 0;
    $('.ticket-summary-table tbody tr').each(function (index, value) {
        amount += parseInt($(this).find('.amount').text());
    });

    totalPrice = amount;
    $('.total-price .amount').text(totalPrice);
    $('#total-price').val(totalPrice);

    showPaymentForm(totalPrice);
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

fixHeight();

function card_validation() {
    let J = Payment.J,
        creditCardHolder = $('.cc-number-holder'),
        creditCardImageHolder = $('.cc-card-identity');
    let number = document.querySelector('.cc-number');
    Payment.formatCardNumber(number);
    J.toggleClass(document.querySelectorAll('input'), 'invalid');
    let cardType = Payment.fns.cardType(J.val(number));
    // J.toggleClass(number, 'invalid', !Payment.fns.validateCardNumber(J.val(number)));
    if (cardType) {
        creditCardField.addClass(cardType);
        creditCardImageHolder.html("<img src='/Content/event-management-assets/individual-multiple-assets/images/" + cardType + ".png'>");
    } else {
        console.log('no card selected');
        creditCardImageHolder.html("<img src='/Content/event-management-assets/individual-multiple-assets/images/unknown.png'>");
    }
    if (Payment.fns.validateCardNumber(J.val(number))) {
        creditCardField.removeClass('invalid');
        creditCardField.addClass('valid');
        // creditCardField.closest('.input-wrap').find('.warning-message').hide();
        return true;
    } else {
        creditCardField.removeClass('valid');
        creditCardField.addClass('invalid');
        // creditCardField.closest('.input-wrap').find('.warning-message').show();
        return false;
    }
}

function showPaymentForm(totalAmount) {
    if (totalAmount > 0) {
        $('#card-info-area').show();
        $('.btn-reg').text('Payment');
        $('.btn-reg').addClass('btn-payment');
    } else {
        $('#card-info-area').attr('style','display:none;');
        $('.btn-reg').text('Register');
        $('.btn-reg').removeClass('btn-payment');
    }
}