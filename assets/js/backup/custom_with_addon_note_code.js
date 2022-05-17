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
            <h3 class="form-row-title">Ticket #<span class="ticket-row">1</span></h3>

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

            <!-- //=== CHILD CARE SECTION -->
            <div class="mt-4 pt-3 child-care-wrapper">
                <h3 class="text-center font-bold section-title"><span>Childcare Information</span></h3>
                <div class="form-group">
                    <div class="label-field-sidebyside">
                        <label class="form-control-label">Child's Age:</label>
                        <input type="text" class="form-control">
                    </div>

                </div>

                <div class="alert alert-primary alert-border-top">
                    <h3 class="text-center text-uppercase font-bold pt-3 pb-3">Childcare Hours</h3>
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <td>Date</td>
                                <td>Time</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Friday, August 30, 2022</td>
                                <td>
                                    <p class="time-slot"> 3:30 - 7:00 pm </p>
                                    <p class="time-slot"> 8:00 - 10:30 pm </p>
                                </td>
                            </tr>

                            <tr>
                                <td>Saturday, August 31, 2022</td>
                                <td>
                                    <p class="time-slot"> 10:00am - 12:30pm </p>
                                    <p class="time-slot"> 2:00 - 7:30pm </p>
                                    <p class="time-slot"> 9:00 - 10:30pm </p>
                                </td>
                            </tr>

                            <tr>
                                <td>Sunday, September 01, 2022</td>
                                <td>
                                    <p class="time-slot"> 10:00am - 12:30pm </p>
                                    <p class="time-slot"> 2:00 - 6:30pm </p>
                                    <p class="time-slot"> 8:00 - 10:30pm </p>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="b-t-1 border-dark mt-4 pt-3">
                        <h3 class="text-center text-uppercase font-bold pb-3">Breaks <br>
                            <span class="font-medium text-medium">(Lunch & Dinner Breaks)</span>
                        </h3>

                        <div class="table-responsive">
                            <table class="table table-striped table-bordered">
                                <thead>
                                <tr>
                                    <td>Date</td>
                                    <td>Time</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Friday, August 30, 2022</td>
                                    <td>
                                        <div>
                                            <p class="time-slot">Dinner: 7:00 - 8:00 pm </p>
                                        </div>

                                    </td>
                                </tr>

                                <tr>
                                    <td>Saturday, August 31, 2022</td>
                                    <td>
                                        <div>
                                            <p class="time-slot">Lunch: 12:30 - 2:00 pm </p>
                                        </div>
                                        <div>
                                            <p class="time-slot">Dinner: 7:30 - 9:00 pm </p>
                                        </div>

                                    </td>
                                </tr>

                                <tr>
                                    <td>Sunday, September 01, 2022</td>
                                    <td>
                                        <div>
                                            <p class="time-slot">Lunch: 12:30 - 2:00 pm </p>
                                        </div>
                                        <div>
                                            <p class="time-slot">Dinner: 6:30 - 8:00 pm </p>
                                        </div>
                                    </td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="alert alert-warning">
                        <p>
                            <strong>Note: </strong>Childcare will not be provided during the following lunch and dinner breaks.  Parents are required to pick up children during these times.  (Break times coincide with ISNA Programming breaks.).
                        </p>
                        <p class="text-danger font-medium">Meals are not served in childcare.</p>
                    </div>
                </div>
            </div>

            <!-- //=== SPECIAL EVENT LIST -->
            <div class="special-ticket-wrapper b-t-1 mt-4 pt-3">
                <h3 class="">Special Events Tickets</h3>
                <div class="event-single">
                    <div class="alert alert-info">
                        <h3>Presidential Forum</h3>
                        <p class="tag">Saturday, August 31, 2022</p>
                        <p>Thank you Senator Bernie Sanders and Mr. Julián Castro for speaking at ISNACON19.</p>
                    </div>
                </div>


                <div class="event-single">
                    <div class="alert alert-info">
                        <h3>A Conversation with Trevor Noah</h3>
                        <p class="tag">Friday, August 30, 2022</p>
                        <p>Thank you Trevor Noah for coming to speak at  ISNACON19!</p>
                    </div>
                </div>


                <div class="event-single">
                    <div class="alert alert-success">
                        <h3>Matrimonial Events:</h3>
                        <p class="tag">Friday, August 30, 2022</p>
                        <p>This year we are proud to collaborate with Half Our Deen (HOD)  who will be facilitating the matrimonial events at the convention.</p>
                        <p class="pt-2">To register for the matrimonial events you MUST click <a href="http://hodoffline.com/isna" target="_blank">HERE</a> .</p>
                    </div>
                </div>


                <div class="event-single">
                    <div class="alert alert-danger">
                        <h3>Community Service Recognition Luncheon (CSRL)</h3>
                        <p class="tag bg-danger text-white">Closed</p>
                        <p>Registration for this event is closed.</p>
                    </div>
                </div>

                <div class="event-single">
                    <div class="alert alert-danger">
                        <h3>5K Run for Meals on Wheels</h3>
                        <p class="tag mr-2">Sunday, 1st September, 2022</p>
                        <p class="tag bg-danger text-white">Closed</p>
                        <p>Online registration is now closed</p>
                        <p class="text-dark text-medium">Limited on-site registration.</p>
                    </div>
                </div>



            </div>

            <!-- //=== CONTACT INFORMATION -->
            <div class="contact-information-wrapper b-t-1 mt-4 pt-3">
            
                <!-- //=== CONTACT INFORMATION -->
                <div class="contact-information-inner contact-information-single">
                    <div class="contact-information-grouped-wrapper" data-grouped="1">
                    <div class="contact-information-grouped-single" data-contact="1">
                    <h3 class="text-center font-bold section-title"><span>Contact Information <p style="display:inline-block;margin:0; padding-left:10px;" class="contact-number"></p></span></h3>

                    <div class="row mt-3">
                        <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                            <div class="form-group required-group">
                                <label class="form-control-label">First Name <span class="required-mark">*</span></label>
                                <input type="text" name="TicketHolderFirstName[]" class="form-control first-name">
                            </div>
                        </div>

                        <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                            <div class="form-group required-group">
                                <label class="form-control-label">Last Name <span class="required-mark">*</span></label>
                                <input type="text" name="TicketHolderLastName[]" class="form-control last-name">
                            </div>
                        </div>

                        <div class="col-12 col-sm-12">
                            <div class="form-group radiobox gender-radio field-validated">
                                <label class="form-control-label"> Gender <span class="required-mark">*</span> </label>
                                <div class="pt-2">
                                    <div class="checkbox-holder d-inline-flex">
                            <input type="radio" name="gender" class="" value="male" checked>
                            <span style="margin-left:6px">Male</span>
                        </div>

                        <div class="checkbox-holder d-inline-flex pl-3">
                            <input type="radio" name="gender"  class="" value="female">
                            <span style="margin-left:6px">Female</span>
                        </div>
                                   
                                </div>

                                <input type="text" name="TicketHolderGender[]" class="form-control gender-value hidden-field" value="">

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
                    <span class="btn-text">Add Another Ticket</span>
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

                pageLoader.removeClass('active');
                window.scrollTo({ top: bannerHeight, behavior: 'smooth' });
            }, 1000);
        } else {
            mainParent.find('.ticket-type-js').focus();
        }
        // if(isChecked){
        //
        // }else{
        //     self.closest('.form-row-body').find('.tc-wrapper').addClass('focused');
        //     setTimeout(function () {
        //         self.closest('.form-row-body').find('.tc-wrapper').removeClass('focused');
        //     },300);
        // }
    }else{
        notValidatedField.first().find('.form-control').focus();
        if(notValidatedField.hasClass('radiobox')){
            notValidatedField.first().find('input').focus();
            notValidatedField.first().addClass('focused');
        }
    }
});

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

        $('.form-row .contact-information-grouped-single-copy').addClass('contact-information-grouped-single');
        $('.contact-information-grouped-single-copy').find('.section-title span').html('Contact Information');
    }

    //=== WHEN DATA-ADDON IS TRUE
    if(parseInt(ticketDataAddon)===1){
        // removeContactFields(mainParent);
        let addonTicketQuantityCloned = $('.addon-ticket-quantity-wrapper .addon-ticket-quantity').clone();
        mainParent.find('.contact-information-grouped-wrapper').remove();
        mainParent.find('.contact-information-inner.contact-information-single').html(addonTicketQuantityCloned);
    }

    calculateTotalPrice(mainParent);
});


//===== FUNCTION WHEN ADD ADDON TICKET BUTTON CLICKED
$(document).on('click','.btn-add-addon-ticket',function (e) {
    e.preventDefault();
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual'),
        quantity = parseInt(self.closest('.addon-ticket-quantity').find('.addon-ticket-quantity-field').val()),
        addTicketDetailsCloned = $('.addon-ticket-details-wrapper .addon-ticket-details').clone();

    mainParent.find('.contact-information-inner.contact-information-single .addon-ticket-details').remove();

    for(let i=0; i<quantity; i++){
        mainParent.find('.contact-information-inner.contact-information-single').append(addTicketDetailsCloned.clone());
    }
    addonTicketCounter(mainParent);

});

function addonTicketCounter(mainParent){
    mainParent.find('.addon-ticket-details').each(function (i, element) {
        $(element).find('.addon-ticket-counter').html('# '+(i+1));
    });
}

$(document).on('click','.addon-ticket-close',function (e) {
    e.preventDefault();
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual');
    self.closest('.addon-ticket-details').remove();
    addonTicketCounter(mainParent);
    $('.addon-ticket-quantity .addon-ticket-quantity-field').val();
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
    //changed by Emdad
    //Update total price hidden field
    $('#total-price').val(totalPrice);
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
    };

statesFiller(countryField);

countryField.on('change',function (e) {
    let self = $(this);
    statesFiller(self);
});

function statesFiller(countryFieldSelector){
    if(countryFieldSelector.val()=="USA"){
        countryFieldSelector.closest('.form-row').find('.state-field-group .state-holder').html("<select class='form-control state'></select>");
        countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='0'>Select a State</option>");
        for (let key in statesJson){
            countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='"+statesJson[key]+"'>"+statesJson[key]+"</option>")
        }
    }else{
        countryFieldSelector.closest('.form-row').find('.state-field-group .state-holder').html("<input type='text' class='form-control state'>");
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
        parent = self.closest('.contact-information-inner'),
        dataRow = self.closest('.form-row').attr('data-row'),
        unitPrice = self.closest('.form-row').find('.ticket-type-js option:selected').attr('data-unitPrice'),
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
        clonedFields.find('.required-group').removeClass('field-validated');
        clonedFields.find('.form-control').val('');
        clonedFields.append("<input type='hidden' value='"+unitPrice+"' class='ticket-category-keys' name='TicketCategoryKeys[]'>");
        updateTotalOnAddPerson(dataRow, unitPrice, "add");
        clonedFields.find('.checkbox-holder').first().find('input').prop('checked', true);
        // radioFieldNameAndId(clonedFields, dataContactNumber, "dataRow");
        clonedFields.prepend("<span class='person-close'>Delete</span>");
        self.closest('.contact-information-inner').find('.contact-information-grouped-wrapper').append(clonedFields);
        let radioHolder = self.closest('.form-row-ticket-individual').find('.contact-information-inner .contact-information-grouped-wrapper .checkbox-holder');
        radioBoxIdGenerating(radioHolder);
    }

});

function ticketGroupManipulation(ticketDataGroup, ticketDataGroup2, typeSelector){
    let clonedFields = $('.contact-information-html .contact-information-grouped-single-copy');
    let dataRow = typeSelector.closest('.form-row-ticket-individual').data('row');
    let unitPrice = typeSelector.closest('.form-row').find('.ticket-type-js option:selected').attr('data-unitPrice');
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
            clonedFields.find('.contact-number').html("#"+i);
        }else{
            clonedFields.find('.section-title span').append("<p style='display:inline-block;margin:0; padding-left:10px;' class='contact-number'>"+i+"</p>");
        }

        typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped .contact-information-grouped-wrapper').append(clonedFields.clone());
        $('.form-row .contact-information-grouped-single-copy').addClass('contact-information-grouped-single');

        if(ticketDataGroup2=="couple"){
            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').find('.section-title span').html('Contact Information');
            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').last().find('.section-title span').html('Spouse Information');
            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-inner .btn-holder').hide();
            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').first().find('.checkbox-holder').first().find('input').prop('checked', true);
            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').last().find('.checkbox-holder').last().find('input').prop('checked', true);
        }else{
            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-inner .btn-holder').show();
        }

    }
    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped .contact-information-grouped-wrapper .contact-information-grouped-single').append("<input type='hidden' value='"+unitPrice+"' class='ticket-category-keys' name='TicketCategoryKeys[]'>");
    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped .contact-information-grouped-wrapper .contact-information-grouped-single').first().find('.ticket-category-keys').remove();

    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped .contact-information-grouped-single').show();

}

$(document).on('click','.person-close',function (e) {
    let self = $(this),
        dataRow = self.closest('.form-row').attr('data-row'),
        unitPrice = self.closest('.form-row').find('.ticket-type-js option:selected').attr('data-unitPrice');
    updateTotalOnAddPerson(dataRow, unitPrice, "remove");

    self.parent().remove();

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

// created by Emdad
//DataRow added as ticket quantity on #ticket-quantity field
function updateTicketQuantity(dataRow) {
    $('#ticket-quantity').val(dataRow);
}

