var currow = 0;
var curcol = 0;
var str = "";
var curkeyboard = 0;

function toggleKeyboard() {
    const keyboard_0 = document.getElementById("keyboard-0");
    const keyboard_1 = document.getElementById("keyboard-1");
    if (curkeyboard == 0) {
        keyboard_0.style.display = "none";
        keyboard_1.style.display = "block";
        curkeyboard = 1;
    } else {
        keyboard_0.style.display = "block";
        keyboard_1.style.display = "none";
        curkeyboard = 0;
    }
}

function onClickKey(key_dom) {
    const keychar = key_dom.getAttribute("key");
    console.log(keychar);
    typekey(keychar);
}

function showbox(s) {
    for(let i=0; i<5; i++){
        const box = document.getElementById("box-" + currow + "-" + i);
        if (s[i]) {
            box.innerHTML = "<b>" + s[i] + "</b>";
        } else {
            box.innerHTML = "";
        }
    }
}

function typekey(key) {
    if (key == "bs") {
        if (curcol > 0) {
            str = str.slice(0,curcol-1);
            curcol -= 1;
        }
    } else if (curcol > 4) {
        return;
    } else {
        str = str + key;
        curcol += 1;
    }
    showbox(str);
}
