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