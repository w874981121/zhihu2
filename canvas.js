//创建一个画布

function canvasDrawImg(callback) {
    const width = 750;
    const heigth = 1350;
    let canvas = document.getElementById("myCanvas");
    canvas.width = width;
    canvas.height = heigth;
    let ctx = canvas.getContext("2d");
    let bgimgurl = './img/11_bg.jpg';
    let img_bg = new Image()
    img_bg.setAttribute("crossOrigin", 'anonymous')
    img_bg.src = bgimgurl;
    img_bg.onload = function () {
        ctx.drawImage(img_bg, 0, 0, img_bg.width, img_bg.height)
        // 设置字体
        ctx.font = "36px bold 黑体";
        // 设置颜色
        ctx.fillStyle = "#000000";
        // 设置水平对齐方式
        ctx.textAlign = "center";
        // 设置垂直对齐方式
        ctx.textBaseline = "middle";
        // 绘制文字（参数：要写的字，x坐标，y坐标）
        ctx.fillText("王延琦", 178, 380);
        drawImg()
    }

    let img_1 = new Image();
    img_1.setAttribute("crossOrigin", 'anonymous')
    img_1.src = "./img/answer/1_a_1.jpg"
    img_1.onload = function () {
        ctx.drawImage(img_1, 106, 510, img_1.width, img_1.height)
        drawImg()
    }

    let img_2 = new Image();
    img_2.setAttribute("crossOrigin", 'anonymous')
    img_2.src = "./img/answer/1_a_1.jpg"
    img_2.onload = function () {
        ctx.drawImage(img_2, 106, 660, img_2.width, img_2.height)
        drawImg()
    }

    let img_3 = new Image();
    img_3.setAttribute("crossOrigin", 'anonymous')
    img_3.src = "./img/answer/1_a_2.jpg"
    img_3.onload = function () {
        ctx.drawImage(img_3, 106, 810, img_3.width, img_3.height)
        drawImg()
    }
    let stateImg = 0;
    function drawImg() {
        stateImg++
        if (stateImg == 4) {
            let base64Img;
            base64Img = canvas.toDataURL('image/jpeg');
            callback(base64Img)
        }
    }
}