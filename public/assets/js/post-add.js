$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        console.log(response)
        var html = template('cateTpl', {
            data: response
        })
        $('#category').html(html)
    }
});
$('#feature').on('change', function () {
    var file = this.files[0]
    var formData = new FormData()
    formData.append('cover', file)
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#thumbnail').val(response[0].avatar)
        }
    });
})
$('#addForm').on('submit', function () {
    var formData = $(this).serialize()
    console.log(formData)
    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        success: function (response) {
            console.log(response)
            location.href = '/admin/posts.html'
        },
        error: function (err) {
            console.log(err.responseText)
        }
    });
    return false
})
var id = getUrlParams('id')

if (id != -1) {
    $.ajax({
        type: "get",
        url: "/posts/" + id,
        success: function (response) {
            $.ajax({
                type: "get",
                url: "/categories",
                success: function (categories) {
                    response.categories = categories
                    console.log(response)
                    var html = template('modifyTpl', response)
                    $('#modiBox').html(html)
                }
            });
        }
    });
}
$('#modiBox').on('submit','#modifyForm',function() {
    var formData =$(this).serialize()
    var id =$(this).attr('data-id')
    $.ajax({
        type: "put",
        url: "/posts/" + id,
        data: formData,
        success: function (response) {
            location.href = '/admin/posts.html'
        }
    });
    return false
})
// function getUrlParams(name) {
//     var arr = location.search.substr(1).split('&')
//     var obj = {}
//     var atr = []
//     for (k in arr) {
//         var atr = arr[k].split('=')
//         obj[atr[0]] = atr[1]
//     }
//     if (obj[name]) {
//         return obj[name]
//     }
//     return -1
// }

function getUrlParams(name) {
    var arr = location.search.substr(1).split('&')
    for (k in arr) {
        var att = arr[k].split('=')
        if (att[0] == name) {
            return att[1]
        }
    }
    return -1
}