$.ajax({
    type: "get",
    url: "/comments",
    success: function (response) {
        console.log(response)
        var html = template('commentsTpl' , response)
        $('#commentsBox').html(html)
        var pageHtml = template('commentsTpl' , response)
        $('#pageBox').html(pageHtml)
    }
});
function changePage() {
    $.ajax({
        type: "get",
        url: "/comments",
        data:{page},
        success: function (response) {
            console.log(response)
            var html = template('commentsTpl' , response)
            $('#commentsBox').html(html)
            var pageHtml = template('commentsTpl' , response)
            $('#pageBox').html(pageHtml)
        }
    });
}
// 处理时间格式
function dateFormat(date) {
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay()
}
$('#commentsBox').on('click','.status',function() {
    var status = $(this).attr('data-status')
    var id = $(this).attr('data-id')
    $.ajax({
        type: "put",
        url: "/comments/" + id,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function (response) {
            location.reload()
        }
    });
})
$('#commentsBox').on('click','.delete',function() {
    var id = $(this).attr('data-id')
    if (confirm('你确定要删除嘛?')){
        $.ajax({
            type: "delete",
            url: "/comments/" + id,
            success: function (response) {
                location.reload()
            }
        });
    }
})