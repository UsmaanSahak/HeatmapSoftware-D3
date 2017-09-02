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
    dataset.push(parseFloat(row[2]));
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

/*d3.select("body").append("div").attr("id","firstMap");*/
d3.select("#firstMap").append("h2").text("Zero = White"); 
 var svg = d3.select("#firstMap").append("svg")
.attr("width",1000).attr("height",300); /*Height is 300, acts as buffer room/padding.*/
/*d3.select("body").append("p").text("ooo");*/

svg.append("text").text("bbbbbbbb")
.attr("x", 300).attr("y", 20).attr("font-size",30);

/*first map*/
svg.selectAll("rect").data(dataset).enter().append("rect")
.attr("x",function(d,i) { return 10 * (i % 100); })
.attr("y",function(d,i) { return 10 * Math.trunc(i/100); })
.attr("height",10).attr("width",10)
.attr("fill", function(d) { if (d < 0) { return "rgba(0,0,255," + scaleNeg(d) + ")"; } else { return "rgba(255,0,0," + scalePos(d) + ")"; } })
.attr("class","heatBox").attr("id","dd");


var nextLine = document.createElement("br");
/*add \n for legend to shift left. */
document.getElementById("firstMap").appendChild(document.createElement("br"));
var legendSample = [];
/*
//get average of the dataset, get Q1 and Q3, and the min and max.
var avg = 0;
for (var i = 0; i < dataset.length; i++) {
 avg = avg + dataset[i];
}
console.log(avg, " is sum.");
avg = avg / dataset.length;
console.log(avg, " is avg.");
legendSample.push(minData);
legendSample.push(avg/2);
legendSample.push(avg);
legendSample.push((3*avg)/2);
legendSample.push(maxData);

console.log(scaleNeg(legendSample[0]));
console.log(scalePos(legendSample[1]));
console.log(scalePos(legendSample[2]));
console.log(scalePos(legendSample[3]));
console.log(scalePos(legendSample[4]));
//Should now have 5 different numbers ready to represent colors for the legend.
*/
legendSample.push(minData);
legendSample.push(minData/2);
legendSample.push(0);
legendSample.push(maxData/2);
legendSample.push(maxData);

console.log(legendSample);

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







 var boxes = document.getElementsByClassName("heatBox");
 for (var i = 0; i < boxes.length; i++) {
  boxes[i].id = "d" + i;
 }




































d3.select("body").append("h2").text("Zero = White, all values intensified.");
/*Second Map*/
scalePos = d3.scaleLinear().domain([0,maxData]).range([0,50.0]);
scaleNeg = d3.scaleLinear().domain([0,minData]).range([0,50.0]);
var svg2 = d3.select("body").append("br");
var svg = d3.select("body").append("svg").
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

