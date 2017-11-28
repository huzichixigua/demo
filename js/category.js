$(function(){
    new IScroll(".category-article");
    var aside = $(".category-aside");
    var ul = $(".category-aside ul");
    var lis = $(".category-aside ul li");
    var moveY = 0;
    var startY = 0; 
    var target = 0;
    var tempY = 0;
    var maxUp = -(ul.outerHeight() - aside.outerHeight() + 50);
    var maxDown = 50;
    var upRange = -(ul.outerHeight() - aside.outerHeight());
    var downRange = 0;
    aside.on("touchstart",function(e){
        startY = e.changedTouches[0].clientY;
    })
    aside.on("touchmove",function(e){
        ul.css({transition:"none"})
        if(ul.outerHeight() <= aside.outerHeight()) return;
        moveY = e.changedTouches[0].clientY - startY;
        tempY = target + moveY;
        if(tempY >= maxDown){
            tempY = maxDown;
        }else if(tempY <= maxUp){
            tempY = maxUp;
        }
        ul.css({transform:"translateY("+tempY+"px)"})
    })
    aside.on("touchend",function(e){
        target += moveY;
        if(target >= downRange){
            target = downRange;
            ul.css({transition:"all .5s",transform:"translateY("+downRange+"px)"})
        }else if(target <= upRange){
            target = upRange;
            ul.css({transition:"all .5s",transform:"translateY("+upRange+"px)"})
        }
    })
})