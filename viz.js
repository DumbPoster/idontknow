//this is not original code I modified it to look how I wanted
//please go to the original creator
//download https://github.com/rocksdanister/audio-visualizer-wallpaper
//author Dabjulmaros



let canvas = document.getElementById("canvas");
let max_height, startPos, vizWidth, midY;

let glob = { bloom: true, bloomRadius: 10 }; //customize the bloom change true to false to turn it off
let backgroundColor = "rgb(0,0,0)";
let linesColor = "rgb(255,0,0)";
let square = true;

let ctx = canvas.getContext("2d");
let gradient;

function setSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  max_height = window.innerHeight * 0.75; //set 1 for full screen
  startPos = window.innerWidth * 0.005; //set 0 for full screen
  vizWidth = window.innerWidth * 0.99; //set 1 for full screen
  midY = canvas.height - (canvas.height /22); //replace the math in the parentheses with '0' if you aren't using the windows taskbar

  gradient = ctx.createLinearGradient(0,midY, 0, max_height);
  gradient.addColorStop(0, customGradiant);
  gradient.addColorStop(1, linesColor);

}

window.onload = () => {
  setSize();
};

window.onresize = () => {
  setSize();
};

function livelyPropertyListener(name, val)
{
  switch(name) {
    case "lineColor":
      var color = hexToRgb(val);
      linesColor=`rgb(${color.r},${color.g},${color.b})`;
      gradient = ctx.createLinearGradient(0,midY, 0, max_height);
      gradient.addColorStop(0, customGradiant);
      gradient.addColorStop(1, linesColor);
      break;
case "customGradiant":
      var color = hexToRgb(val);
      customGradiant=`rgb(${color.r},${color.g},${color.b})`;
      gradient = ctx.createLinearGradient(0,midY, 0, max_height);
      gradient.addColorStop(0, customGradiant);
      gradient.addColorStop(1, linesColor);
      break;
  case "backgroundColor":
      var color = hexToRgb(val);
      backgroundColor = `rgb(${color.r},${color.g},${color.b})`;
        gradient = ctx.createLinearGradient(0,midY, 0, max_height);
      gradient.addColorStop(0, customGradiant);
      gradient.addColorStop(1, linesColor);
      break;   
    case "square":
      square = val;
      break;     
  }
}

function livelyAudioListener(audioArray) 
{
  maxVal = 1;
  for (var x of audioArray) {
    if (x > maxVal) maxVal = x;
  }

  const offSet = vizWidth / audioArray.length;
  const arrMid = audioArray.length / 2;
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.lineJoin = "round";
  ctx.moveTo(startPos - offSet * 3, midY);
  ctx.lineTo(startPos, midY);
  let posInLine = -1;
  for (var x = 0; x < audioArray.length; x++) {
    posInLine++;
    ctx.lineTo(
      startPos + offSet * posInLine,
      midY - (audioArray[x] / maxVal) * max_height
    );
    if (square)
      ctx.lineTo(
        startPos + offSet * (posInLine + 1),
        midY - (audioArray[x] / maxVal) * max_height
      );
  }
  ctx.lineTo(startPos + offSet * (posInLine + (square ? 1 : 0)), midY);
  ctx.lineTo(startPos + offSet * (posInLine + (square ? 4 : 3)), midY);

  ctx.fillStyle = gradient;
  ctx.fill();
  renderLine(linesColor);
}

function renderLine(color) {
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  if (glob.bloom) {
    ctx.shadowBlur = glob.bloomRadius;
    ctx.shadowColor = color;
  }
  ctx.stroke();
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}