
/**
 * TODO: DATA scadenza
 * TODO: SAVE
 * TODO: MSG pulse dot only
 */

// --- WINDOW LOAD
window.addEventListener('load', function () {
    txt.focus();
    Animazione(quoteUno[ranQuoteUno]);
});

// --- BOTTONI
var btnRemove = document.getElementById('btnRemove');
var btnClear = document.getElementById('btnClear');
var btnSave = document.getElementById('btnSave');

// --- VARIABILI
var txt = document.getElementById('txt');
var olNode = document.getElementById('list');
var msg = document.getElementById('msg');
var testo = '';

// --- DATA
var date = new Date().toLocaleString().split(',')[0];

// --- COUNTERS
var indice = 0;
var check = 0;
var checkAlert = 0;
var txtArray = [];
var press = 0;

// --- AGGIUNGE testo + icona cestino + icona edit
txt.addEventListener('keypress', function(keyEvent) {
    if (keyEvent.keyCode === 13){

        // --- CREAZIONE OL list 
        var liNode = document.createElement('LI');
        var dateInput = document.createTextNode(date + ' ');
        var txtInput = document.createTextNode(txt.value);
        
        var alertNode = document.createElement('I');
        alertNode.classList.add('fas', 'fa-exclamation-triangle')
        var editNode = document.createElement('I');
        editNode.classList.add('fas', 'fa-pencil-alt');
        var removeNode = document.createElement('I');
        removeNode.classList.add('fas', 'fa-trash-alt');

        liNode.append(txtInput, removeNode, editNode, alertNode);
        olNode.appendChild(liNode);
        
        // --- assegna INDEX
        liNode.setAttribute('nodeIndex', indice);
        editNode.setAttribute('editIndex', indice);
        removeNode.setAttribute('removeIndex', indice); 
        alertNode.setAttribute('alertIndex', indice);        
        
        // --- REMOVE + EDIT + ALERT + STROKE + COUNTERS 
        liNode.addEventListener('click', function(event) { 
            var element = event.target;
            var statoNode = liNode.getAttribute('class');
            var statoAlert = alertNode.getAttribute('class');

            // --- REMOVE
            if (element === removeNode) {
                if (statoNode === 'checked') {
                    check--;
                } else if (statoAlert === 'fas fa-exclamation-triangle alert') {
                    checkAlert--;
                }
                var removeIndex = element.getAttribute('removeIndex');            
                console.log(`${txtArray[removeIndex]}, indice remove selezionato ${removeIndex}`);
                element.parentNode.remove();
                txtArray.splice(txtArray[removeIndex] - 1, 1);
                txt.focus();

            // --- EDIT
            } else if (element === editNode) {    
                Animazione('EDIT MODE: ON');
                var editInput = document.createElement('INPUT');
                editInput.setAttribute('type', 'text');
                editInput.setAttribute('value', liNode.textContent);
                editInput.setAttribute('maxlength', '24');
                liNode.textContent = '';
                liNode.append(editInput);
                editInput.onblur = function(){
                    liNode.textContent = editInput.value; 
                    liNode.append(removeNode, editNode, alertNode);
                    Animazione('EDIT MODE: OFF')
                };
                
                var editIndex = element.getAttribute('editIndex');          
                console.log(`${txtArray[editIndex]}, indice edit selezionato ${editIndex}`);

            // --- ALERT
            } else if (element === alertNode) {
                element.classList.toggle('alert');
                var alertIndex = element.getAttribute('alertIndex');
                console.log(`${txtArray[alertIndex]}, indice alert selezionato ${alertIndex}`);
                
                // --- ALERT COUNTER
                statoAlert = alertNode.getAttribute('class');
                if (statoAlert === 'fas fa-exclamation-triangle alert'){
                    checkAlert++;
                } else {
                    checkAlert--;
                }

            // --- STROKE  
            } else if (element === liNode) {
                element.classList.toggle('checked');
                var valoreIndice = element.getAttribute('nodeIndex');
                console.log(`${element.textContent}, indice selezionato ${valoreIndice}`);

                // --- MISSION COUNTER
                statoNode = liNode.getAttribute('class');
                if (statoNode === 'checked') {
                    check++; 
                } else {
                    check--;
                };
                if (statoNode === 'checked' && statoAlert === 'fas fa-exclamation-triangle alert'){
                    checkAlert--;     
                    alertNode.classList.toggle('alert', false); 
                };
            }

        counter.innerHTML = `Completed: ${check} | ${txtArray.length}`;
        counterAlert.innerHTML = `Urgent: ${checkAlert}`;
    });

    /**
     * incrementa indice 
     * popola array testo
     * svuota l'input 
     * svuota contatore animazione 
     * posiziona il puntatore 
     * aggiorna counter
     * attiva animazione Missile
     */
    indice++;
    txtArray.push(txt.value); 
    press = 0;
    txt.value = '';
    txt.focus();
    counter.innerHTML = `Completed: ${check} | ${txtArray.length}`;
    counterAlert.innerHTML = `Urgent: ${checkAlert}`;
    Animazione(` MISSION ${txtArray.length}      )=====> LOADED!`);
}});


// --- CLEAR tutta la lista
btnClear.addEventListener('click', function() {
        Animazione('ALL CLEARED! - LOAD A MISSION');
        olNode.innerHTML = '';
        txtArray = [];
        txt.focus();
        counter.innerHTML = '';
        counterAlert.innerHTML = '';
        check = 0;
        checkAlert = 0;
    });

// --- ANIMAZIONE testo ROBOT
function Animazione(str) {
    msg.innerHTML = '';
    var txtRobot = str;
    var splitTxtRobot = txtRobot.split('');
    (function animation() {
     splitTxtRobot.length > 0 ? msg.innerHTML += splitTxtRobot.shift() : clearTimeout(running);
        var running = setTimeout(animation, 100);
    })();
};

// --- VERDICT % ROBOT
function Verdict(){
    var perc = Math.round((check / txtArray.length) * 100);
    Animazione(`${perc}% COMPLETED`);
};

// --- RANDOM ROBOT Quotes
let quoteUno = [' Dajeee!',
    date,
    '...scrivi...scrivi',
    ' è solo Lunedì',
    '...ancora, più forte'];
let ranQuoteUno = Math.floor(Math.random() * (quoteUno.length));






