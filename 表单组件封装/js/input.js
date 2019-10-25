(function(){
    var static={
        default:1,      //默认初始值
        min:1,          //最小值
        max:100,        //最大值
        invalid:false,  //是否失效（false不失效 true失效）
        stepvalue:1     //步伐值
    }
    var myInput=function( id , config){

        var target=document.getElementById(id);
        //合并默认参数和用户数据
        var iInput=Object.assign({},static,config);
        //console.log(iInput);
        //模板
        var temp=`
            <button class="reduce">-</button>
            <input type="text" value="${iInput.default}">
            <button class="add">+</button>
            `;

        target.innerHTML=temp;
        
        var btns=target.querySelectorAll('button');
        for(let b=0;b<btns.length;b++){
            //加减按钮失效
            if(iInput.invalid){
                btns[b].setAttribute('disabled','disabled');
                continue;
            }
            btns[b].onclick=function(){
                //加减按钮功能实现
                if(this.className.indexOf('reduce')>-1){
                    if(iInput.default<=iInput.min){
                        return;
                    }else{
                        iInput.default-=iInput.stepvalue;
                    }
                    myInput(id,iInput);     
                }else{
                    if(iInput.default>=iInput.max){
                        return;
                    }else{
                        iInput.default+=iInput.stepvalue;
                    }
                    myInput(id,iInput);
                }
            }
        }
        
        var inp=target.querySelector('input');
        //输入框失效
        if(iInput.invalid){
            inp.setAttribute('disabled','disabled');
            return;
        }
        //输入框判断
        inp.onchange=function(){
            var val=Number(this.value.trim());
            if(isNaN(val)){
                alert('请输入数字！！');
            }else{
                if(val<iInput.min ||val>iInput.max){
                    alert('输入数字不合理，超出范围！！');
                }else{
                    iInput.default=val;
                }
            }
            myInput(id,iInput);
        }


        
        
    }
    
    window.myInput=myInput;
}());