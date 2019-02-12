var config = {
    apiKey: "AIzaSyDfiBzLoNU4t5q_hOdcFjg-RGKNFnZ5wxg",
    authDomain: "berks-technology-club-admin.firebaseapp.com",
    databaseURL: "https://berks-technology-club-admin.firebaseio.com",
    projectId: "berks-technology-club-admin",
    storageBucket: "berks-technology-club-admin.appspot.com",
    messagingSenderId: "203643757535"
};
firebase.initializeApp(config);

//var auth = firebase.auth();

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      window.location.href = "index.html";
    } else {
      // User is signed out.
      //window.location.href = "login.html";
    }
  });

function signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}

function addUser(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}

//--------------------------------------------------
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const btnLogin = document.getElementById('btnLogin');

//login user
btnLogin.addEventListener('click', e => {
    const email = emailField.value;
    const pass = passwordField.value;
    const auth = firebase.auth();
    //sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => errors(e));
});

emailField.addEventListener('keypress', function (e) {
    console.log("eneter");
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        const email = emailField.value;
        const pass = passwordField.value;
        const auth = firebase.auth();
        //sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => errors(e));
    }
});
passwordField.addEventListener('keypress', function (e) {
    console.log("eneter");
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        const email = emailField.value;
        const pass = passwordField.value;
        const auth = firebase.auth();
        //sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => errors(e));
    }
});

var showedForgotBtn = false;
function errors(errorMessage){
Materialize.toast(errorMessage.message, 4000)
if(!showedForgotBtn){
    $("#loginActions").append('<br><br><a href="forgot.html" class="waves-effect waves-light btn red lighten-1">Forgot Password</a>');
    showedForgotBtn = true;
}
}