$.appEncoding = "UTF-8";
var CR = String.fromCharCode(13);

var fileName = File.saveDialog("保存ファイル名を入力");

var fileObj = new File(fileName);
var nest = 0;

if ( fileObj.open('w') ) {
  for (var i = 0; i < activeDocument.layers.length; i++) {
    var layer = activeDocument.layers[i];
    get_layer_pos(layer, fileObj, nest);
    fileObj.write ( target.name + ':{ left:' + x + ', top:' + y + ', width:' + w + ', height:' + h +' }' + CR );
  }

  fileObj.close();
}

function get_layer_pos(target, nest) {
  var bounds = target.bounds;

  for (var i = 0; i < bounds.length; i++) {
    bounds[i] = parseInt(bounds[i]);
  };

  // 高さと幅も取れるよ。
  var w = bounds[2] - bounds[0] ;
  var h = bounds[3] - bounds[1] ;

  var x = bounds[0];
  var y = bounds[1];

  // ファイル書き出し

  if(target.layers){
    for (var i = 0; i < target.layers.length; i++) {
      get_layer_pos(target.layers[i], nest+1);
    };
  }
}