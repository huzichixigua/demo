$(function () {
    var tCheckbox = $(".car-head .checkbox");
    var bCheckboxes = $(".car-main .checkbox");
    tCheckbox.on("click", function () {
        $(this).toggleClass("checkedbox");
        $(this).hasClass("checkedbox") ? bCheckboxes.addClass("checkedbox") && bCheckboxes.children("input").prop("checked",true) :  bCheckboxes.removeClass("checkedbox") && bCheckboxes.children("input").prop("checked",false);
    })
    bCheckboxes.each(function (i, e) {
        $(e).on("click", function () {
            $(this).toggleClass("checkedbox");
           $(this).hasClass("checkedbox") ?  $(this).children("input").prop("checked",true) :$(this).children("input").prop("checked",false);
           $(".car-main .checkedbox").length == bCheckboxes.length ? tCheckbox.addClass("checkedbox").children("input").prop("checked",true) : tCheckbox.removeClass("checkedbox").children("input").prop("checked",false);
        })
    })
})
$(function(){
    var add = $(".add");
    var sub = $(".subtract");
    var num = 0;
    add.on("click",function(){
        num =  $(this).siblings(".number").children("input").val();
        num++;
        $(this).siblings(".number").children("input").val(num);
    })
    sub.on("click",function(){
        num =  $(this).siblings(".number").children("input").val();
        num--;
        if(num <= 1){
            num = 1;
            $(this).parent(".btn").siblings(".trash").children(".trash-t").css({transform:"rotate(-20deg)"})
            $(".modal").css("display","block");
        } 
        $(this).siblings(".number").children("input").val(num);
    })
})
$(function(){
    var trash = $(".trash");
    var modal = $(".modal");
    var cancel = $(".cancel");
    trash.on("click",function(){
        $(this).children(".trash-t").css({transform:"rotate(-20deg)"})
        modal.css("display","block");
    })
    cancel.on("click",function(){
        modal.css("display","none");
        trash.children(".trash-t").css({transform:"none"})
    })
})