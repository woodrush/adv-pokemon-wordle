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
            let feedback_tuple = get_feedback(str, "アリアドス");
            let feedback = feedback_tuple[0];
            let feedback_keystate = feedback_tuple[1];
            console.log(feedback);
            update_box_row_color(feedback);
            add_box_row();

            update_keyboard_color(feedback_keystate);
        } else {
            window.alert(str + "は有効なポケモンの名前ではありません。");
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

function update_box_row_color(feedback) {
    for(let i=0; i<5; i++){
        const color = feedback[i];
        const box = document.getElementById("box-" + currow + "-" + i);
        box.classList.remove("box-empty");
        box.classList.add("box-" + color);
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
    let str_5 = (name + "     ").slice(0,5);
    return pokedex.includes(str_5);
}

function get_feedback(testword, hiddenword) {
    let state = [];
    for (let i=0; i<testword.length; i++) {
        if (testword[i] == hiddenword[i]) {
            state.push([1,1]);
        } else {
            state.push([testword[i], hiddenword[i]])
        }
    }
    cset_hidden = {};
    for (let i=0; i<hiddenword.length; i++) {
        const c = hiddenword[i];
        if (!cset_hidden[c]) {
            cset_hidden[c] = 0;
        }
        cset_hidden[c] += 1;
    }
    ret = "";
    ret_keydict = {};
    console.log(state);
    for (let i=0; i<state.length; i++) {
        let c_test = state[i][0];
        let c_hidden = state[i][1];
        if (c_test == c_hidden) {
            ret = ret + "G";
            ret_keydict[c_test] = "G";
        } else if (hiddenword.includes(c_test)) {
            if (cset_hidden[c_test] && cset_hidden[c_test] > 0) {
                ret = ret + "Y";
                ret_keydict[c_test] = "Y";
                cset_hidden[c_test] -= 1;
            } else {
                ret = ret + "B";
            }
        } else {
            ret = ret + "B";
            ret_keydict[c_test] = "B";
        }
    }
    return [ret, ret_keydict];
}

function update_keyboard_color(feedback_keystate) {
    let key = document.querySelectorAll('[key="'+"ア"+'"]')[0];
    key.classList.add("box-G");
}
