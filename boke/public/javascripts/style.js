$(function(){
  $("#shuo").on("click",function(){
  	 $("#biaoqian").append("<span class='btn btn-info'>"+$("#pinlun").val()+"</span>");
  });
$(window).on("scroll",function(){
	console.log($(window).scrollTop())
	if($(window).scrollTop()>=400){
		 $("#nav").css({background:"rgba(0,0,0,.4)"});
	}else{
		$("#nav").css({background:""});
	}
  	 
  });
  
  
  
  
  
});
