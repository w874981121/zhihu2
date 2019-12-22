//创建一个画布


const width = 750;
const heigth = 1350;

const canvas = document.getElementById("myCanvas");
canvas.width = width;
canvas.height = heigth;
let ctx = canvas.getContext("2d");
let bgimgurl = './img/11_bg.jpg';
let base64Img = null;

let img = new Image()
img.src = bgimgurl;
img.onload = function () {
    ctx.drawImage(img, 0, 0, img.width, img.height)
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

    base64Img = ctx.toDataURL('image/jpeg');

    console.log(base64Img)
    
}
