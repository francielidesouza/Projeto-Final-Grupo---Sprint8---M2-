import { postLogin, postRegister, readAllPets} from './request.js'

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
/* RENDER REGISTERED PETS */


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



export async function renderPetsHome(){

    const ulList = document.querySelector(".ul-pets__list")
    ulList.innerHTML=""
    const pets = await readAllPets()
    pets.forEach(pet =>{

        const liCard = document.createElement("li")
        const divImg = document.createElement("div")
        const img = document.createElement("img")
        const divInfo = document.createElement("div")
        const h2 = document.createElement("h2")
        const p = document.createElement("p")

        liCard.classList.add('li-card__pets')
        divImg.classList.add('div-img__pets')
        img.classList.add('img-card')
        img.src = pet.avatar_url
        divInfo.classList.add('div-info__card')
        h2.innerText = pet.name
        p.innerText = pet.species

        ulList.appendChild(liCard)
        liCard.append(divImg, divInfo)
        divImg.appendChild(img)
        divInfo.append(h2, p)

        
    })
    return ulList
}
renderPetsHome()

async function filterPetsHome(species){
    const ulList = document.querySelector(".ul-pets__list")
    ulList.innerHTML=""
    const pets = await readAllPets()
    const petsFilter = pets.filter(el => el.species === species)
    petsFilter.forEach(pet =>{

        const liCard = document.createElement("li")
        const divImg = document.createElement("div")
        const img = document.createElement("img")
        const divInfo = document.createElement("div")
        const h2 = document.createElement("h2")
        const p = document.createElement("p")

        liCard.classList.add('li-card__pets')
        divImg.classList.add('div-img__pets')
        img.classList.add('img-card')
        img.src = pet.avatar_url
        divInfo.classList.add('div-info__card')
        h2.innerText = pet.name
        p.innerText = pet.species

        ulList.appendChild(liCard)
        liCard.append(divImg, divInfo)
        divImg.appendChild(img)
        divInfo.append(h2, p)

        
    })
    return ulList 
}

function filterPetHome(){
    const allPetsBtn = document.getElementById("allPetsBtn")
    const dogsBtn = document.getElementById("dogsBtn")
    const catsBtn = document.getElementById("catsBtn")
    const birdsBtn = document.getElementById("birdsBtn")
    const reptilesBtn = document.getElementById("reptilesBtn")

    allPetsBtn.addEventListener('click', () => renderPetsHome())
    dogsBtn.addEventListener('click', () => filterPetsHome("Cachorro"))
    catsBtn.addEventListener('click', () => filterPetsHome("Gato"))
    birdsBtn.addEventListener('click', () => filterPetsHome("Aves"))
    reptilesBtn.addEventListener('click', () => filterPetsHome("Repteis"))

}
filterPetHome()


// SHOW MODAL REGISTER
function showModalRegister() {
    const btnRegister = document.querySelector('.btn__register')
    const modalContainer = document.querySelector('.modal__register')
    const btnCloseModal = document.querySelector('.modal__btn--close')
  
     btnRegister.addEventListener('click', () => {
        modalContainer.showModal()
        renderModais()
    })

    btnCloseModal.addEventListener('click', () => {
        modalContainer.close()

    })
}
showModalRegister()




// SHOW MODAL LOGIN
function showModalLogin() {
    const btnLogin = document.querySelector('.btn__login')
    const modalContainer = document.querySelector('.modal__login')
    const btnCloseModal = document.querySelector('.modal__btn--closeLogin')

    btnLogin.addEventListener('click', () => {
        modalContainer.showModal()
        renderModais()
    })

    btnCloseModal.addEventListener('click', () => {
        modalContainer.close()
    })

}
showModalLogin()


function renderModais(){
    const renderLogin = document.querySelector('#open__login')
    const renderRegister = document.querySelector('#open__register')
    const modalContainerLogin = document.querySelector('.modal__login')
    const modalContainerRegister = document.querySelector('.modal__register')

    renderLogin.addEventListener('click', () => {
        modalContainerRegister.close()
        modalContainerLogin.showModal()
    
    })

    renderRegister.addEventListener('click', () => {
        modalContainerLogin.close()
        modalContainerRegister.showModal()
    })
}

export function loginUser() {
    const inputs = document.querySelectorAll('.modal__input--login')
    const btnLogin = document.querySelector('#btn__enter')
    const loginUser = {}

    btnLogin.addEventListener('click', async (event) => {
        event.preventDefault()

        inputs.forEach(input => {
            loginUser[input.name] = input.value
        })
        const requestLogin = await postLogin(loginUser)
    
    })

}
loginUser()


export function registerUser() {
    const name = document.querySelector('#name')
    const email = document.querySelector('#email')
    const password = document.querySelector('#passwordRegister')
    const avatar = document.querySelector('#avatar')
    const modalRegister = document.querySelector('.modal__register')
    const btnRegister = document.querySelector('#btn__register')
   
    btnRegister.addEventListener('click', async (event) => {
        event.preventDefault()

     let data = {
            "name": `${name.value}`,
            "email": `${email.value}`,
            "password":`${password.value}`,
            "avatar_url": `${avatar.value}`
        }

       await postRegister(data)
       modalRegister.close()
    })

}
registerUser()

