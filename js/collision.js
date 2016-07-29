// 衝突判定オブジェクト
CollisionObject = function(){
  this.position = new Point();
  this.size = -1;
  this.type = -1;
  this.callback = null;
};

CollisionObject.prototype.set = function(pos, size, type, callback){
  this.position = pos;
  this.size = size;
  this.type = type;
  this.callback = callback;
};

// 衝突判定クラス
CollisionManager = function(){
};

CollisionManager.objArray = new Array();

CollisionManager.add = function(colObj){
  this.objArray.push(colObj);
};

CollisionManager.collision = function(){
  for(i = 0; i < this.objArray.length; i++){
    var objA = this.objArray[i];

    for(j = 0; j < this.objArray.length; j++ ){
      var objB = this.objArray[j]
      if(i == j)continue;
      if(objA.type == objB.type)continue;
      if(objA.position.x - objA.size < objB.position.x + objB.size &&
        objA.position.x + objA.size > objB.position.x - objB.size &&
        objA.position.y - objA.size < objB.position.y + objB.size &&
        objA.position.y + objA.size > objB.position.y - objB.size)
      {
        objA.callback(objB.type);
      }
    }
  }
  this.objArray = [];
};
