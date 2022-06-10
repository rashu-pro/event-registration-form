/**
 * Created by rashu on 5/30/2022.
 */

//==== NEW SCRIPT
$(document).on('keyup blur change', '.form-group.required-group .form-control', function (e) {
    let self = $(this);
    singleValidation(self, self.parent());
});

$(document).on('click', '.btn-form-next-js', function (e) {
    e.preventDefault();
    let self = $(this);
    isFieldsValidated(self, "btnForm");

    $('html, body').animate({
        'scrollTop': $(".form-row.active").position().top,
    });
    setTimeout(function (e) {
        self.closest('.form-row').next().find('.form-control').first().focus();
    },500);

});

$(document).on('click', '.btn-form-complete-js', function (e) {
    e.preventDefault();
    let self = $(this);
    if(isFieldsValidated(self, "btnForm")){
        $('#card-info-area').show();
        setTimeout(function (e) {
            $('.payment-information-div .form-group.required-group').first().find('.form-control').focus();
        },500);
    }
});

$('.phone-number-mask').inputmask({
    "mask": "(999) 999-9999",
    "onKeyValidation": function (key, result) {
        if (result) {
            // console.log(result);
        }
    }
});


$('.mask-cvv').inputmask({
    "mask": "9999",
    placeholder: ""
});

$('.mask-cvv').on('keyup', function () {
    let self = $(this);
    cvvValidate(self, self.closest('.form-group'));
});

let creditCardField = $('.cc-number');
if (creditCardField.length > 0) {
    card_validation()
}

creditCardField.on('keyup', function (e) {
    card_validation();
});

//==== STATES FILLER
let countryField = $('.country'),
    stateFieldGroup = $('.state-field-group'),
    statesJson = {
        "Alabama": "Alabama",
        "Alaska": "Alaska",
        "Arizona": "Arizona",
        "Arkansas": "Arkansas",
        "California": "California",
        "Colorado": "Colorado",
        "Connecticut": "Connecticut",
        "Delaware": "Delaware",
        "Florida": "Florida",
        "Georgia": "Georgia",
        "Hawaii": "Hawaii",
        "Idaho": "Idaho",
        "Illinois": "Illinois",
        "Indiana": "Indiana",
        "Iowa": "Iowa",
        "Kansas": "Kansas",
        "Kentucky": "Kentucky",
        "Louisiana": "Louisiana",
        "Maine": "Maine",
        "Maryland": "Maryland",
        "Massachusetts": "Massachusetts",
        "Michigan": "Michigan",
        "Minnesota": "Minnesota",
        "Mississippi": "Mississippi",
        "Missouri": "Missouri",
        "Montana": "Montana",
        "Nebraska": "Nebraska",
        "Nevada": "Nevada",
        "NewHampshire": "NewHampshire",
        "NewJersey": "NewJersey",
        "NewMexico": "NewMexico",
        "NewYork": "NewYork",
        "NorthCarolina": "NorthCarolina",
        "NorthDakota": "NorthDakota",
        "Ohio": "Ohio",
        "Oklahoma": "Oklahoma",
        "Oregon": "Oregon",
        "Pennsylvania": "Pennsylvania",
        "RhodeIsland": "RhodeIsland",
        "SouthCarolina": "SouthCarolina",
        "SouthDakota": "SouthDakota",
        "Tennessee": "Tennessee",
        "Texas": "Texas",
        "Utah": "Utah",
        "Vermont": "Vermont",
        "Virginia": "Virginia",
        "Washington": "Washington",
        "WestVirginia": "WestVirginia",
        "Wisconsin": "Wisconsin",
        "Wyoming": "Wyoming",
        "zUnknown": "zUnknown"
    },
    statesCanadaJson = {
        "Alberta": "Alberta",
        "British Columbia": "British Columbia",
        "Manitoba": "Manitoba",
        "New Brunswick": "New Brunswick",
        "Newfoundland and Labrador": "Newfoundland and Labrador",
        "Northwest Territories": "Northwest Territories",
        "Nova Scotia": "Nova Scotia",
        "Nunavut": "Nunavut",
        "Ontario": "Ontario",
        "Prince Edward Island": "Prince Edward Island",
        "Quebec": "Quebec",
        "Saskatchewan": "Saskatchewan",
        "Yukon":"Yukon"
    };

statesFiller(countryField);

countryField.on('change',function (e) {
    let self = $(this);
    statesFiller(self);
});



//==== FUNCTIONS DEFINITION

//======= EMAIL VALIDATION
function validateMail(formGroup) {
    let pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
        email = formGroup.find('.form-control').val();
    if(!pattern.test(email)) {
        return true;
    } else {
        return false;
    }
}

//======= PHONE NUMBER VALIDATION
function validatePhoneNumber(formGroup) {
    let pattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/i,
        phoneNumber = formGroup.find('.form-control').val();
    // if(!pattern.test(phoneNumber)) {
    //     return true;
    // } else {
    //     return false;
    // }
    return pattern.test(phoneNumber);
}

//======= CVV VALIDATION
function cvvValidate(self, formGroup) {
    if (self.val().length > 2) {
        return true;
    } else {
        return false;
    }
}

//======= ZIP CODE VALIDATION
function zipCodeValidation(code) {
    let isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(code);
    return isValidZip;
}

let errorMessage = "The field is required";
function notifyError(formControl, errorMessage) {
    let formGroup = formControl.closest('.form-group');
    formGroup.removeClass('field-validated');
    formGroup.addClass('field-invalid');
    if (formGroup.find('.error-message')) {
        formGroup.find('.error-message').remove();
        setTimeout(function () {
            formGroup.append('<p class="error-message text-danger m-0">' + errorMessage + '</p>');
        }, 200);
    } else {
        formGroup.append('<p class="error-message text-danger m-0">' + errorMessage + '</p>');
    }
}

//==== VALIDATION FOR REQUIRED FIELDS
function singleValidation(formControl, formGroup) {
    errorMessage = "The field is required";
    if (formControl.val() !== '') {
        formControl.closest('.form-group.required-group').removeClass('field-invalid');
        formControl.closest('.form-group.required-group').find('.error-message').remove();
        formControl.closest('.form-group.required-group').addClass('field-validated');
        //email validation
        if (formControl.data('validation') === "email") {
            if (formControl.val() != '') {
                errorMessage = "Invalid Email!"
            }
            if (validateMail(formControl.parent())) {
                formControl.closest('.form-group.required-group').removeClass('field-validated');
                notifyError(formControl, errorMessage);
            }
        }

        //phone number validation
        if (formControl.data('validation') === "phone-number") {
            if (formControl.val() != '') {
                errorMessage = "Invalid phone number!"
            }
            if (!validatePhoneNumber(formControl.parent())) {
                formControl.closest('.form-group.required-group').removeClass('field-validated');
                notifyError(formControl, errorMessage);
            }
        }

        //zip code validation
        if (formControl.data('validation') === "zipcode") {
            if (formControl.val() != '') {
                errorMessage = "Invalid ZIP code!"
            }

            if (!zipCodeValidation(formControl.val())) {
                formControl.closest('.form-group.required-group').removeClass('field-validated');
                notifyError(formControl, errorMessage);
            }
        }

        //credit card number validation
        if (formControl.data('validation') === "credit-card") {
            if (formControl.val() != '') {
                errorMessage = "Invalid card number!"
            }
            if(!card_validation()){
                formControl.closest('.form-group.required-group').removeClass('field-validated');
                notifyError(formControl, errorMessage);
            }
        }

        //credit card number validation
        if (formControl.data('validation') === "cvv") {
            if (formControl.val() != '') {
                errorMessage = "Invalid CVC!";
            }

            if (!cvvValidate(formControl, formGroup)) {
                formControl.closest('.form-group.required-group').removeClass('field-validated');
                notifyError(formControl, errorMessage);
            }
        }

        //SELECT FIELD VALIDATION
        if (formControl.val() == 0) {
            formControl.closest('.form-group.required-group').removeClass('field-validated');
            notifyError(formControl, errorMessage);
        }

    } else {
        notifyError(formControl, errorMessage);
    }
}

//==== FIELD VALIDATION CHECK
function isFieldsValidated(self, btnType){
    let formSelector = $('#vendor-reg-form');
    if(btnType === "btnForm"){
        formSelector = self.closest('.form-row');
    }

    let formGroupRequiredSelector = formSelector.find('.form-row-body .form-group.required-group'),
        formGroupValidatedSelector = formSelector.find('.form-row-body .form-group.field-validated'),
        notValidatedField = formSelector.find('.form-row-body .required-group:not(.field-validated)'),
        status = false;

    if(btnType === "btnPayment"){
        formGroupRequiredSelector = formSelector.find('.form-group.required-group');
        formGroupValidatedSelector = formSelector.find('.form-group.field-validated');
        notValidatedField = formSelector.find('.required-group:not(.field-validated)');
    }

    console.log('required form field',formGroupRequiredSelector.length);
    console.log('not validated form field',notValidatedField.length);

    if(btnType === "btnForm" || btnType === "btnPayment"){
        if(notValidatedField.length>0){
            console.log('found!');
            notValidatedField.first().find('.form-control').focus();
        }else{
            $('.loader-div').addClass('active');
            setTimeout(function (e) {
                self.closest('.form-row').removeClass('active').addClass('edited');
                self.closest('.form-row').next().addClass('active');
                $('.loader-div').removeClass('active');
            },400);
            status = true;
        }
    }
    return status;
}

//==== CARD VALIDATION
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
        creditCardImageHolder.html("<img src='/Content/event-management-assets/individual-multiple-assets/images/" + cardType + ".png'>");
    } else {
        console.log('no card selected');
        creditCardImageHolder.html("<img src='/Content/event-management-assets/individual-multiple-assets/images/unknown.png'>");
    }
    if (Payment.fns.validateCardNumber(J.val(number))) {
        creditCardField.removeClass('invalid');
        creditCardField.addClass('valid');
        // creditCardField.closest('.input-wrap').find('.warning-message').hide();
        return true;
    } else {
        creditCardField.removeClass('valid');
        creditCardField.addClass('invalid');
        // creditCardField.closest('.input-wrap').find('.warning-message').show();
        return false;
    }
}

//==== STATES FILLER
function statesFiller(countryFieldSelector){
    if(countryFieldSelector.val()=="USA"){
        countryFieldSelector.closest('.form-row').find('.state-field-group .state-holder').html("<select class='form-control state' name='State'></select>");
        countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='0'>Select a State</option>");
        for (let key in statesJson){
            countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='"+statesJson[key]+"'>"+statesJson[key]+"</option>")
        }
    }else if(countryFieldSelector.val()=="Canada"){
        countryFieldSelector.closest('.form-row').find('.state-field-group .state-holder').html("<select class='form-control state' name='State'></select>");
        countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='0'>Select a State</option>");
        for (let key in statesCanadaJson){
            countryFieldSelector.closest('.form-row').find('.state-field-group').find('select').append("<option value='"+statesCanadaJson[key]+"'>"+statesCanadaJson[key]+"</option>")
        }
    }else{
        countryFieldSelector.closest('.form-row').find('.state-field-group .state-holder').html("<input type='text' class='form-control state' name='State'>");
    }
}

goDownShowHide();
$(window).on('scroll', function (e) {
    goDownShowHide();
});

function goDownShowHide() {
    let scrollY = $(document).scrollTop();
    if (scrollY > ($(document).height() - 1200)) {
        $('.go-down').fadeOut();
    } else {
        $('.go-down').fadeIn();
    }
}

$('.go-down').on('click', function (e) {
    window.scrollTo({ top: $('.terms-wrapper').height(), behavior: 'smooth' });
});

//==== STICKY SIDEBAR
let sidebar = $('.sidebar'),
    sidebar_right = (($('body').outerWidth() - ($('.container').outerWidth() - 30))/2),
    banner = $('.main-banner'),
    bannrHeight = banner.outerHeight(),
    contentDiv = $('.content-div'),
    footer = $('.footer'),
    footerHeight = footer.outerHeight(),
    screen_width = screen.width;

let bannerOffset = parseInt(bannrHeight)+5;
if(screen_width>1599){
    let bannerOffset = parseInt(bannrHeight)+10;
}
if(screen_width>992){
    banner.waypoint({
        handler: function(direction) {
            if(direction === "down"){
                console.log('Down scrolling: banner out of viewport!');
                sidebarSticky();

            }

            if(direction === "up"){
                console.log('Up scrolling: banner in viewport');
                sidebarNotSticky();

            }
        },
        offset: -bannerOffset
    });

    footer.waypoint({
        handler: function(direction) {
            if(direction === "down"){
                console.log('Down scrolling: footer touched!');
                if($('.after-booth-selection').css('display')=="block"){
                    sidebar.height(sidebar.height()-(footerHeight));
                }

            }

            if(direction === "up"){
                console.log('Up scrolling: footer out of viewport');
                if($('.after-booth-selection').css('display')=="block"){
                    sidebar.height('calc(100vh - 20px');
                }

            }
        },
        offset: '120%'
    });
}

function sidebarSticky(){
    if($('.after-booth-selection').css('display')=="block"){
        if($('.after-booth-selection .sidebar').outerHeight() > $('.content-div').outerHeight()){
            contentDiv.height(parseInt(sidebar.height())+bannrHeight);
        }else{
            contentDiv.height('auto');
        }
    }
    sidebar.css({
        'position':'fixed',
        'top':-25,
        'right':sidebar_right,
        'width':363,
        'bottom':70
    });
}

function sidebarNotSticky() {
    if($('.after-booth-selection').css('display')=="block"){
        contentDiv.height('auto');
        sidebar.css({
            'position':'static',
            'top':'unset',
            'right':'unset',
            'width':'auto',
            'height':'auto'
        });
    }


}

/****** STICKY SIDEBAR END ******/