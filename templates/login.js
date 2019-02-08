(function() {
	// Initialize Firebase
	var config = {
	  apiKey: "AIzaSyBsI0kZhT2_47LHhL0q5oPQUPG-TOc01hY",
	  authDomain: "gift-group.firebaseapp.com",
	  databaseURL: "https://gift-group.firebaseio.com",
	  storageBucket: "gift-group.appspot.com",
	  messagingSenderId: "809768496750"
	};
	firebase.initializeApp(config);
	
	//get elements
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
	
	//if logged in
	firebase.auth().onAuthStateChanged(firebaseUser =>{
		if(firebaseUser){
			console.log(firebaseUser);
            if(firebaseUser.uid == 'mwr3iSPv7eOZb3FEaBwETVMU1Um1'){
			    window.location.href = "admin";
            } else {
    			window.location.href = "gift";
            }
		} else {
			console.log("not logged in");
		}
	})
}());

var showedForgotBtn = false;
function errors(errorMessage){
	Materialize.toast(errorMessage.message, 4000)
    if(!showedForgotBtn){
        $("#loginActions").append('<br><br><a href="forgot.html" class="waves-effect waves-light btn red lighten-1">Forgot Password</a>');
        showedForgotBtn = true;
    }
}