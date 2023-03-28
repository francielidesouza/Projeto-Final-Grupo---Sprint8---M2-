import { readAllPets, getUserLocalStorage } from './request.js'


export function menuHamburguer() {
    const btnHamburguer = document.querySelector('.header__img--menuBtn')  
    const btnCloseMenu = document.querySelector('.header__img--closeMenuBtn')

    btnHamburguer.addEventListener('click', () => {          
        toggleMenuHamburguer()
    })

    btnCloseMenu.addEventListener('click', () => {     
        toggleMenuHamburguer()
    })


}
menuHamburguer()

export function toggleMenuHamburguer(){

    const header = document.querySelector('.header__container')
    const btnHamburguer = document.querySelector('.header__img--menuBtn')  
    const btnCloseMenu = document.querySelector('.header__img--closeMenuBtn')
    const btnsContainer = document.querySelector('.header__container--btns')    
    
    btnHamburguer.classList.toggle('container__btns--hidden')
    btnCloseMenu.classList.toggle('container__btns--hidden')       
    btnsContainer.classList.toggle('container__btns--hidden')  
    header.classList.toggle('open')     
}

async function renderPetsLoggedHome() {
    const ulList = document.querySelector('.ul-pets__list2')
    const user = await getUserLocalStorage()
    if (user) {

        const pets = await readAllPets()
        ulList.innerHTML = ""
        pets.forEach(pet => {

            const liCard = document.createElement("li")
            const divImg = document.createElement("div")
            const img = document.createElement("img")
            const divInfo = document.createElement("div")
            const h2 = document.createElement("h2")
            const p = document.createElement("p")
            const btn = document.createElement("button")


            liCard.classList.add('li-card__pets')
            divImg.classList.add('div-img__pets')
            img.classList.add('img-card')
            img.src = pet.avatar_url
            divInfo.classList.add('div-info__card')
            h2.innerText = pet.name
            p.innerText = pet.species
            btn.classList.add('btn', 'btn--green')
            btn.innerText = "Me adota ?"



            ulList.appendChild(liCard)
            liCard.append(divImg, divInfo)
            divImg.appendChild(img)
            divInfo.append(h2, p, btn)

            return liCard
        })
    }
}


async function renderPetsFilterLogged(species) {
    const ulList = document.querySelector('.ul-pets__list2')
    const user = await getUserLocalStorage() 
    if (user) {
        
        const pets = await readAllPets()
        const petsFilter = pets.filter(el => el.species === species)
        ulList.innerHTML = ""
        petsFilter.forEach(pet => {

            const liCard = document.createElement("li")
            const divImg = document.createElement("div")
            const img = document.createElement("img")
            const divInfo = document.createElement("div")
            const h2 = document.createElement("h2")
            const p = document.createElement("p")
            const btn = document.createElement("button")
            

            liCard.classList.add('li-card__pets')
            divImg.classList.add('div-img__pets')
            img.classList.add('img-card')
            img.src = pet.avatar_url
            divInfo.classList.add('div-info__card')
            h2.innerText = pet.name
            p.innerText = pet.species
            btn.classList.add('btn','btn--green')
            btn.innerText = "Me adota ?"
        
            

            ulList.appendChild(liCard)
            liCard.append(divImg, divInfo)
            divImg.appendChild(img)
            divInfo.append(h2, p, btn)

            return liCard
        })
    }
}

function filterPetLogged(){
    const allPetsBtn = document.getElementById("allPetsBtn")
    const dogsBtn = document.getElementById("dogsBtn")
    const catsBtn = document.getElementById("catsBtn")
    const birdsBtn = document.getElementById("birdsBtn")
    const reptilesBtn = document.getElementById("reptilesBtn")

    allPetsBtn.addEventListener('click', () => renderPetsLoggedHome())
    dogsBtn.addEventListener('click', () => renderPetsFilterLogged("Cachorro"))
    catsBtn.addEventListener('click', () => renderPetsFilterLogged("Gato"))
    birdsBtn.addEventListener('click', () => renderPetsFilterLogged("Aves"))
    reptilesBtn.addEventListener('click', () => renderPetsFilterLogged("Repteis"))

}
filterPetLogged()

function logout(){

    let close = document.querySelector(".btn__logout--Home")
    console.log(close)
    close.addEventListener("click", () => {

        localStorage.clear()
    })
}

renderPetsLoggedHome()
logout()