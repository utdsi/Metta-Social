


let input_box = document.getElementById("searchInput")

input_box.addEventListener("input", function () {

    debounce(searchCountry, 1000)
})


async function searchCountry() {

    let loader_div = document.getElementById("loader_div")
    loader_div.style.display = "block"


    let country = document.getElementById("searchInput").value;
    console.log(country)



    try {
        let response = await fetch(`https://restcountries.com/v3.1/currency/${country}`);
        // console.log(response)

        let data = await response.json()
        //get data
        console.log("data:", data)



        if (data.status == 404) {
            let loader_div = document.getElementById("loader_div")
            loader_div.style.display = "none"
            window.alert("No Country has been found")
        } else {
            appendCountry(data)
        }

    }
    catch (err) {
        console.log("err:", err)
    }
}

function appendCountry(data) {

    let country_div = document.getElementById("searchResults")
    country_div.innerHTML = null

    let loader_div = document.getElementById("loader_div")
    loader_div.style.display = "none"

    data.forEach(function (el) {

        let div = document.createElement("div")
        let img = document.createElement("img")
        img.src = el.flags.png

        let h3 = document.createElement("h3")
        h3.innerText = `Name:- ${el.name.common}`
        let p = document.createElement("p")
        p.innerText = `Capital:- ${el.capital[0]}`

        div.append(img, h3, p)

        country_div.append(div)

    })
}




let id;
function debounce(func, delay) {
    if (id) {
        clearTimeout(id)
    }
    id = setTimeout(function () {
        func()
    }, delay)
}



