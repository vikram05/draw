$("#first").animate(
    {
        "margin-top" :"30px",
        "margin-left":"150px",
        "opacity": "100%"
    },
    1000  )

$("canvas,.items").animate(

    {
        "opacity": "100%"
    },
    1000)




let colors = document.getElementsByClassName("colors");
let shapes = document.getElementsByClassName("shapes");
let canvas = document.getElementById("my-canvas")
let ctx = canvas.getContext("2d")
let current_button ;

canvas.width = 950;
canvas.height = 630;

let startPoint = {x: 0, y: 0};

for (let color of colors) {
   console.log(colors)
   color.addEventListener("change", function(e){
        current_button = e.target.id;
        

        if (current_button === "strok_color"){
            var stroke_color = e.target.value
            ctx.strokeStyle = stroke_color ;
            console.log(stroke_color)
        }
        else if (current_button === "fill_color"){
            var fill_color = e.target.value
            ctx.fillStyle = fill_color ;
            
        }

    })
}

function line_down(e){
    startPoint.x = e.offsetX;
    startPoint.y = e.offsetY;
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y)
    console.log(startPoint)
}

function line_up(e){
    ctx.lineTo(e.offsetX , e.offsetY)
    ctx.stroke();
}


////////////////////////////////////////////////////////////////////////////////

function circle_down(e){
    startPoint.x = e.offsetX;
    startPoint.y = e.offsetY;
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y)
    console.log(startPoint)
}

function circle_up(e){
    var deltaX = startPoint.x - e.offsetX;
    var deltay = startPoint.y - e.offsetY;
    var radius = Math.sqrt(deltaX*deltaX + deltay*deltay)
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, radius, 0, Math.PI*2);
    ctx.fill();
    ctx.stroke();
}

/////////////////////////////////////////////////////////////////////////////////

function box_down(e){
    startPoint.x = e.offsetX;
    startPoint.y = e.offsetY;
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y)
    console.log(startPoint)
}

function box_up(e){
    ctx.beginPath();
    ctx.fillRect(startPoint.x, startPoint.y, e.offsetX - startPoint.x, e.offsetY - startPoint.y)
    ctx.fill();
    ctx.stroke();
}

/////////////////////////////////////////////////////////////////////////////////
let prevx = 0
let prevy = 0
let isdown = false;

function free_hand_down(e){
    prevx = e.offsetX;
    prevy = e.offsetY;
    isdown = true ;
}

function free_hand_move(e){

    if (isdown)
    {       
        startPoint.x = e.offsetX;
        startPoint.y = e.offsetY;
        ctx.beginPath();
        ctx.moveTo(prevx, prevy)
        console.log(startPoint)
        ctx.lineTo(e.offsetX , e.offsetY)
        ctx.stroke();
        prevx = startPoint.x
        prevy = startPoint.y
    }
}

function free_hand_up(e){
    isdown = false
}


/////////////////////////////////////////////////////////////////////////////////

function erase_down(e){
    startPoint.x = e.offsetX;
    startPoint.y = e.offsetY; 
    ctx.clearRect(startPoint.x-1, startPoint.y-1, 10, 10);
    isdown = true ;
}

function erase_move(e){

    if (isdown)
    {       
        startPoint.x = e.offsetX;
        startPoint.y = e.offsetY;       
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y)
        ctx.clearRect(startPoint.x-1, startPoint.y-1, 10, 10);
        ctx.stroke();
    }
}

function erase_up(e){
    isdown = false
}



for (let shape of shapes) {

    shape.addEventListener("click", function(e){
         current_button = e.target.id;


         canvas.removeEventListener("mouseup", line_up)
         canvas.removeEventListener("mouseup", circle_up)
         canvas.removeEventListener("mouseup", box_up)
         canvas.removeEventListener("mouseup", free_hand_up)
         canvas.removeEventListener("mouseup", erase_up)

         canvas.removeEventListener("mousedown", line_down)
         canvas.removeEventListener("mousedown", circle_down)
         canvas.removeEventListener("mousedown", box_down)
         canvas.removeEventListener("mousedown", free_hand_down)
         canvas.removeEventListener("mousedown", erase_down)

         canvas.removeEventListener("mousemove", free_hand_move)
         canvas.removeEventListener("mousemove", erase_move)
     

         if (current_button === "line"){
            startPoint = {x: 0, y: 0};
            canvas.addEventListener("mousedown", line_down)
            canvas.addEventListener("mouseup", line_up)
        }


            
        else if (current_button === "circle"){
            startPoint = {x: 0, y: 0}
            canvas.addEventListener("mousedown", circle_down)
            canvas.addEventListener("mouseup", circle_up)
        }


        else if (current_button === "box"){
            startPoint = {x: 0, y: 0}
            canvas.addEventListener("mousedown", box_down)
            canvas.addEventListener("mouseup", box_up)
        }

        else if (current_button === "free_hand"){
            startPoint = {x: 0, y: 0}
            canvas.addEventListener("mousedown", free_hand_down)
            canvas.addEventListener("mousemove", free_hand_move)
            canvas.addEventListener("mouseup", free_hand_up)
        
        }
 
        else if (current_button === "erase"){
            startPoint = {x: 0, y: 0}
            canvas.addEventListener("mousedown", erase_down)
            canvas.addEventListener("mousemove", erase_move)
            canvas.addEventListener("mouseup", erase_up)
        
        }

        else if (current_button === "second"){
            var child = document.createElement("a");
            child.href = canvas.toDataURL("image/png", 1.0);

            child.download = "canvas.png";
            child.click();
        } 
     })
 
    
     
 }



