// https://www.lynda.com/React-Native-tutorials/React-Navigation-creating-navigator/645061/686606-4.html

var config = {
    apiKey: "AIzaSyDfiBzLoNU4t5q_hOdcFjg-RGKNFnZ5wxg",
    authDomain: "berks-technology-club-admin.firebaseapp.com",
    databaseURL: "https://berks-technology-club-admin.firebaseio.com",
    projectId: "berks-technology-club-admin",
    storageBucket: "berks-technology-club-admin.appspot.com",
    messagingSenderId: "203643757535"
};
firebase.initializeApp(config);

//var db = firebase.database();
var db = firebase.firestore();

/*  function addEvent(name, desc, imageUrl, moreInfo) {
    db.ref('events/' + app.userId).push().set({
      name: name,
      desc: desc,
      imageUrl: imageUrl,
      moreInfo: moreInfo
    });
  }
  */

  /*
function addEvent(name, desc, imageUrl, moreInfo) {
  db.collection("events").add({
    name: name,
    desc: desc,
    imageUrl: imageUrl,
    moreInfo: moreInfo
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}
*/

  /*db.collection("events").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});
*/

function getEvents() {
  db.collection("events")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var data = doc.data();
        var name = doc.data().name;
        var desc = doc.data().desc;
        var imageUrl = doc.data().imageUrl;
        var moreInfo = doc.data().moreInfo;

        document.getElementById('event_cards_mobile').innerHTML += '\
        <div class="card medium horizontal pwhite">\
                  <div class="card-image">\
                     <img src="'+imageUrl+'">\
                  </div>\
                  <div class="card-stacked">\
                     <div class="card-content">\
                        <h2 class="header">'+name+'</h2>\
                     </div>\
                     <div class="card-action pwhite">\
                        <ul class="collapsible">\
                           <li>\
                              <div class="collapsible-header"><i class="material-icons pblue-text">gamepad</i>More Info</div>\
                              <div class="collapsible-body"><span>'+desc+'</span></div>\
                           </li>\
                        </ul>\
                     </div>\
                  </div>\
               </div>\
        '

    document.getElementById('event_cards_desktop').innerHTML += '\
    <div class="card medium horizontal pwhite">\
      <div class="card-image">\
        <img src="'+imageUrl+'">\
      </div>\
      <div class="card-stacked">\
        <div class="card-content">\
            <h2 class="header">'+name+'</h2>\
            <p>'+desc+'</p>\
        </div>\
        <div class="card-action blue-text">\
        <a class="red-text" onclick="deleteEvent(\''+data.key+'\', \''+symbolRev(name)+'\', \''+symbolRev(desc)+'\', \''+doc.id+'\');">Delete</a>\
        <a class="green-text" onclick="editEvent(\''+data.key+'\', \''+symbolRev(name)+'\', \''+symbolRev(desc)+'\', \''+imageUrl+'\');">Edit</a>\
      </div>\
      </div>\
  </div>\
        '
      });
    })
}

getEvents();

function editEvent(editID, editItemName, editItemDesc, editItemLink){
	document.getElementById("editEventName").value = symbolEditDelete(editEventName);
	document.getElementById("editEventDesc").value = symbolEditDelete(editEventDesc);
	document.getElementById("editEventImageUrl").value = symbolEditDelete(editEventImageUrl);
	$('#editItemConfirmBtn').attr('onClick','editEventFinal(\''+editID+'\');');
    M.updateTextFields();
	$('#editItem').modal('open')
}

function editEventFinal(editID){
	editItemName = symbolFix(document.getElementById("editEventName").value);
	editItemDesc = symbolFix(document.getElementById("editEventDesc").value);
	editItemLink = symbolFix(document.getElementById("editEventImageUrl").value);

	if(editItemLink != ""){
		editItemLink = formatUrl(editItemLink);
	}
	
	var domain;
    if (editItemLink.indexOf("://") > -1) {
        domain = editItemLink.split('/')[2];
    }
    else {
        domain = editItemLink.split('/')[0];
    }
    //find & remove port number
    domain = domain.split(':')[0];
	
	if (editItemName==""){
		Materialize.toast('Please enter a name.', 4000);
	} else {
		var postData = {
			item_name: editItemName,
			item_desc: editItemDesc,
			item_link: editItemLink
		};
		firebase.database().ref().child('items/'+MyApp.userUID+'/'+editID+'').update(postData);
		Materialize.toast('Edited: '+editItemName, 4000);
		$('#editItem').modal('close')
		$('.tooltipped').tooltip({delay: 50});
	}
}

function addEvent() {
  var name =  symbolFix(document.getElementById('addEventName').value);
  var desc =  symbolFix(document.getElementById('addEventDesc').value);
  var imageUrl =  symbolFix(document.getElementById('addEventImageUrl').value);
  db.collection("events").add({
    name: name,
    desc: desc,
    imageUrl: imageUrl
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });

  M.toast(name+' was added.', 4000);
		document.getElementById("addEventName").value = "";
		document.getElementById("addEventDesc").value = "";
		document.getElementById("addEventImageUrl").value = "";
		$('#addItem').modal('close');
		$('.tooltipped').tooltip({delay: 50});
}

function symbolFix(variable){
	variable = variable.replaceAll("'", "&#39;");
	variable = variable.replaceAll('"', "&quot;");
	return variable;
}

function symbolRev(variable){
	variable = variable.replaceAll("&#39;", "-apostrophe-");
	variable = variable.replaceAll('&quot;', '-quotes-');
	return variable;
}

function symbolEditDelete(variable){
	variable = variable.replaceAll("-apostrophe-", "'");
	variable = variable.replaceAll('-quotes-', '"');
	return variable;
}
String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}