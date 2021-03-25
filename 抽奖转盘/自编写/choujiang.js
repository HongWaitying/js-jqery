(function(){
  //默认值
  var static={
    prizeInfo:[
      {prizeDesc:'一等奖',prizeName:'iPhone7',probability:0.001},
      {prizeDesc:'二等奖',prizeName:'50元话费',probability:0.1},
      {prizeDesc:'三等奖',prizeName:'10元话费',probability:0.2},
      {prizeDesc:'鼓励奖',prizeName:'100M流量',probability:0.3},
      {prizeDesc:'再接再厉',prizeName:'很遗憾没有中奖',probability:0.399}
    ],
    turn: 3, //转盘旋转最低的圈数
  }
  var myTurntable=function( turn_id, btn_id, config ){
    var brn = document.querySelector(btn_id);
    var wheel = document.querySelector(turn_id);
    //合并默认参数
    var iTurntable=Object.assign({},static,config);
    //选项模板
    var temp='';
    var liroate= 360 / (iTurntable.prizeInfo.length); //计算每一份所占的角度
    for(let i=0;i<iTurntable.prizeInfo.length;i++){
      temp+=`
      <li style="transform: rotateZ(-${liroate * i}deg);">
        <i class="divider" style="transform: rotateZ(${liroate/2}deg) skewY(${90 - liroate}deg);"></i>
        <div class="prize">
          <h3>${iTurntable.prizeInfo[i].prizeDesc}</h3>
          <p>${iTurntable.prizeInfo[i].prizeName}</p>
        </div>
      </li>
      `;
    }
    wheel.innerHTML=temp;
    var turntable = []; // 随机概率计算
    var isStatr = false; //锁 专拍没有执行完的时候 不可以再次点击 ;
    var lenCloc = 0; //当前第几次计算叠加的度数

    /* 循环概率 */
    for (var i = 0; i < iTurntable.prizeInfo.length; i++) {
      for (var j = 0; j < iTurntable.prizeInfo[i].probability*1000; j++) {
        turntable.push(i + 1);
      }
    }
    /* 点击 开始  */
    brn.onclick = function () {
      if (!isStatr) {
        isStatr = true;
        var random = Math.floor(Math.random() * turntable.length);
        operation(random);
      } else {
        return false;
      }
    }
    /*    开始 function  ran = 随机    */
    function operation(ran) {
      lenCloc++;
      var Prize = turntable[ran] - 1, sun = iTurntable.turn * 360;  //编号  // 度数  //  时间
      if (Prize >= iTurntable.prizeInfo.length) {
        Prize = 0;
      }
      var soBuom = parseInt(Math.floor(Math.random() * liroate) - liroate/2);

      /*    避免多次出现1等奖 所以要删除 下标    */
      turntable.splice(ran, 1);

      /*    旋转度数 = 上次度数+ 最小圈数 * 360 + 当前数字 * liroate +随机角度  = 最终旋转度数     */
      wheel.style.transform = "rotate(" + ((lenCloc * sun + Prize * liroate) + soBuom) + "deg)";
      //wheel.style.webkitTransform = "rotate("+((lenCloc*sun+Prize*liroate)+soBuom)+"deg)";

      setTimeout(function () {
        alert("恭喜您获得了奖品为:" + iTurntable.prizeInfo[Prize].prizeName);
        isStatr = false;
      }, 2700);
    }
  }
  window.myTurntable=myTurntable;
}());