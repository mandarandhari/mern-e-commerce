/*global $, document, window, lightbox, setTimeout, jQuery, makeItFixed*/
$(document).ready(function () {

    'use strict';

    // ------------------------------------------------------- //
    // Add shadow for navbar & show/hide scroll to top btn
    // ------------------------------------------------------ //
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $('nav.navbar').addClass('active');
        } else {
            $('nav.navbar').removeClass('active');
        }

        if ($(window).scrollTop() > 1000) {
            $('#scrollTop').fadeIn();
        } else {
            jQuery('#scrollTop').fadeOut('slow');
        }

        function makeItFixed(x) {
            if ($(window).scrollTop() >= x) {
                $('nav.navbar').addClass('fixed-top');
                $('section.hero, section.home-hero').addClass('is-fixed');
            } else {
                $('nav.navbar').removeClass('fixed-top');
                $('section.hero, section.home-hero').removeClass('is-fixed');
            }
        }

        if ($(window).outerWidth() >= 992) {
            makeItFixed(40);
        }

        if ($(window).outerWidth() < 992) {
            makeItFixed(0);
        }
    });

    // ---------------------------------------------- //
    // Preventing URL update on navigation link click
    // ---------------------------------------------- //
    $('.buy').bind('click', function (e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 80
        }, 1000);
        e.preventDefault();
    });

    // ------------------------------------------------------- //
    // Scroll to top on click
    // ------------------------------------------------------ //
    $('#scrollTop').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1000);
    });

    // ------------------------------------------------------- //
    // Languages drop down initialization
    // ------------------------------------------------------ //
    $('.langs').dropdown();

    // ------------------------------------------------------- //
    // Bootstrap Select initialization
    // ------------------------------------------------------ //
    $('.selectpicker').selectpicker();

    // ------------------------------------------------------- //
    // Parallax effect on divider section
    // ------------------------------------------------------ //
    // $(window).scroll(function () {

    //     var scroll = $(this).scrollTop();

    //     if ($(window).width() > 1250) {
    //         $('section.divider').css({
    //             'background-position': 'left -' + scroll / 6 + 'px'
    //         });
    //     } else {
    //         $('section.divider').css({
    //             'background-position': 'center bottom'
    //         });
    //     }
    // });

    // ------------------------------------------------------- //
    // Contact Form
    // ------------------------------------------------------ //
    // Apply the transform effect on focus
    $('input, textarea').focus(function () {
        $(this).siblings('label').addClass('active');
        $(this).addClass('active');
    });
    $('input, textarea').blur(function () {
        $(this).siblings('label').removeClass('active');
        $(this).removeClass('active');
    });

    // check if the input has a value
    $('input, textarea').blur(function () {
        if ($(this).val().length > 0) {
            $(this).siblings('label').addClass('active');
        } else {
            $(this).siblings('label').removeClass('active');
        }
    });

    // ------------------------------------------------------- //
    // Lightbox initialization
    // ------------------------------------------------------ //
    lightbox.option({
        'resizeDuration': 400,
        'fadeDuration': 400,
        'alwaysShowNavOnTouchDevices': true
    });

    // ------------------------------------------------------- //
    // Add to cart popup
    // ------------------------------------------------------ //
    // $('a.expand').click(function (event) {
    //     event.preventDefault();
    //     $('body').css('overflow', 'hidden');

    //     var popupId = $(this).attr('data-target'),
    //         popUpOverlay = $(popupId),
    //         popUpWindow = popUpOverlay.find('.cart-popup');

    //     popUpOverlay.fadeIn();
    //     popUpOverlay.addClass('active');

    //     // This part is only for demo purposes, delete for production

    //     var source = $(this).parents('.item-image').find('img').attr('src'),
    //         name = $(this).parents('.item-image').siblings('.item-info').find('h5').text(),
    //         price = $(this).parents('.item-image').siblings('.item-info').find('li.current').text(),
    //         popupProfile = $('.cart-popup .item-profile img');


    //     popupProfile.attr('src', source);
    //     popUpWindow.find('.item-info h2').text(name);
    //     popUpWindow.find('.item-info li.price').text(price);

    //     // Delete until here

    //     setTimeout(function () {
    //         popUpWindow.addClass('fade-in-up').addClass('active');
    //     }, 200);
    // });

    // $('.cart-popup-overlay .close-btn').click(function () {

    //     $('.cart-popup-overlay.active').fadeOut().removeClass('active');
    //     $('.cart-popup.active').removeClass('fade-in-up').removeClass('active');
    //     $('body').css('overflow', 'auto');
    // });

    // ------------------------------------------------------ //
    // For demo purposes, can be deleted
    // ------------------------------------------------------ //

    var stylesheet = $('link#theme-stylesheet');
    $( "<link id='new-stylesheet' rel='stylesheet'>" ).insertAfter(stylesheet);
    var alternateColour = $('link#new-stylesheet');

    if ($.cookie("theme_csspath")) {
        alternateColour.attr("href", $.cookie("theme_csspath"));
    }

    $("#colour").change(function () {

        if ($(this).val() !== '') {

            var theme_csspath = 'css/style.' + $(this).val() + '.css';

            alternateColour.attr("href", theme_csspath);

            $.cookie("theme_csspath", theme_csspath, { expires: 365, path: document.URL.substr(0, document.URL.lastIndexOf('/')) });

        }

        return false;
    });

});
