const circle = document.getElementById("circle");
const parent = document.getElementById("parent");
const userName =document.getElementById("userName");
const userEmail =document.getElementById("userEmail");
const userGender = document.getElementById("userGender")
const userimg = document.getElementById("userimg");
const LogOutBtn = document.getElementById("LogOutBtn")
let CurrentUser = {};
// Show UserName------------------------
if (sessionStorage.getItem("CurrentUser") != null) {
  CurrentUser = JSON.parse(sessionStorage.getItem("CurrentUser"));
  const firstCharc = CurrentUser.Fname.split("", 1)
    .toString()
    .toLocaleUpperCase();
  const lastCharc = CurrentUser.Lname.split("", 1)
    .toString()
    .toLocaleUpperCase();
  circle.innerHTML = `${firstCharc}${lastCharc}`;
} else {
  CurrentUser = null;
}
let favImg =CurrentUser.FavouriteImgs;
(function(){
    let cartona =''
    for (let img of favImg){
        cartona+=`<div class='child' )'><img width=100% height=100% src='${img}'></div>` 
    }
    parent.innerHTML=cartona
}())
userName.innerHTML=`${CurrentUser.uName}`
userEmail.innerHTML=`${CurrentUser.Email}`
userGender.innerHTML=`${CurrentUser.Gender}`
userimg.innerHTML=`${CurrentUser.FavouriteImgs.length}`
LogOutBtn.addEventListener("click", (_) => {
  sessionStorage.clear();
  location.replace('../index.html');
});


  
