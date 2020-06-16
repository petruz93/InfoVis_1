var margin = {top: 20, right: 20, bottom: 20, left: 20};
// var width = d3.select('body').node().getBoundingClientRect().width;
// var width = document.getElementById('container').clientWidth;
var width = 1100 - margin.left - margin.right;
// var height = d3.select('body').node().getBoundingClientRect().height;
// var height = document.getElementById('container').clientHeight;
var height = 800 - margin.top - margin.bottom;

var svg = d3.select('body')
            .append('svg')
            .attr("width", width)
            .attr("height", height);

function drawFishes(data) {

  createFishBody(data);
  createFishFin(data);
  createFishEye(data);
}

function createFishBody(data) {
  // costruzione del corpo
  svg.selectAll('fish-body')
    .data(data)
    .enter()
    .append('ellipse')
    .attr('cx', function (d) { return d.x })
    .attr('cy', function (d) { return d.y })
    .attr('rx', function (d) { return d.body }) //50
    .attr('ry', function (d) { return d.body * .58 }) //30
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .style('fill', 'transparent');

    //disegna la bocca
    svg.selectAll('fish-body')
      .data(data)
      .enter()
      .append('path')
      .attr('d', function (d) {
        let path = '';
        let x1 = d.x + d.body;
        let y1 = d.y;
        let x2 = -d.body * .18;
        path += 'M' + x1  + ' ' + y1 + ' ' + 'h' + x2;
        return path;
      })
      .style('stroke', 'black')
      .style('stroke-width', 2);
}

function createFishFin(data) {
  // costruzione della coda
  svg.selectAll('fins')
    .data(data)
    .enter()
    .append('polygon')
    .attr('points', function (d) {
      let path = '';
      let x1 = d.x - d.body;
      let y1 = d.y;
      let x2 = x1 - d.fin;
      let y2 = y1 + d.fin * .58;
      let x3 = x1 - d.fin;
      let y3 = y1 - d.fin * .58
      path += x1 + ' ' + y1 + ', ' + x2 + ' ' + y2 + ', ' + x3 + ' ' + y3;
      return path;
    })
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .style('fill', 'transparent');
}

function createFishEye(data) {
  // costruzione dell'occhio
  svg.selectAll('eyes')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function (d) { return d.x + d.body * .40 }) //+20
    .attr('cy', function (d) { return d.y - d.body * .15 }) //-5
    .attr('r', function (d) { return d.eye })
    .style('stroke', 'black')
    .style('stroke-width', 2)
    .style('fill', 'black');
}

var switchYFin = function () {
  let tmp;
  d3.selectAll('polygon')
    .transition()
    .duration(1000)
    .attr('points', function (d) {
      let path = '';
      let x1 = d.x - d.body;
      let y1 = d.y;
      let x2 = x1 - d.fin;
      let y2 = y1 + d.fin * .88;
      let x3 = x1 - d.fin;
      let y3 = y1 - d.fin * .58
      path += x1 + ' ' + y1 + ', ' + x2 + ' ' + y2 + ', ' + x3 + ' ' + y3;
      return path;
    })
}

d3.json('data/dataset.json')
  .then(function (data) {
    drawFishes(data);
    // putFish(data[0]);
    d3.selectAll('polyline')
      .on('click', switchYFin);
  })
  .catch(function (error) {
    console.log(error);
  });



/////////////////////////////////////////////////////////////////////////////////

function putFish(fish) {
  var forma = svg.append('g');
  spaziox = 200;
  spazioy = 300;
  creaForma(forma, fish, spaziox, spazioy);
  creaCoda(forma, fish, spaziox, spazioy);
  creaOcchio(forma, fish, spaziox, spazioy);
}

function creaForma(forma, item, spaziox, spazioy) {
  rangeFace = d3.scaleLinear().domain([0, 100]).range([-5, 10]);
  forma.append('ellipse')
    .attr('cx', (spaziox / 2)) //centro l'ellissi del ellisse 
    .attr('cy', (spazioy / 2))
    .attr('rx', 50) // questo valore modifica la larghezza del ellisse
    .attr('ry', 30) //questo valore modifica l'altezza del ellisse
    .attr('style', 'fill:none;stroke:black;stroke-width:2')
  /*         // .attr('id', id.concat('forma')).attr('elemento', 'forma').attr('valore', item.faccia).on('click', sortBy)
          // .on("mouseover", handleMouseOver).on("mouseout", handleMouseOut); */
}

function creaCoda(forma, item, spaziox, spazioy) {
  rangeNouse = d3.scaleLinear().domain([0, 100]).range([-7, 12]);
  // Calcolo i valori per poter inserire il triangolo
  //Ho creato un triangolo con angoli smussati
  naso_val = 0;
  forma_centre_x = 15; //il puntp più a sinistra
  form_centre_y = (spazioy / 2); //centro del pesce lungo l'asse y

  vertice_1_x = forma_centre_x; //coordinata x del vertice alto del triangolo
  vertice_1_y = form_centre_y - 6; //coordinata y del vertice alto del triangolo
  vertice_1 = 'M' + vertice_1_x + ' ' + vertice_1_y;

  vertice_2_x = forma_centre_x; //coordinata x del vertice più in basso  del triangolo
  vertice_2_y = form_centre_y + 6 + naso_val; //coordinata y del vertice sinistro del triangolo
  //control point per fare gli angoli smussati

  vertice_2 = ' L' + vertice_2_x + ' ' + vertice_2_y;
  console.log(spaziox / 2);
  vertice_3_x = 25; //coordinata x del vertice più a  destro del triangolo
  vertice_3_y = form_centre_y; //coordinata x del vertice destro del triangolo (che è uguale al destro)
  //control point per fare gli angoli smussati

  vertice_3 = ' L' + vertice_3_x + ' ' + vertice_3_y;


  vertice_0 = 'Z'

  forma.append('path')
    .attr('d', vertice_1 + vertice_2 + vertice_3 + vertice_0).attr('style', 'fill:none;stroke:black;stroke-width:2');
  /*         .attr('id', id.concat('naso')).attr('elemento', 'naso').attr('valore', item.naso).on('click', sortBy)
          .on("mouseover", handleMouseOver).on("mouseout", handleMouseOut); */
}

function creaOcchio(forma, item, spaziox, spazioy) {
  reye_x = (spaziox / 2) + 25; //punto di partenza dell' occhio 25 è la metà del raggio dell'ellisse
  leye_y = (spazioy / 1.5); //punto di partenza dell' occhio 1,5 si vedeva bene
  forma.append('circle')
    .attr('cx', reye_x)// centro x 
    .attr('cy', leye_y)// centro y 
    .attr('r', 3)// raggio
    .attr('style', 'fill:none;stroke:black;stroke-width:2');
}
