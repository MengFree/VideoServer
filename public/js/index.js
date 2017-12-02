$(function() {
    $("body").on('click', '.btn-paly', function() {
        var id = $(this).attr('data-id');
        $.get('/api/getPath?id=' + id).then(function(res) {
            $("#alert").attr('src', res);
            $('#mod').modal('show');
        })
    })
    $("#videoPlayer").click(function() {
        const VP = document.getElementById('videoPlayer')
        if (VP.paused) VP.play()
        else VP.pause()
    })
    $("#search-btn").click(function() {
        search();
    });
    $("#search").on('input', search)
    $("#search").keydown(function(e) {
        if (e.keyCode == 13) {
            search();
        }
    });

    function search() {
        var key = $("#search").val().trim().toLowerCase();
        if (key == '') return $("#result").addClass('hide');
        var arr = key.split(' ');
        var li = $("#box .list-group-item");
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            var w = arr[i];
            if (w == '') continue;
            var li = searchBy(w, li);
        }
        if (li.length == 0) {
            li = '没搜到啊！';
        }
        $("#result").html(li).removeClass('hide');
    }

    function searchBy(key, arr) {
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            var element = $(arr[i]);
            var name = element.text().toLowerCase();
            if (name.indexOf(key) > -1) {
                result.push(element.clone());
            }
        }
        return result;
    }


})

function creatImg() {
    const video = document.getElementById('videoPlayer');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const imgHeight = video.videoHeight;
    const imgWidth = video.videoWidth;
    ctx.drawImage(video, 0, 0, imgWidth, imgHeight);

    const imgSrc = canvas.toDataURL('image/png');
    var img = document.createElement('img')
    img = $(img).attr('src', imgSrc);
    $('body').append(img);
    console.log(imgSrc);
}