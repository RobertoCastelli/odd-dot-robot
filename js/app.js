// --- WINDOW LOAD
window.addEventListener('load', function () {
    Load();
    txt.focus();
    txt.innerHTML = '';
});

// --- BOTTONI
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

// --- PRESS ENTER --> ADD
txt.addEventListener('keypress', function(keyEvent) {
    if (keyEvent.keyCode === 13){

        // --- CREATE OL LIST 
        var dateInput = document.createTextNode(date + ' ');
        var liNode = document.createElement('LI');
        var checkBox = document.createElement('INPUT');
        var spanNode = document.createElement('SPAN');
        var txtInput = document.createTextNode(txt.value); 
        var alertNode = document.createElement('I');
        var editNode = document.createElement('I');
        var removeNode = document.createElement('I');

        // --- DRAW ICONS
        alertNode.classList.add('fas', 'fa-exclamation-triangle');
        editNode.classList.add('fas', 'fa-pencil-alt');
        removeNode.classList.add('fas', 'fa-trash-alt');
        checkBox.type = 'checkbox';
        checkBox.id = 'box';

        // --- APPEND li
        spanNode.append(txtInput);
        liNode.append(checkBox, 
                      spanNode, 
                      removeNode, 
                      editNode, 
                      alertNode);
        olNode.appendChild(liNode);
        
        // --- ASSIGN INDEX
        liNode.setAttribute('nodeIndex', indice);
        editNode.setAttribute('editIndex', indice);
        removeNode.setAttribute('removeIndex', indice); 
        alertNode.setAttribute('alertIndex', indice);  
        checkBox.setAttribute('checkBoxIndex', indice);

        // --- CALL FUNCTIONS
        removeNode.onclick = function(){ fRemove(removeNode) };  
        alertNode.onclick = function(){ fAlert(alertNode) };
        checkBox.onclick = function(){ fStroke(liNode) };     
        editNode.onclick = function(){ fEdit(checkBox,   
                                             liNode, 
                                             editNode, 
                                             liNode.textContent, 
                                             alertNode, 
                                             editNode, 
                                             removeNode)};  
        Clear();
        Save();

        // --- POPULATE COUNTER
        indice++;
        txt.value = '';
    };
});  

// --- REMOVE
function fRemove(node){
    this.node = node;
    node.parentNode.remove();
};
   
// --- ALERT
function fAlert(node){
    this.node = node;
    node.classList.toggle('alert');
};

// --- STROKE
function fStroke(node){
    this.node = node;
    node.classList.toggle('checked');
};

// --- EDIT
function fEdit(box, 
               nodeParent, 
               node, 
               testo, 
               iconaAlert, 
               iconaEdit, 
               iconaRemove){
    this.node = node;
    var editInput = document.createElement('INPUT');
    editInput.setAttribute('type', 'text');
    editInput.setAttribute('value', testo);
    editInput.setAttribute('maxlength', '24');
    nodeParent.textContent = '';
    nodeParent.append(editInput);
    editInput.onblur = function (){
        nodeParent.textContent = editInput.value;
        nodeParent.append(box, iconaRemove, iconaEdit, iconaAlert);
    };
};

// --- CLEAR
function Clear(){
    btnClear.addEventListener('click', function(){
        localStorage.clear();
        id = 0;
        olNode.innerHTML = '';
    });
};

// --- SAVE
function Save(){
    btnSave.addEventListener('click', function(){
        localStorage.setItem('elenco', olNode.innerHTML);
    });
};
    
// --- LOCAL STORAGE
function Load(){
    if (localStorage.getItem('elenco')){
        olNode.innerHTML = (localStorage.getItem('elenco'));        
        Save();
        Clear();
    };
};
