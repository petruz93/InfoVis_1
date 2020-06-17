var margin = {top: 100, right: 100, bottom: 100, left: 100};
var width = d3.select('body').node().getBoundingClientRect().width;
// var width = 1100;
var height = 800;
var updateTime = 1800;

// definizione dei domini e delle scalature per le variabili del dataset
var xRange = d3.scaleLinear().domain([0, 100]).range([margin.left, width - margin.right]);
var yRange = d3.scaleLinear().domain([0, 100]).range([margin.top, height - margin.bottom]);
var bodyRange = d3.scaleLinear().domain([1, 100]).range([10, 100]);
var finRange = d3.scaleLinear().domain([1, 100]).range([10, 100]);
var eyeRange = d3.scaleLinear().domain([1, 100]).range([1, 10]);

// carica i dati del dataset
d3.json('data/dataset.json')
  .then(function (data) {
    drawFishes(data);
    d3.selectAll('.body').on('click', switchYBody);
    d3.selectAll('.fin').on('click', switchYFin);
    d3.selectAll('.eye').on('click', switchYEye);
    d3.selectAll('.body').on('contextmenu', switchXBody);
    d3.selectAll('.fin').on('contextmenu', switchXFin);
    d3.selectAll('.eye').on('contextmenu', switchXEye);
  })
  .catch(function (error) {
    console.log(error);
  });

var svg = d3.select('body')
            .append('svg')
            .attr("width", width)
            .attr("height", height);

function drawFishes(data) {
  for (let i = 0; i < data.length; i++) {
    putFish([data[i]], i);
  }
}

// ogni pesce è rappresentato da un gruppo e possiede tutte le sue variabili
function putFish(data, i) {
  let fish = svg.append('g')
    .attr('id', 'fish' + i)
    .attr('class', 'fish')
    .attr('x', data[0].x)
    .attr('y', data[0].y)
    .attr('transform', 'translate(' + xRange(data[0].x) + ',' + yRange(data[0].y) + ')');
  
  createBody(fish, data);
  createFin(fish, data);
  createEye(fish, data);
}

// costruzione del corpo di un singolo pesce
function createBody(fish, data) {
  // disegna il corpo
  fish.selectAll('fish.body')
    .data(data, d => d.body)
    .enter()
    .append('ellipse')
    .attr('class', 'body')
    .attr('rx', function (d) { return bodyRange(d.body) })
    .attr('ry', function (d) { return bodyRange(d.body) * .58 })
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .style('fill', '#bbe6e6')
    .attr('body', function (d) { return d.body });

  // disegna la bocca
  fish.selectAll('fish.mouth')
    .data(data, d => d.body)
    .enter()
    .append('path')
    .attr('class', 'mouth')
    .attr('d', function (d) {
      let path = '';
      let x1 = bodyRange(d.body);
      let y1 = 0;
      let x2 = -bodyRange(d.body) * .18;
      path += 'M' + x1  + ' ' + y1 + ' ' + 'h' + x2;
      return path;
    })
    .style('stroke', 'black')
    .style('stroke-width', 2);
}

// costruzione della coda di un singolo pesce
function createFin(fish, data) {
  fish.selectAll('fish.fin')
    .data(data)
    .enter()
    .append('polygon')
    .attr('class', 'fin')
    .attr('points', function (d) {
      let path = '';
      let x1 = -bodyRange(d.body);
      let y1 = 0;
      let x2 = x1 - finRange(d.fin);
      let y2 = y1 + finRange(d.fin) * .58;
      let x3 = x2;
      let y3 = y1 - finRange(d.fin) * .58
      path += x1 + ' ' + y1 + ', ' + x2 + ' ' + y2 + ', ' + x3 + ' ' + y3;
      return path;
    })
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .style('fill', '#bbe6e6')
    .attr('fin', function (d) { return d.fin });
}

// costruzione dell'occhio di un singolo pesce
function createEye(fish, data) {
  fish.selectAll('fish.eye')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'eye')
    .attr('cx', function (d) { return bodyRange(d.body) * .40 })
    .attr('cy', function (d) { return -bodyRange(d.body) * .15 })
    .attr('r', function (d) { return eyeRange(d.eye) })
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .style('fill', 'black')
    .attr('eye', function (d) { return d.eye });
}

/**********************************************************
 * Gestione degli eventi
 **********************************************************/

// scambia le variabili Y e BODY
var switchYBody = function () {
  let body = d3.select(this).attr('body');
  let g = d3.select(this.parentNode);
  let x = g.attr('x');
  let y = g.attr('y');

  //update del corpo
  d3.selectAll('.body')
    .attr('body', y)
    .transition()
    .duration(updateTime)
    .attr('rx', function (d) { return bodyRange(y) })
    .attr('ry', function (d) { return bodyRange(y) * .58 });
  
  //update della bocca
  d3.selectAll('.mouth')
    .transition()
    .duration(updateTime)
    .attr('d', function (d) {
      let path = '';
      let x1 = bodyRange(y);
      let y1 = 0;
      let x2 = -bodyRange(y) * .18;
      path += 'M' + x1  + ' ' + y1 + ' ' + 'h' + x2;
      return path;
    });

  //update della posizione della pinna
  d3.selectAll('.fin')
    .transition()
    .duration(updateTime)
    .attr('points', function (d) {
      let path = '';
      let x1 = -bodyRange(y);
      let y1 = 0;
      let x2 = x1 - finRange(d.fin);
      let y2 = y1 + finRange(d.fin) * .58;
      let x3 = x2;
      let y3 = y1 - finRange(d.fin) * .58;
      path += x1 + ' ' + y1 + ', ' + x2 + ' ' + y2 + ', ' + x3 + ' ' + y3;
      return path;
    });

  //update della posizione dell'occhio
  d3.selectAll('.eye')
    .transition()
    .duration(updateTime)
    .attr('cx', function (d) { return bodyRange(y) * .40 })
    .attr('cy', function (d) { return -bodyRange(y) * .15 });
  
  // aggiorna la posizione del pesce selezionato
  g.attr('y', body)
    .transition().duration(updateTime)
    .attr('transform', 'translate(' + xRange(x) + ',' + yRange(body) + ')');
}

// scambia le variabili X e BODY
var switchXBody = function () {
  // disabilita il comportamento di default del click destro del mouse
  d3.event.preventDefault();

  let body = d3.select(this).attr('body');
  let g = d3.select(this.parentNode);
  let x = g.attr('x');
  let y = g.attr('y');

  //update del corpo
  d3.selectAll('.body')
    .attr('body', x)
    .transition()
    .duration(updateTime)
    .attr('rx', function (d) { return bodyRange(x) })
    .attr('ry', function (d) { return bodyRange(x) * .58 });
  
  //update della bocca
  d3.selectAll('.mouth')
    .transition()
    .duration(updateTime)
    .attr('d', function (d) {
      let path = '';
      let x1 = bodyRange(x);
      let y1 = 0;
      let x2 = -bodyRange(x) * .18;
      path += 'M' + x1  + ' ' + y1 + ' ' + 'h' + x2;
      return path;
    });

  //update della posizione della pinna
  d3.selectAll('.fin')
    .transition()
    .duration(updateTime)
    .attr('points', function (d) {
      let path = '';
      let x1 = -bodyRange(x);
      let y1 = 0;
      let x2 = x1 - finRange(d.fin);
      let y2 = y1 + finRange(d.fin) * .58;
      let x3 = x2;
      let y3 = y1 - finRange(d.fin) * .58;
      path += x1 + ' ' + y1 + ', ' + x2 + ' ' + y2 + ', ' + x3 + ' ' + y3;
      return path;
    });

  //update della posizione dell'occhio
  d3.selectAll('.eye')
    .transition()
    .duration(updateTime)
    .attr('cx', function (d) { return bodyRange(x) * .40 })
    .attr('cy', function (d) { return -bodyRange(x) * .15 });
  
  // aggiorna la posizione del pesce selezionato
  g.attr('x', body)
    .transition().duration(updateTime)
    .attr('transform', 'translate(' + xRange(body) + ',' + yRange(y) + ')');
}

// scambia le variabili Y e FIN
var switchYFin = function () {
  let fin = d3.select(this).attr('fin');
  let g = d3.select(this.parentNode);
  let x = g.attr('x');
  let y = g.attr('y');

  d3.selectAll('.fin')
    .attr('fin', y)
    .transition()
    .duration(updateTime)
    .attr('points', function (d) {
      let path = '';
      let x1 = -bodyRange(g.select('.body').attr('body'));
      let y1 = 0;
      let x2 = x1 - finRange(y);
      let y2 = y1 + finRange(y) * .58;
      let x3 = x2;
      let y3 = y1 - finRange(y) * .58;
      path += x1 + ' ' + y1 + ', ' + x2 + ' ' + y2 + ', ' + x3 + ' ' + y3;
      return path;
    });

  // aggiorna la posizione del pesce selezionato
  g.attr('y', fin)
    .transition().duration(updateTime)
    .attr('transform', 'translate(' + xRange(x) + ',' + yRange(fin) + ')');
}

// scambia le variabili X e FIN
var switchXFin = function () {
  // disabilita il comportamento di default del click destro del mouse
  d3.event.preventDefault();

  let fin = d3.select(this).attr('fin');
  let g = d3.select(this.parentNode);
  let x = g.attr('x');
  let y = g.attr('y');

  d3.selectAll('.fin')
    .attr('fin', x)
    .transition()
    .duration(updateTime)
    .attr('points', function (d) {
      let path = '';
      let x1 = -bodyRange(g.select('.body').attr('body'));
      let y1 = 0;
      let x2 = x1 - finRange(x);
      let y2 = y1 + finRange(x) * .58;
      let x3 = x2;
      let y3 = y1 - finRange(x) * .58;
      path += x1 + ' ' + y1 + ', ' + x2 + ' ' + y2 + ', ' + x3 + ' ' + y3;
      return path;
    });

  // aggiorna la posizione del pesce selezionato
  g.attr('x', fin)
    .transition().duration(updateTime)
    .attr('transform', 'translate(' + xRange(fin) + ',' + yRange(y) + ')');
}

// scambia le variabili Y e EYE
var switchYEye = function () {
  let eye = d3.select(this).attr('eye');
  let g = d3.select(this.parentNode);
  let x = g.attr('x');
  let y = g.attr('y');

  d3.selectAll('.eye')
    .attr('eye', y)
    .transition()
    .duration(updateTime)
    .attr('r', eyeRange(y));
  
  // aggiorna la posizione del pesce selezionato
  g.attr('y', eye)
    .transition().duration(updateTime)
    .attr('transform', 'translate(' + xRange(x) + ',' + yRange(eye) + ')');
}

// scambia le variabili X e EYE
var switchXEye = function () {
  // disabilita il comportamento di default del click destro del mouse
  d3.event.preventDefault();

  let eye = d3.select(this).attr('eye');
  let g = d3.select(this.parentNode);
  let x = g.attr('x');
  let y = g.attr('y');

  d3.selectAll('.eye')
    .attr('eye', x)
    .transition()
    .duration(updateTime)
    .attr('r', eyeRange(x));
  
  // aggiorna la posizione del pesce selezionato
  g.attr('x', eye)
    .transition().duration(updateTime)
    .attr('transform', 'translate(' + xRange(eye) + ',' + yRange(y) + ')');
}
