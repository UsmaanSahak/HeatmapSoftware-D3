var metabolites = [];
var strains = [];
var dataset = [];
var metaText = []; /*all text, including mutants, formulas, etc*/


$(document).ready(function() {  
  loadData(); 
  $("#InfoBox").hide();
  
  /*
  $("#testerHover").hover(function() { 
  
  document.getElementById("d0").setAttribute("fill", "rgba(255,0,0,1)");
 }, {});
 */

});

/*
$(".heatBox").hover(function() { $( "#d439" ).css("fill","green"); }, function() { $( "#d10" ).css("fill","purple"); });
*/

function getInfoBox(num) {
  //document.getElementById("testerHover").innerHTML = "the number is " + num;
  $('#InfoBox').show();
  var pos = $("#d" + num).position();
  //document.getElementById("testerHover").innerHTML = "top: " + pos.top;
  $('#InfoBox').css("left",pos.left + 15).css("top",pos.top + 15);
  document.getElementById("InfoBox").innerHTML = 
  "<p>" + dataset[num] + "</p>"
  + "<p>" + strains[Math.trunc(num/83)] + "</p>"
  + "<p>" + metabolites[num%83] + " </p>"
  
  ;
}


function loadData() {
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

   /*document.getElementById("here").innerHTML = this.responseText;*/
   textInput = this.responseText;
   /*raw = raw.substring(0, raw.length - 1);*/ 
   var lines = textInput.split(/\n/);
   strains = lines[0].split(/[ ]/);
   metabolites = lines[1].split(/[ ]/);
   lines.splice(0,2);
   textInput = lines.join();
   dataset = textInput.split(/[ ]/);
   
   console.log("metabolites: ", metabolites);
   console.log("strains: ", strains);
   console.log("dataset: ", dataset);
  
   for (var i = 0; i < dataset.length; i++) {
    dataset[i] = parseFloat(dataset[i]);
   }


   /*dataset.pop();//Get rid of last element, which is undefined.*/
   loadHeadBoxes();
  }
 };
 xhttp.open("GET","input.txt",true);
 xhttp.send();
}





function loadHeadBoxes() {
   
 var minData = d3.min(dataset, function(d) { return parseFloat(d); });
 var maxData = d3.max(dataset, function(d) { return parseFloat(d); });

 var scalePos = d3.scaleLinear().domain([0,maxData]).range([0,1.0]);
 var scaleNeg = d3.scaleLinear().domain([0,minData]).range([0,1.0]);


/*d3.select("body").append("div").attr("id","firstMap");*/
d3.select("#firstMap").append("h2").text("Interactive Heatmap"); 
 var svg = d3.select("#firstMap").append("svg")
.attr("width",1350).attr("height",1000).attr("id","mapSvg"); /*Height is 300, acts as buffer room/padding.*/
/*d3.select("body").append("p").text("ooo");*/

/*svg.append("text").text("bbbbbbbb")
.attr("x", 300).attr("y", 20).attr("font-size",30);*/

/*first map*/
svg.selectAll("rect").data(dataset).enter().append("rect")
.attr("x",function(d,i) { return 15 * (i % 83) + 100; })
.attr("y",function(d,i) { return 15 * Math.trunc(i/83); })
.attr("height",15).attr("width",15)
.attr("fill", function(d) { if (d < 0) { return "rgba(0,0,255," + scaleNeg(d) + ")"; } else { return "rgba(255,0,0," + scalePos(d) + ")"; } })
.attr("class","heatBox").attr("id",function(d,i) { return ("d" + i);}).attr("onmouseover",function(d,i) { return "getInfoBox(" + i + ")";}); //Change to function of unique ids later


//var nextLine = document.createElement("br");
/*add \n for legend to shift left. */
//document.getElementById("firstMap").appendChild(document.createElement("br"));
var legendSample = [];

legendSample.push(minData);
legendSample.push(minData/2);
legendSample.push(0);
legendSample.push(maxData/2);
legendSample.push(maxData);

console.log(legendSample);


/*Now lets make axis*/


/* delete this
console.log("dataset.length is ", dataset.length);
var xScale = d3.scaleLinear().domain([0,dataset.length]).range([0,dataset.length]);
svg.append("g").call(d3.axisBottom(xScale).tickFormat(function(d){ return d.x; }));
*/
/*screw the built in. Spawn ticks where appropriate (class=tick) and just dictate the transform="translate(x,y)" however you want, you defining x and y.*/
/*Also make a line through it, remember.*/
/*Finally, place a text right under, defining the x and y the same way they were calculated when getting the ticks in place so they are right below.*/


/*The x axis.*/
console.log(strains.length," is length");
/*
svg.selectAll("path").data(strains).enter().append("path")
.attr("stroke","green").attr("stroke-width","2").attr("fill","none").attr("d", function(d,i) {
 return "M 10 " + i*15 + " l 0 -10"; });
 */



svg.selectAll("path").data(metabolites).enter().append("path")
.attr("stroke","green").attr("stroke-width","2").attr("fill","none").attr("d", function(d,i) {
 return "M " + (i*15 + 108) + " 430 l 0 -10"; });
 

 
svg.selectAll("text").data(metabolites).enter().append("text").text(function(d) { return d; }).attr("transform", function(d,i) {
return "translate(" + (i*15+103) + ",430) rotate(90)";}); 


/*The y axis.*/
var firstMapHandle = document.getElementById("mapSvg");
var appString = "";
 for (var i=0; i < strains.length; i++) {
 appString += 
 "<path stroke=\"green\" stroke-width=\"3\" fill=\"none\" d=\"M 90 " + (i*15 +10) + " l 10 0\"></path> <text transform=\"translate(15, " + (i*15 + 15) + ")\">" + strains[i] + "</text>";
}
firstMapHandle.innerHTML += appString;


svg.selectAll("text").data(strains).enter().append("text").text(function(d) { return d; }).attr("transform", function(d,i) {
return "translate(10,"+ (i*15) + ")";}); 






/*border (So it doesnt go over each colored rect instead, but around all.)*/
var legendBorder = d3.select("#legend").append("svg").attr("width",20).attr("height",300).style("stroke","black").style("fill","none").style("stroke-width",10);
legendBorder.append("rect").attr("width",20).attr("height",300);

var legend = legendBorder.append("svg").attr("width",15).attr("height",295).attr("background-color","green").style("stroke","none");
legend.selectAll("rect").data(legendSample).enter().append("rect")
.attr("y",function(d,i) { return (60 * i + 5); })
.attr("x",5).attr("height",60).attr("width",10)
.attr("fill",function(d) { if (d < 0) { return "rgba(0,0,255," + scaleNeg(d) + ")"; }
else { return "rgba(255,0,0," + scalePos(d) + ")"; }});

/*legend values*/

var sss = d3.select("#legend").append("svg").attr("height",295).attr("width",100).attr("id","legendLabels");
sss.selectAll("text").data(legendSample).enter().append("text").attr("font-size",10)
.attr("x",5).attr("y", function(d,i) { return (i * 70) + 10; })
.text(function(d) { return d; });


/*sss.selectAll("text").data(legendSample).enter().append("text").attr("font-size",10)
.attr("transform", "translate(150,0) rotate(90)").text("TOPPE");*/





































d3.select("#secondMap").append("h2").text("Zero = White, all values intensified.")
/*Second Map*/
scalePos = d3.scaleLinear().domain([0,maxData]).range([0,50.0]);
scaleNeg = d3.scaleLinear().domain([0,minData]).range([0,50.0]);

var svg = d3.select("#secondMap").append("svg").
attr("width",1000).attr("height",300);
 svg.selectAll("rect").data(dataset).enter().append("rect")
.attr("x",function(d,i) { return 10 * (i % 100); })
.attr("y",function(d,i) { return 10 * Math.trunc(i/100); })
.attr("height",10).attr("width",10)
.attr("fill", function(d) { if (d < 0) { return "rgba(0,0,255," + scaleNeg(d) + ")"; } else { return "rgba(255,0,0," + scalePos(d) + ")"; } })
.attr("class","heatBox").attr("id","dd");


/*Third map.*/
d3.select("body").append("h2").text("min to max scaling, white = average value.");
scalePos = d3.scaleLinear().domain([minData,maxData]).range([0,1.0]);
scaleNeg = d3.scaleLinear().domain([minData,maxData]).range([0,1.0]);
var svg = d3.select("body").append("svg").
attr("width",1000).attr("height",300); /*Height is 300, acts as buffer room/padding.*/
 svg.selectAll("rect").data(dataset).enter().append("rect")
.attr("x",function(d,i) { return 10 * (i % 100); })
.attr("y",function(d,i) { return 10 * Math.trunc(i/100); })
.attr("height",10).attr("width",10)
.attr("fill", function(d) { if (d < 0) { return "rgba(0,0,255," + scaleNeg(d) + ")"; } else { return "rgba(255,0,0," + scalePos(d) + ")"; } })
.attr("class","heatBox").attr("id","dd");

}

