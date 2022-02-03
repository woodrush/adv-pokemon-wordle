var currow = 0;
var curcol = 0;
var str = "";
var curkeyboard = 0;
var current_pokedex = [];

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
            let feedback = get_feedback(str, "アリアドス");
            let feedback_keystate = feedback2keystate(str, feedback);
            console.log(feedback);
            console.log(feedback_keystate);
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
    for(let i=0; i<feedback.length; i++){
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

function update_keyboard_color(feedback_keystate) {
    console.log(feedback_keystate);
    for (const [k, v] of Object.entries(feedback_keystate)) {
        let key = document.querySelectorAll('[key="'+k+'"]')[0];
        console.log(key);
        if (!key.classList.contains("key-G")) {
            key.classList.add("key-" + v);
        }
    }
}

function is_pokemon(name) {
    let str_5 = (name + "     ").slice(0,5);
    return pokedex.includes(str_5);
}

function get_feedback(testword, hiddenword) {
    cset_hidden = {};
    for (let i=0; i<hiddenword.length; i++) {
        const c = hiddenword[i];
        if (!cset_hidden[c]) {
            cset_hidden[c] = 0;
        }
        cset_hidden[c] += 1;
    }

    for (let i=0; i<testword.length; i++) {
        if (testword[i] == hiddenword[i]) {
            cset_hidden[testword[i]] -= 1;
        }
    }
    ret = "";
    // ret_keydict = {};
    for (let i=0; i<testword.length; i++) {
        let c_test = testword[i];
        let c_hidden = hiddenword[i];
        if (c_test == c_hidden) {
            ret = ret + "G";
            // ret_keydict[c_test] = "G";
        } else if (hiddenword.includes(c_test)) {
            if (cset_hidden[c_test] && cset_hidden[c_test] > 0) {
                ret = ret + "Y";
                // if (!ret_keydict[c_test]) {
                //     ret_keydict[c_test] = "Y";
                // }
                cset_hidden[c_test] -= 1;
            } else {
                ret = ret + "B";
            }
        } else {
            ret = ret + "B";
            // ret_keydict[c_test] = "B";
        }
    }
    return ret;
}

function feedback2keystate(testword, feedback) {
    ret_keystate = {};
    for (let i=0; i<feedback.length; i++) {
        if (feedback[i] == "G") {
            ret_keystate[testword[i]] = "G";
        } else if (feedback[i] == "Y") {
            if (!ret_keystate[testword[i]]) {
                ret_keystate[testword[i]] = "Y";
            }
        } else if (feedback[i] == "B") {
            ret_keystate[testword[i]] = "B";
        }
    }
    return ret_keystate;
}

function get_optimal_feedback_and_set_pokedex(testword, H) {
    let feedback_dict = {};
    H.forEach(hiddenword => {
        let feedback = get_feedback(testword, hiddenword);
        if (!feedback_dict[feedback]) {
            feedback_dict[feedback] = [];
        }
        feedback_dict[feedback].push(hiddenword);
    });

    let maxlength = -1;
    let maxfeedback;
    let maxset;
    for (const [k, v] of Object.entries(feedback_dict)) {
        if (v.length > maxlength) {
            maxlength = v.length;
            maxfeedback = k;
            maxset = v;
        }
    }
    current_pokedex = maxset;
    console.log(current_pokedex);
    return maxfeedback;
}

function init() {
    current_pokedex = [];
    for (let i=0; i<pokedex.length; i++) {
        const pokemon = pokedex[i];
        if (!pokemon.includes(" ")) {
            current_pokedex.push(pokemon);
        }
    }
}
