

   
$(document).ready(function(){
    var $video = $('.video');
    if( $video.length ){
        $video[0].play();
    }

    
})
  
window.oncontextmenu = function() {
    return false;
}

var time = new Date().getTime();
$(document.body).bind("mousemove keypress", function(e) {
    time = new Date().getTime();
});

function refresh() {
    if(new Date().getTime() - time >= 10000) 
        window.location.reload(true);
    else 
        setTimeout(refresh, 5000);
        console.log( "refresh 2");
}

setTimeout(refresh, 5000);
