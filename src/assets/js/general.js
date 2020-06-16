$(document).ready(function () {
    let year = new Date().getFullYear();
    $('#year').text(year);

    /**
     * Initialize wow js
     */
    let wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
        callback: function (box) {
            // the callback is fired every time an animation is started the argument that is
            // passed in is the DOM node being animated
        },
        scrollContainer: null // optional scroll container selector, otherwise use window
    });
    wow.init();

    /*$('[data-toggle="tooltip"]').tooltip({
        animation: true
    });*/

    //toggle between text and password, save the stress of confirm password input
    $('.userpwd, .userpwdReg').on('click', function () {
        $(this).toggleClass("fa-eye fa-eye-slash");
        let field = $($(this).attr("toggle"));
        if (field.attr("type") === "password") {
            field.attr("type", "text");
        } else {
            field.attr("type", "password");
        }
    });

    //General Function
    populateCountries("country", "state");

    //initialize the drop-down for deliver cities based on state selected
    $("#state, #sta").change(function () {
        var cities = $(this).find(":selected").text();
        $.ajax({
            url: '/js/city.json',
            dataType: 'json',
            success: function (res) {
                for (var i = 0; i < res.length; i++) {
                    var a = res[i][cities];
                    // console.log(a);
                    if (a) {
                        var options = '';
                        for (var j = 0; j < a.length; j++) {
                            options += '<option value="' + a[j] + '">' + a[j] + '</option>';
                            $('#city').html(options);
                        }
                    }
                }
            },
            error: function (e) {
                // console.log(e);
            }
        })
    });

    //Populate the Local Govt Option for user to select
    $('#state, #sta').change(function () {
        let lga = $(this).find(":selected").text();
        $.ajax({
            url: '/js/lga-state.json',
            dataType: 'json',
            success: function (result) {
                for (let i = 0; i < result.length; i++) {
                    let a = result[i][lga];
                    if (a) {
                        let options = '<option value="" hidden>--Select Local Govt--</option>';
                        for (let j = 0; j < a.length; j++) {
                            options += '<option value="' + a[j] + '">' + a[j] + '</option>';
                            $('#cityId, #lga').html(options);
                        }
                    }
                }
            },
            error: function (e) {
                //console.log(e);
            }
        })
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() >= 1)
            $('.header').addClass('scrolled');
        else
            $('.header').removeClass('scrolled');
    });

    //control the mobile nav
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 1)
            $('.topNav').addClass('scrolled');
        else
            $('.topNav').removeClass('scrolled');
    });



});

window.onscroll = function () {
    scrollFunction();
};

function formatCurrency(num) {
    return '₦' + num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

function limitDigit(length, inputID = '') {
    $(inputID).attr('maxlength', length)
}

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("icon-top").style.display = "block";
    } else {
        document.getElementById("icon-top").style.display = "none";
    }
}

function topFunction() {
    $('html, body').animate({
        scrollTop: 0
    });
}