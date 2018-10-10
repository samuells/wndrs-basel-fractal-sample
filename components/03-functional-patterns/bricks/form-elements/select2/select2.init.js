//=include select2.js

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.select2 = {
    attach: function (context, settings) {
      $(context).find('.js-select').select2({
        theme: 'wondrous'
      });
    }
  }
})(jQuery, Drupal);
