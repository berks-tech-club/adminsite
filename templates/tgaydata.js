// Initialize Firebase
var config = {
    apiKey: "AIzaSyBvpcZQSMszTTRxCnQp2zNAQATpcSSCAgQ",
    authDomain: "pewdiepie-vs-t-series-146e9.firebaseapp.com",
    databaseURL: "https://pewdiepie-vs-t-series-146e9.firebaseio.com",
    projectId: "pewdiepie-vs-t-series-146e9",
    storageBucket: "pewdiepie-vs-t-series-146e9.appspot.com",
    messagingSenderId: "696471204091"
};
firebase.initializeApp(config);

var db = firebase.firestore();

db.collection("images")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data().banner);

            if(doc.id == 'pewdiepie'){
                $('#PewDiePieBanner').attr('src', doc.data().banner);
                $('#PewDiePieProfile').attr('src', doc.data().profile);
            } else {
                $('#TSeriesBanner').attr('src', doc.data().banner);
                $('#TSeriesProfile').attr('src', doc.data().profile);
            }


        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });
