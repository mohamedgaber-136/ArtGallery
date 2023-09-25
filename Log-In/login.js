const email = document.getElementById("email");
const password = document.getElementById("password");
const LoginBtn = document.getElementById("LoginBtn");
const lock = document.getElementById("lock");
const notMatch = document.getElementById("notMatch");
const notFound = document.getElementById("notFound");

let AllUsers = [];
if (localStorage.getItem("allUsers") != null) {
  AllUsers = JSON.parse(localStorage.getItem("allUsers"));
} else {
  AllUsers = [];
}
LoginBtn.addEventListener("click", function () {
  let x = AllUsers.find(({ Email }) => Email == email.value);
  console.log(x);
  console.log(password.value);
  console.log(email.value);
  if (x != undefined) {
    if (x.Email == email.value && x.Password == password.value) {
      sessionStorage.setItem("CurrentUser", JSON.stringify(x));
        location.replace('../index.html')
        notMatch.style.display='none'
        notFound.style.display='none'
      
    } else {
      notMatch.style.display='flex'
    }
  } else {
    notFound.style.display='flex'
  }
});
lock.addEventListener("click", () => {
  if (password.type == "password") {
    password.type = "text";
  } else if (password.type == "text") {
    password.type = "password";
  }
});
