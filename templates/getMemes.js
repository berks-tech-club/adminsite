// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();

var startAfterVal;
var sortByValue;
var sortDirection;
var sortVal;
var startAfterVal;

var lastVisible;
var firstOnLastPage = [];
var startAfter;
var currentPage = 1;
start();

$(window).on('hashchange', function() {
    openOnLoad();
});
jQuery(window).load(function() {
    openOnLoad();
});

function openOnLoad() {
    if (window.location.hash.substr(1)=="") {
        $("#memeView").hide();
        $("#memeSection").show();
        $("#memeContainer").html("");
        $("#memeTitle").html("");
        $("#ProfileImg").attr("src", "loadingIcon.gif");
        $("#ownerDisplayName").html("");
        $("#memeEdit").html("");
        document.title = 'Memes';
    } else {
        activateMeme(window.location.hash.substr(1));
        $("#memeContainer").html("");
        $("#memeTitle").html("");
        $("#ProfileImg").attr("src", "loadingIcon.gif");
        $("#ownerDisplayName").html("");
        $("#memeEdit").html("");
        $("#memeView").show();
        $("#memeSection").hide();
    }
}

function start() {
    // sort by value
    sortByValue = "timeStamp";
    sortDirection = "desc";
    sortVal = getParameterByName('sort');
    startAfterVal = getParameterByName('startAfter');
    if (sortVal == "Views") {
        sortByValue = "views"
        sortDirection = "desc"

    } else if (sortVal == "Newest") {
        sortByValue = "timeStamp"
        sortDirection = "desc"

    } else if (sortVal == "Oldest") {
        sortByValue = "timeStamp"
        sortDirection = "asc"

    } else if (sortVal == "Title") {
        sortByValue = "titleSort"
        sortDirection = "asc"
    }
    firstLoad();
}
function firstLoad() {
    currentPage = 1;
    processPageDisplay();
    $(".memeList").html("");
    firebase.firestore().collection("memes").orderBy(sortByValue, sortDirection).limit(16).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            //console.log(doc.id, " => ", doc.data().title);
            if (doc.data().fileType == "video") { var icon = "videocam"; } else { var icon = "image"; }
            if (doc.data().views == null) { var views = 0; } else { var views = doc.data().views; }
            var date = doc.data().timeStamp;
            addCard(doc.id, doc.data().title, doc.data().thumbnailUrl, icon, views, date, doc.data().owner)
        });
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        firstOnLastPage[currentPage] = querySnapshot.docs[0];
        checkForNextPage(lastVisible);
    });
}
function checkForNextPage(lastVisible) {
    var next = firebase.firestore().collection("memes").orderBy(sortByValue, sortDirection).startAfter(lastVisible).limit(1);
    next.get().then(function (querySnapshot) {
        if (querySnapshot.empty) {
            $("#pageForward").addClass("disabled");
            $("#pageForward").removeClass("waves-effect");
            $("#pageForwardAction").attr('onclick', '');
        }
        querySnapshot.forEach(function (doc) {
            $("#pageForward").removeClass("disabled");
            $("#pageForward").addClass("waves-effect");
            $("#pageForwardAction").attr('onclick', 'nextPage()');
            startAfter = lastVisible;
        });
        $('.memesLoading').css("display", "none");
    });
}
function nextPage() {
    currentPage++;
    processPageDisplay();
    $('.memesLoading').css("display", "block");
    $('.pageDirections').css("display", "none");
    $(".memeList").html("");
    firebase.firestore().collection("memes").orderBy(sortByValue, sortDirection).startAfter(startAfter).limit(16).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (doc.data().fileType == "video") { var icon = "videocam"; } else { var icon = "image"; }
            if (doc.data().views == null) { var views = 0; } else { var views = doc.data().views; }
            var date = doc.data().timeStamp;
            addCard(doc.id, doc.data().title, doc.data().thumbnailUrl, icon, views, date, doc.data().owner)
        });
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        firstOnLastPage[currentPage] = querySnapshot.docs[0];
        checkForNextPage(lastVisible);
    });
}

function prevPage() {
    currentPage--;
    processPageDisplay();
    $('.memesLoading').css("display", "block");
    $('.pageDirections').css("display", "none");
    $(".memeList").html("");
    firebase.firestore().collection("memes").orderBy(sortByValue, sortDirection).startAt(firstOnLastPage[currentPage]).limit(16).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if (doc.data().fileType == "video") { var icon = "videocam"; } else { var icon = "image"; }
            if (doc.data().views == null) { var views = 0; } else { var views = doc.data().views; }
            var date = doc.data().timeStamp;
            addCard(doc.id, doc.data().title, doc.data().thumbnailUrl, icon, views, date, doc.data().owner)
        });
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        checkForNextPage(lastVisible);
    });
}

function processPageDisplay() {
    if (currentPage == 1) {
        $("#pageBackwardAction").attr('onclick', '');
    } else if (currentPage == 2) {
        $("#pageBackwardAction").attr('onclick', 'firstLoad();');
    } else {
        $("#pageBackwardAction").attr('onclick', 'prevPage();');
    }
    if (currentPage <= 1) {
        $("#pageBackward").addClass("disabled");
        $("#pageBackward").removeClass("waves-effect");
    } else {
        $("#pageBackward").removeClass("disabled");
        $("#pageBackward").addClass("waves-effect");
    }
}

function addCard(id, title, thumbnail, icon, views, date, owner) {
    $('.pageDirections').css("display", "block");
    $(".memeList").append('<div class="col s12 m6 l3">\
            <a href="#'+ id + '">\
            <div class="card hoverable">\
            <div style="height: 200px; background-color: black;" class="card-image valign-wrapper">\
                <img style="height: 100%;text-align: center;object-fit: cover;" id="memeThumbnail" src="'+ thumbnail + '">\
                <span class="btn-floating halfway-fab grey"><i class="material-icons">'+ icon + '</i></span>\
            </div>\
            <div class="card-action" style="height: 82px;">\
            <div class="black-text truncate">'+ title + '</div>\
                <div class="grey-text truncate" id="memeOwner_'+id+'_'+owner+'"><script>getMemeOwner(\'memeOwner_'+id+'_'+owner+'\')</script></div>\
                <div class="grey-text truncate">'+ views + ' views &#8231; ' + moment.unix(date).fromNow() + '</div>\
            </div>\
            </div>\
            </a>\
        </div>');
}

function getMemeOwner(memeID){
    firebase.database().ref('/users/' + memeID.split("_").pop()).once('value').then(function (snapshot) {
        ownerUid = snapshot.val().displayName;
        $("#"+memeID).html(ownerUid);
    });
}

// url varable
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}