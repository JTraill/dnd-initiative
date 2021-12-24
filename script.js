var nodes = [];
var count = 0;

function AddItem(val, init){
    var name;
    var initiative;

    if(val != null){
        name = val;
        initiative = document.getElementById(init).value
        if(initiative == ""){
            return;
        }
    }else{
        name = document.getElementById('name').value;
        initiative = document.getElementById('initiative').value;

        if(name == "" || initiative == ""){
            return;
        }
    }
    if(nodes!=null){
        nodes = nodes.filter(obj => {
            return obj.name != name
        })
    }

    var node = {
        name: name,
        initiative: initiative,
        displayInitiative: initiative,
        processed: false,
        id: count,
        modifier: initiative
    }

    nodes.push(node);
    count++;
    UpdateTable();
}

function UpdateTable(){
    nodes.sort((a, b) => parseFloat(b.modifier) - parseFloat(a.modifier));

    RemoveItems()

    for (i = 0; i < nodes.length; i++) {
        var tbodyRef = document.getElementById('table').getElementsByTagName('tbody')[0];
        var currentId = nodes[i].id;

        // Insert a row at the end of table
        var newRow = tbodyRef.insertRow();

        // Insert a cell at the end of the row
        var nameCell = newRow.insertCell();
        var initiativeCell = newRow.insertCell();
        var endCell = newRow.insertCell();
        var killCell = newRow.insertCell();

        // Append a text node to the cell
        var nameText = document.createTextNode(nodes[i].name);
        var initiativeText = document.createTextNode(nodes[i].displayInitiative);
        
        
        nameCell.appendChild(nameText);
        initiativeCell.appendChild(initiativeText);
        if(i == 0){
            endCell.innerHTML += `<button id='btnEnd' onclick='EndTurn(${currentId})' button type="button"></button>`;
        }else{
            endCell.innerHTML += `<button id='btnEndHidden' onclick='EndTurn(${currentId})' button type="button"></button>`;
        }
        killCell.innerHTML += `<button id='btnKill' onclick='KillCharacter(${currentId})' button type="button"></button>`;
        row = tbodyRef.insertRow();
    }
}

function RemoveItemsAndEmptyNodes(){
    EmptyNodes();
    RemoveItems();
    //UpdateTable();
    
}

function EndTurn(id){
    var result = nodes.filter(obj => {
        return obj.id === id
      })[0]

    result.modifier -= 100;
    UpdateTable();
}

function RemoveItems(){
    $('#table tr:not(:first)').remove();
}

function EmptyNodes(){
    nodes = [];
}

function KillCharacter(id){
    nodes = nodes.filter(item => item.id !== id)

    UpdateTable();
}