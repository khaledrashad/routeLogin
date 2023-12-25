const loginBtn = document.getElementById("formBtn")
const emailInput = document.getElementById("emailInput")
const passwordInput = document.getElementById("passwordInput")
const errorMessage = document.getElementById("errorMessage")
const nameSignUpInput = document.getElementById("nameSignUpInput")
const emailSignUpInput = document.getElementById("emailSignUpInput")
const passwordSignUpInput = document.getElementById("passwordSignUpInput")
const signUpBtn = document.getElementById("signUpBtn")

const usersList = []

signUpBtn.addEventListener("click", addUser)

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
    if (emailValidity == true && passwordValidity == true) {
        usersList.push(user)
        localStorage.setItem("usersData", JSON.stringify(user))
        console.log(usersList)
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