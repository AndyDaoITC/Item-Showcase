/* 
    Kiểm tra xem trước đó đã đăng nhập chưa, nếu đăng nhập rồi thì sẽ đi thẳng vào trang admin luôn chứ không
    vào trang đăng nhập admin nữa
*/
if (localStorage.getItem('status-login-admin') != null && localStorage.getItem('status-login-admin') != '') {
    window.location.href = 'admin.html';
}
$('#error').hide();
$('#login_admin_btn').click(function () {
    var username = $('#username').val();
    var password = $('#password').val();
    if (username === 'admin' && password === '123456') {
        window.location.href = 'admin.html';
        localStorage.setItem('status-login-admin', 1);
    } else {
        $('#error').show();
        $('#error').html('Username or Password is incorrect!')
        $('#username').val('');
        $('#password').val('');
    }
})