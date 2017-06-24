$(document).ready(function(){
    
    $.getJSON('/myPolls_json', function(json){
        json.forEach(function(item){
            /*$(".list").append('<li>' + item + '</li>');*/
            $.getJSON('/myPolls_json/' + item, function(json){
                $(".list").append('<a href=\'votes/' + json[0].id + '\' >' + '<li>' + json[1].name + '</li>' + '</a>');
            });
            
        });
    });
    
    
});