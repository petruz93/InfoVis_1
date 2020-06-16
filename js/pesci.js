
d3.json('dataset/data.json').then(function (data) {
  createFish(data);
});

function createFish(dati) {
  putFish(dati[0]);
  //    dati.forEach(function (item) {
  //        putFish(item);
  //    });

}

function putFish(item) {
  var forma = d3.select('#tuttiPesci').append('g');
  spaziox = d3.select("body").node().getBoundingClientRect().width / 10;;
  spazioy = height;
  creaForma(forma, item, spaziox, spazioy);
  creaCoda(forma, item, spaziox, spazioy);
  creaOcchio(forma, item, spaziox, spazioy);
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
  leye_x = (spazioy / 1.5); //punto di partenza dell' occhio 1,5 si vedeva bene
  forma.append('circle')
    .attr('cx', reye_x)// centro x 
    .attr('cy', eye_y)// centro y 
    .attr('r', 3)// raggio
    .attr('style', 'fill:none;stroke:black;stroke-width:2');
}