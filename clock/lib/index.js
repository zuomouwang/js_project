$(function(){
    $('.box').fadeIn(4000)
    //方法一
    // setInterval(function(){
    //     let date=new Date
    //     let sec=date.getSeconds()*6
    //     let min=date.getMinutes()*6
    //     let hour=date.getHours()*30
    //     if(hour==0)
    //     {
    //         $('.hour').css('transition','all 0s')
    //         $('.hour').css('transform',`translate(-50%,-100%) rotate(${hour}deg)`)
    //     }else{
    //         $('.hour').css('transition','all 3s ')
    //         $('.hour').css('transform',`translate(-50%,-100%) rotate(${hour}deg)`)
    //     }
    //     if(min==0)
    //     {
    //         $('.min').css('transition','all 0s')
    //         $('.min').css('transform',`translate(-50%,-100%) rotate(${min}deg)`)
    //     }else{
    //         $('.min').css('transition','all 1s')
    //         $('.min').css('transform',`translate(-50%,-100%) rotate(${min}deg)`)
    //     }
    //     if(sec==0)
    //     {
    //         $('.sec').css('transition','all 0s')
    //         $('.sec').css('transform',`translate(-50%,-100%) rotate(${sec}deg) `)
    //     }else{
    //         $('.sec').css('transition','all 0.05s')
    //         $('.sec').css('transform',`translate(-50%,-100%) rotate(${sec}deg) `)
    //     }
    //     console.log(date.getSeconds()*6);
    // },1000)
    // 方法二
    let date=new Date()
    let sec=date.getSeconds()
    let min=date.getMinutes()
    let hour=date.getHours()
    setInterval(function(){
        $('.hour').css('transition','all 3s ')
        $('.hour').css('transform',`translate(-50%,-100%) rotate(${hour*30}deg)`)
        $('.min').css('transition','all 1s')
        $('.min').css('transform',`translate(-50%,-100%) rotate(${min*6}deg)`)
        $('.sec').css('transition','all 0.05s')
        $('.sec').css('transform',`translate(-50%,-100%) rotate(${sec*6}deg) `)
        sec++
        if(sec%60==0) min++
        if(min%60==0&&sec%60==0) hour++
    },1000)
})