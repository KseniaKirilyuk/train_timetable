var trainName="";
var destination="";
var frequency=0;
var now=moment().format('HH:mm');
var minutesAway= now - arrival;
var arrival = 0;


var config = {
    apiKey: "AIzaSyDNu1uU8UQfLK30OGjjW6kVrHPhlNHqnus",
    authDomain: "train-timetable-769bb.firebaseapp.com",
    databaseURL: "https://train-timetable-769bb.firebaseio.com",
    projectId: "train-timetable-769bb",
    storageBucket: "train-timetable-769bb.appspot.com",
    messagingSenderId: "788472207757"
  };
  firebase.initializeApp(config);

$("#addTrain").on("click", function(){
	trainName=$("#trainNameDisplay").val();
	destination=$("#destinationDisplay").val();
	frequency=$("#frequencyDisplay").val();
	arrival=$("#tranTimeDisplay").val();
	//minutesAway=$("#trainNameDisplay").val().trim();

	firebase.database().ref().push({
		trainName:trainName,
		destination:destination,
		frequency:frequency,
		arrival:arrival,
		minutesAway:minutesAway

	})
})

firebase.database().ref().on("child_added", function(snapshot){
	$("tbody").append('<tr>'
		+'<th>'+snapshot.val().trainName+'</th>'
		+'<td> '+ snapshot.val().destination+'</td>'
		+'<td> '+ snapshot.val().frequency + '</td>'
		+'<td> '+ snapshot.val().arrival + '</td>'
		+'<td> '+ snapshot.val().minutesAway + '</td>'
		+'</tr>')
})