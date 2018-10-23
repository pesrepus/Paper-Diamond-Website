// *************************************
//
// Author: Sebastian Thaler
// Email: sebi.thaler@gmail.com
//
// *************************************

/* global $, jQuery, Foundation */

// ---------------------------
// Foundation Configuration
// ---------------------------

$(document).foundation();

// ---------------------------
// jQuery document ready
// ---------------------------

$(document).ready(function () {

    "use strict";

    // --------------------------------
    // Scroll to Anchor
    // --------------------------------

    $('a[href*=\\#]:not([href=\\#])').bind('click', function (event) {
        if ($(this).attr('href').toLowerCase().indexOf('#') >= 0) {
            event.preventDefault();

            // setTimeout -> foundation framework fix
            // if link is in menu on mobile -> wait till menu is closed
            setTimeout($.proxy(function () {
                var $anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top
                }, 1500, 'easeInOutExpo');
            }, this), 50);
        }
    });

    // --------------------------------
    // Scroll Reveal
    // --------------------------------

    // Changing the defaults
    window.sr = ScrollReveal({
        origin: 'bottom',
        distance: '10px',
        duration: 500,
        delay: 0,
        opacity: 0,
        scale: 0.9,
        easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        mobile: false,
        // Change when an element is considered in the viewport. The default value
        // of 0.20 means 20% of an element must be visible for its reveal to occur.
        viewFactor: 0.2,
    });

    // Landing

    sr.reveal('.intro-container img', {
        distance: 0,
        duration: 2000,
        scale: 1.5,
        easing: 'cubic-bezier(0.77, 0, 0.175, 1)'
    });

    sr.reveal('.intro-container h1, .intro-container p, .quickdown', {
        duration: 1000,
        scale: 1,
        delay: 750
    });

    sr.reveal('.top-bar', {
        origin: 'top',
        duration: 1000,
        scale: 1,
        delay: 750
    });

    // Content: Quote

    sr.reveal('.co-quote .row', {
        distance: 0,
        duration: 1000
    });

    // Content: Services

    sr.reveal('.co-services .items .columns', {
        distance: '20px',
        duration: 2000,
        scale: 1
    }, 400);

	 // Content: Projects

	 sr.reveal('.co-projects .project:nth-child(2n+1) .proj-img img', {
		 origin: 'right',
		 distance: '40px',
		 duration: 1500,
		 scale: 1,
		 viewFactor: 0.4
    });

	 sr.reveal('.co-projects .project:nth-child(2n) .proj-img img', {
		 origin: 'left',
		 distance: '40px',
		 duration: 1500,
		 scale: 1,
		 viewFactor: 0.4
    });

	 $('.co-projects .project').each(function(index) {
		 var className = 'proj-' + index;
		 var revealName = '.co-projects .' + className + ' .text .tag';

		 $(this).addClass(className);

		 sr.reveal(revealName, {
			 origin: 'right',
			 distance: '20px',
			 duration: 1500,
			 scale: 1,
			 delay: 200
	    }, 300);
	 });

    // Content: Team

    sr.reveal('.co-team .team .columns', {
        distance: 0,
        duration: 2000,
        scale: 1
    }, 400);

});
