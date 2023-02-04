var botToTop3 = document.getElementById('botToTop3');

window.onscroll = function () {
    if (document.documentElement.scrollTop >= 30) {
        botToTop3.style.display = "block";
    } else {
        botToTop3.style.display = "none";
    }
};
function handleBotToTop()
{
    window.scrollTo({top: 0, behavior: 'smooth'});
}

document.getElementById('signinBtn').addEventListener('click', function (){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username == '') {
        document.getElementById('error').innerHTML = 'Missing username!';
        return false;
    }

    if (password == '') {
        document.getElementById('error').innerHTML = 'Missing password!';
        return false;
    }

    if (localStorage.getItem('users') == '' || localStorage.getItem('users') == null) {
        document.getElementById('error').innerHTML = 'Account does not exist!';
        return false;
    }

    var users = JSON.parse(localStorage.getItem('users'));

    for (var user of users) {
        if (user.username == username && user.password == password) {
            alert('Sign in successfully!');
            localStorage.setItem('myaccount', JSON.stringify(user));
            window.location.href = 'index.html';
            return true;
        }
    }
    document.getElementById('error').innerHTML = 'Username or password is incorrect!';
})

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