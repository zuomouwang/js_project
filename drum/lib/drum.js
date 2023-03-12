// require('jquery')
$(function(){
    let timeadd=[]
    let timeremove=[]
    let flag=true
    let timeset=20
    function sound(ele,num){
        flag=false
            $(`.${ele}`)[0].currentTime=0
            $(`.${ele}`)[0].play()
            $('.em').eq(num).addClass('active')
            setTimeout(timer2=setInterval(function(){
                $('.em').eq(num).addClass('active')
            },20),0)
            setTimeout(timer1=setInterval(function(){
                $('.em').eq(num).removeClass('active')
            },50),10)
            timeadd.push(timer2)
            timeremove.push(timer1)
            setTimeout(function(){
                for(let i=0;i<timeadd.length;i++)
                {
                    clearInterval(timeadd[i])
                    clearInterval(timeremove[i])
                }
                console.log(timeadd,timeremove);
                timeadd=[]
                timeremove=[]
                $('.em').eq(num).removeClass('active')
            },150)
            setTimeout(function(){
                flag=true
            },timeset) 
    }
    $(document.documentElement).on('keydown',function(e){
        let timer1=0,timer2=0
        if((e.key=='a'||e.key=='A')&&flag==true)
        {
            sound('clap',0)       
        }
        if((e.key=='s'||e.key=='S')&&flag==true)
        {
            sound('hihat',1)      
        }
        if((e.key=='d'||e.key=='D')&&flag==true)
        {
            sound('kick',2)
        }
        if((e.key=='f'||e.key=='F')&&flag==true)
        {
             sound('openhat',3)
        }
        if((e.key=='g'||e.key=='G')&&flag==true)
        {
             sound('boom',4)
        }
        if((e.key=='h'||e.key=='H')&&flag==true)
        {
             sound('ride',5)
        }
        if((e.key=='j'||e.key=='J')&&flag==true)
        {
             sound('snare',6)
        }
        if((e.key=='k'||e.key=='K')&&flag==true)
        {
             sound('tom',7)
        }
        if((e.key=='l'||e.key=='L')&&flag==true)
        {
             sound('tink',8)
        }
       
        
    })
})