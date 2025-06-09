const inputFile = document.querySelector("input[type=file]")
const lableFile = document.querySelector("#lable")
const btnUpload = document.getElementById("btnUpload")
const entshar = document.getElementById("entshar")
const inputUrl = document.getElementById("url")

const obj = {
    img: "img",
    url: "url"
}

inputFile.addEventListener("change", () => {
   lableFile.innerHTML = inputFile.value
})
btnUpload.addEventListener("click", () => {
    if (inputFile.value) {
        const xhttp = new XMLHttpRequest()
        xhttp.open("post", "/dashboard/uploadFile")

        const formData = new FormData()
        formData.append("file", inputFile.files[0])

        xhttp.onloadstart = () => {
            btnUpload.innerHTML = "در حال اپلود"
            btnUpload.disabled = true
        }
        xhttp.upload.onprogress = (event) => {
            console.log(event.total, event.loaded)
        }
        xhttp.onloadend = () => {
            obj.img = JSON.parse(xhttp.response).result
            btnUpload.innerHTML = "اپلود شد"
        }

        xhttp.send(formData)
    }
})
entshar.addEventListener("click", () => {
    obj.url = inputUrl.value ?? "   "

    const xhttp = new XMLHttpRequest()

    xhttp.open("post", "/dashboard/createAd")
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.onloadend = () => {
        entshar.disabled = true
    }

    xhttp.send(JSON.stringify(obj))
})