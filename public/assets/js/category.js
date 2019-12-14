$('#addCategory').on('submit', function () {
    var formData = $(this).serialize()
    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function (response) {
            location.reload()
        }
    });
    return false
})
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template('cateTpl', {
            data: response
        })
        $('#cateBox').html(html)
    }
});
$('#cateBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id')
    $.ajax({
        type: "get",
        url: "/categories/" + id,
        success: function (response) {
            var html = template('modifyTpl', response)
            $('#formBox').html(html)
        }
    });
})
$('#formBox').on('submit', '#modifyCategory', function () {
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
    $.ajax({
        type: "put",
        data: formData,
        url: "/categories/" + id,
        success: function (response) {
            location.reload()
        }
    });
    return false
})
$('#cateBox').on('click', '.delete', function () {
    var id = $(this).attr('data-id')
    if (confirm('你真的要删除嘛?')) {
        $.ajax({
            type: "delete",
            url: "/categories/" + id,
            success: function (response) {
                location.reload()
            }
        });
    }
})
var deleteMany = $('#deleteMany')
var deleteAll = $('#deleteAll')
deleteAll.on('change', function () {
    var status = $(this).prop('checked')
    if (status) {
        $('#deleteMany').show()
    } else {
        $('#deleteMany').hide()
    }
    $('#cateBox').find('input').prop('checked', status)
})
$('#cateBox').on('change', '#userStatus', function () {
    if ($('#cateBox').find('input').length == $('#cateBox').find('input').filter(':checked').length) {
        deleteAll.prop('checked', true)
    } else {
        deleteAll.prop('checked', false)
    }
    if ($('#cateBox').find('input').filter(':checked').length > 0) {
        $('#deleteMany').show()
    } else {
        $('#deleteMany').hide()
    }
})
deleteMany.on('click', function () {
    var ids = []
    var checkedUser = $('#cateBox').find('input').filter(':checked')
    checkedUser.each(function(index,elemente) {
        ids.push($(elemente).attr('data-id'))
        console.log(ids)
    })
    if (confirm('确定批量删除吗?')) {
        $.ajax({
            type: "delete",
            url: "/categories/" + ids.join('-'),
            success: function (response) {
                location.reload()
            }
        });
    }
})
