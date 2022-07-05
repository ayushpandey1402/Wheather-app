function weather() {
    let city = document.querySelector("#city").value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=318a95cedc94575d227abd9ec257bb11`;

    fetch(url).then(function (res) {
        return res.json();
    }).then(function (res) {
        // console.log(Math.round(res.main.temp - 273));
        Append(res);
    })
        .catch(function (err) {
            console.log(err);
        })
}

function getDataByLocation(lat, lon) {
    let city = document.querySelector("#city").value;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=318a95cedc94575d227abd9ec257bb11`;

    fetch(url).then(function (res) {
        return res.json(); //collect
    }).then(function (res) {
        // console.log(res);
        // console.log(Math.round(res.main.temp - 273));
        Append(res);
    })
        .catch(function (err) {
            console.log(err);
        })
}

function getWeather7Day(lat, lon) {
    const url7day = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=318a95cedc94575d227abd9ec257bb11`;

    fetch(url7day).then(function (result) {
        return result.json();
    }).then(function (result) {
        // console.log(result);
        let arr = result.daily;
        // console.log("here", arr);
        append7Day(arr);
    })
        .catch(function (error) {
            console.log(error);
        })
}

function append7Day(data) {
    let main = document.querySelector("#wheather-Days");
    main.innerHTML=null;
    let i=0;
    data.map(function (elem) {
        if(i==0) {
        } else {

            let box = document.createElement("div");
            box.setAttribute("class","box")

            let date1 =document.createElement("h3");
            const unixTime=elem.dt;
            const date=new Date(unixTime*1000);
            date1.innerText=`Date:- ${date.toLocaleDateString("en-us")}`;
            let img = document.createElement("img")
            img.setAttribute("id","image")
            img.src =  `https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`
            let temp = document.createElement("h3");
            temp.innerText = `Temperature : ${Math.round(elem.temp.day -273)}°C`;
    
            let maxTemp = document.createElement("h3");
            maxTemp.innerText = `Maximum Temperature : ${Math.round(elem.temp.max -273)}°C`;
    
            let minTemp = document.createElement("h3");
            minTemp.innerText = `Minimum Temperature : ${Math.round(elem.temp.min -273)}°C`;
    
            let humidity = document.createElement("h3");
            humidity.innerText = `Humidity : ${elem.humidity}`;
    
            box.append(date1,img,temp, maxTemp, minTemp, humidity);
    
            main.append(box);
        }
        i++;
    })
}

function Append(data) {
    console.log("rovin-data",data)
    let div = document.querySelector("#Wheather");
    div.setAttribute("class","div")
    document.querySelector("#Wheather").innerText=null;
    let div1=document.createElement("div")
    div1.setAttribute("class","div1")
    let div2=document.createElement("div")
    div2.setAttribute("class","div2")
    let mapDiv = document.querySelector(".mapouter");
    

    let city = document.createElement("h2");
    city.innerText = `City : ${data.name}`;

    document.querySelector("#city").value = data.name;

    let map = document.querySelector("#map");
    map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    let min = document.createElement("h3");
    min.innerText = `Minimum Temperature: ${Math.round(data.main.temp_min -273)}°C`;
    let max = document.createElement("h3");
    max.innerText = `Maximum Temperature: ${Math.round(data.main.temp_max -273)}°C`;

    let humidity = document.createElement("h3");
    humidity.innerText = `Humidity: ${data.main.humidity}`;
    let temp = document.createElement("h3");
    temp.innerText = `Temperature: ${Math.round(data.main.temp - 273)} °C`;

    div1.append(city, min, max, humidity, temp);
    div.append(div1)
}

function getWeather() {
    navigator.geolocation.getCurrentPosition(success);

    function success(pos) {
        let crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy}`);

        getDataByLocation(crd.latitude, crd.longitude);

        getWeather7Day(crd.latitude, crd.longitude);
    }
}
