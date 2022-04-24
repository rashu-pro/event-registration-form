/**
 * Created by rashu on 4/14/2022.
 */

$(function ($) {
    let tickets = [],
        price = 0,
        boothType = '',
        timerFunction = false,
        btnMapSelector = $('.ticket-map-row .btn-holder .btn'),
        btnMapSelectorSelected = $('.ticket-map-row .btn-holder .btn.booth-selected'),
        columnGapSelector = $('.column-gap'),
        btnGapSelector = $('.btn-gap'),
        btnHolderBtnGapSelector = $('.btn-holder .btn-gap'),
        emptyRowSelector = $('.ticket-map-row.empty'),
        btnModalCancelSelector = $('.btn-modal-cancel-js'),
        btnNextSelector = $('.btn-next-js'),
        btnChangeSelector = $('.btn-change-js'),
        confirmationModalSelector = $('#confirmation-modal');


    columnGapSelector.prev().find('.btn').addClass('on-edge');
    btnGapSelector.prev().find('.btn').addClass('on-edge');
    btnHolderBtnGapSelector.parent().prev().find('.btn').addClass('on-edge');
    emptyRowSelector.next().addClass('after-empty');

    //=== ON DOCUMENT READY
    btnMapSelector.each(function (e) {
        let self = $(this);
        self.attr('data-id',self.text());
        if(self.hasClass('btn-sponsorship-aisle')){
            price = 2000;
            self.attr('data-type','Sponsorship Aisle');
            self.attr('data-price', price);
        }else if(self.hasClass('btn-prime-a')){
            price = 1500;
            self.attr('data-type','Prime A');
            self.attr('data-price', price);
        }else if(self.hasClass('btn-prime-b')){
            price = 1300;
            self.attr('data-type','Prime B');
            self.attr('data-price', price);
        }else if(self.hasClass('btn-prime-c')){
            price = 950;
            self.attr('data-type','Prime C');
            self.attr('data-price', price);
        }else if(self.hasClass('btn-standard')){
            price = 550;
            self.attr('data-type','Standard');
            self.attr('data-price', price);
        }else{
            price = 0;
        }
    });

    btnNextSelector.on('click',function (e) {
        let self = $(this);
        $('.loader-div').addClass('active');
        if(self.closest('.modal').hasClass('confirm-modal')){
            $('#confirmation-modal').modal('hide');
            //self.closest('.booth-selection').hide();
            //self.closest('.booth-selection').next().show();
            $('.booth-selection').hide();
            $('.booth-selection').next().show();
            let bannerHeight = $('.main-banner').height();
            window.scrollTo({top: bannerHeight, behavior: 'smooth'});
            setTimeout(function (e) {
                //self.closest('.form-row').removeClass('active').addClass('edited');
                //self.closest('.form-row').next().addClass('active');
                $('.booth-selection .form-row').removeClass('active').addClass('edited');
                $('.booth-selection .form-row').next().addClass('active');
                $('.loader-div').removeClass('active');
            },400)
        }else{
            setTimeout(function (e) {
                self.closest('.form-row').removeClass('active').addClass('edited');
                self.closest('.form-row').next().addClass('active');
                $('.loader-div').removeClass('active');
            },400)
        }

    });

    btnModalCancelSelector.on('click',function (e) {
        e.preventDefault();
        let self = $(this);
        confirmationModalSelector.modal('hide');
        btnMapSelector.removeClass('booth-selected');
    });


    btnChangeSelector.on('click',function (e) {
        let self = $(this);
        $('.loader-div').addClass('active');
        $('.after-booth-selection').hide();
        $('.booth-selection').show();
        $('.booth-selection .form-row').addClass('active');
        setTimeout(function (e) {
            $('.loader-div').removeClass('active');
        },400);
    });

    $('.body-toggler').on('click',function (e) {
        let self = $(this);
        $('.form-row.active').removeClass('active').addClass('edited');
        self.closest('.form-row.edited').removeClass('edited').addClass('active');
    });

    btnMapSelector.on('click',function (e) {
        e.preventDefault();
        let self = $(this),
            item = self.text(),
            boothType = self.attr('data-type'),
            price = self.attr('data-price'),
            classToAdd = self.attr('class').replace('btn',''),
            btnBooth = '<span class="'+classToAdd+'">' + self.text()+'</span>';
        $('#confirmation-modal').modal('show');
        $('.booth-type-holder .booth-type').text(boothType);
        $('.booth-number').html(btnBooth);
        $('.booth-price').html(price);
        if(!self.hasClass('booth-selected')){
            $('.js-timer-block').hide();
            setTimeout(function () {
                $(".js-timer-block").show();
            },1000);

            self.closest('.form-row-booth').find('.btn').removeClass('booth-selected');
            self.addClass('booth-selected');
            btnBooth = '<span class="'+classToAdd+'">' + self.text()+'</span>';
            $('.form-row-selected-booth').find('.booth-holder').html(btnBooth);
            self.closest('.form-row').find('.btn-next-js').removeClass('disabled');

            let item = $(this).data("id");
            tickets.push(item);

            let row = `<tr id='row-${item}'>
                                    <td>${item} - ${boothType}</td>
                                    <th>
                                        <span class="">
                                            <span class="currency">$</span>
                                            <span class="amount">${price}</span>
                                        </span>
                                    </th>
                                </tr>`;
            $(".ticket-summary-table table tbody").html(row);
            let tenMinutes = 60 * 10;
            display = document.querySelector('.js-timer');
            clearInterval(timerFunction);
            start_tmer(600);
            if(self.closest('.form-row').find('.btn-next-js').hasClass('disabled')){
                self.closest('.form-row').find('.btn-next-js').removeClass('disabled');
            }

            let amount = 0;
            $('.ticket-summary-table tbody tr').each(function (index, value) {
                amount += parseInt($(this).find('.amount').text());
            });

            totalPrice = amount;
            $('.total-price .amount').text(totalPrice);
            $('#total-price').val(totalPrice);

            $(".card-info-area").toggleClass("hide");
            $('.btn-reg').text('Payment');
        }
    });

    $(".js-booth").click(function () {
        let self = $(this);

        if(!self.hasClass('selected')){
            $('.js-timer-block').hide();
            setTimeout(function () {
                $(".js-timer-block").show();
            },1000);
            let item = $(this).data("key");
            $('.js-booth').removeClass('selected');
            $('.js-booth').parent().removeClass('child-selected');
            $(this).toggleClass("selected");
            self.parent().toggleClass('child-selected');
            if ($(this).hasClass("selected")) {
                tickets.push(item);

                let row = `<tr id='row-${item}'>
                                    <td>${item} - ${boothType}</td>
                                    <th>
                                        <span class="">
                                            <span class="currency">$</span>
                                            <span class="amount">${price}</span>
                                        </span>
                                    </th>
                                </tr>`;

                $(".ticket-summary-table table tbody").html();
                $(".ticket-summary-table table tbody").append(row);
                let tenMinutes = 60 * 10;
                display = document.querySelector('.js-timer');
//                startTimer(tenMinutes, display);
                clearInterval(timerFunction);
                start_tmer(600);
                self.closest('.form-fields-wrapper').addClass('booth-selected');
                $('.ad-type').show();
                if(self.closest('.form-row').find('.btn-next-js').hasClass('disabled')){
                    self.closest('.form-row').find('.btn-next-js').removeClass('disabled');
                }
            } else {
                tickets.pop($(this).data("key"));
                $(".ticket-summary-table table tbody tr#row-" + item).remove();
            }

            let amount = 0;
            $('.ticket-summary-table tbody tr').each(function (index, value) {
                amount += parseInt($(this).find('.amount').text());
            });

            totalPrice = amount;
            $('.total-price .amount').text(totalPrice);
            $('#total-price').val(totalPrice);

            $(".card-info-area").toggleClass("hide");
            $('.btn-reg').text('Payment');
            console.log(tickets);
            //$.each(ticketQuantity, function (index, value) {
            //    totalTicket += parseInt(value);
            //});
        }

    });


    //==== TICKET ROW 2
    for(let i=0; i<5; i++) {
        $('.ticket-map-left .ticket-map-row.row-2, .ticket-map-left .ticket-map-row.row-11').append('<span class="column-gap"></span>');
    }

    for(let i=0; i<36; i++){
        $('.ticket-map-left .ticket-map-row.row-2, .ticket-map-left .ticket-map-row.row-11').append('<span class="btn-gap"></span>');
    }

    $('.ticket-map-left .ticket-map-row.row-2').append('<div class="btn-holder">' +
        '<button type="button" class="btn btn-sponsorship-aisle on-edge" data-id="1304">1304</button> ' +
        '</div>');


    //==== TICKET ROW 5
    for(let i=0; i<3; i++) {
        $('.ticket-map-left .ticket-map-row.row-5').append('<span class="column-gap"></span>');
    }
    for(let i=0; i<19; i++){
        $('.ticket-map-left .ticket-map-row.row-5').append('<span class="btn-gap"></span>');
    }
    $('.ticket-map-left .ticket-map-row.row-5').append('<div class="btn-holder">' +
        '<button type="button" class="btn btn-prime-a on-edge" data-id="1310">1310</button> ' +
        '</div>');

    $('.ticket-map-left .ticket-map-row.row-11').append('<div class="btn-holder">' +
        '<button type="button" class="btn btn-prime-a on-edge" data-id="1310">1322</button> ' +
        '</div>');

    for(let i=1; i<19; i++){
        $('.ticket-map-row.row-'+3*i+' .column-gap').next().append('<span class="fire-exits"></span>');
        if(i===1){
            $('.ticket-map-row.row-1 .column-gap').next().append('<span class="fire-exits bottom-row"></span>');
        }
    }


    if(!btnMapSelector.next().hasClass('btn')){
        btnMapSelector.addClass('on-edge');
    }

    $('.btn-reg').click(function () {
        let self = $(this);
        $('.loader-div').addClass('active');
        setTimeout(function (e) {
            $('.registration-form-wrapper').hide();
            $('.thank-wrapper').show();
            $('.loader-div').removeClass('active');
        }, 400);

    });



    let timer = 60 * 10,
        display = document.querySelector('.js-timer');
    function start_tmer(timer) {
        timerFunction = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }
});
