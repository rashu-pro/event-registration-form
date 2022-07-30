/**
 * Created by Rashu on 07-03-22.
 * -------------------------------------
 * 1. VARIABLES
 * 2. FUNCTION CALL ON DOCUMENT READY
 * 3. ACTIONS ON DOCUMENT READY
 * 4. CLICK ACTIONS
 * 5. KEYUP, BLUR, FOCUS etc. ACTIONS
 * 6. CHANGE ACTIONS
 * 7. INPUT MASKING
 * 8. FUNCTIONS DEFINITION
 */


/**
 ===============================
 1. VARIABLES
 ===============================
 */
let totalPrice = 0,
    datePicker = $('.date-picker-js'),
    creditCardField = $('.cc-number'),
    countryField = $('.country'),
    stateFieldGroup = $('.state-field-group'),
    statesJson = {
        "USA":{
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
        "Canada":{
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
            "Yukon": "Yukon"
        },
        "Other":{

        }

    },
    errorMessage = "The field is required";

const screenWidth = screen.width,
    currentYear = new Date().getFullYear();


/**
 *
 ==================================
 2. FUNCTION CALL ON DOCUMENT READY
 ==================================
 */
fixHeight();
calculateTotal();
selectWithOtherOption($('.select-with-other-js'));
//===== STATES FILLER ON COUNTRY SELECTION
if(countryField.val()!=0 || countryField.val()!==''){
    statesFiller(countryField);
}

/**
 ===============================
 3. ACTIONS ON DOCUMENT READY
 ===============================
 */
//====== ADDING A CLASS TO TICKET SUMMARY TABLE
if ($('.ticket-summary-table').length > 0) {
    $('.ticket-summary-table').closest('.sidebar-block').addClass('sidebar-block-ticket-summary');
}

//======== DATE OF BIRTH PICKER
if(screenWidth<1200){
    if(datePicker.length>0){
        datePicker.prop('readonly','true');
    }
}

//====== CREDIT CARD VALIDATION
if (creditCardField.length > 0) {
    card_validation()
}

//===== COUNTRY OPTION INSERTION
for(let key of Object.keys(statesJson)){
    countryField.append(`<option value="${key}">${key}</option>`);
}

/**
 ===============================
 4. CLICK ACTIONS
 ===============================
 */
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

$(document).on('click', '.dob-addon', function (e) {
    let self = $(this);
    self.closest('.form-group').find('.form-control').trigger('focus');
});

$(document).on('click', '.btn-reg-js', function (e) {
    e.preventDefault();
    let self = $(this),
        formSelector = self.closest('#event-reg-form'),
        notValidatedField = formSelector.find('.form-row .required-group:not(.field-validated)'),
        paymentFormGroupNotValidatedSelector = formSelector.find('.payment-information-div .required-group:not(.field-validated)'),
        ticketFieldSelector = $('.ticket-field'),
        ticketFieldValidated = false;

    console.log('not validated form field', notValidatedField.length);
    console.log('not validated payment fields', paymentFormGroupNotValidatedSelector.length);

    if (ticketFieldSelector.length > 0) {
        ticketFieldSelector.each(function (i, object) {
            if ($(object).val() > 0) {
                ticketFieldValidated = true;
            }
        });

        if (!ticketFieldValidated) {
            ticketFieldSelector.first().focus();
            if (ticketFieldSelector.closest('.cart-table').find('.error-message')) {
                ticketFieldSelector.closest('.cart-table').find('.error-message').remove();
                setTimeout(function (e) {
                    ticketFieldSelector.first().closest('tr').after("<p class='error-message text-danger'>Please select a ticket</p>");
                }, 300);
            } else {
                ticketFieldSelector.first().closest('tr').after("<p class='error-message text-danger'>Please select a ticket</p>");
            }

            return;
        }
    }

    if (notValidatedField.length > 0) {
        notValidatedField.first().find('.form-control').focus();
        if (notValidatedField.first().find('input[type=checkbox]')) {
            notValidatedField.first().find('input[type=checkbox]').focus();
            notifyError(notValidatedField.first().find('input[type=checkbox]'), errorMessage);
        }
        return;
    }

    if ($('.payment-information-div').css('display') === "block") {
        if (paymentFormGroupNotValidatedSelector.length > 0) {
            paymentFormGroupNotValidatedSelector.first().find('.form-control').focus();
            return;
        } else {
            let isChecked = $('#tc-2').prop('checked');
            if (!isChecked) {
                $('#tc-2').closest('.tc-wrapper').find('.alert').css('border', '2px solid #dc3545');
                setTimeout(function () {
                    $('#tc-2').closest('.tc-wrapper').find('.alert').css('border', '1px solid #084298');
                }, 300);
                return;
            }

            registrationConfirmation();

        }
    }
    console.log('all fields validated!');
    allFieldsValidated(true);
});

/**
 ===============================
 5. KEYUP, BLUR, FOCUS etc. ACTIONS
 ===============================
 */
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

//======== FORM FIELDS VALIDATION
$(document).on('keypress blur change', '.form-group.required-group .form-control', function (e) {
    let self = $(this);
    singleValidation(self, self.parent());
});

//======== FORM FIELDS VALIDATION FOR CHECKBOXES
$(document).on('change', 'input[type=checkbox]', function (e) {
    let self = $(this);
    if (self.prop('checked') === true) {
        self.closest('.form-group.required-group').removeClass('field-invalid');
        self.closest('.form-group.required-group').find('.error-message').remove();
        self.closest('.form-group.required-group').addClass('field-validated');
    } else {
        notifyError(self, errorMessage);
    }
});

$(document).on('change', '.checkbox-group input[type=checkbox]', function (e) {
    let self = $(this),
        totalChecked = 0;
    self.closest('.checkbox-group').find('input[type=checkbox]').each(function (i, obj) {
        let localtotalChecked = 0;
        if ($(obj).prop('checked') === true) {
            localtotalChecked = 1;
        }
        totalChecked = totalChecked + localtotalChecked;
    });

    if (totalChecked > 0) {
        self.closest('.form-group.required-group').removeClass('field-invalid');
        self.closest('.form-group.required-group').find('.error-message').remove();
        self.closest('.form-group.required-group').addClass('field-validated');
    } else {
        notifyError(self, errorMessage);
    }
});

$(document).on('blur keyup', '.addon-ticket-category-js', function (e) {
    let self = $(this),
        addonType = self.data('addon-type'),
        addonPrice = self.val();

    if (parseInt(addonPrice) > 0) {
        $('.ticket-summary-table tbody .addon-price').remove();
        $('.ticket-summary-table tbody').append('<tr class="addon-price">' +
            '<td><span class="row-counter">2.</span>&nbsp;<span class="text-capitalize">' + addonType + '</span></td>' +
            '<th><span class="currency">$&nbsp;</span><span class="amount">' + addonPrice + '</span></th></tr>');
    } else {
        $('.ticket-summary-table tbody .addon-price').remove();
    }
    ticket_row_number();
    calculateTotal();
});

$(document).on('focus', '.date-picker-js', function (e) {
    let self = $(this);
    $(this).datepicker({
        dateFormat: "mm/dd/yy",
        changeMonth: true,
        changeYear: true,
        yearRange: "1950:" + currentYear,
    });
});

//======== CREDIT CARD VALIDATION ON KEYUP
creditCardField.on('keyup', function (e) {
    card_validation();
});

$('.mask-cvv').on('keyup', function () {
    let self = $(this),
        formGroup = self.closest('.form-group');
    cvvValidate(self, formGroup)
});

$('#card-info-area .mask-zipcode').on('keyup', function (e) {
    let self = $(this);
    if ($('#card-info-area .mask-zipcode').inputmask("isComplete")) {
        self.removeClass('invalid');
        self.addClass('valid');
    } else {
        self.removeClass('valid');
        self.addClass('invalid');
    }
});

/**
 ===============================
 6. CHANGE ACTIONS
 ===============================
 */
$(document).on('change', '.ticket-category-js', function (e) {
    let self = $(this),
        ticketType = self.find('option:selected').data('text'),
        ticketPrice = self.find('option:selected').data('price');

    if (parseInt(ticketType) !== 0) {
        $('.ticket-summary-table tbody .ticket-price').remove();
        $('.ticket-summary-table tbody').prepend('<tr class="ticket-price">' +
            '<td><span class="row-counter">1.</span>&nbsp;<span class="text-capitalize">' + ticketType + '</span></td>' +
            '<th><span class="currency">$&nbsp;</span><span class="amount">' + ticketPrice + '</span></th></tr>');
    } else {
        $('.ticket-summary-table tbody .ticket-price').remove();
    }
    ticket_row_number();
    calculateTotal();
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

countryField.on('change', function (e) {
    let self = $(this);
    statesFiller(self);
});

$(document).on('change', '.select-with-other-js', function (e) {
    let self = $(this);
    if (self.prop('checked') === true) {
        self.attr('data-value', 'other');
    } else {
        self.attr('data-value', '');
    }
    selectWithOtherOption($(this));
});


/**
 ===============================
 7. INPUT MASKING
 ===============================
 */
$(document).on('focus', '.form-body', function (e) {
    $('.phone-number-mask').inputmask({
        "mask": "(999) 999-9999",
        "onKeyValidation": function (key, result) {
            if (result) {

            }
        }
    });

    $('.mask-zipcode').inputmask({
        "mask": "99999",
        "placeholder": ""
    });
});

$('#card-info-area .mask-zipcode').inputmask({
    "mask": "99999",
    "placeholder": ""
});

$('.mask-cvv').inputmask({
    "mask": "9999",
    "placeholder": ""
});

/**
 ===============================
 8. FUNCTIONS DEFINITION
 ===============================
 */
function chooseTicketWarning(quantitySelector) {
    let ticketFieldValidated = false;
    $('.ticket-field').each(function (i, object) {
        if ($(object).val() > 0) {
            ticketFieldValidated = true;
        }
    });

    if (ticketFieldValidated) {
        $('.cart-table').find('.error-message').remove();
    } else {
        $('.cart-table tbody tr').first().after("<p class='error-message text-danger'>Please select a ticket</p>");
    }
}

//======= EMAIL VALIDATION
function validateMail(formGroup) {
    //==== pattern.test(value)
    return /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i.test(formGroup.find('.form-control').val());
}

//======= PHONE NUMBER VALIDATION
function validatePhoneNumber(formGroup) {
    //===== pattern.test(value)
    return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/i.test(formGroup.find('.form-control').val());
}

//======= CVV VALIDATION
function cvvValidate(self, formGroup) {
    if (self.val().length > 2) {
        self.removeClass('invalid');
        self.addClass('valid');
        return true;
    } else {
        self.removeClass('valid');
        self.addClass('invalid');
        return false;
    }
}

//======= ZIP CODE VALIDATION
function zipCodeValidation(code) {
    //===== pattern.test(value)
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(code);
}

//======= NOTIFY ERROR FOR FORM FIELDS VALIDATION
function notifyError(formControl, errorMessage) {
    let formGroup = formControl.closest('.form-group');
    formGroup.removeClass('field-validated');
    formGroup.addClass('field-invalid');

    formGroup.find('.error-message').remove();
    setTimeout(function () {
        formGroup.append('<p class="error-message text-danger m-0">' + errorMessage + '</p>');
    }, 200);
}

//==== VALIDATION FOR REQUIRED FIELDS
function singleValidation(formControl, formGroup) {
    errorMessage = "The field is required";
    if (formControl.val() !== '') {
        formControl.closest('.form-group.required-group').removeClass('field-invalid').addClass('field-validated');
        formControl.closest('.form-group.required-group').find('.error-message').remove();

        //email validation
        if (formControl.data('validation') === "email") {
            errorMessage = "Invalid Email!";
            if (!validateMail(formControl.parent())) {
                formControl.closest('.form-group.required-group').removeClass('field-validated');
                notifyError(formControl, errorMessage);
            }
        }

        //phone number validation
        if (formControl.data('validation') === "phone-number") {
            errorMessage = "Invalid phone number!";
            if (!validatePhoneNumber(formControl.parent())) {
                formControl.closest('.form-group.required-group').removeClass('field-validated');
                notifyError(formControl, errorMessage);
            }
        }

        //zip code validation
        if (formControl.data('validation') === "zipcode") {
            errorMessage = "Invalid ZIP code!";
            if (!zipCodeValidation(formControl.val())) {
                formControl.closest('.form-group.required-group').removeClass('field-validated');
                notifyError(formControl, errorMessage);
            }
        }

        //credit card number validation
        if (formControl.data('validation') === "credit-card") {
            errorMessage = "Invalid card number!";
            if (!card_validation()) {
                formControl.closest('.form-group.required-group').removeClass('field-validated');
                notifyError(formControl, errorMessage);
            }
        }

        //CVC validation
        if (formControl.data('validation') === "cvv") {
            errorMessage = "Invalid CVV";
            if (!cvvValidate(formControl)) {
                formControl.closest('.form-group.required-group').removeClass('field-validated');
                notifyError(formControl, errorMessage);
            }
        }

        //SELECT FIELD VALIDATION
        if (formControl.val() == 0 || formControl.val()=== '') {
            formControl.closest('.form-group.required-group').removeClass('field-validated');
        }

    } else {
        notifyError(formControl, errorMessage);
    }
}

//==== STATE FILLER (FILLED STATES ON COUNTRY SELECTION
function statesFiller(countryFieldSelector) {
    countryFieldSelector.closest('.form-row').find('.state-field-group .state-holder').html("<select class='form-control state' name='State'></select>");
    countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='0'>Select a State</option>");
    let country = countryFieldSelector.val();
    if(parseInt(Object.keys(statesJson[country]).length)>0){
        for(let value in statesJson[country]){
            countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='"+statesJson[country][value]+"'>"+statesJson[country][value]+"</option>")
        }
    }else{
        countryFieldSelector.closest('.form-row').find('.state-field-group .state-holder').html("<input type='text' class='form-control state' name='State'>");
    }
    countryFieldSelector.closest('.form-row').find('.state-field-group').removeClass('field-validated');
    countryFieldSelector.closest('.form-row').find('.state-field-group').removeClass('field-invalid');
    countryFieldSelector.closest('.form-row').find('.state-field-group .error-message').remove();
}

function collectData(self) {
    if (parseInt(self.closest('.quantity-wrap').find('.form-control').val()) < 0) {
        self.closest('.quantity-wrap').find('.form-control').val(0);
    }

    let ticketNumber = parseInt(self.closest('.quantity-wrap').find('.form-control').val()) ? parseInt(self.closest('.quantity-wrap').find('.form-control').val()) : 0,
        ticketPrice = parseInt(self.closest('tr').find('.per-price .amount').text()),
        ticketType = self.closest('.quantity-wrap').attr('ticket-type');
    let ticketCount = ticketNumber;

    if (ticketType == 'kids-11-to-20') {
        ticketCount += parseInt(self.closest('tr').next().find('.form-control').val() ? parseInt(self.closest('tr').next().find('.form-control').val()) : 0);
    }

    if (ticketType == 'kids-under-11') {
        ticketCount += parseInt(self.closest('tr').prev().find('.form-control').val() ? parseInt(self.closest('tr').prev().find('.form-control').val()) : 0);
    }
    updateTicketData(ticketNumber, ticketPrice, ticketType);
}

function updateTicketData(ticketNumber, ticketPrice, ticketType) {
    $('.' + ticketType + '-quantity').text(ticketNumber);
    $('.' + ticketType + '-price .amount').text(ticketNumber * ticketPrice);

    let amount = 0;
    $('.ticket-summary-table tbody tr').each(function (index, value) {
        amount += parseInt($(this).find('.amount').text());
    });

    totalPrice = amount;
    $('.total-price .amount').text(totalPrice);
    $('#total-price').val(totalPrice);

    showPaymentForm(totalPrice);
}

//==== A MINIMUM HEIGHT FOR BODY SO THAT ITS DOESN'T LOOK UGLY WHILE THERES NO DATA ON THE PAGE
function fixHeight() {
    let headerHeight = parseFloat($('.header').css('height')),
        footerHeight = parseFloat($('.footer').css('height')),
        mainWrapperMarginTop = parseFloat($('.main-wrapper').css('margin-top')),
        mainWrapperMarginBottom = parseFloat($('.main-wrapper').css('margin-bottom')),
        heightToMinusReady = headerHeight + footerHeight + mainWrapperMarginTop + mainWrapperMarginBottom,
        heightToMinus = "calc(100vh - " + heightToMinusReady + "px)";
    $('.main-wrapper').css('min-height', heightToMinus);

}

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

//==== CALCULATION OF TICKET PRICE
function calculateTotal() {
    let totalPrice = 0;
    $('.ticket-summary-table tbody tr').each(function (i, obj) {
        totalPrice = totalPrice + parseInt($(obj).find('.amount').text());
    });
    $('.total-price .amount').text(totalPrice);
    $('#total-price').val(totalPrice);

    showPaymentForm(totalPrice);
}

function ticket_row_number() {
    $('.ticket-summary-table tbody tr').each(function (i, obj) {
        $(obj).find('.row-counter').html(i + 1 + ".");
    });
}

//==== SHOWING PAYMENT FORM IF THE TICKET HAS PRICE
function showPaymentForm(totalAmount) {
    if (totalAmount > 0) {
        $('#card-info-area').show();
        $('.btn-reg').text('Payment');
        $('.btn-reg').addClass('btn-payment');
    } else {
        $('#card-info-area').attr('style', 'display:none;');
        $('.btn-reg').text('Register');
        $('.btn-reg').removeClass('btn-payment');
    }
}

//==== SHOWING INPUT FIELD WHEN OTHER CHECKBOX SELECTED
function selectWithOtherOption(selector) {
    if (selector.attr('data-value') === "other") {
        selector.closest('.form-group').find('.other-wrapper').show();
    } else {
        selector.closest('.form-group').find('.other-wrapper').hide();
    }
}