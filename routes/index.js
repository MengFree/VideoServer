var express = require('express');
var router = express.Router();
const path = require('path');
const util = require('../util');
const conf = require('../config');
const filePaths = conf.paths;
var files = {},
    all = [];

function renderList(res, list, key) {
    res.render('index', {
        title: '我的电影',
        list: list,
        name: function(src) {
            if (typeof src === 'string') {
                return path.basename(src);
            } else {
                console.log('notfound!!', src);
            }
        },
        file: function(src) {
            return src.split(key)[1];
        },
        urls: function() {
            return Object.keys(filePaths);
        }
    });
};

/**
 * 绑定文件夹路由
 */
for (var k in filePaths) {
    files[k] = util.getFileJson(path.join(__dirname, filePaths[k]));
    all = all.concat(util.inline(files[k]));
    (function(k) {
        router.get('/' + k, function(req, res) {
            if (k == conf.index) return res.redirect('/');

            var folderId = req.query.folder;
            var list = files[k];
            if (folderId) {
                list = util.getList(files[k], folderId.replace(files[k].fid + '-', ''), [files[k].fid]);
            }
            renderList(res, list, k)
        });
    })(k)
}

/**
 * 默认主页
 */
router.get('/', function(req, res) {
    var folderId = req.query.folder;
    var home = files[conf.index];
    var list = home;
    if (folderId) {
        list = util.getList(home, folderId.replace(home.fid + '-', ''), [home.fid]);
    }
    renderList(res, list, conf.index);
});

/**
 * 搜索页
 */
router.get('/search', function(req, res) {
    res.render('search', {
        title: '全站搜索',
    });
});

/**
 * 播放页
 */
router.get('/paly/:id', function(req, res) {
    var src = 'src';
    var name = '';
    var err = true;
    for (var i = 0; i < all.length; i++) {
        var file = all[i];
        if (file.id == req.params.id) {
            src = file.path.indexOf('Video') > -1 ? file.path.split("Video")[1] : file.path.split("hhe")[1];
            name = path.basename(file.path);
            err = false;
            break;
        }
    }
    res.render('play', {
        title: name,
        src: src,
        err: err
    });
});

/**
 * 获取视频播放路径
 */
router.get('/api/getPath', function(req, res) {
    var src = 'src';
    for (var i = 0; i < all.length; i++) {
        var file = all[i];
        if (file.id == req.query.id) {
            src = file.path.indexOf('Video') > -1 ? file.path.split("Video")[1] : file.path.split("hhe")[1];
            name = path.basename(file.path);
            break;
        }
    }
    res.send(src);
});

/**
 * 获取播放列表
 */
router.get('/api/getList', function(req, res) {
    var list = util.getFileJson([path.join(__dirname, '../../Video')]);
    res.send(list);
});

/**
 * 全局搜索视频
 */
router.get('/api/search', function(req, res) {
    var key = req.query.key;
    var result = [];
    key && all.forEach(function(file) {
        var $path = file.path;
        if ($path.toLowerCase().indexOf(key.toLowerCase()) > -1) {
            result.push(file);
        }
    }, this);
    res.json(result);
});

module.exports = router;