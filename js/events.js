//var e = JSON.parse(events);

var e = [
    {
        "title" : "Google Speaker",
        "description" : "google description",
        "picture" : "images/speaker.jpg",
        "moreinfo" : "more info about speaker"
    },
    {
        "title" : "Video Game Tounrament",
        "description" : "game description",
        "picture" : "images/vgames.jpg",
        "moreinfo" : "more info about video games"
    }
]

for (var i in e) {
    $carddiv = $('<div class="card medium horizontal pwhite" />');

    $cardimagediv = $('<div class="card-image" />');
    $cardimg = $('<img src=' + i.picture + '" />');
    $cardimagediv.append($cardimg);
    $carddiv.append($cardimagediv);

    $cardstackeddiv = $('<div class="card-stacked" />');

    $cardcontentdiv = $('<div class="card-content" />');
    $cardcontentdiv.append('<h2 class="header">' + i.title + '</h2>');
    $cardcontentdiv.append('<p>' + i.description + '</p>');
    $cardstackeddiv.append($cardcontentdiv);

    $cardactiondiv = $('<div class="card-action" />');
    $cardactionul = $('<ul class="collapsible">');
    $cardactionli = $('<li></li>');
    $cardactionli.append('<div class="collapsible-header"><i class="material-icons pblue-text">headset</i>More Info</>');
    $cardactionli.append('<div class="collapsible-body"><span>' + i.moreinfo + '</span></>');
    $cardactionul.append($cardactionli);
    $cardactiondiv.append($cardactionul);
    $cardstackeddiv.append($cardactiondiv);

    $carddiv.append($cardstackeddiv);
    //$("#events").append($carddiv);

    console.log('Adding event ' + i.name);
}

//$newdiv = $('<div class="ball" />').text(i);
//$('body').append($newdiv);