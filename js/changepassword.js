var botToTop5 = document.getElementById('botToTop5');

window.onscroll = function () {
    if (document.documentElement.scrollTop >= 200) {
        botToTop5.style.display = "block";
    } else {
        botToTop5.style.display = "none";
    }
};
function handleBotToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

if (localStorage.getItem('myaccount') != '' && localStorage.getItem('myaccount') != null) {
    var myaccount = JSON.parse(localStorage.getItem('myaccount'));
    var html = `
    <li>
        <a href="index.html"><img src="./img/products/shop logo.png" width="80"/></a>
    </li>
    <li>
        <a href="index.html">Main Page</a>
    </li>
    <li>
        <a class="menuLink whiteCharacter" href="introduction.html">Introduction</a>
    </li>
    <li>
       <span class="whiteCharacter">Hi, ${myaccount.username}</span>
    </li>
    <li>
        <a style="color:rgb(163, 217, 255);" class="menuLink" href="changepass.html">Change Password</a>
    </li>
    <li>
        <a class="menuLink" style="color: red; cursor: pointer;" onclick = "logout()">Log out <i class="fa-solid fa-right-from-bracket"></i></a> 
    </li>
    <li>
        <div id = "clock" onload="currentTime()"></div>
    </li>`;
    document.getElementById('menu').innerHTML = html;
}

function logout() {
    if (confirm('Do you want to logout?') == true) {
        localStorage.removeItem('myaccount');
        alert('Logout successfully!')
        window.location.href = 'signin.html';
    }
}

document.getElementById('changePassBtn').addEventListener('click', function () {
    var oldPassword = document.getElementById('oldpassword').value;
    var newPassword = document.getElementById('newpassword').value;
    var confPassword = document.getElementById('confpassword').value;
    var users = JSON.parse(localStorage.getItem('users'));
    var myAccount = JSON.parse(localStorage.getItem('myaccount'))
    if (myAccount.password == oldPassword) {
        if (newPassword == confPassword) {
        
            if (newPassword.length < 8) {
                document.getElementById('error').innerHTML = 'This password must have at least 8 characters!';
                document.getElementById('newpassword').value = '';
                document.getElementById('confpassword').value = '';
                return false;
            }
        
            if (newPassword.length > 20) {
                document.getElementById('error').innerHTML = 'This password can only have at most 20 characters!';
                document.getElementById('newpassword').value = '';
                document.getElementById('confpassword').value = '';
                return false;
            }
        
            var regularExpression  = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            
            if(!regularExpression.test(newpassword)) {
                document.getElementById('error').innerHTML = 'Password should contain at least one special character!';
                document.getElementById('newpassword').value = '';
                document.getElementById('confpassword').value = '';
                return false;
            }
            var user = {
                'username': myAccount.username,
                'pnumber': myAccount.pnumber,
                'email': myAccount.email,
                'address': myAccount.address,
                'birthday': myAccount.date,
                'gender': myAccount.gender,
                'password': newPassword,
            };
            for (var key in users) {
                if (users[key].username == myAccount.username) {
                    var filtered = users.filter(function(el) { return el.username != myAccount.username; });
                    filtered.push(user);
                    localStorage.setItem('users', JSON.stringify(filtered));
                    alert('Change password successfully!');
                    localStorage.removeItem('myaccount');
                    window.location.href = 'signin.html';
                }
            }
        } else {
            document.getElementById('error').innerHTML = 'Confirm your password again!';
            document.getElementById('newpassword').value = '';
            document.getElementById('confpassword').value = '';
            return false;
        }
    }
    document.getElementById('error').innerHTML = 'Current password is not correct!'
    document.getElementById('oldpassword').value = '';
});

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