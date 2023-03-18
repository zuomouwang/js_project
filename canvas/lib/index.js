; (function () {
    window.addEventListener('load', function () {
        let can = document.querySelector('#can')
        let drow = can.getContext('2d')
        let color = 0
        let width = 10
        let w_flag = true
        let x, y
        console.log(drow);
        function setsize() {
            can.width = this.innerWidth
            can.height = this.innerHeight
        }
        setsize()
        function move(e) {
            color++
            if (w_flag) {
                width++
            } else {
                width--
            }
            console.log(x, y);
            console.log(e.pageX, e.pageY);
            if (width > 110 || width < 10) {
                w_flag = !w_flag
            }
            if (color > 359) {
                color = 0
            }
            drow.lineWidth = width
            drow.strokeStyle = `hsl(${color},50%,50%)`
            drow.lineCap = "round"
            drow.lineJoin = "round"
            console.log(drow.lineWidth, drow.strokeStyle, drow.lineCap);
            drow.beginPath()
            drow.moveTo(x, y)
            drow.lineTo(e.pageX, e.pageY)
            drow.stroke();
            x = e.pageX
            y = e.pageY
        }
        this.document.addEventListener('mousedown', function (e) {
            x = e.pageX
            y = e.pageY

            document.addEventListener('mousemove', move)
        })
        this.document.addEventListener("mouseup", function () {
            document.removeEventListener('mousemove', move)
        })

    })
}())