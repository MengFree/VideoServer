// 引入fs文件处理模块
var fs = require("fs");
var path = require('path');

function rename(files, reg) {
    files.forEach(function(file) {
        //运用正则表达式替换oldPath中不想要的部分
        var oldPath = file.path;
        var name = path.basename(oldPath);
        var newName = name.replace(reg, '');
        var newPath = oldPath.replace(name, newName);
        fs.rename(oldPath, newPath, function(err) {
            if (!err) {
                console.log(name, '==>', newName);
            }
        });
    })
}
module.exports = rename;