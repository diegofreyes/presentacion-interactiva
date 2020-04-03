(function(){
    $(document).ready(function(){

        function init()
        {
            var $wrapperOverlay = $('.wrapper-overlay')
            var $catalogItem = $('.catalog-item')
            var $productCont = $('.product-container')
            
            var $productContClose = $('.product-container__close')
    
            $catalogItem.on('click', function(){
                var $id = $(this).attr( 'id' )
                getItem( $id )
                $productCont.addClass('active')
                $wrapperOverlay.addClass('active')
            })
    
            $productContClose.on('click', function(){
                $wrapperOverlay.removeClass('active')
                $productCont.removeClass('active')
            })
        }

        function getItem( id )
        {
            $.each( $products, function( key, value ){
                if( value.id == id){
                    bindItem( value )
                }
            })
        }

        function bindItem ( value )
        {
            var fragmentItem = ''
            fragmentItem += '<figure class="product__img">\
                                <img src="'+value.image+'" alt="">\
                            </figure>\
                            <div class="product__content">\
                                <h1 class="product__name">'+ value.name +'</h1>\
                                <span class="product__sku">SKU '+ value.sku +'</span>\
                                <p class="product__excerpt">'+ value.excerpt +'</p>\
                                <div class="product__data"><h2 class="product__subtitle">Especificaciones</h2>\
                                <table class="product__datasheet">'
            $.each( value.datasheet, function( key, item ){
                fragmentItem += '<tr>\
                                    <th>'+ item.name +'</th>\
                                    <td>'+ item.value +'</td>\
                                </tr>'
            })

            fragmentItem += '</table></div></div>'
                                    
            $product.html( fragmentItem )
        }

        var $product = $('.product')
        var $products
        var $catalogContainer = $('.catalog-container')

        function getProductsJSON( file, callback )
        {
            var rawFile = new XMLHttpRequest()
            rawFile.overrideMimeType("application/json")
            rawFile.open("GET", file, true)
            rawFile.onreadystatechange = function() {
                if( rawFile.readyState === 4 && rawFile.status == "200"){
                    callback(rawFile.responseText)
                }
            }
            rawFile.send(null)
        }

        

        function buildProducts()
        {
            var fragment = '';
            $.each( $products, function( key, value ){
                fragment += '<div class="catalog-item-container animated fadeInUp">\
                                <div class="catalog-item" id="'+ value.id +'">\
                                    <figure class="catalog-item__image">\
                                        <img src="'+ value.image +'" alt="">\
                                    </figure>\
                                    <div class="catalog-item__info">\
                                        <h1 class="catalog-item__name">'+ value.name +'</h1>\
                                        <span class="catalog-item__sku">SKU '+ value.sku +'</span>\
                                    </div>\
                                    <a href="#" class="catalog-item__view">Ver especificaciones</a>\
                                </div>\
                            </div>'
            })

            $catalogContainer.html(fragment)
            
            init()
        }

        getProductsJSON("./assets/products.json", function(text){
            $products = $.parseJSON(text)
            console.log($products)
            buildProducts()
        })

    })
})()
    



   
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

$(document).ready(function(){
    var $map = $(".map-container")
    var $first, $second, $third

    if( $map.length > 0){
        
        setTimeout(
            function(){
                init()
            },
            1500
        )
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