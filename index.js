// canvas
let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');

// 時間
let endMinute = 0;
let nowSecond = 0;
let countDownSeconds = 0;

let count = 0;

let countDownTimer = 0;

// 分の合計
let totalTimeMinutes = 0;

// 全ての秒数
let totalTimeSeconds = 0;

// 残り時間
let remainTime = 0;


// formの要素
let formElements = document.form01;

// 項目ごとの時間
let item01Time = 0;
let item02Time = 0;
let item03Time = 0;

let buttonClick = 0;

let timerDisplay = document.getElementById('timerDisplay').innerText;
console.log(document.forms);


// 各種ボタン
let btnSet = document.getElementById('btnSet');
btnSet.addEventListener("click", timerSetting);

let btnStart = document.getElementById('btnStart');
btnStart.addEventListener("click", countDown);

let btnStop = document.getElementById('btnStop');
btnStop.addEventListener("click", countStop);

let btnRestart = document.getElementById('btnRestart');
btnRestart.addEventListener("click", countRestart);

let btnReset = document.getElementById('btnReset');
btnReset.addEventListener("click", countReset);


// タイマー初期表示
context.beginPath();
context.arc(150, 150, 100, 0 * Math.PI / 180, 360 * Math.PI /180, false);
context.strokeStyle = 'gray';
context.lineWidth = 40;
context.stroke();


// タイマー設定
function timerSetting() {

  // 項目ごとの時間を計算
  item01Time = Number(formElements[1].value) * 60 + Number(formElements[2].value);

  item02Time = Number(formElements[4].value) * 60 + Number(formElements[5].value);

  item03Time = Number(formElements[7].value) * 60 + Number(formElements[8].value);

  // 全ての秒数を計算
  totalTimeSeconds = item01Time + item02Time + item03Time;

  if (totalTimeSeconds == 0) {
    window.alert('時間を入力してください')
  }

  // 分秒を計算
  // let min = Math.floor(totalTimeSeconds / 60);
  // let sec = totalTimeSeconds % 60;
  document.getElementById('timerDisplay').innerText = timeConvert(totalTimeSeconds) + ' / ' + timeConvert(totalTimeSeconds);
  console.log(timeConvert(totalTimeSeconds));

  // 項目ごとの割合を計算
  let wariai01 = 0;
  wariai01 = item01Time / totalTimeSeconds;

  let wariai02 = 0;
  wariai02 = item02Time / totalTimeSeconds;

  let wariai03 = 0;
  wariai03 = item03Time / totalTimeSeconds;

  // 割合に応じて、円グラフを描画
  context.beginPath();
  context.arc(150, 150, 100, 0 * Math.PI / 180, (360 * wariai01) * Math.PI /180, false);
  context.strokeStyle = 'lightskyblue';
  context.lineWidth = 40;
  context.stroke();

  context.beginPath();
  context.arc(150, 150, 100, (360 * wariai01) * Math.PI /180, (360 * (wariai01 + wariai02)) * Math.PI /180, false);
  context.strokeStyle = 'lightcoral';
  context.lineWidth = 40;
  context.stroke();

  context.beginPath();
  context.arc(150, 150, 100, (360 * (wariai01 + wariai02)) * Math.PI /180, (360 * (wariai01 + wariai02 + wariai03)) * Math.PI /180, false);
  context.strokeStyle = 'lightgreen';
  context.lineWidth = 40;
  context.stroke();
};

function countDown() {;
  timerSetting();
  console.log('スタート');
  // count = totalTimeSeconds;
  // if (count == '') {　
  //   window.alert('秒数を入力してください')
  // } else if (count <= 0) {
  //   window.alert('1以上の秒数を入力してください')
  // } else {
  let nowStart = new Date();
  buttonClick = nowStart;
  console.log('開始時刻:' + nowStart);
  countDownSeconds = 0;
  console.log('カウントダウン' + totalTimeSeconds);
  countDownTimer = setInterval(timerDrawing, 1000);
  }


function timerDrawing() {
  countDownSeconds = countDownSeconds + 1;
  remainTime = totalTimeSeconds - countDownSeconds;
  console.log('カウントダウン' + remainTime);
  nowKakudo = countDownSeconds / totalTimeSeconds;

  // 残り時間を表示
  document.getElementById('timerDisplay').innerText = timeConvert(remainTime) + ' / ' + timeConvert(totalTimeSeconds)

  // 円グラフの経過時間をグレーで表示
  context.beginPath();
  context.arc(150, 150, 100, 0 * Math.PI / 180, (360 * nowKakudo) * Math.PI /180, false);
  context.strokeStyle = 'gray';
  context.lineWidth = 40;
  context.stroke();


  if (remainTime <= 0) {
    let nowEnd = new Date();
    console.log('終了時刻:' + nowEnd);

    // タイマー終了表示
    context.beginPath();
    context.arc(150, 150, 100, 0 * Math.PI / 180, 360 * Math.PI /180, false);
    context.strokeStyle = 'red';
    context.lineWidth = 40;
    context.stroke();

    // タイマー終了
    clearInterval(countDownTimer);
  }
}


// ストップ
function countStop() {
  clearInterval(countDownTimer);
  console.log('ストップボタン');
  console.log(countDownSeconds);
  console.log(remainTime);
}

// 再開
function countRestart() {
  countDownTimer = setInterval(timerDrawing, 1000);
}


// リセット
function countReset() {
  location.reload();
}

// 秒を*分*秒に計算
function timeConvert(time) {
  let min = Math.floor(time / 60);
  let sec = time % 60;
  min = ('0' + min).slice(-2);
  sec = ('0' + sec).slice(-2);
  return min + ':' + sec;
}

// ToDoList
// 現在の項目の表示
// 項目の追加・削除

// SETを押していない時の処理→STARTに入れ込む
// 20211121実装
// 0秒の時の処理→アラートを出す
// 20211121実装
// タイマーを止めた時の処理→RESTARTボタンの追加
// 20211121実装

