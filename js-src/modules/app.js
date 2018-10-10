/* global FastClick, Foundation */

(function ($, Drupal, drupalSettings, window, document, FastClick) {
  'use strict';

  Drupal.behaviors.init = {
    attach: function (context, drupalSettings) {

      FastClick.attach(window.document.body);
      $(window.document).foundation();
    }
  };

})(jQuery, Drupal, drupalSettings, window, window.document, FastClick);
