var tetris = require('tetrisEngine.js');

Page({
  data: {
    level: 0,
    score: 0,
    time: 0,
    board: []
  },
  onReady: function () {
    function inherit(p){
      if(p == null){
        throw TypeError();
      }
      if(Object.create){
        return Object.create(p);
      }
      var t = typeof f;

      if(t !== "object" && t!== "function"){
        return TypeError();
      }

      function f(){};

      f.prototype = p;
      return new f();
    }
    var obj = {
      a:1
    };
    function test(a){
      a.a++;
      console.log(obj);
    }
    test(obj);
    console.log(obj);
  },
  onLoad:function(){
    var me = this;
    tetris.initGame(function () {
      me.setData({
        board: tetris.board
      });
    });

    tetris.interval = setInterval(this.onDown, 1000);
    
  },
  onUnload: function () {
    clearInterval(this.interval);
  },
  onDown: function () {
    var me = this;
    tetris.downShape(function(){
      me.setData({
        board:tetris.board
      })
    });
  },
  onLeft: function () {
    var me = this;
    tetris.leftShape(function () {
      me.setData({
        board: tetris.board
      })
    });
  },
  onRight: function () {
    var me = this;
    tetris.rightShape(function () {
      me.setData({
        board: tetris.board
      })
    });
  },
  onChange: function () {
    var me = this;
    tetris.changeShape(function () {
      me.setData({
        board: tetris.board
      })
    });
  }
})
