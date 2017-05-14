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


function initSlider() {
  $('.slider').slider();
  console.log("initSlider called");
}


function initCollapsible() {
  $('.collapsible').collapsible();
}
