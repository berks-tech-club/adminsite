// https://www.lynda.com/React-Native-tutorials/React-Navigation-creating-navigator/645061/686606-4.html

var config = {
    apiKey: "AIzaSyDfiBzLoNU4t5q_hOdcFjg-RGKNFnZ5wxg",
    authDomain: "berks-technology-club-admin.firebaseapp.com",
    databaseURL: "https://berks-technology-club-admin.firebaseio.com",
    projectId: "berks-technology-club-admin",
    storageBucket: "berks-technology-club-admin.appspot.com",
    messagingSenderId: "203643757535"
};
var app = firebase.initializeApp(config);

//var db = firebase.database();
var db = app.database();

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }

  function addEvent( name, desc, imageUrl, moreInfo) {
    db.ref('events/' + app.userId).push().set({
      name: name,
      desc: desc,
      imageUrl: imageUrl,
      moreInfo: moreInfo
    });
  }