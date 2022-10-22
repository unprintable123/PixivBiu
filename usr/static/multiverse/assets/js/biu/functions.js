// 获取版本号
function getVersion() {
    $.ajax({
        type: "GET",
        url: 'api/biu/get/outdated/',
        success: function (rep) {
            rep = jQuery.parseJSON(JSON.stringify(rep));
            if (rep.code) {
                if (rep.msg.latest) {
                    $('#hint-current-verson').html(rep.msg.current);
                }
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}

// 检测更新
function checkOutdated() {
    $('#btnCheckUP').tooltipster('content', '检测中...');
    $.ajax({
        type: "GET",
        url: 'api/biu/get/outdated/',
        success: function (rep) {
            rep = jQuery.parseJSON(JSON.stringify(rep));
            if (rep.code) {
                if (rep.msg.latest) {
                    $('#btnCheckUP').tooltipster('content', '哇哦，这就是最新版本哦');
                } else {
                    $('#btnCheckUP').attr('onclick', 'javascript: window.open("https://biu.tls.moe/", "_blank")');
                    $('#btnCheckUP').html("可以更新啦");
                    $('#btnCheckUP').tooltipster('content', '有新版本了，点击进入官网下载');
                }
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}

// 结果 HTML 内容加载
function btnGetHTML(type) {
    if (type === 'none') {
        return '<article class="thumb"><a href="./" class="imageBtn"><img src="static/multiverse/images/tea.jpg" alt="无"" /></a><h2>什么都没有找到...</h2><p>这里什么都没有哦~</p></article>';
    }
}

// 获取 get 内容
function getGetArg(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return false;
}

// 修改搜索框内容
function changeSrhBox(c, is = 1) {
    if (c !== '') {
        $('#srhBox').val(c);
        srhBoxStu();
    }
    if (is > 0) {
        //$('.poptrox-popup').trigger('poptrox_close');
        $(window).scrollTop(0);
        $('#srhBox').focus();
        if (is > 1 && $('#srhBox').val() !== '') {
            srhBoxDo();
        }
    }
}

// tooltip 初始化
function loadTooltip(c = '.tooltip') {
    $(c).tooltipster({
        debug: false,
        trigger: 'custom',
        triggerOpen: {
            mouseenter: true,
            click: true,
            touchstart: true,
            tap: true
        },
        triggerClose: {
            mouseleave: true,
            scroll: true,
            touchleave: true,
            tap: true
        },
        theme: 'tooltipster-noir',
        animation: 'fade',
        animationDuration: 250,
        arrow: false,
        delay: 200,
    });
}

// 搜索设置显示动画
// function isShowSettings() {
//     if ($('#settings').css('display') === 'none') {
//         $('#main').addClass('aniMoveDown');
//         $('#settings').css('z-index', '999');
//         $('#settings').delay(300).fadeIn();
//     } else {
//         $('#settings').fadeOut(300);
//         $('#settings').css('z-index', '-999');
//         $('#main').removeClass('aniMoveDown');
//     }
// }

// 搜索动画
function cssShowLoading() {
    $('#settings').fadeOut(200);
    $('#settings').css('z-index', '-999');
    $('#main').removeClass('aniMoveDown');
    $('body').addClass('is-preload');
    document.getElementById('wrapper').id = 'wrapper-onload';
}

// 正则匹配
function regMatch(regex, str) {
    r = []
    while ((m = regex.exec(str)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        m.forEach((match, groupIndex) => {
            r[groupIndex] = match;
        });
    }
    return r;
}

// 下载全部图片
function dlPageAll() {
    if (confirm("你确定要一下子下载全部的图片嘛？！还是原图哎...\n其实点击图片右上角也可以下载。"))
        $('.thumbAction').each(function () {
            if ($(this).children('a:last')[0]['target'] !== '_blank') {
                $(this).children('a:last')[0].click();
            }
        });
}

// 切换面板
function togglePanel(id) {
    function toggleClassActive(_, className = "active") {
        if (_) {
            if (_.attr("class") && _.attr("class").includes(className))
                _.removeClass(className);
            else
                _.addClass(className);
        }
    }
    toggleClassActive($(id));
    // toggleClassActive($("body"), "content-active");
}

// 分割并排除空白项
function splitNoEmpty(c, symbol) {
    let r = [];
    const li = c.replace(" ", "").split(symbol);
    for (let i = 0; i < li.length; i++) {
        if (li[i])
            r.push(li[i])
    }
    return r;
}

// encodeURIComponent with [",']
function maybeEncode(c) {
    return encodeURIComponent(c).replaceAll("\"", "%22").replaceAll("'", "%27");
}

// XSS Prevention
function maybeXSS(c) {
    CHARS = { "<": "&lt;", "\"": "&quot;", "'": "&_quot;", "&": "&amp;" };
    const KEYS = Object.keys(CHARS);
    for (let i = 0; i < KEYS.length; i++) {
        const key = KEYS[i];
        c = c.replaceAll(key, CHARS[key]);
    }
    return c;
}

// Title Name
function changeTitleName(name, from = null) {
    if (from === null) from = "PixivBiu";
    name = name.replace(/[a-z]/, fl => fl.toUpperCase());
    const final = from ? `${name} - ${from}` : name;
    const _title = $("title");
    if (_title) _title.html(final); else return false;
    return true;
}

function getallimgs(){
    $('.oneworklist .originimg img').each(function (i, ele) {
        if (i) {
            $(ele).attr('src', $(ele).attr('unload'));
            $(ele).removeAttr('unload');
        }
    });
    $('.oneworklist .getmoreimg').remove();
}

function userWorksPreview(au_list) {
    var pre = {
        indexpage: 0,
        userID: au_list[0]['author']['id'],
        $container: document.getElementsByClassName('userworks-pre')[0],
        loadingComplete: 0,
        created: function() {
            var onappend = document.createDocumentFragment();
            for (var i = 0; i < au_list.length; i++) {
                onappend.appendChild(this.preloadImgContainer(au_list[i]));
            }
            this.$container.appendChild(onappend);
            this.$container.addEventListener('scroll', this._handleScrollTimer.bind(this));
        },
        _handleScrollTimer: function(e) {
            var s = this;
            if (s.scrollId) {
                clearTimeout(s.scrollId);
                s.scrollId = null;
            }
            s.scrollId = setTimeout(s.handleScroll.bind(this), 200);
            if (s.lastScrollTime === null || s.lastScrollTime + 200 < Date.now()) {
                s.lastTime = Date.now();
                setTimeout(s.handleScroll.bind(this), 200);
                clearTimeout(s.scrollId);
                s.scrollId = null;
            };
        },
        handleScroll: function () {
            var s = this;
            if (!s.loadingComplete && s.$container.scrollLeft + s.$container.clientWidth + 30 > s.$container.scrollWidth) {
                s.preload();
            }
        },
        preload: function() {
            var s = this;
            if (s.loadingComplete) {
                return;
            }
            s.indexpage += 1;
            $.ajax({
                type: "GET",
                url: "api/biu/get/idworks/",
                async: true,
                data: {
                    'userID': s.userID,
                    'type': 'illust',
                    'totalPage': tmpSearchSettings['pixivbiu_searchPageNum'],
                    'groupIndex': s.indexpage,
                },
                success: function(rep) {
                    rep = jQuery.parseJSON(JSON.stringify(rep));
                    if (rep.code) {
                        var au_list = rep.msg.rst.data;
                        if (au_list.length) {
                            var onappend = document.createDocumentFragment();
                            for (var i = 0; i < au_list.length; i++) {
                                onappend.appendChild(s.preloadImgContainer(au_list[i]));
                            }
                            s.$container.appendChild(onappend);
                        } else {
                            s.indexpage -= 1;
                            s.loadingComplete = 1;
                        }
                    }
                },
                error: function(e) {

                }
            });
        },
        preloadImgContainer: function(data) {
            var t = document.createElement('a');
            var ii = document.createElement('img');
            var imgUrl = data.all.image_urls.square_medium.replace('https://i.pximg.net', tmpSearchSettings['pixivbiu_RvrProxyUrl']);
            ii.src = imgUrl;
            t.className = 'userPreImg';
            t.target = '_blank';
            t.href = '?code=%40w%3D' + data.id.toString();
            t.appendChild(ii);
            return t;
        }
    };
    pre.created();
}


function _waterfall() {
    if (tmpPageData.rst.data.length === 0) {
        rstHtml = btnGetHTML('none');
        $('#main').html(rstHtml);
        return;
    }
    $('#main').empty();
    if (tmpPageData.args.ops.method === 'userWorks') {
        var userImgSrc = tmpPageData.rst.data[0].all.user.profile_image_urls.medium.replace('https://i.pximg.net', tmpSearchSettings['pixivbiu_RvrProxyUrl']);
        $('#main').append('<div class="user-details"><img src="' + userImgSrc + '"><span>' + tmpPageData.rst.data[0].author.name
        + '</span><div id="account">' + tmpPageData.rst.data[0].author.account + '</div><div id="uid">' + tmpPageData.rst.data[0].author.id + '</div></div>');
    }
    $('#main').append('<div id="waterfall"></div>')
    var template = document.createElement('div');
    template.id = '0';
    template.className = 'thumb is-preload';
    template.innerHTML = '<div class="thumb-box"><a target="_blank"><div class="img-container"><img class="listimg"></div><h2 class="title-box"><span></span></h2></a><section class="thumbAction"><d class="tooltip" title="numbers"><img class="layer-icon" src="static/multiverse/assets/css/images/layer-icon.svg"><span class="layers-number"></span></d></section></div>';
    var grave = document.createElement('div');
    grave.id = '0';
    grave.className = 'grave';
    grave.innerHTML = '<div class="loading-icon"></div>';
    var wf = {
        indexpage: Number(tmpPageData.args.ops.groupIndex),
        args: tmpPageData.args,
        data: tmpPageData.rst.data,
        scrollGroup: [],
        onview: [],
        onviewCache: new Array(30),
        lastScrollTime: null,
        lastResizeTime: null,
        scrollId: null,
        resizeId: null,
        columnHeights: [],
        columnTranslateX: [],
        minWidth: 240,
        scrollBuffer: 1000,
        $container: document.getElementById('waterfall'),
        boxWidth: 0,
        containerHeight: 0,
        resetFocus: -1,
        resetOffset: 0,
        loadingComplete: 0,
        pendding: 0,
        template: template,
        grave: grave,
        created: function() {
            this.resetPositionMap();
            window.addEventListener('scroll', this._handleScrollTimer.bind(this));
            window.addEventListener('resize', this._handleResizeTimer.bind(this));
        },
        _handleScrollTimer: function(e) {
            var s = this;
            if (s.scrollId) {
                clearTimeout(s.scrollId);
                s.scrollId = null;
            }
            s.scrollId = setTimeout(s.handleScroll.bind(this), 250);
            if (s.lastScrollTime === null || s.lastScrollTime + 250 < Date.now()) {
                s.lastTime = Date.now();
                setTimeout(s.handleScroll.bind(this), 250);
                clearTimeout(s.scrollId);
                s.scrollId = null;
            };
        },
        _handleResizeTimer: function(e) {
            var s = this;
            if (s.resizeId) {
                clearTimeout(s.resizeId);
                s.resizeId = null;
            }
            s.resizeId = setTimeout(s.handleResize.bind(this), 200);
            if (s.lastResizeTime === null || s.lastResizeTime + 200 < Date.now()) {
                s.lastTime = Date.now();
                setTimeout(s.handleResize.bind(this), 200);
                clearTimeout(s.resizeId);
                s.resizeId = null;
            };
        },
        handleScroll: function() {
            var s = this;
            s.resetFocus = -1;
            s.resetOffset = 0;
            var _y = window.pageYOffset;
            var my = s.scrollBuffer + document.documentElement.clientHeight
            var miny = _y - my;
            miny = Math.floor(miny / 500);
            var maxy = _y + my;
            maxy = Math.floor(maxy / 500);
            s.onview = []
            if (maxy >= s.scrollGroup.length - 1 && !s.pendding) {
                s.preload();
            }
            if (maxy >= s.scrollGroup.length) {
                maxy = s.scrollGroup.length - 1;
            }
            if (miny < 0) {
                miny = 0;
            }

            for (var i = miny; i <= maxy; i++) {
                s.onview = s.onview.concat(s.scrollGroup[i]);
            }

            s._forceUpdate();



        },
        handleResize: function() {
            var s = this;
            var _height = window.pageYOffset - $(s.$container).offset().top;
            if (s.resetFocus == -1) {
                if (s.onview.length === 0) {
                    s.resetFocus = -1;
                    s.resetOffset = 0;
                } else {
                    var i = s.onview[0];
                    while (s.data[i]['translateY'] < _height) {
                        i++;
                    }
                    s.resetFocus = i;
                    s.resetOffset = _height - s.data[i]['translateY'];
                }
            }
            s.resetPositionMap();
        },
        resetPositionMap: function() {
            var s = this;
            var width = s.getWidth();
            s.$container.innerHTML = '';
            s.columnHeights = new Array(Math.floor((width + 25) / (s.minWidth + 25)));
            s.columnHeights.fill(0);
            s.columnTranslateX = new Array(s.columnHeights.length);
            var _w = (width - 25 * (s.columnHeights.length - 1)) / s.columnHeights.length;
            s.boxWidth = _w;
            for (var i = 0; i < s.columnTranslateX.length; i++) {
                s.columnTranslateX[i] = i * (25 + _w);
            }
            for (var i = 0; i < s.data.length; i++) {
                var _t = -1;
                var min = 2020202020;
                for (var j = 0; j < s.columnHeights.length; j++) {
                    if (min > s.columnHeights[j]) {
                        min = s.columnHeights[j];
                        _t = j;
                    }
                }
                s.data[i]['translateX'] = s.columnTranslateX[_t];
                s.data[i]['translateY'] = s.columnHeights[_t];
                s.columnHeights[_t] += s.getImgContainerHeight(i);
            }
            var max = 0;
            for (var j = 0; j < s.columnHeights.length; j++) {
                if (max < s.columnHeights[j]) {
                    max = s.columnHeights[j];
                }
            }
            s.changeContainerHeight(max);
            s.scrollGroup = [];
            var lay = 0;
            var i = 0;
            var gg = [];
            while (i < s.data.length) {
                if (lay == Math.floor(s.data[i]['translateY'] / 500)) {
                    gg.push(i);
                    i++;
                } else {
                    s.scrollGroup.push(gg);
                    gg = [];
                    lay += 1;
                }
            }
            s.scrollGroup.push(gg)
            gg = [];

            if (s.resetFocus >= 0) {
                window.scrollTo(0, s.data[s.resetFocus]['translateY'] + s.resetOffset + $(s.$container).offset().top);
            }
            s.handleScroll();
        },
        _forceUpdate: function() {
            var s = this;
            var al = [];
            var ch = s.$container.children;
            for (var i = 0; i < ch.length; i++) {
                var k = Number(ch[i].id);
                if (s.onview.includes(k)) {
                    al.push(k);
                } else {
                    s.$container.removeChild(ch[i]);
                    i--;
                }
            }
            ch = null;
            var onappend;
            if (al.length === 0) {
                onappend = document.createDocumentFragment();
                for (let i = 0; i < s.onview.length; i++) {
                    onappend.appendChild(s.preloadImgContainer(s.onview[i]));
                }
                s.$container.appendChild(onappend);
            } else {
                var st = s.onview.indexOf(al[0]);
                var ed = s.onview.indexOf(al[al.length - 1])
                if (st !== 0) {
                    onappend = document.createDocumentFragment();
                    for (var i = 0; i < st; i++) {
                        onappend.appendChild(s.preloadImgContainer(s.onview[i]));
                    }
                    s.$container.insertBefore(onappend, s.$container.firstChild);
                }

                if (ed + 1 < s.onview.length) {
                    onappend = document.createDocumentFragment();
                    for (var i = ed + 1; i < s.onview.length; i++) {
                        onappend.appendChild(s.preloadImgContainer(s.onview[i]));
                    }
                    s.$container.appendChild(onappend);
                }

            }
            onappend = null;
        },
        preload: function() {
            var s = this;
            if (s.pendding || s.loadingComplete) {
                return 1;
            }

            var _url = '';
            var data = {};

            if (s.args.ops.method === 'rank') {
                s.indexpage += 1;
                _url = "api/biu/get/rank/";
                data = {
                    'mode': s.args.fun.mode,
                    'date': tmpFilters['pixivbiu_filterRkDate'] ? tmpFilters['pixivbiu_filterRkDate'] : 0,
                    'totalPage': tmpSearchSettings['pixivbiu_searchPageNum'],
                    'groupIndex': s.indexpage
                };
            }

            if (s.args.ops.method === 'userWorks') {
                s.indexpage += 1;
                _url = "api/biu/get/idworks/";
                data = {
                    'userID': s.args.fun.userID,
                    'type': 'illust',
                    'totalPage': tmpSearchSettings['pixivbiu_searchPageNum'],
                    'groupIndex': s.indexpage,
                };
            }

            if (s.args.ops.method === 'works') {
                s.indexpage += 1;
                _url = "api/biu/search/works/";
                data = {
                    'kt': s.args.fun.kt,
                    'mode': s.args.fun.mode,
                    'totalPage': tmpSearchSettings['pixivbiu_searchPageNum'],
                    'isCache': s.args.ops.isCache,
                    'groupIndex': s.indexpage
                }
            }

            if (s.args.ops.method === 'recommend') {
                s.indexpage += 1;
                _url = "api/biu/get/recommend/";
                data = {
                    'type': s.args.fun.type,
                    'totalPage': tmpSearchSettings['pixivbiu_searchPageNum'],
                    'groupIndex': s.indexpage
                }
            }

            if (s.args.ops.method === 'userMarks') {
                s.indexpage += 1;
                _url = "api/biu/get/idmarks/";
                data = {
                    'userID': s.args.fun.userID,
                    'restrict': s.args.fun.restrict,
                    'groupIndex': s.indexpage,
                    'tmp': s.args.ops.tmp
                }
            }

            if (_url != '') {
                s.pendding = 1;
                $.ajax({
                    type: "GET",
                    url: _url,
                    data: data,
                    success: function(rep) {
                        s.pendding = 0;
                        rep = jQuery.parseJSON(JSON.stringify(rep));
                        if (rep.code) {
                            tmpPageData = rep.msg;
                            if (tmpPageData.rst.data.length) {
                                var l = s.data.length;
                                s.data = s.data.concat(tmpPageData.rst.data);
                                for (var i = l; i < s.data.length; i++) {
                                    var _t = -1;
                                    var min = 2020202020;
                                    for (var j = 0; j < s.columnHeights.length; j++) {
                                        if (min > s.columnHeights[j]) {
                                            min = s.columnHeights[j];
                                            _t = j;
                                        }
                                    }
                                    s.data[i]['translateX'] = s.columnTranslateX[_t];
                                    s.data[i]['translateY'] = s.columnHeights[_t];
                                    s.columnHeights[_t] += s.getImgContainerHeight(i);
                                }
                                var max = 0;
                                for (var j = 0; j < s.columnHeights.length; j++) {
                                    if (max < s.columnHeights[j]) {
                                        max = s.columnHeights[j];
                                    }
                                }

                                s.onviewCache.concat(new Array(30));

                                s.changeContainerHeight(max);
                                var newscrollgroup = new Array();
                                /*
                                for (var i = 0; i < s.scrollGroup.length; i++) {
                                    newscrollgroup[i] = s.scrollGroup[i];
                                }
                                for (var i = l; i < s.data.length; i++) {
                                    newscrollgroup[Math.floor(s.data[i]['translateY'] / 500)].push(i);
                                }*/
                                var i = l;
                                var lay = 0;
                                var gg = s.scrollGroup[0];
                                while (i < s.data.length) {
                                    if (lay == Math.floor(s.data[i]['translateY'] / 500)) {
                                        gg.push(i);
                                        i++;
                                    } else {
                                        newscrollgroup.push(gg);
                                        lay++;
                                        if (lay < s.scrollGroup.length) {
                                            gg = s.scrollGroup[lay];
                                        } else {
                                            gg = [];
                                        }
                                    }

                                }
                                newscrollgroup.push(gg);
                                gg = [];

                                s.scrollGroup = newscrollgroup;
                                s.handleScroll();
                            } else {
                                //s.indexpage -= 1;
                                console.log('allImgDataLoaded')
                                s.loadingComplete = 1;
                            }
                        } else {
                            console.log('Error :<');
                        }

                    },
                    error: function(e) {
                        console.log('Error :<');
                    }
                });
            }

        },
        getWidth: function() {
            return this.$container.offsetWidth;
        },
        changeContainerHeight: function(he) {
            var s = this;
            s.containerHeight = he;
            s.$container.style.height = he.toString() + 'px';
        },
        preloadImgContainer: function(i) {
            var s = this;
            let li = new Image();
            let g = s.createGrave(i);
            let ci = s.createImgContainer(i);
            li.onload = function() {
                setTimeout(function() {
                    try {
                        s.$container.replaceChild(ci, g);
                        setTimeout(function(){
                            ci.className = 'thumb';
                        }, 50);
                    } catch (err) {
                        //console.log(err);
                    }
                }, 50);

            }
            li.src = s.data[i]['image_urls']['medium'].replace('https://i.pximg.net', tmpSearchSettings['pixivbiu_RvrProxyUrl']);
            return g;
        },
        createGrave: function(i) {
            var s = this;
            var _h = s.getImgContainerHeight(i) - 25;
            var t = s.grave.cloneNode(true);
            t.id = i.toString();
            t.style = 'width:' + s.boxWidth.toFixed(2) + 'px;height:' + _h.toFixed(2) + 'px;transform:translateX(' + s.data[i]['translateX'].toFixed(2) + 'px) translateY(' + s.data[i]['translateY'].toFixed(2) + 'px)';
            return t;
        },
        createImgContainer: function(i) {
            var s = this;
            var _h = s.getImgContainerHeight(i) - 25;
            if (s.onviewCache[i]) {
                s.onviewCache[i].style = 'width:' + s.boxWidth.toFixed(2) + 'px;height:' + _h.toFixed(2) + 'px;transform:translateX(' + s.data[i]['translateX'].toFixed(2) + 'px) translateY(' + s.data[i]['translateY'].toFixed(2) +
                    'px)';
                return s.onviewCache[i];
            }
            var extra = '';
            var imgUrlCover = s.data[i]['image_urls']['medium'].replace('https://i.pximg.net', tmpSearchSettings['pixivbiu_RvrProxyUrl']);
            var imgUrl = s.data[i]['image_urls']['large'].replace('https://i.pximg.net', tmpSearchSettings['pixivbiu_RvrProxyUrl']);


            var bookedNum = s.data[i]['total_bookmarked'];
            var t = s.template.cloneNode(true);
            t.id = i.toString();
            t.style = 'width:' + s.boxWidth.toFixed(2) + 'px;height:' + _h.toFixed(2) + 'px;transform:translateX(' + s.data[i]['translateX'].toFixed(2) + 'px) translateY(' + s.data[i]['translateY'].toFixed(2) + 'px)';
            var tb = t.children[0];
            var se = tb.children[1];
            var tb = tb.children[0];
            tb.href = '.?code=%40w%3D' + s.data[i]['id'];
            tb.children[0].children[0].src = imgUrlCover;
            tb.children[0].children[0].alt = s.data[i]['title'];
            tb.children[1].children[0].innerHTML = s.data[i]['title'];
            /*tb = se.children[0];
            if (s.data[i]['is_bookmarked']) {
                tb.href = 'javascript: doBookmark(' + s.data[i]['id'] + ', \'del\')';
                tb.children[0].title = '取消收藏';
                tb.children[0].innerHTML = '<hicon>💘</hicon> ' + bookedNum;
            } else {
                tb.href = 'javascript: doBookmark(' + s.data[i]['id'] + ', \'add\')';
                tb.children[0].innerHTML = '<hicon>💗</hicon> ' + bookedNum;
            }*/
            if (s.data[i]['all']['meta_pages'].length > 0) {
                se.children[0].children[1].innerHTML = s.data[i]['all']['meta_pages'].length.toString();
            } else {
                se.removeChild(se.children[0]);
            }
            s.onviewCache[i] = t;
            return t;
        },
        getImgContainerHeight: function(i) {
            var s = this;
            var _h = s.boxWidth * s.data[i]['all']['height'] / s.data[i]['all']['width'];
            var ch = document.documentElement.clientHeight;
            if (_h < 0.2 * ch) {
                _h = 0.2 * ch;
            }
            if (_h > 2 * ch) {
                _h = 2 * ch;
            }
            return _h + 25;
        }
    }
    wf.created();
}
