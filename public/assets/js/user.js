$("#userForm").on('submit', function () {
    var formData = $(this).serialize()
    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        success: function () {
            location.reload()
        },
        error: function (err) {
            var res = JSON.parse(err.responseText)
            alert(res.message)
        }
    });
    return false
});
$("#avatarr").on('change',function () {
    var formData = new FormData()
    formData.append('avatar', this.files[0])
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response)
            $('#preview').attr('src', response[0].avatar)
            $('#hiddenAvatar').val(response[0].avatar)
        }
    });
});
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        console.log(response)
        var html = template('userTpl', { data: response });
        $('#userBox').html(html);
    }
});
$('#userBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id')
    $.ajax({
        type: "get",
        url: "/users/" + id,
        success: function (response) {
            // console.log(response)
            var html = template('modifyTpl', response );
            $('#modifyBox').html(html);
        }
    });
});
