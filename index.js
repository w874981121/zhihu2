
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
        bodyHeight = document.body.offsetHeight,
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
        },
        fn3 = function (e) {
            // e.preventDefault();
            var newX = e.targetTouches[0].clientX,
                newY = e.targetTouches[0].clientY;
            if (newY - startY > 50) {
                if (touchFlag == true && touchNum > 0) {
                    console.log("下滑");
                    touchFlag = false;
                    marginTop += 1;
                    touchNum -= 1;
                    pageFirst.style.marginTop = marginTop * bodyHeight + "px";
                }
            } else
            if (newY - startY < -50) {
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
        clickPage: (num) => {
            var pageFirst = document.getElementsByClassName(firstClass)[0];
            touchNum = num
            marginTop = -num
            pageFirst.style.marginTop = -num * document.body.offsetHeight + "px";
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
    statePage(val)
});


// 默认开启第几行
fullPageJump.clickPage(0)



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


let base64Data = null;

function clickButton() {
    fullPageJump.clickPage(8);
    localStorage.setItem("NAME", $("#inputname").val());
    canvasDrawImg(function (data) {
        base64Data = data;

        $("#bgBase64").attr("src",base64Data);
        setTimeout(() => {
            fullPageJump.clickPage(9);
        }, 3000)
    })
}


// 动画控制台模块
// 说明：在页面滑入时调用响应的动画模块即可
// 循环执行动画 infinite
// 动画执行时长 "animation-duration":"2s"
// 动画延时执行 "-webkit-animation-delay":"0.5s"   "animation-delay":"0.5s"
//

// 页面1动画效果
function page1_animate() {
    $(".box1 .jiiantou img").addClass("animated fadeInDown infinite");
    $(".box1 .jiiantou img").css({"animation-duration":"2s"});
}

// 页面2动画效果
function page2_animate() {
    $(".box2 .text img").addClass("animated fadeIn");
    $(".box2 .text img").css({"animation-duration":"4s"});
    $(".box2 .jiiantou img").addClass("animated fadeInDown infinite");
    $(".box2 .jiiantou img").css({"animation-duration":"2s"});
}

// 页面3动画效果
function page3_animate() {
    $(".box3 .text img").addClass("animated fadeIn");
    $(".box3 .text img").css({"animation-duration":"4s"});
    $(".box3 .button img").addClass("animated fadeIn");
    $(".box3 .button img").css({"-webkit-animation-delay":"2s","animation-delay":"2s"});
}

// 页面4动画效果
function page4_animate() {
    $(".box4 .question img").addClass("animated bounceIn");
    $(".box4 .question_a img").addClass("animated flipInY");
    $(".box4 .question_a img").css({"-webkit-animation-delay":"0.1s","animation-delay":"0.1s"});
    $(".box4 .question_b img").addClass("animated flipInY");
    $(".box4 .question_b img").css({"-webkit-animation-delay":"0.2s","animation-delay":"0.2s"});
    $(".box4 .question_c img").addClass("animated flipInY");
    $(".box4 .question_c img").css({"-webkit-animation-delay":"0.3s","animation-delay":"0.3s"});
    $(".box4 .question_d img").addClass("animated flipInY");
    $(".box4 .question_d img").css({"-webkit-animation-delay":"0.4s","animation-delay":"0.4s"});
}

// 页面5动画效果
function page5_animate() {
    $(".box5 .question img").addClass("animated bounceIn");
    $(".box5 .question_a img").addClass("animated flipInY");
    $(".box5 .question_a img").css({"-webkit-animation-delay":"0.1s","animation-delay":"0.1s"});
    $(".box5 .question_b img").addClass("animated flipInY");
    $(".box5 .question_b img").css({"-webkit-animation-delay":"0.2s","animation-delay":"0.2s"});
    $(".box5 .question_c img").addClass("animated flipInY");
    $(".box5 .question_c img").css({"-webkit-animation-delay":"0.3s","animation-delay":"0.3s"});
    $(".box5 .question_d img").addClass("animated flipInY");
    $(".box5 .question_d img").css({"-webkit-animation-delay":"0.4s","animation-delay":"0.4s"});
}

// 页面6动画效果
function page6_animate() {
    $(".box6 .question img").addClass("animated bounceIn");
    $(".box6 .question_a img").addClass("animated flipInY");
    $(".box6 .question_a img").css({"-webkit-animation-delay":"0.1s","animation-delay":"0.1s"});
    $(".box6 .question_b img").addClass("animated flipInY");
    $(".box6 .question_b img").css({"-webkit-animation-delay":"0.2s","animation-delay":"0.2s"});
    $(".box6 .question_c img").addClass("animated flipInY");
    $(".box6 .question_c img").css({"-webkit-animation-delay":"0.3s","animation-delay":"0.3s"});
    $(".box6 .question_d img").addClass("animated flipInY");
    $(".box6 .question_d img").css({"-webkit-animation-delay":"0.4s","animation-delay":"0.4s"});
}

// 页面7动画效果
function page7_animate() {
    $(".box7 .question img").addClass("animated bounceIn");
    $(".box7 .question_a img").addClass("animated flipInY");
    $(".box7 .question_a img").css({"-webkit-animation-delay":"0.1s","animation-delay":"0.1s"});
    $(".box7 .question_b img").addClass("animated flipInY");
    $(".box7 .question_b img").css({"-webkit-animation-delay":"0.2s","animation-delay":"0.2s"});
    $(".box7 .question_c img").addClass("animated flipInY");
    $(".box7 .question_c img").css({"-webkit-animation-delay":"0.3s","animation-delay":"0.3s"});
    $(".box7 .question_d img").addClass("animated flipInY");
    $(".box7 .question_d img").css({"-webkit-animation-delay":"0.4s","animation-delay":"0.4s"});
}

// 页面8动画效果
function page8_animate() {

}

// 页面9动画效果
function page9_animate() {

}

// 页面10动画效果
function page10_animate() {

}
