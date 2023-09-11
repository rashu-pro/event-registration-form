/**
 * Created by Rashu on 07-03-2022.
 * Last Updated on 05-09-2023
 */

let J = Payment.J,
    creditCardField = $('.cc-number'),
    creditCardHolder = $('.cc-number-holder'),
    creditCardImageHolder = $('.cc-card-identity'),
    btnAddAnotherTicket = $('.btn-add-another-js'),
    pageLoader = $('.loader-div'),
    bannerHeight = $('.main-banner').height();

let ticketDiscountAmount = 0;
let addOnDiscountAmount = 0;
let totalTicketDiscountAmount = 0;

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
        ticketText = self.closest('.quantity-wrap').data('ticket-text'),
        dataMinimum = self.closest('.quantity-wrap').data('minimum'),
        dataMaximum = self.closest('.quantity-wrap').data('maximum');
    if (quantitySelector.val() <= 0) {
        quantitySelector.val(dataMinimum - 1);
    }
    let quantityValue = quantitySelector.val();

    if (quantityValue < dataMaximum) {
        quantitySelector.val(parseInt(quantityValue) + 1);
    }

    updateSubtotal(quantitySelector);

    /**
    collectData(self);
    calculateCoupon($('.btn-apply-voucher-js'), false);
     **/
});

$('.quantity-decrease').on('click', function () {
    let self = $(this),
        quantitySelector = self.closest('.quantity-wrap').find('.form-control'),
        ticketText = self.closest('.quantity-wrap').data('ticket-text'),
        dataMinimum = self.closest('.quantity-wrap').data('minimum'),
        dataMaximum = self.closest('.quantity-wrap').data('maximum');

    let quantityValue = quantitySelector.val();

    if (quantityValue > dataMinimum - 1) {
        quantitySelector.val(parseInt(quantityValue) - 1);
    }
    if (quantityValue <= dataMinimum) {
        quantitySelector.val(0);
    }

    updateSubtotal(quantitySelector);

    /**
    collectData(self);
    calculateCoupon($('.btn-apply-voucher-js'), false);
     **/
});

$('.quantity-wrap .ticket-quantity-js').on('change', function () {
    let self = $(this),
        quantitySelector = self.closest('.quantity-wrap').find('.form-control'),
        quantityValue = quantitySelector.val(),
        ticketText = self.closest('.quantity-wrap').data('ticket-text'),
        dataMinimum = self.closest('.quantity-wrap').data('minimum'),
        dataMaximum = self.closest('.quantity-wrap').data('maximum'),
        warningMessage = '';
    if (parseInt(quantityValue) < parseInt(dataMinimum)) {
        warningMessage = `<p class="error-message text-danger">Select at least ${dataMinimum} ticket. </p>`;
    } else {
        warningMessage = `<p class="error-message text-danger">Select no more than ${dataMaximum} ticket. </p>`;
    }
    if (parseInt(quantityValue) < parseInt(dataMinimum) || parseInt(quantityValue) > parseInt(dataMaximum)) {
        quantitySelector.val(0);
        self.closest('tr').find('.error-message').remove();
        self.closest('tr').append(warningMessage);
    }
    updateSubtotal(self);
    // collectData(self);
    // calculateCoupon($('.btn-apply-voucher-js'), false);
});

//=== ADDON TICKET CLICK ACTION
let ticketCount = 1;
$('.addon-quantity-increase').on('click', function () {
    let self = $(this),
        quantitySelector = self.closest('.quantity-wrap').find('.form-control'),
        attendeeInfoRequired = parseInt(self.closest('.quantity-wrap').attr("data-attendee-is-required")),
        ticketText = self.closest('.quantity-wrap').data('data-text'),
        dataMinimum = self.closest('.quantity-wrap').data('minimum'),
        dataMaximum = self.closest('.quantity-wrap').data('maximum');
    if (quantitySelector.val() <= 0) {
        quantitySelector.val(dataMinimum - 1);
    }
    let quantityValue = quantitySelector.val();

    if (quantityValue < dataMaximum) {
        quantitySelector.val(parseInt(quantityValue) + 1);
    }

    totalQty = parseInt(quantityValue) + 1;


    ticketSummaryInTheCart($('.addon-ticket-quantity-js'));

    if (attendeeInfoRequired) {
        var attendeeWrapper = $(".single-ticket-js").find(".attendee-wrapper").last().clone();
        var addonText = self.closest('.quantity-wrap').attr("data-text");

        //var dataRow = self.closest('.quantity-wrap').attr("data-text");
        //debugger;
        //$('.addon-wrapper-js').append($('.ticket-html-wrapper-js .form-row-js').clone());
        ////attendeeWrapper.removeClass("attendee-wrapper").addClass("addon-attendee-wrapper");
        //$('.addon-wrapper-js .form-row-js').last().find('.ticket-row-title-js').html(ticketText);
        //$('.addon-wrapper-js .form-row-js').last().find('.ticket-count-js').html(totalQty);

        $(".addon-wrapper-js").append(attendeeWrapper);
        $(".addon-attendee-js").removeClass("d-none");

        $(".addon-attendee-js").find(".ticket-row-title-js").html(addonText);
        var a = $(".addon-attendee-js").find(".ticket-number-js");
        a.removeClass("ticket-number-js").addClass("addon-number-js-" + ticketCount);
        $(".addon-number-js-" + ticketCount).html(ticketCount);
    }
    ticketCount++;

});

$('.addon-quantity-decrease').on('click', function () {
    let self = $(this),
        quantitySelector = self.closest('.quantity-wrap').find('.form-control'),
        ticketText = self.closest('.quantity-wrap').data('ticket-text'),
        dataMinimum = self.closest('.quantity-wrap').data('minimum'),
        dataMaximum = self.closest('.quantity-wrap').data('maximum');

    let quantityValue = quantitySelector.val();

    if (quantityValue > dataMinimum - 1) {
        quantitySelector.val(parseInt(quantityValue) - 1);
    }
    if (quantityValue <= dataMinimum) {
        quantitySelector.val(0);
    }

    ticketSummaryInTheCart($('.addon-ticket-quantity-js'));

    $(".addon-wrapper-js .attendee-wrapper:last-child").remove();
    ticketCount--;

    if (ticketCount <= 1) {
        ticketCount = 1;
        $(".addon-attendee-js").addClass("d-none");
    }
});

$('.quantity-wrap .addon-ticket-quantity-js').on('change', function () {
    let self = $(this),
        quantitySelector = self.closest('.quantity-wrap').find('.form-control'),
        quantityValue = quantitySelector.val(),
        ticketText = self.closest('.quantity-wrap').data('ticket-text'),
        dataMinimum = self.closest('.quantity-wrap').data('minimum'),
        dataMaximum = self.closest('.quantity-wrap').data('maximum'),
        warningMessage = '';
    if (parseInt(quantityValue) < parseInt(dataMinimum)) {
        warningMessage = `<p class="error-message text-danger">Select at least ${dataMinimum} ticket. </p>`;
    } else {
        warningMessage = `<p class="error-message text-danger">Select no more than ${dataMaximum} ticket. </p>`;
    }
    if (parseInt(quantityValue) < parseInt(dataMinimum) || parseInt(quantityValue) > parseInt(dataMaximum)) {
        quantitySelector.val(0);
        self.closest('tr').find('.error-message').remove();
        self.closest('tr').append(warningMessage);
    }
    ticketSummaryInTheCart($('.addon-ticket-quantity-js'));
});

//=== I agree button click action
$(document).on('click', '.btn-agree-terms', function () {
    let self = $(this);
    $(self.attr('data-target')).prop('checked', true);
})

/**
 * Adds ticket int cart summary
 * @param ticketQuantitySelector
 */
function ticketSummaryInTheCart(ticketQuantitySelector) {
    let ticketText;
    let ticketSummaryHtmlString = '';
    let totalPrice = 0;
    ticketQuantitySelector.each(function (i, element) {
        let quantity = parseInt($(element).val());
        ticketText = $(element).closest('.quantity-wrap').attr('data-text')
        if (!quantity) {
            ticketSummaryHtmlString += '';
            return;
        }

        $(element).closest('.quantity-wrap').find('.ticket-category-key').addClass('ticket-selected');
        let dataRow = $(element).closest('.quantity-wrap').attr('data-row');
        let price = parseInt($(element).closest('.quantity-wrap').attr('data-price'));
        totalPrice = price * quantity;


        ticketSummaryHtmlString += `<tr id='row-${dataRow}' class='price-row addon-price-row ticket-price-row price-${dataRow}' data-row="${dataRow}">
                                    <td class="tr-ticket-text">
                                        ${ticketText}
                                    </td>
                                    <th>
                                        <span class="">
                                            <span class="currency">$</span>
                                            <span class="amount">${totalPrice}</span>
                                        </span>
                                    </th>
                                </tr>`;
    })

    $('.ticket-summary-table tbody .addon-price-row').remove();
    if (ticketSummaryHtmlString || ticketSummaryHtmlString === '') {
        $('.ticket-summary-table tbody').append(ticketSummaryHtmlString);
    }

    let discountTd = $('#member_discount td:first-child').html(); // Discount (10 %)
    let discountPercentage = parseFloat(discountTd.replace(/[^\d.]/g, "")); // extract int value from string
    if (discountPercentage > 0) {
        //let discount_amount = totalPrice * (discountPercentage / 100.00).toFixed(2);
        discount_amount = totalTicketDiscountAmount * (discountPercentage / 100.00).toFixed(2);
        $('.discount_amount').html(discount_amount);
    }

    calculateTotal();
}


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
        notValidatedField = $('.form-row.active .required-group:not(.field-validated)'),
        notValidatedEmailFieldsSelector = $('.email-information-wrapper-js .required-group:not(.field-validated)'),
        notValidatedEmailFields = notValidatedEmailFieldsSelector.length;

    let isChecked = $('#tc-2').prop('checked');

    //=== CHECK WHETHER AT LEAST A TICKET INFORMATION IS BEING FILLED UP
    if ($('.ticket-wrapper-js .form-row-js').length < 1) {
        $('.ticket-information-js .warning-message').remove();
        goToTheSection('.ticket-information-js');
        let errorMessage = $('.ticket-info-foot-js').attr('data-error-message');
        let errorMessageHtml = `<p class="m-0 mt-3 warning-message text-danger text-center">${errorMessage}</p>`;
        $('.ticket-info-foot-js').append(errorMessageHtml);
        return;
    }

    //=== CHECK IF ANY ADDON TICKET SELECTED WHICH NEEDS ATTENDEE INFORMATION
    let addonTicketSelected = 0;
    let addonTicketChecked = parseInt($('.addon-holder-foot-js').attr('data-checked'));
    let addonFormRow = $('.addon-ticket-info-collection-wrapper-js .form-row').length;
    $('.addon-ticket-quantity-js').each(function (i, element) {
        if (parseInt($(element).val()) > 0 && $(element).closest('.quantity-wrap').attr('data-info-required')) {
            addonTicketSelected += 1;
        }
    })


    if (addonTicketSelected > 0 && !addonFormRow) {
        $('.addon-holder-js .warning-message').remove();
        goToTheSection('.addon-holder-foot-js');
        let errorMessage = $('.addon-holder-foot-js').attr('data-error-message');
        let errorMessageHtml = `<p class="m-0 mt-3 warning-message text-danger text-center">${errorMessage}</p>`;
        $('.addon-holder-foot-js').append(errorMessageHtml);
        $('.addon-holder-foot-js').attr('data-checked', 1);
        return;
    }

    //=== Contact Fields Validation Needed
    if (notValidatedField.length > 0) {
        console.log('contact field!');
        focusToNotValidFields(notValidatedField);
        return;
    }

    //=== Billing Fields Validation Needed
    if (notValidatedEmailFields > 0) {
        console.log('billing field!');
        focusToNotValidFields(notValidatedEmailFieldsSelector);
        return;
    }

    if (notValidatedBillingFields > 0) {
        focusToNotValidFields(notValidatedBillingFieldsSelector);
        return;
    }

    //=== Payment Fields Validation Needed
    if (parseInt($('.grand-total-price .amount').text()) > 0 && !$('#bill-later').prop('checked')) {
        if ((paymentFields) != paymentValidFields) {
            paymentFieldNotValidatdSelector.first().focus();
            return;
        }
    }

    //=== Terms & Condition Field Validation Needed
    if (!isChecked) {
        $('#tc-2').closest('.tc-wrapper').find('.alert').css('border', '2px solid #dc3545');
        setTimeout(function () {
            $('#tc-2').closest('.tc-wrapper').find('.alert').css('border', '1px solid #084298');
        }, 300);
        return;
    }

    pageLoader.find('.loader-message-js').remove();

    let loaderMessage = `<p class="alert alert-warning loader-message loader-message-js">Once you click proceed, the process may take up to two minutes. Please wait and DO NOT close your browser until you see the confirmation page.</p>`;
    pageLoader.append(loaderMessage);

    registrationConfirmation();

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
    if (self.val() == '') {
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

//==== PRIMARY REGISTRANT CHANGING FROM SECOND ROW
function registrantTextChanging(mainParent) {
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
        self.closest('.form-row-ticket-individual').find('.contact-information-grouped-single-copy').find('.section-title span').html('Primary Registrant');
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

//===== REMOVE CONTACT FIELDS BASED ON ADDON
function removeContactFields(mainParent) {
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
    calculateTotalPrice(mainParent);
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
    "mask": "9999",
    placeholder: ""
});

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

//===== DEFINITION FOR FUNCTIONS
function card_validation() {
    let number = document.querySelector('.cc-number');
    //Payment.formatCardNumber(number);
    J.toggleClass(document.querySelectorAll('input'), 'invalid');
    let cardType = Payment.fns.cardType(J.val(number));
    // J.toggleClass(number, 'invalid', !Payment.fns.validateCardNumber(J.val(number)));
    if (cardType) {
        creditCardField.addClass(cardType);
        creditCardImageHolder.html("<img src='/Content/event-management-assets/individual-multiple-assets/images/" + cardType + ".png'>");
        // creditCardImageHolder.html("<img src='assets/images/" + cardType + ".png'>");
    } else {
        console.log('no card selected');
        creditCardImageHolder.html("<img src='/Content/event-management-assets/individual-multiple-assets/images/unknown.png'>");
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

    $(ticketQuantitySelector).each(function (i, element) {
        let ticketText = $(element).closest('tr').find('.ticket-name-js').attr('data-name');
        let dataRow = i;
        let price = parseInt($(element).val()) * parseInt($(element).closest('tr').find('.per-price .amount').text())
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
        if (parseInt($(element).val())) {
            $('.ticket-summary-table tbody').append(row);
        }
    })

    //changed by emdad
    //changed to attr from value
    /**
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
     **/

    calculateTotal();
}

function calculateTotal() {
    let totalPrice = 0,
        sidebarPriceRow = $('.sidebar-block .price-row'),
        sidebarTicketPriceRow = $('.sidebar-block .ticket-price-row'),
        processingFees = 0;

    let ticketCount = 0;
    $('.cart-table-js .ticket-quantity-js').each(function (i, element) {
        if (!$(element).val()) return;
        ticketCount += parseInt($(element).val());
    })

    let addOnCount = 0;
    $('.addon-ticket-js .addon-ticket-quantity-js').each(function (i, element) {
        if (!$(element).val()) return;
        addOnCount += parseInt($(element).val());
    })

    ticketCount = ticketCount + addOnCount;

    sidebarPriceRow.each(function (i, obj) {
        totalPrice = totalPrice + parseInt($(obj).find('.amount').text());
    });

    $('.ticket-summary-table .total-price .amount').html(totalPrice);

    $('.processing-fees-tr-js').hide();
    $('.processing-fees-tr-js .amount').html(processingFees);
    if (totalPrice > 0 && $('.processing-fees-tr-js').length > 0) {
        processingFees = calculateProcessingFees(totalPrice);
        $('.processing-fees-tr-js').show();
        $('.processing-fees-tr-js .amount').html(processingFees);
    }



    showPaymentForm(totalPrice);
    let grandTotal = calculateGrandTotal();
    $('.billing-information-wrapper .price-note .ticket-count').html(ticketCount);
    $('.billing-information-wrapper .price-note .total-price').html(grandTotal);

    // debugger;

    //let discountTd = $('#member_discount td:first-child').html(); // Discount (10 %)
    //let discountPercentage = parseFloat(discountTd.replace(/[^\d.]/g, "")); // extract int value from string
    //if (discountPercentage > 0) {
    //    let discount_amount = totalPrice * (discountPercentage / 100.00).toFixed(2);
    //    $('.discount_amount').html(discount_amount);
    //    totalPrice = totalPrice - discount_amount < 0 ? 0 : totalPrice - discount_amount;
    //}

    return totalPrice;
}


function calculateGrandTotal() {
    let totalPrice = parseInt($('.ticket-summary-table .total-price .amount').html()),
        processingFees = $('.processing-fees-tr-js').length > 0 ? parseFloat($('.processing-fees-tr-js .amount').text()) : 0,
        voucherPrice = $('.ticket-summary-table .voucher-price').length > 0 ? parseInt($('.ticket-summary-table .voucher-price .amount').html()) : 0;

    if (totalPrice === voucherPrice) {
        $('.processing-fees-tr-js .amount').text(0);
        processingFees = 0;
    }
    // processingFees = processingFees.toFixed(2);
    // debugger;

    //changed by Emdad
    //Update total price hidden field
    $('#sub-total-price').val(totalPrice);

    let discountTd = $('#member_discount td:first-child').html(); // Discount (10 %)
    let discountPercentage = parseFloat(discountTd.replace(/[^\d.]/g, "")); // extract int value from string
    let discount_amount = 0;
    if (discountPercentage > 0) {
        //discount_amount = totalPrice * (discountPercentage / 100.00).toFixed(2);
        discount_amount = totalTicketDiscountAmount * (discountPercentage / 100.00).toFixed(2);
        $('.discount_amount').html(discount_amount);
    }

    let totalDiscountAmount = voucherPrice + discount_amount;
    $('#discount-total-amount').val(totalDiscountAmount);

    let grandTotalPrice = parseFloat((totalPrice + processingFees) - (voucherPrice + discount_amount)).toFixed(2);

    $('#total-price').val(grandTotalPrice);

    $('.ticket-summary-table .grand-total-price .amount').html(grandTotalPrice);
    $('.billing-information-wrapper-js .price-note .total-price').html(grandTotalPrice);
    //this line of code will show the amount in confirm modal
    $('.amount-to-be-paid').html(grandTotalPrice);

    if (grandTotalPrice <= 0) {
        $('#payment-information').hide();
    } else {
        $('#payment-information').show();
    }
    return grandTotalPrice;
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

//=== CSRL TICKET SELECT FUNCTIONALITY
$(document).on('change', '.csrl-field', function (e) {
    e.preventDefault();
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual'),
        dataRow = mainParent.attr('data-row'),
        totalCsrlTicketPrice = parseInt(self.attr('data-price')) * parseInt(self.val());

    let clonedCsrlSummaryRow = $('.csrl-price-html-wrapper .csrl-price').clone();
    //console.log(clonedCsrlSummaryRow);
    clonedCsrlSummaryRow.addClass('csrl-price-' + dataRow);
    clonedCsrlSummaryRow.find('.csrl-quantity').html(self.val());
    clonedCsrlSummaryRow.find('.amount').html(totalCsrlTicketPrice);

    if (parseInt(self.val()) != 0) {

        $('.csrl-price-' + dataRow).remove();
        if ($('.ticket-summary-table .price-' + dataRow).length > 0) {
            //console.log('csrl quantity', self.val());
            $('.ticket-summary-table .price-' + dataRow).after(clonedCsrlSummaryRow);
        } else {
            $('.ticket-summary-table tbody').append(clonedCsrlSummaryRow);
        }

    } else {
        $('.csrl-price-' + dataRow).remove();
    }
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
        "Yukon": "Yukon"
    };

statesFiller(countryField);

countryField.on('change', function (e) {
    let self = $(this);
    statesFiller(self);
});

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

//==== RADIO BOX CHANGE
// $('.radiobox.required-group input').on('change',function (e) {
$(document).on('change', '.radiobox.required-group input', function (e) {
    let self = $(this);
    self.closest('.form-group.radiobox').addClass('field-validated');
    self.closest('.form-group.radiobox').removeClass('focused');
});

//==== ADDING ANOTHER GROUP OF TICKETS
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
    //console.log('couple: ' + ticketDataGroup2);
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
        let radioHolder = clonedFields.find('.checkbox-holder');
        radioBoxIdGenerating(radioHolder);

        if (clonedFields.find('.contact-number').length > 0) {
            clonedFields.find('.section-title').html("<span>Registrant <p style='display:inline-block;margin:0; padding-left:10px;' class='contact-number'># " + i + "</p></span>");
        }
        // typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-single-copy.contact-information-grouped-single').first().find('.section-title').html("<span>Primary Registrant</span>");

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
    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-single-copy.contact-information-grouped-single').first().find('.section-title').html("<span>Primary Registrant</span>");
    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped .contact-information-grouped-wrapper .contact-information-grouped-single').append("<input type='hidden' value='" + uniqueKeys + "' class='ticket-category-keys' name='TicketCategoryKeys[]'>");
    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped .contact-information-grouped-wrapper .contact-information-grouped-single').first().find('.ticket-category-keys').remove();
    registrantTextChanging(mainParent);
    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').find('.gender-selector').closest('.form-group.required-group').addClass('field-validated');

    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped .contact-information-grouped-single').show();

}

$(document).on('click', '.person-close', function (e) {
    let self = $(this),
        dataRow = self.closest('.form-row').attr('data-row'),
        unitPrice = self.closest('.form-row').find('.ticket-type-js option:selected').attr('data-unitPrice');
    updateTotalOnAddPerson(dataRow, unitPrice, "remove");

    self.parent().remove();

});

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
let radioHolder = $('.contact-information-inner.contact-information-single .contact-information-grouped-wrapper .checkbox-holder');
radioBoxIdGenerating(radioHolder);

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


if ($('.ticket-summary-table').length > 0) {
    $('.ticket-summary-table').closest('.sidebar-block').addClass('sidebar-block-ticket-summary');
}

// created by Emdad
//DataRow added as ticket quantity on #ticket-quantity field
function updateTicketQuantity(dataRow) {
    $('#ticket-quantity').val(dataRow);
}

//=== 14/05/2023
let carTableSelector = '.cart-table-js';
let ticketQuantitySelector = '.ticket-quantity-js';
let addonTicketQuantitySelector = '.addon-ticket-quantity-js';

//=== GENERATES TICKET
$(document).on('click', '.btn-generate-ticket-js', function (e) {
    e.preventDefault();
    let self = $(this);
    let totalTicket = 0;
    ticketDiscountAmount = 0;
    $(ticketQuantitySelector).each(function (i, element) {
        totalTicket += parseInt($(element).val());
    });

    $('.ticket-information-js .warning-message').remove();
    $(carTableSelector).find('.error-message').remove();
    if (!totalTicket) {
        $(carTableSelector).append('<p class="error-message text-danger">Please select a ticket</p>');
        $('.ticket-quantity-js').first().focus();
        return;
    }


    pageLoader.addClass('active');

    setTimeout(function () {
        $('.ticket-wrapper-js').html('');
        $('.ticket-summary-js').html('');

        //== GENERATES TICKET
        $(ticketQuantitySelector).each(function (i, element) {
            let quantity = parseInt($(element).val());
            let attendeeNumber = parseInt($(element).attr('data-limit'));
            let isDiscountable = parseInt($(element).closest('.quantity-wrap').attr('discountable')) == 1 ? true : false;
            let isBatchNoNeeded = parseInt($(element).closest('.quantity-wrap').attr('batch-no-required')) == 1 ? true : false;

            let dataRow = parseInt($(element).closest('.table-row').attr('data-row'));
            if (!quantity) {
                return;
            }
            $(element).closest('.table-row').find('.ticket-category-key').addClass('ticket-selected');

            let ticketText = $(element).closest('.table-row').find('.ticket-name-js').attr('data-name');
            let price = parseInt($(element).val()) * parseInt($(element).closest('.table-row').find('.per-price .amount').text());
            let perPrice = parseInt($(element).closest('.table-row').find('.per-price .amount').text());
            if (isDiscountable && quantity > 0) {
                ticketDiscountAmount += price;
            }
            let ticketSummaryRow = `<div class="ticket-summary-row" data-row="${dataRow}">
                                                <span class="ticket-number d-inline-block" style="position: relative"><span class="ticket-number-js">${quantity}</span> ticket${quantity > 1 ? 's' : ''}</span>
                                                <p class="mb-1">${ticketText}</p>
                                                <p class="mb-2">$<span class="amount">${$(element).closest('.table-row').find('.per-price .amount').text()}</span> X <span class="quantity">${quantity}</span> = <strong>$<span class="subtotal">${price}</span></strong></p>
                                            </div>`;
            let ticketCategoryKey = $(element).closest('.table-row').find('.ticket-category-key.ticket-selected').val();
            $('.ticket-summary-js').append(ticketSummaryRow);


            $('.ticket-wrapper-js').append($('.ticket-html-wrapper-js .form-row-js').clone());
            $('.ticket-wrapper-js .form-row-js').last().attr('data-row', dataRow);
            $('.ticket-wrapper-js .form-row-js').last().attr('data-key', ticketCategoryKey);
            $('.ticket-wrapper-js .form-row-js').last().attr('data-limit', $(element).attr('data-limit'));
            $('.ticket-wrapper-js .form-row-js').last().find('.ticket-row-title-js').html(ticketText);

            if (parseInt($(element).attr('data-limit')) < 2) {
                $('.ticket-wrapper-js .form-row-js').last().removeClass('ticket-pack');
            }

            for (let j = 1; j <= quantity; j++) {
                $('.ticket-wrapper-js .form-row-js[data-row=' + dataRow + '] .single-ticket-wrapper-js').append(`<div class="ticket-wrapper"></div>`);
                for (let k = 1; k <= attendeeNumber; k++) {
                    $('.ticket-wrapper-js .form-row-js[data-row=' + dataRow + '] .single-ticket-wrapper-js .ticket-wrapper').last().append($('.single-ticket-html-js .single-ticket-js').clone());
                    $('.ticket-wrapper-js .form-row-js[data-row=' + dataRow + '] .single-ticket-wrapper-js .single-ticket-js .ticket-category-key').val(ticketCategoryKey);

                    //=== Removes required-group class from the form group if the attendee information is not required
                    if (!parseInt($(element).closest('.quantity-wrap').attr('data-attendee-is-required'))) {
                        //console.log('attendee information not required!');
                        $('.ticket-wrapper-js .form-row-js').last().find('.form-group').removeClass('required-group');
                    }

                    if (isBatchNoNeeded) {
                        $('.ticket-wrapper-js .form-row-js[data-row=' + dataRow + '] .single-ticket-wrapper-js .single-ticket-js .batch-no-field').removeClass('d-none');
                    }

                    //=== ADDS TICKET REMOVE BUTTON
                    $('.ticket-wrapper-js .form-row-js[data-row=' + dataRow + '] .single-ticket-wrapper-js .single-ticket-js').last().find('.attendee-wrapper .attendee-wrapper-head .action-btn-wrapper').append($('.remove-ticket-btn-wrapper-html .btn-remove-ticket-js').clone());
                    $('.ticket-wrapper-js .form-row-js[data-row=' + dataRow + '] .single-ticket-wrapper-js .single-ticket-js').last().find('.attendee-wrapper .attendee-wrapper-head .action-btn-wrapper .btn-remove-ticket-js').attr('data-row', dataRow);
                    $('.ticket-wrapper-js .form-row-js[data-row=' + dataRow + '] .single-ticket-wrapper-js .single-ticket-js').last().find('.attendee-wrapper .attendee-wrapper-head .action-btn-wrapper .btn-remove-ticket-js').attr('data-price', perPrice);
                }

                //=== Keeps only first attendee information required
                if (parseInt($(element).closest('.quantity-wrap').attr('data-attendee-is-required-only-one'))) {
                    $('.ticket-wrapper-js .form-row-js[data-row=' + dataRow + '] .single-ticket-wrapper-js .single-ticket-js').first().find('.form-group').addClass('required-group');
                }

                //=== Add is alumnai checkbox for spouse information for DAANA
                if ($(element).closest('.quantity-wrap').attr('data-ticket-type') === 'couple') {
                    $('.ticket-wrapper-js .form-row-js[data-row=' + dataRow + '] .single-ticket-wrapper-js .single-ticket-js').last().find('.batch-number-group-js').addClass('d-none');
                    $('.ticket-wrapper-js .form-row-js[data-row=' + dataRow + '] .single-ticket-wrapper-js .single-ticket-js').last().find('.batch-number-group-js').removeClass('required-group');

                    $('.ticket-wrapper-js .form-row-js[data-row=' + dataRow + '] .single-ticket-wrapper-js .single-ticket-js').last().find('.is-alumnai-js').removeClass('d-none');
                    $('.ticket-wrapper-js .form-row-js[data-row=' + dataRow + '] .single-ticket-wrapper-js .single-ticket-js').last().find('.is-alumnai-checkbox-js').attr('id', 'is-alumnai' + dataRow+'-'+j);
                    $('.ticket-wrapper-js .form-row-js[data-row=' + dataRow + '] .single-ticket-wrapper-js .single-ticket-js').last().find('.is-alumnai-label').attr('for', 'is-alumnai' + dataRow+'-'+j);
                }

            }

            $('.ticket-wrapper-js .form-row-js[data-row=' + dataRow + '] .ticket-count-js').html(quantity);
            updateAttendeeNumber(dataRow);
        })

        $('.ticket-summary-js').append($('.update-ticket-information-warning-html-js .update-ticket-information-wrapper').clone());
        addTicketSummaryAndCalculateTotalPrice();
        ticketSummaryInTheCart($('.addon-ticket-quantity-js'));
        changeTicketUtitlity();

        $('.addon-holder-js').removeClass('d-none');
        $('.addon-ticket-wrapper').removeClass('d-none');
        //== HIDE THE MEMBERSHIP ADDON TICKETS INITIALY. AFTER EMAIL VERIFICATION THE MEMBERSHIP ADDON TICKET WILL SHOW.
        $('.addon-ticket-wrapper-member-js').addClass('d-none');
        $('.billing-information-wrapper-js').removeClass('d-none');
        $('.email-information-wrapper-js').removeClass('d-none');
        pageLoader.removeClass('active');
        totalTicketDiscountAmount = ticketDiscountAmount;
    }, 600)

})

//=== GENERATES ADDON TICKET
$(document).on('click', '.btn-generate-addon-ticket-js', function (e) {
    e.preventDefault();
    let self = $(this),
        totalTicket = 0;
    addOnDiscountAmount = 0;
    $(addonTicketQuantitySelector).each(function (i, element) {
        if (parseInt($(element).closest('.quantity-wrap').attr('data-info-required'))) {
            totalTicket += parseInt($(element).val());
        }
    })
    //console.log('total addon ticket: ', totalTicket);

    // removes all the warning message from addon ticket div
    $('.addon-holder-js .warning-message').remove();

    // if theres no addon ticket which required attendee information
    //-- is selected then break here
    if (!totalTicket) {
        return;
    }

    pageLoader.addClass('active');

    let addOnTicketWrapperSelector = $('.addon-ticket-info-collection-wrapper-js');
    setTimeout(function () {
        addOnTicketWrapperSelector.html('');
        $('.addon-ticket-summary-js').html('');

        //=== generates addon ticket information collection wrapper
        $(addonTicketQuantitySelector).each(function (i, element) {
            let quantity = parseInt($(element).val());
            // console.log('quantity: ', quantity);
            let attendeeNumber = parseInt($(element).attr('data-limit'));
            // console.log('attendee number: ', attendeeNumber);
            let dataRow = parseInt($(element).closest('.quantity-wrap').attr('data-row'));
            console.log(dataRow);
            // console.log('data row: ', dataRow);
            let ticketTitle = $(element).closest('.quantity-wrap').attr('data-text');
            // console.log('ticket title: ', ticketTitle);
            let perPrice = parseInt($(element).closest('.quantity-wrap').attr('data-price'));
            // console.log('per price: ', perPrice);
            let price = quantity * perPrice;
            // console.log('total price: ', price);
            let ticketCategoryKey = $(element).closest('.quantity-wrap').find('.ticket-addOn-key').val();
            // console.log('ticket category key: ', ticketCategoryKey);
            let isDiscountable = parseInt($(element).closest('.quantity-wrap').attr('discountable')) == 1 ? true : false;
            let isBatchNoRequired = parseInt($(element).closest('.quantity-wrap').attr('batch-no-required')) == 1 ? true : false;
            if (isDiscountable && quantity > 0) {
                addOnDiscountAmount += price;
            }

            // if quantity is greater than 0
            if (quantity) {
                let ticketSummaryRow = `<div class="ticket-summary-row" data-row="${dataRow}">
                                                <span class="ticket-number d-inline-block" style="position: relative"><span class="ticket-number-js">${quantity}</span> ticket${quantity > 1 ? 's' : ''}</span>
                                                <p class="mb-1">${ticketTitle}</p>
                                                <p class="mb-2">$<span class="amount">${perPrice}</span> X <span class="quantity">${quantity}</span> = <strong>$<span class="subtotal">${price}</span></strong></p>
                                            </div>`;

                $('.addon-ticket-summary-js').append(ticketSummaryRow);
                // console.log("---------------");

                if (parseInt($(element).closest('.quantity-wrap').attr('data-info-required'))) {
                    $(element).closest('.quantity-wrap').find('.ticket-addOn-key').addClass('ticket-selected');

                    // adds the info collection div into the wrapper
                    addOnTicketWrapperSelector.append($('.addon-ticket-html-wrapper-js .form-row-js').clone());
                    addOnTicketWrapperSelector.find('.form-row-js').last().attr('data-row', dataRow);
                    addOnTicketWrapperSelector.find('.form-row-js').last().attr('data-key', ticketCategoryKey);
                    addOnTicketWrapperSelector.find('.form-row-js').last().attr('data-limit', $(element).attr('data-limit'));
                    addOnTicketWrapperSelector.find('.form-row-js').last().find('.ticket-row-title-js').html(ticketTitle);

                    // remove ticket pack class if the ticket needs only one attendee information
                    if (parseInt($(element).attr('data-limit')) < 2) {
                        addOnTicketWrapperSelector.find('.form-row-js').last().removeClass('ticket-pack');
                    }

                    // populate attendee info collector div into wrapper
                    for (let j = 1; j <= quantity; j++) {
                        addOnTicketWrapperSelector.find('.form-row-js[data-row=' + dataRow + '] .single-ticket-wrapper-js').append(`<div class="ticket-wrapper"></div>`);

                        // populate info wrapper by attendee number
                        for (let k = 1; k <= attendeeNumber; k++) {
                            if (parseInt($(element).closest('.quantity-wrap').attr('data-attendee-differ'))) {
                                addOnTicketWrapperSelector.find('.form-row-js[data-row=' + dataRow + '] .single-ticket-wrapper-js .ticket-wrapper').last().append($('.addon-single-ticket-html-js .single-ticket-js').clone());
                            } else {
                                addOnTicketWrapperSelector.find('.form-row-js[data-row=' + dataRow + '] .single-ticket-wrapper-js .ticket-wrapper').last().append($('.single-ticket-html-js .single-ticket-js').clone());
                            }
                            addOnTicketWrapperSelector.find('.form-row-js[data-row=' + dataRow + '] .single-ticket-wrapper-js .single-ticket-js .ticket-category-key').val(ticketCategoryKey);

                            //=== Removes required-group class from the form group if the attendee information is not required
                            if (!parseInt($(element).closest('.quantity-wrap').attr('data-attendee-is-required'))) {
                                console.log('attendee information not required!');
                                addOnTicketWrapperSelector.find('.form-row-js').last().find('.form-group').removeClass('required-group');
                            }
                        }
                        if (isBatchNoRequired) {
                            addOnTicketWrapperSelector.find('.form-row-js[data-row=' + dataRow + '] .single-ticket-wrapper-js  .single-ticket-js .batch-no-field').removeClass('d-none');
                        }
                    }

                    // set ticket count number
                    addOnTicketWrapperSelector.find('.form-row-js[data-row=' + dataRow + '] .ticket-count-js').html(quantity);
                    updateAttendeeNumber(dataRow);
                }
            }
        })

        $('.addon-ticket-summary-js').append($('.update-addon-ticket-information-warning-html-js .update-ticket-information-wrapper').clone());

        changeAddonTicketUtitlity();
        pageLoader.removeClass('active');
        totalTicketDiscountAmount = ticketDiscountAmount + addOnDiscountAmount;

        if (addOnDiscountAmount > 0) {
            $('.verify-email').trigger('click');
        }

    }, 600)



})



$(document).on('click', '.add-another-ticket-js', function (e) {
    e.preventDefault();
    let self = $(this);
    let dataRow = self.closest('.form-row-js').attr('data-row');
    let quantity = parseInt(self.closest('.form-row-js').find('.form-row-head .ticket-count-js').text());
    let perPrice = $('.cart-table-js .table-row[data-row=' + dataRow + '] .per-price .amount').text();

    let clonedDiv = self.closest('.form-row-js').find('.ticket-wrapper').first().clone();

    clonedDiv.find('.form-group').removeClass('field-validated');
    clonedDiv.find('.form-group').removeClass('field-invalid');
    clonedDiv.find('.error-message').remove();
    clonedDiv.find('.form-control').val('');
    clonedDiv.css('display', 'none');
    self.closest('.form-row-js').find('.single-ticket-wrapper-js').append(clonedDiv);
    clonedDiv.slideDown();

    quantity = quantity + 1
    addTicket(dataRow, quantity, perPrice);
    updateAttendeeNumber(dataRow);
})

$(document).on('click', '.add-more-attendee-js', function (e) {
    e.preventDefault();
    let self = $(this);
    let dataRow = self.closest('.form-row-js').attr('data-row');
    let dataLimit = self.closest('.form-row-js').attr('data-limit');

    let clonedDiv = self.closest('.single-ticket-js').find('.attendee-wrapper-box-js .attendee-wrapper').last().clone();
    clonedDiv.find('.form-group').removeClass('field-validated');
    clonedDiv.find('.form-group').removeClass('field-invalid');
    clonedDiv.find('.error-message').remove();
    let removeBtn = $('.remove-btn-wrapper-html .btn-remove-js').clone();
    removeBtn.attr('data-remove', '.attendee-wrapper');
    clonedDiv.find('.form-control').val('');
    clonedDiv.find('.attendee-number-js').html(parseInt(clonedDiv.find('.attendee-number-js').text()) + 1);
    clonedDiv.find('.attendee-wrapper-head').append(removeBtn);

    clonedDiv.css('display', 'none');

    self.closest('.single-ticket-js').find('.attendee-wrapper-box-js').append(clonedDiv);
    clonedDiv.slideDown();
    attendeeLimit(dataRow, dataLimit);
})

$(document).on('click', '.btn-remove-js', function (e) {
    e.preventDefault();
    let self = $(this);
    let dataRow = self.closest('.form-row-js').attr('data-row');
    let dataLimit = self.closest('.form-row-js').attr('data-limit');

    let divToRemove = self.attr('data-remove');
    self.closest(divToRemove).slideUp(500, function () {
        self.closest(divToRemove).remove();
        attendeeLimit(dataRow, dataLimit);
    });
})

$(document).on('click', '.btn-remove-ticket-js', function (e) {
    e.preventDefault();
    let self = $(this);
    let ticketCardSelector = self.closest('.ticket-wrapper');
    let dataRow = self.attr('data-row');
    let quantity = parseInt(self.closest('.form-row-js').find('.ticket-count-js').text()) - 1;
    let perPrice = self.attr('data-price');

    removeTicket(dataRow, quantity, perPrice, ticketCardSelector);
})

function removeTicket(dataRow, quantity, perPrice, ticketCardSelector) {
    updateTicketRelationInformation(dataRow, quantity, perPrice);
    //=== REMOVES TICKET CARD
    ticketCardSelector.slideUp('300', function () {
        ticketCardSelector.remove();
    })

    setTimeout(function () {
        updateAttendeeNumber(dataRow);
        if (quantity < 1) {
            $('.form-row-js[data-row=' + dataRow + ']').remove();
            $('.ticket-summary-js .ticket-summary-row[data-row=' + dataRow + ']').remove();
            $('.ticket-summary-table .ticket-price-row[data-row=' + dataRow + ']').remove();
        }
    }, 500)

    //=== CART CALCULATION
    calculateTotal();
}

function updateTicketRelationInformation(dataRow, quantity, perPrice) {
    let totalPrice = quantity * perPrice;
    //=== TICKET SUMMARY UPDATE
    $('.ticket-summary-js .ticket-summary-row[data-row=' + dataRow + '] .quantity').text(quantity);
    $('.ticket-summary-js .ticket-summary-row[data-row=' + dataRow + '] .ticket-number-js').text(quantity);
    $('.ticket-summary-js .ticket-summary-row[data-row=' + dataRow + '] .subtotal').text(totalPrice);

    $('.cart-table-js .table-row[data-row=' + dataRow + '] .ticket-quantity-js').val(quantity);
    $('.cart-table-js .table-row[data-row=' + dataRow + '] .price-subtotal .amount').text(totalPrice);
    $('.form-row-js[data-row=' + dataRow + '] .ticket-count-js').text(quantity);

    //=== TICket CART SUMMARY TABLE DATA UPDATE
    $('.ticket-summary-table .ticket-price-row[data-row=' + dataRow + '] .amount').text(totalPrice);
}

function addTicket(dataRow, quantity, perPrice) {
    updateTicketRelationInformation(dataRow, quantity, perPrice);
    //=== CART CALCULATION
    calculateTotal();
}

$(document).on('click', '.update-ticket-information-js', function (e) {
    e.preventDefault();
    $('.cart-table-js .quantity-wrap .form-control').val('0');
    $('.cart-table-js .quantity-wrap .form-control').trigger('change');
    $('.cart-table-js').removeClass('d-none');
    $('.cart-table-js .ticket-category-key').removeClass('ticket-selected');
    $('.ticket-info-foot-js').removeClass('d-none');
    $('.ticket-summary-js').addClass('d-none');

    $('.voucher-tr').hide();
    $('.voucher-block .form-control').val('');
    $('.voucher-tr .amount').text(0);
    $('.discount_amount').text(0);
    $('#member_discount').addClass('d-none');

    $('.ticket-wrapper-js').empty();

    $('.addon-ticket-quantity-js').val(0);
    $('.addon-holder-js').addClass('d-none');
    $('.addon-ticket-wrapper').addClass('d-none');

    updateAddonTicketOption();

    goToTheSection('.ticket-information-js');
    addTicketSummaryAndCalculateTotalPrice();
    totalTicketDiscountAmount = 0;

    setTimeout(function () {
        calculateTotal();
    }, 600);

})

//=== UPDATE ADDON TICKET INFORMATION BUTTON CLICK ACTION
$(document).on('click', '.update-addon-ticket-information-js', function (e) {
    e.preventDefault();
    $('.voucher-tr').hide();
    $('.voucher-block .form-control').val('');
    $('.voucher-tr .amount').text(0);
    $('.discount_amount').text(0);

    updateAddonTicketOption();
    calculateTotal();
    totalTicketDiscountAmount = ticketDiscountAmount;
})

function updateAddonTicketOption() {
    $('.addon-holder-js .quantity-wrap .form-control').val('0');
    $('.addon-holder-js .quantity-wrap .form-control').trigger('change');
    $('.addon-ticket-wrapper-js').removeClass('d-none');
    $('.addon-holder-js .ticket-addOn-key').removeClass('ticket-selected');

    $('.addon-holder-foot-js').removeClass('d-none');
    $('.addon-ticket-summary-js').addClass('d-none');

    $('.addon-holder-foot-js').attr('data-checked', 0);

    $('.addon-ticket-info-collection-wrapper-js').empty();

    let discountTd = $('#member_discount td:first-child');
    discountTd.html('');
    $('.discount_amount').html(0);
    $('#member_discount').addClass('d-none');
}

$(document).on('change', '#bill-later', function () {
    let self = $(this);
    billMeLaterToggle(self);
})

//=== IS ALUMNAI CHECKBOX CHANGE EVENT
$(document).on('change', '.is-alumnai-checkbox-js', function () {
    let self = $(this);
    let commonAncestor = self.closest('.is-alumnai-js').parent();
    //self.closest('.batch-no-field').find('.batch-number-group-js').toggleClass('d-none');
    //self.closest('.batch-no-field').find('.batch-number-group-js').toggleClass('required-group');
    commonAncestor.find('.batch-no-field .batch-number-group-js').toggleClass('d-none');
    commonAncestor.find('.batch-no-field .batch-number-group-js').toggleClass('required-group');
})

calculateTotal();

/**
 * Toggles payment form on bill me later checkbox state
 * @param element
 */
function billMeLaterToggle(element) {
    $('.payment-form-wrapper-js').slideUp();
    if (element.prop('checked')) return;

    $('.payment-form-wrapper-js').slideDown();
}

function changeTicketUtitlity() {
    $('.cart-table-js').addClass('d-none');
    $('.ticket-info-foot-js').addClass('d-none');
    $('.ticket-summary-js').removeClass('d-none');

    goToTheSection('#form-body');
}

function changeAddonTicketUtitlity() {
    $('.addon-ticket-wrapper-js').addClass('d-none');
    $('.addon-holder-foot-js').addClass('d-none');
    $('.addon-ticket-summary-js').removeClass('d-none');

    goToTheSection('#addon-form-body');
}

/**
 * Goes to the desired section
 * @param element
 */
function goToTheSection(element) {
    // Get the target <div> element
    let targetDiv = $(element);
    let offsetTop = targetDiv.offset().top;
    $('html, body').animate({
        scrollTop: offsetTop
    }, 500);
}

/**
 * Updates attendee number per ticket
 * @param rowNumber
 */
function updateAttendeeNumber(rowNumber) {
    $('.form-row-js[data-row=' + rowNumber + '] .ticket-wrapper').each(function (i, element) {
        //=== UPDATE TICKET NUMBER
        $(element).find('.ticket-number-js').html(i + 1);
        if ($(element).closest('.form-row-js').attr('data-limit') < 2) {
            // $(element).find('.ticket-number-js').html(1);
        }

        //=== IF THERE'S ONLY ONE ATTENDEE SHOW 'ATTENDEE INFORMATION'
        if ($(element).closest('.form-row-js').attr('data-limit') < 2) return;

        //=== UPDATE ATTENDEE NUMBER PER TICKET
        $(element).find('.attendee-wrapper').each(function (j, element) {
            $(element).find('.attendee-number-js').html(j + 1);
        })

        //=== ADD SPOUSE TEXT AFTER ATTENDEE NUMBER WHEN ITS A COUPLE TICKET TYPE
        if ($('.table-row[data-row=' + rowNumber + '] .quantity-wrap').attr('data-ticket-type') === 'couple') {
            $(element).find('.attendee-number-js').last().append(' (Spouse)');
        }
    })
}

/**
 * Add/Update ticket summary table
 * Calculates total price
 */
function addTicketSummaryAndCalculateTotalPrice() {
    $('.ticket-summary-table tbody').html('');
    $(ticketQuantitySelector).each(function (i, element) {
        let ticketText = $(element).closest('.table-row').find('.ticket-name-js').attr('data-name');
        let dataRow = parseInt($(element).closest('.table-row').attr('data-row'));
        let price = parseInt($(element).val()) * parseInt($(element).closest('.table-row').find('.per-price .amount').text());
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
        if (parseInt($(element).val())) {
            $('.ticket-summary-table tbody').append(row);
        }



    })

    //changed by emdad
    //changed to attr from value
    /**
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
     **/

    calculateTotal();
}

/**
 * Calculates the processing fees of the transaction
 * @param totalPrice
 * @returns {string}
 */
function calculateProcessingFees(totalPrice) {
    let rate = 0.022;  // 2.2% expressed as a decimal
    let fixedFee = 0.30;  // $0.30

    let processingFees = totalPrice * rate + fixedFee + 1;
    return processingFees.toFixed(2);  // Rounded to 2 decimal places
}

/**
 * Updates subtotal on quantity change
 * @param quantityElementSelector
 */
function updateSubtotal(quantityElement) {
    let quantity = parseInt($(quantityElement).val());
    let perPrice = parseInt($(quantityElement).closest('.table-row').find('.per-price').find('.amount').text());
    let totalPrice = quantity * perPrice;
    $(quantityElement).closest('.table-row').find('.price-subtotal').find('.amount').html(totalPrice);
}

/**
 * Shows payment form when total amount is greater than 0
 * @param totalAmount
 */
function showPaymentForm(totalAmount) {
    if (totalAmount > 0) {
        $('#payment-information').show();
        //  $('.btn-reg').text('Payment');
        // $('.btn-reg').addClass('btn-payment');
    } else {
        $('#payment-information').attr('style', 'display:none;');
        //  $('.btn-reg').text('Register');
        // $('.payment-information').removeClass('btn-payment');
    }
}

function attendeeLimit(dataRow, limit) {
    if ($('.form-row-js[data-row=' + dataRow + '] .attendee-wrapper').length >= limit) {
        $('.form-row-js[data-row=' + dataRow + '] .add-more-attendee-js').removeClass('d-inline-flex');
        $('.form-row-js[data-row=' + dataRow + '] .add-more-attendee-js').hide();
        return;
    }

    $('.form-row-js[data-row=' + dataRow + '] .add-more-attendee-js').addClass('d-inline-flex');
}

/**
 * Integrated google map place api to autocomplete address
 */
function initMap() {
    let addressFieldsSelector = document.getElementsByClassName('street-address-js');
    for (let i = 0; i < addressFieldsSelector.length; i++) {
        let addressField = addressFieldsSelector[i];
        const addressBlockSelector = addressField.closest('.address-autocomplete-block-js');
        // Create the autocomplete object
        const autocomplete = new google.maps.places.Autocomplete(addressField);

        // Set the fields to retrieve from the Places API
        // autocomplete.setFields(['formatted_address']);
        autocomplete.setFields(['address_components', 'formatted_address']);

        addressBlockSelector.querySelector('.input-city-js').value = '';
        addressBlockSelector.querySelector('.input-state-js').value = '';
        addressBlockSelector.querySelector('.input-country-js').value = '';
        addressBlockSelector.querySelector('.input-postal-code-js').value = '';

        // When a place is selected, populate the address fields in your form
        autocomplete.addListener('place_changed', function () {
            const place = autocomplete.getPlace();
            if (!place.formatted_address) {
                console.log('No address available for this place.');
                loaderEnable(loaderDivClass);
                fetchCountries();
                return;
            }

            // Do something with the selected address
            // Retrieve the country, state, and city names from the address components
            let streetNumber, routeName, streetAddress, countryName, stateName, cityName, postalCode;
            for (const component of place.address_components) {
                if (component.types.includes('country')) {
                    countryName = component.long_name;
                } else if (component.types.includes('administrative_area_level_1')) {
                    stateName = component.long_name;
                } else if (component.types.includes('locality') || component.types.includes('postal_town')) {
                    cityName = component.long_name;
                } else if (component.types.includes('administrative_area_level_3')) {
                    if (!cityName) cityName = component.long_name;
                } else if (component.types.includes('postal_code')) {
                    postalCode = component.long_name;
                } else if (component.types.includes('street_number')) {
                    streetNumber = component.long_name;
                } else if (component.types.includes('route')) {
                    routeName = component.long_name;
                }
            }

            // streetAddress = streetNumber && routeName ? streetNumber+" "+routeName : place.formatted_address.split(',')[0];
            streetAddress = place.formatted_address.split(',')[0];

            if (cityName) {
                addressBlockSelector.querySelector('.input-city-js').value = cityName;
                addressBlockSelector.querySelector('.input-city-js').closest('.form-group.required-group').classList.add('field-validated');
            }
            if (stateName) {
                addressBlockSelector.querySelector('.input-state-js').value = stateName;
                addressBlockSelector.querySelector('.input-state-js').closest('.form-group.required-group').classList.add('field-validated');
            }
            if (countryName) {
                addressBlockSelector.querySelector('.input-country-js').value = countryName;
                addressBlockSelector.querySelector('.input-country-js').closest('.form-group.required-group').classList.add('field-validated');
            }
            if (postalCode) {
                addressBlockSelector.querySelector('.input-postal-code-js').value = postalCode;
                addressBlockSelector.querySelector('.input-postal-code-js').closest('.form-group.required-group').classList.add('field-validated');
            }
            if (streetAddress) {
                addressBlockSelector.querySelector('.street-address-js').value = streetAddress;
                addressBlockSelector.querySelector('.street-address-js').closest('.form-group.required-group').classList.add('field-validated');
            }

        });
    }
}