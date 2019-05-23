$(document).ready(function () {
    var pageURL = window.location.pathname;
    if(pageURL === "/") {
        $('.header').removeClass('scrolled');
    } else {
        $('.header').addClass('scrolled');
    }
    
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 1)
            $('.header').addClass('scrolled');
        else
            $('.header').removeClass('scrolled');
    })

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

    $('.userpwd, .userpwdReg').on('click', function () {
        $(this).toggleClass("fa-eye fa-eye-slash");
        let field = $($(this).attr("toggle"));
        if (field.attr("type") === "password") {
            field.attr("type", "text");
        } else {
            field.attr("type", "password");
        }
    });

    // let mySwiper = new Swiper ('.swiper-container',{
    //     direction:'horizontal',
    //     loop: true
    // })
    //
    // mySwiper.init();

    // Add smooth scrolling to all links
    $('a').on('click', function(e) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            e.preventDefault();

            // Store hash
            var hash = this.hash;
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 600, function(){

                // Add hash (#) to URL when done scrolling (default click behavior)
                //window.location.hash = hash;

            });
        } // End if
    });

})
window.onscroll = function () {
    scrollFunction()
};

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

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const items = document.querySelectorAll('.accordion a');

items.forEach(item => item.addEventListener('click', toggleAccordion));

function toggleAccordion() {
    this.classList.toggle('active');
    this.nextElementSibling.classList.toggle('active');
}