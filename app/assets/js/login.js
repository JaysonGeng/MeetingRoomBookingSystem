function getUrlKey(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}


$(function () {
    var name = getUrlKey("id")
    if (name!=null && name !=="") {
        console.log(name)
        var email = name;
        showLoader(".form-signin");

        $.ajax({
            url: 'http://202.194.15.92:8381/get_info?xgh=' + email,
            type: "GET",
            success: function(resp) {
                console.log(resp)
                $.post('/auth', {email: email, password: resp.xm},
                    function (data) {
                        if (data.success === true) {
                            window.location = '/';
                            return;
                        }
                        hideLoader(".form-signin");
                        alert(data.message);

                    }, 'JSON').fail(function () {
                    hideLoader(".form-signin");
                    alert('2222222An error occurred on server, please try again later.')
                });
            }
        })


    }

});

// function submitform() {
//     var email = $('#inputEmail').val();
//     var password = $('#inputPassword').val();
//
//     showLoader(".form-signin");
//
//     $.post('/auth', {email: email, password: password},
//         function (data) {
//             if (data.success === true) {
//                 window.location = '/';
//                 return;
//             }
//
//             hideLoader(".form-signin");
//             alert(data.message);
//
//         }, 'JSON').fail(function () {
//         hideLoader(".form-signin");
//         alert('An error occurred on server, please try again later.')
//     });
// }
