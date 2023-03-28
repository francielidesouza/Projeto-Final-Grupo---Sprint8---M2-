const baseUrl = "http://localhost:3333/";

export function getUserLocalStorage() {
  const user = JSON.parse(localStorage.getItem("user"));

  return user;
}

// REGISTER USERS
export async function postRegister(data) {

    const requestRegister = await fetch("http://localhost:3333/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));

    if(requestRegister.response || requestRegister.message){
        window.alert("Cadstro invalido")
    }else{
        window.alert('Cadastrado com sucesso!')
    }



    return requestRegister
}

// LOGIN USERS

export async function postLogin(data) {
  const requestLogin = await fetch(baseUrl + "session/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
    

    if(requestLogin.response || requestLogin.message){
        window.alert("Senha ou email invalido!")
    }else{
        localStorage.setItem('user', JSON.stringify(requestLogin.token))
        window.location.replace('./src/pages/homeLogado.html')
    }
  return requestLogin;
}

export async function postrUser(data) {
    const requestUser = await fetch("http://localhost:3333/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));

  return requestUser;
}


export async function readAllPets (){
    let token =  JSON.parse(localStorage.getItem('user'))
    
    const pets = await fetch ("http://localhost:3333/pets",{
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(res => {
            return res
        })
    return pets

}
export async function createPet(data) {
  let token = JSON.parse(localStorage.getItem("user"));

  const pet = await fetch("http://localhost:3333/pets", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}
export async function updatePetById(data, id) {
  let token = JSON.parse(localStorage.getItem("user"));

  const pet = await fetch(`http://localhost:3333/pets/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}
export async function updateProfile(data, token) {
 

  const patch = await fetch(baseUrl + "users/profile", {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const response = await patch.json();
  return response;
}

export async function readProfile(token) {
  const info = await fetch(baseUrl + "users/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await info.json();
  return response;
}

export async function deleteProfile(token) {
  const info = await fetch(baseUrl + "users/profile", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await info.json();
  return response;
}
export async function deletePetById(id){
    let token =  JSON.parse(localStorage.getItem('user'))
    

    const pet = await fetch(`http://localhost:3333/pets/${id}`,{
        method: "DELETE",
        headers:{
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        },
        
    })


}
