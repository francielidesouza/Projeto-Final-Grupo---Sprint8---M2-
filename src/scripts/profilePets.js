
import {
  getUserLocalStorage,
  readAllPets,
  createPet,
  updatePetById,
  readProfile,
  updateProfile,
  deleteProfile,
  deletePetById
} from "./request.js";


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

let idAtulizar = ""

async function renderPets (){
    let list = document.querySelector(".ul__petList")
    

    list.innerHTML=""
    let pets = await readAllPets()
    pets.forEach(element => {
        
            
                    let tagLi= document.createElement("li")
                    list.appendChild(tagLi)
            
                    let tagImgPet = document.createElement("img")
                    tagImgPet.src = element.avatar_url
                    tagImgPet.alt = `${element.species}, ${element.name}`
                    tagLi.appendChild(tagImgPet)
            
                    let tagDiv = document.createElement("div")
                    tagLi.appendChild(tagDiv)
            
                    let tagName = document.createElement("p")
                    tagName.classList.add("li__infoPet")
                    tagName.innerText = "Nome: "
                    tagDiv.appendChild(tagName)
            
                    let tagNameSpan = document.createElement("span")
                    tagNameSpan.innerText = element.name
                    tagNameSpan.classList.add("li__infoPet--result")
                    tagName.appendChild(tagNameSpan)
            
                    let tagEspecie = document.createElement("p")
                    tagEspecie.classList.add("li__infoPet")
                    tagEspecie.innerText = "Espécie: "
                    tagDiv.appendChild(tagEspecie)
            
                    let tagEspecieSpan = document.createElement("span")
                    tagEspecieSpan.classList.add("li__infoPet--result")
                    tagEspecieSpan.innerText = element.species
                    tagEspecie.appendChild(tagEspecieSpan)
            
                    let tagAdotavel = document.createElement("p")
                    tagAdotavel.classList.add("li__infoPet")
                    tagAdotavel.innerText = "Adotável: "
                    tagDiv.appendChild(tagAdotavel)
            
                    let tagAdotavelSpan = document.createElement("span")
                    tagAdotavelSpan.classList.add("li__infoPet--result")
                    if(element.available_for_adoption == true){
                        tagAdotavelSpan.innerText = "Sim"
                    }else{
                        tagAdotavelSpan.innerText = "Não"
                    }
                    tagAdotavel.appendChild(tagAdotavelSpan)
            
                    let tagButton = document.createElement("button")
                    tagButton.classList.add("btn__atualizarPet")
                    tagButton.innerText = "Atualizar"
                    tagButton.dataset.id = element.id
                    tagDiv.appendChild(tagButton)
            
                    tagButton.addEventListener("click",()=>{
                        let modalAtualizar = document.querySelector(".modal__atualizaPet")
                        let fechar = document.querySelector("#fechar__modal--atualizarPet")
                        
                        modalAtualizar.showModal()
                       
                        idAtulizar = tagButton.dataset.id
                        
                        fechar.addEventListener("click", ()=>{
                            modalAtualizar.close()
                        })
            
                    })
            
                    let tagDelete = document.createElement("button")
                    tagDelete.classList.add("btn__deletarPet")
                    tagDelete.innerText = "Deletar"
                    tagDelete.dataset.id = element.id
                    tagDiv.appendChild(tagDelete)
            
                    tagDelete.addEventListener("click",async (event)=>{
                        event.preventDefault()
            
                        await deletePetById(tagDelete.dataset.id)
                        renderPets()
                    })

    });
}

function registerPet() {
  let button = document.querySelector(".btn__registerPet");
  let modal = document.querySelector(".modal__registerPet");
  let fechar = document.querySelector("#fechar__modal--registerPet");
  let cadastrar = document.querySelector("#cadastrarPet");
  let namePet = document.querySelector("#namePet");
  let especiePet = document.querySelector("#especiePet");
  let fotoPet = document.querySelector("#fotoPetRegister");

  button.addEventListener("click", () => {
    modal.showModal();
  });
  fechar.addEventListener("click", () => {
    modal.close();
  });

  cadastrar.addEventListener("click", async (event) => {
    event.preventDefault();

    let data = {
      name: `${namePet.value}`,
      bread: "SRD",
      species: `${especiePet.value}`,
      avatar_url: `${fotoPet.value}`,
    };
    
    await createPet(data);
    renderPets();
    modal.close();
  });
}



//--------------------------USER------------------------//
async function renderUser() {
  let avatar = document.querySelector(".img_perfil--photo");
  let userToken = await getUserLocalStorage();
  let nome = document.querySelector(".perfil_nametxt");
  let email = document.querySelector(".perfil_emailtxt");
  let user = await readProfile(userToken);
  if (user.avatar_url == "") {
    avatar.src = "../assets/pngwing.com.png";
  }
  avatar.src = `${user.avatar_url}`;
  nome.innerHTML = `<span>Nome:</span> ${user.name}`;
  email.innerHTML = `<span>Email:</span> ${user.email}`;
}
renderUser();
function modalPatchProfile() {
  let button = document.querySelector(".btn_infoPerfil_atualizar");
  let modal = document.querySelector(".modal__patchProfile");
  let closeBtn = document.querySelector(".modal_closeBtn");
  button.addEventListener("click", () => {
    modal.showModal();
    patchProfile();
  });

  closeBtn.addEventListener("click", () => {
    modal.close();
  });
}
modalPatchProfile();

async function patchProfile() {
  let modal = document.querySelector(".modal__patchProfile");
  let userToken = await getUserLocalStorage();
  let patchBtn = document.querySelector(".modal_patchBtn");
  let name = document.querySelector(".modal_nameinput--patch");
  let avatar = document.querySelector(".modal_fotoinput--patch");
  patchBtn.addEventListener("click", async (event) => {
    let data = {
      avatar_url: `${avatar.value}`,
      name: `${name.value}`,
    };
    event.preventDefault();
    modal.close();
    updateProfile(data, userToken);
    renderUser();
  });
}
function modalDeleteProfile() {
  let button = document.querySelector(".btn_infoPerfil_deletar");
  let modal = document.querySelector(".modal__deleteProfile");
  let closeBtn = document.querySelector(".modal_closeBtnDel");
  button.addEventListener("click", () => {
    modal.showModal();
    DelProfile();
  });

  closeBtn.addEventListener("click", () => {
    modal.close();
  });
}
function atualizarPet(){
    let namePet = document.querySelector("#namePetAtualizar")
    let especiePet = document.querySelector("#especiePetAtualizar")
    let fotoPet = document.querySelector("#fotoAtualizar")
    let button = document.querySelector("#atualizarPet")
    let modal = document.querySelector(".modal__atualizaPet")

    button.addEventListener("click", async(event)=>{
        event.preventDefault()
        
        let data ={
            "name": `${namePet.value}`,
            "bread": "SRD",
            "species": `${especiePet.value}`,
            "avatar_url": `${fotoPet.value}`
        }
        await updatePetById(data,idAtulizar)

        let list = document.querySelector(".ul__petList")
        list.innerHTML=""
        
        renderPets()
        modal.close()

    })
}
async function DelProfile() {
  let userToken = await getUserLocalStorage();
  let modal = document.querySelector(".modal__deleteProfile");
  let del = document.querySelector(".modal_deleteBtn_delete");
  let close = document.querySelector(".modal_deleteBtn_close");
  del.addEventListener("click", (event) => {
    event.preventDefault();
    deleteProfile(userToken);
    window.location.replace("/")
    localStorage.removeItem("user")
  });
  close.addEventListener("click", (event) => {
    event.preventDefault();
    modal.close();
  });
}

function logout(){
    let close = document.querySelector(".btn__logout--profile")

    close.addEventListener("click", ()=>{

        localStorage.clear()
    })
}

logout()
modalDeleteProfile();
renderPets()
registerPet()
atualizarPet()