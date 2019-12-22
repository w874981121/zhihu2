//创建一个画布

function canvasDrawImg(canl, bg, obj, name, callback) {
    const width = 750;
    const height = 1350;
    let canvas = document.getElementById(canl);
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext("2d");
    let bgimgurl = bg;
    let img_bg = new Image()
    img_bg.setAttribute("crossOrigin", 'anonymous')
    img_bg.src = bgimgurl;
    img_bg.onload = function () {
        ctx.drawImage(img_bg, 0, 0, img_bg.width, img_bg.height)
        // 设置字体
        ctx.font = "36px bold 黑体";
        // 设置颜色
        ctx.fillStyle = "#db9e91";
        // 设置水平对齐方式
        ctx.textAlign = "left";
        // 设置垂直对齐方式
        ctx.textBaseline = "middle";
        // 绘制文字（参数：要写的字，x坐标，y坐标）
        ctx.fillText(name, 100, 380);
        const Qingwidth = 570,
            Qingheight = 120;
        let img_1 = new Image();
        img_1.setAttribute("crossOrigin", 'anonymous')
        img_1.src = obj[0];
        img_1.onload = function () {
            ctx.drawImage(img_1, 90, 500, Qingwidth, Qingheight)
            let img_2 = new Image();
            img_2.setAttribute("crossOrigin", 'anonymous')
            img_2.src = obj[1];
            img_2.onload = function () {
                ctx.drawImage(img_2, 90, 660, Qingwidth, Qingheight)
                let img_3 = new Image();
                img_3.setAttribute("crossOrigin", 'anonymous')
                img_3.src = obj[2];
                img_3.onload = function () {
                    ctx.drawImage(img_3, 90, 820, Qingwidth, Qingheight)
                    drawImg()
                }
            }
        }
    }







    function drawImg() {
        let base64Img;
        base64Img = canvas.toDataURL('image/jpeg', 1);
        canvas.width = 0;
        canvas.height = 0;
        callback(base64Img)
    }
}