/**
 * Created by rashu on 4/24/2022.
 */

// IMPORTANT: Fill in your client key
var clientKey = "LtOh0Ekj6cs1cmDdVigH8rsoQXcNJXbnxejErSGtbVbQfyDdYWVyN9j7DzWEXZTS";

var cache = {};
var container = $("#example1");
var errorDiv = container.find("div.text-error");
var zipCodeField = $('.zip-code');
var stateField = $('.state');
var cityField = $('.city');

/** Handle successful response */
function handleResp(data)
{
    // Check for error
    if (data.error_msg)
        errorDiv.text(data.error_msg);
    else if ("city" in data)
    {
        // Set city and state
        cityField.val(data.city);
        stateField.val(data.state);
    }
}

// Set up event handlers
zipCodeField.on("keyup change", function() {
    // Get zip code
    var zipcode = $(this).val().substring(0, 5);
    if (zipcode.length == 5 && /^[0-9]+$/.test(zipcode))
    {
        // Clear error
        errorDiv.empty();

        // Check cache
        if (zipcode in cache)
        {
            handleResp(cache[zipcode]);
        }
        else
        {
            // Build url
            var url = "https://www.zipcodeapi.com/rest/"+clientKey+"/info.json/" + zipcode + "/radians";

            // Make AJAX request
            $.ajax({
                "url": url,
                "dataType": "json"
            }).done(function(data) {
                handleResp(data);

                // Store in cache
                cache[zipcode] = data;
            }).fail(function(data) {
                if (data.responseText && (json = $.parseJSON(data.responseText)))
                {
                    // Store in cache
                    cache[zipcode] = json;

                    // Check for error
                    if (json.error_msg)
                        errorDiv.text(json.error_msg);
                }
                else
                    errorDiv.text('Request failed.');
            });
        }
    }
}).trigger("change");


function calculateTotalPrice(mainParent) {

    let ticketText = mainParent.find('.ticket-type-js').children(':selected').attr('data-text'),
        ticketDescription = mainParent.find('.ticket-type-js').children(':selected').attr('data-description'),
        price = mainParent.find('.ticket-type-js').val(),
        dataRow = mainParent.attr('data-row'),
        lostBadge = mainParent.find('.lost-badge-check'),
        isLostBadgeChecked = lostBadge.prop('checked');

    let row = `<tr id='row-${ticketText}' class='price-row price-${dataRow}' data-row="${dataRow}">
                                    <td class="tr-ticket-text">
                                        ${ticketText}
                                    </td>
                                    <th>
                                        <span class="">
                                            <span class="currency">$</span>
                                            <span class="amount">${price}</span>
                                        </span>
                                    </th>
                                </tr>
`;

    if(isLostBadgeChecked){
        let lostBadgePrice = parseInt(lostBadge.val());

        row = `<tr id='row-${ticketText}' class='price-row price-${dataRow}' data-row="${dataRow}">
                                    <td class="tr-ticket-text">
                                        ${ticketText}
                                    </td>
                                    <th>
                                        <span class="">
                                            <span class="currency">$</span>
                                            <span class="amount">${price}</span>
                                        </span>
                                    </th>
                                </tr>
                                <tr class='price-row badge-fee-row price-badge-${dataRow}'>
                                    <td>
                                    Lost Badge Fee
                                    </td>
                                    
                                    <th>
                                        <span class="">
                                            <span class="currency">$</span>
                                            <span class="amount">${lostBadgePrice}</span>
                                        </span>
                                    </th>
                                </tr>
`;
    }else{
        lostBadgeFee = lostBadgeFee + 0;
    }



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
        totalTicketPrice = 0,
        lostBadgeFee = parseInt($('.ticket-summary-table .badge-fee .amount').text()),
        sidebarPriceRow = $('.sidebar-block .price-row'),
        ticketCount = sidebarPriceRow.length;

    sidebarPriceRow.each(function (i, obj) {
        totalTicketPrice = totalTicketPrice + parseInt($(obj).find('.amount').text());
    });
    totalPrice = totalTicketPrice + lostBadgeFee;
    $('.ticket-summary-table .ticket-price .amount').html(totalTicketPrice);
    $('.ticket-summary-table .badge-fee .amount').html(lostBadgeFee);
    $('.ticket-summary-table .total-price .amount').html(totalPrice);

    $('.billing-information-wrapper .price-note .ticket-count').html(ticketCount);
    $('.billing-information-wrapper .price-note .total-price').html(totalPrice);
    console.log('total price: '+ totalPrice);
}





