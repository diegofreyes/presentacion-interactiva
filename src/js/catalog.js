(function(){
    $(document).ready(function(){

        var $wrapperOverlay = $('.wrapper-overlay')
        var $catalogItem = $('.catalog-item')
        var $productCont = $('.product-container')
        var $productContClose = $('.product-container__close')

        $catalogItem.on('click', function(){
            $productCont.addClass('active')
            $wrapperOverlay.addClass('active')
        })

        $productContClose.on('click', function(){
            $wrapperOverlay.removeClass('active')
            $productCont.removeClass('active')
        })

    })
})()