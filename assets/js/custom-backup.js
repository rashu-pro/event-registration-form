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
                            <div class="form-group radiobox gender-radio">
                                <label class="form-control-label"> Gender <span class="required-mark">*</span> </label>
                                <div class="pt-2">
                                    <div class="checkbox-holder radiobox text-normal m-0 d-inline-flex mr-4">
                                        <input type="radio" class="regular-checkbox gender-male" value="male">
                                        <label class="text-dark">Male</label>
                                    </div>

                                    <div class="checkbox-holder d-inline-flex radiobox text-normal">
                                        <input type="radio" class="regular-checkbox gender-female" value="female">
                                        <label class="text-dark">Female</label>
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
                    <div class="btn-holder">
                        <a href="javascript:void(0)" class="btn btn-dark btn-add-group-js">
                            <img src="assets/images/plus_circle.png" class="img-left">
                             <span class="btn-text">Add Another Person</span>
                        </a>
                    </div>
                </div>
                
                <div class="contact-information-inner contact-information-grouped">
                    <div class="contact-information-grouped-wrapper" data-grouped="1">
                    </div>
                    
                    <div class="btn-holder">
                        <a href="javascript:void(0)" class="btn btn-dark btn-add-group-js">
                            <img src="assets/images/plus_circle.png" class="img-left">
                            <span class="btn-text">Add Another Person</span>
                        </a>
                    </div>
                </div>
                
                <div class="tc-wrapper">
                    <div class="alert alert-primary alert-round-border">
                        <p style="font-size:12px">
                            <strong>Disclaimer:</strong>
                            WE ARE COMMITTED TO PROVIDING A SAFE,  ENJOYABLE, AND LEARNING ENVIRONMENT TO ALL CONVENTION ATTENDEES. TO ENSURE THIS, ISNA HOLDS THE RIGHT TO CANCEL ANY REGISTRATION. BY REGISTERING FOR THIS CONVENTION YOU AGREE TO ITS POLICIES AND PROCEDURES.  IF YOU OR A MEMBER OF YOUR GROUP CAUSES ANY DISTURBANCE, YOUR REGISTRATION WILL BE CANCELED WITHOUT REFUND.  THE JUDGMENT OF TERM "DISTURBANCE" WILL BE DETERMINED SOLELY BY ISNA.YOUR EMAIL WILL BE AUTOMATICALLY INCLUDED IN THE ISNA E-LISTSERV.  YOU WILL HAVE THE OPTION TO OPT-OUT FROM THIS LIST.
                        </p>

                        <div class="checkbox-holder mt-3 mb-0">
                            <input type="checkbox" id="tc" class="regular-checkbox tc">
                            <label for="tc" class="text-dark">I have read and agree to the terms above. </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-row-foot">
            <div class="text-center">
                <a href="javascript:void(0)" class="btn btn-dark btn-add-another-js">
                    <img src="assets/images/plus_circle.png" class="img-left">
                    <span class="btn-text">Add Another Ticket</span>
                </a>
            </div>
        </div>
    </div>
</div>
`;

let addressHtml = `
<div class="address-inner b-t-1 mt-4 pt-3">

                                                    <h3 class="text-center font-bold section-title"><span>Address</span></h3>                                                <!--<h3 class="pb-2">Address</h3>-->

                                                    <div class="row mt-3">
                                                        <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                                                            <div class="form-group required-group">
                                                                <label class="form-control-label">Country <span class="required-mark">*</span></label>
                                                                <select class="form-control country">
                                                                    <option value="USA">USA</option>
                                                                    <option value="Canada">Canada</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                                                            <div class="form-group required-group">
                                                                <label class="form-control-label">Street Address <span class="required-mark">*</span></label>
                                                                <input type="text" class="form-control address">
                                                            </div>
                                                        </div>

                                                        <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                                                            <div class="form-group">
                                                                <label class="form-control-label">Street Address 2 </label>
                                                                <input type="text" class="form-control">
                                                            </div>
                                                        </div>

                                                        <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                                                            <div class="form-group required-group zip-code-field">
                                                                <label class="form-control-label">ZIP Code <span class="required-mark">*</span></label>
                                                                <input type="text" class="form-control zip-code mask-zipcode" data-validation="zipcode">
                                                            </div>
                                                        </div>

                                                        <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                                                            <div class="form-group required-group state-field-group">
                                                                <label class="form-control-label">State <span class="required-mark">*</span></label>
                                                               
                                                            </div>
                                                        </div>

                                                        <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                                                            <div class="form-group required-group">
                                                                <label class="form-control-label">City <span class="required-mark">*</span></label>
                                                                <input type="text" class="form-control city">
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
        formRowActive = $('.form-row.active'),
        formGroupRequired = formRowActive.find('.required-group'),
        formGroupValidated = formRowActive.find('.field-validated'),
        notValidatedField = $('.form-row.active .required-group:not(.field-validated)');
    console.log(notValidatedField.length);

    if(notValidatedField.length>0){
        notValidatedField.first().find('input').focus();
        if(notValidatedField.find('select')){
            notValidatedField.first().find('select').focus();
        }

        if(notValidatedField.hasClass('radiobox')){
            notValidatedField.first().addClass('focused');
        }
    }else{
        if (paymentFields == paymentValidFields) {
            $('.loader-div').addClass('active');
            //setTimeout(function (e) {
            //    $('.registration-form-wrapper').hide();
            //    $('.thank-wrapper').show();
            //    $('.loader-div').removeClass('active');
            //}, 1000);
        } else {
            $('.payment-information .form-group').each(function (i, element) {
                let self = $(this);
                if (self.find('.form-control').val() == '' || parseInt(self.find('.form-control').val()) == 0 || self.find('.form-control').hasClass('invalid')) {
                    $(element).find('.form-control').focus();
                }
            })
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
$('.cc-name').on('keypress', function (e) {
    let self = $(this);
    if (nameOnCardValidation(self.val())) {
        self.removeClass('invalid');
        // self.closest('.input-wrap').find('.warning-message').hide();
    } else {
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

        if(isChecked){
            let mainParent = self.closest('.form-row-ticket-individual'),
                dataRow = parseInt(mainParent.attr('data-row')) + 1,
                genderName = "gender-name" + dataRow,
                genderMaleRadioId = "gender-male" + dataRow,
                genderFemaleRadioId = "gender-female" + dataRow,
                lostBadgeId = "lostBadge-" + dataRow;
            let clonedHtml = mainParent.clone();
            let clonedTicketCategory = mainParent.find('.ticket-type').clone();
            clonedTicketCategory.find('.required-group').removeClass('field-validated');
            clonedTicketCategory.find('.lost-badge-check').prop('checked', false);

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
                    mainParent.next().find('.gender-male').attr('name', genderName);
                    mainParent.next().find('.gender-female').attr('name', genderName);
                    mainParent.next().find('.gender-male').attr('id', genderMaleRadioId);
                    mainParent.next().find('.gender-male').next().attr('for', genderMaleRadioId);
                    mainParent.next().find('.gender-female').attr('id', genderFemaleRadioId);
                    mainParent.next().find('.gender-female').next().attr('for', genderFemaleRadioId);
                    mainParent.next().find('.tc').attr('id', dataRow);
                    mainParent.next().find('.tc').next().attr('for', dataRow);

                    mainParent.next().find('.lost-badge-check').attr('id', lostBadgeId);
                    mainParent.next().find('.lost-badge-check').next().attr('for', lostBadgeId);

                    pageLoader.removeClass('active');
                    window.scrollTo({ top: bannerHeight, behavior: 'smooth' });
                }, 1000);
            } else {
                mainParent.find('.ticket-type-js').focus();
            }
        }else{
            self.closest('.form-row-body').find('.tc-wrapper').addClass('focused');
            setTimeout(function () {
                self.closest('.form-row-body').find('.tc-wrapper').removeClass('focused');
            },300);
        }
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
    $('#confirm-modal .modal-confirm').attr('data-row', dataRow);
    $('#confirm-modal').modal('show');
});
$('.btn-delete-row-confirm').on('click', function () {
    let self = $(this);
    deleteRow(self.closest('.modal-confirm').attr('data-row'));
    $('#confirm-modal').modal('hide');
});


//===== TICKET TYPE SELECT ACTION
$(document).on('change', '.ticket-type-js', function (e) {
    e.preventDefault();
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual'),
        ticketText = self.children(':selected').attr('data-text'),
        ticketDataGroup = self.children(':selected').attr('data-group'),
        ticketDescription = self.children(':selected').attr('data-description'),
        //change made by Emdad
        //price = self.val(),
        price = self.children(':selected').attr('data-price'),
        dataRow = mainParent.attr('data-row');
    let contactInformationHtml = $('.contact-information-html .contact-information-grouped-single-copy').clone();

    if (self.val() != 0) {
        self.closest('.ticket-type').find('.ticket-type-details').show();
        self.closest('.ticket-type').find('.ticket-type-text').text(ticketText);
        self.closest('.ticket-type').find('.ticket-type-price').text(price);
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
        ticketGroupManipulation(ticketDataGroup, self);
    }else{
        console.log('regular ticket');
        self.closest('.form-row-ticket-individual').find('.contact-information-inner.contact-information-grouped .contact-information-grouped-single').remove();
        self.closest('.form-row-ticket-individual').find('.contact-information-inner.contact-information-grouped').hide();
        self.closest('.form-row-ticket-individual').find('.contact-information-inner.contact-information-single').show();
        self.closest('.form-row-ticket-individual').find('.contact-information-inner.contact-information-single .contact-information-grouped-wrapper').html(contactInformationHtml);
        $('.form-row .contact-information-grouped-single-copy').addClass('contact-information-grouped-single');
    }

    // if(ticketText == 'Grouped Ticket'){
    //     $('.contact-information-single').hide();
    //     $('.contact-information-grouped').show();
    // }else{
    //     $('.contact-information-grouped').hide();
    //     $('.contact-information-single').show();
    // }

    calculateTotalPrice(mainParent);


});

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
        formControl.parent().removeClass('field-invalid');
        formControl.parent().find('.error-message').remove();
        formControl.parent().addClass('field-validated');
        //email validation
        if (formControl.data('validation') === "email") {
            if (formControl.val() != '') {
                errorMessage = "Invalid Email!"
            }
            if (validateMail(formControl.parent())) {
                formControl.parent().removeClass('field-validated');
                notifyError(formControl, errorMessage);
            }
        }

        //zip code validation
        if (formControl.data('validation') === "zipcode") {
            if (formControl.val() != '') {
                errorMessage = "Invalid ZIP code!"
            }

            if (!zipCodeValidation(formControl.val())) {
                formControl.parent().removeClass('field-validated');
                notifyError(formControl, errorMessage);
            }
        }

        //ticket type validation
        if (formControl.val() == 0) {
            formControl.parent().removeClass('field-validated');
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

        if (!$('.form-row-ticket-individual')) {
            $('.form-body').append(ticketHtml);
            $('.form-row-ticket-individual').attr('data-row', dataRow);
            $('.form-row-ticket-individual').find('.ticket-row').html(dataRow);
        }
        $('.form-row-ticket-individual').each(function (i, element) {
            $(element).find('.ticket-row').html(i + 1);
        });
        if ($('.form-row-ticket-individual .address-inner').length < 1) {
            $('.form-body .form-row-ticket-individual:first .contact-information-inner').after(addressHtml);
            $('.form-body .form-row-ticket-individual:first').addClass('first-row');
        }
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
    clonedFields.find('.regular-checkbox').prop('checked', false);
    clonedFields.find('.checkbox-holder input').attr('name',attrName);
    clonedFields.find('.checkbox-holder.radio-male input').attr('id',genderMaleId);
    clonedFields.find('.checkbox-holder.radio-male label').attr('for',genderMaleId);

    clonedFields.find('.checkbox-holder.radio-female input').attr('id',genderFemaleId);
    clonedFields.find('.checkbox-holder.radio-female label').attr('for',genderFemaleId);
}


//==== USA STAT FILLER
let countryField = $('.country'),
    stateFieldGroup = $('.state-field-group'),
    statesJson = {
        "AL": "Alabama",
        "AK": "Alaska",
        "AS": "American Samoa",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "DC": "District Of Columbia",
        "FM": "Federated States Of Micronesia",
        "FL": "Florida",
        "GA": "Georgia",
        "GU": "Guam",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MH": "Marshall Islands",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "MP": "Northern Mariana Islands",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PW": "Palau",
        "PA": "Pennsylvania",
        "PR": "Puerto Rico",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VI": "Virgin Islands",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
    };

statesFiller(countryField);
countryField.on('change',function (e) {
    let self = $(this);
    statesFiller(self);
});

function statesFiller(countryFieldSelector){
    if(countryFieldSelector.val()=="USA"){
        if(countryFieldSelector.closest('.form-row').find('.state-field-group input[type=text]')){
            countryFieldSelector.closest('.form-row').find('.state-field-group input[type=text]').remove();
        }
        countryFieldSelector.closest('.form-row').find('.state-field-group').append("<select class='form-control state'></select>");
        countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='0'>Select a State</option>");
        for (let key in statesJson){
            countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='"+statesJson[key]+"'>"+statesJson[key]+"</option>")
        }
    }else{
        if(countryFieldSelector.closest('.form-row').find('.state-field-group').find('select')){
            countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').remove();
        }
        countryFieldSelector.closest('.form-row').find('.state-field-group').append("<input type='text' class='form-control state'>");
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
        clonedFields.find('.regular-checkbox').prop('checked', false);
        radioFieldNameAndId(clonedFields, dataContactNumber, "dataRow");
        self.closest('.contact-information-inner').find('.contact-information-grouped-wrapper').append(clonedFields);
    }

});

function ticketGroupManipulation(ticketDataGroup, typeSelector){
    let clonedFields = $('.contact-information-html .contact-information-grouped-single-copy');
    let dataRow = typeSelector.closest('.form-row-ticket-individual').data('row');
    // clonedFields.removeClass('contact-information-inner contact-information-single');
    // clonedFields.addClass('contact-information-grouped-single');
    clonedFields.find('.form-control.first-name').attr('name','grouped-first-name[]');
    clonedFields.find('.form-control.last-name').attr('name','grouped-last-name[]');
    clonedFields.find('.form-control.email').attr('name','grouped-email[]');
    clonedFields.find('.form-control.phone-number-mask').attr('name','grouped-phone[]');
    clonedFields.find('.form-group').removeClass('field-validated');
    clonedFields.find('.form-group').removeClass('focused');
    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-single').hide();
    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-single').remove();
    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped').show();


    if(ticketDataGroup =='couple'){

        radioFieldNameAndId(clonedFields, "couple-first", dataRow);

        typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped .contact-information-grouped-wrapper').append(clonedFields);
        typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped .contact-information-grouped-wrapper').append(clonedFields.clone());
        $('.form-row .contact-information-grouped-single-copy').addClass('contact-information-grouped-single');

        typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').find('.section-title span').html('Contact Information');
        typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped-wrapper .contact-information-grouped-single').last().find('.section-title span').html('Spouse Information');

        radioFieldNameAndId(clonedFields, "spouse", dataRow);

    }else{
        for(let i=1; i<=parseInt(ticketDataGroup); i++){
            let attrName = "grouped-gender-"+i+dataRow,
                genderMaleId = "grouped-gender-male-"+i+dataRow,
                genderFemaleId = "grouped-gender-female-"+i+dataRow;
            clonedFields.attr('data-contact',i);

            clonedFields.find('.form-control').val('');
            clonedFields.find('.regular-checkbox').prop('checked', false);
            clonedFields.find('.checkbox-holder input').attr('name',attrName);
            clonedFields.find('.checkbox-holder.radio-male input').attr('id',genderMaleId);
            clonedFields.find('.checkbox-holder.radio-male label').attr('for',genderMaleId);

            clonedFields.find('.checkbox-holder.radio-female input').attr('id',genderFemaleId);
            clonedFields.find('.checkbox-holder.radio-female label').attr('for',genderFemaleId);

            if(clonedFields.find('.contact-number').length>0){
                clonedFields.find('.contact-number').html("#"+i);
            }else{
                clonedFields.find('.section-title span').append("<p style='display:inline-block;margin:0; padding-left:10px;' class='contact-number'>"+i+"</p>");
            }

            typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped .contact-information-grouped-wrapper').append(clonedFields.clone());
            $('.form-row .contact-information-grouped-single-copy').addClass('contact-information-grouped-single');
        }
    }
    typeSelector.closest('.form-row-ticket-individual').find('.contact-information-grouped .contact-information-grouped-single').show();

}

// created by Emdad
//DataRow added as ticket quantity on #ticket-quantity field
function updateTicketQuantity(dataRow) {
    $('#ticket-quantity').val(dataRow);
}




