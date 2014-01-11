var lightUp = function() {
  var imgs = $('.lightUp');
  var rnd = imgs.eq(Math.floor(imgs.length*Math.random()));
  rnd.animate({opacity:1}, 100, lightUp);
}

var isogif = function(loop){
  var isotipos = $('.isotipo');
  var img = isotipos.eq(loop);
  img.css('display','none');
  if (loop==2){
    loop=0;
  }
  else{
    loop=loop+1;
  }
  img = isotipos.eq(loop);
  img.css('display','block ');
  setTimeout(function(){isogif(loop);},1000);
};

var addIsotipo = function(){
  setTimeout(function(){isogif(0);},8000);
};
$(document).ready(function(){
  lightUp();
  addIsotipo();
});
