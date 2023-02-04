function logout() {
    if (confirm('Do you want to logout?') == true) {
        localStorage.removeItem('myaccount');
        alert('Logout successfully!')
        window.location.href = 'signin.html';
    }
}