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





