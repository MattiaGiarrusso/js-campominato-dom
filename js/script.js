// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro 
// ed emetto un messaggio in console con il numero della cella cliccata.

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
    
    // Creo il ciclo for per il conteggio delle celle in base alla difficoltà selezionata
    for(let i = 1; i <= difficultNum; i++) {
        // Dichiaro la variabile che richiamerà la funzione che genera i 100 numeri
        const square = generateSquare(i,difficultSelect);
        // Appendo i quadrati alla griglia in html
        mainGrid.append(square);
    }

})
   
// Creo la funzione che genera numeri
    
    function generateSquare(number,difficultSelect) {
        // dichiaro la variabile per creare l'elemento square
        const newSquare = document.createElement('div');
        newSquare.classList.add('square');
        newSquare.classList.add(difficultSelect);
        newSquare.innerHTML = `<span>${number}</span>`;

        // assegno alla variabile 'newSquare' una funzione al click
        newSquare.addEventListener('click', function () {
            console.log(this.children[0].innerHTML);
            newSquare.classList.toggle('click-cell');
        });
        // ritorno il risultato della funzione
        return newSquare;
    };
