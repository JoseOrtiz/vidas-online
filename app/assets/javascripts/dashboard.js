$(document).ready(function(){
  logogif(0);
});

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
  img.css('display','block ');
  setTimeout(function(){logogif(loop);},600);
}
