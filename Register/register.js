const FirstName = document.getElementById("FirstName");
const LastName = document.getElementById("LastName");
const username = document.getElementById("Username");
const email = document.getElementById("email");
const gender = document.getElementById("gender");
const password = document.getElementById("password");
const passwordconfirm = document.getElementById("confirmPassword");
const registerBtn = document.getElementById("registerBtn");
let allUsers = [];
if (localStorage.getItem("allUsers") != null) {
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
} else {
  allUsers = [];
}
// Register Btn
registerBtn.addEventListener("click", () => {
  if (
    emailValidation() == true &&
    passwordValidation() == true &&
    CheckPassword() == true&&
    checkUserFound()==true&&
    usernameAndlastnameAndFirstValidation()==true
  ) {
    let CurrentUser = {
      Fname: FirstName.value,
      Lname: LastName.value,
      uName: username.value,
      Email: email.value,
      Gender: gender.value,
      Password: password.value,
      FavouriteImgs:[]
    };
    
    allUsers.push(CurrentUser);
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    sessionStorage.setItem("CurrentUser", JSON.stringify(CurrentUser));
    location.replace("../index.html");
  } 
});


// validation
function emailValidation() {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (pattern.test(email.value)) {
    emailvalid.classList.replace("notvalid", "valid");
    return true;
  } else {
    emailvalid.classList.add("notvalid");
  }
}

function passwordValidation() {
  const pattern = /[0-9]{7,}/;
  if (pattern.test(password.value)) {
    passwordvalid.classList.remove("notvalid");
    return true;
  } else {
    passwordvalid.classList.add("notvalid");
  }
}
function CheckPassword() {
  if (password.value == passwordconfirm.value) {
    return true;
  }
}
function checkUserFound(){
  let y = allUsers.find(({ Email }) => Email == email.value);
  if (y == undefined) {
    registerEmail.classList.remove('notvalid')
    return true
  }else{
    registerEmail.classList.add('notvalid')
  }
}
function usernameAndlastnameAndFirstValidation(){
  const pattern =/[a-zA-Z]{3,}/
  if(pattern.test(username.value)&&pattern.test(LastName.value)&&pattern.test(FirstName.value)){
    uservalid.classList.remove("notvalid")
    firstNamevalid.classList.remove("notvalid")
    lastNamevalid.classList.remove("notvalid")
    return true;
  }else{
    uservalid.classList.add("notvalid")
    firstNamevalid.classList.add("notvalid")
    lastNamevalid.classList.add("notvalid")
  }
}
