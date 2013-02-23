/**
 * Created with JetBrains WebStorm.
 * User: Project31312
 * Date: 2/15/13
 * Time: 2:07 PM
 * To change this template use File | Settings | File Templates.
 */
// Author: Luis Camacho Jr.
// Created for: VFW 1302
// Project 3

// wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function () {

    //getElement by ID Function
    function $(x) {
        var theElement;
        theElement = document.getElementById(x);
        return theElement;
    }

    //Find value of selected radio button.
    function radioSelection() {
        //noinspection JSUnresolvedVariable
        var clientStatus = document.getElementById("radioCheck").client;
        for (var i = 0; i < clientStatus.length; i++) {
            if (clientStatus[i].checked) {
                status = clientStatus[i].value;
            }
        }
    }

    function checkSelection() {
        //noinspection JSUnresolvedVariable
        var checkedBox = document.getElementById("radioCheck").caseType;
        for (var i = 0; i < checkedBox.length; i++) {
            if (checkedBox[i].checked) {
                selectedBox = checkedBox[i].value;
            }
        }
    }

    //noinspection FunctionWithInconsistentReturnsJS
    function toggleControls(n) {
        if (n == "on") {
            //noinspection JSJQueryEfficiency
            $('radioCheck').style.display = "none";
            //noinspection JSJQueryEfficiency
            $('clearStored').style.display = "inline";
            //noinspection JSJQueryEfficiency
            $('display').style.display = "none";
            //noinspection JSJQueryEfficiency
            $('addNew').style.display = "inline";
            //noinspection JSJQueryEfficiency
            //$('buttonProcess').style.display = "none";
        } else if (n == "off") {
            //noinspection JSJQueryEfficiency
            $('radioCheck').style.display = "block";
            //noinspection JSJQueryEfficiency
            $('clearStored').style.display = "inline";
            //noinspection JSJQueryEfficiency
            $('display').style.display = "inline";
            //noinspection JSJQueryEfficiency
            $('addNew').style.display = "none";
            //noinspection JSJQueryEfficiency
            $('items').style.display = "block";
        } else {
            return false;
        }
    }

    //Accessing and storing Declared Variables
    function storeData() {
        var id = Math.floor(Math.random() * 10000002);
        //retrieve all data form fields value and store in an object.
        //Object properties contain array with the form label and input value.
        radioSelection();
        checkSelection();
        var item = {};
        item.fname = ["First Name:", $('firstName').value];
        item.lname = ["Last Name:", $('lastName').value];
        item.ename = ["E-Mail Address:", $('email').value];
        item.pnumber = ["Phone Number:", $('phoneNumber').value];
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

    function getData() {
        //toggleControls("on");
        if (localStorage.length === 0) {
            alert("There is no data in Local Storage. Loading Data for Testing.");
        testData();
        }
        //Write Data from local storage to the browser.
        toggleControls("on");
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $('items').style.display = "block";
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var makeli = document.createElement('li');
            var linksLi = document.createElement('li');
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //convert the string from local storage value back to an object using JSON.parse()
            var obj;
            obj = JSON.parse(value);
            var makeSublist = document.createElement('ul');
            makeli.appendChild(makeSublist);
            for (var n in obj) {
                var makeSubli = document.createElement('li');
                makeSublist.appendChild(makeSubli);
                //noinspection JSUnfilteredForInLoop
                makeSubli.innerHTML = obj[n][0] + " " + obj[n][1];
                makeSublist.appendChild(linksLi);
                //$('items').style.display = "block";
            }
            makeItemLinks(localStorage.key(i), linksLi);//Create our edit and delete buttons
        }
    }
    // Make Item Links
    // Create the edit and delete for each stored item when displayed.
    function makeItemLinks(key, linksLi){
        //add edit single item link
        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Contact";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);

        //add line break
        var breakTag = document.createElement('br');
        linksLi.appendChild(breakTag);

        //add delete single item link
        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Contact";
        //deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    }

    function editItem(){
        //Grab the data from our item from Local Storage.
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        console.log(item);
        //Show form
        toggleControls("off");

        //Populate the form fields with current localStorage values.
        $('firstName').value = item.fname[1];
        $('lastName').value = item.lname[1];
        $('email').value = item.ename[1];
        $('phoneNumber').value = item.pnumber[1];
        var radios = document.forms[0].client;
        for(var a = 0; a < radios.length; a++) {
            if(radios[a].value == "New Client" && item.status[1] == "New Client"){
                radios[a].setAttribute("checked", "checked");
            }else if(radios[a].value == "Existing Client" && item.status[1] == "Existing Client"){
                radios[a].setAttribute("checked", "checked");
            }
        }
        var checkboxes = document.forms[0].caseType;
        for(var b = 0; b < checkboxes.length; b++) {
            if(checkboxes[b].value == "Immigration Law" && item.type[1] == "Immigration Law"){
                checkboxes[b].setAttribute("checked", "checked");
            }else if(checkboxes[b].value == "Business Formation" && item.type[1] == "Business Formation"){
                checkboxes[b].setAttribute("checked", "checked");
            }else if(checkboxes[b].value == "Document Drafting" && item.type[1] == "Document Drafting"){
                checkboxes[b].setAttribute("checked", "checked");
            }
        }
        $('firstConsult').value = item.date[1];
       // $('payment').value = item.payment[1];
        var paidInFull = document.forms[0].payCheck;
        for(var i = 0; i < paidInFull.length; i++) {
            if(paidInFull[i].value == "Cash" && item.payment[1] == "Cash"){
                paidInFull[i].setAttribute("checked", "checked");
            }else if(paidInFull[i].value == "Visa" && item.payment[1] == "Visa"){
                paidInFull[i].setAttribute("checked", "checked");
            }else if(paidInFull[i].value == "AmericanExpress" && item.payment[1] == "AmericanExpress"){
                paidInFull[i].setAttribute("checked", "checked");
            }else if(paidInFull[i].value == "TravelersCheck" && item.payment[1] == "TravelersCheck"){
                paidInFull[i].setAttribute("checked", "checked");
            }
        }
        $('clientFeedback').value = item.notes[1];
        $('rating').value = item.app[1];

     /*   status = item.status[1];
        selectedBox = item.type[1];
        $('firstConsult').value = item.date[1];
        $('payment').value = item.payment[1];
        $('clientFeedback').value = item.notes[1];
        $('rating').value = item.app[1];*/

    }

    //noinspection FunctionWithInconsistentReturnsJS
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

    function validator(eData){
        //Define the elements to be checked
        var validateFname = $('firstName');
        var validateLname = $('lastName');
        var validateEname = $('email');
        var validatePnumber = $('phoneNumber');
     //   var validateType = selectedBox;
        var validateDate = $('firstConsult');

        //Resetting Error Message Log
        errorLogs.innerHTML = "";
        validateFname.style.border = "1px solid black";
        validateLname.style.border = "1px solid black";
        validateEname.style.border = "1px solid black";
        validatePnumber.style.border = "1px solid black";
        validateDate.style.border = "1px solid black";

        //Get Error Messages
        var messageAry = [];

        //First Name Validation
        if(validateFname.value === ""){
            var firstNameErrorLog = "First Name Required.";
            validateFname.style.border = "1px solid red";
            messageAry.push(firstNameErrorLog);
        }

        //Last Name Validation
        if(validateLname.value === ""){
            var lastNameErrorLog = "Last Name Required.";
            validateLname.style.border = "1px solid red";
            messageAry.push(lastNameErrorLog);
        }

        //Email Validation
        var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!(emailReg.exec(validateEname.value))){
            var emailErrorLog = "Valid Email Address Required.";
            validateEname.style.border = "1px solid red";
            messageAry.push(emailErrorLog);
        }

        //Phone Number Validation
        var pNumberReg = /^\(?(\d{3})\)?[\.\-\/ ]?(\d{3})[\.\-\/ ]?(\d{4})$/;
        if(!(pNumberReg.exec(validatePnumber.value))){
            var pNumberErrorLog = "Valid Phone Number is Required.";
            validatePnumber.style.border = "1px solid red";
            messageAry.push(pNumberErrorLog);
        }

        //Date Validation
        if(validateDate.value === ""){
            var dateErrorLog = "Initial Consultation Date Required.";
            validateDate.style.border = "1px solid red";
            messageAry.push(dateErrorLog);
        }

        //If There were errors display them on screen.
        if(messageAry.length >= 1){
            for(var i =0; i<messageAry.length; i++){
                var txt = document.createElement('li');
                txt.innerHTMl = messageAry[i];
                errorLogs.appendChild(txt);
            }
            eData.preventDefault();
            console.log(messageAry);
            console.log(txt.innerHTMl);
            console.log(errorLogs.appendChild(txt));
            return false;
        }else{
            //If no error messages run function to save data.
            storeData();
        }
    }

    function testData(){
        for(var n in json){
            var id = Math.floor(Math.random()*10000002);
            //noinspection JSValidateTypes,JSUnfilteredForInLoop
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
    }

    //Variable defaults
    var status;
    var selectedBox;
    var errorLogs = $('errorLog');

    //Set Link & Submit Click Events
    var displayLink = $('display');
        displayLink.addEventListener("click", getData);
    var clearLink = $('clearStored');
        clearLink.addEventListener("click", clearLocal);
    var save = $('buttonProcess');
        save.addEventListener("click", validator);
});




































































































































































































































































































































