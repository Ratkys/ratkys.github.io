$(document).ready(function() {

    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    particlesJS.load('particles-js', 'assets/js/particles.json', function() {
        console.log('callback - particles.js config loaded');
    });

    $(".button-collapse").sideNav();
    $('.scrollspy').scrollSpy();

    jQuery(function ($) {
        'use strict';

        // -------------------------------------------------------------
        // Animated scrolling / Scroll Up
        // -------------------------------------------------------------

        (function () {
            $('a[href*=#]').bind("click", function(e){
                var anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: $(anchor.attr('href')).offset().top
                }, 1000);
                e.preventDefault();
            });
        }());

        // -------------------------------------------------------------
        // Full Screen Slider
        // -------------------------------------------------------------

        (function () {
            $(".tt-fullHeight").height($(window).height());
            $(window).resize(function(){
                $(".tt-fullHeight").height($(window).height());
            });
        }());

        // -------------------------------------------------------------
        // Sticky Menu
        // -------------------------------------------------------------

        (function () {
            $('nav').sticky({
                topSpacing: 0
            });
        }());

        // -------------------------------------------------------------
        // Back To Top
        // -------------------------------------------------------------

        (function () {
            $(window).scroll(function() {
                if ($(this).scrollTop() > 1000) {
                    $('.scroll-up').fadeIn();
                } else {
                    $('.scroll-up').fadeOut();
                }
            });
        }());

        // -------------------------------------------------------------
        // Countup
        // -------------------------------------------------------------

        $('.count-wrap').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                $(this).find('.timer').each(function () {
                    var $this = $(this);
                    $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.ceil(this.Counter));
                        }
                    });
                });
                $(this).unbind('inview');
            }
        });

        // -------------------------------------------------------------
        // Progress Bar
        // -------------------------------------------------------------

        $('.skill-progress').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                $.each($('div.progress-bar'),function(){
                    $(this).css('width', $(this).attr('aria-valuenow')+'%');
                });
                $(this).unbind('inview');
            }
        });

        // -------------------------------------------------------------
        // More skill
        // -------------------------------------------------------------

        $('.more-skill').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                $('.chart').easyPieChart({
                    //your configuration goes here
                    easing: 'easeOut',
                    delay: 3000,
                    barColor:'#68c3a3',
                    trackColor:'rgba(255,255,255,0.2)',
                    scaleColor: false,
                    lineWidth: 8,
                    size: 140,
                    animate: 2000,
                    onStep: function(from, to, percent) {
                        this.el.children[0].innerHTML = Math.round(percent);
                    }
                });
                $(this).unbind('inview');
            }
        });

        // -------------------------------------------------------------
        // Shuffle
        // -------------------------------------------------------------

        (function () {
            var $grid = $('#grid');
            $grid.shuffle({
                itemSelector: '.portfolio-item'
            });
            /* reshuffle when user clicks a filter item */
            var filterBtn = $('.list-inline a');
            filterBtn.click(function (e) {
                e.preventDefault();
                // set active class
                filterBtn.removeClass('active');
                $(this).addClass('active');
                // get group name from clicked item
                var groupName = $(this).attr('data-group');
                // reshuffle grid
                $grid.shuffle('shuffle', groupName );
            });
        }());

        // -------------------------------------------------------------
        // Magnific Popup
        // -------------------------------------------------------------

        (function () {
            $('.image-link').magnificPopup({
                gallery: {
                    enabled: true
                },
                removalDelay: 300, // Delay in milliseconds before popup is removed
                mainClass: 'mfp-with-zoom', // this class is for CSS animation below
                type:'image'
            });
        }());

        // -------------------------------------------------------------
        // STELLAR FOR BACKGROUND SCROLLING
        // -------------------------------------------------------------

        $(window).load(function() {
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

            }else {
                $.stellar({
                    horizontalScrolling: false,
                    responsive: true
                });
            }
        });

        // -------------------------------------------------------------
        // Contact Form
        // -------------------------------------------------------------

        $('#contactForm').on('submit',function(e){
            e.preventDefault();
            var $action = $(this).prop('action');
            var $data = $(this).serialize();
            var $this = $(this);
            $this.prevAll('.alert').remove();
            $.post( $action, $data, function( data ) {
                if( data.response=='error' ){
                    $this.before( '<div class="alert alert-danger">'+data.message+'</div>' );
                }
                if( data.response=='success' ){
                    $this.before( '<div class="alert alert-success">'+data.message+'</div>' );
                    $this.find('input, textarea').val('');
                }
            }, "json");
        });
    });
});
