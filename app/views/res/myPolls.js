$(document).ready(function(){
    
    $.getJSON('/myPolls_json', function(json){
        
        if(json.length == 0){
            $('.loader').html("No polls created by you...")
        }
        console.log(json);
        json.forEach(function(item){
        
           
            $.getJSON('/myPolls_json/' + item, function(json){
                
                
                $('.myPolls').css('display', 'block');
                $('.loader').css('display', 'none');
                
                var prep = '<a class=\'small remove\' data=\'' + json[0].id + '\'>';           
                var post = '<br>remove</a>';
   
                
                $(".list").append('<a href=\'votes/' + json[0].id + '\' >' + '<li class=\'my-4\'>' + json[1].name + prep + post+ '</li>' + '</a>');
                
                
                $(".remove").click(function(){
                var id = $(this).attr('data');
                $.getJSON('/remove/' + id, function(json){  
                    if(json == 'ok'){
                        alert("Removed your poll.");
                        window.open('/', '_self');
                        location.reload();
                     }
                    else{   
                    alert(json);
                    window.open('/', '_self');
                    }
                });
                });
                
                
                
                
                
            });
            
        });
        
    });
    
    
    
    
    
});