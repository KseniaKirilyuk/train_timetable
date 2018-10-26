$(document).ready(function(){
var config = {
    apiKey: "AIzaSyDNu1uU8UQfLK30OGjjW6kVrHPhlNHqnus",
    authDomain: "train-timetable-769bb.firebaseapp.com",
    databaseURL: "https://train-timetable-769bb.firebaseio.com",
    projectId: "train-timetable-769bb",
    storageBucket: "train-timetable-769bb.appspot.com",
    messagingSenderId: "788472207757"
  };
firebase.initializeApp(config);

//display the current time time 
$("#currentTime").html(moment().format("hh:mm A"));

var trainData = firebase.database().ref();


$("#addTrain").on("click", function(){

    event.preventDefault();
    var trainName = $("#trainNameDisplay").val(); //trim() does not work?
    var destination = $("#destinationDisplay").val();
    var firstTrainTime = $("firstTrainTimeDisplay").val();
    var frequency = $("#frequencyDisplay").val();

    trainData.push({
        trainName:trainName,
        destination:destination,
        frequency:frequency
        //minutesAway:minutesAway

    })

    //clear inputs(?? is it a good way to clean??)
    $("#trainNameDisplay").val("");
    $("#destinationDisplay").val("");
    $("firstTrainTimeDisplay").val("");
    $("#frequencyDisplay").val("");
});



trainData.on("child_added", function(snapshot){
    var snapshot = snapshot.val();
    snaptrainName= snapshot.trainName;
    snapdestination=snapshot.destination;
    snapfrequency=snapshot.frequency;
    $("tbody").append("<tr><td>" + snaptrainName + "</td><td>" + snapdestination + "</td><td>" + snapfrequency + "</td></tr>");

})

})