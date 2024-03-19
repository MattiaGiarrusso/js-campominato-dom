// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro 
// ed emetto un messaggio in console con il numero della cella cliccata.

// ******************* SECONDA CONSEGNA *************************
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.



const mainGrid = document.querySelector('#grid');
console.log(mainGrid);

const btn = document.querySelector('.btn-play');
console.log(btn);

// Creo la funzione per far partire il ciclo dei quadrati da generare
btn.addEventListener('click', function(){
    // richiamo il mainGrid nella funzione per potergli assegnare una stringa vuota da cui partire ad ogni click
    const mainGrid = document.querySelector('#grid');
    mainGrid.innerHTML = "";

    // creo una variabile flag
    let difficultNum;
    const difficultSelect = document.querySelector('#difficult').value;
    // creo le condizioni per ricevere il numero di quadrati in base alla difficoltà selezionata
    if (difficultSelect === 'easy'){
        difficultNum = 100;
    } else if (difficultSelect === 'normal'){
        difficultNum = 81;
    } else if (difficultSelect === 'hard'){
        difficultNum = 49;
    }

    // Inserisco nel funzione del btn-play un arrayBomb vuoto, con un ciclo while che richiama la funzione getRndInteger
    const arrayBomb = [];
    while (arrayBomb.length < 16) {
        // Creo la variabile randomNumber che richiama la funzione, gli argomenti sono numMin='1' e numMax='difficoltà selezionata'
        const randomNumber = getRndInteger(1,difficultNum);
        // La funzione getRndInteger si ripeterà fino a quando l'array non sarà riempito da 16 numeri diversi
        if (!arrayBomb.includes(randomNumber)) {
            arrayBomb.push(randomNumber)
        }
    }
    console.log(arrayBomb); 

    // Creo fuori il ciclo for due variabile per il conteggio delle bombe e delle celle vuote ad ogni click
    let counterBomb = 0;
    let counterCell = 0;
    // Creo il ciclo for per il conteggio delle celle in base alla difficoltà selezionata
    for(let i = 1; i <= difficultNum; i++) {
        // Dichiaro la variabile che richiamerà la funzione che genera i 100 numeri
        const square = generateSquare(i,difficultSelect);
        // Appendo i quadrati alla griglia in html
        mainGrid.append(square);
        // Assegno alla variabile 'newSquare' una funzione al click
        square.addEventListener('click', function () {
            // Se il numero dello square cliccato è uguale al numero presente nell'array, allora gli viene assegnata la classe bomba
            if (arrayBomb.includes(i)) {
                this.classList.add('click-bomb');
                this.style.pointerEvents = 'none';
                counterBomb++;
            // altrimenti gli viene assegnata la classe cella
            } else {
                console.log(this.children[0].innerHTML);
                square.classList.add('click-cell');
                this.style.pointerEvents = 'none';
                counterCell++
            }
            // lo square selezionato viene svuotato dallo span con l'inserimento di una stringa vuota
            this.innerHTML='';

            console.log('Bombe prese:' + counterBomb);
            console.log('Celle liberate:' + counterCell)
            
            let numCellFree = difficultNum - 16;
            let userMessage;
            // Se il counterBomb raggiunge valore 16, l'utente ha perso
            if (counterBomb === 16) {
                userMessage="Hai perso!";
                mainGrid.innerHTML = '';
                mainGrid.classList.replace("start-image", "lose-image");
            } else if (counterCell === numCellFree && counterBomb !== 16){
                // Se il counterCell raggiunge il suo valore massimo e il counterBomb è inferiore a 16, l'utente supera il livello
                userMessage="Hai vinto!";
                mainGrid.innerHTML = '';
                mainGrid.classList.replace("start-image", "win-image");
            }
        });
    };
});
   
// Creo la funzione che genera numeri
    
function generateSquare(number,difficultSelect) {
        // dichiaro la variabile per creare l'elemento square
    const newSquare = document.createElement('div');
    newSquare.classList.add('square');
    newSquare.classList.add(difficultSelect);
    newSquare.innerHTML = `<span>${number}</span>`;
        // ritorno il risultato della funzione
    return newSquare;
};

// Scrivo la funzione che genera 16 numeri casuali
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }