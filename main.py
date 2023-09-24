current_time = 0
current_status = 0
past_status = 0
delta_time = 0
past_time = 0
morse_sign = ""



# if pins.digital_read_pin(DigitalPin.P2) == 1:
def process():
    global morse_sign
    rounded_delta_time = Math.round(delta_time / 1000)
    is_pressed = past_status == 1
    if not is_pressed:
        if rounded_delta_time < 2:
            basic.show_string("o")
        elif rounded_delta_time >= 5:
            # kurz
            basic.show_string("L")
        else:
            # lang
            # verarbeite morse_sign
            # basic.showString(lexicon[morse_sign])
            # setzte morse_sign zurück
            morse_sign = ""
            basic.show_string("O")
    elif rounded_delta_time < 2:
        morse_sign = morse_sign + "."
        basic.show_string(".")
    else:
        morse_sign = morse_sign + "_"
        basic.show_string("_")

def on_forever():
    global current_time, current_status, delta_time, past_time, past_status
    current_time = input.running_time()
    current_status = pins.digital_read_pin(DigitalPin.P2)
    if current_status != past_status:
        delta_time = current_time - past_time
        process()
        past_time = current_time
        past_status = current_status
        led.enable(True)
basic.forever(on_forever)
