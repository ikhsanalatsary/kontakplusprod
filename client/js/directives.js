export default function ScrollDirective($window) {
  return function link(scope, element) {
    /* header DOM element with md-page-header attribute */
    const header = document.querySelector('[md-page-header]');
    /* Store header dimensions to initialize header styling */
    let baseDimensions = header.getBoundingClientRect();
    /* DOM element with md-header-title attribute (title in toolbar) */
    const title = angular.element(document.querySelector('[md-header-title]'));
    /* DOM element with md-header-picture attribute (picture in header) */
    const picture = angular.element(document.querySelector('[md-header-picture]'));
    /* DOM element with main-fab class (a DOM element
    which contains the main float action button element) */
    const fab = angular.element(document.querySelector('.main-fab'));
    /* The height of a toolbar by default in Angular Material */
    const legacyToolbarH = 64;
    /* The mid-height of a float action button by default in Angular Material */
    const legacyFabMid = 56 / 2;
    /* The zoom scale of the toolbar title when it's placed at the bottom of the header picture */
    const titleZoom = 1.5;
    /* The primary color palette used by Angular Material */
    const primaryColor = [63, 81, 181];

    function styleInit() {
      title.css('padding-left', '16px');
      title.css('position', 'relative');
      title.css('transform-origin', '24px');
    }

    function handleStyle(dim) {
      fab.css('top', `${(dim.height - legacyFabMid)}px`);
      if ((dim.bottom - baseDimensions.top) > legacyToolbarH) {
        title.css('top', `${((dim.bottom - baseDimensions.top) - legacyToolbarH)}px`);
        element.css('height', `${(dim.bottom - baseDimensions.top)}px`);
        title.css('transform', `scale('${((titleZoom - 1) * (ratio(dim) + 1))}, ${((titleZoom - 1) * (ratio(dim) + 1))})`);
      } else {
        title.css('top', '0px');
        element.css('height', `${legacyToolbarH}px`);
        title.css('transform', 'scale(1, 1)');
      }

      if ((dim.bottom - baseDimensions.top) < legacyToolbarH * 2 && !fab.hasClass('hide')) {
        fab.addClass('hide');
      }

      if ((dim.bottom - baseDimensions.top) > legacyToolbarH * 2 && fab.hasClass('hide')) {
        fab.removeClass('hide');
      }

      element.css('background-color', `rgba(${primaryColor[0]}, ${primaryColor[1]}, ${primaryColor[2]}, ${(1 - ratio(dim))})`);
      picture.css('background-position', `50% ${(ratio(dim) * 50)} %`);
      /* Uncomment the line below if you want shadow inside picture (low performance) */

      // element.css('box-shadow', '0 -' + (dim.height * 3 / 4) + 'px ' + (dim.height / 2) + 'px -'
      //   + (dim.height / 2) + 'px rgba(0,0,0,' + ratio(dim) + ') inset');
    }

    function ratio(dim) {
      const r = (dim.bottom - baseDimensions.top) / dim.height;
      if (r < 0) return 0;
      if (r > 1) return 1;
      return Number(r.toString().match(/^\d+(?:\.\d{0,2})?/));
    }

    styleInit();
    handleStyle(baseDimensions);

    /* Scroll event listener */
    angular.element($window).bind('scroll', () => {
      const dimensions = header.getBoundingClientRect();
      handleStyle(dimensions);
      scope.$apply();
    });

    /* Resize event listener */
    angular.element($window).bind('resize', () => {
      baseDimensions = header.getBoundingClientRect();
      const dimensions = header.getBoundingClientRect();
      handleStyle(dimensions);
      scope.$apply();
    });
  };
}

ScrollDirective.$inject = ['$window'];
