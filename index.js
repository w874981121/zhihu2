/*
             mainClass      滑动父容器类名
             firstClass  第一页的类名
             num                  总页数
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


function clickButton() {
    localStorage.setItem("NAME", $("#inputname").val());
}