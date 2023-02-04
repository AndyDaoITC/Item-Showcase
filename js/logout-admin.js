$('#logOutBtn').click(function() {
    alert('Logout successfully !');
    localStorage.removeItem('status-login-admin');
    window.location.href = 'login-admin.html';
});