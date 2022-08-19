
let key = 0;

export function getkey() {
    return keys;
}

export function printlog(c) {
    // console.log(c);
    if(c === 10) {
        document.getElementById("current").innerText = "";
        println();
    }
    // var output = document.getElementById("output").innerText;
    var output = "";
    // // console.log(c);
    if (c === 32) {
        output += '\u00A0';     // shitty js
    } else {
        output += String.fromCharCode(c);
    }

    globalThis.outputbuffer += output;

    document.getElementById("current").innerText += output;
    // console.log(c + "  " + String.fromCharCode(c));
    // console.log(String.fromCharCode(c));
}

export function println() {
    document.getElementById("output").innerText = document.getElementById("output").innerText + globalThis.outputbuffer;

    globalThis.outputbuffer = "";
}

export function printdebug() {
    document.getElementById("disassembly").innerText = globalThis.debugbuffer + document.getElementById("disassembly").innerText;
    globalThis.debugbuffer = "";
}

export function printdisassembly(c) {
    if(c === 10) {
        printdebug();
    }

    var output = "";
    // // console.log(c);
    if (c === 32) {
        output += '\u00A0';     // shitty js
    } else {
        output += String.fromCharCode(c);
    }

    globalThis.debugbuffer += output;
}

export function printpc(pc) {
    document.getElementById("pc").innerText = "0x" + Number(pc).toString(16);
}

export function printreg(number, value) {
    document.getElementById("r"+number).innerText = "0x" + Number(value).toString(16);
}