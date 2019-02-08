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
			get_list(firebaseUser.uid);
		} else {
			//console.log("not logged in");
			window.location.href = "/login.html";
		}
	});
}());

function get_list() {
	
	const rootRef = firebase.database().ref();
	const query = rootRef.child('items').child(MyApp.userUID);

	query.on('child_added', function(data) {
// 		document.getElementById('items_table').innerHTML += '<tr id="item_'+data.key+'">\
// 		<td><a onclick="deleteItem(\''+data.key+'\', \''+symbolRev(data.val().item_name)+'\', \''+symbolRev(data.val().item_desc)+'\');" class="btn-floating waves-effect waves-light red"><i class="material-icons right tooltipped" data-position="right" data-delay="50" data-tooltip="Delete">delete</i></a></td>\
// 		<td class="mdl-data-table__cell--non-numeric">'+symbolFix(data.val().item_name)+'</td>\
// 		<td>'+symbolFix(data.val().item_desc)+'</td>\
// 		<td><a target="_blank" href="'+symbolFix(data.val().item_link)+'">'+extractDomain(data.val().item_link)+'</a></td>\
// 		<td><a onclick="editItem(\''+data.key+'\', \''+symbolRev(data.val().item_name)+'\', \''+symbolRev(data.val().item_desc)+'\', \''+symbolRev(data.val().item_link)+'\');" class="btn-floating waves-effect waves-light green tooltipped" data-position="left" data-delay="50" data-tooltip="Edit"><i class="material-icons right">edit</i></a></td>\
// 		</tr>';
// 		$('.tooltipped').tooltip({delay: 50});
		
		var link = "";
		if(extractDomain(data.val().item_link).length>0){
		    link = '<a class="blue-text" target="_blank" href="'+symbolFix(data.val().item_link)+'">'+extractDomain(data.val().item_link)+'</a>';
		}
		
		//item_cards
		document.getElementById('item_cards').innerHTML += '\
		<div id="item_'+data.key+'" class="col s12">\
          <div class="card">\
            <div class="card-content">\
              <span class="card-title"><b>'+symbolFix(data.val().item_name)+'</b></span>\
              <p>'+symbolFix(data.val().item_desc)+'</p>\
            </div>\
            <div class="card-action blue-text">\
              <a class="red-text" onclick="deleteItem(\''+data.key+'\', \''+symbolRev(data.val().item_name)+'\', \''+symbolRev(data.val().item_desc)+'\', \''+data.val().takenbyID+'\');">Delete</a>\
              <a class="green-text" onclick="editItem(\''+data.key+'\', \''+symbolRev(data.val().item_name)+'\', \''+symbolRev(data.val().item_desc)+'\', \''+symbolRev(data.val().item_link)+'\');">Edit</a>\
              '+link+'\
            </div>\
          </div>\
        </div>';
		
	
	});
	query.on('child_changed', function(data) {
// 		document.getElementById('item_'+data.key).innerHTML = '<td><a onclick="deleteItem(\''+data.key+'\', \''+symbolRev(data.val().item_name)+'\', \''+symbolRev(data.val().item_desc)+'\');" class="btn-floating waves-effect waves-light red"><i class="material-icons right tooltipped" data-position="right" data-delay="50" data-tooltip="Delete">delete</i></a></td>\
// 		<td class="mdl-data-table__cell--non-numeric">'+symbolFix(data.val().item_name)+'</td>\
// 		<td>'+symbolFix(data.val().item_desc)+'</td>\
// 		<td><a target="_blank" href="'+symbolFix(data.val().item_link)+'">'+extractDomain(data.val().item_link)+'</a></td>\
// 		<td><a onclick="editItem(\''+data.key+'\', \''+symbolRev(data.val().item_name)+'\', \''+symbolRev(data.val().item_desc)+'\', \''+symbolRev(data.val().item_link)+'\');" class="btn-floating waves-effect waves-light green tooltipped" data-position="left" data-delay="50" data-tooltip="Edit"><i class="material-icons right">edit</i></a></td>';
// 		$('.tooltipped').tooltip({delay: 50});
		
		var link = "";
		if(extractDomain(data.val().item_link).length>0){
		    link = '<a class="blue-text" target="_blank" href="'+symbolFix(data.val().item_link)+'">'+extractDomain(data.val().item_link)+'</a>';
		}
		
		document.getElementById('item_'+data.key).innerHTML = '\
		<div class="card">\
            <div class="card-content">\
              <span class="card-title"><b>'+symbolFix(data.val().item_name)+'</b></span>\
              <p>'+symbolFix(data.val().item_desc)+'</p>\
            </div>\
            <div class="card-action blue-text">\
              <a class="red-text" onclick="deleteItem(\''+data.key+'\', \''+symbolRev(data.val().item_name)+'\', \''+symbolRev(data.val().item_desc)+'\', \''+data.val().takenbyID+'\');">Delete</a>\
              <a class="green-text" onclick="editItem(\''+data.key+'\', \''+symbolRev(data.val().item_name)+'\', \''+symbolRev(data.val().item_desc)+'\', \''+symbolRev(data.val().item_link)+'\');">Edit</a>\
              '+link+'\
            </div>\
          </div>';
	});
	query.on('child_removed', function(data) {
	  document.getElementById('item_'+data.key).remove();
	});
}
function addItem(){
	var item_name = symbolFix(document.getElementById('addItemName').value);
	var item_desc = symbolFix(document.getElementById('addItemDescription').value);
	var item_link = symbolFix(document.getElementById('addItemLink').value);

	if(item_link != ""){
		item_link = formatUrl(item_link);
	}

    var domain;
    if (item_link.indexOf("://") > -1) {
        domain = item_link.split('/')[2];
    }
    else {
        domain = item_link.split('/')[0];
    }
    //find & remove port number
    domain = domain.split(':')[0];
	
	if (item_name==""){
		Materialize.toast('Please enter a name.', 4000);
	} else {
		firebase.database().ref('items/'+MyApp.userUID).push().set({
			item_name: item_name,
			item_desc: item_desc,
			item_link: item_link,
			acquired: "no"
		});
		Materialize.toast(item_name+' was added to your list.', 4000);
		document.getElementById("addItemName").value = "";
		document.getElementById("addItemDescription").value = "";
		document.getElementById("addItemLink").value = "";
		$('#addItem').modal('close');
		$('.tooltipped').tooltip({delay: 50});
	}
}
function editItem(editID, editItemName, editItemDesc, editItemLink){
	document.getElementById("editItemName").value = symbolEditDelete(editItemName);
	document.getElementById("editItemDescription").value = symbolEditDelete(editItemDesc);
	document.getElementById("editItemLink").value = symbolEditDelete(editItemLink);
	$('#editItemConfirmBtn').attr('onClick','editItemFinal(\''+editID+'\');');
    Materialize.updateTextFields();
	$('#editItem').modal('open')
}
function editItemFinal(editID){
	editItemName = symbolFix(document.getElementById("editItemName").value);
	editItemDesc = symbolFix(document.getElementById("editItemDescription").value);
	editItemLink = symbolFix(document.getElementById("editItemLink").value);

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
function deleteItem(deleteID, item_name, item_desc, acquired){
	$('#deleteItemConfirmName').text('Delete '+symbolEditDelete(item_name)+'?');
	$('#deleteItemConfirmDesc').text(symbolEditDelete(item_desc));
	$('#deleteItemConfirmBtn').attr('onClick','deleteItemConfirm(\''+deleteID+'\', \''+item_name+'\', \''+acquired+'\');');
	$('.modal').modal();
	$('#deleteItem').modal('open');
}
function deleteItemConfirm(deleteID, item_name, acquired){
    if(acquired){
        var giftLocation = MyApp.userUID+'/'+deleteID
        var postShopping = {
            acquired: null,
            location: null,
        };
        firebase.database().ref().child('shoppinglist/'+acquired+'/'+deleteID+'/').update(postShopping);
    }
	firebase.database().ref('items/'+MyApp.userUID+'/'+deleteID).remove();
	Materialize.toast('Deleted: '+symbolEditDelete(item_name), 4000)
	$('#deleteItem').modal('close');
	$('.tooltipped').tooltip({delay: 50});
}
function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
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

function formatUrl(url){
    var httpString = 'http://'
        , httpsString = 'https://'
        ;

    if (url.substr(0, httpString.length) !== httpString && url.substr(0, httpsString.length) !== httpsString)
        url = httpString + url;

    return url;
}
