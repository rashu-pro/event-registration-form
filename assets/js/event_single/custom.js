/**
 * Created by Rashu on 07-03-22.
 */

/**
 * 1. VARIABLES
 * 2. ON DOCUMENT READY
 * 3. EVENT LISTENER: CLICK
 * 4. EVENT LISTENER: KEYUP / BLUR
 * 5. EVENT LISTENER: CHANGE
 * 6. FORM VALIDATION
 * 7. FUNCTION DEFINITION
 */

/**
 * -------------------------------------
 * 1. VARIABLES
 */
let totalPrice = 0,
    creditCardField = $('.cc-number'),
    countryField = $('.country'),
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
        "Yukon": "Yukon"
    },
    selectWithOtherSelector = $('.select-with-other-js'),
    ticketSummaryTableSelector = $('.ticket-summary-table'),
    sidebarBlockSelector = $('.sidebar-block'),
    maskZipcodeSelector = $('#card-info-area .mask-zipcode'),
    maskCvvSelector = $('.mask-cvv'),
    datePicketSelector = $('.date-picker-js'),
    errorMessage = "The field is required";

const SCREEN_WIDTH = screen.width;
const CURRENT_YEAR = new Date().getFullYear();
const SUMMARY_TABLE_TBODY_SELECTOR = $('.ticket-summary-table table tbody');
const TICKET_SUMMARY_ROW = $('.ticket-summary-row-to-clone tr').clone();

/**
 * -------------------------------------
 * 2. ON DOCUMENT READY
 */
fixHeight();
calculateTotal();
selectWithOtherOption(selectWithOtherSelector);
statesFiller(countryField);
//=== ADDING A CLASS TO THE TICKET SUMMARY TABLE
if (ticketSummaryTableSelector.length > 0) {
    ticketSummaryTableSelector.closest(sidebarBlockSelector).addClass('sidebar-block-ticket-summary');
}
//=== EXECUTING CREDIT CARD VALIDATION ON DOCUMENT READY
if (creditCardField.length > 0) card_validation();

//=== DATE OF BIRTH PICKER
if(SCREEN_WIDTH<1200){
    if(datePicketSelector.length>0) datePicketSelector.prop('readonly','true');
}

//=== DATEPICKER INITIALIZATION
$(document).on('focus', datePicketSelector, function () {
    $(this).datepicker({
        dateFormat: "mm/dd/yy",
        changeMonth: true,
        changeYear: true,
        yearRange: "1981:2001",
    });
});


/**
 * -------------------------------------
 * 3. EVENT LISTENER: CLICK
 */

//=== QUANTITY INCREASE BUTTON CLICK EVENT
$(document).on('click', '.quantity-increase', function () {
    let self = $(this),
        ticketRowSelector = self.closest('.data-row'),
        quantitySelector = self.closest('.quantity-wrap').find('.form-control'),
        quantityValue = parseInt(quantitySelector.val()),
        quantityMax = parseInt(quantitySelector.data('max'));

    quantitySelector.val(quantityValue + 1);

    if(parseInt(quantitySelector.val())>quantityMax){
        quantitySelector.val(quantityMax);
        //remove ticket from the summary (have to add)
        let errorMessage = `<p class="error-message text-danger">Can't select more than ${quantityMax} ticket!</p>`;
        ticketRowSelector.find('.error-message').remove();
        ticketRowSelector.append(errorMessage);
        setTimeout(function () {
            ticketRowSelector.find('.error-message').remove();
        },1000);
    }

    if(parseInt(quantitySelector.val())>0){
        let itemRow = ticketRowSelector.data('row'),
            classToAdd = "data-row"+itemRow,
            itemName = ticketRowSelector.data('name'),
            itemQuantity = parseInt(quantitySelector.val()),
            itemUnitPrice = parseInt(ticketRowSelector.data('unitprice')),
            dataObj = {
                'itemRow': itemRow,
                'classToAdd': classToAdd,
                'itemName': itemName,
                'itemQuantity': itemQuantity,
                'itemUnitPrice': itemUnitPrice
            };

        addItemIntoCart(SUMMARY_TABLE_TBODY_SELECTOR, TICKET_SUMMARY_ROW, dataObj);
    }


    // chooseTicketWarning(quantitySelector);
    // collectData(self);
    // calculateCoupon($('.btn-apply-voucher-js'), false);
});

function addItemIntoCart(whereToAdd, ticketSummaryRow, dataObj){
    ticketSummaryRow.attr('data-row', dataObj.itemRow);
    ticketSummaryRow.addClass(dataObj.classToAdd);
    ticketSummaryRow.find('.quantity-ticket-summary').text(dataObj.itemQuantity);
    ticketSummaryRow.find('.name-ticket-summary').text(dataObj.itemName);
    ticketSummaryRow.find('.amount-ticket-summary').text(dataObj.itemQuantity*dataObj.itemUnitPrice);

    console.log('data row-: ', dataObj.itemRow);
    // whereToAdd.find('.data-row'+dataObj.itemRow).remove();
    whereToAdd.append(ticketSummaryRow);
}

//=== QUANTITY DECREASE BUTTON CLICK EVENT
$(document).on('click', '.quantity-decrease', function () {
    let self = $(this),
        quantitySelector = self.closest('.quantity-wrap').find('.form-control'),
        quantityValue = quantitySelector.val();

    if (quantityValue > 0) {
        quantitySelector.val(parseInt(quantityValue) - 1);
    }
    chooseTicketWarning(quantitySelector);
    collectData(self);
    calculateCoupon($('.btn-apply-voucher-js'), false);
});

//=== REGISTRATION BUTTON CLICK EVENT
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
            if($('#tc-2').length>0){
                let isChecked = $('#tc-2').prop('checked');
                if (!isChecked) {
                    $('#tc-2').closest('.tc-wrapper').find('.alert').css('border', '2px solid #dc3545');
                    setTimeout(function () {
                        $('#tc-2').closest('.tc-wrapper').find('.alert').css('border', '1px solid #084298');
                    }, 300);
                    return;
                }
            }
            registrationConfirmation();
        }
    }
    console.log('all fields validated!');
    allFieldsValidated(true);
});

//=== DATE OF BIRTH CALENDAR ICON CLICK EVENT
$(document).on('click', '.dob-addon', function () {
    $(this).closest('.form-group').find('.form-control').trigger('focus');
});


/**
 * -------------------------------------
 * 4. EVENT LISTENER: KEYUP / BLUR
 */
//=== QUANTITY FIELD KEYUP EVENT
$(document).on('keyup', '.quantity-wrap .form-control', function () {
    let self = $(this),
        quantitySelector = self.closest('.quantity-wrap').find('.form-control'),
        quantityValue = quantitySelector.val();

    if (quantityValue > 10) {
        quantitySelector.val(0);
    }

    chooseTicketWarning(quantitySelector);
    collectData(self);
    calculateCoupon($('.btn-apply-voucher-js'), false);
});

//=== ADDONTICKET FIELD KEYUP AND BLUR EVENT
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

creditCardField.on('keyup', card_validation);


/**
 * -------------------------------------
 * 5. EVENT LISTENER: CHANGE
 */
//=== TICKET CATEGORY CHANGE EVENT (TICKET CATEGORY SELECTION FROM DROPDOWN)
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
    calculateCoupon($('.btn-apply-voucher-js'), false);
});

//=== POPULATING STATES FIELD ON COUNTRY SELECTION
$(document).on('change', countryField, function () {
    statesFiller($(this));
});

$(document).on('change', selectWithOtherSelector, function (e) {
    let self = $(this);
    if (self.prop('checked') === true) {
        self.attr('data-value', 'other');
    } else {
        self.attr('data-value', '');
    }
    selectWithOtherOption($(this));
});


/**
 * -------------------------------------
 * 6. FORM VALIDATION
 */
$(document).on('keypress blur change', '.form-group.required-group .form-control', function () {
    singleValidation($(this), $(this).parent());
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
        "mask": "99999",
        "placeholder": ""
    });
});

maskZipcodeSelector.inputmask({
    "mask": "99999",
    "placeholder": ""
});

maskCvvSelector.inputmask({
    "mask": "9999",
    "placeholder": ""
});

$(document).on('keyup', '.mask-cvv', function () {
    cvvValidate($(this), $(this).closest('.form-group'));
});

$(document).on('keyup', maskZipcodeSelector, function () {
    let self = $(this);
    if (maskZipcodeSelector.inputmask("isComplete")) {
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


/**
 * -------------------------------------
 * 7. FUNCTION DEFINITION
 */

function chooseTicketWarning(quantitySelector) {
    let ticketFieldSelector = $('.ticket-field'),
        ticketFieldValidated = false;
    ticketFieldSelector.each(function (i, object) {
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
    let pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
        email = formGroup.find('.form-control').val();
    if (!pattern.test(email)) {
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
            if (!card_validation()) {
                formControl.closest('.form-group.required-group').removeClass('field-validated');
                notifyError(formControl, errorMessage);
            }
        }

        //credit card number validation
        if (formControl.data('validation') === "cvv") {
            if (formControl.val() != '') {
                errorMessage = "Invalid CVV"
            }
            if (!cvvValidate(formControl)) {
                formControl.closest('.form-group.required-group').removeClass('field-validated');
                notifyError(formControl, errorMessage);
            }
        }

        //SELECT FIELD VALIDATION
        if (formControl.val() == 0) {
            formControl.closest('.form-group.required-group').removeClass('field-validated');
        }

        //CHECKBOX VALIDATION
        if (formGroup.find('input[type=checkbox]')) {
            // if(formGroup.find('input[type=checkbox]').prop('checked')===true){
            //     formGroup.addClass('field-validated');
            //     notifyError(formGroup.find('input[type=checkbox]'), errorMessage);
            // }
        }

    } else {
        notifyError(formControl, errorMessage);
    }
}

function statesFiller(countryFieldSelector) {
    if(countryFieldSelector.val()=="USA"){
        countryFieldSelector.closest('.form-row').find('.state-field-group .state-holder').html("<select class='form-control state' name='State' id='state'></select>");
        countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='0'>Select a State</option>");
        for (let key in statesJson){
            countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='"+statesJson[key]+"'>"+statesJson[key]+"</option>")
        }
    }else if(countryFieldSelector.val()=="Canada"){
        countryFieldSelector.closest('.form-row').find('.state-field-group .state-holder').html("<select class='form-control state' name='State' id='state'></select>");
        countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='0'>Select a State</option>");
        for (let key in statesCanadaJson){
            countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='"+statesCanadaJson[key]+"'>"+statesCanadaJson[key]+"</option>")
        }
    }else{
        countryFieldSelector.closest('.form-row').find('.state-field-group .state-holder').html("<input type='text' class='form-control state' id='state' name='State'>");
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
        ticketType = self.closest('.quantity-wrap').attr('ticket-type'),
        ticketTypeKey = self.closest('.quantity-wrap').attr('ticket-type-key');

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

function card_validation() {
    let J = Payment.J,
        creditCardHolder = $('.cc-number-holder'),
        creditCardImageHolder = $('.cc-card-identity');
    let number = document.querySelector('.cc-number');
    //Payment.formatCardNumber(number);
    J.toggleClass(document.querySelectorAll('input'), 'invalid');
    let cardType = Payment.fns.cardType(J.val(number));
    // J.toggleClass(number, 'invalid', !Payment.fns.validateCardNumber(J.val(number)));
    if (cardType) {
        creditCardField.addClass(cardType);
        creditCardImageHolder.html("<img src='assets/images/" + cardType + ".png'>");
    } else {
        // creditCardImageHolder.html("<img src='/Content/event-management-assets/individual-multiple-assets/images/unknown.png'>");
        creditCardImageHolder.html("<img src='assets/images/unknown.png'>");
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

/* CALCULATE TICKET SUMMARY TOTAL */
function calculateTotal() {
    let totalPrice = 0;
    $('.ticket-summary-table tbody tr').each(function (i, obj) {
        totalPrice = totalPrice + parseInt($(obj).find('.amount').text());
    });
    $('.total-price .amount').text(totalPrice);
    $('#total-price').val(totalPrice);

    showPaymentForm(totalPrice);
    calculateGrandTotal();
}

function calculateGrandTotal() {
    let totalPrice = parseInt($('.ticket-summary-table .total-price .amount').html()),
        voucherPrice = parseInt($('.ticket-summary-table .voucher-price .amount').html()),
        grandTotalPrice = totalPrice - voucherPrice;
    //    console.log(grandTotalPrice);
    $('.ticket-summary-table .grand-total-price .amount').html(grandTotalPrice);
}

function ticket_row_number() {
    $('.ticket-summary-table tbody tr').each(function (i, obj) {
        $(obj).find('.row-counter').html(i + 1 + ".");
    });
}

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

function selectWithOtherOption(selector) {
    if (selector.attr('data-value') === "other") {
        selector.closest('.form-group').find('.other-wrapper').show();
    } else {
        selector.closest('.form-group').find('.other-wrapper').hide();
    }
}

//==== from page footer
function calculateCoupon(self, isClicked) {
    if (parseInt($('.subtotal-price .amount').html()) <= 0) {
        singleValidation($('.ticket-type-js'));
        return;
    }

    let voucherBlock = self.closest('.voucher-block'),
        voucherCode = voucherBlock.find('input.form-control').val();

    if (voucherCode === '') {
        $('.voucher-tr').hide();
        $('.voucher-price .amount').html(0);
        calculateTotal();
        let errorMessage = `<p class="error-message text-danger m-0">Enter your coupon code</p>`;
        voucherBlock.find('.error-message').remove();
        if (isClicked) {
            voucherBlock.append(errorMessage);
        }
        return;
    }
}