/**
 * Created by Rashu on 07-03-22.
 */

console.log('way to go!');

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

