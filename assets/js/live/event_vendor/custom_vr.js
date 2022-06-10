/**
 * Created by rashu on 4/14/2022.
 */


$(function ($) {
    let tickets = [],
        price = 0,
        boothType = '',
        selectedBooths = [],
        boothNumber,
        booth,
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
        confirmationModalSelector = $('#confirmation-modal'),
        btnClearSelector = $(".btn-clear-js"),
        btnMoreSelector = $(".btn-more-js"),
        btnMiniBooth = $(".btn-mini-booth");


    columnGapSelector.prev().find('.btn').addClass('on-edge');
    btnGapSelector.prev().find('.btn').addClass('on-edge');
    btnHolderBtnGapSelector.parent().prev().find('.btn').addClass('on-edge');
    emptyRowSelector.next().addClass('after-empty');

    //=== ON DOCUMENT READY  
    //btnMapSelector.each(function (e) {
    //    let self = $(this);
    //    self.attr('data-id', self.text());
    //    if (self.hasClass('btn-sponsorship-aisle')) {
    //        price = 2000;
    //        self.attr('data-type', 'Sponsorship Aisle');
    //        self.attr('data-price', price);
    //    } else if (self.hasClass('btn-prime-a')) {
    //        price = 1500;
    //        self.attr('data-type', 'Prime A');
    //        self.attr('data-price', price);
    //    } else if (self.hasClass('btn-prime-b')) {
    //        price = 1300;
    //        self.attr('data-type', 'Prime B');
    //        self.attr('data-price', price);
    //    } else if (self.hasClass('btn-prime-c')) {
    //        price = 950;
    //        self.attr('data-type', 'Prime C');
    //        self.attr('data-price', price);
    //    } else if (self.hasClass('btn-standard')) {
    //        price = 550;
    //        self.attr('data-type', 'Standard');
    //        self.attr('data-price', price);
    //    } else {
    //        price = 0;
    //    }
    //});

    $("#draggable").draggable({
        axis: "x"
    });

    afterTermsCheck();
    $(document).on('click', '#terms-check', function (e) {
        afterTermsCheck();
    });

    $(document).on('change', '.ticket-category-check', function () {
        let self = $(this),
            price = parseInt(self.data('price'));
        if (self.prop('checked')) {
            adSelection(self, 'add');
        } else {
            adSelection(self, 'remove');
        }
        serialTicketSummary();
        calculateTotal();
    });
    calculateTotal();

    // Reference the auto-generated proxy for the hub.
    booth = $.connection.boothHub;

    // Disable the send button until connection is established
    /*  $(".js-booth").attr("disabled", "disabled");*/


    // Create a function that the hub can call back to display messages.
    booth.client.booked = function (boothNumber, clear) {
        // Clear temp registrations
        clearReservations()
            .then((data) => {
                console.log(data);
                if (data.booths.length > 0) {
                    $(data.booths).each(function (index, item) {
                        $("." + item).removeAttr("disabled");
                        $("." + item).removeClass("booth-selected");
                    });
                }
                // Add the message to the page.
                if (clear == true) {
                    /*$("." + boothNumber).removeAttr("disabled");*/
                    $("." + boothNumber).removeClass("booth-selected");
                } else {
                    /*$("." + boothNumber).attr("disabled", "disabled");*/
                    $("." + boothNumber).addClass("booth-selected");
                }
            });
    };

    // Start the connection./
    //if ($.connection.hub && $.connection.hub.state === $.signalR.connectionState.disconnected) {
    //    console.log($.connection.hub.state);
    //    $.connection.hub.start()
    //}

    //$.connection.hub.disconnected(function () {
    //  //  alert("Ok");
    //    //setTimeout(function () {
    //    //    $.connection.hub.start();
    //    //}, 5000); // Restart connection after 5 seconds.
    //});

    $.connection.hub.start().done(function () {
        // console.log("Connection Status: " + $.connection.hub.state);
        // btnMapSelector.removeAttr("disabled");
        btnMapSelector.on('click', function (e) {
            e.preventDefault();
            let self = $(this),
                item = self.text(),
                boothType = self.attr('data-type'),
                price = self.attr('data-price'),
                classToAdd = self.attr('class').replace('btn', ''),
                btnBooth = '<span class="' + classToAdd + '">' + self.text() + '</span>',
                slotKey = self.attr("data-slot-key"),
                boothKey = self.attr("data-booth-key");


            $("#EventSlotKey").val(slotKey);
            $("#EventBoothKey").val(boothKey);
            $("#BoothNo").val(self.text());

            if (selectedBooths.filter(e => e.eventBoothKey === boothKey).length > 0) {

                // get index of object 
                var removeIndex = selectedBooths.map(function (item) { return item.eventBoothKey; }).indexOf(boothKey);

                // remove object
                selectedBooths.splice(removeIndex, 1);


                updateMiniBooth();

                boothNumber = self.text();
                if (boothNumber != null) {
                    booth.server.send(boothNumber, true);
                    boothNumber = null;

                    // remove from reservation table
                    removeReservation(slotKey, boothKey);
                }
            } else {
                if (selectedBooths.length < 4) { // Only allowed 4 booths
                    boothNumber = self.text();

                    // Check someone already booked the selected booth
                    checkReservation()
                        .then((data) => {
                            if (data.isSuccess) { // if already booked return
                                //  $('.loader-div').addClass('active');
                                let confirmTemplate = `Booth No: <strong><em>${boothNumber}</em></strong> is already booked.`

                                if (data.isSoldOut) {
                                    confirmTemplate = `Booth No: <strong><em>${boothNumber}</em></strong> is already sold out.`
                                }

                                getReservedBooths();

                                // notify
                                toastr.warning(confirmTemplate);
                                return;
                            }

                            // Call the Send method on the hub.
                            booth.server.send(boothNumber, false);

                            clearInterval(timerFunction);
                            start_tmer(900);

                            // Add to Reservation table
                            createReservation();

                            selectedBooths.push({
                                boothType: boothType,
                                btnBooth: btnBooth,
                                price: price,
                                boothNumber: boothNumber,
                                eventSlotKey: slotKey,
                                eventBoothKey: boothKey
                            });


                            updateMiniBooth();

                            //$('#confirmation-modal').modal('show');
                            //$('.booth-type-holder .booth-type').text(boothType);
                            //$('.booth-number').html(btnBooth);
                            //$('.booth-price').html(price);

                            $('.js-timer-block').hide();
                            setTimeout(function () {
                                $(".js-timer-block").show();
                            }, 1000);

                            self.closest('.form-row').find('.btn-next-js').removeClass('disabled');
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                } else {
                    // notify 
                    toastr.warning("A maximum of 4 booths can be selected.");
                }
            }
        });
    });


    btnMiniBooth.on('click', function (e) {
        e.preventDefault();

        $('#confirmation-modal').modal('show');

        showSelectedBooths();
    });

    btnNextSelector.on('click', function (e) {
        let self = $(this);
        $('.loader-div').addClass('active');
        if (self.closest('.modal').hasClass('confirm-modal')) {
            showTicketSummary();

            $('#confirmation-modal').modal('hide');

            $('.booth-selection').hide();
            $('.booth-selection').next().show();

            allSelectedBooths();

            let bannerHeight = $('.main-banner').height();
            window.scrollTo({ top: bannerHeight, behavior: 'smooth' });
            setTimeout(function (e) {
                $('.booth-selection .form-row').removeClass('active').addClass('edited');
                $('.booth-selection .form-row').next().addClass('active');
                $('.loader-div').removeClass('active');
            }, 400)
        } else {
            setTimeout(function (e) {
                self.closest('.form-row').removeClass('active').addClass('edited');
                self.closest('.form-row').next().addClass('active');
                $('.loader-div').removeClass('active');
            }, 400)
        }
    });


    btnModalCancelSelector.on('click', function (e) {
        e.preventDefault();
        confirmationModalSelector.modal('hide');
    });

    btnMoreSelector.on('click', function (e) {
        e.preventDefault();

        $('#confirmation-modal').modal('hide');
    });

    btnClearSelector.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        clearBooth();
        updateMiniBooth();

        selectedBooths = [];
        $('#confirmation-modal').modal('hide');
    });

    btnChangeSelector.on('click', function (e) {
        clearBooth();
    });

    $("body").on("click", '.btn-change-js', function (e) {
        e.preventDefault();

        $('.js-timer-block').hide();
        $('.after-booth-selection').hide();
        $('.booth-selection').show();
        $('.booth-selection .form-row').addClass('active');
    })

    $('.body-toggler').on('click', function (e) {
        let self = $(this);
        $('.form-row.active').removeClass('active').addClass('edited');
        self.closest('.form-row.edited').removeClass('edited').addClass('active');
        $('.content-div').height('auto');
    });

    $("body").on("click", ".booth-remove-js", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var selector = $(this).data("id");
        var boothToRemove = $(this).data("booth");

        if (boothToRemove != null) {
            booth.server.send(boothToRemove, true);
        }

        //selectedBooths = selectedBooths.filter(function (el) {
        //    return el.eventBoothKey != selector
        //});

        // get index of object 
        var removeIndex = selectedBooths.map(function (item) { return item.eventBoothKey; }).indexOf(selector);

        // remove object
        selectedBooths.splice(removeIndex, 1);

        console.log(selectedBooths.length);
        $("#" + selector).remove();

        updateMiniBooth();
    });

    //$(document).on('click', '.btn-reg', function (e) {
    //    selectedBooths = [];
    //});

    ////==== TICKET ROW 2
    //for (let i = 0; i < 5; i++) {
    //    $('.ticket-map-left .ticket-map-row.row-2, .ticket-map-left .ticket-map-row.row-11').append('<span class="column-gap"></span>');
    //}

    //for (let i = 0; i < 36; i++) {
    //    $('.ticket-map-left .ticket-map-row.row-2, .ticket-map-left .ticket-map-row.row-11').append('<span class="btn-gap"></span>');
    //}

    //$('.ticket-map-left .ticket-map-row.row-2').append('<div class="btn-holder">' +
    //    '<button type="button" class="btn btn-sponsorship-aisle on-edge" data-id="1304">1304</button> ' +
    //    '</div>');


    ////==== TICKET ROW 5
    //for (let i = 0; i < 3; i++) {
    //    $('.ticket-map-left .ticket-map-row.row-5').append('<span class="column-gap"></span>');
    //}
    //for (let i = 0; i < 19; i++) {
    //    $('.ticket-map-left .ticket-map-row.row-5').append('<span class="btn-gap"></span>');
    //}
    //$('.ticket-map-left .ticket-map-row.row-5').append('<div class="btn-holder">' +
    //    '<button type="button" class="btn btn-prime-a on-edge" data-id="1310">1310</button> ' +
    //    '</div>');

    //$('.ticket-map-left .ticket-map-row.row-11').append('<div class="btn-holder">' +
    //    '<button type="button" class="btn btn-prime-a on-edge" data-id="1310">1322</button> ' +
    //    '</div>');

    //for (let i = 1; i < 19; i++) {
    //    $('.ticket-map-row.row-' + 3 * i + ' .column-gap').next().append('<span class="fire-exits"></span>');
    //    if (i === 1) {
    //        $('.ticket-map-row.row-1 .column-gap').next().append('<span class="fire-exits bottom-row"></span>');
    //    }
    //}


    if (!btnMapSelector.next().hasClass('btn')) {
        btnMapSelector.addClass('on-edge');
    }

    //$('.btn-reg').click(function () {
    //    let self = $(this);
    //    $('.loader-div').addClass('active');
    //    setTimeout(function (e) {
    //        $('.registration-form-wrapper').hide();
    //        $('.thank-wrapper').show();
    //        $('.loader-div').removeClass('active');
    //    }, 400);

    //});



    function updateMiniBooth() {
        if (selectedBooths.length > 0) {
            $(btnMiniBooth).show();
            $(btnMiniBooth).find("span").text(selectedBooths.length);
            $(btnMiniBooth).effect("bounce", { times: 3 }, 300);

            $(btnClearSelector).fadeIn();
            $(btnNextSelector).fadeIn();
        }
        else {
            $(btnMiniBooth).find("span").text(0);
            $(btnMiniBooth).hide();

            $(btnClearSelector).fadeOut();
            $(btnNextSelector).fadeOut();

            selectedBooths = [];
        }

        if (selectedBooths.length == 4) {
            $(btnMoreSelector).fadeOut();
        } else {
            $(btnMoreSelector).fadeIn();
        }
    }


    function showSelectedBooths() {
        $("#boothTable tbody").empty();
        $(selectedBooths).each(function (index, item) {
            let boothTemplate = `<tr id="${item.eventBoothKey}">
                                          <td class="booth-type-holder"><span class="booth-type">${item.boothType}</span></td>
                                          <td class="booth-number-holder"><span class="booth-number">${item.btnBooth}</span></td>
                                          <td class="booth-name-holder">$<span class="booth-price">${item.price}</span></td>
                                          <td class="booth-remove-js" data-booth="${item.boothNumber}" data-id='${item.eventBoothKey}' class=""><span class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></span></td>
                                    </tr>`;
            $("#boothTable tbody").append(boothTemplate);
        });
    }

    function allSelectedBooths() {
        $('.form-row-selected-booth').find('.form-row-body').empty();
        //$(selectedBooths).each(function (index, item) {
        //    let boothTemplate = `<div class="form-fields-wrapper">
        //                              <p class="booth-type-holder"><strong>Booth Type:</strong> <span class="booth-type">${item.boothType}</span></p>
        //                              <span class="booth-holder">${item.btnBooth}</span>
        //                              <button type="button" class="btn btn-change-booth btn-change-js ml-4">Change Booth <i class="fa fa-edit"></i></button>
        //                        </div>`;
        //    $('.form-row-selected-booth').find('.form-row-body').append(boothTemplate);
        //});

        if (selectedBooths.length > 0) {
            //let singleLineTemplate = `<div class="form-fields-wrapper">
            //                              <p class="booth-type-holder"><strong>Booth:</strong> <span class="booth-type">${selectedBooths.map(el => el.boothType + ": " + el.boothNumber).join(", ")}</span></p>                     
            //                              <button type="button" class="btn btn-change-booth btn-change-js ml-4">Change Booth <i class="fa fa-edit"></i></button>
            //                          </div>`;

            let singleLineTemplate = `<div class="form-fields-wrapper">
                                          <p class="booth-type-holder"><strong>Booth Type:</strong> <span class="booth-type">${selectedBooths.map(el => el.boothType).join(", ")}</span></p>
                                          <span class="booth-holder">${selectedBooths.map(el => el.btnBooth).join(" ")}</span>
                                          <button type="button" class="btn btn-change-booth btn-change-js ml-4">Change Booth <i class="fa fa-edit"></i></button>
                                     </div>`;

            $('.form-row-selected-booth').find('.form-row-body').append(singleLineTemplate);
        }
    }

    function showTicketSummary() {
        $(".ticket-summary-table table tbody .booth-row").remove();
        $(selectedBooths).each(function (index, item) {
            let row = `<tr id='row-${item.boothNumber}' class="price-row ticket-price-row booth-row row-${item.boothNumber}">
                                    <td>
                                        <input type="hidden" name="EventBoothKeys" value="${item.eventBoothKey}" />
                                        <span class="row-number">${index + 1}.</span>
                                        <span class="ticket-text"> ${item.boothNumber} - ${item.boothType} </span>
                                        <span> X </span>
                                        <span class="row-quantity">1</span>
                                    </td>
                                    <th>
                                        <span class="">
                                            <span class="currency">$</span>
                                            <span class="amount">${item.price}</span>
                                        </span>
                                    </th>
                                </tr>`;

            $(".ticket-summary-table table tbody").prepend(row);
        });

        serialTicketSummary();
        calculateTotal();

        //if (self.closest('.form-row').find('.btn-next-js').hasClass('disabled')) {
        //    self.closest('.form-row').find('.btn-next-js').removeClass('disabled');
        //}

        let amount = 0;
        $('.ticket-summary-table tbody tr').each(function (index, value) {
            amount += parseInt($(this).find('.amount').text());
        });

        totalPrice = amount;
        $('.total-price .amount').text(totalPrice);
        $('#total-price').val(totalPrice);

        // $(".card-info-area").toggleClass("hide");
        // $('.btn-reg').text('Payment');
    }

    function afterTermsCheck() {
        if ($('#terms-check').prop('checked') === true) {
            $('.loader-div').addClass('active');
            setTimeout(function (e) {
                $('.terms-wrapper .form-row').removeClass('active');
                $('.booth-selection .form-row').addClass('active');
                $('.loader-div').removeClass('active');
            }, 600);
        }
    }

    function adSelection(checkSelector, addOrRemove) {
        let adPrice = checkSelector.data('price'),
            adRow = checkSelector.data('type'),
            adName = checkSelector.data('text');
        if (adName.length > 15) {
            adName = adName.substring(0, 15) + "...";
        }

        let adRowTr = `<tr id='row-adtype-${adRow}' class="price-row ticket-price-row row-adtype-${adRow}">
                                                            <td class="tr-ticket-text">
                                                                <span class="row-number">1.</span>
                                                                <span class="ticket-text"> ${adName} </span>
                                                                <span> X </span>
                                                                <span class="row-quantity">1</span>
                                                            </td>
                                                            <th>
                                                                <span class="">
                                                                    <span class="currency">$</span>
                                                                    <span class="amount">${adPrice}</span>
                                                                </span>
                                                            </th>
                                                        </tr>`;
        $('.row-adtype-' + adRow).remove();
        if (addOrRemove == 'add') {
            $('.ticket-summary-table .table tbody').append(adRowTr);
        }
        return true;
    }

    function calculateTotal() {
        let totalPrice = 0,
            sidebarPriceRow = $('.sidebar-block .price-row');

        sidebarPriceRow.each(function (i, obj) {
            totalPrice = totalPrice + parseInt($(obj).find('.amount').text());
        });

        console.log('total price: ' + totalPrice);
        $('#total-price').val(totalPrice);
        $('.ticket-summary-table .total-price .amount').html(totalPrice);
    }

    function serialTicketSummary() {
        let sidebarPriceRow = $('.sidebar-block .price-row');
        sidebarPriceRow.each(function (i, obj) {
            $(obj).find('.row-number').html(i + 1 + ".");
        });
    }


    function clearBooth() {
        if (selectedBooths.length > 0) {
            $(selectedBooths).each(function (index, item) {
                if (item.boothNumber != null) {
                    booth.server.send(item.boothNumber, true);
                    // boothNumber = null;
                    $('.loader-div').addClass('active');

                    // remove from reservation table
                    removeReservation(item.eventSlotKey, item.eventBoothKey);
                }
            });

            $('.js-timer-block').hide();
            $('.after-booth-selection').hide();
            $('.booth-selection').show();
            $('.booth-selection .form-row').addClass('active');


            updateMiniBooth();

            $("#boothTable tbody").empty();
            setTimeout(function (e) {
                $('.loader-div').removeClass('active');
            }, 400);
        }

        selectedBooths = [];
    }

    let timer = 60 * 10,
        display = document.querySelector('.js-timer');
    function start_tmer(timer) {
        timerFunction = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (timer == 0) {
                clearInterval(timerFunction);
                display.textContent = "";

                clearBooth();
            }

            if (--timer < 0) {
                timer = timer;
            }
        }, 1000);
    }
});
