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
                                                <option value="60" data-text="Sunday Only">Sunday Only Ticket ($60)</option>
                                                <option value="109" data-text="Individual Adult Ticket">Individual Adult Ticket ($109)</option>
                                                <option value="89" data-text="College Student Ticket">College Student Ticket (18+) ($89)</option>
                                                <option value="59" data-text="Young Adult Ticket">Young Adult Ticket (12-17 MYNA) ($59)</option>
                                                <option value="49" data-text="Child Ticket">Child Ticket (6-11) ($49)</option>
                                                <option value="85" data-text="Childcare Ticket">Childcare Ticket (2-5) ($85)</option>
                                                <option value="89" data-text="Senior Ticket">Senior Ticket (60+) ($89)</option>
                                            </select>
                                            <div class="ticket-type-details pt-3">
                                                <p class="mb-2"><strong>Ticket Type: </strong> <span class="ticket-type-text"></span> </p>
                                                <p class="m-0"><strong>Ticket Price: </strong> <span class="">$</span> <span class="ticket-type-price"></span> </p>
                                            </div>
                                        </div>

                                        <div class="b-t-1 mt-4 pt-3">
                                            <h3>Contact Information</h3>

                                            <div class="row">
                                                <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">First Name <span class="required-mark">*</span></label>
                                                        <input type="text" class="form-control">
                                                    </div>
                                                </div>

                                                <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">Last Name <span class="required-mark">*</span></label>
                                                        <input type="text" class="form-control">
                                                    </div>
                                                </div>

                                                <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">Email <span class="required-mark">*</span></label>
                                                        <input type="email" class="form-control">
                                                    </div>
                                                </div>

                                                <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">Phone Number <span class="required-mark">*</span></label>
                                                        <input type="text" class="form-control">
                                                    </div>
                                                </div>

                                                <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">Address <span class="required-mark">*</span></label>
                                                        <input type="text" class="form-control">
                                                    </div>
                                                </div>

                                                <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">Address Line 2 </label>
                                                        <input type="text" class="form-control">
                                                    </div>
                                                </div>

                                                <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">ZIP Code <span class="required-mark">*</span></label>
                                                        <input type="text" class="form-control">
                                                    </div>
                                                </div>

                                                <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">City <span class="required-mark">*</span></label>
                                                        <input type="text" class="form-control">
                                                    </div>
                                                </div>

                                                <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">State <span class="required-mark">*</span></label>
                                                        <input type="text" class="form-control">
                                                    </div>
                                                </div>

                                                <div class="col-6 col-sm-6 col-md-6 col-lg-6">
                                                    <div class="form-group">
                                                        <label class="form-control-label">Country<span class="required-mark">*</span></label>
                                                        <input type="text" class="form-control">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-row-foot">
                                        <div class="text-right">
                                            <a href="javascript:void(0)" class="btn btn-dark btn-add-another-js">
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
        dataRow = parseInt(mainParent.attr('data-row'))+1;
    pageLoader.addClass('active');
    mainParent.removeClass('active').addClass('edited');
    setTimeout(function () {
        self.closest('.form-body').append(ticketHtml);
        mainParent.next().attr('data-row',dataRow);
        mainParent.next().find('.ticket-row').html(dataRow);
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

    let totalPrice = 0;
    $('.sidebar-block .price-row').each(function (i, obj) {
        totalPrice = totalPrice + parseInt($(obj).find('.amount').text());
    });
    $('.total-price .amount').text(totalPrice);
    console.log('total price: '+ totalPrice);
});

//===== PAY NOW BUTTON CLICK ACTION
$(document).on('click','.btn-pay-direction-js',function (e) {
    e.preventDefault();
    let self = $(this);
    fieldValidation(self);

    if(self.closest('.form-row-body').find('.form-group.field-invalid').length<1){
        $('.btn-event-register').removeClass('disabled');
        $('.btn-event-register').prop('disabled',false);
        let paymentInformationHeight = $('#payment-information').height();
        window.scrollTo({top: paymentInformationHeight, behavior: 'smooth'});
        $('.cc-name').focus();
    }else{

    }
});

$(document).on('keyup','.form-group.required-group .form-control',function (e) {
    let self = $(this);
    if(self.val()!=''){
        self.parent().removeClass('field-invalid');
        self.parent().find('.error-message').remove();
        //email validation
        if(self.parent().hasClass('email-field')){
            if(validateMail(self.parent())){
                self.parent().addClass('field-invalid');
                if(self.parent().find('.error-message')){
                    self.parent().find('.error-message').remove();
                    setTimeout(function () {
                        self.parent().append('<p class="error-message text-danger m-0">The field is required</p>');
                    },300);
                }else{
                    self.parent().append('<p class="error-message text-danger m-0">The field is required</p>');
                }
            }
        }
    }else{
        self.parent().addClass('field-invalid');
        if(self.parent().find('.error-message')){
            self.parent().find('.error-message').remove();
            setTimeout(function () {
                self.parent().append('<p class="error-message text-danger m-0">The field is required</p>');
            },300);
        }else{
            self.parent().append('<p class="error-message text-danger m-0">The field is required</p>');
        }
    }

    if(self.closest('.form-row-body').find('.form-group.field-invalid').length<1){
        self.closest('.form-row-body').find('.btn-add-another-js').removeClass('disabled');
    }else{
        self.closest('.form-row-body').find('.btn-add-another-js').addClass('disabled');
    }
});

$(document).on('blur','.form-group.required-group .form-control',function (e) {
    let self = $(this);
    if(self.val()!=''){
        self.parent().removeClass('field-invalid');
        self.parent().find('.error-message').remove();

        //email validation
        if(self.parent().hasClass('email-field')){
            if(validateMail(self.parent())){
                self.parent().addClass('field-invalid');
                if(self.parent().find('.error-message')){
                    self.parent().find('.error-message').remove();
                    setTimeout(function () {
                        self.parent().append('<p class="error-message text-danger m-0">The field is required</p>');
                    },300);
                }else{
                    self.parent().append('<p class="error-message text-danger m-0">The field is required</p>');
                }
            }
        }
    }else{
        self.parent().addClass('field-invalid');
        if(self.parent().find('.error-message')){
            self.parent().find('.error-message').remove();
            setTimeout(function () {
                self.parent().append('<p class="error-message text-danger m-0">The field is required</p>');
            },300);
        }else{
            self.parent().append('<p class="error-message text-danger m-0">The field is required</p>');
        }
    }
});
//==== ON FIELD TYPE


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

function fieldValidation(clickedElement) {
    let formGroup = clickedElement.closest('.form-row-body').find('.form-group.required-group');
    let formGroupInvalid = clickedElement.closest('.form-row-body').find('.form-group.field-invalid');
    if(formGroup.length>0){
        console.log('form is invalid!');
        formGroup.each(function (i, element) {
            if($(element).find('.form-control').val()==''){
                $(element).addClass('field-invalid');
                if($(element).find('.error-message')){
                    $(element).find('.error-message').remove();
                    setTimeout(function () {
                        $(element).append('<p class="error-message text-danger m-0">The field is required</p>');
                    },300);
                }else{
                    $(element).append('<p class="error-message text-danger m-0">The field is required</p>');
                }
            }

            //email validation
            if($(element).hasClass('email-field')){
                if(validateMail($(element))){
                    $(element).addClass('field-invalid');
                    if($(element).find('.error-message')){
                        $(element).find('.error-message').remove();
                        setTimeout(function () {
                            $(element).append('<p class="error-message text-danger m-0">The field is required</p>');
                        },300);
                    }else{
                        $(element).append('<p class="error-message text-danger m-0">The field is required</p>');
                    }
                }
            }
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

function singleFieldCheck(element){

}

