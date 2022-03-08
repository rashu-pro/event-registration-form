/**
 * Created by Rashu on 07-03-22.
 */

console.log('way to go!');

$('.quantity-increase').on('click',function () {
    var self = $(this),
        quantitySelector = self.closest('.quantity-wrap').find('.form-control'),
        quantityValue = quantitySelector.val();

    if(quantityValue<10){
        quantitySelector.val(parseInt(quantityValue)+1);
    }
});

$('.quantity-decrease').on('click',function () {
    var self = $(this),
        quantitySelector = self.closest('.quantity-wrap').find('.form-control'),
        quantityValue = quantitySelector.val();

    if(quantityValue>0){
        quantitySelector.val(parseInt(quantityValue)-1);
    }
});
