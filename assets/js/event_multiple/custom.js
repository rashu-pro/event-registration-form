/**
 * Created by Rashu on 07-03-22.
 */


/**
 * -------------------------------------
 * 2. ON DOCUMENT READY
 */
fixHeight();

if ($('.cc-number').length > 0) {
    // card_validation()
}
//==== USA STATE FILLER
statesFiller(countryField);

radioBoxIdGenerating(radioHolder);

//=== INPUT MASKING
$('.payment-information .mask-zipcode').inputmask({
    "mask": "99999"
});

$('.mask-cvv').inputmask({
    "mask": "9999",
    placeholder: ""
});

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



/**
 * -------------------------------------
 * 4. EVENT LISTENER: CLICK
 */

//=== QUANTITY INCREASE BUTTON CLICK EVENT
$('.quantity-increase').on('click', function () {
    let self = $(this),
        quantitySelector = self.closest('.quantity-wrap').find('.form-control'),
        quantityValue = quantitySelector.val();

    if (quantityValue < 10) {
        quantitySelector.val(parseInt(quantityValue) + 1);
    }

    collectData(self);
    calculateCoupon($('.btn-apply-voucher-js'), false);
});

//=== QUANTITY DECREASE BUTTON CLICK EVENT
$('.quantity-decrease').on('click', function () {
    let self = $(this),
        quantitySelector = self.closest('.quantity-wrap').find('.form-control'),
        quantityValue = quantitySelector.val();

    if (quantityValue > 0) {
        quantitySelector.val(parseInt(quantityValue) - 1);
    }

    collectData(self);
    calculateCoupon($('.btn-apply-voucher-js'), false);
});

//=== REGISTER BUTTON CLICK EVENT
$(document).on('click', '.btn-event-register', function (e) {
    e.preventDefault();
    let self = $(this),
        rootForm = $('.main-form'),
        requiredFieldGroups = rootForm.find('.form-group.required-group');

    //=== FIELD VALIDATION
    requiredFieldGroups.each(function (i, element) {
        singleValidation($(element).find('.form-control'), $(element), 'field-invalid', 'field-validated', 'error-message', errorMessage);
    });
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

    if(rootForm.find('.form-group .form-control.invalid').length<1){
        console.log('fields validated!');
    }


});

$('.cc-number-holder .cc-card-identity').on('click', function (e) {
    $(this).parent().find('input').focus();
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
            self.closest('.form-body').append(ticketHtmlCloned);
            pageLoader.removeClass('active');
            window.scrollTo({ top: bannerHeight, behavior: 'smooth' });
        },1000);

    }
});

//=== DIV COLLAPSE BUTTON CLICK EVENT
$(document).on('click', '.btn-ticket-collapse', function (e) {
    e.preventDefault();
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual');
    mainParent.toggleClass('active');
});

//=== PAY NOW BUTTON CLICK EVENT
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

//=== DELETE BUTTON CLICK EVENT
$(document).on('click', '.btn-delete-ticket-js', function (e) {
    e.preventDefault();
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual'),
        dataRow = mainParent.attr('data-row');
    $('#confirm-modal-delete .modal-confirm').attr('data-row', dataRow);
    $('#confirm-modal-delete').modal('show');
});

//===== CONFIRM DELETE BUTTON CLICK EVENT
$('.btn-delete-row-confirm').on('click', function () {
    let self = $(this);
    deleteRow(self.closest('.modal-confirm').attr('data-row'));
    $('#confirm-modal-delete').modal('hide');
});

//=== ADDING ANOTHER GROUP OF TICKETS BUTTON CLICK EVENT
$(document).on('click', '.btn-add-group-js', function (e) {
    e.preventDefault();

    let self = $(this),
        parent = self.closest('.contact-information-inner'),
        dataRow = self.closest('.form-row').attr('data-row'),
        unitPrice = self.closest('.form-row').find('.ticket-type-js option:selected').attr('data-unitPrice'),
        uniqueKeys = self.closest('.form-row').find('.ticket-type-js').val(),
        invalidField = parent.find('.form-group.required-group'),
        validField = parent.find('.form-group.required-group.field-validated'),
        notValidatedField = parent.find('.contact-information-grouped-single').find('.required-group:not(.field-validated)');

    if (notValidatedField.length > 0) {
        notValidatedField.first().find('input').focus();
        if (notValidatedField.hasClass('radiobox')) {
            notValidatedField.first().find('input').focus();
            notValidatedField.first().addClass('focused');
        }

    } else {
        let dataContactNumber = parseInt(parent.find('.contact-information-grouped-single').length) + 1,
            clonedFields = parent.find('.contact-information-grouped-single').first().clone();


        clonedFields.find('.section-title p').html('#' + dataContactNumber);
        clonedFields.attr('data-contact', dataContactNumber);
        let attrName = "grouped-gender-" + dataContactNumber + "-" + dataRow;
        clonedFields.find('.required-group').removeClass('field-validated');
        clonedFields.find('.required-group.radiobox').addClass('field-validated');
        clonedFields.find('.form-control').val('');
        clonedFields.find('.checkbox-holder input').attr('name', attrName);
        clonedFields.append("<input type='hidden' value='" + uniqueKeys + "' class='ticket-category-keys' name='TicketCategoryKeys[]'>");
        updateTotalOnAddPerson(dataRow, unitPrice, "add");
        clonedFields.find('.checkbox-holder').first().find('input').prop('checked', true);
        // radioFieldNameAndId(clonedFields, dataContactNumber, "dataRow");
        clonedFields.prepend("<span class='person-close'>Delete</span>");
        self.closest('.contact-information-inner').find('.contact-information-grouped-wrapper').append(clonedFields);
        let contactNumber = self.closest('.contact-information-inner').find('.contact-information-grouped-wrapper .contact-information-grouped-single').last().attr('data-contact');
        self.closest('.contact-information-inner').find('.contact-information-grouped-wrapper .contact-information-grouped-single').last().find('.section-title').html("<span>Registrant <p style='display:inline-block;margin:0; padding-left:10px;' class='contact-number'># " + contactNumber + "</p>");
        self.closest('.contact-information-inner').find('.contact-information-grouped-wrapper .contact-information-grouped-single').last().find('.gender-selector').val('male');
        self.closest('.contact-information-inner').find('.contact-information-grouped-wrapper .contact-information-grouped-single').last().find('.gender-selector').closest('.form-group.required-group').addClass('field-validated');

        let radioHolder = self.closest('.form-row-ticket-individual').find('.contact-information-inner .contact-information-grouped-wrapper .checkbox-holder');
        radioBoxIdGenerating(radioHolder);
    }

});

//=== PERSON FORM FIELDS AREA CLOSE CLICK EVENT
$(document).on('click', '.person-close', function (e) {
    let self = $(this),
        dataRow = self.closest('.form-row').attr('data-row'),
        unitPrice = self.closest('.form-row').find('.ticket-type-js option:selected').attr('data-unitPrice');
    updateTotalOnAddPerson(dataRow, unitPrice, "remove");

    self.parent().remove();

});

//=== T-SHIRT CHECKBOX CLICK EVENT: ADDING T-SHIRT PRICE INTO CART SUMMARY
$(document).on('change', '.t-shirt-checkbox', function () {
    let self = $(this);

    let ticketText = self.data('name'),
        dataRow = self.closest('.form-row-ticket-individual').data('row'),
        price = self.data('unitprice'),
        row = `<tr id='row-${dataRow}' class='price-row ticket-price-row price-check-${dataRow}' data-row="${dataRow}">
                                    <td class="tr-ticket-text">
                                        ${ticketText}
                                    </td>
                                    <th>
                                        <span class="">
                                            <span class="currency">$</span>
                                            <span class="amount">${price}</span>
                                        </span>
                                    </th>
                                </tr>`;
    $('.sidebar-block-ticket-summary table tbody tr.price-check-'+dataRow).remove();

    if(self.is(':checked')){
        console.log(dataRow);
        $('.sidebar-block-ticket-summary table tbody').append(row);
    }
    calculateTotal();
});



/**
 * -------------------------------------
 * 5. EVENT LISTENER: KEYUP/BLUR
 */

//=== QUANTITY FIELD KEYUP EVENT
$('.quantity-wrap .form-control').on('keyup', function () {
    let self = $(this);
    collectData(self);
    calculateCoupon($('.btn-apply-voucher-js'), false);
});

//=== NAME ON CARD VALIDATION
$('.cc-name').on('keyup blur focus', function (e) {
    let self = $(this);
    // if (nameOnCardValidation(self.val())) {
    if (self.val() == '') {
        self.removeClass('valid');
        self.addClass('invalid');
        // self.closest('.input-wrap').find('.warning-message').hide();
    } else {
        self.removeClass('invalid');
        self.addClass('valid');
    }
});

//=== CREDIT CART FIELD KEYUP EVENT
creditCardField.on('keyup', function (e) {
    card_validation();
});

//=== REQUIRED FORM FIELD KEYUP, BLUR, CHANGE EVENT
$(document).on('keyup blur change', '.form-group.required-group .form-control', function (e) {
    let self = $(this);
    // singleValidation(self, self.parent());
    // activateButtons(self);
});

//=== CVV FIELD KEYUP EVENT
$('.mask-cvv').on('keyup', function () {
    let self = $(this);
    if (self.val().length > 2) {
        self.addClass('valid');
        self.removeClass('invalid');
    } else {
        self.removeClass('valid');
        self.addClass('invalid');
    }
});

//=== INPUT MASKING: ZIPCODE KEYUP EVENT
$('.payment-information .mask-zipcode').on('keyup', function (e) {
    let self = $(this);
    if ($('.payment-information .mask-zipcode').inputmask("isComplete")) {
        self.addClass('valid');
        self.removeClass('invalid');
    } else {
        self.removeClass('valid');
        self.addClass('invalid');
    }
});

//=== PLAIN VALIDATION: ZIPCODE KEYUP EVENT
$('.payment-information .zip-code-plain').on('keyup', function (e) {
    let self = $(this);

    if ($('.payment-information .zip-code-plain').val() !== '') {
        self.addClass('valid');
        self.removeClass('invalid');
    } else {
        self.removeClass('valid');
        self.addClass('invalid');
    }
});



/**
 * -------------------------------------
 * 6. EVENT LISTENER: CHANGE
 */

//===== TICKET CATEGORY SELECT CHANGE EVENT
$(document).on('change', '.ticket-type-js', function (e) {
    e.preventDefault();
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual'),
        ticketText = self.children(':selected').attr('data-text'),
        ticketDataGroup = self.children(':selected').attr('data-group'),
        ticketDataAddon = self.children(':selected').attr('data-addon'),
        ticketDescription = self.children(':selected').attr('data-description'),
        price = self.children(':selected').attr('data-price'),
        unitPrice = self.children(':selected').attr('data-unitPrice'),
        dataRow = mainParent.attr('data-row');
    console.log('this block is not completed yet!');

    if(!self.data('dynamic')) return false;

});

$(document).on('change', '.ticket-type-jss', function (e) {
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

//=== RADIO BUTTON CHANGE EVENT
$(document).on('change', '.gender-radio.required-group input[name=gender]', function (e) {
    let self = $(this);
    self.closest('.form-group').find('.form-control').val(self.val());
    singleValidation(self.closest('.form-group').find('.form-control'), self.parent());
    activateButtons(self.closest('.form-group').find('.form-control'));
});

//=== TERM AND CONDIOTION AGGREMENT CHANGE(CHECKBOX) EVENT
$(document).on('change', '.tc', function (e) {
    let self = $(this);
    singleValidation(self, self.parent());
    // activateButtons(self);
});

//=== COPY INFORMATION FROM ANOTHER FILLED FORM CHANGE(CHECKBOX) EVENT
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

//=== ON LOST BADGE FEE CHANGE EVENT
$(document).on('change', '.lost-badge-check', function (e) {
    console.log('checked');
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual');
    calculateTotalPrice(mainParent);
});

//=== CC YEAR, CC MONTH FIELDS CHANGE EVENT
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

//=== CSRL TICKET SELECT CHANGE EVENT
$(document).on('change', '.csrl-field', function (e) {
    e.preventDefault();
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual'),
        dataRow = mainParent.attr('data-row'),
        totalCsrlTicketPrice = parseInt(self.attr('data-price')) * parseInt(self.val());

    let clonedCsrlSummaryRow = $('.csrl-price-html-wrapper .csrl-price').clone();
    console.log(clonedCsrlSummaryRow);
    clonedCsrlSummaryRow.addClass('csrl-price-' + dataRow);
    clonedCsrlSummaryRow.find('.csrl-quantity').html(self.val());
    clonedCsrlSummaryRow.find('.amount').html(totalCsrlTicketPrice);

    if (parseInt(self.val()) != 0) {

        $('.csrl-price-' + dataRow).remove();
        if ($('.ticket-summary-table .price-' + dataRow).length > 0) {
            console.log('csrl quantity', self.val());
            $('.ticket-summary-table .price-' + dataRow).after(clonedCsrlSummaryRow);
        } else {
            $('.ticket-summary-table tbody').append(clonedCsrlSummaryRow);
        }

    } else {
        $('.csrl-price-' + dataRow).remove();
    }
    calculateTotal();
});

//=== COUNTRY FIELD CHANGE EVENT: GENARATING STATE BASED ON COUNTRY
countryField.on('change', function (e) {
    let self = $(this);
    statesFiller(self);
});

//==== RADIO BOX CHANGE EVENT
$(document).on('change', '.radiobox.required-group input', function (e) {
    let self = $(this);
    self.closest('.form-group.radiobox').addClass('field-validated');
    self.closest('.form-group.radiobox').removeClass('focused');
});


/**
 * -------------------------------------
 * 7. FUNCTION DEFINITION
 */
//=== Perticipant Information CHANGING FROM SECOND ROW
function registrantTextChanging(mainParent) {
    mainParent.closest('.form-body').find('.form-row-ticket-individual:not(.first-row)').find('.contact-information-grouped-single').first().find('.section-title').html("<span>Participant Information</span>");
}

//=== REMOVE CONTACT FIELDS BASED ON ADDON
function removeContactFields(mainParent) {
    mainParent.find('.contact-information-grouped-wrapper .email').closest('.form-group').remove();
    mainParent.find('.contact-information-grouped-wrapper .phone-number-mask').closest('.form-group').remove();
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

/**
 *
 * This function checks whether the given value is valid email or not
 * @param email
 * @return {boolean}
 */
function isEmailValid(email){
    let pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
    return pattern.test(email);
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
    let patternNumber = /^\d+$/;
    return patternNumber.test(string);
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

function calculateTotalPrice(mainParent) {

    let ticketText = mainParent.find('.ticket-type-js').children('option:selected').attr('data-text'),
        ticketDescription = mainParent.find('.ticket-type-js').children('option:selected').attr('data-description'),
        price = mainParent.find('.ticket-type-js option:selected').attr('data-price'),
        // price = mainParent.find('.ticket-type-js').val(),
        dataRow = mainParent.attr('data-row'),
        lostBadge = mainParent.find('.lost-badge-check'),
        isLostBadgeChecked = lostBadge.prop('checked'),
        lostBadgePrice = parseInt(lostBadge.data('value'));

    console.log("data-row: " + dataRow);

    //Have to call

    let row = `<tr id='row-${ticketText}' class='price-row ticket-price-row price-${dataRow}' data-row="${dataRow}">
                                    <td class="tr-ticket-text">
                                        ${ticketText}
                                    </td>
                                    <th>
                                        <span class="">
                                            <span class="currency">$</span>
                                            <span class="amount">${price}</span>
                                        </span>
                                    </th>
                                </tr>`;

    let badgeRow = `<tr class='price-row badge-fee-row price-badge-${dataRow}'>
                                    <td>
                                    Lost Badge Fee
                                    </td>
                                    
                                    <th>
                                        <span class="">
                                            <span class="currency">$</span>
                                            <span class="amount">${lostBadgePrice}</span>
                                        </span>
                                    </th>
                                </tr>`;

    //changed by emdad
    //changed to attr from value
    if (mainParent.find('.ticket-type-js option:selected').attr('data-price') != '0') {
        if ($('.price-' + dataRow).length > 0) {
            if (price == 0) {
                console.log('no data');
                $('.price-' + dataRow).hide();
            } else {
                $('.price-' + dataRow).show();
                $('.price-' + dataRow).find('.tr-ticket-text').text(ticketText);
                $('.price-' + dataRow).find('.amount').text(price);
            }

        } else {
            $(".ticket-summary-table table tbody").append(row);
        }

        if (isLostBadgeChecked) {
            if ($('.price-' + dataRow).length > 0 && !$('.price-badge-' + dataRow).length > 0) {
                $('.price-' + dataRow).after(badgeRow);
            }

        } else {
            if ($('.price-badge-' + dataRow).length > 0) {
                $('.price-badge-' + dataRow).remove();
            }
        }
    } else {
        if ($('.price-' + dataRow).length > 0) {
            $('.price-' + dataRow).find('.amount').text(0);
            $('.price-' + dataRow).hide();
        }
        if ($('.price-' + dataRow).next().length > 0) {
            $('.price-' + dataRow).next().remove();
        }
    }

    calculateTotal();
}

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
    
    calculateGrandTotal();
}

function calculateGrandTotal() {
    let totalPrice = parseInt($('.ticket-summary-table .total-price .amount').html()),
        voucherPrice = parseInt($('.ticket-summary-table .voucher-price .amount').html()),
        grandTotalPrice = totalPrice - voucherPrice;


    //changed by Emdad
    //Update total price hidden field
    $('#sub-total-price').val(totalPrice);
    $('#total-price').val(grandTotalPrice);    

    $('.ticket-summary-table .grand-total-price .amount').html(grandTotalPrice);
    if(grandTotalPrice<=0){
        $('#payment-information').hide();
    }else{
        $('#payment-information').show();
    }

    
}

//=== UPDATE TICKET PRICE AFTER ADD ANOTHER PERSON ACTION
function updateTotalOnAddPerson(dataRow, unitPrice, functionality) {
    let currentAmount = parseInt($('.ticket-summary-table .price-' + dataRow).find('.amount').text());
    let totalPrice = currentAmount;
    if (functionality == "add") {
        totalPrice = totalPrice + parseInt(unitPrice);
    } else {
        totalPrice = totalPrice - parseInt(unitPrice);
    }

    $('.ticket-summary-table .price-' + dataRow).find('.amount').html(totalPrice);

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
        calculateTotal();
        $('.btn-apply-voucher-js').trigger("click");
        $('.form-row-ticket-individual').each(function (i, element) {
            $(element).find('.ticket-row').html(i + 1);
        });
        if ($('.form-row-ticket-individual').length == 1) {
            $('.form-body .form-row-ticket-individual:first').addClass('first-row');
        }
        $('.form-row.form-row-ticket-individual').last().removeClass('edited');
        $('.form-row.form-row-ticket-individual').last().addClass('active');

        pageLoader.removeClass('active');
    }, 600)
}

//=== RADIO FIELD ID GENERATOR FUNCTION
function radioFieldNameAndId(clonedFields, addontext, dataRow) {
    let attrName = "grouped-gender-" + addontext + dataRow,
        genderMaleId = "grouped-gender-male-" + addontext + dataRow,
        genderFemaleId = "grouped-gender-female-" + addontext + dataRow;
    clonedFields.attr('data-contact', 1);

    clonedFields.find('.form-control').val('');
    // clonedFields.find('.checkbox-holder input').prop('checked', false);
    // clonedFields.find('.checkbox-holder input').attr('name',attrName);
    // clonedFields.find('.checkbox-holder.radio-male input').attr('id',genderMaleId);
    // clonedFields.find('.checkbox-holder.radio-male label').attr('for',genderMaleId);

    clonedFields.find('.checkbox-holder.radio-female input').attr('id', genderFemaleId);
    clonedFields.find('.checkbox-holder.radio-female label').attr('for', genderFemaleId);
}

function statesFiller(countryFieldSelector) {
    if (countryFieldSelector.val() == "USA") {
        countryFieldSelector.closest('.form-row').find('.state-field-group .state-holder').html("<select class='form-control state' name='State' id='state'></select>");
        countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='0'>Select a State</option>");
        for (let key in statesJson) {
            countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='" + statesJson[key] + "'>" + statesJson[key] + "</option>")
        }
    } else if (countryFieldSelector.val() == "Canada") {
        countryFieldSelector.closest('.form-row').find('.state-field-group .state-holder').html("<select class='form-control state' name='State' id='state'></select>");
        countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='0'>Select a State</option>");
        for (let key in statesCanadaJson) {
            countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='" + statesCanadaJson[key] + "'>" + statesCanadaJson[key] + "</option>")
        }
    } else {
        countryFieldSelector.closest('.form-row').find('.state-field-group .state-holder').html("<input type='text' class='form-control state' name='State' id='state'>");
    }
}

function ticketGroupManipulation(ticketDataGroup, ticketDataGroup2, typeSelector) {
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


    if (ticketDataGroup == "couple") {
        ticketDataGroup = 2;
    }
    console.log('couple: ' + ticketDataGroup2);
    for (let i = 1; i <= parseInt(ticketDataGroup); i++) {
        let attrName = "grouped-gender-" + i + dataRow,
            genderMaleId = "grouped-gender-male-" + i + dataRow,
            genderFemaleId = "grouped-gender-female-" + i + dataRow;
        clonedFields.attr('data-contact', i);

        clonedFields.find('.form-control').val('');
        // clonedFields.find('.checkbox-holder input').prop('checked', false);
        clonedFields.find('.checkbox-holder input').attr('name', attrName);
        // clonedFields.find('.checkbox-holder.radio-male input').attr('id',genderMaleId);
        // clonedFields.find('.checkbox-holder.radio-male label').attr('for',genderMaleId);

        // clonedFields.find('.checkbox-holder.radio-female input').attr('id',genderFemaleId);
        // clonedFields.find('.checkbox-holder.radio-female label').attr('for',genderFemaleId);
        //=== RADIOID GENERATION
        let uniqueIdd = new Date().getUTCMilliseconds();
        clonedFields.find('.t-shirt-checkbox').attr('id', uniqueIdd);
        clonedFields.find('.t-shirt-checkbox').closest('.checkbox-medium').find('label').attr('for', uniqueIdd);
        let radioHolder = clonedFields.find('.checkbox-holder');
        radioBoxIdGenerating(radioHolder);

        if (clonedFields.find('.contact-number').length > 0) {
            clonedFields.find('.section-title').html("<span>Registrant <p style='display:inline-block;margin:0; padding-left:10px;' class='contact-number'># " + i + "</p></span>");
        }
        clonedFields.find('');
        // typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-single-copy.contact-information-grouped-single').first().find('.section-title').html("<span>Perticipant Information</span>");

        typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped .contact-information-grouped-wrapper').append(clonedFields.clone());
        $('.form-row .contact-information-grouped-single-copy').addClass('contact-information-grouped-single');

        if (ticketDataGroup2 == "couple") {
            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').find('.section-title span').html('Contact Information');
            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').last().find('.section-title span').html('Spouse Information');
            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-inner .btn-holder').hide();
            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').first().find('.checkbox-holder').first().find('input').prop('checked', true);
            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').last().find('.checkbox-holder').last().find('input').prop('checked', true);

            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').last().find('.gender-selector').val('female');
            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').first().find('.gender-selector').val('male');

        } else {
            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-inner .btn-holder').show();
        }

    }
    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-single-copy.contact-information-grouped-single').first().find('.section-title').html("<span>Perticipant Information</span>");
    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped .contact-information-grouped-wrapper .contact-information-grouped-single').append("<input type='hidden' value='" + uniqueKeys + "' class='ticket-category-keys' name='TicketCategoryKeys[]'>");
    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped .contact-information-grouped-wrapper .contact-information-grouped-single').first().find('.ticket-category-keys').remove();
    registrantTextChanging(mainParent);
    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').find('.gender-selector').closest('.form-group.required-group').addClass('field-validated');

    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped .contact-information-grouped-single').show();

}

//=== RADIOBOX ID GENERATING
function radioBoxIdGenerating(radioHolder) {
    let randomUniqueIdMale = (Math.random() + 1).toString(36).substring(4, 7);
    radioHolder.first().find('input').attr('id', randomUniqueIdMale);
    radioHolder.first().find('label').attr('for', randomUniqueIdMale);

    radioHolder.first().find('input').prop('checked', true);

    let randomUniqueIdFemale = (Math.random() + 1).toString(36).substring(4, 7);
    radioHolder.last().find('input').attr('id', randomUniqueIdFemale);
    radioHolder.last().find('label').attr('for', randomUniqueIdFemale);
}

//==== GIVING FOCUS TO THE INVALID FIELDS
function focusToNotValidFields(notValidatedFields) {
    notValidatedFields.first().find('input').focus();
    if (notValidatedFields.find('select')) {
        notValidatedFields.first().find('select').focus();
    }

    if (notValidatedFields.hasClass('radiobox')) {
        notValidatedFields.first().addClass('focused');
    }
}

// created by Emdad
//DataRow added as ticket quantity on #ticket-quantity field
function updateTicketQuantity(dataRow) {
    $('#ticket-quantity').val(dataRow);
}


