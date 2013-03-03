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
    function g(e) {
        var theElement;
        theElement = document.getElementById(e);
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
            g('radioCheck').style.display = "none";
            //noinspection JSJQueryEfficiency
            g('clearStored').style.display = "inline";
            //noinspection JSJQueryEfficiency
            g('display').style.display = "none";
            //noinspection JSJQueryEfficiency
            g('addNew').style.display = "inline";
            //noinspection JSJQueryEfficiency
            g('buttonProcess').style.display = "none";
        } else if (n == "off") {
            //noinspection JSJQueryEfficiency
            g('radioCheck').style.display = "block";
            //noinspection JSJQueryEfficiency
            g('clearStored').style.display = "inline";
            //noinspection JSJQueryEfficiency
            g('display').style.display = "inline";
            //noinspection JSJQueryEfficiency
            g('addNew').style.display = "none";
            //noinspection JSJQueryEfficiency
            g('items').style.display = "none";
            //noinspection JSJQueryEfficiency
            g('buttonProcess').style.display = "inline";
        } else {
            return false;
        }
    }

    //Accessing and storing Declared Variables
    //localStorage is a Key Value pair.
    function storeData(key) {
        //key creation only if new item, then generate key.
        if(!key){
            var id = Math.floor(Math.random()*10000002);
        //retrieve all data form fields value and store in an object.
        //Object properties contain array with the form label and input value.
        }else{
            //Keep the same key value for editing contact item.
            //Key has been utilized throughout process. Key is from editSubmit event handler.
            //to validator function and then to function storeData.
            id = key;
        }
        radioSelection();
        checkSelection();
        var item         = {};
            item.fname   = ["First Name:", g('firstName').value];
            item.lname   = ["Last Name:", g('lastName').value];
            item.ename   = ["E-Mail Address:", g('email').value];
            item.pnumber = ["Phone Number:", g('phoneNumber').value];
            item.status  = ["Client Status:", status];
            item.type    = ["Case Type:", selectedBox];
            item.date    = ["Consultation Date:", g('firstConsult').value];
            item.payment = ["Method of Payment:", g('payment').value];
            item.notes   = ["Client Comments:", g('clientFeedback').value];
            item.app     = ["Rate App:", g('rating').value];
        //Save data to Local Storage: Use Stringify to convert our object to a string.
        //localStorage is a Key Value pair.
        //noinspection JSValidateTypes
        localStorage.setItem(id, JSON.stringify(item));
        alert("Saving Data! Select Display Data Link Above To View Or Edit Data!");
    }

    function getData(){
        toggleControls("on");

        if (localStorage.length === 0) {
            alert("There is no Data in Local Storage. Test Data Being Loaded");
        //testData function utilizes json.js file to populate the form with Data.
        //For testing purposes.
        testData();
        }
        //Write Data from local storage to the browser.
        //toggleControls("on");
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        g('items').style.border = "block";
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var makeli = document.createElement('li');
            var newLinksLi = document.createElement('li');
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //convert the string from local storage value back to an object using JSON.parse()
            var obj;
            obj = JSON.parse(value);
            var makeSublist = document.createElement('ul');
            makeli.appendChild(makeSublist);
            clientStatus(obj.status[1], makeSublist);
            for (var n in obj) {
                var makeSubli = document.createElement('li');
                makeSublist.appendChild(makeSubli);
                //noinspection JSUnfilteredForInLoop
                makeSubli.innerHTML = obj[n][0] + " " + obj[n][1];
                makeSublist.appendChild(newLinksLi);
                //g('items').style.display = "block";
                console.log(key);
            }
            //Create our edit and delete buttons
            makeItemLinks(localStorage.key(i), newLinksLi);
            //Create horizontal rule to separate items in edit list
            var separate = document.createElement('hr');
            separate.setAttribute("id","editItemSeparator");
            makeSublist.appendChild(separate);
        }
    }
    //Get the image for the right client type
    function clientStatus(clientType,makeSublist){
        var imageLi = document.createElement('li');
        makeSublist.appendChild(imageLi);
        var newImg = document.createElement('img');
        newImg.setAttribute("src", "img/"+clientType+".png");
        imageLi.appendChild(newImg);
        console.log(clientType);
    }


    // Make Item Links function
    // Create the edit and delete for each stored item when displayed in browser.
    function makeItemLinks(key, newLinksLi){
        //add edit single item link
        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Client Data";
        //Accesses the stored key value in editLink.key = key
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        newLinksLi.appendChild(editLink);

        //line break added for edit and delete links
        var breakTag = document.createElement('br');
        newLinksLi.appendChild(breakTag);

        //delete single item link created
        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Client Data";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        newLinksLi.appendChild(deleteLink);
    }

    //Function used to edit individual items
    function editItem(){
        //Grab the data from stored items JSON.stringify(item) in Local Storage.
        //this.key is the same as editLink.key
        var value = localStorage.getItem(this.key);
        //JSON.parse(value) converts JSON.stringify(item)
        var item = JSON.parse(value);
        console.log(item);
        console.log(this.key);

        //Show form function
        toggleControls("off");

        //Populate the form fields with current localStorage values.
        g('firstName').value = item.fname[1];
        g('lastName').value = item.lname[1];
        g('email').value = item.ename[1];
        g('phoneNumber').value = item.pnumber[1];
        var radioOption = document.forms[0].client;
        for(var a = 0; a < radioOption.length; a++) {
            if(radioOption[a].value == "NewClient" && item.status[1] == "NewClient"){
                radioOption[a].setAttribute("checked", "checked");
            }else if(radioOption[a].value == "ExistingClient" && item.status[1] == "ExistingClient"){
                radioOption[a].setAttribute("checked", "checked");
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
        g('firstConsult').value = item.date[1];
        g('payment').value = item.payment[1];
        g('clientFeedback').value = item.notes[1];
        g('rating').value = item.app[1];
        //Removes the initial listener from Set Link & Submit Click Events
        save.removeEventListener("click", storeData);
        //Value altered for button in Set Link & Submit Click Events
        //noinspection JSJQueryEfficiency
        g('buttonProcess').value = "Save Changes";
        //noinspection JSJQueryEfficiency
        var editSubmit = g('buttonProcess');
        //key value created saved from this function as a property of the editSubmit event.
        //further use of the this.key value when function calls to edit the saved data.
        editSubmit.addEventListener("click", validator);
        editSubmit.key = this.key;
    }

    function deleteItem(){
        var ask = confirm("Are you sure you want to delete Client Data?");
        if(ask){
            localStorage.removeItem(this.key);
            alert("Client Data Deletion Process Complete!");
            window.location.reload();
        }else{
            alert("Client Deletion Process Canceled.")
        }
    }

    //noinspection FunctionWithInconsistentReturnsJS
    function clearLocal(){
        if(localStorage.length === 0){
            alert("There is no data to clear.")
        }else{
            localStorage.clear();
            alert("All Client Data Has Been Deleted!");
            window.location.reload();
        return false;
        }
    }

    //noinspection FunctionWithInconsistentReturnsJS
    function validator(eData){
        //Define the elements to be checked
        var validateFname = g('firstName');
        var validateLname = g('lastName');
        var validateEname = g('email');
        var validatePnumber = g('phoneNumber');
        var validateDate = g('firstConsult');
        var validatePayment = g('payment');
        //Resetting Error Message Log
        //var errorLogs = g('errorLog'); is error messages from validator function.
        errorLogs.innerHTML = "";
        validateFname.style.border   = "1px solid grey";
        validateLname.style.border   = "1px solid grey";
        validateEname.style.border   = "1px solid grey";
        validatePnumber.style.border = "1px solid grey";
        validateDate.style.border    = "1px solid grey";
        validatePayment.style.border = "1px solid grey";
        //Get Error Messages
        var messageAry = [];
        //First Name Validation
        if(validateFname.value === ""){
            //Generates and stores an error message in var.
            var firstNameErrorLog = "First Name Required.";
            validateFname.style.border = "1px solid red";
            messageAry.push(firstNameErrorLog);
        }

        //Last Name Validation
        if(validateLname.value === ""){
            //Generates and stores an error message in var.
            var lastNameErrorLog = "Last Name Required.";
            validateLname.style.border = "1px solid red";
            messageAry.push(lastNameErrorLog);
        }

        //Email Validation
        var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!(emailReg.exec(validateEname.value))){
            //Generates and stores an error message in var.
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
        if(validateDate.value ===""){
            var dateErrorLog = "Initial Consultation Date Required.";
            validateDate.style.border = "1px solid red";
            messageAry.push(dateErrorLog);
        }

        //Payment Validation
        if(validatePayment.value==="Payment Options"){
            var paymentErrorLog = "Payment Option Required.";
            validatePayment.style.border = "1px solid red";
            messageAry.push(paymentErrorLog);
        }

        //If there were errors display them on screen.
        if(messageAry.length >= 1){
            for(var i =0; i<messageAry.length; i++){
                var txt = document.createElement('li');
                //Debugging due to improperly writing a Javascript Property (case sensitive)
                //innerHTMl caused hours of debugging. After review of main.js file by Mr.Lewis issue was discovered, resolved.
                txt.innerHTML = messageAry[i];
                errorLogs.appendChild(txt);
            }
            eData.preventDefault();
            console.log(messageAry);
            console.log(txt.innerHTML);
            console.log(errorLogs.appendChild(txt));
            return false;
        }else{
            //If no error messages run function to save data.
            //Send the key value, which came from the editItem function.
            //Remember this key value was passed through the edit event listener as a property (editSubmit.key = this.key;).
            //Key from getData function localStorage key item pair
            storeData(this.key);
        }
    }

    //testData function utilizes json.js file to populate the form with Data.
    //script loaded in html file
    //For testing purposes.
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
    var errorLogs = g('errorLog');

    //Set Link & Submit Click Events
    var displayLink = g('display');
        displayLink.addEventListener("click", getData);
    var clearLink = g('clearStored');
        clearLink.addEventListener("click", clearLocal);
    var save = g('buttonProcess');
        save.addEventListener("click", validator);

});




































































































































































































































































































































