// const URL = "https://cat-fact.herokuapp.com/facts";

// const getfacts = async() =>{
//     let a = Math.floor(Math.random()*6);
//     console.log("getting data...");
//     let response = await fetch(URL);
//     console.log(response);
//     let data = await response.json();
//     console.log(data[a].text);

// }

const URL = "https://v6.exchangerate-api.com/v6/9c487baae01f2b9ae52532e9/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const from1 = document.querySelector(".from select");
const to1 = document.querySelector(".to select");
const msg1 = document.querySelector(".msg");
for(let select of dropdowns){
    for(currCode in countryList){
        let option = document.createElement("option");
        option.value = currCode;
        option.innerText = currCode;
        if(select.name == "from" && currCode == "USD")
        {
            option.selected = true;
        }
        if(select.name == "to" && currCode == "INR")
            {
                option.selected = true;
            }
        select.append(option);
    }
    select.addEventListener("change" , (evt) =>{
        updateFlag(evt.target);
    })
}


const updateFlag = (element) => {
    let currCode = element.value;
    console.log(currCode);
    let countryCode = countryList[currCode];
    let a = countryCode.toString();
    let newScr = 'https://flagsapi.com/' + countryCode + '/flat/64.png';
    console.log(newScr);
    let img = element.parentElement.querySelector("img");
    img.src = newScr;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    // let from = document.querySelector("form select[name='from']").value;
    // let to = document.querySelector("form select[name='to']").value;
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    console.log(amtval);
    if(amtval == "" || amtval<1)
    {
        alert("Please enter a valid amount");
        return;
    }
        // let response = fetch(URL);
        // console.log(URL);
        // console.log(response);
        // let data = response.json();
        // console.log(data);
    // console.log(data["conversion_rates"][to]);
    // let result = data["conversion_rates"][to] * amount;
    // document.querySelector(".result").innerText = result;
    // let URL1 = 'https://v6.exchangerate-api.com/v6/9c487baae01f2b9ae52532e9/latest/' + from1.value;
    // fetch(URL1).then(response => console.log(response.json())).then(result => {
    //     let exchangerate = result.conversion_rates[to1.value];
    //     console.log(exchangerate);
    // })
    let URL1 = 'https://v6.exchangerate-api.com/v6/9c487baae01f2b9ae52532e9/latest/' + from1.value;

    fetch(URL1)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json(); // Return the JSON-parsed response
    })
    .then(result => {
        console.log(result); // Log the parsed result to inspect the structure
        let exchangerate = result.conversion_rates[to1.value];
        console.log(exchangerate);
        let result1 = exchangerate * amtval;
        // console.log(amtval);
        msg1.innerText = amtval+' '+from1.value+' = '+result1+' '+to1.value;
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });


})