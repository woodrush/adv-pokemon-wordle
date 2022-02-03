var currow = 0;
var curcol = 0;
var str = "";

var keystate = {
    "shou": false,
    "daku": false,
    "handaku": false
};

function onClickKey(key_dom) {
    const keychar = key_dom.getAttribute("key");
    console.log(keychar);
    typekey(keychar);
}

function showbox(s) {
    for(let i=0; i<5; i++){
        const box = document.getElementById("box-" + currow + "-" + i);
        if (s[i]) {
            box.innerHTML = s[i];
        } else {
            box.innerHTML = "";
        }
    }
}

function toggle_keystate(key) {
    keystate["shou"] = false;
    keystate["daku"] = false;
    keystate["handaku"] = false;
    document.getElementById("key-shou").classList.remove("key-on");
    document.getElementById("key-daku").classList.remove("key-on");
    document.getElementById("key-handaku").classList.remove("key-on");

    keystate[key] = true;
    document.getElementById("key-"+key).classList.toggle("key-on");
}

function typekey(key) {
    if (key == "bs") {
        if (curcol > 0) {
            str = str.slice(0,curcol-1);
            curcol -= 1;
        }
    } else if (key == "shou" || key == "daku" || key == "handaku") {
        toggle_keystate(key);
    } else if (curcol > 4) {
        return;
    } else {
        str = str + key;
        curcol += 1;
    }
    showbox(str);
}
