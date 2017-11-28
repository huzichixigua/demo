$(function () {
    var imgs = $(".carousel ul li"),prev = imgs.length - 1, curr = 0, next = 1,width = imgs.css("width"),timer = null,flag = false,startX = 0,moveX = 0,startTime = null,count = 0,newsUl = $(".news ul"),height = $(".news ul li").css("height"),dTime = parseInt((new Date("Mon Nov 22 2017 17:30:00 GMT+0800") - new Date()) / 1000),hours = 0,minute = 0,seconds = 0,timeSpan = $(".seckill-head-center span");
    $(window).on("scroll", function () {
        $("header").css("backgroundColor", $(window).scrollTop > 400 ? "rgba(201, 21, 35, 0.8)" : "rgba(201, 21, 35, " + window.pageYOffset / 400 * 0.8 + ")");
    });
    $(".carousel").css("height",imgs.css("height"));
    $(window).on("resize",function(){
        $(".carousel").css("height",imgs.css("height"));
    });
    imgs.each(function(i,e){
        $(".carousel ol").append("<li></li>");
        if(i == 0) $(".carousel ol li").addClass("current");
        $(e).css("left",-parseInt(width));
    });
    var points = $(".carousel ol li");
    setTransition(0,0,0);
    setLeft();
    timer = setInterval(showNext,1000);
    $(".carousel").on("touchstart",function(e){
        flag = true;
        startX = e.changedTouches[0].clientX;
        startIime = new Date();
        clearInterval(timer);
    })
    $(".carousel").on("touchmove",function(e){
        flag ?  (moveX = e.changedTouches[0].clientX - startX) && setTransition(0,0,0) || setLeft(moveX) : null;
    })
    $(".carousel").on("touchend",function(e){
        var moveTime = new Date() - startTime;
        Math.abs(moveX) >= parseInt(width) / 3  || moveTime > 300 && moveX > 30 ? (moveX > 0 ? showPrev() : showNext()) : setTransition(1,1,1) || setLeft();
        timer = setInterval(showNext,1000);
    })
    newsUl.append($(".news ul li").eq(0).clone());
    var news = $(".news ul li");
    setInterval(function(){
        count++;
        newsUl.css({transition:"all .5s",transform:"translateY(" + ( - parseInt(height) * count ) + "px)"});
    },1000)
    newsUl.on("transitionend",function(){
        count > news.length - 2 ? (count = 0) || newsUl.css({transition:"none",transform:"translateY(0px)"}) : null;
    })
    time();
    setInterval(time,1000)
    $(".seckill-main ul").css("width",$(".seckill-main ul li").length * parseInt($(".seckill-main ul li").css("width")));
    function time(){
        hours = Math.floor(dTime % 86400 / 3600);
        minutes = Math.floor(dTime % 3600 / 60);
        seconds = Math.floor(dTime % 60);
        timeSpan.html(addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds));
        dTime--;
    }
    function addZero(n){
        return n > 9 ? n : "0" + n;
    }
    function setLeft(moveX){
        moveX = moveX || 0;
        imgs.eq(prev).css("left",-parseInt(width) + moveX);
        imgs.eq(curr).css("left",moveX);
        imgs.eq(next).css("left",parseInt(width) + moveX);
    } 
    function setTransition(a,b,c){
        imgs.eq(prev).css({transition:a ? "all 0.5s" : "none"})
        imgs.eq(curr).css({transition:b ? "all 0.5s" : "none"})
        imgs.eq(next).css({transition:c ? "all 0.5s" : "none"})
    }
    function setPoints(){
        points.removeClass("current");
        points.eq(curr).addClass("current");
    }
    function showNext(){
        prev = curr;
        curr = next;
        next++;
        if(next > imgs.length - 1)  next = 0;
        setTransition(1,1,0);
        setLeft();
        setPoints();
    }
    function showPrev(){
        next = curr;
        curr = prev;
        prev--;
        if(prev < 0)  prev = imgs.length - 1;
        setTransition(0,1,1);
        setLeft();
        setPoints();
    }
})