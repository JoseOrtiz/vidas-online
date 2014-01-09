var logogif = function(loop){
  var animate = $('.animate');
  var img = animate.eq(loop);
  img.css('display','none');
  if (loop==2){
    loop=0;
  }
  else{
    loop=loop+1;
  }
  img = animate.eq(loop);
  img.css('display','block');
  setTimeout(function(){logogif(loop);},600);
};
var startSlider = function () {
  $('#slider').nivoSlider({
    directionNavHide: true,
    captionOpacity: 1,
    prevText: '<',
    nextText: '>',
    controlNav: false,
    animSpeed: 1000,
    effect: 'none',
  });
};
var showRecords = function(){
  $('.expand').click(function(){
    $('.records-outer').animate({'height':'550px'},600);
  });
};

var hideRecords = function(){
  $('.contract').click(function(){
    $('.records-outer').animate({'height':'0px'},'fast'); 
  });
}
$(document).ready(function(){
  logogif(0);
  startSlider();
  showRecords();
  hideRecords();
});