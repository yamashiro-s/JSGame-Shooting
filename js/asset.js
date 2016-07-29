var Asset = {}

// 読み込むアセットの種類
Asset.assets = {
  {type:'imaeg', name:'player', src:'assets/player.png'}
};

// 読み込んだ画像を格納する
Asset.images = {};

Asset.loadAssets = function(onComplete){
  var total = Asset.assets.length;
  var loadCount = 0;

  var onLoad = function(){
    loadCount++;
    if(loadCount >= total){
      onComplete();
    }
  };

  Asset.assets.forEach(function(asset) {
    switch (asset.type) {
      case 'image':
        Asset._loadImage(asset, onLoad);
        break;
    }
  });
};

Asset._loadImage = function(asset, onLoad){
  var image = new Image();
  image.src = asset.src;
  image.onload = onLoad;
  Asset.images[asset.name] = image;
};
