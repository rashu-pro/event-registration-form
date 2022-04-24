//=== zip code to state and city
if($('.zip-code-field .zip-code').length>0){
    let zipcode = 0,
        clientKey = 'js-374588b8dc0462ef16c94b5c897825d6',
        url = "",
        zipcode_field = $(".zip-code");

    zipcode_field.change(function () {
        console.log('changed');
        zipcode = zipcode_field.val();
        if (zipcode > 0) {
            url = "https://service.zipapi.us/zipcode/" + zipcode + "?X-API-KEY=" + clientKey + "&fields=geolocation,population";
        }
        getState();
    });


    function getState() {

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                console.log(this.responseText);
                let obj = JSON.parse(this.responseText);
                if (obj.status == true) {
                    $('.state').val(obj.data.state_fullname);
                    $('.city').val(obj.data.city);
                    $('.country').val('USA');
                }
                else {
                    //var obj = JSON.parse(this.responseText);
                    alert(obj.message);
                }
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }
}
