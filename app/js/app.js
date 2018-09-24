$(".fas").on("click", function(){
    $(this).parent().parent().fadeOut();
});

$(".employee").on("click", function(){
    $(".overlay").fadeIn();
});