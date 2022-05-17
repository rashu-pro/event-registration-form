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
    let self = $(this),
        quantitySelector = self.closest('.quantity-wrap').find('.form-control'),
        quantityValue = quantitySelector.val();

    if (quantityValue > 10) {
        quantitySelector.val(0);
    }
   
    collectData(self);
});


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

    checkTicketLimit(ticketTypeKey, ticketCount, self);
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


$('.btn-event-register').on('click', function () {
    let self = $(this);
    $('.loader-div').addClass('active');
    setTimeout(function () {
        self.closest('.registration-form-wrapper').hide();
        $('.loader-div').removeClass('active');
        $('.thank-wrapper').addClass('active');
    }, 800);
});

function showPaymentForm(totalAmount) {
    if (totalAmount > 0) {
        $('.card-info-area').show();
        $('.btn-reg').text('Payment');
        $('.btn-reg').addClass('btn-payment');
    } else {
        $('.card-info-area').attr('style','display:none;');
        $('.btn-reg').text('Register');
        $('.btn-reg').removeClass('btn-payment');
    }
}

//==== 15-05-2022
//==== USA STATE FILLER
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

if(countryField.length>0 && stateFieldGroup.length>0){
    statesFiller(countryField);

    countryField.on('change',function (e) {
        let self = $(this);
        statesFiller(self);
    });
}

function statesFiller(countryFieldSelector){
    if(countryFieldSelector.val()=="USA"){
        console.log(countryFieldSelector.val());
        countryFieldSelector.closest('.form-row').find('.state-field-group .state-holder').html("<select class='form-control state'></select>");
        countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='0'>Select a State</option>");
        for (let key in statesJson){
            countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='"+statesJson[key]+"'>"+statesJson[key]+"</option>")
        }
    }else{
        countryFieldSelector.closest('.form-row').find('.state-field-group .state-holder').html("<input type='text' class='form-control state'>");
    }
}


let creditCardField = $('.cc-number');
if (creditCardField.length > 0) {
    card_validation()
}

creditCardField.on('keyup', function (e) {
    card_validation();
});

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

if($('.header').length>0){
    if($('.header').hasClass('bg-white')){
        $('.header').css('position','static');
    }
}