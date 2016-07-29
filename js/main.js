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
    screenCanvas.width = 256;
    screenCanvas.height = 256;

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
    chara = new Character();
    chara.init(10);
    scorenum = 0;

    charaShotManager = new CharacterShotManager();

    enemy = new NormalEnemy();
    var pos = new Point();
    pos.x = -10;
    pos.y = 50;
    enemy.set(pos, 8, 2);

    // ループ処理を呼び出す
    (function(){
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

        // 描画処理
        chara.draw(context);
        enemy.draw(context);
        charaShotManager.draw(context);

        // フラグにより再帰呼び出し
        if(run){setTimeout(arguments.callee, fps);}
    })();
};

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
