$('#error').hide();
$('#login_admin_btn').click(function () {
    var username = $('#username').val();
    var password = $('#password').val();
    if (username === 'admin' && password === '123456') {
        window.location.href = 'admin.html';
    } else {
        $('#error').show();
        $('#error').html('Username or Password is incorrect!')
        $('#username').val('');
        $('#password').val('');
    }
})