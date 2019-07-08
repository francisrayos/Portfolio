$(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
  
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 2000, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  });

// $(document).ready(function () {  
//     $('#projects').click(function(event){
//       event.preventDefault();
//       $('#bloomberg').scrollIntoView(true);
//       // let your tab id is woocommerce-tabs
//     });
// });
// const btn = document.getElementById('projects');

// btn.addEventListener('click', () => window.scrollTo({
//   top: 500,
//   behavior: 'smooth',
// }));

// window.scrollTo({
//     top: 0,
//     left: 100,
//     behavior: 'smooth'
// })

// var projects = d3.select("projects")

// projects.on("click", function() {


//window.scrollTo(0, document.getElementById('bloomberg').offsetTop - document.getElementsByClassName('projects')[0].offsetHeight);


// Zdocument.getElementById("bloomberg").scrollIntoView({ behavior: 'smooth' });
// $('a[href^="#"]').on('click', function(event) {

//     var target = $(this.getAttribute('href'));

//     if( target.length ) {
//         event.preventDefault();
//         $('html, body').stop().animate({
//             scrollTop: target.offset().top
//         }, 1000);
//     }

// });
// })




// --------- ATTEMPT #1 ---------

// SETUP CANVAS
// var canvas = document.getElementById('myCanvas');
// var context = canvas.getContext('2d');
// context.canvas.width  = window.innerWidth;
// context.canvas.height = window.innerHeight;
// // context.arc(300, 200, 60, 0, Math.PI * 2, false);
// // context.arc(100, 100, 60, 0, Math.PI * 2, false);
// context.fillStyle = "#97e6ed";
// context.fill()

// --------- ATTEMPT #2 ---------

// Fill Main Screen
// var main;

// main = function () { 
//     container = d3.select("body");
//     //container.html();
//     container.append("div")
//     .attr("id", "final-nutrition")
//     .html("Some More Nutritional <br>Facts About Your Meal:" +
//     "<br><br><p id=\"more\">Total Fat - <span id=\"fat\">0</span> g" +
//     "<br><br>Sugars - <span id=\"sugar\">0</span> g" +
//     "<br><br>Protein - <span id=\"protein\">0</span> g" +
//     "<br><br>Carbohydrates - <span id=\"carbs\">0</span> g" +
//     "<br><br>Cholesterol - <span id=\"cholesterol\">0</span> mg</p>");
// }