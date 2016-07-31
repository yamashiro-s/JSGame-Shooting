var CHARA_COLOR = 'rgba(0, 0, 255, 0.75)';
var CHARA_INIT_SPEED = 5;

function Character(){
    this.position = new Point();
    this.size = 0;
    this.speed = CHARA_INIT_SPEED;
}

Character.prototype.init = function(size){
    this.size = size;
};

Character.prototype.mouseMove = function(point){
  // マウスカーソル座標の更新
  var vec = new Point();
  vec = this.position.distance(point);
  if(this.speed < vec.length()){
    vec.setLength(this.speed);
  }
  this.position.x += vec.x;
  this.position.y += vec.y;
}

Character.prototype.draw = function(context){
  context.drawImage(Asset.images['player'], this.position.x-16, this.position.y-16);
}
