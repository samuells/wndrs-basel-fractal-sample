//=include owl.carousel/dist/owl.carousel.js

(function ($, Drupal) {
  'use strict';

  function init(context) {
    var $carousel = $(context).find('.owl-carousel');

    if (!$carousel.length) {
      return;
    }

    $carousel.owlCarousel({
      items: 1,
      loop: true,
      responsiveClass: true,
      nav: true,
      responsive: {
        0: {
          items: 1,
          nav: true
        },
        600: {
          items: 1,
          nav: false
        }
      }
    });
  }

  Drupal.behaviors.slider = {
    attach: init
  }
})(jQuery, Drupal);
