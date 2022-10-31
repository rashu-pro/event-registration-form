/**
 * Created by Rashu on 07-03-22.
 */

/**
 * 1. VARIABLES
 * 2. ON DOCUMENT READY
 * 3. EVENT LISTENER: FOCUS
 * 4. EVENT LISTENER: CLICK
 * 5. EVENT LISTENER: KEYUP / BLUR
 * 6. EVENT LISTENER: CHANGE
 * 7. FUNCTION DEFINITION
 */

/**
 * -------------------------------------
 * 1. VARIABLES
 */
let J = Payment.J,
    creditCardField = $('.cc-number'),
    creditCardHolder = $('.cc-number-holder'),
    creditCardImageHolder = $('.cc-card-identity'),
    pageLoader = $('.loader-div'),
    bannerHeight = $('.main-banner').height(),
    ticketRowSelector = $('.form-body .form-row-ticket-individual'),
    uniqueId = new Date().getUTCMilliseconds(),
    textMask = $('.mask-text'),
    phoneNumberMask = $('.phone-number-mask'),
    zipcodeMask = $('.mask-zipcode'),
    countryField = $('.country'),
    countrySelector = $('.country-selector'),
    stateFieldGroup = $('.state-field-group'),
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
    radioHolder = $('.contact-information-inner.contact-information-single .contact-information-grouped-wrapper .checkbox-holder'),
    errorMessage = "The field is required",
    ticketHtmlCloned = '',
    termsConditionsSelector = $('#tc-2'),
    cartItemHolder = $('.ticket-summary-table tbody'),
    cartItemRows = $('.ticket-summary-table .ticket-price-row'),
    priceNoteWrapper = $('.price-note-wrapper'),
    paymentInfoForm = $('#payment-information');

//=== button selector
let btnAddAnother = $('.btn-add-another-js');

let rowToDelete;

const statesJson = {
    "USA": {
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
    "Canada": {
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
};


/**
 * -------------------------------------
 * 2. ON DOCUMENT READY
 */
fixHeight();

if(countrySelector.length>0){
    countryFiller(statesJson, countrySelector);
    stateFiller(countrySelector.closest('.form-row'), countrySelector, countrySelector.closest('.form-row').find('.state-holder'), statesJson[countrySelector.val()]);
}

if ($('.cc-number').length > 0) {
    // card_validation()
}


//=== ADDING A CLASS TO THE CART SUMMARY TABLE
//=== - SO THAT CART SUMMARY TABLE DESIGN UPDATED
if ($('.ticket-summary-table').length > 0) {
    $('.ticket-summary-table').closest('.sidebar-block').addClass('sidebar-block-ticket-summary');
}


/**
 * -------------------------------------
 * 3. EVENT LISTENER: FOCUS
 */

//=== APPLYING JAVASCRIPT TO THE
//=== - DYNAMICALLY CREATED ELEMENTS
$(document).on('focus', '.form-body', function (e) {

});



/**
 * -------------------------------------
 * 4. EVENT LISTENER: CLICK
 */

//=== REGISTER BUTTON CLICK EVENT
$(document).on('click', '.btn-event-register', function (e) {
    e.preventDefault();
    let rootForm = $('.main-form'),
        requiredFieldGroups = rootForm.find('.form-group.required-group');

    //=== FIELD VALIDATION
    requiredFieldGroups.each(function (i, element) {
        singleValidation($(element).find('.form-control'), $(element), 'field-invalid', 'field-validated', 'error-message', errorMessage);
    });

    //=== FOCUS THE INVALID INPUT
    if(rootForm.find('.form-group .form-control.invalid').length>0){
        rootForm.find('.form-group .form-control.invalid').first().focus();
        return;
    }

    //=== TERMS & CONDITIONS CHECKBOX CHECK
    let isChecked = termsConditionsSelector.prop('checked');
    if(!isChecked){
        termsConditionsSelector.closest('.tc-wrapper').find('.tc-inner').css('border','2px solid #dc3545');
        setTimeout(function () {
            termsConditionsSelector.closest('.tc-wrapper').find('.tc-inner').css('border','1px solid #084298');
        },300);
        return;
    }

    //=== EXECUTES AFTER SUCCESSFULL VALIDATION
    if(rootForm.find('.form-group .form-control.invalid').length<1){
        registrationConfirmation();
    }
});

//=== CARD ICON IN THE CREDIT CARD NUMBER FIELD CLICK EVENT
$(document).on('click', '.cc-number-holder .cc-card-identity', function (e) {
    $(this).parent().find('input').focus();
});

//=== EXPANDING VOUCHER BLOCK
$(document).on('click', '.expand-coupon-js', function () {
    let self = $(this);
    self.closest('.voucher-block').toggleClass('active');
});

//=== ADD ANOTHER TICKET BUTTON CLICK EVENT
$(document).on('click', '.btn-add-another-js', function (e) {
    e.preventDefault();
    let self = $(this),
        rootParent = self.closest('.'+self.data('root')),
        requiredFieldGroup = rootParent.find('.form-group.required-group');

    requiredFieldGroup.each(function (i, element) {
        singleValidation($(element).find('.form-control'), $(element), 'field-invalid', 'field-validated', 'error-message', errorMessage);
    });
    rootParent.find('.form-group .form-control.invalid').first().focus();

    //=== AFTER SUCCESSFUL FORM VALIDATION
    if(rootParent.find('.form-group .form-control.invalid').length<1){
        pageLoader.addClass('active');
        setTimeout(function () {
            rootParent.removeClass('active').addClass('edited');
            if(rootParent.hasClass('cloneable')){
                ticketHtmlCloned = rootParent.clone();
            }
            ticketHtmlCloned.addClass('active').removeClass('edited').removeClass('first-row');
            ticketHtmlCloned.attr('data-row',parseInt(rootParent.attr('data-row'))+1);
            ticketHtmlCloned.find('.form-control').removeClass('valid');
            ticketHtmlCloned.find('.form-control').closest('.form-group').removeClass('field-validated');
            ticketHtmlCloned.find('.form-control').val('');
            ticketHtmlCloned.find('.form-group.phone-number-validator-wrapper').html($('.form-group-to-clone').html());
            ticketHtmlCloned.find('.form-group.phone-number-validator-wrapper .form-control').addClass('phone-number-validator');
            self.closest('.form-body').append(ticketHtmlCloned);
            //=== REINITIALIZED PHONE VALIDATOR TO THE CLONED ITEM
            let currentPhoneNumberSelectors = document.querySelectorAll('.phone-number-validator');
            if(currentPhoneNumberSelectors) {
                phoneNumberValidator(currentPhoneNumberSelectors, phoneNumberWrapperSelectorName, alertMessageSelectorName);
            }

            pageLoader.removeClass('active');
            window.scrollTo({ top: bannerHeight, behavior: 'smooth' });
        },500);

    }
});

//=== DIV COLLAPSE BUTTON CLICK EVENT
$(document).on('click', '.btn-ticket-collapse', function (e) {
    e.preventDefault();
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual');
    mainParent.toggleClass('active');
});

//=== DELETE BUTTON CLICK EVENT
$(document).on('click', '.btn-delete-ticket-js', function (e) {
    e.preventDefault();
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual'),
        dataRow = mainParent.data('row'),
        dataType = mainParent.data('type');
    //=== passing the data-row to the modal div so that we can decide which ticket to delete
    rowToDelete = dataRow;
    $('#confirm-modal-delete .modal-confirm').attr('data-row', dataRow);
    $('#confirm-modal-delete').modal('show');
});

//=== CONFIRM DELETE BUTTON CLICK EVENT
$(document).on('click', '.btn-delete-row-confirm', function () {
    let self = $(this),
        dataRow = self.closest('.modal-confirm').data('row');
    deleteRow(rowToDelete);

    $('#confirm-modal-delete').modal('hide');
});

//=== COUPON CALCULATION
$(document).on('click', '.btn-apply-voucher-js', function (e) {
    let self = $(this),
        voucherField = self.closest('.voucher-block').find('.voucher-field-js'),
        subtotal = parseFloat($('.subtotal-price .amount').text()),
        discountAmount = 0,
        discountSign = '';

    self.closest('.voucher-block').find('.error-message').remove();
    if(voucherField.val()==''){
        errorLoadVoucher(self, 'Put the code first!');
        return;
    }

    if(voucherField.data('type')==='solid'){
        if(voucherField.val()<1){
            errorLoadVoucher(self, 'Invalid discount!');
        }

        if(parseFloat(voucherField.val())>=subtotal){
            errorLoadVoucher(self, 'Invalid discount!');
            e.preventDefault();
            voucherField.val(0);
            discountAmount = 0;
            $('.discount-js').html(discountAmount);
            $('.discount-amount-name-js').val(discountAmount);
            calculateGrandTotal();
            return false;
        }
        discountAmount = parseFloat(voucherField.val())? parseFloat(voucherField.val()): 0;
    }else{
        let object = couponCodes.find(obj=>obj.name===voucherField.val());
        if(!object){
            errorLoad(self, 'Wrong coupon code!');
            return;
        }
        discountAmount = object.discount;
        if(object.calculateMethod==='percentage'){
            discountSign = '%';
            discountAmount = (parseFloat(object.discount)*subtotal)/100;
        }
        $('.discount-code-name-js').val(object.discount);
        $('.discount-note-js').html('<span class="currency">$</span><span>'+object.discount+'</span><span>'+discountSign+'</span>');
    }

    $('.discount-js').html(discountAmount);
    $('.discount-amount-name-js').val(discountAmount);
    calculateGrandTotal();
});



/**
 * -------------------------------------
 * 5. EVENT LISTENER: KEYUP / BLUR
 */
$(document).on('keyup', '.form-group.required-group .form-control', function (e) {
    let self = $(this);

    if(self.val().length>0){
        self.removeClass('invalid');
        self.removeClass('field-invalid');
        self.closest('.form-group').find('.error-message').remove();
    }
});

$(document).on('blur', '.form-group.required-group .form-control', function (e) {
    let self = $(this);
    let errorMessage = "The field is required";

    //=== FIELD VALIDATION
    singleValidation(self, self.closest('.form-group'),'field-invalid', 'field-validated', 'error-message', errorMessage);
});




/**
 * -------------------------------------
 * 6. EVENT LISTENER: CHANGE
 */

//=== TICKET CATEGORY SELECT CHANGE EVENT
$(document).on('change', '.ticket-type-js', function (e) {
    e.preventDefault();
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual'),
        ticketText = self.children(':selected').attr('data-text'),
        price = self.children(':selected').attr('data-price'),
        unitPrice = self.children(':selected').attr('data-unitPrice'),
        dataRow = mainParent.data('row'),
        dataType = self.data('type'),
        cartItemDivCloned = $('.ticket-summary-row-table-to-clone tr').clone(),
        status = true;

    if(self.val()==='') status = false;
    cartItemManipulation(status, dataType, dataRow, cartItemHolder, cartItemDivCloned, ticketText, price);

    if(!self.data('dynamic')) return;

    let participantInformationHtml = $('.contact-information-html .contact-information-grouped-single-copy').clone();
    self.closest('.form-row-ticket-individual').find('.contact-information-grouped-single').remove();
    self.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper').append(participantInformationHtml);
    self.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single-copy').addClass('contact-information-grouped-single');
});

//=== ADDON TICKET CHANGE EVENT
$(document).on('change', '#addon-ticket', function () {
    let self = $(this),
        unitPrice = self.data('unitprice'),
        ticketText = self.data('name')+" X "+self.val(),
        price = parseInt(unitPrice)*parseInt(self.val()),
        dataRow = 200,
        dataType = self.data('type'),
        cartItemDivCloned = $('.ticket-summary-row-table-to-clone tr').clone(),
        status = true;
    if(self.val()==0) status = false;
    cartItemManipulation(status, dataType, dataRow, cartItemHolder, cartItemDivCloned, ticketText, price);
});

//=== COUNTRY FIELD CHANGE EVENT: GENARATING STATE BASED ON COUNTRY
$(document).on('change', '.country-selector', function (e) {
    let self = $(this),
        formRow = self.closest('.form-row'),
        stateHolder = formRow.find('.state-holder'),
        stateList = statesJson[self.val()];

    stateFiller(formRow, self, stateHolder, stateList);
});

//=== SELECT FIELD CHANGE
$(document).on('change', '.form-group.required-group .form-control', function (e) {
    let self = $(this);

    if(self.val().length>0){
        self.removeClass('invalid');
        self.removeClass('field-invalid');
        self.closest('.form-group').find('.error-message').remove();
    }
});



/**
 * -------------------------------------
 * 7. FUNCTION DEFINITION
 */

/**
 *
 * @effects gives body a min height so that the footer always stay in the bottom of the page
 * -------- event if the page doesn't have enough contents
 */
function fixHeight() {
    let headerHeight = parseFloat($('.header').css('height')),
        footerHeight = parseFloat($('.footer').css('height')),
        mainWrapperMarginTop = parseFloat($('.main-wrapper').css('margin-top')),
        mainWrapperMarginBottom = parseFloat($('.main-wrapper').css('margin-bottom')),
        heightToMinusReady = headerHeight + footerHeight + mainWrapperMarginTop + mainWrapperMarginBottom,
        heightToMinus = "calc(100vh - " + heightToMinusReady + "px)";
    $('.main-wrapper').css('min-height', heightToMinus);

}

/**
 *
 * This function checks whether the given value is valid email or not
 * @param email
 * @return {boolean}
 */
function isEmailValid(email){
    return /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i.test(email);
}

/**
 * Checks whether the given input is valid zipcode or not
 *
 * @param code - zipcode
 * @return {boolean}
 */
function isZipCodeValid(code) {
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(code);
}

/**
 * Checks whether the given is a valid name
 *
 * @param name
 * @return {boolean}
 */
function isNameValid(name) {
    return /[-a-zA-Z' ]{6,26}/g.test(name);
}


/**
 *
 * @param formControl
 * @param formGroup
 * @param invalidClassName
 * @param validClassName
 * @param errorMessageClassName
 * @param errorMessage
 *
 * @effects: check whether the input fields are validate
 * - or not and show warning message as needed
 */
function singleValidation(formControl, formGroup, invalidClassName, validClassName, errorMessageClassName, errorMessage) {
    errorMessage = "The field is required";
    let paramObj = {
        "formControl": formControl,
        "formGroup": formGroup,
        "invalidClassName": invalidClassName,
        "validClassName": validClassName,
        "errorMessageClassName": errorMessageClassName,
        "errorMessage": errorMessage
    };

    //=== IF FORM GROUP HAS DISPLAY NONE PROPERTIES
    if(formGroup.css('display')==='none') return;

    //=== INPUT FIELD VALIDATION: EMPTY FIELD
    if(formControl.val()===''){
        validationFailed(paramObj);
        return;
    }

    //=== INPUT FIELD VALIDATION: TEXT FIELD
    if(formControl.hasClass('validation-text')){
        formControl.val()!==''?validationSuccess(paramObj):validationFailed(paramObj);
    }

    //=== ONLY NUMBER VALIDATION
    if(formControl.hasClass('validation-number')){
        if(formControl.data('length-min')){
            isNumber(formControl.val())&&formControl.val().length>=formControl.data('length-min')?validationSuccess(paramObj):validationFailed(paramObj);
        }

        if(formControl.data('length-max')){
            isNumber(formControl.val())&&formControl.val().length<formControl.data('length-max')?validationSuccess(paramObj):validationFailed(paramObj);
        }

        if(formControl.data('length-min') && formControl.data('length-max')){
            isNumber(formControl.val()) && formControl.val().length>=formControl.data('length-min') && formControl.val().length<formControl.data('length-max')?validationSuccess(paramObj):validationFailed(paramObj);
        }
    }

    //=== SELECT DROPDOWN VALIDATION
    if(formControl.prop('tagName')==='SELECT'){
        formControl.val()!==''?validationSuccess(paramObj):validationFailed(paramObj);
    }

    //=== INPUT FIELD VALIDATION: EMAIL FIELD
    if(formControl.hasClass('validation-email')){
        paramObj.errorMessage = "Invalid Email Address!";
        isEmailValid(formControl.val())?validationSuccess(paramObj):validationFailed(paramObj);
    }

    //=== INPUT FIELD VALIDATION: CREDIT CARD NUMBER FIELD
    if(formControl.hasClass('validation-cc-number')){
        paramObj.errorMessage = "Invalid card number!";
        cardValidation()?validationSuccess(paramObj):validationFailed(paramObj);
    }
}

/**
 * checks whether the given card number
 * - is valid or not
 *
 * @return {boolean}
 */
function cardValidation(){
    let ccNumberSelector = document.querySelector('.cc-number'),
        cardType = Payment.fns.cardType(J.val(ccNumberSelector));
    //=== INVALID CARD TYPE
    if(!cardType){
        creditCardImageHolder.html("<img src='assets/images/unknown.png'>");
        return;
    }
    creditCardField.addClass(cardType);
    creditCardImageHolder.html("<img src='assets/images/" + cardType + ".png'>");
    return Payment.fns.validateCardNumber(J.val(ccNumberSelector));
}

/**
 *
 * This function checks whether a given
 * - string is number or not
 *
 * @param string
 * @return {boolean}
 */
function isNumber(string){
    return /^\d+$/.test(string);
}

/**
 *
 * @param paramObj
 */
function validationSuccess(paramObj){
    paramObj.formControl.removeClass(paramObj.invalidClassName);
    paramObj.formControl.removeClass('invalid');
    paramObj.formControl.addClass('valid');
    paramObj.formGroup.addClass(paramObj.validClassName);
    paramObj.formGroup.find('.'+paramObj.errorMessageClassName).remove();
}

/**
 *
 * @param paramObj
 */
function validationFailed(paramObj) {
    paramObj.formGroup.removeClass(paramObj.validClassName);
    paramObj.formControl.addClass(paramObj.invalidClassName);
    paramObj.formControl.removeClass('valid');
    paramObj.formControl.addClass('invalid');

    notifyError(paramObj);
}

/**
 *
 * @param paramObj [an oject containg all the parametes]
 * @effects shows error message for invalid field
 */
function notifyError(paramObj) {
    paramObj.formGroup.find('.'+paramObj.errorMessageClassName).remove();
    paramObj.formGroup.append('<p class="'+paramObj.errorMessageClassName+' text-danger">'+paramObj.errorMessage+'</p>');
}

/**
 * makes cart item ready to append
 *
 * @param cartItem
 * @param dataRow
 * @param type
 * @param name
 * @param price
 */
function makeCartItemReadyToAppend(cartItem, dataRow, type, name, price){
    if(!cartItem){
        console.log('cart item has not been created!');
        return;
    }
    cartItem.addClass('ticket-'+type+'-'+dataRow);
    cartItem.attr('data-row', dataRow);
    cartItem.attr('data-order', dataRow);
    cartItem.find('.tr-ticket-text').text(name);
    cartItem.find('.amount').text(price);
}

/**
 * adds item into cart
 *
 * @param cartItemHolder
 * @param cartItem
 * @param dataRow
 * @param type
 */
function addItemIntoCart(cartItemHolder, cartItem, dataRow, type){
    if(!cartItem){
        console.log('cart item has not been created!');
        return;
    }
    cartItemHolder.find('.ticket-'+type+'-'+dataRow).remove();
    cartItemHolder.append(cartItem);
}

/**
 * Sorts element list into an order
 *
 * @param elementList
 * @param elementHolder
 */
function elementOrder(elementList, elementHolder){
    elementList.sort(function(a, b){ return $(a).data("order")-$(b).data("order")});
    elementHolder.html(elementList);
}

/**
 * adds/removes item to/from the cart
 *
 * @param status
 * @param dataType
 * @param dataRow
 * @param cartItemHolder
 * @param cartItemDivCloned
 * @param ticketText
 * @param price
 */
function cartItemManipulation(status, dataType, dataRow, cartItemHolder, cartItemDivCloned, ticketText, price) {
    if(!status){
        cartItemHolder.find('.ticket-'+dataType+'-'+dataRow).remove();
        calculateTotal();
        elementOrder($('.ticket-summary-table tbody tr'), cartItemHolder);
        return;
    }

    makeCartItemReadyToAppend(cartItemDivCloned, dataRow, dataType, ticketText, price);
    addItemIntoCart(cartItemHolder, cartItemDivCloned, dataRow, dataType);
    calculateTotal();
    elementOrder($('.ticket-summary-table tbody tr'), cartItemHolder);
}

/**
 * Calculates subtotal from the cart
 *
 * @param cartItemsClass
 * @return {number} - subtotal
 */
function calculateSubTotal(cartItemsClass){
    let total = 0;
    $(cartItemsClass).each(function (i, element) {
        console.log('row price:', $(element).find('.amount').text());
        total = total + parseInt($(element).find('.amount').text());
    });
    return total;
}

/**
 * Calculates subtotal
 * Calculates grand total
 * Update price note wrapper data
 *
 */
function calculateTotal() {
    let subtotal = calculateSubTotal('.ticket-summary-table .ticket-price-row'),
        ticketCount = $('.ticket-summary-table .ticket-price-row').length;

    $('.ticket-summary-table .total-price .amount').html(subtotal);
    //=== calculates grand total;
    //=== updates subtotal and grand total in the DOM
    calculateGrandTotal(subtotal);

    //=== updates data for price note wrapper; which is located after billing form
    priceNoteWrapper.find('.ticket-count').html(ticketCount);
    priceNoteWrapper.find('.total-price').html(subtotal);
    if(!ticketCount){
        priceNoteWrapper.removeClass('active');
        return;
    }
    priceNoteWrapper.addClass('active');
}

/**
 * Calculates grand total
 *
 * @param subtotal
 * @return {Number} - grandtotal
 */
function grandTotal(subtotal){
    console.log('subtotal', subtotal);
    let grandTotal = parseInt(subtotal);
    $('.ticket-summary-table .price-row-extra').each(function (i, element) {
        console.log(parseInt($(element).find('.amount').text()));
        if($(element).data('method')==='plus') grandTotal = grandTotal + parseInt($(element).find('.amount').text());
        if($(element).data('method')==='minus') grandTotal = grandTotal - parseInt($(element).find('.amount').text());
    });
    console.log('Grand total in grandTotal(): ', grandTotal);
    return grandTotal;
}


/**
 * Calculates grand total
 * Updates total price in dom
 *
 * @param subtotal
 */
function calculateGrandTotal(subtotal) {
    let grandTotalPrice = grandTotal(subtotal);
    updateTotalInDOM(subtotal, grandTotalPrice);
    isPayment(grandTotalPrice, paymentInfoForm);
}

/**
 * Updates subtotal and grand total in the DOM
 *
 * @param subtotal
 * @param grandTotal
 */
function updateTotalInDOM(subtotal, grandTotal){
    //changed by Emdad
    //Update total price hidden field
    $('#sub-total-price').val(subtotal);
    $('#total-price').val(grandTotal);

    $('.ticket-summary-table .grand-total-price .amount').html(grandTotal);
}

/**
 * Shows payment info div when total price is greater than 0
 * hides payment info div when total price is smaller than 0
 *
 * @param grandTotalPrice
 * @param paymentInformationDivSelector
 */
function isPayment(grandTotalPrice, paymentInformationDivSelector){
    if(grandTotalPrice<=0){
        paymentInformationDivSelector.hide();
    }else{
        paymentInformationDivSelector.show();
    }
}

/**
 * Removes ticket row from from form body
 *
 * @param dataRow
 */
function removeTicket(dataRow){
    $('.form-row-ticket-individual[data-row='+dataRow+']').remove();
}

/**
 * Removes cart item from ticket summary cart
 *
 * @param dataRow
 */
function removeCartItem(dataRow){
    $('.ticket-price-row[data-row='+dataRow+']').remove();
    calculateTotal();
    $('.btn-apply-voucher-js').trigger("click");
    elementOrder($('.ticket-summary-table tbody tr'), cartItemHolder);
}

/**
 * Gives ticket serial number to the ticket
 *
 * @param ticketRows
 */
function ticketSerialNumber(ticketRows) {
    ticketRows.each(function (i, element) {
        $(element).find('.ticket-row').html(i + 1);
    });
}

/**
 * Deletes a ticket
 *
 * @param dataRow
 */
function deleteRow(dataRow) {
    pageLoader.addClass('active');
    //--changed by Emdad
    updateTicketQuantity(dataRow);

    setTimeout(function () {
        removeTicket(dataRow);
        removeCartItem(dataRow);
        ticketSerialNumber(ticketRowSelector);
        //=== EXPAND FIRST TICKET ROW IF THERES ONLY ONE TICKET ROW
        console.log(ticketRowSelector.length);
        if(ticketRowSelector.length == 1) $('.form-row-ticket-individual').addClass('first-row');
        //AFTER DELETION LAST TICKET ROW SHOULD BE OPEN
        ticketRowSelector.last().removeClass('edited');
        ticketRowSelector.last().addClass('active');
        pageLoader.removeClass('active');
    }, 600)
}

/**
 * Fills country dropdown from the given country list
 *
 * @param countryList
 * @param countrySelector
 */
function countryFiller(countryList, countrySelector){
    for(let key in countryList){
        countrySelector.append(`<option value="${key}">${key}</option>`);
    }
}

/**
 *
 * @param formRow
 * @param countrySelector
 * @param stateHolder
 * @param statesList
 */
function stateFiller(formRow, countrySelector, stateHolder, statesList) {
    if(countrySelector.val()===''){
        console.log('no country selected!');
        stateHolder.html("<input type='text' class='form-control state' name='State' id='state'>");
        return;
    }
    stateHolder.html("<select class='form-control state' name='State' id='state'></select>");
    stateHolder.find('select').append("<option value=''>--Select a State--</option>");
    for (let key in statesList) {
        formRow.find(stateHolder).find('select').append(`<option value="${key}">${key}</option>`)
    }
}

/**
 * Generates unique id for every distinctive radio input field
 * @param radioHolder
 */
function radioBoxIdGenerating(radioHolder) {
    let randomUniqueIdMale = (Math.random() + 1).toString(36).substring(4, 7);
    radioHolder.first().find('input').attr('id', randomUniqueIdMale);
    radioHolder.first().find('label').attr('for', randomUniqueIdMale);

    radioHolder.first().find('input').prop('checked', true);

    let randomUniqueIdFemale = (Math.random() + 1).toString(36).substring(4, 7);
    radioHolder.last().find('input').attr('id', randomUniqueIdFemale);
    radioHolder.last().find('label').attr('for', randomUniqueIdFemale);
}

/**
 *
 * @param self
 * @param message
 */
function errorLoadVoucher(self, message) {
    self.closest('.voucher-block').find('.error-message').remove();
    self.closest('.voucher-block').append('<p class="text-danger error-message">' + message + '</p>');
    // self.closest('.voucher-block').find('.warning-message').remove();
}

// created by Emdad
//DataRow added as ticket quantity on #ticket-quantity field
function updateTicketQuantity(dataRow) {
    $('#ticket-quantity').val(dataRow);
}