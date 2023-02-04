w3.slideshow('.slides', 3000)
var botToTop = document.getElementById('botToTop');

window.onscroll = function () {
    if (document.documentElement.scrollTop >= 175) {
        botToTop.style.display = "block";
    } else {
        botToTop.style.display = "none";
    }
};
function handleBotToTop()
{
    window.scrollTo({top: 0, behavior: 'smooth'});
}
function darkMode() {
    var menuLinks = document.getElementsByClassName("menuLink");
    for (var i = 0; i < menuLinks.length; i++) {
        menuLinks[i].classList.toggle('blackCharacter')
    }
    document.getElementById('content').classList.toggle('darkBackground')
    document.getElementById('menu').classList.toggle('darkMenu')
    document.getElementById('searchitem-bar').classList.toggle('blackBG')
}

if (localStorage.getItem('myaccount') != '' && localStorage.getItem('myaccount') != null) {
    var myaccount = JSON.parse(localStorage.getItem('myaccount'));
    var html = `
    <li>
        <a href="index.html"><img src="./img/products/shop logo.png" width="80"/></a>
    </li>
    <li>
        <a style="color:rgb(163, 217, 255);" href="index.html">Main Page</a>
    </li>
    <li>
        <a class="menuLink whiteCharacter" href="introduction.html">Introduction</a>
    </li>
    <li>
       <span class="whiteCharacter">Hi, ${myaccount.username}</span>
    </li>
    <li>
        <a class="menuLink whiteCharacter" href="changepass.html">Change Password</a>
    </li>
    <li>
        <a class="menuLink" style="color: red; cursor: pointer;" onclick = "logout()">Log out <i class="fa-solid fa-right-from-bracket"></i></a> 
    </li>
    <li>
        <div id = "clock" onload="currentTime()"></div>
    </li>
    <li>
        <button class="darkModeBtn" onclick="darkMode()">Dark Mode</button>
    </li>
    <li>
        <a class="whiteCharacter cart"href="#"><i class="fa-solid fa-cart-shopping"></i></a>
    </li>`;
    document.getElementById('menu').innerHTML = html;
}

function currentTime() {
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";
  
    if(hh == 0){
        hh = 12;
    }
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
     }
  
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
     ss = (ss < 10) ? "0" + ss : ss;
      
     let time = hh + ":" + mm + ":" + ss + " " + session;
  
    document.getElementById("clock").innerText = time; 
    let t = setTimeout(function(){ currentTime() }, 1000);
  }
  currentTime();