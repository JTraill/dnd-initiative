var nodes = [];
var count = 0;

function AddItem(val, init){
    if(val != null){
        name = val;
        var initiative = document.getElementById(init).value
    }else{
        var name = document.getElementById('name').value;
        var initiative = document.getElementById('initiative').value;
    }

    var node = {
        name: name,
        initiative: initiative,
        displayInitiative: initiative,
        processed: false,
        id: count,
        modifier: initiative
    }
    count++;

    nodes.push(node);
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
        var editCell = newRow.insertCell();
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
        editCell.innerHTML += `<button id='btnEdit' onclick='EditCell(${currentId})' button type="button"></button>`;

        row = tbodyRef.insertRow();
    }
}

function RemoveItemsAndEmptyNodes(){
    EmptyNodes()
    RemoveItems();
    UpdateTable();
    
}

function EndTurn(id){
    console.log(id);
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

function EditCell(id){

}