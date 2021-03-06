$(document).ready(function () {
  $('.button-collapse').sideNav();
  $('.slider').slider();
  $('.target').pushpin({
    top: 0,
    bottom: 1000,
    offset: 0
  });
});

$('pushpin-nav').each(function () {
  var $this = $(this);
  var $target = $('#nav_push_pin');
  $this.pushpin({
    top: $target.offset().top,
    bottom: $target.offset().top + $target.outerHeight() - $this.height()
  });
});

function initSlider(size) {
  //var val = Math.exp(6.31304 - 0.22587*size);
  $(function() {
    $('.kwicks').kwicks({
      minSize: 160,
      behavior: 'slideshow'
    });
  });
  console.log("initSlider called with size : "+size);
}

function initCollapsible() {
  $('.collapsible').collapsible();
}

function initTabs() {
  $('ul.tabs').tabs();
  console.log("initTabs called");
}
