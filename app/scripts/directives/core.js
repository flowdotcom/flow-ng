angular.module('flowNgApp').directive('jsViewLoader', function () {
  return {
    link: function (scope, element) {
      var el = jQuery(element);

      // Hide the view loader, populate it with content and style it
      el
        .hide()
        .html('<i class="fa-fw fa fa-refresh fa-spin text-primary"></i>')
        .css({
          'position': 'fixed',
          'top': '20px',
          'left': '50%',
          'height': '20px',
          'width': '20px',
          'margin-left': '-10px',
          'z-index': 99999
        });

      // On state change start event, show the element
      scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        el.fadeIn(250);
      });

      // On state change success event, hide the element
      scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        el.fadeOut(250);
      });
    }
  };
});

// Main navigation functionality
// By adding the attribute 'data-js-main-nav'
angular.module('flowNgApp').directive('jsMainNav', function () {
  return {
    link: function (scope, element) {
      // When a submenu link is clicked
      jQuery('[data-toggle="nav-submenu"]', element).on('click', function (e) {
        // Get link
        var link = jQuery(this);

        // Get link's parent
        var parentLi = link.parent('li');

        if (parentLi.hasClass('open')) { // If submenu is open, close it..
          parentLi.removeClass('open');
        } else { // .. else if submenu is closed, close all other (same level) submenus first before open it
          link
            .closest('ul')
            .find('> li')
            .removeClass('open');

          parentLi
            .addClass('open');
        }

        return false;
      });

      // Remove focus when clicking on a link
      jQuery('a', element).on('click', function () {
        jQuery(this).blur();
      });

      // On state change success event, hide the sidebar in mobile devices
      scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        scope.oneui.settings.sidebarOpenXs = false;
      });
    }
  };
});

// Form helper functionality (placeholder support for IE9 which uses HTML5 Placeholder plugin + Material forms)
// Auto applied to all your form elements (<form>)
angular.module('flowNgApp').directive('form', function () {
  return {
    restrict: 'E',
    link: function (scope, element) {
      // Init form placeholder (for IE9)
      jQuery('.form-control', element).placeholder();

      // Init material forms
      jQuery('.form-material.floating > .form-control', element).each(function () {
        var input = jQuery(this);
        var parent = input.parent('.form-material');

        if (input.val()) {
          parent.addClass('open');
        }

        input.on('change', function () {
          if (input.val()) {
            parent.addClass('open');
          } else {
            parent.removeClass('open');
          }
        });
      });
    }
  };
});

// Blocks options functionality
// By adding the attribute 'data-js-block-option'
angular.module('flowNgApp').directive('jsBlockOption', function () {
  return {
    link: function (scope, element) {
      var el = jQuery(element);

      // Init Icons
      scope.helpers.uiBlocks(false, 'init', el);

      // Call blocks API on click
      el.on('click', function () {
        scope.helpers.uiBlocks(el.closest('.block'), el.data('action'));
      });
    }
  };
});

// Print page on click
// By adding the attribute 'data-js-print'
angular.module('flowNgApp').directive('jsPrint', function () {
  return {
    link: function (scope, element) {
      jQuery(element).on('click', function () {
        // Store all #page-container classes
        var lPage = jQuery('#page-container');
        var pageCls = lPage.prop('class');

        // Remove all classes from #page-container
        lPage.prop('class', '');

        // Print the page
        window.print();

        // Restore all #page-container classes
        lPage.prop('class', pageCls);
      });
    }
  };
});

// Populate element's content with the correct copyright year
// By adding the attribute 'data-js-year-copy'
angular.module('flowNgApp').directive('jsYearCopy', function () {
  return {
    link: function (scope, element) {
      var gdate = new Date();
      var copyright = '2015';

      if (gdate.getFullYear() !== 2015) {
        copyright = copyright + '-' + gdate.getFullYear().toString().substr(2, 2);
      }

      element.text(copyright);
    }
  };
});

// Animated scroll to an element
// By adding the attribute (with custom values) 'data-js-scroll-to="{target: '#target_element_id', speed: 'milliseconds'}"' to a button or a link
angular.module('flowNgApp').directive('jsScrollTo', function () {
  return {
    link: function (scope, element, attrs) {
      var options = (typeof scope.$eval(attrs.jsScrollTo) !== 'undefined') ? scope.$eval(attrs.jsScrollTo) : new Object();

      jQuery(element).on('click', function () {
        jQuery('html, body').animate({
          scrollTop: jQuery(options.target).offset().top
        }, options.speed ? options.speed : 1000);
      });
    }
  };
});

// Toggle a class to a target element
// By adding the attribute (with custom values) 'data-js-toggle-class="{target: '#target_element_id', class: 'class_name_to_toggle'}'
angular.module('flowNgApp').directive('jsToggleClass', function () {
  return {
    link: function (scope, element, attrs) {
      var options = (typeof scope.$eval(attrs.jsToggleClass) !== 'undefined') ? scope.$eval(attrs.jsToggleClass) : new Object();

      jQuery(element).on('click', function () {
        jQuery(options.target).toggleClass(options.class);
      });
    }
  };
});

// Removes focus from an element on click
// By adding the attribute 'data-js-blur'
angular.module('flowNgApp').directive('jsBlur', function () {
  return {
    link: function (scope, element) {
      element.bind('click', function () {
        element.blur();
      });
    }
  };
});
