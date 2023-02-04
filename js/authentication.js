if (localStorage.getItem('status-login-admin') == null || localStorage.getItem('status-login-admin') == '') {
    alert('You must login first !');
    window.location.href = 'login-admin.html';
}