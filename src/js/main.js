// main slider

var mainSliderOptions = {
    sliderId: 'main-slider',
    orientation: 'horizontal',
    thumbWidth: 'auto',
    thumbHeight: 'auto',
    showMode: 3,
    autoAdvance: false,
    selectable: true,
    slideInterval: 3000,
    transitionSpeed: 1000,
    shuffle: false,
    startSlideIndex: 2,
    pauseOnHover: true,
    initSliderByCallingInitFunc: false,
    rightGap: 'default',
    keyboardNav: true,
    mousewheelNav: false,
    before: null,
    license: 'mylicense'
};

var imageObject = {
    hoverSwap: function(obj) {
        obj.hover(function() {
            var activeImage = $(this).children('.active-img');
            activeImage.removeClass('active-img').fadeOut(500);
            if (activeImage.next().length > 0) {
                activeImage.next().addClass('active-img').fadeIn(500);
            } else {
                $(this).children('.thumb:first-child').addClass('active-img').fadeIn(500);
            }
            return false;
        });
    }
};
$(function() {
    imageObject.hoverSwap($('li'));
});

// sub slider

$('.bxslider').bxSlider({
    mode: 'vertical',
    useCSS: 'true',
    controls: 'true',
    prevText: '',
    nextText: ''
});

// tabs

$('.tabs-content-block').not(':first').hide();
$('.tabs-block').click(function() {
    $('.tabs-block').removeClass('tabs-block--active').eq($(this).index()).addClass('tabs-block--active');
    $('.tabs-content-block').hide().eq($(this).index()).fadeIn('normal');
}).eq(0).addClass('tabs-block--active');

(function($) {
    $.fn.tabs = function() {
        return this.each(function() {});
    };
})(jQuery);
