let current_time = 0;
let current_status = 0;
let past_status = 0;
let delta_time = 0;
let past_time = 0;
let morse_sign = "";


function lexicon(expr: string): string {
    switch (expr){
        case ".-": return"A";
        case "-...": return "B";
        case "-.-.": return "C";
        case "-..": return "D";
        case ".": return "E";
        case "..-.": return "F";
        case "--.": return "G";
        case "....": return "H";
        case "..": return "I";
        case ".---": return "J";
        case "-.-": return "K";
        case ".-..": return "L";
        case "--": return "M";
        case "-.": return "N";
        case "---": return "O";
        case ".--.": return "P";
        case "--.-": return "Q";
        case ".-.": return "R";
        case "...": return "S";
        case "-": return "T";
        case "..-": return "U";
        case "...-": return "V";
        case ".--": return "W";
        case "-..-": return "X";
        case "-.--": return "Y";
        case "--..": return "Z";
        case "-----": return "0";
        case ".----": return "1";
        case "..---": return "2";
        case "...--": return "3";
        case "....-": return "4";
        case ".....": return "5";
        case "-....": return "6";
        case "--...": return "7";
        case "---..": return "8";
        case "----.": return "9";
        case "----": return "CH";
        case "..--..": return "?";
        case "-.-.--": return "!"
        default: return '';
    }
}


function process_morse_sign() {
    let letter = lexicon(morse_sign);
    morse_sign = "";
    basic.showString(letter);
}

//  if pins.digital_read_pin(DigitalPin.P2) == 1:
function process_input() {
    let rounded_delta_time = Math.round(delta_time / 1000)
    let is_pressed = past_status == 1
    if (!is_pressed) {
        if (rounded_delta_time >= 5) {
            process_morse_sign();
        }
        else {
            basic.showString(" ");
        }
    } else {
        if (rounded_delta_time < 3) {
            morse_sign = morse_sign + ".";
            basic.showString(".");
        } else {
            morse_sign = morse_sign + "-";
            basic.showString("-");
        }
    }
}

basic.forever(function on_forever() {
    
    current_time = input.runningTime()
    current_status = pins.digitalReadPin(DigitalPin.P2)
    delta_time = current_time - past_time
    if (current_status != past_status) {
        process_input();
        past_time = current_time
        past_status = current_status
        led.enable(true)
    }
    else{
        if (delta_time > 5000 && current_status == 0) {
            process_morse_sign();
        }
    }
})
