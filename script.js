const CountriesContainer = document.querySelector(".countries-container");
const SelectRegion = document.querySelector("#Select-region")

const InputElement = document.querySelector(".input-element")
let AllCountriesData 
const DarkModeButton = document.querySelector(".dark-mode-button")
const BodyElement = document.querySelector(".main-body")
const ThemeIcon =document.querySelector("#theme-icon")
const ThemeText =document.querySelector(".theme-text")
console.log(ThemeIcon.className)

if(localStorage.getItem("Mode")==null){
    ThemeIcon.className = "fa-solid fa-moon"
    ThemeText.innerText = "Dark Mode"
    localStorage.setItem("Mode","Light-mode")
}
else if(localStorage.getItem("Mode") == "Dark-mode"){
    BodyElement.classList.add("Dark-mode")
    ThemeIcon.className = "fa-solid fa-sun"
   
    ThemeText.innerText = "Light Mode"
    localStorage.setItem("Mode","Dark-mode")

}


// All countries fetching and renderieng
fetch("https://restcountries.com/v3.1/all?fields=name,population,capital,region,currencies,languages,subregion,flags")
.then((res) => res.json())
.then((data) => {
    AllCountriesData = data
    console.log(AllCountriesData)
    RenderCountries(data)
})


// region wise countries data fetchingh and rendering
SelectRegion.addEventListener("change", (e)=>{
    console.log(e.target.value)
    CountriesContainer.innerHTML=""
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) => res.json())
    .then((data) => {
        RenderCountries(data)
    })
})




function RenderCountries(data){
    CountriesContainer.innerHTML=""
   data.forEach((country) => {
        const countryCard = document.createElement("a");
        const countryImg = document.createElement("img");
        const CountryText = document.createElement("div");

        countryCard.href = `/country.html?name=${country.name.common}`
        countryImg.src = country.flags.svg;
        countryCard.classList.add("country-card");
        CountryText.classList.add("country-text");

        CountryText.innerHTML = `<h2>${country.name.common}</h2>
                        <p>Population: <span>${country.population}</span></p>
                        <p>Region: <span>${country.region}</span></p>
                        <p>Capital: <span>${country.capital?.[0]}</span></p>`;  

        countryCard.append(countryImg,CountryText);
        CountriesContainer.appendChild(countryCard);
      
    });
}



InputElement.addEventListener("input", (e)=>{
    const FilteredCounteries = AllCountriesData.filter((country)=>country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    RenderCountries(FilteredCounteries)
    
})

DarkModeButton.addEventListener("click", ()=>{
    if (localStorage.getItem("Mode")=="Light-mode"){
        BodyElement.classList.add("Dark-mode")
        ThemeIcon.className = "fa-solid fa-sun"
        ThemeText.innerText = "Light Mode"
        localStorage.setItem("Mode","Dark-mode")
    }
    else if(localStorage.getItem("Mode")=="Dark-mode"){
        BodyElement.classList.remove("Dark-mode")
        ThemeIcon.className = "fa-solid fa-moon"
        ThemeText.innerText = "Dark Mode"
        localStorage.setItem("Mode","Light-mode")
    }
    
})