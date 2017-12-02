const fs = require('fs'),
    path = require('path'),
    glob = require('glob');
var uid = 0,
    fid = 0;
const getFiles = function getFiles($path, id) {
    id = id ? id + '-' : '';
    var $dir = [];
    var $file = {
        path: $path,
        files: [],
        dep: false,
        child: [],
        name: path.basename($path),
        fid: id + (fid++)
    };
    var dir = [];
    var files = fs.readdirSync($path);
    for (var i = 0; i < files.length; i++) {
        if (files[i].indexOf('.') == 0 || files[i].indexOf('node_modules') > -1) continue;
        var that = path.join($path, files[i]);

        if (isDir(that)) {
            $file.dep = true;
            $file.child.push(getFiles(that, $file.fid))
                // $file.files = $file.files.concat(getFiles(that).files, $file.fid);
        }

        if (isFile(that)) {
            var extname = path.extname(that).toLowerCase();
            if ('.mp4 .rmvb .mkv .avi '.indexOf(extname) > -1) {
                $file.files.push({ path: that, id: uid++, name: path.basename(that) });
            }
        }
    }

    $file.files.sort(function(a, b) {
        return a.name.localeCompare(b.name);
    });

    $file.child.sort(function(a, b) {
        return a.name.localeCompare(b.name);
    });

    return $file;
}



function exists(path) {
    return fs.existsSync(path) || path.existsSync(path);
}

function isFile(path) {
    return exists(path) && fs.statSync(path).isFile();
}

function isDir(path) {
    return exists(path) && fs.statSync(path).isDirectory();
}


function inline(video) {
    var list = video.files;
    if (video.child.length) {
        video.child.forEach(function(child) {
            var next = inline(child);
            list = list.concat(next);
        }, this);
    }
    return list;
}

function getList(v, fid, pid) {
    if (fid == '') return v;
    var ids = fid.split('-');
    var id = ids.shift();
    id && pid.push(id);
    for (var i = 0; i < v.child.length; i++) {
        var child = v.child[i];
        if (child.fid == pid.join('-')) {
            return getList(child, ids.join('-'), pid);
        }
    }
}

module.exports = {
    getFileJson: getFiles,
    inline,
    getList,
};