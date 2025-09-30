const CountryName = new URLSearchParams(location.search).get("name")
const CountryNameH1 = document.querySelector(".country-name")
const CountryFlag = document.querySelector(".country-flag")
const NativeName = document.querySelector(".native-name")
const Population = document.querySelector(".population")
const Region = document.querySelector(".region")
const SubRegion = document.querySelector(".sub-region")
const Capital = document.querySelector(".capital")
const TopLevelDomain = document.querySelector(".top-level-domain")
const Currencies = document.querySelector(".currencies")
const Language = document.querySelector(".language")
const BorderCountries = document.querySelector(".border-countries")
const BackButton = document.querySelector(".Back-button")
const DarkModeButton = document.querySelector(".dark-mode-button")
const BodyElement = document.querySelector(".country-main-body")
const ThemeIcon =document.querySelector("#theme-icon")
const ThemeText =document.querySelector(".theme-text")



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


fetch(`https://restcountries.com/v3.1/name/${CountryName}?fullText=true`)
.then((res) => res.json())
.then(([Country])=> {
    console.log()
    console.log(Country)

    CountryNameH1.innerText = CountryName
    CountryFlag.src = Country.flags.svg
    NativeName.innerText = Object.values(Country.name.nativeName)[0].common
    Population.innerText = Country.population
    Region.innerText = Country.region
    SubRegion.innerText=Country.subregion
    Capital.innerText= Country.capital
    TopLevelDomain.innerText = Country.tld.join(", ")
    Currencies.innerText = Object.values(Country.currencies)[0].name
    Language.innerText = Object.values(Country.languages).join(", ")

    if(Country.borders){
        Country.borders.forEach((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res) => res.json())
            .then(([CountryDetails]) =>{
                // console.log(CountryDetails)
                const BorderCountry = document.createElement("a")
                BorderCountry.href =`country.html?name=${CountryDetails.name.common}`
                BorderCountry.innerText = CountryDetails.name.common
                console.log(BorderCountry)
                BorderCountries.appendChild(BorderCountry)
            } )

        });
    }

})

BackButton.addEventListener("click", ()=>{
    history.back()
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

