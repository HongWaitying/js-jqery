(function(){
    //默认值
    var static={
        name:'checkbox',
        selections:['选项一','选项二','选项三'],
        defaultcheck:1,         //默认选中
        invalid:[]              //失效的选项的位置
    }
    var myCheck=function(id, config){

        var target=document.getElementById(id);
        //合并默认参数和用户数据
        var iCheck=Object.assign({},static,config);

        //选项模板
        var temp='';
        for(let i=0;i<iCheck.selections.length;i++){
            temp+=`
                <label>
                <input type="checkbox" name="${iCheck.name}">
                <span>${iCheck.selections[i]}</span>
                </label>
            `;
            
        }
        target.innerHTML=temp;

        //获取对应盒子内的所有input框
        var inps=target.querySelectorAll('input');
        //循环设置默认选项
        for(var j=0;j<inps.length;j++){
            if((j+1)==iCheck.defaultcheck){
                inps[j].setAttribute('checked','checked');
            }
            //console.log(iCheck.invalid.length);
            //设置失效选项
            if(iCheck.invalid.length!=0){
                for(let k=0;k<iCheck.invalid.length;k++){
                    if((iCheck.invalid[k]-1)==j){
                        inps[j].setAttribute('disabled','disabled');
                    }
                }
            }
        }

    }

    window.myCheck=myCheck;
}());