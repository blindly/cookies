let cookies = 0;
let cursors = 0;
let lastActive;

let savegame = null;

try {
    savegame = JSON.parse(localStorage.getItem("save"));
}
catch (error) {
    console.log(error);
}

try {
    if (typeof savegame.cookies !== "undefined") cookies = savegame.cookies;
    if (typeof savegame.cursors !== "undefined") cursors = savegame.cursors;
    if (typeof savegame.lastActive !== "undefined") lastActive = savegame.lastActive;
} 

catch (error) {
    console.log(error);
}

var save = {
    cookies: cookies,
    cursors: cursors,
    lastActive: lastActive
}

let cursorCost = Math.floor(10 * Math.pow(1.1, cursors));

document.getElementById("cookies").innerHTML = cookies;
document.getElementById("cursors").innerHTML = cursors;
document.getElementById("cursorCost").innerHTML = cursorCost;

function cookieClick(number) {
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

    console.log(lastActive);

    cookieClick(cursors);
}, 1000);

window.setInterval(function () {

    save = {
        cookies: cookies,
        cursors: cursors
    }

    console.log("I save now");

    localStorage.setItem("save", JSON.stringify(save));
}, 5000);