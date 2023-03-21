; (function () {
    let flag = true
    let timer = 0

    window.addEventListener('DOMContentLoaded', function () {
        let inputs = this.document.querySelectorAll('.box ul li input')
        let moves = this.document.querySelectorAll('.box ul li .move')
        // let spans = this.document.querySelectorAll('.box ul li .move span')
        function shift(e) {

            let input = document.querySelectorAll('.box ul li input:checked')
            if (!input.length) return
            if (e.target.dataset.index > input[0].dataset.index) {
                for (let i = input[0].dataset.index; i < e.target.dataset.index; i++) {
                    inputs[i].checked = true
                }
            }
            if (e.target.dataset.index < input[input.length - 1].dataset.index) {
                for (let i = e.target.dataset.index; i < input[input.length - 1].dataset.index; i++) {
                    inputs[i].checked = true
                }
            }
        }
        inputs.forEach(function (i, index) {
            i.setAttribute('data-index', index)
        })
        document.addEventListener('keydown', function (e) {
            if (!flag) {
                clearTimeout(timer)
                timer = setTimeout(function () {
                    flag = true
                }, 100)
                return
            }
            flag = false
            if (e.key === 'Shift') {
                inputs.forEach(function (i) {
                    i.addEventListener('click', shift)
                })
            }
            timer = setTimeout(function () {
                flag = true
            }, 1000)
        })
        document.addEventListener('keyup', function (e) {
            if (e.key == 'Shift') {
                inputs.forEach(function (i) {
                    i.removeEventListener('click', shift)
                })
            }
        })
        moves.forEach(function (i, index) {
            i.setAttribute('data-index', index)
        })
        moves.forEach(function (i, index) {
            i.addEventListener('mousedown', function () {
                moves.forEach(function (i) {
                    i.draggable = true
                })
            })
            i.addEventListener('mouseup', function () {
                i.draggable = false
            })
            i.addEventListener('dragstart', function (e) {
                e.dataTransfer.setData('index', e.target.dataset.index)
            })
            i.addEventListener('dragenter', function (e) {
                e.target.parentNode.classList.add('active')
            })
            i.addEventListener('dragover', function (e) {
                e.preventDefault()
            })
            i.addEventListener('dragleave', function (e) {
                e.target.parentNode.classList.remove('active')
            })
            function move(e) {
                e.target.parentNode.classList.remove('active')
                let indexend = e.target.parentNode.dataset.index
                let indexstart = e.dataTransfer.getData('index')
                let tempend = moves[e.target.parentNode.dataset.index].children
                let tempstart = moves[e.dataTransfer.getData('index')].children
                let num1 = tempend.length
                for (let i = 0; i < num1; i++) {
                    moves[indexstart].append(tempend[0])
                    moves[indexend].append(tempstart[0])
                }
            }
            for (let j = 0; j < i.children.length; j++) {
                i.children[j].addEventListener('drop', move)
            }
            i.addEventListener('dragend', function (e) {
                moves.forEach(function (i) {
                    i.draggable = false
                })
            })
        })
    })

}())