let contatore = parseInt(0);
let BarchePiazzate = parseInt(0);
let orientamento = "orizzontale"; // Imposta il valore iniziale dell'orientamento
function Campo() 
{
    if (BarchePiazzate < 5) {
       document.getElementById("ingame").disabled = true;
        if(BarchePiazzate==0)
            {
                alert("Devi posizionare tutte le barche prima di poter giocare");
            }
    } else if(BarchePiazzate == 5 ){
        
        document.getElementById("ingame").disabled = false;
        document.getElementById("ingame").onclick = function () {
        window.location.href = "paginadigioco.html";
            };
    }
}
function ideadigioco() {
    alert("Volevamo creare un gioco abbastanza tranquillo, in grado di far divertire tutti i giocatori quindi che dire....");
    alert("Buon divertimento");
}

function comecisonoarrivato() {
    alert("è nato tutto per un progetto scolastico per poi essere uscito alla fine come: ' una idea troppo carina per essere lasciata cosi ' , quindi eccoci");
}

function chisono() {
    alert("Emmanuele Loghitano ");
}

function dadovevengo() {
    alert("Dall'Abramo Lincoln di Enna, settore informatica e telecomunicazioni");
}

function informazioni() {
    if (contatore % 2 == 0) {
        document.getElementById("info").style.border = "5px solid black";
        document.getElementById("info").style.borderRadius = "20% 5% 20% 5%";
        document.getElementById("info").style.color = "black";
        document.getElementById("info").textContent = "il gioco consiste nel riuscire ad abbattere tutte le barche avversarie riuscendo a trovarle tramite la posizione delle caselle";
        document.getElementById("info").style.display = "inline";
        var oImg = document.createElement("img");
        oImg.setAttribute('src', 'x.png');
        oImg.setAttribute('id', 'x');
        oImg.setAttribute('onclick', '(elimina)');
        document.body.appendChild(oImg);
    } else if (contatore % 2 == 1) {
        document.getElementById("info").style.display = "none";
    }
    contatore += 1;
}

// ——— Gestione del Drag & Drop con Orientamento ———
function dragstartHandler(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dragoverHandler(ev) {
    ev.preventDefault();
}

function dropHandler(ev) {
    ev.preventDefault();
    const boatId = ev.dataTransfer.getData("text");
    const boat = document.getElementById(boatId);
    const length = parseInt(boat.dataset.length);

    const cell = ev.target.closest('th');
    if (!cell) return;

    const row = cell.parentElement;
    const table = row.parentElement;
    const rowIndex = Array.from(table.children).indexOf(row); // 1-10
    const cellIndex = Array.from(row.children).indexOf(cell); // 1-10

    if (orientamento === "orizzontale") {
        if (cellIndex + length - 1 > 10) {
            alert("Non c'è abbastanza spazio per posizionare la barca orizzontalmente!");
            return;
        }

        for (let i = 0; i < length; i++) {
            const targetCell = table.children[rowIndex].children[cellIndex + i];
            if (targetCell.children.length > 0) {
                alert("Spazio occupato, scegli un'altra posizione");
                return;
            }
        }

        for (let i = 0; i < length; i++) {
            const targetCell = table.children[rowIndex].children[cellIndex + i];
            const boatPart = boat.cloneNode(true);
            boatPart.removeAttribute("draggable");
            boatPart.style.width = "100%";
            boatPart.style.height = "100%";
            boatPart.style.objectFit = "cover";
            boatPart.id = boatId + "_part" + i;
            targetCell.appendChild(boatPart);
            targetCell.setAttribute("data-part", boatId);
            targetCell.classList.add("occupateGiocatore");
        }

    } else if (orientamento === "verticale") {
        if (rowIndex + length - 1 > 10) {
            alert("Non c'è abbastanza spazio per posizionare la barca verticalmente!");
            return;
        }

        for (let i = 0; i < length; i++) {
            const targetRow = table.children[rowIndex + i];
            const targetCell = targetRow.children[cellIndex];
            if (targetCell.children.length > 0) {
                alert("Spazio occupato, scegli un'altra posizione");
                return;
            }
        }

        for (let i = 0; i < length; i++) {
            const targetRow = table.children[rowIndex + i];
            const targetCell = targetRow.children[cellIndex];
            const boatPart = boat.cloneNode(true);
            boatPart.removeAttribute("draggable");
            boatPart.style.width = "100%";
            boatPart.style.height = "100%";
            boatPart.style.objectFit = "cover";
            boatPart.id = boatId + "_part" + i;
            targetCell.appendChild(boatPart);
            targetCell.setAttribute("data-part", boatId);
            targetCell.classList.add("occupateGiocatore");
        }
    }

    boat.style.display = "none";
    BarchePiazzate += 1;
    Campo();
    alert("Barche piazzate: " + BarchePiazzate);
}

document.addEventListener("wheel", (event) => {
    if (event.deltaY > 0) {
        orientamento = "orizzontale";
    } else if (event.deltaY < 0) {
        orientamento = "verticale";
    }
    console.log("Orientamento attuale:", orientamento);
});

function inizializzaCelle() {
    const celle = document.querySelectorAll("td");
    celle.forEach(cell => {
        cell.classList.add("libereGiocatore");
        cell.classList.remove("occupateGiocatore");
    });
}


// ——— NUOVA FUNZIONE: Controllo celle cliccate ———
function controllaCellaCliccata(event) {
    const cella = event.target.closest('td,th');
    if (!cella) return;

    const riga = cella.parentElement;
    const tabella = riga.parentElement;
    const rigaIndex = Array.from(tabella.children).indexOf(riga);
    const colonnaIndex = Array.from(riga.children).indexOf(cella);
    let colonne;
    switch(colonnaIndex)
        {
            default:
                colonne=" ";
                break;
            case 1:
                colonne="a";
                break;
            case 2:
                colonne="b";
                break;
            case 3:
                colonne="c";
                break;
            case 4:
                colonne="d";
                break;
            case 5:
                colonne="e";
                break;
            case 6:
                colonne="f";
                break;
            case 7:
                colonne="g";
                break;
            case 8:
                colonne="h";
                break;
            case 9:
                colonne="i";
                break;
            case 10:
                colonne="j";
                break;
        }

    const posizione = `(${rigaIndex }, ${colonne})`;

    if (cella.children.length > 0 || cella.classList.contains("occupateGiocatore")) {
        alert(`la casella ${posizione} è occupata.`);
    } else {
        alert(`la casella ${posizione} è vuota.`);
    }
}

// ——— Inizializzazione al caricamento della pagina ———
document.addEventListener("DOMContentLoaded", function () {
    inizializzaCelle();

    // Assegna l'evento di click a tutte le celle
    document.querySelectorAll("td,th").forEach(td => {
        td.addEventListener("click", controllaCellaCliccata);
    });
});
    