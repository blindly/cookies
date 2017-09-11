name = prompt("Enter Name");

console.log("Hi "+ name);

let cookies = 0;
let cursors = 0;
let lastActive;
let rev;

var db = new PouchDB('cookies');
var remoteCouch = false;

/*
var savegame = JSON.parse(localStorage.getItem("save"));

if (typeof savegame.cookies !== "undefined") cookies = savegame.cookies;
if (typeof savegame.cursors !== "undefined") cursors = savegame.cursors;
if (typeof savegame.lastActive !== "undefined") lastActive = savegame.lastActive;
*/

var save = {
    cookies: cookies,
    cursors: cursors,
    lastActive: lastActive
}

let cursorCost = Math.floor(10 * Math.pow(1.1, cursors));

document.getElementById("cookies").innerHTML = cookies;
document.getElementById("cursors").innerHTML = cursors;
document.getElementById("cursorCost").innerHTML = cursorCost;

getSave();

function getSave(id) {
    db.allDocs({ include_docs: true, descending: true }, function (err, doc) {
        console.log("I get jar!");
        docs = doc.rows;

        console.log(docs)

        docs.forEach(function (row) {
            console.log("found one");
            console.log(row);
            if ( row._id === id ) {
                savegame = row.doc.save;

                rev = row.doc._rev;

                console.log("Bingo");
                console.log(savegame);

                if (typeof savegame.cookies !== "undefined") cookies = savegame.cookies;
                if (typeof savegame.cursors !== "undefined") cursors = savegame.cursors;
                if (typeof savegame.lastActive !== "undefined") lastActive = savegame.lastActive;

                var cursorCost = Math.floor(10 * Math.pow(1.1, cursors));
            }
        });

    });
}

function doSave(id, save) {
    var jar = {
        _id: id,
        save: save,
    };
    db.put(jar, function callback(err, result) {
        if (!err) {
            console.log('Successfully posted a jar!');
        }
    });
}

function doUpdate(id, save, rev) {
    db.put({
        _id: id,
        save: save,
        _rev: rev,
    });

    db.changes().on('change', function () {
        console.log('Ch-Ch-Changes');
    });
}

function cookieClick(number) {
    console.log("I have some " + cookies);
    cookies = cookies + number;
    document.getElementById("cookies").innerHTML = cookies;

    console.log("I have " + cookies);
};


function buyCursor() {
    var cursorCost = Math.floor(10 * Math.pow(1.1, cursors));     //works out the cost of this cursor
    if (cookies >= cursorCost) {                                   //checks that the player can afford the cursor
        cursors = cursors + 1;                                   //increases number of cursors
        cookies = cookies - cursorCost;                          //removes the cookies spent
        document.getElementById('cursors').innerHTML = cursors;  //updates the number of cursors for the user
        document.getElementById('cookies').innerHTML = cookies;  //updates the number of cookies for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.1, cursors));       //works out the cost of the next cursor
    document.getElementById('cursorCost').innerHTML = nextCost;  //updates the cursor cost for the user
};

window.setInterval(function () {

    console.log(save);

    save = {
        cookies: cookies,
        cursors: cursors,
        lastActive: lastActive
    }

    lastActive = Date.now();

    //console.log(lastActive);

    cookieClick(cursors);
}, 1000);

window.setInterval(function () {


    save = {
        cookies: cookies,
        cursors: cursors
    }

    console.log("I save now");

    // localStorage.setItem("save", JSON.stringify(save));


    doUpdate(name, save, rev);

}, 5000);