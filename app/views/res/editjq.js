$(document).ready(function(){
    var id = $('.hide').html();
    
    $.getJSON('/editjson/' + Number(id), function(json){
        
        if(json.info[2].num_options > 2){
            var rep = json.info[2].num_options - 2;
            for(var i = 0; i< rep; i++){
                var value = 'value=\'' + json.info[3].votes[2+i].item + '\'';
                var ap = "<input id=\"option2\" type=\"text\"" + value + "placeholder=\"Add Option\" class=\"form-control\" name=\"option\">";
                $(".addOptions").append(ap);              
            }
        }
        
    });
    
     $(".addField").click(function(){
        //alert("ok");
        var ap = "z<input id=\"option2\" type=\"text\" placeholder=\"Add Option\" class=\"form-control\" name=\"option\">";
        $(".addOptions").append(ap);
    });
    
    
    
    
});