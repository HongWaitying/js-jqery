(function(){
    var static={
        name:'radio',
        selections:['单选一','单选二','单选三'],
        defaultcheck:1,             //默认选中
        invalid:[]                  //失效的选项的位置
    }
    var myRadio=function(id , config){

        var target=document.getElementById(id);
        //合并默认参数和用户数据
        var iRadio=Object.assign({},static,config);
        // console.log(iRadio);
        // console.log(iRadio.selections.length);

        //选项模板
        var temp='';
        for(let i=0;i<iRadio.selections.length;i++){
            temp+=`
                <label>
                <input type="radio" name="${iRadio.name}">
                <span>${iRadio.selections[i]}</span>
                </label>
            `;
            
        }
        target.innerHTML=temp;

        //获取对应盒子内的所有input框
        var inps=target.querySelectorAll('input');
        //循环设置默认选项
        for(var j=0;j<inps.length;j++){
            if((j+1)==iRadio.defaultcheck){
                inps[j].setAttribute('checked','checked');
            }
            console.log(iRadio.invalid.length);
            //设置失效选项
            if(iRadio.invalid.length!=0){
                for(let k=0;k<iRadio.invalid.length;k++){
                    if((iRadio.invalid[k]-1)==j){
                        inps[j].setAttribute('disabled','disabled');
                    }
                }
            }
        }




    }

    window.myRadio=myRadio;
}());