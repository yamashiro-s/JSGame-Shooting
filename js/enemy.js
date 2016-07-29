var ENEMY_COLOR = 'rgba(255, 0, 0, 0.75)';

NormalEnemy = function(){
  this.position = new Point();
  this.size = 0;
  this.speed = 0;
  this.alive = false;
}

NormalEnemy.prototype.set = function(p, size, speed){
    // 座標をセット
    this.position.x = p.x;
    this.position.y = p.y;

    // サイズ、スピードをセット
    this.size = size;
    this.speed = speed;

    // 生存フラグを立てる
    this.alive = true;
};

NormalEnemy.prototype.update = function(){
  this.move();
};

NormalEnemy.prototype.move = function(){
    // 座標を真上にspeed分だけ移動させる
    this.position.x += this.speed;

    // 一定以上の座標に到達していたら生存フラグを降ろす
    if(this.position.x > 800 + this.size){
        //this.alive = false;
        this.position.x = -this.size;
    }

    var col = new CollisionObject();
    col.set(this.position, this.size, 0, this.onHit);
    CollisionManager.add(col);
};

NormalEnemy.prototype.draw = function(context){
  // パスの設定を開始
  context.beginPath();
  // 円の色を設定する
  context.fillStyle = ENEMY_COLOR;
  // 円を描くパスを設定
  context.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2, false);
  // 円を描く
  context.fill();
};

NormalEnemy.prototype.onHit = function(type){
  if(type == 1){
    this.position.x = -10;
    scorenum += 10;
  }
};
