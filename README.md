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
Lanciare il comando seguente all'interno della directory principale:

    `python3 -m http.server`

## Descrizione
I pesci sono stati disegnati usando tre forme geometriche: un'ellisse per il corpo, un triagolo per la coda (unica pinna) e un cerchio per l'occhio.
Nella costruzione di un pesce le variabili sono lette dal dataset e i diversi elementi sono disposti prendendo come punto di riferimento il centro dell'ellisse (il corpo) e come tale è mantenuto come origine e come riferimento per l'intero pesce.
L'immagine del pesce è stata progettata e disegnata calcolando accuratamente le proporzioni tra gli elementi che lo compongono, andando ad individuare delle costanti moltiplicative per ogni componente.
Le variabili del dataset sono tutte comprese nell'intervallo (0,100], e sono scalate opportunamente dalle rispettive funzioni di scaling per renderle proporzionali l'una con le altre.