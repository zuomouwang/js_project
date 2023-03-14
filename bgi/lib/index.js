(function(){
    window.addEventListener('load',function(){
        let lis=document.querySelectorAll('.flex ul li')
        lis.forEach(function(i){
            i.addEventListener('click',function(){
                this.classList.toggle('active')
                i.children[0].addEventListener('transitionend',move)
            })
            function move(e){
                i.children[0].removeEventListener('transitionend',move)
                 i.children[2].classList.toggle('move')
                i.children[0].classList.toggle('move')
                console.log(11);
             }
        })
    })
}())