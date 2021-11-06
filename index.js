let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');

let endMinute = 0;
let nowMinute = 0;
let count = 0;
let countDownTimer = 0;
let textbox = document.getElementById('countDownSeconds');
let abc = document.getElementById('countDownSeconds').value;
console.log(abc);

let nowKakudo = nowMinute / endMinute;
console.log(nowKakudo);
console.log(textbox.value);


let btnStart = document.getElementById('btnStart');
btnStart.addEventListener("click", countDown);

let btnStop = document.getElementById('btnStop');
btnStop.addEventListener("click", countStop);


function countDown() {
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  context.beginPath();
  context.arc(200, 200, 100, 0 * Math.PI / 180, 360 * Math.PI /180, false);
  context.strokeStyle = 'deepskyblue';
  context.lineWidth = 40;
  context.stroke();

  console.log('スタート');
  count = textbox.value;
  if (count == '') {
    window.alert('秒数を入力してください')
  } else if (count <= 0) {
    window.alert('1以上の秒数を入力してください')
  } else {
  let now = new Date();
  console.log(now);
  countDownTimer = setInterval(countDownSeconds, 1000);
  }
}

function countDownSeconds() {

  console.log('カウント' + count);
  count = count - 1;
  nowKakudo = count / textbox.value;

  console.log('角度' + nowKakudo);
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  context.beginPath();
  context.arc(200, 200, 100, 0 * Math.PI / 180, (360 * nowKakudo) * Math.PI /180, false);
  context.strokeStyle = 'deepskyblue';
  context.lineWidth = 40;
  context.stroke();
  console.log('---');

  if (count < 0) {
    console.log('カウント' + count);
    console.log('角度' + nowKakudo);
    console.log('END!');

    let now02 = new Date();
    console.log(now02);

    clearInterval(countDownTimer);
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  }
}


function countStop() {
  clearInterval(countDownTimer);
}
