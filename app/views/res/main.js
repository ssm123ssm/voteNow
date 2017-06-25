$(document).ready(function(){
    //$(".in1").html("<% include signInNav %>");
    $(".vt").click(function(){
        $(this).addClass("dis");
       
    });
    
    $(".addField").click(function(){
        //alert("ok");
        var ap = "<input id=\"option2\" type=\"text\" placeholder=\"Add Option\" class=\"form-control\" name=\"option\">";
        $(".addOptions").append(ap);
    });
    
    $(".sub").click(function(){
        
        if($('#name').val()&& $('#option1').val() && $('#option2').val()){
           if($('#option1').val() != $('#option2').val()){
               alert("Vote Added Successfully!");
                window.open("/", "_self");
           }
            else{
                alert('Please add two different options.');
                return false;
                 
            }
           }
        else{
            alert("Fill all required fields");
        }
        
        
    });
    
    
    $('.shr').click(function(){
        $('.share').val(window.location.href);
        $('.share').css('display', 'block');
        $('.share').select();
        document.execCommand('copy');
        $('.share').css('display', 'none');
        $(".alt").css('display', 'block');
        
       
    });
});