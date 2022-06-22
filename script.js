function iconTitle(text) {
    const textDict = {
        Sunny: "Cerah", Clear: "Cerah", "Partly cloudy": "Sebagian Berawan",
        Cloudy: "Berawan", Mist: "Kabut", Overcast: "Mendung",
        "Patchy rain possible": "Kemungkinan Hujan Rintik-Rintik",
        "Patchy light drizzle": "Gerimis tipis merata",
        "Light drizzle": "Gerimis ringan",
        "Patchy light rain": "Hujan rintik-rintik",
        "Light rain": "Hujan ringan",
        "Moderate rain at times": "Hujan dengan intensitas sedang",
        "Moderate rain": "Hujan sedang",
        "Heavy rain at times": "Hujan deras kadang-kadang",
        "Heavy rain": "Hujan deras",
        "Torrential rain shower": "Hujan deras",
        "Patchy light rain with thunder": "Hujan rintik-rintik disertai guntur",
        "Moderate or heavy rain with thunder": "Hujan sedang atau lebat disertai petir",
    }; 
    let icon_title = document.querySelector('#icon-title');

    for (let condition of Object.keys(textDict)) {
        if (text == condition) {
            icon_title.innerHTML = textDict[condition];        
        }
    }
}

async function fetchData() {
    let inputKeyword = document.querySelector('.input-keyword');
    let inputKey = inputKeyword.value;

    if (inputKey == "") {
        inputKey = "Jakarta"
    }
    
    console.log(inputKeyword.value);
    const respon = await
        fetch("https://api.weatherapi.com/v1/forecast.json?key=5e3bbd9fbe134591aa695336221706&q="
        + `${inputKey}` +"&days=1&aqi=no&alerts=no")
            .then(respon => respon.json())
            .then(respon => {
                let location = document.querySelector('#location');
                let location2 = document.querySelector('#location2');
                let location3 = document.querySelector('#location3');
                let location4 = document.querySelector('#location4');
                let current_temp = document.querySelector('#current_temp');
                let feelslike = document.querySelector('#feels_temp');
                let icon = document.querySelector('#icon-weather');
                let last_update = document.querySelector('#last_update');
                let icon_Title = document.querySelector('#icon-title');
                let temp = document.querySelector('#temp')
                let humid = document.querySelector('#humid')
                let airPress = document.querySelector('#air-press')
                let visibility = document.querySelector('#visibility')
                let wind = document.querySelector('#wind')
                let rain = document.querySelector('#rainy')
                let uv = document.querySelector('#uv-index')
                let moonphase = document.querySelector('#moonphase')
                location.innerHTML = `${respon.location.name}, ${respon.location.region}, ${respon.location.country}`
                location2.innerHTML = `${respon.location.name}`
                location3.innerHTML = `${respon.location.name}`
                location4.innerHTML = `${respon.location.name}`
                current_temp.innerHTML = `${respon.current.temp_c}&deg;C `
                feelslike.innerHTML = `${respon.current.feelslike_c}&deg;C`
                icon.src = `${respon.current.condition.icon}`
                icon_Title = `${respon.current.condition.text}`
                iconTitle(icon_Title);
                humid.innerHTML = `${respon.current.humidity}`
                temp.innerHTML = `${respon.forecast.forecastday[0].day.maxtemp_c} / ${respon.forecast.forecastday[0].day.mintemp_c} `
                airPress.innerHTML = `${respon.current.pressure_mb}`
                visibility.innerHTML = `${respon.current.vis_km}`
                wind.innerHTML = `${respon.current.wind_kph} | ${respon.current.wind_degree}&deg; | ${respon.current.wind_dir} `
                rain.innerHTML = `${respon.forecast.forecastday[0].day.daily_chance_of_rain}%`
                uv.innerHTML = `${respon.current.uv}`
                moonphase.innerHTML = `${respon.forecast.forecastday[0].astro.moon_phase}`

                let last_update_epoc = `${respon.current.last_updated_epoch}`
                let utcSeconds = last_update_epoc;
                let d = new Date(0);
                let utc = d.setUTCSeconds(utcSeconds);
                let date_string = d.toLocaleString(['ban', 'id']);

                console.log(date_string);
                last_update.innerHTML = `${date_string} WIB`

                let sunrise = document.querySelector(".SunriseTime");
                sunrise.innerHTML = `${respon.forecast.forecastday[0].astro.sunrise}`
                let sunset = document.querySelector(".SunsetTime");
                sunset.innerHTML = `${respon.forecast.forecastday[0].astro.sunset}`
                let moonrise = document.querySelector(".MoonriseTime");
                moonrise.innerHTML = `${respon.forecast.forecastday[0].astro.moonrise}`
                let moonset = document.querySelector(".MoonsetTime");
                moonset.innerHTML = `${respon.forecast.forecastday[0].astro.moonset}`
            })
            .catch(error => {
                alert(`Nama kota yang Anda masukkan (${inputKey}) tidak terdaftar/salah, Coba lagi!`)
                console.log(error.message)
            });
    inputKeyword.value = null;


    function Translate(Joke) {
        const joke_item = '[{"Text":"' + Joke + '"}]';
    
        const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'f4ad8a6af7msh4a82f1879e9a402p184acbjsn59fe3c6ad69c',
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
        },
        body: joke_item
    };

    fetch('https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=id&api-version=3.0&profanityAction=NoAction&textType=plain', options)
	.then(response => response.json())
	.then(response => {
            let Trans = document.querySelector('#subtitle')
            Trans.innerHTML = `${response[0].translations[0].text}`
        })
    .catch(err => console.error(err));   
    }

    const jokes = await 
    fetch("https://v2.jokeapi.dev/joke/Miscellaneous,Pun,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single")
            .then(jokes => jokes.json())
            .then(jokes => {
                let joke = document.querySelector("#Jokes")
                original_joke = `${jokes.joke}`
                joke.innerHTML = original_joke
                Translate(original_joke);
            })
};


window.addEventListener('load', (event) => {
    fetchData()
    console.log('page is fully loaded');
});
let input = document.getElementById("input-keyword");


input.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("button").click();
    }
});