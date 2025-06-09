function sendData() {


    const xhttp = new XMLHttpRequest()

    xhttp.open("post", "/userData")
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.onloadstart = function() {
        console.log('start')
    }
    xhttp.onloadend = function() {
        console.log("end")
    }

    xhttp.send()
}

sendData()