# InfoVis_1
First project for the Information Visualization course, Roma Tre 2019/2020

## Specifiche
Crea un file json con dei dati multivariati: ci sono 10 data-point e ogni data-point ha cinque variabili quantitative i cui valori sono tutti positivi. In base a questi dati disegna 10 pesciolini nell'area di disegno (ogni pesciolino corrisponde ad un data-point). 

La prima variabile determina la posizione orizzontale del pesciolino, 
la seconda variabile la posizione verticale, 
la terza variabile la grandezza del pesce, 
la quarta variabile la lungezza delle pinne, e 
la quinta variabile la grandezza degli occhi. 

Facendo click con il pulsante sinistro su una caratteristica di un pesce la variabile corrispondente viene utilizzata per la coordinata y, mentre la variabile prima utilizzata per la coordinata y viene utilizzata per quella caratteristica (per tutti i pesci). 
Facendo click con il pulsante destro lo stesso scambio avviene rispetto alla coordinata x. 
Fai in modo che i cambi di dimensioni e di posizione dei pesci avvengano con un'animazione fluida.

## Avvio dell'applicativo
Lanciare il comdando seguente all'interno della directory principale:
    python3 -m http.server