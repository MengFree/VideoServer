$(function() {
    $("#searchAll-btn").click(function() {
        search();
    });
    $("#searchAll").keydown(function(e) {
        if (e.keyCode == 13) {
            search();
            this.blur();
        }
    });

    function search() {
        var key = $("#searchAll").val().trim().toLowerCase();
        if (key == '') return $("#result").addClass('hide');
        $.ajax({
            type: "get",
            url: "/api/search",
            data: { key: key },
            dataType: "json",
            success: function(res) {
                var li = [];
                for (var i = 0; i < res.length; i++) {
                    var tmp = `<div style="word-break: break-all;word-wrap: break-word;" class="list-group-item">
                    <span style="margin-right:1em;" class="glyphicon glyphicon-film"></span>
                    <a href="/paly/{id}">{name}</a>
                    <button data-id="{id}" class="btn btn-primary btn-xs btn-paly">
                    <span class="glyphicon glyphicon-play">
                    </span></button>
                    </div>`;
                    var item = res[i];
                    li.push(tmp.replace(/\{id\}/g, item.id).replace('{name}', item.name));
                }
                $("#num").html(li.length);
                $("#result").html(li).removeClass('hide');
            }
        });
        // var arr = key.split(' ');
        // var li = $("#box .list-group-item");
        // var result = [];
        // for (var i = 0; i < arr.length; i++) {
        //     var w = arr[i];
        //     var tmp = '<div style="word-break: break-all;word-wrap: break-word;" class="list-group-item"><span style="margin-right:1em;" class="glyphicon glyphicon-film"></span><a href="/paly/{id}">{name}</a></div>';
        //     if (w == '') continue;
        //     var li = searchBy(w, li);
        // }
        // if (li.length == 0) {
        //     li = '没搜到啊！';
        // }
        // $("#result").html(li).removeClass('hide');
    }

})