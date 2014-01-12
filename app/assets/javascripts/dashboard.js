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
    animSpeed: 300,
    effect: 'slideInLeft',
  });
};
var showRecords = function(){
  $('.expand').click(function(){
    $('.records-outer').animate({'height':'500px'},600);
  });
};

var hideRecords = function(){
  $('.contract').click(function(){
    $('.records-outer').animate({'height':'0px'},'fast'); 
  });
}
var sliderEffects = function(){
  $(document).on('mouseover','.nivo-prevNav', function(){
    $('#slider img').attr("data-transition","slideInRight");
  });

  $(document).on('mouseover', '.nivo-nextNav', function(){
    $('#slider img').attr("data-transition","slideInLeft");
  });
  $(document).on('mouseleave','.nivo-prevNav', function(){
    $('#slider img').attr("data-transition","");
  });
}
var showInstagram = function(data){
  var info = $('.info');
  info.html(data);
  info.show();
  $('*:not(.info)').click(function() {
    info.hide();
    event.stopPropagation();
});
}
var instagramFetch = function() {
  $('.insta-cont').click(function () {
    var link = $(this).data('link')
    $.ajax({
        url: link,
        type: 'post',
        success: function(data){
          showInstagram(data);
        },
    });
  });
}
$(document).ready(function(){
  logogif(0);
  startSlider();
  showRecords();
  hideRecords();
  sliderEffects();
  instagramFetch();
  $(".holder").perfectScrollbar({
    suppressScrollX: true,
    wheelSpeed: 50,
  });
});