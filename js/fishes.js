var margin = {top: 80, right: 80, bottom: 80, left: 80};
// var width = d3.select('body').node().getBoundingClientRect().width;
var width = 1100;// - margin.left - margin.right;
// var height = d3.select('body').node().getBoundingClientRect().height;
var height = 800;// - margin.top - margin.bottom;
var updateTime = 1000;

var xRange = d3.scaleLinear().domain([0, 100]).range([margin.left, width - margin.right]);
var yRange = d3.scaleLinear().domain([0, 100]).range([margin.top, height - margin.bottom]);
var bodyRange = d3.scaleLinear().domain([0, 100]).range([10, 100]);
var finRange = d3.scaleLinear().domain([0, 100]).range([1, 100]);
var eyeRange = d3.scaleLinear().domain([0, 100]).range([1, 10]);

var svg = d3.select('body')
            .append('svg')
            .attr("width", width)
            .attr("height", height);


function drawFishes(data) {
  for (let i = 0; i < data.length; i++) {
    putFish([data[i]], i);
  }

  d3.selectAll('.fin').on('click', switchYFin);
  d3.selectAll('.eye').on('click', switchYEye);

  // d3.selectAll('.fin').on('contextmenu', switchXFin);
}


function putFish(data, i) {
  // const x = xRange(data[0].x);
  // const y = yRange(data[0].y);

  let fish = svg.append('g')
    .attr('id', 'fish' + i)
    .attr('class', 'fish')
    .attr('x', data[0].x)
    .attr('y', data[0].y);
  
  createBody(fish, data);
  createFin(fish, data);
  createEye(fish, data);
}

function createBody(fish, data) {
  // costruzione del corpo
  fish.selectAll('fish.body')
    .data(data)
    .enter()
    .append('ellipse')
    .attr('class', 'body')
    .attr('cx', function (d) { return xRange(d.x) })
    .attr('cy', function (d) { return yRange(d.y) })
    .attr('rx', function (d) { return bodyRange(d.body) })
    .attr('ry', function (d) { return bodyRange(d.body) * .58 })
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .style('fill', 'transparent')
    .attr('body', function (d) { return d.body });

  //disegna la bocca
  fish.selectAll('fish.mouth')
    .data(data)
    .enter()
    .append('path')
    .attr('class', 'mouth')
    .attr('d', function (d) {
      let path = '';
      let x1 = xRange(d.x) + bodyRange(d.body);
      let y1 = yRange(d.y);
      let x2 = -bodyRange(d.body) * .18;
      path += 'M' + x1  + ' ' + y1 + ' ' + 'h' + x2;
      return path;
    })
    .style('stroke', 'black')
    .style('stroke-width', 2);
}

function createFin(fish, data) {
  // costruzione della coda
  fish.selectAll('fish.fin')
    .data(data)
    .enter()
    .append('polygon')
    .attr('class', 'fin')
    .attr('points', function (d) {
      let path = '';
      let x1 = xRange(d.x) - bodyRange(d.body);
      let y1 = yRange(d.y);
      let x2 = x1 - finRange(d.fin);
      let y2 = y1 + finRange(d.fin) * .58;
      let x3 = x2;
      let y3 = y1 - finRange(d.fin) * .58
      path += x1 + ' ' + y1 + ', ' + x2 + ' ' + y2 + ', ' + x3 + ' ' + y3;
      return path;
    })
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .style('fill', 'transparent')
    .attr('fin', function (d) { return d.fin });
}

function createEye(fish, data) {
  // costruzione dell'occhio
  fish.selectAll('fish.eye')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'eye')
    .attr('cx', function (d) { return xRange(d.x) + bodyRange(d.body) * .40 })
    .attr('cy', function (d) { return yRange(d.y) - bodyRange(d.body) * .15 })
    .attr('r', function (d) { return eyeRange(d.eye) })
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .style('fill', 'black')
    .attr('eye', function (d) { return d.eye });
}


var switchYFin = function () {
  let tmp;
  d3.selectAll('polygon')
    .transition()
    .duration(updateTime)
    .attr('points', function (d) {
      let path = '';
      let x1 = d.x - d.body;
      let y1 = d.y;
      let x2 = x1 - d.fin;
      let y2 = y1 + d.fin * .98;
      let x3 = x1 - d.fin;
      let y3 = y1 - d.fin * .58;
      path += x1 + ' ' + y1 + ', ' + x2 + ' ' + y2 + ', ' + x3 + ' ' + y3;
      return path;
    });
}

var switchYEye = function () {
  var eye = d3.select(this).attr('eye');
  var g = d3.select(this.parentNode);
  var y = g.attr('y');

  d3.selectAll('.eye')
    .attr('eye', y)
    .transition()
    .duration(updateTime)
    .attr('r', eyeRange(y));
  
  g.attr('y', eye)
    .transition().duration(updateTime)
    .attr('transform', 'translate(0,' + yRange(eye) + ')')
    // .attr('transform', 'translate(0,0)');
}


d3.json('data/dataset.json')
  .then(function (data) {
    drawFishes(data);
  })
  .catch(function (error) {
    console.log(error);
  });
