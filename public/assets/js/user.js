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
$('#modifyBox').on('change', "#avatarr", function () {
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
            console.log(response)
            var html = template('modifyTpl', response );
            $('#modifyBox').html(html);
        }
    });
});
$('#modifyBox').on('submit','#modifyForm',function() {
    var formData = $(this).serialize()
    console.log(formData)
    var id = $(this).attr('data-id')
    $.ajax({
        type: "put",
        url: '/users/' + id,
        data: formData,
        success: function (response) {
                location.reload()
        }
    });
    return false
})

$('#userBox').on('click', '.delete', function () {
    if (confirm('你真的要删除吗?')) {
        var id = $(this).attr('data-id')
        $.ajax({
            type: "delete",
            url: "/users/" + id,
            success: function (response) {
                console.log(response)
                location.reload()
            }
        });
    }
});
var selectAll = $('#selectAll')
selectAll.on('change',function() {
    var status = $(this).prop('checked')
    if (status) {
        $('#deleteMant').show()
    }else {
        $('#deleteMant').hide()
    }
    $('#userBox').find('input').prop('checked',status)
})
$('#userBox').on('change', '#userStatus', function () {
    if($('#userBox').find('input').length == $('#userBox').find('input').filter(':checked').length) {
        selectAll.prop('checked',true)
    }
    else {
        selectAll.prop('checked',false)
    }
    if ($('#userBox').find('input').filter(':checked').length > 0) {
        $('#deleteMant').show()
    }else {
        $('#deleteMant').hide()
    }
    // selectAll.prop('checked',$('#userBox').find('input').length == $('#userBox').find('input').filter(':checked').length)
});
$('#deleteMant').on('click',function() {
    var ids = []
    var checkedUser = $('#userBox').find('input').filter(':checked')
    checkedUser.each(function(index,elemente) {
        ids.push($(elemente).attr('data-id'))
    })
    if (confirm('确定批量删除吗?')) {
        $.ajax({
            type: "delete",
            url: "/users/" + ids.join('-'),
            success: function (response) {
                location.reload()
            }
        });
    }
})