'use strict';

/*
 * A Design by GraphBerry
 * Author: GraphBerry
 * Author URL: http://graphberry.com
 * License: http://graphberry.com/pages/license
 */
jQuery(document).ready(function ($) {

    var lastId,
        topMenu = $("#top-navigation"),
        topMenuHeight = topMenu.outerHeight(),
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            var href = $(this).attr("href");
            if (href.indexOf("#") === 0) {
                var item = $($(this).attr("href"));
                if (item.length) {
                    return item;
                }
            }
        });

    //Get width of container
    var containerWidth = $('.section .container').width();
    //Resize animated triangle
    $(".triangle").css({
        "border-left": containerWidth / 2 + 'px outset transparent',
        "border-right": containerWidth / 2 + 'px outset transparent'
    });
    $(window).resize(function () {
        containerWidth = $('.section .container').width();
        $(".triangle").css({
            "border-left": containerWidth / 2 + 'px outset transparent',
            "border-right": containerWidth / 2 + 'px outset transparent'
        });
    });


    //Initialize header slider.
    $('#da-slider').cslider();

    //Initial mixitup, used for animated filtering portgolio.
    $('#portfolio-grid').mixitup({
        'onMixStart': function (config) {
            $('div.toggleDiv').hide();
        }
    });

    //Initial Out clients slider in client section
    $('#clint-slider').bxSlider({
        pager: false,
        minSlides: 1,
        maxSlides: 5,
        moveSlides: 2,
        slideWidth: 210,
        slideMargin: 25,
        prevSelector: $('#client-prev'),
        nextSelector: $('#client-next'),
        prevText: '<i class="icon-left-open"></i>',
        nextText: '<i class="icon-right-open"></i>'
    });


    $('input, textarea').placeholder();

    // Bind to scroll
    $(window).scroll(function () {

        //Display or hide scroll to top button 
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
        //$('.navbar').addClass('navbar-fixed-top animated fadeInDown');

        // if ($(this).scrollTop() > 130) {
        //     $('.navbar').addClass('navbar-fixed-top animated fadeInDown');
        // } else {
        //     $('.navbar').removeClass('navbar-fixed-top animated fadeInDown');
        // }

        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight + 10;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });

        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href=#" + id + "]").parent().addClass("active");
        }
    });

    /*
     Function for scroliing to top
     ************************************/


    $(window).load(function () {
        function filterPath(string) {
            return string.replace(/^\//, '').replace(/(index|default).[a-zA-Z]{3,4}$/, '').replace(/\/$/, '');
        }

        $('a[href*=#]').each(function () {
            if (filterPath(location.pathname) == filterPath(this.pathname) && location.hostname == this.hostname && this.hash.replace(/#/, '')) {
                var $targetId = $(this.hash),
                    $targetAnchor = $('[name=' + this.hash.slice(1) + ']');
                var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;

                if ($target) {

                    $(this).click(function () {

                        //Hack collapse top navigation after clicking
                        topMenu.parent().attr('style', 'height:0px').removeClass('in'); //Close navigation
                        $('.navbar .btn-navbar').addClass('collapsed');

                        var targetOffset = $target.offset().top - 63;
                        $('html, body').animate({
                            scrollTop: targetOffset
                        }, 800);
                        return false;
                    });
                }
            }
        });
    });

    //Function for show or hide portfolio desctiption.
    $.fn.showHide = function (options) {
        var defaults = {
            speed: 1000,
            easing: '',
            changeText: 0,
            showText: 'Show',
            hideText: 'Hide'
        };
        var options = $.extend(defaults, options);
        $(this).click(function () {
            $('.toggleDiv').slideUp(options.speed, options.easing);
            var toggleClick = $(this);
            var toggleDiv = $(this).attr('rel');
            $(toggleDiv).slideToggle(options.speed, options.easing, function () {
                if (options.changeText == 1) {
                    $(toggleDiv).is(":visible") ? toggleClick.text(options.hideText) : toggleClick.text(options.showText);
                }
            });
            return false;
        });
    };

    //Initial Show/Hide portfolio element.
    $('div.toggleDiv').hide();
    $('.show_hide').showHide({
        speed: 500,
        changeText: 0,
        showText: 'View',
        hideText: 'Close'
    });

    /************************
     Animate elements
     *************************/

    //Animate thumbnails 
    jQuery('.thumbnail').one('inview', function (event, visible) {
        if (visible == true) {
            jQuery(this).addClass("animated fadeInDown");
        } else {
            jQuery(this).removeClass("animated fadeInDown");
        }
    });

    //Animate triangles
    jQuery('.triangle').bind('inview', function (event, visible) {
        if (visible == true) {
            jQuery(this).addClass("animated fadeInDown");
        } else {
            jQuery(this).removeClass("animated fadeInDown");
        }
    });

    //animate first team member
    jQuery('#first-person').bind('inview', function (event, visible) {
        if (visible == true) {
            jQuery('#first-person').addClass("animated pulse");
        } else {
            jQuery('#first-person').removeClass("animated pulse");
        }
    });

    //animate sectond team member
    jQuery('#second-person').bind('inview', function (event, visible) {
        if (visible == true) {
            jQuery('#second-person').addClass("animated pulse");
        } else {
            jQuery('#second-person').removeClass("animated pulse");
        }
    });

    //animate thrid team member
    jQuery('#third-person').bind('inview', function (event, visible) {
        if (visible == true) {
            jQuery('#third-person').addClass("animated pulse");
        } else {
            jQuery('#third-person').removeClass("animated pulse");
        }
    });

    //Animate price columns
    jQuery('.price-column, .testimonial').bind('inview', function (event, visible) {
        if (visible == true) {
            jQuery(this).addClass("animated fadeInDown");
        } else {
            jQuery(this).removeClass("animated fadeInDown");
        }
    });

    //Animate skill bars
    jQuery('.skills > li > span').one('inview', function (event, visible) {
        if (visible == true) {
            jQuery(this).each(function () {
                jQuery(this).animate({
                    width: jQuery(this).attr('data-width')
                }, 3000);
            });
        }
    });
});

//Initialize google map for contact setion with your location.

function initMap() {
    var locations = [
        // agregar los puntos
        ['BARKET Constructora San Cristobal', -25.904442, -55.449497, 1],
        ['BARKET Constructora Encarnación', -27.3365243, -55.8600586, 2]
    ];
    //en el atributo center agregar el punto central entre los puntos de tal manera a que se pueda visualizar bien.
    //agregar zoom adecuado
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 8,
        center: new google.maps.LatLng(-26.312268, -57.812689),
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        // google.maps.event.addListener(marker, 'click', (function(marker, i) {
        //     return function() {
        //     infowindow.setContent(locations[i][0]);
        //     infowindow.open(map, marker);
        //     }
        // })(marker, i));


        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
    }

}

function send() {
    var v = grecaptcha.getResponse();

    if (v.length == 0) {
        document.getElementById("message_captcha_error").style.display = '';
    }
    else {
        var name, email, text;
        name = document.getElementById("contact_form").elements["name"].value;
        email = document.getElementById("contact_form").elements["email"].value;
        text = document.getElementById("contact_form").elements["comment"].value;
        document.getElementById("successSend").style.display = '';
        document.getElementById("contact_form").elements["name"].value = '';
        document.getElementById("contact_form").elements["email"].value = '';
        document.getElementById("contact_form").elements["comment"].value = '';
        $.get("send", {name: name, email: email, text: text}, function (data) {
            if (data == "sent") {
                document.getElementById("successSend").style.display = '';
                document.getElementById("errorSend").style.display = 'none';
            } else {
                document.getElementById("errorSend").style.display = '';
                document.getElementById("successSend").style.display = 'none';
            }

        });
    }
}
