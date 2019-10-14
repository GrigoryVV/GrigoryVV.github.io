let celsius = document.getElementById("celsius");
let fahrenheits = document.getElementById('fahrenheits');
let kelvins = document.getElementById('kelvins');

// console.log(celsius, fahrenheits, kelvins);

celsius.oninput = function() {
    if (celsius.value !== "" && Number(celsius.value) !== NaN) {
        fahrenheits.value = ((Number(celsius.value) * 9 / 5) + 32).toFixed(2);
        kelvins.value = (Number(celsius.value) + 273.15).toFixed(2);
    } else {
        fahrenheits.value = "";
        kelvins.value = "";
    }
}

fahrenheits.oninput = function() {
    if (fahrenheits.value !== "" && Number(fahrenheits.value) !== NaN) {
        celsius.value = ((Number(fahrenheits.value) - 32) * 5 / 9).toFixed(2);
        kelvins.value = ((Number(fahrenheits.value) - 32) * 5 / 9 + 273.15).toFixed(2);
    } else {
        celsius.value = "";
        kelvins.value = "";
    }
}

kelvins.oninput = function() {
    if (kelvins.value !== "" && Number(kelvins.value) !== NaN) {
        fahrenheits.value = ((Number(kelvins.value) - 273.15) * 9 / 5 + 32).toFixed(2);
        celsius.value = (Number(kelvins.value) - 273.15).toFixed(2);
    } else {
        fahrenheits.value = "";
        celsius.value = "";
    }
}