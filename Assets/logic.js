// setting date time global variable and getting time string to datetime id 
var dateTime = new Date();
console.log(dateTime);
$("#current-time").append(dateTime);



// Initialize Firebase
var config = {
    apiKey: "AIzaSyBQVLLlhzy7DZ_YinJORiQqLaybJUBoOQU",
    authDomain: "bijan-2f405.firebaseapp.com",
    databaseURL: "https://bijan-2f405.firebaseio.com",
    projectId: "bijan-2f405",
    storageBucket: "bijan-2f405.appspot.com",
    messagingSenderId: "236371314140"
};
firebase.initializeApp(config);
var database = firebase.database();

// initialize train info
var trainName = $("#train-name").val().trim();
var trainDestination = $("#destination").val().trim();
var firstTime = $("#first-time").val().trim();
var trainFrequency = $("#train-frequency").val().trim();

// when loaded, the train row information is appended to the tablebody
database.ref().on("child_added", function (snapshot) {
    var currentDate = new Date();
    var nextTrainName = snapshot.val().trainName;
    var nextTrainDestination = snapshot.val().trainDestination;
    var nextTrainFrequency = snapshot.val().trainFrequency;
    var minutesUntilNextTrain = moment().hour(currentDate).minute(currentDate).add(nextTrainFrequency).format("HH:mm");
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    var today = new Date();
    var currentDate = new Date();
    var diffMs = (currentDate - today);

    // attempting to calculate the next arrival and minutes until
    // var date = new Date();
    // var minutesUntilNextTrain = trainFrequency - tRemainder;
    // var trainFrequency = nextTrainFrequency;
    // var tRemainder = diffTime % trainFrequency;
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    var trainRow = $("<tr></tr>")

    //Add info to each data box 

    var tdata1 = $("<td>" + nextTrainName + "</td>");
    var tdata2 = $("<td>" + nextTrainDestination + "</td>");
    var tdata3 = $("<td>" + nextTrainFrequency + "</td>");
    var tdata4 = $("<td>" + minutesUntilNextTrain + "</td>"); // calculate the next arrival here. I am trying to figure out the minute function to get next minutes into here
    var tdata5 = $("<td>" + diffMins + " </td>"); // calculate minutes away here 
    //var tdata6 = $("<td> billed calculation </td>");

    //append data boxes to row

    trainRow.append(tdata1, tdata2, tdata3, tdata4, tdata5);
    $("#tablebody").append(trainRow);
})

$(document).ready(function () {

    $("#submit-button").on("click", (event) => {
        event.preventDefault();
        // Create variables that has all the form information
        var trainName = $("#train-name").val().trim();
        var trainDestination = $("#destination").val().trim();
        var trainFirstTime = $("#first-time").val().trim();
        var trainFrequency = $("#train-frequency").val().trim();

        //push this info to the database
        database.ref().push({
            trainName: trainName,
            trainDestination: trainDestination,
            trainFirstTime: trainFirstTime,
            trainFrequency: trainFrequency
        });
        console.log(trainName)
        console.log(trainDestination)
        console.log(firstTime)
        console.log(trainFrequency)
    });
});