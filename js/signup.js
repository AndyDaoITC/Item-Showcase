var botToTop4 = document.getElementById('botToTop4');

window.onscroll = function () {
    if (document.documentElement.scrollTop >= 200) {
        botToTop4.style.display = "block";
    } else {
        botToTop4.style.display = "none";
    }
};
function handleBotToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// Sign Up \\
document.getElementById('signupBtn').addEventListener('click', function () {
    var uname = document.getElementById('username').value;
    var date = document.getElementById('birthday').value;
    var gender = document.getElementById('gender').value;
    var password = document.getElementById('password').value;
    var confpassword = document.getElementById('confpassword').value;
    var pnumber = document.getElementById('pnumber').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;

    // Username \\
    if (uname == '') {
        document.getElementById('error').innerHTML = 'Missing username!';
        return false;
    }

    if (uname.length < 8) {
        document.getElementById('error').innerHTML = 'This username must have at least 8 characters!';
        return false;
    }

    if (uname.length > 20) {
        document.getElementById('error').innerHTML = 'This username can only have at most 20 characters!';
        return false;
    }

    // Phone number \\
    if (pnumber == '') {
        document.getElementById('error').innerHTML = 'Missing phone number!';
        return false;
    }

    if (pnumber.length != 10) {
        document.getElementById('error').innerHTML = 'This phone number should contain 10 numbers!';
        return false;
    }

    // Email \\
    if (email == '') {
        document.getElementById('error').innerHTML = 'Missing email!';
        return false;
    }

    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(!re.test(email)) {
        document.getElementById('error').innerHTML = 'This email is not valid!';
        return false;
    }

    // Address \\
    if (address == '') {
        document.getElementById('error').innerHTML = 'Missing adress!';
        return false;
    }

    // Date \\
    if (date == '') {
        document.getElementById('error').innerHTML = 'Please enter your birthday date!';
        return false;
    }

    // Gender \\
    if (gender == '') {
        document.getElementById('error').innerHTML = 'Please select a gender!';
        return false;
    }

    // Password \\
    if (password == '') {
        document.getElementById('error').innerHTML = 'Missing password!';
        return false;
    }

    if (password != confpassword) {
        document.getElementById('error').innerHTML = 'Confirm your password again!';
        var password = document.getElementById('password').value = '';
        var confpassword = document.getElementById('confpassword').value = '';
        return false;
    }

    if (password.length < 8) {
        document.getElementById('error').innerHTML = 'This password must have at least 8 characters!';
        document.getElementById('password').value = '';
        document.getElementById('confpassword').value = '';
        return false;
    }

    if (password.length > 20) {
        document.getElementById('error').innerHTML = 'This password can only have at most 20 characters!';
        document.getElementById('password').value = '';
        document.getElementById('confpassword').value = '';
        return false;
    }

    var regularExpression  = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    
    if(!regularExpression.test(password)) {
        document.getElementById('error').innerHTML = 'Password should contain at least one special character!';
        document.getElementById('password').value = '';
        document.getElementById('confpassword').value = '';
        return false;
    }

    // Exist username \\
    if (localStorage.getItem('users') != '' && localStorage.getItem('users') != null) {    
        var users = JSON.parse(localStorage.getItem('users'));
        for (var x of users) {
            if (x.username == uname) {
                document.getElementById('error').innerHTML = 'This username have already exist!';
                document.getElementById('username').value = '';
                return false;
            }
        }
    }
    
    // Handle save account \\
    document.getElementById('error').innerHTML = '';

    var user = {
        'username': uname.trim(),
        'pnumber': pnumber,
        'email': email,
        'address': address,
        'birthday': date,
        'gender': gender,
        'password': password,
    };
    if (localStorage.getItem('users') == '' || localStorage.getItem('users') == null) {
        var users = [];
    } else {
        var users = JSON.parse(localStorage.getItem('users'));
    }
    users.push(user);
    localStorage.setItem('myaccount', JSON.stringify(user));
    localStorage.setItem('users', JSON.stringify(users));
    var uname = document.getElementById('username').value = '';
    var pnumber = document.getElementById('pnumber').value = '';
    var email = document.getElementById('email').value = '';
    var address = document.getElementById('address').value = '';
    var date = document.getElementById('birthday').value = '';
    var gender = document.getElementById('gender').value = '';
    var password = document.getElementById('password').value = '';
    var confpassword = document.getElementById('confpassword').value = '';
    alert('Successfully created an account!')
    window.location.href = 'index.html';
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