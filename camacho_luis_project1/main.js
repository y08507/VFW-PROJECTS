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


var firstname = document.getElementById("firstname");
var lastname = document.getElementById("lastname");
var clientStatus = document.forms[0].client;
var existingClient = document.getElementById("existingClient");
var immigrationLaw = document.getElementById("immigrationLaw");
var businessFormation = document.getElementById("businessFormation");
var documentDrafting = document.getElementById("documentDrafting");
var caseSelection = document.forms[0].caseType;
var firstConsult = document.getElementById("firstConsult");
var payment = document.getElementById("payment");
var clientFeedback = document.getElementById("clientFeedback");
var rating = document.getElementById("rating");

var results0 = function() {
    for(i=0; i<caseSelection.length; i++){
    if(caseSelection[i].checked){
        console.log(caseSelection[i].value)
    }
    }

};
var results1 = function() {
    for(i=0; i<clientStatus.length; i++){
        if(clientStatus[i].checked){
            console.log(clientStatus[i].value)
        }
    }

};
var results = function() {
console.log();




};



firstname.addEventListener("blur", results);
lastname.addEventListener("blur", results);
//newClient.addEventListener("blur", results);
//existingClient.addEventListener("blur", results);
//immigrationLaw.addEventListener("blur", results);
//businessFormation.addEventListener("blur", results);
//documentDrafting.addEventListener("blur", results);
firstConsult.addEventListener("blur", results);
payment.addEventListener("blur", results);
clientFeedback.addEventListener("blur", results);
rating.addEventListener("change", results);
buttonProcess.addEventListener("click", results1);
buttonProcess.addEventListener("click", results0);











/*
Common JS EVents

click
submit
focus
blur
change
mouseover
mouseout
*/