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

	var title = document.getElementById('title');
	var dbtitle = firebase.database().ref().child('title');
	
	//get elements
	const nameField = document.getElementById('name');
	const emailField = document.getElementById('email');
	const passwordField = document.getElementById('password');
	const btnSignUp = document.getElementById('btnSignUp');
	
	//sign up user
	btnSignUp.addEventListener('click', e => {
		signup();
	});
	
	nameField.addEventListener('keypress', function (e) {
		console.log("eneter");
		var key = e.which || e.keyCode;
		if (key === 13) { // 13 is enter
			signup();
	    }
	});
	emailField.addEventListener('keypress', function (e) {
		console.log("eneter");
		var key = e.which || e.keyCode;
		if (key === 13) { // 13 is enter
			signup();
	    }
	});
	passwordField.addEventListener('keypress', function (e) {
		console.log("eneter");
		var key = e.which || e.keyCode;
		if (key === 13) { // 13 is enter
			signup();
	    }
	});
	
	function signup(){
		const name = nameField.value;
		const email = emailField.value;
		const pass = passwordField.value;

        var colors = [ ];
        var countBase = 0
        jQuery.each(color, function() {
            if (Object.keys(color)[countBase]!='Black'){
                colors.push(Object.keys(color)[countBase]);
            }
            countBase++;
        });
        const randColor = colors[Math.floor(Math.random() * colors.length)];
        
		var validEmail = validateEmail(email);
		
		if (validEmail==false) {
			Materialize.toast('Invalid Email.', 4000)
		} else {
			if (name == "" || email == "" || pass == "") {
				Materialize.toast('Enter ALL Details.', 4000)
			} else {
				//sign in
				firebase.auth().createUserWithEmailAndPassword(email, pass)
				.then(function(user){
				  console.log('uid',user.uid)
					firebase.database().ref('users/' + user.uid).set({
						user: email,
						name: name,
						colorBase: randColor,
                        colorShade: 'default',
                        textBrightness: 255
					  });
				  //Here if you want you can sign in the user
				}).catch(function(error) {
					Materialize.toast(error.message, 4000)
				});
			}
		}
	}
	

	//if logged in
	firebase.auth().onAuthStateChanged(firebaseUser =>{
		if(firebaseUser){
			console.log(firebaseUser);
			window.location.href = "gift";
		} else {
			console.log("not logged in");
		}
	})
	
}());

function validateEmail(email) {
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
        return false;
    }
}