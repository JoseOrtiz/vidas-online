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
    animSpeed: 500,
    effect: 'slideInLeft',
  });
  $('#uploadimg').click(function(){
    $('.upload').click();
  });
};
var showRecords = function(){
  $('.expand').click(function(){
    $('.records-outer').animate({'height':'500px'},600);
  });
  $('.records').click(function(){
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
}
var hideInstagram = function(){
  $(document).mouseup(function (e){
    var container = $(".info:visible");
    if (container.length>0 && !container.is(e.target) && container.has(e.target).length === 0){
        e.preventDefault();
        container.hide();
        fadeInInstagram();
    }
  });
}
var fadeOutInstagram = function() {
  $('.logo').fadeTo('200','0.2');
  $('.vidasonline').fadeTo('200','0.2');
  $('.main').fadeTo('200','0.2');
  $('.center').fadeTo('200','0.2');
  $('.conditions').fadeTo('200','0.2');
  $('.contract').fadeTo('200','0.2');
  $('.holder').fadeTo('200','0.2');
  $('header hr').fadeTo('200','0.2');
}

var fadeInInstagram = function() {
  $('.logo').fadeTo('100','1');
  $('.vidasonline').fadeTo('100','1');
  $('.main').fadeTo('100','1');
  $('.center').fadeTo('100','1');
  $('.conditions').fadeTo('100','1');
  $('.contract').fadeTo('100','1');
  $('.holder').fadeTo('100','1');
  $('header hr').fadeTo('100','1');
}

var instagramFetch = function() {
  $('.insta-cont, .uploaded-cont').click(function(event) {
    var link = $(this).data('link');
    $.ajax({
        url: link,
        type: 'get',
        success: function(data){
          fadeOutInstagram();
          showInstagram(data);
        },
    });
  });
}
var fadeOutVidasOnline = function(){
  $('.records, .upload, header hr, .main, footer').fadeTo('100','0.2');
  $('.logo').fadeTo('100','0.2');
}
var fadeInVidasOnline = function(){
  $('.logo').fadeTo('100','1');
  $('.records').fadeTo('100','1');
  $('.upload').fadeTo('100','1');
  $('.main').fadeTo('100','1');
  $('header hr').fadeTo('100','1');
  $('footer').fadeTo('100','1');
}
var fadeOutRecords = function(){
  $('.vidasonline, .upload, header hr, .main, footer').fadeTo('100','0.2');
  $('.logo').fadeTo('100','0.2');
}
var fadeInRecords = function(){
  $('.vidasonline, .upload, header hr, .main, footer').fadeTo('100','1');
  $('.logo').fadeTo('100','1');
}
var vidasonline = function(){
  $('.vidasonline').click(function(){
    TINY.box.show({
      url:'about',
      openjs: fadeOutVidasOnline,
      closejs: fadeInVidasOnline,
      close: false,
    });
  });
}
var showUpload = function(){
  $('.upload').click(function(){
    TINY.box.show({
      url:Routes.upload_path(),
      openjs: function(){ fadeOutRecords(), loginEvent()},
      closejs: fadeInRecords,
      close: false,
    });
  });
}
var loginEvent = function(){
  $('.emailreg').on('click',function(){
    TINY.box.show({
      url:Routes.emailregistration_path(),
      openjs: function(){ fadeOutRecords(), emailRegistration()},
      closejs: fadeInRecords,
      close: false,
    });
  });
  $('#login').on('click',function(){
    TINY.box.show({
      url:Routes.new_session_path(),
      openjs: function() {fadeOutRecords(), login()},
      closejs: fadeInRecords,
      close: false,
    });
  });
}
var emailRegistration = function(){
  $('#register').on('click',function(){
    $.ajax({
      type: "POST",
      url: Routes.users_path(),
      data: $("#new_user").serialize(),
      success: function(data){
        TINY.box.show({
          url:Routes.log_in_path(),
          openjs: function(){fadeOutRecords(), login()},
          closejs: fadeInRecords,
          close: false,
        });
      },
      error: function(data){
        alert('Error en formulario');
      }
    });
    return false;
  });
  $('#new_user').on('submit',function(){
    $('#register').click();
    return false;
  });
}

var login = function(){
  $('#login').on('click',function(){
    $.ajax({
      type: "POST",
      url: Routes.sessions_path(),
      data: $("#login_form").serialize(),
      success: function(data){
        TINY.box.show({
          url:Routes.upload_path(),
          openjs: fadeOutRecords,
          closejs: fadeInRecords,
          close: false,
        });
      },
      error: function(data){
        alert('Usuario o contraseña incorrecta');
      }
    });
    return false;
  });
  $('#login_form').on('submit',function(){
    $('#login').click();
    return false;
  });
}
$(document).ready(function(){
  logogif(0);
  startSlider();
  showRecords();
  hideRecords();
  sliderEffects();
  instagramFetch();
  hideInstagram();
  vidasonline();
  showUpload();
  $(".holder").perfectScrollbar({
    suppressScrollX: true,
    wheelSpeed: 50,
  });
});