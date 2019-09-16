$(function()
{

});

function submitform()
{
    var email = $('#inputEmail').val();
    var password = $('#inputPassword').val();
    var name = $('#inputName').val();
    var confirmPassword = $('#inputConfirmPassword').val();

    showLoader(".form-signin");

    if(password === confirmPassword){
        $.post('/register',{
            name: name,
            email: email, 
            password:password
        },
        function(data)
        {
            if(data.success === true)
            {
                window.location = '/';
                return;
            }

            hideLoader(".form-signin");
            alert(data.message);
        },'JSON').fail(function()
        {
            hideLoader(".form-signin");
            alert('An error occurred on server, please try again later.')
        });
    }
    else{
        hideLoader(".form-signin");
        alert('Passwords do not match.')
    }
}