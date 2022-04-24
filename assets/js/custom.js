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
            <div class="ticket-type">
                <h4 class="pb-2">Select Ticket Type:</h4>
                <select class="form-control ticket-type-js">
                    <option value="0">Select Ticket Type</option>
                    <option value="60" data-text="Sunday Only" data-description="This ticket provides admission to ISNACON for SUNDAY ONLY.
Access to most of ISNA convention.">Sunday Only Ticket ($60)</option>
                    <option value="109" data-text="Individual Adult Ticket" data-description="Access to most of ISNA convention.">Individual Adult Ticket ($109)</option>
                    <option value="89" data-text="College Student Ticket" data-description="Reduced Price Ticket for grads and undergrads.
Access to most of ISNA convention.">College Student Ticket (18+) ($89)</option>
                    <option value="59" data-text="Young Adult Ticket" data-description="Access to MYNA Convention at ISNACON.">Young Adult Ticket (12-17 MYNA) ($59)</option>
                    <option value="49" data-text="Childcare Ticket" data-description="Childcare Ticket: Access to Childcare Program and third party child care service (i.e. babysitting).
**Please read note below regarding childcare hours and breaks.">Child Ticket (6-11) ($49)</option>
                    <option value="85" data-text="Childcare Ticket" data-description="Childcare Ticket: Access to Childcare Program and third party child care service (i.e. babysitting).
**Please read note below regarding childcare hours and breaks.">Childcare Ticket (2-5) ($85)</option>
                    <option value="89" data-text="Senior Ticket" data-description="Reduced price ticket. Access to most of ISNA convention.">Senior Ticket (60+) ($89)</option>
                </select>

                <div class="ticket-type-details pt-3">
                    <p class="mb-2"><strong>Ticket: </strong> <span class="ticket-type-text"></span> </p>
                    <p class="mb-2"><strong>Ticket Price: </strong> <span class="">$</span> <span class="ticket-type-price"></span> </p>
                    <p class="m-0 alert alert-info"><span class="ticket-type-description"></span> </p>
                </div>

                <div class="lost-badge pt-4">
                    <div class="alert alert-warning alert-border-top pt-3">
                        <div class="checkbox-holder">
                            <input type="checkbox" class="regular-checkbox lost-badge-check">
                            <label class="text-dark">Lost Badge Fee ($15.00)</label>
                            <p class="lost-badge-info text-dark">(Cost is per badge)</p>
                        </div>

                        <ul class="list">
                            <li class="list-item">Attendees Must wear badges at all times and badges must be visible.</li>
                            <li class="list-item">Ansaar (Security) will be checking that all attendees have badges. There will be NO access to ISNACON or Presidential Forum without a badge.</li>
                            <li class="list-item">Go to Registration on 2nd Floor for a replacement badge.</li>
                        </ul>
                    </div>
                </div>
            </div>

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
            <div class="b-t-1 mt-4 pt-3">
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
                <div>
                    <h3 class="text-center font-bold section-title"><span>Contact Information</span></h3>

                    <div class="row mt-3">
                        <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                            <div class="form-group required-group">
                                <label class="form-control-label">First Name <span class="required-mark">*</span></label>
                                <input type="text" class="form-control first-name">
                            </div>
                        </div>

                        <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                            <div class="form-group required-group">
                                <label class="form-control-label">Last Name <span class="required-mark">*</span></label>
                                <input type="text" class="form-control last-name">
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

                            </div>
                        </div>

                        <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                            <div class="form-group email-field required-group">
                                <label class="form-control-label">Email <span class="required-mark">*</span></label>
                                <input type="email" class="form-control email" data-validation="email">
                            </div>
                        </div>

                        <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                            <div class="form-group required-group">
                                <label class="form-control-label">Phone Number <span class="required-mark">*</span></label>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                        
                        <div class="col-12">
                                                            <div class="checkbox-holder">
                                                                <input type="checkbox" class="regular-checkbox tc">
                                                                <label class="text-dark">I have read and agree to the &nbsp;<a href="#">Terms & Conditions.</a> </label>
                                                            </div>
                                                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="form-row-foot">
            <div class="text-center">
                <a href="javascript:void(0)" class="btn btn-dark btn-add-another-js disabled">
                    <img src="assets/images/plus_circle.png" class="img-left">
                    <span class="btn-text">Add Another Ticket</span>
                </a>
            </div>
        </div>
    </div>
</div>
`;

$('.quantity-increase').on('click',function () {
    let self = $(this),
        quantitySelector = self.closest('.quantity-wrap').find('.form-control'),
        quantityValue = quantitySelector.val();

    if(quantityValue<10){
        quantitySelector.val(parseInt(quantityValue)+1);
    }

    collectData(self);
});

$('.quantity-decrease').on('click',function () {
    let self = $(this),
        quantitySelector = self.closest('.quantity-wrap').find('.form-control'),
        quantityValue = quantitySelector.val();

    if(quantityValue>0){
        quantitySelector.val(parseInt(quantityValue)-1);
    }

    collectData(self);
});

$('.quantity-wrap .form-control').on('keyup',function () {
    let self = $(this);
    collectData(self);
});

$('.btn-event-register').on('click',function () {
    let self = $(this);
    $('.loader-div').addClass('active');
    setTimeout(function (e) {
        $('.registration-form-wrapper').hide();
        $('.thank-wrapper').show();
        $('.loader-div').removeClass('active');
    }, 1000);
});

//===== ON DOCUMENT READY
$(document).on('ready',function (e) {
    fixHeight();
    if($('.cc-number').length>0){
        card_validation()
    }
});

creditCardField.on('keyup',function (e) {
    card_validation();
});

$('.cc-number-holder .cc-card-identity').on('click',function (e) {
    $(this).parent().find('input').focus();
});

//===== ADD ANOTHER TICKET ACTION
$(document).on('click','.btn-add-another-js',function (e) {
    e.preventDefault();
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual'),
        dataRow = parseInt(mainParent.attr('data-row'))+1,
        genderName = "gender-name"+dataRow,
        genderMaleRadioId = "gender-male"+dataRow,
        genderFemaleRadioId = "gender-female"+dataRow,
        lostBadgeId = "lostBadge-"+dataRow;
    pageLoader.addClass('active');
    mainParent.removeClass('active').addClass('edited');
    setTimeout(function () {
        self.closest('.form-body').append(ticketHtml);
        mainParent.next().attr('data-row',dataRow);
        mainParent.next().find('.ticket-row').html(dataRow);
        mainParent.next().find('.gender-male').attr('name',genderName);
        mainParent.next().find('.gender-female').attr('name',genderName);
        mainParent.next().find('.gender-male').attr('id',genderMaleRadioId);
        mainParent.next().find('.gender-male').next().attr('for',genderMaleRadioId);
        mainParent.next().find('.gender-female').attr('id',genderFemaleRadioId);
        mainParent.next().find('.gender-female').next().attr('for',genderFemaleRadioId);
        mainParent.next().find('.tc').attr('id',dataRow);
        mainParent.next().find('.tc').next().attr('for',dataRow);

        mainParent.next().find('.lost-badge-check').attr('id',lostBadgeId);
        mainParent.next().find('.lost-badge-check').next().attr('for',lostBadgeId);

        pageLoader.removeClass('active');
        window.scrollTo({top: bannerHeight, behavior: 'smooth'});
    },1000);
});

$(document).on('click','.btn-ticket-collapse', function (e) {
    e.preventDefault();
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual');

    mainParent.toggleClass('active');
});

$(document).on('click','.btn-delete-ticket-js',function (e) {
    e.preventDefault();
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual');
    pageLoader.addClass('active');
    setTimeout(function () {
        mainParent.remove();
        if(!$('.form-row-ticket-individual')){
            self.closest('.form-body').append(ticketHtml);
            mainParent.next().attr('data-row',dataRow);
            mainParent.next().find('.ticket-row').html(dataRow);
        }
        pageLoader.removeClass('active');
    },600)
});

//===== TICKET TYPE SELECT ACTION
$(document).on('change', '.ticket-type-js', function (e) {
    e.preventDefault();
    let self = $(this),
        mainParent = self.closest('.form-row-ticket-individual'),
        ticketText = self.children(':selected').attr('data-text'),
        ticketDescription = self.children(':selected').attr('data-description'),
        price = self.val(),
        dataRow = mainParent.attr('data-row');

    self.closest('.ticket-type').find('.ticket-type-details').show();
    self.closest('.ticket-type').find('.ticket-type-text').text(ticketText);
    self.closest('.ticket-type').find('.ticket-type-price').text(price);
    self.closest('.ticket-type').find('.ticket-type-description').text(ticketDescription);

    if(ticketText == 'Childcare Ticket'){
        $('.child-care-wrapper').show();
    }else{
        $('.child-care-wrapper').hide();
    }

    let row = `<tr id='row-${ticketText}' class='price-row price-${dataRow}' data-row="${dataRow}">
                                    <td class="tr-ticket-text">${ticketText}</td>
                                    <th>
                                        <span class="">
                                            <span class="currency">$</span>
                                            <span class="amount">${price}</span>
                                        </span>
                                    </th>
                                </tr>`;

    if($('.price-'+dataRow).length>0){
        if(price==0){
            console.log('no data');
            $('.price-'+dataRow).hide();
        }else{
            $('.price-'+dataRow).show();
            $('.price-'+dataRow).find('.tr-ticket-text').text(ticketText);
            $('.price-'+dataRow).find('.amount').text(price);
        }

    }else{
        $(".ticket-summary-table table tbody").append(row);
    }

    let totalPrice = 0,
        ticketCount = $('.sidebar-block .price-row').length;
    $('.sidebar-block .price-row').each(function (i, obj) {
        totalPrice = totalPrice + parseInt($(obj).find('.amount').text());
    });
    $('.total-price .amount').text(totalPrice);
    $('.price-note .ticket-count').html(ticketCount);
    $('.price-note .total-price').html(totalPrice);
    console.log('total price: '+ totalPrice);
});

//===== PAY NOW BUTTON CLICK ACTION
$(document).on('click','.btn-pay-direction-js',function (e) {
    e.preventDefault();
    let self = $(this);
    fieldValidation(self);

    let invalidField = self.closest('.form-row-body').find('.form-group.required-group'),
        validField = self.closest('.form-row-body').find('.form-group.field-validated');
    console.log('required-field: '+invalidField.length);
    console.log('validated-field: '+validField.length);
    if(invalidField.length === validField.length){
        $('.btn-event-register').removeClass('disabled');
        $('.btn-event-register').prop('disabled',false);
        let paymentInformationHeight = $('#payment-information').height();
        window.scrollTo({top: paymentInformationHeight, behavior: 'smooth'});
        $('#payment-information .sidebar-block-description').removeClass('disabled-block');
        $('.cc-name').focus();
    }
});

$(document).on('keyup blur','.form-group.required-group .form-control',function (e) {
    let self = $(this);
    singleValidation(self, self.parent());
    activateButtons(self);
});

$(document).on('change', '.gender-radio.required-group input[name=gender]',function (e) {
    let self = $(this);
    singleValidation(self, self.parent());
    activateButtons(self);
});

$(document).on('change', '.tc',function (e) {
    let self = $(this);
    singleValidation(self, self.parent());
    activateButtons(self);
});

$(document).on('change','.copy-information input[type=checkbox]',function (e) {
    let self = $(this);
    if(self.prop('checked')){
        let firstName = $('.form-row.first-row .first-name').val(),
            lastName = $('.form-row.first-row .last-name').val(),
            email = $('.form-row.first-row .email').val(),
            address = $('.form-row.first-row .address').val(),
            country = $('.form-row.first-row .country').val(),
            zipCode = $('.form-row.first-row .zip-code').val(),
            state = $('.form-row.first-row .state').val(),
            city = $('.form-row.first-row .city').val();

        $('.billing-information .first-name').val(firstName);
        $('.billing-information .last-name').val(lastName);
        $('.billing-information .email').val(email);
        $('.billing-information .address').val(address);
        $('.billing-information .country').val(country);
        $('.billing-information .zip-code').val(zipCode);
        $('.billing-information .state').val(state);
        $('.billing-information .city').val(city);
    }else{
        $('.billing-information .first-name').val();
        $('.billing-information .last-name').val();
        $('.billing-information .email').val();
        $('.billing-information .address').val();
        $('.billing-information .country').val();
        $('.billing-information .zip-code').val();
        $('.billing-information .state').val();
        $('.billing-information .city').val();
    }
});



//===== DEFINITION FOR FUNCTIONS
function card_validation(){
    let number = document.querySelector('.cc-number');
    Payment.formatCardNumber(number);
    J.toggleClass(document.querySelectorAll('input'), 'invalid');
    let cardType = Payment.fns.cardType(J.val(number));
    // J.toggleClass(number, 'invalid', !Payment.fns.validateCardNumber(J.val(number)));
    if(cardType){
        creditCardField.addClass(cardType);
        creditCardImageHolder.html("<img src='assets/images/"+cardType+".png'>");
    }else{
        console.log('no card selected');
        creditCardImageHolder.html("<img src='assets/images/unknown.png'>");
    }
    if(Payment.fns.validateCardNumber(J.val(number))){
        creditCardField.removeClass('invalid');
        creditCardField.addClass('valid');
        creditCardField.closest('.input-wrap').find('.warning-message').hide();
    }else{
        creditCardField.addClass('invalid');
        creditCardField.removeClass('valid');
        creditCardField.closest('.input-wrap').find('.warning-message').show();
    }
}

function collectData(self){
    let ticketNumber = parseInt(self.closest('.quantity-wrap').find('.form-control').val())?parseInt(self.closest('.quantity-wrap').find('.form-control').val()):0,
        ticketPrice = parseInt(self.closest('tr').find('.per-price .amount').text()),
        ticketType = self.closest('.quantity-wrap').attr('ticket-type');

    console.log('ticket number: '+ticketNumber);
    console.log('ticket price: '+ticketPrice);
    console.log('ticket type: '+ticketType);

    updateTicketData(ticketNumber, ticketPrice, ticketType);
}

function updateTicketData(ticketNumber, ticketPrice, ticketType){
    $('.'+ticketType+'-quantity').text(ticketNumber);
    $('.'+ticketType+'-price .amount').text(ticketNumber*ticketPrice);

    //PRICE ADDITION
    let belowPrice = parseInt($('.ticket-summary-table .below-10-price .amount').text()),
        abovePrice = parseInt($('.ticket-summary-table .above-10-price .amount').text()),
        adultPrice = parseInt($('.ticket-summary-table .adult-price .amount').text()),
        totalPrice = belowPrice + abovePrice + adultPrice;
    $('.total-price .amount').text(totalPrice);
}

function fixHeight(){
    let headerHeight = parseFloat($('.header').css('height')),
        footerHeight = parseFloat($('.footer').css('height')),
        mainWrapperMarginTop = parseFloat($('.main-wrapper').css('margin-top')),
        mainWrapperMarginBottom = parseFloat($('.main-wrapper').css('margin-bottom')),
        heightToMinusReady = headerHeight + footerHeight + mainWrapperMarginTop + mainWrapperMarginBottom,
        heightToMinus = "calc(100vh - "+heightToMinusReady+"px)";
    $('.main-wrapper').css('min-height',heightToMinus);

}

function activateButtons(self) {
    let invalidField = self.closest('.form-row-body').find('.form-group.required-group'),
        validField = self.closest('.form-row-body').find('.form-group.field-validated');
    // console.log("invalid fields: "+invalidField.length);
    // console.log("valid fields: "+validField.length);
    let isChecked = self.closest('.form-row-body').find('.tc').prop('checked');
    if(invalidField.length === validField.length && isChecked ){
        self.closest('.form-row-body').find('.btn-add-another-js').removeClass('disabled');
        if($('.billing-information-wrapper').hasClass('active')){

        }else{
            let firstName = $('.form-row.first-row .first-name').val(),
                lastName = $('.form-row.first-row .last-name').val(),
                fullName = firstName +" "+ lastName;
            $('.copy-information .name').text(fullName);
            $('.billing-information-wrapper').addClass('active');
        }

    }else{
        self.closest('.form-row-body').find('.btn-add-another-js').addClass('disabled');
        if($('.billing-information-wrapper').hasClass('active')){

        }else{
            $('.billing-information-wrapper').removeClass('active');
        }
    }
}


function fieldValidation(clickedElement) {
    let formGroup = clickedElement.closest('.form-row-body').find('.form-group.required-group');
    let formGroupInvalid = clickedElement.closest('.form-row-body').find('.form-group.field-invalid');
    if(formGroup.length>0){
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
    if(!pattern.test(email)) {
        return true;
    }else{
        return false;
    }
}

//======= ZIP CODE VALIDATION
function zipCodeValidation(code) {
    let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(code);
    return isValidZip;
}

let errorMessage = "The field is required";
function notifyError(formControl,errorMessage){
    formControl.parent().removeClass('field-validated');
    formControl.parent().addClass('field-invalid');
    if(formControl.parent().find('.error-message')){
        formControl.parent().find('.error-message').remove();
        setTimeout(function () {
            formControl.parent().append('<p class="error-message text-danger m-0">'+errorMessage+'</p>');
        },200);
    }else{
        formControl.parent().append('<p class="error-message text-danger m-0">'+errorMessage+'</p>');
    }
}

function singleValidation(formControl,formGroup){
    errorMessage = "The field is required";
    if(formControl.val()!==''){
        formControl.parent().removeClass('field-invalid');
        formControl.parent().find('.error-message').remove();
        formControl.parent().addClass('field-validated');
        //email validation
        if(formControl.data('validation')==="email"){
            if(formControl.val()!=''){
                errorMessage = "Invalid Email!"
            }
            if(validateMail(formControl.parent())){
                formControl.parent().removeClass('field-validated');
                notifyError(formControl,errorMessage);
            }
        }

        //zip code validation
        if(formControl.data('validation')==="zipcode"){
            if(formControl.val()!=''){
                errorMessage = "Invalid ZIP code!"
            }

            if(!zipCodeValidation(formControl.val())){
                formControl.parent().removeClass('field-validated');
                notifyError(formControl,errorMessage);
            }
        }

    }else{
        notifyError(formControl,errorMessage);
    }

    //RADIO BUTTON VALIDATION
    // console.log($('.gender-radio input[name="gender"]').val());
    // console.log($('.gender-radio input[name="gender"]:checked').val());
    // if($('.gender-radio input[name="gender"]:checked').val()){
    //     console.log('fixed');
    //     formControl.parent().removeClass('field-invalid');
    //     formControl.parent().find('.error-message').remove();
    //     $('.gender-radio').addClass('field-validated');
    // }else{
    //     notifyError(formGroup.find('input[name=gender]').parent().parent(),errorMessage);
    // }
}

