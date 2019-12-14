$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        // console.log(response)
        var html = template('postsTpl', response)
        $('#postsBox').html(html)
        var page = template('pageTpl', response)
        $('#pageBox').html(page)
    }
});
// 处理时间格式
function dateFormat(date) {
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay()
}
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/posts",
        data: {page},
        success: function (response) {
            // console.log(response)
            var html = template('postsTpl', response)
            $('#postsBox').html(html)
            var fy = template('pageTpl', response)
            $('#pageBox').html(fy)
        }
    });
}
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        console.log(response)
        var html = template('plTpl',{data:response})
        $('#plBox').html(html)
    }
});
$('#flBox').on('submit',function() {
    var formDate = $(this).serialize()
    $.ajax({
        type: "get",
        url: "/posts",
        data:formDate,
        success: function (response) {
            console.log(response)
            var html = template('postsTpl', response)
            $('#postsBox').html(html)
            var page = template('pageTpl', response)
            $('#pageBox').html(page)
        }
    });
    return false
})
//删除文章
$('#postsBox').on('click','.delete',function() {
    if (confirm('确定删除嘛')) {
        var id  = $(this).attr('data-id')
        $.ajax({
            type: "delete",
            url: "/posts/" + id,
            success: function (response) {
                location.reload()
            }
        });
    }
})