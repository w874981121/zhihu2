function shareInfoFn(name) {
    var sec = (new Date("2020-1-1".replace(/-/ig, '/')).getTime() - new Date().getTime()) / 1000;
    var secDay = Math.floor(sec / 24 / 3600)
    const arrayShare = [{
        title: '致 2020 的「 你」',
        desc: '谁能想到， 2020 的你原来是这个样子',
    }, {
        title: '来自 2020 的「 你」',
        desc: `距离 2020 年还有 ${secDay} 天， 但似乎可以提前「 偷看」 一眼新年的你`,
    }, {
        title: '站着别动！ 2020！',
        desc: '我们来， 就好了',
    }, {
        title: '致 2020 的「 你」',
        desc: '去往 2020 年的入口已开启， 提前「 偷看」 2020 的你',
    }, {
        title: `2020 年的 ${name} 请你一定要…… ／ Hi， 2020 年的 ${name}`,
        desc: '新年到来前， 偷偷看一眼 2020 的你',
    }];

    // 获取随机数
    var sharerand = Math.floor(Math.random() * arrayShare.length);
    if (sharerand == 4) {
        sharerand = 0
    }

    var datashare = arrayShare[sharerand];
    var shareInfo = {
        title: datashare.title, // 分享到朋友圈与微信好友时的标题
        desc: datashare.desc, // 分享到微信好友的链接详情
        imgUrl: "https://event.zhihu.com/forward2020/img/icon.pic.jpg", // 分享到朋友圈与微信好友时的图片
        link: location.href, // 分享的链接，可能会有增加追踪参数的需求
        success: () => {
            // 微信 JS SDK 提供的分享成功回调，可以进行打点的操作
        }
    }
    window.zWechat.init().then(function () {
        wx.onMenuShareTimeline(shareInfo) // 设置分享到朋友圈信息
        wx.onMenuShareAppMessage(shareInfo) // 设置分享到微信好友信息，如有需要，两者可以不同
    });

    initZhihuHybrid(location.href)

    function initZhihuHybrid(shareurl) {
        window.zhihuHybrid &&
            window.zhihuHybrid.dispatch("share/setShareInfo", {
                zhihuMessage: {
                    title: datashare.title,
                    content: datashare.desc,
                },
                wechatTimeline: {
                    link: shareurl,
                    title: datashare.title,
                    imgUrl: "https://event.zhihu.com/forward2020/img/icon.pic.jpg"
                },
                wechatMessage: {
                    link: shareurl,
                    title: datashare.title,
                    imgUrl: "https://event.zhihu.com/forward2020/img/icon.pic.jpg",
                    desc: datashare.desc,
                },
                QQ: {
                    url: shareurl,
                    title: datashare.title,
                    content: datashare.desc,
                    imageURL: "https://event.zhihu.com/forward2020/img/icon.pic.jpg"
                },
                zone: {
                    url: shareurl,
                    title: datashare.title,
                    content: datashare.desc,
                    imageURL: "https://event.zhihu.com/forward2020/img/icon.pic.jpg"
                },
                weibo: {
                    url: shareurl,
                    title: datashare.title,
                    content: datashare.desc,
                    imageURL: "https://event.zhihu.com/forward2020/img/icon.pic.jpg"
                },
                pin: {
                    url: shareurl,
                    content: datashare.desc,
                    imageURL: "https://event.zhihu.com/forward2020/img/icon.pic.jpg"
                },
                copyLink: {
                    content: shareurl
                }
            });
    }

}