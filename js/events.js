var config = {
  apiKey: "AIzaSyDfiBzLoNU4t5q_hOdcFjg-RGKNFnZ5wxg",
  authDomain: "berks-technology-club-admin.firebaseapp.com",
  databaseURL: "https://berks-technology-club-admin.firebaseio.com",
  projectId: "berks-technology-club-admin",
  storageBucket: "berks-technology-club-admin.appspot.com",
  messagingSenderId: "203643757535"
};
firebase.initializeApp(config);

// global variable for referencing the database
var db = firebase.firestore();
// global variable for referencing storage
var storage = firebase.storage();
var storageRef = storage.ref();

// add a card for each event in the db
function getEvents() {
    db.collection('events').onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        var name = change.doc.data().name;
        var desc = change.doc.data().desc;
        var imageUrl = change.doc.data().imageUrl;
        var eventID = change.doc.id;
        if (change.type == "added") {
          console.log('Event card added');
          // @TODO update this mobile version
          document.getElementById('event_cards_mobile').innerHTML += '\
            <div class="card" id="mevent_'+eventID+'">\
                <div class="card-image">\
                  <img src='+imageUrl+'>\
                  <span class="card-title">'+name+'</span>\
                </div>\
                <div class="card-content">\
                  <p>'+desc+'</p>\
                </div>\
                <div class="card-action">\
                <a class="red-text" onclick="deleteEvent(\''+eventID+'\', \''+name+'\', \''+desc+'\');">Delete</a>\
                <a class="green-text" onclick="editEvent(\''+eventID+'\', \''+name+'\', \''+desc+'\', \''+imageUrl+'\');">Edit</a>\
                </div>\
              </div>\
          ';

            document.getElementById('event_cards_desktop').innerHTML += '\
            <div class="card medium horizontal pwhite" id="devent_'+eventID+'">\
              <div class="card-image">\
                <img src="'+imageUrl+'">\
              </div>\
              <div class="card-stacked">\
                <div class="card-content">\
                    <h2 class="header">'+name+'</h2>\
                    <p>'+desc+'</p>\
                </div>\
                <div class="card-action blue-text">\
                <a class="red-text" onclick="deleteEvent(\''+eventID+'\', \''+name+'\', \''+desc+'\');">Delete</a>\
                <a class="green-text" onclick="editEvent(\''+eventID+'\', \''+name+'\', \''+desc+'\', \''+imageUrl+'\');">Edit</a>\
              </div>\
              </div>\
          </div>\
                ';
        }
        if (change.type == "modified") {
          console.log('Event card modified');
          // desktop
          document.getElementById('devent_'+eventID).innerHTML = '\
          <div class="card medium horizontal pwhite" id="devent_'+eventID+'">\
            <div class="card-image">\
              <img src="'+imageUrl+'">\
            </div>\
            <div class="card-stacked">\
              <div class="card-content">\
                  <h2 class="header">'+name+'</h2>\
                  <p>'+desc+'</p>\
              </div>\
              <div class="card-action blue-text">\
              <a class="red-text" onclick="deleteEvent(\''+eventID+'\', \''+name+'\', \''+desc+'\');">Delete</a>\
              <a class="green-text" onclick="editEvent(\''+eventID+'\', \''+name+'\', \''+desc+'\', \''+imageUrl+'\');">Edit</a>\
            </div>\
            </div>\
        </div>\
              '
        }
        if (change.type == "removed") {
          console.log('Event card deleted');
          // desktop
          document.getElementById('devent_'+eventID).remove();
        }
      });
    });
}

// delete an event from the database
// called by the delete button under the event
function deleteEvent(eventID, name, desc) {
	$('#deleteEventConfirmName').text('Delete '+name+'?');
	$('#deleteEventConfirmDesc').text(desc);
	$('#deleteEventConfirmBtn').attr('onClick','deleteEventConfirm(\''+eventID+'\', \''+name+'\');');
	$('.modal').modal();
	$('#deleteItem').modal('open');
}

// called by deleteEvent()
function deleteEventConfirm(eventID, name) {
  db.collection("events").doc(eventID).delete().then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });

  // desktop
  document.getElementById('devent_'+eventID).remove();

  M.toast({html: 'Deleted: '+name}, 4000)
	$('#deleteItem').modal('close');
	$('.tooltipped').tooltip({delay: 50});
}

// edit an event in the database
// called by the edit button under the event card
function editEvent(eventID, name, desc, imageUrl) {

  document.getElementById("editEventName").value = name;
	document.getElementById("editEventDesc").value = desc;
  document.getElementById("editEventImageUrl").value = imageUrl;
  
  $('#editEventConfirmBtn').attr('onClick', 'editEventFinal(\''+ eventID + '\');');
  M.updateTextFields();
  $('#editEvent').modal('open');

}

// called by editEvent()
function editEventFinal(eventID) {
  var d = db.collection("events").doc(eventID);

  eventName = document.getElementById("editEventName").value;
  eventDesc = document.getElementById("editEventDesc").value;
  eventImageUrl = document.getElementById("editEventImageUrl").value;
  d.update({
    name: eventName,
    desc: eventDesc,
    imageUrl: eventImageUrl
  });

  document.getElementById('devent_'+eventID).innerHTML = '\
  <div class="card medium horizontal pwhite" id="devent_'+eventID+'">\
    <div class="card-image">\
      <img src="'+eventImageUrl+'">\
    </div>\
    <div class="card-stacked">\
      <div class="card-content">\
          <h2 class="header">'+eventName+'</h2>\
          <p>'+eventDesc+'</p>\
      </div>\
      <div class="card-action blue-text">\
      <a class="red-text" onclick="deleteEvent(\''+eventID+'\', \''+eventName+'\', \''+eventDesc+'\');">Delete</a>\
      <a class="green-text" onclick="editEvent(\''+eventID+'\', \''+eventName+'\', \''+eventDesc+'\', \''+eventImageUrl+'\');">Edit</a>\
    </div>\
    </div>\
</div>\
      ';

  M.toast({html: eventName+' was changed.'}, 4000);
}

document.querySelector('.file-select').addEventListener('change', handleFileUploadChange);
document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);

let selectedFile;
function handleFileUploadChange(e) {
  selectedFile = e.target.files[0];
}

function handleFileUploadSubmit(e) {
  const uploadTask = storageRef.child(`images/events/${selectedFile.name}`).put(selectedFile); //create a child directory called images, and place the file inside this directory
  uploadTask.on('state_changed', (snapshot) => {
  // Observe state change events such as progress, pause, and resume
  }, (error) => {
    // Handle unsuccessful uploads
    console.log(error);
  }, () => {
     // Do something once upload is complete
     console.log('success');
  });
}



// add an event to the database
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

  M.toast({html: name+' was added.'}, 4000);
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

String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 

getEvents();