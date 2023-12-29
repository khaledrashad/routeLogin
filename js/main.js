const loginBtn = document.querySelector(".loginForm button")
const emailInput = document.getElementById("emailInput")
const passwordInput = document.getElementById("passwordInput")
const errorMessage = document.getElementById("errorMessage")
const nameSignUpInput = document.getElementById("nameSignUpInput")
const emailSignUpInput = document.getElementById("emailSignUpInput")
const passwordSignUpInput = document.getElementById("passwordSignUpInput")
const signUpBtn = document.getElementById("signUpBtn")
const logoutBtn = document.getElementById("logoutBtn")

if(window.location.href == "http://127.0.0.1:5500/homePage.html"){
    const welcomeMessage = document.getElementById("welcomeMessage")
    welcomeMessage.innerHTML = `Welcome ${localStorage.getItem("currentUser")}`
}

let usersList = []
if(localStorage.getItem("usersData") != null){
    usersList = JSON.parse(localStorage.getItem("usersData")) 
}


function addUser() {
    const user = {
        name: nameSignUpInput.value,
        email: emailSignUpInput.value,
        password: passwordSignUpInput.value
    }
    let passwordRgx = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/
    let emailRgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let passwordValidity = passwordRgx.test(passwordSignUpInput.value)
    let emailValidity = emailRgx.test(emailSignUpInput.value)
    let userSaved = JSON.parse(localStorage.getItem("usersData"))
    let alreadySaved = []
    userSaved.forEach((el)=>{
        if(emailSignUpInput.value == el.email){
            alreadySaved.push(el)
        }
    })
    if (alreadySaved.length != 0){
        errorMessage.innerHTML = "User already created"
    } else if(emailValidity == true && passwordValidity == true) {
        usersList.push(user)
        localStorage.setItem("usersData", JSON.stringify(usersList))
        errorMessage.innerHTML=`User created`
        nameSignUpInput.value = ""
        emailSignUpInput.value = ""
        passwordSignUpInput.value = ""
        setTimeout(()=>{
            window.location.href = "index.html"
        }, 1500)

    } else if (emailValidity == true && passwordValidity == false) {
        errorMessage.innerHTML = `Password must contain at least one Uppercase letter and at least one Lowercase letter and password length between 8 and 20 characters`
    } else if(emailValidity == false && passwordValidity == true){
        errorMessage.innerHTML = `Enter valid email`
    } else {
        errorMessage.innerHTML = `Enter valid email
        and
        Password must contain at least one Uppercase letter and at least one Lowercase letter and password length between 8 and 20 characters`
    }

}
function logOut (){
    window.location.href = "index.html"
}
loginBtn.addEventListener("click",()=>{
    let validUser = []
    usersList.forEach((el)=>{
        if(emailInput.value == el.email && passwordInput.value == el.password){
                validUser.push(el)
            }
     })
        if(validUser.length != 0 ){
            localStorage.setItem("currentUser", validUser[0].name)
            window.location.href = "homePage.html"
           
        } else {
            errorMessage.innerHTML = "Enter valid email and password"
        }
     })

