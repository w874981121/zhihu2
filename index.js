/*
mainClass      滑动父容器类名
firstClass     第一页的类名
num            总页数
*/
var passiveSupported = false;
try {
    var options = Object.defineProperty({}, "passive", {
        get: function () {
            passiveSupported = true;
        }
    });
    window.addEventListener("test", null, options);
} catch (err) {}

var startX = 0, //初始横坐标
    startY = 0, //初始纵坐标
    touchFlag = true; //可滑动标志 true 可滑动，false 不可滑
function fullPage(mainClass, firstClass, num, callback) {
    var marginTop = 0, //上下滑动变量
        touchNum = 0, //上滑极限，是否可以上滑
        page = document.getElementsByClassName(mainClass)[0],
        pageFirst = document.getElementsByClassName(firstClass)[0];
    var fn1 = function (e) {
            // e.preventDefault();
            startX = e.targetTouches[0].clientX;
            startY = e.targetTouches[0].clientY;
        },
        fn2 = function (e) {
            // e.preventDefault();
            startX = 0;
            startY = 0;
            callback(touchNum)
            clickSwitch(touchNum)
        },
        fn3 = function (e) {
            // e.preventDefault();
            var newX = e.targetTouches[0].clientX,
                bodyHeight = document.body.offsetHeight,
                newY = e.targetTouches[0].clientY;

            if (newY - startY > 50) {
                if (touchFlag == true && touchNum > 0) {
                    console.log("下滑");
                    touchFlag = false;
                    marginTop += 1;
                    touchNum -= 1;
                    pageFirst.style.marginTop = marginTop * bodyHeight + "px";
                }
            } else if (newY - startY < -50) {
                if (touchFlag == true && marginTop > -num + 1) {
                    console.log("上滑");
                    touchFlag = false;
                    marginTop -= 1;
                    touchNum += 1;
                    pageFirst.style.marginTop = marginTop * bodyHeight + "px";
                }
            }
        };
    //获取触摸的初识坐标
    page.addEventListener("touchstart", fn1, passiveSupported ? {
        passive: true
    } : false)
    //重置触摸的坐标值
    page.addEventListener("touchend", fn2, passiveSupported ? {
        passive: true
    } : false)
    //监听并实现 上、下 滑动效果
    page.addEventListener("touchmove", fn3, passiveSupported ? {
        passive: true
    } : false)
    return {
        currentPage: 0,
        clickPage: (num) => {
            this.currentPage = num
            var pageFirst = document.getElementsByClassName(firstClass)[0];
            clickSwitch(num)
            touchNum = num
            marginTop = -num
            pageFirst.style.marginTop = -num * document.body.offsetHeight + "px";
        },
        fixMargin: () => {
            var pages = document.getElementsByClassName('page'),
                pageTop = document.getElementsByClassName(firstClass)[0]
            Array.prototype.forEach.call(pages, function (ele) {
                // console.log(ele)
                ele.style.transition = '0s'
            })
            pageTop.style.marginTop = -this.currentPage * document.body.offsetHeight + "px"
            setTimeout(function () {
                Array.prototype.forEach.call(pages, function (ele) {
                    ele.style.transition = '0.5s ease-in'
                })
            }, 100)
        }
    }
};

function statePage(val) {
    var arry = [0, 1]; //数组内代表可以滑动的page 0代表第一页
    if (arry.indexOf(val) > -1) {
        touchFlag = true;
    } else {
        touchFlag = false;
    }

    // location.search = "?" + val
};

const fullPageJump = fullPage("active_page", "f-pageFirst", 10, function (val) {
    // clickSwitch(val + 2)
    statePage(val)
});

// 默认开启第几行
// fullPageJump.clickPage(7)

// click问题记录
const clickQuestion = function (num, loc) {
    let obj = JSON.parse(localStorage.getItem("RECORD")) || [];
    obj[num] = loc;
    // 记录下当前选项
    localStorage.setItem("RECORD", JSON.stringify(obj));
    // 跳转下一页
    fullPageJump.clickPage(Number(num) + 4)
    statePage(Number(num) + 4)
};

function clickButton() {
    let nameText = $("#inputname").val()
    if (!nameText) {
        return alert("请输入名字")
    }
    fullPageJump.clickPage(8);
    let RECORD = JSON.parse(localStorage.getItem("RECORD"));
    let obj = [];
    let path = "./img/answer/"
    RECORD.map((item, i) => {
        let rand = Math.floor(Math.random() * 3) + 1;
        obj.push(path + (i - 0 + 1) + `_${item}_${rand}.jpg`)
    })
    obj.splice(Math.floor(Math.random() * 3), 1)
    // 渲染保存图
    canvasDrawImg("myCanvas", "./img/11_bg.jpg", obj, nameText, function (imgdata) {
        $("#bgBase64").attr("src", imgdata);
    })
    // 渲染背景图片
    canvasDrawImg2("myCanvas2", "./img/10_neirongqu.png", obj, nameText, function (data) {
        $("#bgBase64png").attr("src", data);
        countDown(5);
        shareInfoFn(nameText)
    })
}

function countDown(num) {
    setTimeout(() => {
        num--
        if (num <= 0) {
            fullPageJump.clickPage(9);
        } else {
            if (num <= 3) {
                $(".loading").html(num)
            } else if (num > 3) {
                $(".loading").html("<span></span><span></span>")
                setTimeout(() => {
                    $(".loading").html("<span></span><span></span><span></span>")
                }, 600);
            }
            countDown(num)
        }
    }, 1000)
}

// 重新偷看
function rePeek() {
    fullPageJump.clickPage(3);
}

// 让它查看
function seeShare() {
    let UA = navigator.userAgent;
    let zhihuState = UA.indexOf("ZhihuHybrid") > -1;
    if (zhihuState) {
        window.zhihuHybrid && window.zhihuHybrid.dispatch("share/showShareActionSheet");
    } else {
        $("#assistan-share-info").attr("style", "display:block")
    }
}

function guanbi() {
    $("#assistan-share-info").attr("style", "display:none")
}

// 动画控制台模块
// 说明：在页面滑入时调用响应的动画模块即可
// 循环执行动画 infinite
// 动画执行时长 "animation-duration":"2s"
// 动画延时执行 "-webkit-animation-delay":"0.5s","animation-delay":"0.5s"
//
function clickSwitch(num) {

    switch (num + 1) {
        case 2:
            page2_animate();
            break;
        case 3:
            page3_animate();
            break;
        case 4:
            page4_animate();
            break;
        case 5:
            page5_animate();
            break;
        case 6:
            page6_animate();
            break;
        case 7:
            page7_animate();
            break;
        case 8:
            page8_animate();
            break;
        case 9:
            page9_animate();
            break;
        case 10:
            page10_animate();
            break;
    }
};

// input 焦点绑定事件，弹出气泡
$("#inputname").focus(function () {
    $(".box8 .qipao img").addClass("animated bounceIn");
});

// 首页默认执行
page1_animate();

// 页面1动画效果
function page1_animate() {
    $(".box1 .jiiantou img").css({});
    $(".box1 .jiiantou img").addClass("animated fadeInDown infinite");
    $(".box1 .jiiantou img").css({
        "animation-duration": "2s"
    });
}
// 页面2动画效果
function page2_animate() {
    $(".box2 .w_1").addClass("animated fadeIn");
    $(".box2 .w_1").css({
        "animation-duration": "2s",
        "-webkit-animation-delay": "1s",
        "animation-delay": "1s"
    })
    $(".box2 .w_2").addClass("animated fadeIn");
    $(".box2 .w_2").css({
        "animation-duration": "2s",
        "-webkit-animation-delay": "2s",
        "animation-delay": "2s"
    })
    $(".box2 .w_3").addClass("animated fadeIn");
    $(".box2 .w_3").css({
        "animation-duration": "2s",
        "-webkit-animation-delay": "3s",
        "animation-delay": "3s"
    })
    $(".box2 .w_4").addClass("animated fadeIn");
    $(".box2 .w_4").css({
        "animation-duration": "2s",
        "-webkit-animation-delay": "4s",
        "animation-delay": "4s"
    })
    $(".box2 .w_5").addClass("animated fadeIn");
    $(".box2 .w_5").css({
        "animation-duration": "2s",
        "-webkit-animation-delay": "5s",
        "animation-delay": "5s"
    })
    $(".box2 .w_6").addClass("animated fadeIn");
    $(".box2 .w_6").css({
        "animation-duration": "2s",
        "-webkit-animation-delay": "6s",
        "animation-delay": "6s"
    })

    $(".box2 .jiiantou img").addClass("animated fadeInDown infinite");
    $(".box2 .jiiantou img").css({
        "animation-duration": "2s",
        "-webkit-animation-delay": "0.5s",
        "animation-delay": "0.5s"
    });
}
// 页面3动画效果
function page3_animate() {
    $(".box3 .w_1").addClass("animated fadeIn");
    $(".box3 .w_1").css({
        "animation-duration": "2s",
        "-webkit-animation-delay": "1s",
        "animation-delay": "1s"
    })
    $(".box3 .w_2").addClass("animated fadeIn");
    $(".box3 .w_2").css({
        "animation-duration": "2s",
        "-webkit-animation-delay": "2s",
        "animation-delay": "2s"
    })
    $(".box3 .w_3").addClass("animated fadeIn");
    $(".box3 .w_3").css({
        "animation-duration": "2s",
        "-webkit-animation-delay": "3s",
        "animation-delay": "3s"
    })
    $(".box3 .w_4").addClass("animated fadeIn");
    $(".box3 .w_4").css({
        "animation-duration": "2s",
        "-webkit-animation-delay": "4s",
        "animation-delay": "4s"
    })
    $(".box3 .w_5").addClass("animated fadeIn");
    $(".box3 .w_5").css({
        "animation-duration": "2s",
        "-webkit-animation-delay": "5s",
        "animation-delay": "5s"
    })
    $(".box3 .w_6").addClass("animated fadeIn");
    $(".box3 .w_6").css({
        "animation-duration": "2s",
        "-webkit-animation-delay": "6s",
        "animation-delay": "6s"
    })
    $(".box3 .w_7").addClass("animated fadeIn");
    $(".box3 .w_7").css({
        "animation-duration": "2s",
        "-webkit-animation-delay": "7s",
        "animation-delay": "7s"
    })
    $(".box3 .w_8").addClass("animated fadeIn");
    $(".box3 .w_8").css({
        "animation-duration": "2s",
        "-webkit-animation-delay": "8s",
        "animation-delay": "8s"
    })

    $(".box3 .button img").addClass("animated fadeIn");
    $(".box3 .button img").css({
        "-webkit-animation-delay": "2s",
        "animation-delay": "2s"
    });
}
// 页面4动画效果
function page4_animate() {

    $(".box4 .question_a img").css({})
    $(".box4 .question_b img").css({})
    $(".box4 .question_c img").css({})
    $(".box4 .question_d img").css({})

    $(".box4 .question img").addClass("animated bounceIn");
    $(".box4 .question_a img").addClass("animated flipInY");
    $(".box4 .question_a img").css({
        "-webkit-animation-delay": "1.1s",
        "animation-delay": "1.1s"
    });
    $(".box4 .question_b img").addClass("animated flipInY");
    $(".box4 .question_b img").css({
        "-webkit-animation-delay": "1.2s",
        "animation-delay": "1.2s"
    });
    $(".box4 .question_c img").addClass("animated flipInY");
    $(".box4 .question_c img").css({
        "-webkit-animation-delay": "1.3s",
        "animation-delay": "1.3s"
    });
    $(".box4 .question_d img").addClass("animated flipInY");
    $(".box4 .question_d img").css({
        "-webkit-animation-delay": "1.4s",
        "animation-delay": "1.4s"
    });
}
// 页面5动画效果
function page5_animate() {
    $(".box5 .question img").addClass("animated bounceIn");
    $(".box5 .question_a img").addClass("animated flipInY");
    $(".box5 .question_a img").css({
        "-webkit-animation-delay": "1.1s",
        "animation-delay": "1.1s"
    });
    $(".box5 .question_b img").addClass("animated flipInY");
    $(".box5 .question_b img").css({
        "-webkit-animation-delay": "1.2s",
        "animation-delay": "1.2s"
    });
    $(".box5 .question_c img").addClass("animated flipInY");
    $(".box5 .question_c img").css({
        "-webkit-animation-delay": "1.3s",
        "animation-delay": "1.3s"
    });
    $(".box5 .question_d img").addClass("animated flipInY");
    $(".box5 .question_d img").css({
        "-webkit-animation-delay": "1.4s",
        "animation-delay": "1.4s"
    });
}
// 页面6动画效果
function page6_animate() {
    $(".box6 .question img").addClass("animated bounceIn");
    $(".box6 .question_a img").addClass("animated flipInY");
    $(".box6 .question_a img").css({
        "-webkit-animation-delay": "1.1s",
        "animation-delay": "1.1s"
    });
    $(".box6 .question_b img").addClass("animated flipInY");
    $(".box6 .question_b img").css({
        "-webkit-animation-delay": "1.2s",
        "animation-delay": "1.2s"
    });
    $(".box6 .question_c img").addClass("animated flipInY");
    $(".box6 .question_c img").css({
        "-webkit-animation-delay": "1.3s",
        "animation-delay": "1.3s"
    });
    $(".box6 .question_d img").addClass("animated flipInY");
    $(".box6 .question_d img").css({
        "-webkit-animation-delay": "1.4s",
        "animation-delay": "1.4s"
    });
}
// 页面7动画效果
function page7_animate() {
    $(".box7 .question img").addClass("animated bounceIn");
    $(".box7 .question_a img").addClass("animated flipInY");
    $(".box7 .question_a img").css({
        "-webkit-animation-delay": "1.1s",
        "animation-delay": "1.1s"
    });
    $(".box7 .question_b img").addClass("animated flipInY");
    $(".box7 .question_b img").css({
        "-webkit-animation-delay": "1.2s",
        "animation-delay": "1.2s"
    });
    $(".box7 .question_c img").addClass("animated flipInY");
    $(".box7 .question_c img").css({
        "-webkit-animation-delay": "1.3s",
        "animation-delay": "1.3s"
    });
    $(".box7 .question_d img").addClass("animated flipInY");
    $(".box7 .question_d img").css({
        "-webkit-animation-delay": "1.4s",
        "animation-delay": "1.4s"
    });
}
// 页面8动画效果
function page8_animate() {
    $(".box8 .wenzi img").addClass("animated fadeIn");
    $(".box8 .wenzi img").css({
        "animation-duration": "4s",
        "-webkit-animation-delay": "0.5s",
        "animation-delay": "0.5s"
    });
    $(".box8 .shurukuang input").addClass("animated fadeIn");
    $(".box8 .shurukuang input").css({
        "animation-duration": "4s",
        "-webkit-animation-delay": "2s",
        "animation-delay": "2s"
    });
    $(".box8 .anniu img").addClass("animated fadeIn");
    $(".box8 .anniu img").css({
        "animation-duration": "4s",
        "-webkit-animation-delay": "3.5s",
        "animation-delay": "3.5s"
    });
    //气泡效果带完善
}

// 页面9动画效果
function page9_animate() {
    $(".box9 .wenzi_1 img").addClass("animated fadeIn");
}

// 页面10动画效果
function page10_animate() {

}