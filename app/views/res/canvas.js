$(document).ready(function(){
   var myCanvas = document.getElementById("myCanvas");
    var myLegend = document.getElementById("myLegend");
myCanvas.width = 300;
myCanvas.height = 300;

var ctx = myCanvas.getContext("2d");


function drawLine(ctx, startX, startY, endX, endY){
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle){
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle,endAngle);
    ctx.stroke();
}

function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}
var myVinyls = {
    "Classical music": 20,
    "Alternative rock": 30,
    "SD":10
    
};

 var Piechart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
 
    this.draw = function(){
        var total_value = 0;
        var color_index = 0;
        for (var categ in this.options.data){
            var val = this.options.data[categ];
            total_value += val;
        }
 
        var start_angle = Math.PI / 2 * 3;
        for (categ in this.options.data){
            val = this.options.data[categ];
            var slice_angle = 2 * Math.PI * val / total_value;
            var pieRadius = Math.min(this.canvas.width/2,this.canvas.height/2);
            var labelX = this.canvas.width/2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
            var labelY = this.canvas.height/2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle/2);
 
            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                Math.min(this.canvas.width/2,this.canvas.height/2),
                start_angle,
                start_angle+slice_angle,
                this.colors[color_index%this.colors.length]
            );
            var labelText = Math.round(100 * val / total_value);
            this.ctx.fillStyle = "white";
            this.ctx.font = "bold 20px Arial";
            if(labelText != 0){
                this.ctx.fillText(labelText+"%", labelX,labelY);
            }
            start_angle += slice_angle;
            color_index++;
        }
 
    }
    if (this.options.legend){
            color_index = 0;
            var legendHTML = "";
            for (categ in this.options.data){
                legendHTML += "<div><span style='display:inline-block;width:20px;background-color:"+this.colors[color_index++]+";'>&nbsp;</span> "+categ+"</div>";
            }
            this.options.legend.innerHTML = legendHTML;
        }
    
}
 
 $.getJSON(window.location.href + "/pie",function(json){
      var myPiechart = new Piechart(
    {
        canvas:myCanvas,
        data:json,
        colors:["#fde23e","#f16e23", "#57d9ff","#937e88, #fde23e","#f16e23", "#57d9ff","#937e88"],
        legend:myLegend
    }
);
     var zeroed = 1;
    for(var key in json){
        if(json[key]){
            zeroed = 0;
        }
    }
    if(!zeroed){
        myPiechart.draw();
    }
     else{
         $(".canvas-container, #myLegend").css("display", "none");
     }
     
 });

    /*alert("end");*/

});