// Storing the table data in the tables variable
var tables = {
    table1:{cost:0,item:0,orders:{}},
    table2:{cost:0,item:0,orders:{}},
    table3:{cost:0,item:0,orders:{}},
    table4:{cost:0,item:0,orders:{}}
}

//Storing information about the menu items
const menu = {
    item1:{name:"Egg 65",cost:120.00,type:"starter"},
    item2:{name:"Chicken lollipop",cost:190.00,type:"starter"},
    item3:{name:"Chicken 65",cost:185.00,type:"starter"},
    item4:{name:"Chicken Dum Biriyani",cost:250.00,type:"main course"},
    item5:{name:"Mutton Dum Biriyani",cost:290.00,type:"main course"},
    item6:{name:"Dilkhush Biriyani",cost:310.00,type:"main course"},
    item7:{name:"Chicken Mandi",cost:350.00,type:"main course"},
    item8:{name:"Mutton Mandi",cost:400.00,type:"main course"},
    item9:{name:"All Mix Mandi",cost:550.00,type:"main course"},
    item10:{name:"Veg Biriyani",cost:210.00,type:"main course"},
    item11:{name:"Chicken Pulav",cost:200.00,type:"main course"},
    item12:{name:"Mutton Pulav",cost:300.00,type:"main course"},
    item13:{name:"Kaddu Khir",cost:75.00,type:"desserts"},
    item14:{name:"Gulab Jamun",cost:90.00,type:"desserts"},
    item15:{name:"Doubleka Meeta",cost:100.00,type:"desserts"},    
    item16:{name:"Mountain Dew",cost:50.00,type:"cool drink"},
    item17:{name:"Sprite",cost:30.00,type:"cool drink"}
}


//Getting the tableList and menuItems elements by their idName
const tableList = document.getElementById("table_list");
const menuList = document.getElementById("menu_list");  


//These function will automatically render when the page is loaded
/*
In this function we are storing the table and menu data in localStorage
JSON.stringify();--> used to convert the object into string format
*/
function pageLoad(){
    if(localStorage.getItem("tableList") == null){
        localStorage.setItem("tableList",JSON.stringify(tables));
    }
    if(localStorage.getItem("menuList") == null){
        localStorage.setItem("menuList",JSON.stringify(menu));
        console.log("Adding menu");
    }
    loadTables();
    loadMenu();
}


// Adding the tables to the main structure of the html
function loadTables(){
    let i = 1;
    tableList.innerHTML="";
    tableObj = JSON.parse(localStorage.getItem("tableList"));
    while(tableObj["table"+i] != undefined){
        let { cost, item} = tableObj["table"+i];
        let tableElement = createTableElement(i,cost,item);
        tableList.innerHTML += tableElement;
        i+=1;
    }
}


/* Creating the table and also mentioned the methods for onclick and ondrop and ondragover functions
    Here we are creating the div for each table and  mentioning the table name along with the total cost of the table and also the number of items
    */
function createTableElement(i,cost,item) {
    let tableItem = `<div class="table table${i}" id="table${i}" ondrop="drop(event,'table${i}')" ondragover="allowDrop(event)" onclick="openModal('table${i}')">
                        <h2>Table-${i}</h2>
                        <p>Rs.<span id="table${i}_amount">${cost}</span> | Total Items :<span id="table${i}_items">${item}</span></p>
                    </div>`

    return tableItem;
}


// Adding the menu to the main structure of the html
function loadMenu(){
    let i = 1;
    menuList.innerHTML="";
    menuObj = JSON.parse(localStorage.getItem("menuList"));
    while(menuObj["item"+i]!= undefined){
        let { name, cost, type} = menuObj["item"+i];
        let menuElement = createMenuElement(i,name,cost,type);
        menuList.innerHTML += menuElement;
        i+=1;
    }
}

/* Create the menu element, creating the div for  each menuitem which contains the item name,cost and type */
function createMenuElement(i,name,cost,type) {
    let menuItem = `<div class="item item${i}" id="item${i}" draggable="true" ondragstart="drag(event)">
                        <h2>${name}</h2>
                        <p><span id="item${i}_price">${cost}.00, </span>
                        <span id="type">${type}</span></p>
                    </div>`
    return menuItem;
}

function searchTable(){
    let key = table_search_bar.value;
    searchKey = key.toLowerCase();
    if(searchKey == ""){
        loadTables();
    }
    else{
        tables = JSON.parse(localStorage.getItem("tableList"));
        tableList.innerHTML="";
        let i = 1;
        while(tables["table"+i] != undefined){
            let {cost, item} = tables["table"+i];
            let tableName = `table${i}`;
            console.log(tableName);
            if(tableName.includes(searchKey)){
                let tableElement = createTableElement(i,cost,item);
                tableList.innerHTML += tableElement;
            }
            i+=1;
        }
    }

}

/* Here i am implementing the search functionality for menuItems
    Search can be done by both item name and also with the type of food like main course or deserts etc.. */
function searchMenu(){
    let menuKey = menu_search_bar.value;
    console.log(menuKey);
    menuKey = menuKey.toLowerCase();

    if(menuKey == ""){
        loadMenu();
    }
    else{
        if(menuKey.length <= 1) return;
        let menuList = document.getElementById("menu_list");  
        menuList.innerHTML="";
        let i = 1;
        while(menuObj["item"+i] != undefined){
            let { name, cost, type} = menuObj["item"+i];
            let lowercaseName = name.toLowerCase();
            if(lowercaseName.includes(menuKey)){
                let menuElement = createMenuElement(i,name,cost,type);
                menuList.innerHTML += menuElement;
            }else if(type.includes(menuKey)){
                let menuElement = createMenuElement(i,name,cost,type);
                menuList.innerHTML += menuElement;
            }
            i+=1;
        }
    }
}

/* drag event is in the menu element which will be having the id of the menu element
    dataTransfer is the method in event and we are setting the data using setData in which we have the 2 variables
    first variable is the string which will tell the which type of data is transferred in event and second variable is the id)
 */
function drag(event){
    event.dataTransfer.setData("id",event.target.id);
}

/* This function will allow the browser to prevent the default functionalities of the browser when something is draged on the element 
    that is done by the function in the event called preventDefault()*/
function allowDrop(event){
    event.preventDefault();
}

/* This event will trigger when the item is droped on the table and these function has 2 parameter one is event which contain the data of the event and the
table name in which we droped the item*/
function drop(event,tableName){
    event.preventDefault();
    addItemToTable(tableName, event.dataTransfer.getData("id"));
}

/* This function is called in the above drop function 
    Here we add the droped item cost to the table total amount and also the no of items
    I added a special functionality that if we add same item the cost will increase but the item count will not increase */
function addItemToTable(tableName,menuItemName){
    console.log(tableName);
    console.log(menuItemName);
    let tables = JSON.parse(localStorage.getItem("tableList"));
    console.log(tables);
    let currentOrder = menuObj[menuItemName];
    console.log(currentOrder);
    if (tables[tableName]["orders"][menuItemName] == undefined) {
        tables[tableName]["orders"][menuItemName] = 1;
        tables[tableName]["item"] += 1;

    }
    else{
        tables[tableName]["orders"][menuItemName] += 1;
    }
    tables[tableName].cost += parseInt(currentOrder.cost);    
    localStorage.setItem("tableList", JSON.stringify(tables));
    
    loadTables();
    loadMenu();

}

/*  From Here the code is belong to the popup window of the table order details */

var tableInfoId = document.getElementById("table-info-items");

/*  This openModal() will trigger whenever we click on any table and the tableNo will be given as a parameter*/

function openModal(tableName) {
  modal.style.display = "block";

  document.getElementById("modal-table-name").innerHTML = `<h2> ${tableName.toUpperCase()} | Order Details</h2>`;
  tableInfoId.innerHTML = `<tr>
    <th>S.No</th>
    <th>Item Name</th>
    <th>Cost</th>
    <th>Quantity</th>
    <th>Delete</th>
</tr>`;
  createRows(tableName);
}

/*  This clsoeModal fucntion will trigger whenever we click the "X" button in the popup window then the window will close as we are declaring the 
display = none */
function closeModal(){
    modal.style.display = "none";
}
  
/*  This createRow function is used to create the rows of orders in the particular table */
function createRows(tableName) {
    let i = 0;
    let tables = JSON.parse(localStorage.getItem("tableList"));
    let { cost, orders: currentOrders } = tables[tableName];
    console.log(cost);
    console.log(currentOrders)
    for (let [item, quantity] of Object.entries(currentOrders)) {
        i++;
        console.log(item)
        tableInfoId.innerHTML += `<tr>
        <td>${i}</td>
        <td>${menuObj[item].name}</td>
        <td>${menuObj[item].cost} </td>
        <td>
        <button onclick="reduceItem('${tableName}','${item}')" class="change">-</button>
        ${quantity}
        <button onclick="increaseItem('${tableName}','${item}')" class="change">+</button>
        </td>
        <td>
        <button onclick="deleteItem('${tableName}','${item}')" id="deleteButton">
        Delete
        </button>
        </td>   
    </tr>`;
    }

    let footer = document.getElementById("modal-footer");
    footer.innerHTML = "";
    let generateBillButton = document.getElementById("generate-bill");
    generateBillButton.innerHTML = "";
    if (cost != 0) {
        footer.innerHTML = `<h2>Total Bill : ${cost}</h2>`;
        generateBillButton.innerHTML = `<button onclick="closeBill('${tableName}')" id="button-close">
            Close session(Generate Bill)</button>`;
        }
}

/*  This reduceItem() will reduce the item count and the cost if we make the count to 0 then the item will deleted totally by calling the
    deleteItem Function*/
function reduceItem(tableName, item) {
    let tables = JSON.parse(localStorage.getItem("tableList"));
    let currentTable = tables[tableName];
    if (currentTable["orders"][item] == 1) {
        deleteItem(tableName,item);
        return;
    }
    let itemCost = menuObj[item]["cost"];
    currentTable["orders"][item] = currentTable["orders"][item] - 1;
    currentTable["cost"] = currentTable["cost"] - itemCost;
    tables[tableName] = currentTable;
    localStorage.setItem("tableList", JSON.stringify(tables));
    loadTables();
    openModal(tableName);
}

/*  This increaseItem() will add the item count and the cost to the table*/
function increaseItem(tableName, item) {
    let tables = JSON.parse(localStorage.getItem("tableList"));
    let currentTable = tables[tableName];
    let itemCost = menuObj[item]["cost"];
    currentTable["orders"][item] = currentTable["orders"][item] + 1;
    currentTable["cost"] = parseInt(currentTable["cost"]) + itemCost;
    tables[tableName] = currentTable;
    localStorage.setItem("tableList", JSON.stringify(tables));
    loadTables();
    openModal(tableName);
}

/*  This deleteItem() function will call when we click the delete button in the popup and also when we decrease the count of item to 0
    This function will enterly delete the item from the table */
function deleteItem(tableName, item) {
    let tables = JSON.parse(localStorage.getItem("tableList"));
    let currentTable = tables[tableName];
    let itemCount = currentTable["orders"][item];
    let itemCost = menuObj[item]["cost"];
    delete currentTable["orders"][item];
    currentTable["cost"] = parseInt(currentTable["cost"]) - itemCount * itemCost;
    currentTable["item"] -= 1;      
    tables[tableName] = currentTable;
    localStorage.setItem("tableList", JSON.stringify(tables));
    loadTables();
    openModal(tableName);
}

/* This closeBill function will call when we click the button to generate bill, this function will generate the alret msg of the total bill and then the 
table data will restored to zero*/
function closeBill(tableName){
    let tables = JSON.parse(localStorage.getItem("tableList"));
    let currentTable = tables[tableName];
    let { cost, orders: currentOrders } = currentTable;
    let data = currentOrders;
    let billData = "";
    for (let [item, quantity] of Object.entries(currentOrders)) {
        billData += `${menuObj[item].name}  -->  (${menuObj[item].cost} X ${quantity})   =   ${menuObj[item].cost * quantity}\n`;
    }         
    billData += `\n\nThe Total Amount is ${cost}`;
    console.log(billData);
    alert(billData)
    currentTable["cost"]=0;
    currentTable["item"]=0;
    currentTable["orders"]={};
    tables[tableName]=currentTable;
    localStorage.setItem("tableList", JSON.stringify(tables));
    closeModal();
    loadTables();    
}