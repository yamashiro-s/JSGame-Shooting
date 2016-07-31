// - define -------------------------------------------------------------------

// - global -------------------------------------------------------------------
var screenCanvas, info, score;
var run = true;
var fps = 1000 / 30;
var mouse = new Point();
var context;

var charaShotManager;
var chara;
var enemy;
var scorenum = 0;

// - main ---------------------------------------------------------------------
window.onload = function(){
    // スクリーンの初期化
    screenCanvas = document.getElementById('screen');
    screenCanvas.width = 800;
    screenCanvas.height = 600;

    // コンテキスト取得
    context = screenCanvas.getContext('2d');

    // イベントの登録
    screenCanvas.addEventListener('mousemove', mouseMove, true);
    screenCanvas.addEventListener('mousedown', mouseDown, true);
    window.addEventListener('keydown', keyDown, true);

    // エレメント関連
    info = document.getElementById('info');
    score = document.getElementById('score');

    // 初期化
    init();
};

function init(){
  chara = new Character();
  chara.init(10);
  scorenum = 0;

  charaShotManager = new CharacterShotManager();

  enemy = new NormalEnemy();
  var pos = new Point();
  pos.x = -10;
  pos.y = 50;
  enemy.set(pos, 8, 2);

  Asset.loadAssets(function() {
    // アセットがすべて読み込み終わったら、
    // ゲームの更新処理を始めるようにする
    requestAnimationFrame(update);
  });
}

function update(){
  //requestAnimationFrame(update);
  // HTMLを更新
  info.innerHTML = mouse.x + ' : ' + mouse.y;
  score.innerHTML = 'SCORE : ' + scorenum;

  // screenクリア
  context.clearRect(0, 0, screenCanvas.width, screenCanvas.height);

  // 更新処理
  chara.mouseMove(mouse);
  enemy.update();
  charaShotManager.update();

  // 衝突判定
  CollisionManager.collision();
  render();

  if(run){setTimeout(arguments.callee, fps);}
}

function render(){
  // 描画処理
  context.drawImage(Asset.images['back'], 0, 0, 800, 600);
  context.drawImage(Asset.images['planet1'], 230, 150, 64, 64);
  context.drawImage(Asset.images['planet2'], 560, 40, 256, 128);

  charaShotManager.draw(context);
  chara.draw(context);
  enemy.draw(context);
}

// - event --------------------------------------------------------------------
function mouseMove(event){
    // マウスカーソル座標の更新
    mouse.x = event.clientX - screenCanvas.offsetLeft;
    mouse.y = event.clientY - screenCanvas.offsetTop;
}

function mouseDown(event){
    charaShotManager.mouseDown(chara.position);
}

function keyDown(event){
    // キーコードを取得
    var ck = event.keyCode;

    // Escキーが押されていたらフラグを降ろす
    if(ck === 27){run = false;}
}

$(document).ready(function () {
  $('#willbe-logo').plaxify({"xRange":40,"yRange":40})
  $('#willbe-fishline').plaxify({"xRange":20,"yRange":20})
  $('#willbe-fish').plaxify({"xRange":70,"yRange":70})
  $('#willbe-epi').plaxify({"xRange":30,"yRange":100})
  $('#willbe-hatena').plaxify({"xRange":65,"yRange":65})
  $.plax.enable()
})
