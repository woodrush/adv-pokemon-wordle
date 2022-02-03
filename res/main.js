var currow = 0;
var curcol = 0;
var str = "";

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

function typekey(key) {
    if (key == "bs") {
        if (curcol > 0) {
            str = str.slice(0,curcol-1);
            curcol -= 1;
        }
    } else if (key == "shou" || key == "daku" || key == "handaku") {
        if (curcol > 0) {
            const curchar = str[curcol-1];
            const keydict = keydict_all[key];
            for (const [key, value] of Object.entries(keydict)) {
                if (key == curchar) {
                    str = str.slice(0,curcol-1);
                    str = str + value;
                }
            }
        }
    } else if (curcol > 4) {
        return;
    } else {
        str = str + key;
        curcol += 1;
    }
    showbox(str);
}
