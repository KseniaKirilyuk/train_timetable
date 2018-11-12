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

var trainData = firebase.database().ref();


//display the current time time 
$("#currentTime").html(moment().format("hh:mm A"));

$("#addTrainButton").on("click", function(){

    event.preventDefault();
    //get information
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrainTime = moment($("#firstTrainTimeInput").val(), "HH:mm").subtract(1, "years").format("X");//format of unix timestamp
    console.log(firstTrainTime);
    var frequency = $("#frequencyInput").val();

    //adding new information by creating a new Object
    trainData.push({           
        trainName:trainName,
        firstTrainTime:firstTrainTime,
        destination:destination,
        frequency:frequency
    });

    //clean inputs
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainTimeInput").val("");
    $("#frequencyInput").val("");


});

trainData.on("child_added", function(snapshot){
    var data = snapshot.val();
    var dTrainName= data.trainName;
    var dFirstTrainTime=data.firstTrainTime;
    var dDestination=data.destination;
    var dFrequency=data.frequency;
    
    var remainder= moment().diff(moment.unix(dFirstTrainTime), "minutes") % dFrequency;
    console.log(remainder);


    var minutesTillTrain=dFrequency - remainder;
    console.log(minutesTillTrain);

    var nextTrain= moment().add(minutesTillTrain, "minutes").format("hh:mm A");
    console.log(nextTrain);
    //display values
    $("tbody").append("<tr><td>" + dTrainName + "</td><td>" 
                    + dDestination + "</td><td>" 
                    + dFrequency + "</td><td>"
                    +nextTrain+"</td><td>"
                    +minutesTillTrain+"</td></tr>");

});

//  STYLING PAGE

//slider
var slideIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none"; 
    }
    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1} 
    x[slideIndex-1].style.display = "block"; 
    //setTimeout(carousel, 2000); // Change image every 2 seconds
}


})


