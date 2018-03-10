var tetris = {
  board : [],
  T_SHAPE : 1,
  L_SHAPE : 2,
  S_SHAPE : 3,
  Z_SHAPE : 4,
  J_SHAPE : 5,
  O_SHAPE : 6,
  I_SHAPE : 7,
  clear :{},
  //图形位置
  postion : {
    one: {
      x: 0,
      y: 0
    },
    two: {
      x: 0,
      y: 0
    },
    three: {
      x: 0,
      y: 0
    },
    four: {
      x: 0,
      y: 0
    }
  },
  //图形生成
  cur : Math.floor(Math.random() * 7 + 1),
  //this.cur = 7;
  next : 0,
  degree : 0,
  interval:undefined,
  initGame: function (callback){
    this.initBoard();
    this.initShape(callback);
    
   // this.interval = setInterval(this.downShape(callback), 1000);
  }, 
  initBoard: function () {
    this.board = [];

    for (var i = 0; i < 22; i++) {
      var row = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.board.push(row);
    }

  },
  initShape: function (callback) {

    this.degree = 0;
    this.createShape(this.cur,callback);
    var next = Math.floor(Math.random() * 7 + 1);
    this.createNextShape(next,callback);
    this.next = next;

  },
  createShape: function (shapeType,callback) {

    //2、图形位置初始化
    var postion = this.copy(this.postion);
    switch (shapeType) {
      case this.T_SHAPE:
        postion.one.x = 5; postion.one.y = 0;
        postion.two.x = 5; postion.two.y = 1;
        postion.three.x = 4; postion.three.y = 1;
        postion.four.x = 6; postion.four.y = 1;
        break;
      case this.L_SHAPE:
        postion.one.x = 4; postion.one.y = 1;
        postion.two.x = 5; postion.two.y = 1;
        postion.three.x = 6; postion.three.y = 1;
        postion.four.x = 6; postion.four.y = 0;
        break;
      case this.S_SHAPE:
        postion.four.x = 4; postion.four.y = 1;
        postion.three.x = 5; postion.three.y = 1;
        postion.two.x = 5; postion.two.y = 0;
        postion.one.x = 6; postion.one.y = 0;
        break;
      case this.Z_SHAPE:
        postion.one.x = 4; postion.one.y = 0;
        postion.two.x = 5; postion.two.y = 0;
        postion.three.x = 5; postion.three.y = 1;
        postion.four.x = 6; postion.four.y = 1;
        break;
      case this.J_SHAPE:
        postion.four.x = 4; postion.four.y = 0;
        postion.three.x = 4; postion.three.y = 1;
        postion.two.x = 5; postion.two.y = 1;
        postion.one.x = 6; postion.one.y = 1;
        break;
      case this.O_SHAPE:
        postion.one.x = 5; postion.one.y = 0;
        postion.two.x = 5; postion.two.y = 1;
        postion.three.x = 6; postion.three.y = 0;
        postion.four.x = 6; postion.four.y = 1;
        break;
      case this.I_SHAPE:
        postion.one.x = 5; postion.one.y = 0;
        postion.two.x = 5; postion.two.y = 1;
        postion.three.x = 5; postion.three.y = 2;
        postion.four.x = 5; postion.four.y = 3;
        break;
    };
    //1、检查游戏是否失败
    if (this.checkGameover(postion)) {
      clearInterval(this.interval);
    }
    //图形渲染
    this.drawShape(shapeType, postion,callback);

    this.postion = this.copy(postion);
  },
  drawShape: function (shapeType, postion,callback) {

    this.board[postion.one.y][postion.one.x] = shapeType;
    this.board[postion.two.y][postion.two.x] = shapeType;
    this.board[postion.three.y][postion.three.x] = shapeType;
    this.board[postion.four.y][postion.four.x] = shapeType;

    callback();
  },
  createNextShape: function (shapeType,callback) {
    //创建下一个图形位置
    var postion = {
      one: {
        x: 0, y: 0
      }, two: {
        x: 0, y: 0
      }, three: {
        x: 0, y: 0
      }, four: {
        x: 0, y: 0
      }
    };
    //颜色创建

    //画板创建
    var nextboard = [];

    for (var i = 0; i < 6; i++) {
      var row = [0, 0, 0, 0, 0, 0];
      nextboard.push(row);
    }

    switch (shapeType) {
      case this.T_SHAPE:
        postion.one.x = 3; postion.one.y = 2;
        postion.two.x = 3; postion.two.y = 3;
        postion.three.x = 2; postion.three.y = 3;
        postion.four.x = 4; postion.four.y = 3;
        break;
      case this.L_SHAPE:
        postion.one.x = 2; postion.one.y = 3;
        postion.two.x = 3; postion.two.y = 3;
        postion.three.x = 4; postion.three.y = 3;
        postion.four.x = 4; postion.four.y = 2;
        break;
      case this.S_SHAPE:
        postion.one.x = 2; postion.one.y = 3;
        postion.two.x = 3; postion.two.y = 3;
        postion.three.x = 3; postion.three.y = 2;
        postion.four.x = 4; postion.four.y = 2;
        break;
      case this.Z_SHAPE:
        postion.one.x = 2; postion.one.y = 2;
        postion.two.x = 3; postion.two.y = 3;
        postion.three.x = 3; postion.three.y = 2;
        postion.four.x = 4; postion.four.y = 3;
        break;
      case this.J_SHAPE:
        postion.one.x = 2; postion.one.y = 2;
        postion.two.x = 2; postion.two.y = 3;
        postion.three.x = 3; postion.three.y = 3;
        postion.four.x = 4; postion.four.y = 3;
        break;
      case this.O_SHAPE:
        postion.one.x = 2; postion.one.y = 2;
        postion.two.x = 2; postion.two.y = 3;
        postion.three.x = 3; postion.three.y = 3;
        postion.four.x = 3; postion.four.y = 2;
        break;
      case this.I_SHAPE:
        postion.one.x = 3; postion.one.y = 1;
        postion.two.x = 3; postion.two.y = 2;
        postion.three.x = 3; postion.three.y = 3;
        postion.four.x = 3; postion.four.y = 4;
        break;
    };

    //画板位置设置
    nextboard[postion.one.y][postion.one.x] = shapeType;
    nextboard[postion.two.y][postion.two.x] = shapeType;
    nextboard[postion.three.y][postion.three.x] = shapeType;
    nextboard[postion.four.y][postion.four.x] = shapeType;

    var context = wx.createCanvasContext('#nextShape');

    for (var j = 0; j < 6; j++) {
      for (var i = 0; i < 6; i++) {
        if (nextboard[j][i] !== 0) {
          context.rect(i * 14, j * 14, 14, 14)
          context.setFillStyle("red")
          context.setStrokeStyle('black')
          context.fill()
          context.setLineWidth(0.5)
          context.stroke()
        }
      }
    }

    wx.drawCanvas({
      canvasId: 'nextShape',
      actions: context.getActions()
    })
  },
  downShape: function (callback) {
    var postion = this.copy(this.postion);

    //console.log(this.data.score);
    //1、检查坐标点
    var condition = postion.one.y >= 21 || postion.two.y >= 21 || postion.three.y >= 21 || postion.four.y >= 21 || (typeof this.board[postion.one.y + 1][postion.one.x] === 'string') || (typeof this.board[postion.two.y + 1][postion.two.x] === 'string') || (typeof this.board[postion.three.y + 1][postion.three.x] === 'string') || (typeof this.board[postion.four.y + 1][postion.four.x] === 'string');

    if (condition) {
      var shapeType = this.cur;
      switch (shapeType) {
        case this.T_SHAPE:
          shapeType = 'T'
          break;
        case this.L_SHAPE:
          shapeType = 'L'
          break;
        case this.S_SHAPE:
          shapeType = 'S'
          break;
        case this.Z_SHAPE:
          shapeType = 'Z'
          break;
        case this.J_SHAPE:
          shapeType = 'J'
          break;
        case this.O_SHAPE:
          shapeType = 'O'
          break;
        case this.I_SHAPE:
          shapeType = 'I'
          break;
      }
      //结束时赋值
      this.board[postion.one.y][postion.one.x] = shapeType;
      this.board[postion.two.y][postion.two.x] = shapeType;
      this.board[postion.three.y][postion.three.x] = shapeType;
      this.board[postion.four.y][postion.four.x] = shapeType;

      //检查是否清楚该行
      this.doCheckScore();
      //下一个图片
      this.cur = this.next;
      //初始化
      this.initShape(callback);
      return;
    }

    //2、删除原图形
    this.board[postion.one.y][postion.one.x] = 0;
    this.board[postion.two.y][postion.two.x] = 0;
    this.board[postion.three.y][postion.three.x] = 0;
    this.board[postion.four.y][postion.four.x] = 0;
    //console.log(this.board[postion.four.y][postion.four.x]
    //this.clearShape(postion);    

    //3、变更坐标点
    postion.one.y += 1;
    postion.two.y += 1;
    postion.three.y += 1;
    postion.four.y += 1;

    //4、绘图
    this.drawShape(this.cur, postion,callback);

    this.postion = this.copy(postion);
  },
  leftShape: function (callback) {
    var postion = this.postion;

    //2、检查坐标点
    var condition = (postion.one.x <= 0 || postion.two.x <= 0 || postion.three.x <= 0 || postion.four.x <= 0) || (typeof this.board[postion.one.y][postion.one.x - 1] === 'string') || (typeof this.board[postion.two.y][postion.two.x - 1] === 'string') || (typeof this.board[postion.three.y][postion.three.x - 1] === 'string') || (typeof this.board[postion.four.y][postion.four.x - 1] === 'string')

    //console.log("x : "+tempX+" y : "+tempY);
    if (condition) {
      return;
    }

    //1、删除原图形
    this.board[postion.one.y][postion.one.x] = 0;
    this.board[postion.two.y][postion.two.x] = 0;
    this.board[postion.three.y][postion.three.x] = 0;
    this.board[postion.four.y][postion.four.x] = 0;
    //this.clearShape(postion);    
    //3、变更坐标点
    postion.one.x -= 1;
    postion.two.x -= 1;
    postion.three.x -= 1;
    postion.four.x -= 1;

    //4、绘图
    this.drawShape(this.cur, postion, callback);

    this.postion = this.copy(postion);
  },
  rightShape: function (callback) {
    var postion = this.copy(this.postion);

    //2、检查坐标点
    var condition = (postion.one.x >= 9 || postion.two.x >= 9 || postion.three.x >= 9 || postion.four.x >= 9) || (typeof this.board[postion.one.y][postion.one.x + 1] === 'string') || (typeof this.board[postion.two.y][postion.two.x + 1] === 'string') || (typeof this.board[postion.three.y][postion.three.x + 1] === 'string') || (typeof this.board[postion.four.y][postion.four.x + 1] === 'string')

    //console.log("x : "+tempX+" y : "+tempY);
    if (condition) {
      return;
    }

    //1、删除原图形
    this.board[postion.one.y][postion.one.x] = 0;
    this.board[postion.two.y][postion.two.x] = 0;
    this.board[postion.three.y][postion.three.x] = 0;
    this.board[postion.four.y][postion.four.x] = 0;
    //this.clearShape(postion);    
    //3、变更坐标点
    postion.one.x += 1;
    postion.two.x += 1;
    postion.three.x += 1;
    postion.four.x += 1;

    //4、绘图
    this.drawShape(this.cur, postion,callback);
    this.postion = this.copy(postion);
  },
  changeShape: function (callback) {
    var postion = this.copy(this.postion);
    var degree = this.degree;
    //2、删除原图形
    this.board[postion.one.y][postion.one.x] = 0;
    this.board[postion.two.y][postion.two.x] = 0;
    this.board[postion.three.y][postion.three.x] = 0;
    this.board[postion.four.y][postion.four.x] = 0;
    //this.clearShape(postion);    
    switch (this.cur) {
      case this.T_SHAPE:
        if (this.degree == 0) {
          postion.one.x += 1;
          postion.one.y += 1;
          postion.three.x += 1;
          postion.three.y -= 1;
          postion.four.x -= 1;
          postion.four.y += 1;
          degree += 90;
        } else if (this.degree == 90) {
          postion.one.x -= 1;
          postion.one.y += 1;
          postion.three.x += 1;
          postion.three.y += 1;
          postion.four.x -= 1;
          postion.four.y -= 1;
          degree += 90;
        } else if (this.degree == 180) {
          postion.one.x -= 1;
          postion.one.y -= 1;
          postion.three.x -= 1;
          postion.three.y += 1;
          postion.four.x += 1;
          postion.four.y -= 1;
          degree += 90;
        } else if (this.degree == 270) {
          postion.one.x += 1;
          postion.one.y -= 1;
          postion.three.x -= 1;
          postion.three.y -= 1;
          postion.four.x += 1;
          postion.four.y += 1;
          degree = 0;
        }
        break;
      case this.L_SHAPE:
        if (this.degree == 0) {
          postion.one.y -= 1;
          postion.one.x += 1;
          postion.three.y += 1;
          postion.three.x -= 1;
          postion.four.y += 2;
          postion.four.x += 0;
          console.log(postion);
          degree += 90;
        } else if (degree == 90) {
          postion.one.y += 1;
          postion.one.x += 1;
          postion.three.y -= 1;
          postion.three.x -= 1;
          postion.four.y += 0;
          postion.four.x -= 2;
          console.log(postion);
          degree += 90;
        } else if (degree == 180) {
          postion.one.y += 1;
          postion.one.x -= 1;
          postion.three.y -= 1;
          postion.three.x += 1;
          postion.four.y -= 2;
          postion.four.x -= 0;
          console.log(postion);
          degree += 90;
        } else if (degree == 270) {
          postion.one.y -= 1;
          postion.one.x -= 1;
          postion.three.y += 1;
          postion.three.x += 1;
          postion.four.y -= 0;
          postion.four.x += 2;
          console.log(postion);
          degree = 0;
        }
        break;
      case this.S_SHAPE:
        if (this.degree == 0) {
          postion.one.y -= 1;
          postion.one.x -= 1;
          postion.three.y -= 1;
          postion.three.x += 1;
          postion.four.y += 0;
          postion.four.x += 2;
          degree += 90;
        } else if (degree == 90) {
          postion.one.y += 1;
          postion.one.x += 1;
          postion.three.y += 1;
          postion.three.x -= 1;
          postion.four.y += 0;
          postion.four.x -= 2;
          degree = 0;
        }
        break;
      case this.Z_SHAPE:
        if (this.degree == 0) {
          postion.one.y -= 1;
          postion.one.x += 1;
          postion.three.y -= 1;
          postion.three.x -= 1;
          postion.four.y += 0;
          postion.four.x -= 2;
          degree += 90;
        } else if (degree == 90) {
          postion.one.y += 1;
          postion.one.x -= 1;
          postion.three.y += 1;
          postion.three.x += 1;
          postion.four.y += 0;
          postion.four.x += 2;
          degree = 0;
        }
        break;
      case this.J_SHAPE:
        if (this.degree == 0) {
          postion.one.y += 1;
          postion.one.x -= 1;
          postion.three.y -= 1;
          postion.three.x += 1;
          postion.four.y -= 0;
          postion.four.x += 2;
          console.log(postion);
          degree += 90;
        } else if (degree == 90) {
          postion.one.y -= 1;
          postion.one.x -= 1;
          postion.three.y += 1;
          postion.three.x += 1;
          postion.four.y += 2;
          postion.four.x -= 0;
          console.log(postion);
          degree += 90;
        } else if (degree == 180) {
          postion.one.y -= 1;
          postion.one.x += 1;
          postion.three.y += 1;
          postion.three.x -= 1;
          postion.four.y -= 0;
          postion.four.x -= 2;
          console.log(postion);
          degree += 90;
        } else if (degree == 270) {
          postion.one.y += 1;
          postion.one.x += 1;
          postion.three.y -= 1;
          postion.three.x -= 1;
          postion.four.y -= 2;
          postion.four.x += 0;
          console.log(postion);
          degree = 0;
        }
        break;
      case this.O_SHAPE:
        break;
      case this.I_SHAPE:
        if (this.degree == 0) {
          postion.one.y += 1;
          postion.one.x += 1;
          postion.three.y -= 1;
          postion.three.x -= 1;
          postion.four.y -= 2;
          postion.four.x -= 2;
          console.log(postion);
          degree += 90;
        } else if (degree == 90) {
          postion.one.y -= 1;
          postion.one.x -= 1;
          postion.three.y += 1;
          postion.three.x += 1;
          postion.four.y += 2;
          postion.four.x += 2;
          console.log(postion);
          degree = 0;
        }
        break;
    }

    var flag = this.checkChange(postion);
    if (!flag) {
      console.log('not use postion');
      return;
    }
    this.postion = this.copy(postion);
    this.degree = degree;
    this.drawShape(this.cur, postion, callback);
  },
  copy: function (postion) {
    // var newobj = { 'one': { 'x': '', 'y': '' }, 'two': { 'x': '', 'y': '' }, 'three': { 'x': '', 'y': '' }, 'four': { 'x': '', 'y': '' } };
    // newobj.one.x = postion.one.x;
    // newobj.one.y = postion.one.y;
    // newobj.two.x = postion.two.x;
    // newobj.two.y = postion.two.y;
    // newobj.three.x = postion.three.x;
    // newobj.three.y = postion.three.y;
    // newobj.four.x = postion.four.x;
    // newobj.four.y = postion.four.y;
    function Newobj(){};
    Newobj.prototype = postion;
    return new Newobj();
  },
  checkGameover: function (postion) {
    var condition = ((typeof this.board[postion.one.y][postion.one.x] === 'string') || (typeof this.board[postion.two.y][postion.two.x] === 'string') || (typeof this.board[postion.three.y][postion.three.x] === 'string') || (typeof this.board[postion.four.y][postion.four.x] === 'string'));
    if (condition) {
      return true;
    } else {
      return false;
    }
  },
  checkChange: function (postion) {
    //边界判断
    if (this.board[postion.one.y] == undefined || this.board[postion.two.y] == undefined || this.board[postion.three.y] == undefined || this.board[postion.four.y] == undefined) {
      return false;
    }

    if (this.board[postion.one.y][postion.one.x] == undefined || this.board[postion.two.y][postion.two.x] == undefined || this.board[postion.three.y][postion.three.x] == undefined || this.board[postion.four.y][postion.four.x] == undefined) {
      return false;
    }

    //该位置是否已有图形判断
    var condition = typeof this.board[postion.one.y][postion.one.x] === 'string' || typeof this.board[postion.two.y][postion.two.x] === 'string' || typeof this.board[postion.three.y][postion.three.x] === 'string' || typeof this.board[postion.four.y][postion.four.x] === 'string';

    //console.log("x : "+tempX+" y : "+tempY);
    if (condition) {
      return false;
    } else {
      return true;
    }

  },
  doCheckScore: function () {
    for (var j = 0; j < 22; j++) {
      for (var i = 0; i < 10; i++) {
        //1、如果有一个数不是9结束本次循环
        if (typeof this.board[j][i] !== 'string') {
          break;
        }
        if (i == 9) {
          this.board.splice(j, 1);
          var row = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          this.board.unshift(row);

        }
      }
    }
  },
}

module.exports = tetris;