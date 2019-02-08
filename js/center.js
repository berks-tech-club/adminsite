var navheight = 0;
 
 function centerLogo() {
    navheight = $(".nav-wrapper").height();
    var logo = $('#logo');
    logo.css("top", navheight / 4);
 }

 centerLogo();

 function mobile() {
     if (window.innerWidth < 1000){
        $(".mobile").css("display", "inline")
        $(".desktop").css("display", "none")
     }
     else{
        $(".mobile").css("display", "none")
        $(".desktop").css("display", "inline")
     }
 }

 mobile();