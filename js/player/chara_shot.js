var CHARA_SHOT_COLOR = 'rgba(0, 255, 0, 0.75)';
var CHARA_SHOT_MAX_COUNT = 10;

// - shot ---------------------------------------------------------------------
function CharacterShot(){
  this.position = new Point();
  this.size = 0;
  this.speed = 0;
  this.alive = false;
}

CharacterShot.prototype.set = function(p, size, speed){
    // 座標をセット
    this.position.x = p.x;
    this.position.y = p.y;

    // サイズ、スピードをセット
    this.size = size;
    this.speed = speed;

    // 生存フラグを立てる
    this.alive = true;
};

CharacterShot.prototype.move = function(){
    // 座標を真上にspeed分だけ移動させる
    this.position.y -= this.speed;

    // 一定以上の座標に到達していたら生存フラグを降ろす
    if(this.position.y < -this.size){
        this.alive = false;
        return ;
    }

    var col = new CollisionObject();
    col.set(this.position, this.size, 1, this.onHit);
    CollisionManager.add(col);
};

CharacterShot.prototype.draw = function(context){
  // パスの設定を開始
  context.beginPath();
  // 円の色を設定する
  context.fillStyle = CHARA_SHOT_COLOR;
  // 円を描くパスを設定
  context.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2, false);
  // 円を描く
  context.fill();
};

CharacterShot.prototype.onHit = function(type){
  this.alive = false;
  run = false;
};

// - shotManager --------------------------------------------------------------
function CharacterShotManager(){
  this.shotArray = new Array(CHARA_SHOT_MAX_COUNT);
  for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
    this.shotArray[i] = new CharacterShot();
  }
  this.fire = false;
  this.charaPos = new Point();
}

CharacterShotManager.prototype.mouseDown = function(charaPos){
  if(this.fire == false){
    this.fire = true;
    this.charaPos = charaPos;
  }
};

CharacterShotManager.prototype.update = function(){
  for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
    if(this.shotArray[i].alive){
      this.shotArray[i].move();
    }else{
      if(!this.fire)continue;
      this.shotArray[i].set(this.charaPos, 3, 9);
      this.fire = false;
    }
  }
};

CharacterShotManager.prototype.draw = function(context){
  for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
    if(this.shotArray[i].alive == true){
      this.shotArray[i].draw(context);
    }
  }
};
