$(function(){
   
    function getStr(){
        let cities=[]
        let str=('https://gist.githubusercontent.com/soyaine/81399bb2b24ca1bb5313e1985533c640/raw/bdf7df2cbcf70706c4a5e51a7dfb8c933ed78878/TangPoetry.json')
            // console.log(str);
        fetch(str)
        .then(blob => blob.json())
        .then(data => cities.push(...data))
        .catch((err)=>{
            ul.innerHTML=`<li><span>网络请求失败,请稍后再试</span><span></span>
            </li><li><span>----------------------------------------
                    ---------------------------------------</span><span></span></li>`
                    return
        })
        return cities
    }
    let arr=getStr()
    let flag=true
    let targt=[]
    let input=document.querySelector('.box_input input')
    let ul=document.querySelector('ul')
    input.addEventListener('input',function(){
        let self=this
        targt=[]
        if(!/^[\u2E80-\u9FFF]{1,}$/.exec(this.value)&&this.value!==''){
            ul.innerHTML=`<li><span>请输入中文字符</span><span></span>
            </li><li><span>----------------------------------------
                    ---------------------------------------</span><span></span></li>`
                    return
        }
        if(!flag||self.value.trim()==='') {
            if(self.value.trim()===''){
                ul.innerHTML=`<li><span>查找古诗</span><span></span>
            </li><li><span>----------------------------------------
                    ---------------------------------------</span><span></span></li>`
            }
            clearTimeout(this.timer)
            this.timer=setTimeout(() => {
                flag=true
            }, 100);
            return 
        }
        flag=false
        for(let i=0;i<arr.length;i++)
        {
            if(arr[i].detail_author.length>0 && arr[i].detail_author[0].match(self.value))
            {
                 targt.push(arr[i])
                 continue
            }
            if(arr[i].detail_text.length>0 && arr[i].detail_text.match(self.value))
            {
                 targt.push(arr[i])
                 continue
            }
            if(arr[i].title.length>0 && arr[i].title.match(self.value))
            {
                 targt.push(arr[i])
                 continue
            }
        }
        targt=JSON.parse(JSON.stringify(targt))
        // console.log(targt);
        if(targt.length===0)
        {
            ul.innerHTML=`<li><span>暂无</span><span></span>
            </li><li><span>----------------------------------------
                    ---------------------------------------</span><span></span></li>`
        }
        for(let i=0;i<targt.length;i++){
            if(i==0){
                ul.innerHTML=''
            }
            let li=document.createElement('li')
            let span1=document.createElement('span')
            let span2=document.createElement('span')
            let str=targt[i].detail_text.match(self.value)
            if(str){
                targt[i].detail_text=targt[i].detail_text.split('')
                for(let j=str.index;j<str.index+self.value.length;j++){
                    targt[i].detail_text[j]=`<b>${targt[i].detail_text[j]}</b>`
                }
                targt[i].detail_text=targt[i].detail_text.join('')
            }
            str=targt[i].title.match(self.value)
            if(str){
                targt[i].title=targt[i].title.split('')
                for(let j=str.index;j<str.index+self.value.length;j++){
                    targt[i].title[j]=`<b>${targt[i].title[j]}</b>`
                }
                targt[i].title=targt[i].title.join('')
            }
            str=targt[i].detail_author[0].match(self.value)
            if(str){
                targt[i].detail_author[0]=targt[i].detail_author[0].split('')
                for(let j=str.index;j<str.index+self.value.length;j++){
                    targt[i].detail_author[0][j]=`<b>${targt[i].detail_author[0][j]}</b>`
                }
                targt[i].detail_author[0]=targt[i].detail_author[0].join('')
            }
            span1.innerHTML=`${targt[i].detail_text}`
            span2.innerHTML=`${targt[i].title}---${targt[i].detail_author}`
            li.append(span1)
            li.append(span2)
            ul.append(li)
        }
        this.timer=setTimeout(() => {
            flag=true
        }, 100);
    })
})
