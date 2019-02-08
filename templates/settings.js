var MyApp = {}; // Globally scoped object

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
		
	//sign out user
	$('#btnLogout').click(function(){ 
		firebase.auth().signOut();
		window.location.href = "/login.html";
	});
	$('#btnLogoutMobile').click(function(){ 
		firebase.auth().signOut();
		window.location.href = "/login.html";
	});
		
	firebase.auth().onAuthStateChanged(firebaseUser =>{
		if(firebaseUser){
			//console.log(firebaseUser);
			MyApp.userUID = firebaseUser.uid;
			getUserInfo();
		} else {
			//console.log("not logged in");
			window.location.href = "/login.html";
		}
	});
}());


function getUserInfo() {
	var user = firebase.auth().currentUser;
	const rootRef = firebase.database().ref();
	
	const query = rootRef.child('users/' + user.uid);
	query.on('value', function(data) {
		$('#UserName').text(data.val().name);
		$('.letter').text(data.val().name.charAt(0).toUpperCase());
		$('#textBrightness').val(data.val().textBrightness);
        var colorOutput = color[''+data.val().colorBase+''].hex;
        if(data.val().colorShade != 'default'){
            colorOutput = color[''+data.val().colorBase+''].shade[''+data.val().colorShade+''].hex
        }
        //console.log(color[''+data.val().colorBase+''].shade[''+data.val().colorShade+''])
		$(".letter").css("background-color", '#'+colorOutput);
		$(".letter").css("color", '#'+d2h(data.val().textBrightness)+d2h(data.val().textBrightness)+d2h(data.val().textBrightness));
		$("#full_name").val(data.val().name);
		
// 		colors = ["f44336", "e91e63", "9c27b0", "673ab7", "3f51b5", "2196f3", "03a9f4", "00bcd4", "009688", "4caf50", "8bc34a", "cddc39", "ffeb3b", "ffc107", "ff9800", "ff5722", "795548", "9e9e9e", "607d8b", "000000"];
// 		colorsCode = ["red", "pink", "purple", "deep_purple", "indigo", "blue", "light_blue", "cyan", "teal", "green", "light_green", "lime", "yellow", "amber", "orange", "deep_orange", "brown", "grey", "blue_grey", "black"];
// 		colorsNames = ["Red", "Pink", "Purple", "Deep Purple", "Indigo", "Blue", "Light Blue", "Cyan", "Teal", "Green", "Light Green", "Lime", "Yellow", "Amber", "Orange", "Deep Orange", "Brown", "Grey", "Blue Grey", "Black"];
		
		colorBaseOutput = '';
        countBase = 0
        jQuery.each(color, function() {
            if(data.val().colorBase==Object.keys(color)[countBase]){
				colorBaseOutput += "<option value='" + Object.keys(color)[countBase] + "' data-icon='https://dummyimage.com/50x50/" + this.hex + "/" + this.hex + ".png' class='left circle' selected>" + this.name + "</option>";
			} else {
				colorBaseOutput += "<option value='" + Object.keys(color)[countBase] + "' data-icon='https://dummyimage.com/50x50/" + this.hex + "/" + this.hex + ".png' class='left circle'>" + this.name + "</option>";
			}
            countBase++;
        });
        
        colorShadeOutput = '<option value="default" data-icon="https://dummyimage.com/50x50/' + color[''+data.val().colorBase+''].hex + '/' + color[''+data.val().colorBase+''].hex + '.png" class="left circle" selected>Default</option>';
        countShade = 0
        jQuery.each(color[''+data.val().colorBase+''].shade, function() {
            //console.log(Object.keys(color.Red.shade)[countShade])
            if(data.val().colorShade==Object.keys(color[''+data.val().colorBase+''].shade)[countShade]){
				colorShadeOutput += "<option value='" + Object.keys(color.Red.shade)[countShade] + "' data-icon='https://dummyimage.com/50x50/" + this.hex + "/" + this.hex + ".png' class='left circle' selected>" + this.name + "</option>";
			} else {
				colorShadeOutput += "<option value='" + Object.keys(color.Red.shade)[countShade] + "' data-icon='https://dummyimage.com/50x50/" + this.hex + "/" + this.hex + ".png' class='left circle'>" + this.name + "</option>";
			}
            countShade++;
        });
        
// 		cLen = colors.length;
// 		for (i = 0; i < cLen; i++) {
// 			if(data.val().color==colors[i]){
// 				colorsOutput += "<option value='" + colors[i] + "' data-icon='https://dummyimage.com/50x50/" + colors[i] + "/" + colors[i] + ".png' class='left circle' selected>" + colorsNames[i] + "</option>";
// 			} else {
// 				colorsOutput += "<option value='" + colors[i] + "' data-icon='https://dummyimage.com/50x50/" + colors[i] + "/" + colors[i] + ".png' class='left circle'>" + colorsNames[i] + "</option>";
// 			}
// 		}
		$('#userColorBaseEdit').html(colorBaseOutput);
		$('#userColorShadeEdit').html(colorShadeOutput);
		
		
		Materialize.updateTextFields();
		$('select').material_select('update');
	});
}

function updateColorShadeSelect() {
        colorShadeOutput = '<option value="default" data-icon="https://dummyimage.com/50x50/' + color[''+document.getElementById("userColorBaseEdit").value+''].hex + '/' + color[''+document.getElementById("userColorBaseEdit").value+''].hex + '.png" class="left circle" selected>Default</option>';
        countShade = 0
        jQuery.each(color[''+document.getElementById("userColorBaseEdit").value+''].shade, function() {
            if(document.getElementById("userColorShadeEdit").value==Object.keys(color[''+document.getElementById("userColorBaseEdit").value+''].shade)[countShade]){
				colorShadeOutput += "<option value='" + Object.keys(color.Red.shade)[countShade] + "' data-icon='https://dummyimage.com/50x50/" + this.hex + "/" + this.hex + ".png' class='left circle' selected>" + this.name + "</option>";
			} else {
				colorShadeOutput += "<option value='" + Object.keys(color.Red.shade)[countShade] + "' data-icon='https://dummyimage.com/50x50/" + this.hex + "/" + this.hex + ".png' class='left circle'>" + this.name + "</option>";
			}
            countShade++;
        });
        $('#userColorShadeEdit').html(colorShadeOutput);
		$('select').material_select();
}

function textBrightnessChange(brightnessValue) {
    $(".letter").css("color", '#'+d2h(brightnessValue)+d2h(brightnessValue)+d2h(brightnessValue));
}

function saveUserInfo() {
	var user = firebase.auth().currentUser;
	const editUserName = document.getElementById("full_name").value;
	const editUserColorBase = document.getElementById("userColorBaseEdit").value;
	const editUserColorShade = document.getElementById("userColorShadeEdit").value;
	const editUserTextBrightness = document.getElementById("textBrightness").value;
		
	if (editUserName==""){
		Materialize.toast('Please enter your full name', 4500)
	} else if (editUserName.length<3){
		Materialize.toast('Name is to short', 4000)
	} else {
		var postData = {
			name: editUserName,
			colorBase: editUserColorBase,
			colorShade: editUserColorShade,
            textBrightness: editUserTextBrightness
		};
		firebase.database().ref().child('users/'+user.uid+'/').update(postData);
		Materialize.toast('Information Updated.', 4000)
	}
}
function changeUserPass() {
	const changedPassword = document.getElementById("password").value;
	const changedPasswordConfirm = document.getElementById("passwordConfirm").value;
	
	if(changedPassword!=changedPasswordConfirm){
		Materialize.toast("Passwords don't match.", 4000)
		$('#passwordConfirm').val("");
		$('#password').val("");
	} else {
		var user = firebase.auth().currentUser;
		user.updatePassword(changedPassword).then(function() {
			Materialize.toast('Passord changed successfully!', 4000)
			$('#passwordConfirm').val("");
			$('#password').val("");
		}).catch(function(error) {
			Materialize.toast(error.message, 7000)
			$('#passwordConfirm').val("");
			$('#password').val("");
		});
	}
}
function changeUserEmail() {
	const currentEmail = document.getElementById("currentEmail").value;
	const newEmail = document.getElementById("newEmail").value;
	const passwordConfirmEmail = document.getElementById("passwordConfirmEmail").value;
	
	firebase.auth().signInWithEmailAndPassword(currentEmail, passwordConfirmEmail).then(function(user) {
        user.updateEmail(newEmail)
		Materialize.toast("Email changed successfully!", 7000)
		$('#currentEmail').val("");
		$('#newEmail').val("");
		$('#passwordConfirmEmail').val("");
		location.reload();
    }).catch(function(error) {
		if(error.code=="auth/wrong-password"){
			Materialize.toast("Wrong password.", 4000)
		} else if(error.code=="auth/user-not-found"){
			Materialize.toast("Wrong email.", 4000)
		} else if(error.code=="auth/invalid-email") {
			Materialize.toast("New email invalid.", 4000)
		} else {
			Materialize.toast(error.message, 4000)
		}
	});
}