//=include photoswipe/dist/photoswipe.js
//=include photoswipe/dist/photoswipe-ui-default.js

(function($, Drupal, drupalSettings) {
  Drupal.behaviors.gallery = {
    attach: function(context, settings) {
      $(context).find('.gallery--photo .js-open-gallery, .gallery--photo .gallery-item').on('click', function(event) {
        event.preventDefault();
        var galleryIndex = $(this).parent('.gallery-container').data('gallery-id');
        var imgIndex = 0;
        if ($(this).is('.gallery-item')) {
          imgIndex = $(this).index();
        }
        if (galleryIndex != 0) {
          openPhotoSwipe(galleryIndex, imgIndex);
        }
      });

      var openPhotoSwipe = function(galleryIndex, imgIndex) {
        var pswpElement = document.querySelectorAll('.pswp')[0];

        var items = drupalSettings.gallery_images[galleryIndex];

        var options = {
          history: true,
          focus: true,
          index: imgIndex,
          showHideOpacity: true,
          showAnimationDuration: 333,
          hideAnimationDuration: 333,
          shareEl: false,
          zoomEl: false
        };

        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.listen('gettingData', function(index, item) {
          if (item.w < 1 || item.h < 1) { // unknown size
            var img = new Image();
            img.onload = function() { // will get size after load
              item.width = this.width; // set image width
              item.height = this.height; // set image height
              gallery.invalidateCurrItems(); // reinit Items
              gallery.updateSize(true); // reinit Items
            };
            img.src = item.src; // let's download image
          }
        });
        gallery.init();
      }

      // execute above function
      // initPhotoSwipeFromDOM('.gallery--photo');
    }


  }
})(jQuery, Drupal, drupalSettings);
