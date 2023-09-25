const parent = document.getElementById("parent");
const theType = document.getElementById("theType");
let videosData = document.getElementsByClassName("videosData");
const FirstSearchValue = document.getElementById("firstSearchValue");
const searchBar = document.getElementById("searchBar");
const loginBtn = document.getElementById("LoginBtn");
const LogOutBtn = document.getElementById("LogOutBtn");
const circle = document.querySelector(".circle");
const arrow = document.querySelector(".arrow");
const searchNav = document.getElementById("seachNav");
const liftImg = document.querySelector("#leftImg");
const rightImg = document.querySelector("#rightImg");
const body = document.querySelector("#body_");
const selecetedImgParent = document.querySelector(".selecetedImgParent");
let navSearch = document.getElementById("navSearch");
let loader = `<div class="three-body">
<div class="three-body__dot"></div>
<div class="three-body__dot"></div>
<div class="three-body__dot"></div>
</div>`;
let cartona = "";
let count = 1;
let switchKey = true;
parent.innerHTML = loader;
let CurrentUser = {};
// Show UserName------------------------
if (sessionStorage.getItem("CurrentUser") != null) {
  circle.style.display = "flex ";
  CurrentUser = JSON.parse(sessionStorage.getItem("CurrentUser"));
  const firstCharc = CurrentUser.Fname.split("", 1).toString();
  const lastCharc = CurrentUser.Lname.split("", 1).toString();
  circle.innerHTML = `${firstCharc}${lastCharc}`;
} else {
  circle.style.display = "none ";
  CurrentUser = null;
}
circle.addEventListener("click", function () {
  location.replace("./Profile/profile.html");
});
// get all Users
if (localStorage.getItem("allUsers") != null) {
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
} else {
  allUsers = [];
}
//-------------- API------------------------------------

const ApiControl = async (type = "v1", category = "street") => {
  await fetch(
    `https://api.pexels.com/${type}/search/?page=${count}&per_page=15&query=${category}`,
    {
      headers: {
        Authorization:
          "dduIdgcxtb3X1K3WIllsexAvLU7spJTVWdd9ec9jbk2ii7qqWNQkCnBX",
      },
    }
  )
    .then((res) => res.json())
    .then((jsonData) => {
      let data = jsonData;
      if (type == "v1") {
        let dataArr = data.photos;

        switchKey = true;
        display(dataArr);
        // } else {
        //   let dataArr = data.videos;
        //   switchKey = false;
        //   setTimeout(function () {
        //     display(dataArr);
        //   }, 5000);
      }
    })
    .catch((err) => console.log(err));
};
ApiControl();
function searchFound() {
  if (searchBar.value == "") {
    return "street";
  } else {
    return searchBar.value;
  }
}
// change with scroll----------------------
document.addEventListener("scroll", () => {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  if (Math.ceil(window.scrollY) >= scrollableHeight) {
    count++;
    ApiControl("v1", searchFound());
  }
});

// Heart Icon -----------------------
function heartPress(t, imgSrc) {
  t.classList.toggle("redColor");
  let favimg = CurrentUser.FavouriteImgs;
  if (!favimg.includes(imgSrc)) {
    favimg.push(imgSrc);
    let x = allUsers.find(({ Email }) => Email == CurrentUser.Email);
    let userLocate = allUsers.indexOf(x);
    allUsers.splice(userLocate, 1, CurrentUser);
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    sessionStorage.setItem("CurrentUser", JSON.stringify(CurrentUser));
  }

  if (!t.classList.contains("redColor")) {
    let removeImg = favimg.find((ele) => ele == imgSrc);
    let locateofremoved = favimg.indexOf(removeImg);
    favimg.splice(locateofremoved, 1);
    let x = allUsers.find(({ Email }) => Email == CurrentUser.Email);
    let userLocate = allUsers.indexOf(x);
    allUsers.splice(userLocate, 1, CurrentUser);
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    sessionStorage.setItem("CurrentUser", JSON.stringify(CurrentUser));
  }
}

// display function------------------------------
function display(data) {
  if (switchKey) {
    for (let ele of data) {
      cartona += `<div class='child' )'>
      <img onClick='showSelectedImg(("${ele.src.portrait}"),("${ele.alt}"),("${ele.photographer}"),("${ele.photographer_url}"))'  width=100% height=100% src=' ${ele.src.portrait}'>
      <i class="fa-solid fa-heart heart" onClick='heartPress(this,("${ele.src.portrait}"))'   ></i>
      </div>`;
    }
  }

  parent.innerHTML = cartona;
}

$(window).on("load", function () {
  $(window)
    .scroll(function () {
      let windowBottom = $(this).scrollTop() + $(this).innerHeight();
      $(".child").each(function () {
        /* Check the location of each desired element */
        let objectBottom = $(this).offset().top + $(this).outerHeight();
        /* If the element is completely within bounds of the window, fade it in */
        if (objectBottom < windowBottom) {
          //object comes into view (scrolling down)
          if ($(this).css("opacity") == 0) {
            $(this).fadeTo(150, 1);
          }
        } else {
          //object goes out of view (scrolling up)
          if ($(this).css("opacity") == 1) {
            $(this).fadeTo(50, 0);
          }
        }
      });
    })
    .scroll(); //invoke scroll-handler on page-load
});

// SearchBar Appear With Scroll----------------------
window.addEventListener("scroll", () => {
  if (window.scrollY >= 434) {
    navSearch.style.display = "flex ";
    arrow.style.display = "flex";
  } else {
    navSearch.style.display = "none ";
    arrow.style.display = "none";
  }
});

///---------------------------
window.addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    cartona = "";
    ApiControl("v1", searchBar.value);
  }
});
searchBar.addEventListener("change", function () {
  console.log("hello");
  ApiControl("v1", searchBar.value);
});

searchBtn.addEventListener("click", () => {
  cartona = "";
  navbarSupportedContent.classList.remove("show");
  ApiControl("v1", searchNav.value);
});
magnifyingGlass.addEventListener("click", () => {
  cartona = "";
  ApiControl("v1", searchBar.value);
});
//-----LoginBTN----------------------------
loginBtn.addEventListener("click", (_) =>
  location.replace("./Log-In/login.html")
);
//LogOutBTN--------------
LogOutBtn.addEventListener("click", (_) => {
  sessionStorage.clear();
  location.reload();
});

//Check Login------------------------------------
if (CurrentUser != null) {
  setTimeout(function () {
    loginBtn.classList.add("disappear");
  });
} else {
  LogOutBtn.classList.add("disappear");
}
// Click On Img
function showSelectedImg(img, alts, photographs, phUrl) {
  // console.log(imgs)
  liftImg.innerHTML = `
 <a> 
 <img src=${img} alt="currentImg" width=100%  height =  100%>
 </a>
  `;
  rightImg.innerHTML = `
  <i class="fa-solid  fa-xmark text-dark" onClick='endImg()'></i>
   <div class="d-flex  h-100 flex-column justify-content-center align-items-center text-center">
  <h2> Hello ${findName()} </h2>
  <h4 class=" pt-2"> ${alts}</h4>
  <p>Taken By :${photographs}</p>
  <p>PhotoGrapher Profile At Pexels : <a target="_blank" href="${phUrl}">Click</a></p>
</div>`;
  selecetedImgParent.style.display = "inline-block";
}
function endImg() {
  selecetedImgParent.style.display = "none";
}

function findName() {
  if (CurrentUser != null) {
    return CurrentUser.uName;
  } else {
    return "Guest";
  }
}
