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
});
