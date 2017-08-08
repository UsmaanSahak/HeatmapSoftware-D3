var dataset = [];
var metaText = []; /*all text, including mutants, formulas, etc*/

$(document).ready(function() {  loadData(); });

function loadData() {
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

   /*document.getElementById("here").innerHTML = this.responseText;*/
   metaText = this.responseText;
   /*raw = raw.substring(0, raw.length - 1);*/ 
   var lines = metaText.split(/\n/);
 
   for (var i = 0; i < lines.length; i++) {
    var row  = lines[i].split(/\t/);
    dataset.push(row[2]);
   }
  

console.log(dataset);
   dataset.pop();//Get rid of last element, which is undefined.
   loadHeadBoxes();
  }
 };
 xhttp.open("GET","input.txt",true);
 xhttp.send();
}


function loadHeadBoxes() {
 
 var minData = d3.min(dataset, function(d) { return parseFloat(d); });
 var maxData = d3.max(dataset, function(d) { return parseFloat(d); });
 console.log(minData);
 console.log(maxData);
 var scalePos = d3.scaleLinear().domain([0,maxData]).range([0,1.0]);
 var scaleNeg = d3.scaleLinear().domain([0,minData]).range([0,1.0]);
 console.log(scalePos(111));
 console.log(scalePos(1));
 console.log(scalePos(1000));
 console.log(scalePos(0));
 console.log(scaleNeg(0));
 console.log(scaleNeg(-1111));
 console.log(scaleNeg(-22));


d3.select("body").append("h2").text("Zero = White"); 
 var svg = d3.select("body").append("svg")
.attr("width",1000).attr("height",300); /*Height is 300, acts as buffer room/padding.*/
/*d3.select("body").append("p").text("ooo");*/

svg.append("text").text("aaaaaa")
.attr("x", 100).attr("y", 20).attr("font-size",30);


svg.selectAll("rect").data(dataset).enter().append("rect")
.attr("x",function(d,i) { return 10 * (i % 100); })
.attr("y",function(d,i) { return 10 * Math.trunc(i/100); })
.attr("height",10).attr("width",10)
.attr("fill", function(d) { if (d < 0) { return "rgba(0,0,255," + scaleNeg(parseFloat(d)) + ")"; } else { return "rgba(255,0,0," + scalePos(parseFloat(d)) + ")"; } })
.attr("class","heatBox").attr("id","dd");

/*
 var boxes = document.getElementsByClassName("heatBox");
 for (var i = 0; i < boxes.length; i++) {
  boxes[i].id = "d" + i;
 }
*/

d3.select("body").append("h2").text("Zero = White, all values intensified.");

scalePos = d3.scaleLinear().domain([0,maxData]).range([0,50.0]);
scaleNeg = d3.scaleLinear().domain([0,minData]).range([0,50.0]);
var svg2 = d3.select("body").append("br");
var svg = d3.select("body").append("svg").
attr("width",1000).attr("height",300);
 svg.selectAll("rect").data(dataset).enter().append("rect")
.attr("x",function(d,i) { return 10 * (i % 100); })
.attr("y",function(d,i) { return 10 * Math.trunc(i/100); })
.attr("height",10).attr("width",10)
.attr("fill", function(d) { if (d < 0) { return "rgba(0,0,255," + scaleNeg(parseFloat(d)) + ")"; } else { return "rgba(255,0,0," + scalePos(parseFloat(d)) + ")"; } })
.attr("class","heatBox").attr("id","dd");


d3.select("body").append("h2").text("min to max scaling, white = average value.");
scalePos = d3.scaleLinear().domain([minData,maxData]).range([0,1.0]);
scaleNeg = d3.scaleLinear().domain([minData,maxData]).range([0,1.0]);
var svg = d3.select("body").append("svg").
attr("width",1000).attr("height",300); /*Height is 300, acts as buffer room/padding.*/
 svg.selectAll("rect").data(dataset).enter().append("rect")
.attr("x",function(d,i) { return 10 * (i % 100); })
.attr("y",function(d,i) { return 10 * Math.trunc(i/100); })
.attr("height",10).attr("width",10)
.attr("fill", function(d) { if (d < 0) { return "rgba(0,0,255," + scaleNeg(parseFloat(d)) + ")"; } else { return "rgba(255,0,0," + scalePos(parseFloat(d)) + ")"; } })
.attr("class","heatBox").attr("id","dd");

}

