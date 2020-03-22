$(document).ready(function(){
    var $map = $(".map-container")
    var $first, $second, $third

    if( $map.length > 0){
        init()
    }

    function init(){
        $first = $(".guide--first")
        $second = $(".guide--second")
        $third = $(".guide--third")

        $first.addClass('active')
        setTimeout(
            function(){
                $second.addClass('active')
                setTimeout(
                    function(){
                        $third.addClass('active')
                    },
                    1000
                )
            },
            1000 
        )
    }
})