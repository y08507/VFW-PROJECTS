/**
 * Created with JetBrains WebStorm.
 * User: Project31312
 * Date: 2/15/13
 * Time: 2:07 PM
 * To change this template use File | Settings | File Templates.
 */
// Author: Luis Camacho Jr.
// Created for: VFW 1302
// Project 2

// wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function () {

//getElement by ID Function
    function $(x) {
        var theElement = document.getElementById(x);
        return theElement;
    }

    //Find value of selected radio button.
    function radioSelection() {
        var clientStatus = document.getElementById("radioCheck").client;
        for (var i = 0; i < clientStatus.length; i++) {
            if (clientStatus[i].checked) {
                status = clientStatus[i].value;
            }
        }
    }

    function checkSelection() {
        var checkedBox = document.getElementById("radioCheck").caseType;
        for (var i = 0; i < checkedBox.length; i++) {
            if (checkedBox[i].checked) {
                selectedBox = checkedBox[i].value;
            }
        }
    }
    /*function toggleControls(n){
        switch(n){
            case "on":
                $('radioCheck').style.display = "none";
                $('clearStored').style.display = "inline";
                $('display').style.display = "none";
                $('addNew').style.display = "inline";
                break;
            case "off":
                 $('radioCheck').style.display = "block";
                 $('clearStored').style.display = "inline";
                 $('display').style.display = "inline";
                 $('addNew').style.display = "none";
                 $('items').style.display = 'none';
                break;
            default:
                return false;
        }

    }*/
    //Accessing and storing Declared Variables
    function storeData() {
        var id = Math.floor(Math.random() * 10000002);
        //retrieve all data form fields value and store in an object.
        //Object properties contain array with the form label and input value.
        radioSelection();
        checkSelection();
        var item = {};
            item.fname = ["First Name:", $('firstname').value];
            item.lname = ["Last Name:", $('lastname').value];
            item.status = ["Client Status:", status];
            item.type = ["Case Type:", selectedBox];
            item.date = ["Consultation Date:", $('firstConsult').value];
            item.payment = ["Method of Payment:", $('payment').value];
            item.notes = ["Client Comments:", $('clientFeedback').value];
            item.app = ["Rate App:", $('rating').value];
        //Save data to Local Storage: Use Stringify to convert our object to a string.
        localStorage.setItem(id, JSON.stringify(item));
        alert("Processing Data!");
    }

    function getData(){
     //   toggleControls("on");
        if(localStorage.length === 0){
            alert("There is no data in Local Storage.");
        }
        //Write Data from local storage to the browser.
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeList);
        //$('items').style.display = 'block';
        for(var i=0, len=localStorage.length; i<len;i++){
            var makeli = document.createElement('li');
                makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //convert the string from local storage value back to an object using JSON.parse()
            var obj = JSON.parse(value);
            var makeSublist = document.createElement('ul');
                makeli.appendChild(makeSublist);
            for(var n in obj){
            var makeSubli = document.createElement('li');
                makeSublist.appendChild(makeSubli);
            var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubli.innerHTML = optSubText;
            }
        }
    }

    function clearLocal(){
        if(localStorage.length === 0){
            alert("There is no data to clear.")
        }else{
            localStorage.clear();
            alert("All contacts are deleted!");
            window.location.reload();
        return false;
        }
    }

            //Variable defaults
            var status;
            var selectedBox;

            //Set Link & Submit Click Events
            var displayLink = $('display');
              displayLink.addEventListener("click", getData);
            var clearLink = $('clearStored');
              clearLink.addEventListener("click", clearLocal);
            var save = $('buttonProcess');
              save.addEventListener("click", storeData)});




































































































































































































































































































































