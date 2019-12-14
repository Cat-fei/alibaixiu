$('#modifyForm').on('submit',function() {
    var formData = $(this).serialize()
    $.ajax({
        type: "put",
        url: "/users/password",
        data: formData,
        success: function (response) {
            location.href = 'admin/login.html'
        }
    });
    return false
})