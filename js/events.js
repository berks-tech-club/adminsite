// firebase init
var config = {
    apiKey: "AIzaSyDfiBzLoNU4t5q_hOdcFjg-RGKNFnZ5wxg",
    authDomain: "berks-technology-club-admin.firebaseapp.com",
    databaseURL: "https://berks-technology-club-admin.firebaseio.com",
    projectId: "berks-technology-club-admin",
    storageBucket: "berks-technology-club-admin.appspot.com",
    messagingSenderId: "203643757535"
  };
  firebase.initializeApp(config);
  var db = firebase.firestore();
  var storageRef = firebase.storage().ref();

// image upload handler
// global image name var
var imageName = '';
document.querySelector('.file-select').addEventListener('change', handleFileUploadChange);
document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);

let selectedFile;
function handleFileUploadChange(e) {
  selectedFile = e.target.files[0];
  imageName = selectedFile.name;
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
    //var name =  symbolFix(document.getElementById('addEventName').value);
    var name =  document.getElementById('addEventName').value;
    //var desc =  symbolFix(document.getElementById('addEventDesc').value);
    var desc =  document.getElementById('addEventDesc').value;
    var iName = imageName;
    var imageRef = storageRef.child('images/events/'+ imageName);
    
    console.log(iName);
    db.collection("events").add({
      name: name,
      desc: desc,
      imageName: imageName
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
    $('#addItem').modal('close');
    $('.tooltipped').tooltip({delay: 50});
}

// edit an event in the database
function editEvent(eventID, name, desc, imageName) {

    document.getElementById("editEventName").value = name;
    document.getElementById("editEventDesc").value = desc;
    // need to set name of current image ---------------------------------------------------------
    
    $('#editEventConfirmBtn').attr('onClick', 'editEventFinal(\''+ eventID + '\');');
    M.updateTextFields();
    $('#editEvent').modal('open');
  
  }
  
// called by editEvent()
function editEventFinal(eventID) {
var d = db.collection("events").doc(eventID);

eventName = document.getElementById("editEventName").value;
eventDesc = document.getElementById("editEventDesc").value;
eventImageRef = storageRef.child('images/events/' + imageName);
d.update({
    name: eventName,
    desc: eventDesc,
    imageName: imageName
});

M.toast({html: eventName+' was changed.'}, 4000);
}

// delete an event from the database
function deleteEvent(eventID, name, desc, iName) {
	$('#deleteEventConfirmName').text('Delete '+name+'?');
	$('#deleteEventConfirmDesc').text(desc);
	$('#deleteEventConfirmBtn').attr('onClick','deleteEventConfirm(\''+eventID+'\', \''+name+'\', \''+iName+'\');');
	$('.modal').modal();
	$('#deleteItem').modal('open');
}

// called by deleteEvent()
function deleteEventConfirm(eventID, name, iName) {
    var imageRef = storageRef.child('images\/events\/'+ iName);
    // Delete the image
    imageRef.delete().then(function() {
        // File deleted successfully
    }).catch(function(error) {
        // Uh-oh, an error occurred!
    });
  db.collection("events").doc(eventID).delete().then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });

  M.toast({html: 'Deleted: '+name}, 4000)
	$('#deleteItem').modal('close');
	$('.tooltipped').tooltip({delay: 50});
}

// add a card for each event in the db
function getEvents() {
    db.collection('events').onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        var name = change.doc.data().name;
        var desc = change.doc.data().desc;
        var imageName = change.doc.data().imageName;
        var imageUrl = '';
        var imageRef = storageRef.child('images/events/'+ imageName);
        imageRef.getDownloadURL().then(function(url) {
            imageUrl = url;
            console.log('booty');
        });
        var eventID = change.doc.id;
        console.log(imageName);
        console.log(imageRef);
        console.log(imageUrl);
        if (change.type == "added") {
          console.log('Event card added');
          // @TODO update this mobile version -----------------------------------------------------------
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
                <a class="red-text" onclick="deleteEvent(\''+eventID+'\', \''+name+'\', \''+desc+'\', \''+imageName+'\');">Delete</a>\
                <a class="green-text" onclick="editEvent(\''+eventID+'\', \''+name+'\', \''+desc+'\', \''+imageName+'\');">Edit</a>\
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
                <a class="red-text" onclick="deleteEvent(\''+eventID+'\', \''+name+'\', \''+desc+'\', \''+imageName+'\');">Delete</a>\
                <a class="green-text" onclick="editEvent(\''+eventID+'\', \''+name+'\', \''+desc+'\', \''+imageName+'\');">Edit</a>\
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
              <a class="red-text" onclick="deleteEvent(\''+eventID+'\', \''+name+'\', \''+desc+'\', \''+imageName+'\');">Delete</a>\
              <a class="green-text" onclick="editEvent(\''+eventID+'\', \''+name+'\', \''+desc+'\', \''+imageName+'\');">Edit</a>\
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

// helper functions
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