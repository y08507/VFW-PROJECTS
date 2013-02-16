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
var newClient = document.getElementById("newClient");
var existingClient = document.getElementById("existingClient");
var immigrationLaw = document.getElementById("immigrationLaw");
var businnessFormation = document.getElementById("businnessFormation");
var documentDrafting = document.getElementById("documentDrafting");
var firstConsult = document.getElementById("firstConsult");
var payment = document.getElementById("payment");
var clientFeedback = document.getElementById("clientFeedback");
var rating = document.getElementById("rating");

var results = function(){


}

firstname.addEventListener("blur", results);
lastname.addEventListener("blur", results);
newClient.addEventListener("blur", results);
existingClient.addEventListener("blur", results);
immigrationLaw.addEventListener("blur", results);
businnessFormation.addEventListener("blur", results);
documentDrafting.addEventListener("blur", results);
firstConsult.addEventListener("blur", results);
payment.addEventListener("blur", results);
clientFeedback.addEventListener("blur", results);
rating.addEventListener("blur", results);


console.log(firstname);


var myCheckbox = document.getElementsByTagName("li")
console.log(myCheckbox);






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