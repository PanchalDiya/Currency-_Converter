const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



// for(code in countryList) {
//     console.log(code,countryList[code]);
// }


for (let select of dropdown) {
    for(currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.innerHTML = currCode;
        if(select.name ==="from" && currCode === "USD"){
            newOption.selected = "selected"
        }else if(select.name ==="to" && currCode === "INR"){
            newOption.selected = "selected"
        } 
        select.append(newOption);
    }
    

    select.addEventListener("change",(evt)=> {
        updateflag(evt.target);
    })
}

const updateExchngRate = async() => {
    let amount = document.querySelector(".amount input");
    let amountvel = amount.value;
    if(amountvel === "" || amountvel < 1) {
        amountvel = 1;
        amount.value = "1";
    }

    // console.log(fromcurr.value, tocurr.value);
    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let reponse = await fetch(URL);
    let data = await reponse.json();
    let rate = data[tocurr.value.toLowerCase()];
    console.log(rate);

    let finalAmount = amountvel * rate;
    msg.innerText = `${amountvel}${fromcurr.value} = ${finalAmount}${tocurr.value}`
} 


const updateflag = (Element) => {
    let currCode = Element.value;
    let contrycode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${contrycode}/flat/64.png`;
    let img = Element.parentElement.querySelector("img");
    img.src = newsrc;
} 

btn.addEventListener("click",(evt) => {
    evt.preventDefault();
    updateExchngRate();
});



window.addEventListener("load",() => {
    updateExchngRate();
})
