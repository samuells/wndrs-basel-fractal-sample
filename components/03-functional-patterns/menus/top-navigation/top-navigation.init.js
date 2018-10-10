//=include _topnav.mmenu.js

(function ($, Drupal) {
  'use strict';

  function createMMTemplate(menuIdsList) {
    var $mmTemplate = $('<nav>', {
      'id': 'mm-menu',
      'class': 'mobile-menu'
    });
    var $listsWrapper = $('<div>');

    $.each(menuIdsList, function (index, menuId) {
      var menuClone = $(menuId).clone();

      rearrangeMenuList(menuClone).appendTo($listsWrapper);
    });

    $listsWrapper.appendTo($mmTemplate);

    return $mmTemplate;
  }

  function rearrangeMenuList($menuClone) {
    var $topMenuList = $menuClone.find('.content > .menu').detach();

    $topMenuList.addClass($menuClone.prop('class'));

    return $topMenuList;
  }

  function init(context) {
    var $menuSlideOutElement = $(context).find('#mm-slideout-selector');

    if (!$menuSlideOutElement.length) {
      return;
    }

    $menuSlideOutElement.once('mmenu').each(function () {
      var $mmTemplate = createMMTemplate([
        '#block-wndrs-main-menu',
        '#block-languageswitcher',
        '#block-metanavigation'
      ]);
      var api = $mmTemplate.data('mmenu');

      $mmTemplate.mmenu({
        // options
      }, {
        // configuration
        classNames: {
          vertical: 'vertical'
        }
      });

      // console.log('MMENU INITILIZIED');

      //   Get the API
      $('.js-toggle-mmenu').click(function () {
        api.close();
      });
    })
  }

  Drupal.behaviors.mmenu = {
    attach: init
  }
})(jQuery, Drupal);
