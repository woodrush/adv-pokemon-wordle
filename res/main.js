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

function update_box_row_text(s) {
    for(let i=0; i<5; i++){
        const box = document.getElementById("box-" + currow + "-" + i);
        if (s[i]) {
            box.innerHTML = "<b class='box-text-input' id='box-text-" + currow + "-" + i + "'>" + s[i] + "</b>";
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
    } else if (key == "enter") {
        if (is_pokemon(str)) {
            update_box_row_color(["green", "yellow", "grey", "grey", "yellow"]);
            add_box_row();
        }
        return;
    } else if (curcol > 4) {
        return;
    } else {
        str = str + key;
        curcol += 1;
    }
    update_box_row_text(str);
}

function update_box_row_color(colors) {
    for(let i=0; i<5; i++){
        const box = document.getElementById("box-" + currow + "-" + i);
        box.classList.remove("box-empty");
        box.classList.add("box-" + colors[i]);
        const box_text = document.getElementById("box-text-" + currow + "-" + i);
        if (box_text) {
            box_text.classList.remove("box-text-input");
            box_text.classList.add("box-text-output");
        }
    }
}

function add_box_row() {
    let board = document.getElementById("board");
    let tr = document.createElement("tr");
    currow += 1;
    curcol = 0;
    str = "";
    for(let i=0; i<5; i++){
        let td = document.createElement("td");
        td.setAttribute("id", "box-" + currow + "-" + i);
        td.setAttribute("class", "box-base box-empty");
        tr.appendChild(td);
    }
    board.appendChild(tr);
}

function is_pokemon(name) {
    let str_5 = (str + "     ").slice(0,5);
    return pokedex.includes(str_5);
}
