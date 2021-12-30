// canvas表示用(円グラフ)
let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');

// canvas表示用(テキスト)
let canvasText = document.getElementById('canvas-text');
let contextText = canvasText.getContext('2d');

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

// 項目名
let item01Text = '';
let item02Text = '';
let item03Text = '';

// 現在の項目名
let itemNowText = '';

// 時刻表示用の要素取得
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

// ボタン初期表示
btnStart.disabled = true;
btnStop.disabled = true;
btnRestart.disabled = true;


// タイマー初期表示
context.beginPath();
context.arc(150, 150, 100, 0 * Math.PI / 180, 360 * Math.PI /180, false);
context.strokeStyle = 'gray';
context.lineWidth = 40;
context.stroke();

// テキスト初期表示
contextText.font = "2em YuGothic";
contextText.textAlign = 'center';
contextText.fillText('00:00', 150, 140);
contextText.fillText('項目名',150,180);

// SETボタン、タイマー設定
function timerSetting() {

  // 項目ごとの時間を計算
  item01Time = Number(formElements[1].value) * 60 + Number(formElements[2].value);

  item02Time = Number(formElements[4].value) * 60 + Number(formElements[5].value);

  item03Time = Number(formElements[7].value) * 60 + Number(formElements[8].value);

  // 全ての秒数を計算
  totalTimeSeconds = item01Time + item02Time + item03Time;

  // 時間の入力がない場合のアラート
  if (totalTimeSeconds == 0) {
    window.alert('時間を入力してください')
  }

  // 分秒を計算
  // let min = Math.floor(totalTimeSeconds / 60);
  // let sec = totalTimeSeconds % 60;
  document.getElementById('timerDisplay').innerText = timeConvert(totalTimeSeconds) + ' / ' + timeConvert(totalTimeSeconds);

  // 項目ごとの割合を計算
  let wariai01 = 0;
  wariai01 = item01Time / totalTimeSeconds;

  let wariai02 = 0;
  wariai02 = item02Time / totalTimeSeconds;

  let wariai03 = 0;
  wariai03 = item03Time / totalTimeSeconds;

  context.clearRect(0, 0, 300, 300);

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

  // テキスト初期表示
  item01Text = formElements[0].value;

  contextText.clearRect(0, 0, 300, 300);
  contextText.font = "2em YuGothic";
  contextText.textAlign = 'center';
  contextText.fillText(timeConvert(totalTimeSeconds), 150, 140);
  contextText.fillText(item01Text,150,180);

  // 項目名を初期表示
  console.log(item01Text);

  btnStart.disabled = false;
};

// STARTボタン、カウントダウン開始
function countDown() {;

  timerSetting();
  console.log('スタート');

  let nowStart = new Date();
  console.log('開始時刻:' + nowStart);

  countDownSeconds = 0;
  console.log('カウントダウン' + totalTimeSeconds);

  countDownTimer = setInterval(timerDrawing, 1000);
  btnStart.disabled = true;
  btnStop.disabled = false;
}


// カウントダウン中のタイマー描画
function timerDrawing() {
  countDownSeconds = countDownSeconds + 1;
  remainTime = totalTimeSeconds - countDownSeconds;
  console.log('カウントダウン' + remainTime);
  nowKakudo = countDownSeconds / totalTimeSeconds;

  // 残り時間を表示
  document.getElementById('timerDisplay').innerText = timeConvert(remainTime) + ' / ' + timeConvert(totalTimeSeconds);

  // 項目名を取得
  item01Text = formElements[0].value;
  item02Text = formElements[3].value;
  item03Text = formElements[6].value;

  // 時間ごとの項目名を取得
  if (totalTimeSeconds - remainTime <= item01Time) {
    itemNowText = item01Text;
  } else if (totalTimeSeconds - remainTime  <= item01Time + item02Time) {
    itemNowText = item02Text;
  }  else {
    itemNowText = item03Text;
  };

  // 円グラフ内に残り時間と項目名表示
  contextText.clearRect(0, 0, 300, 300);
  contextText.font = "2em YuGothic";
  contextText.textAlign = 'center';
  contextText.fillText(timeConvert(remainTime), 150, 140);
  contextText.font = "2em YuGothic";
  contextText.fillText(itemNowText,150,180);

  // 円グラフの経過時間をグレーで表示
  context.beginPath();
  context.arc(150, 150, 100, 0 * Math.PI / 180, (360 * nowKakudo) * Math.PI /180, false);
  context.strokeStyle = 'gray';
  context.lineWidth = 40;
  context.stroke();

  // タイマー終了判定、終了時刻確認
  if (remainTime <= 0) {
    let nowEnd = new Date();
    console.log('終了時刻:' + nowEnd);

    // タイマー終了表示
    context.beginPath();
    context.arc(150, 150, 100, 0 * Math.PI / 180, 360 * Math.PI /180, false);
    context.strokeStyle = 'red';
    context.lineWidth = 40;
    context.stroke();

    // テキスト初期表示
    contextText.clearRect(0, 0, 300, 300);
    contextText.font = "2em YuGothic";
    contextText.textAlign = 'center';
    contextText.fillText(timeConvert(remainTime), 150, 140);
    contextText.font = "2em YuGothic";
    contextText.fillText('終了',150,180);

    // タイマー終了
    clearInterval(countDownTimer);
  }
}

// PAUSEボタン
function countStop() {
  clearInterval(countDownTimer);
  console.log('ストップボタン');
  console.log(countDownSeconds);
  console.log(remainTime);
  btnStop.disabled = true;
  btnRestart.disabled = false;
}

// RESTARTボタン
function countRestart() {
  countDownTimer = setInterval(timerDrawing, 1000);
  btnRestart.disabled = true;
  btnStop.disabled = false;
}


// CLEARボタン(再読み込み)
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
// 項目の追加・削除
// 円グラフの表示位置(センタリング、そのほかの要素の回り込み)
// 円グラフ内のテキスト表示位置(センタリング)


// SETを押していない時の処理→STARTに入れ込む
// 20211121実装
// 0秒の時の処理→アラートを出す
// 20211121実装
// タイマーを止めた時の処理→RESTARTボタンの追加
// 20211121実装

// 現在の項目の表示
// 20211204実装
