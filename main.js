
window.onload = function () {
    console.log('onload');
    let canvas = document.getElementById('canvas')
    let context = canvas.getContext('2d')
    let clearAll = document.getElementById('clearAll')
    let save = document.getElementById('save')
    let clientWidth = document.documentElement.clientWidth
    let previousPoint
    let clientHeight = document.documentElement.clientHeight

    let isMobile = /Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(navigator.userAgent)


    if(!isMobile) {
        let msg = '请在移动端设备打开该地址，PC端不支持'
        alert(msg)
        throw msg
    }
    console.log('isMobile', isMobile)

    let selColor = document.querySelector('#selColor').value
    let selWidth = document.querySelector('#selWidth').value

    let colorItem = document.querySelector('#selColor')

    console.log('colorItem', colorItem);
    document.querySelector('#selColor').addEventListener('change', function(e) {
        console.log('color change', e)
    })


    document.getElementById('selWidth').addEventListener('change', function(e) {
        console.log('color change', e)
    })

    canvas.width = clientWidth
    canvas.height = clientHeight

    canvas.addEventListener('touchmove', function(e){
        e.preventDefault()
        let penType = document.querySelector('input[name="penType"]:checked').value
        let {pageX, pageY} = e.touches[0]
        // let pageX = e.touches[0].pageX
        // let pageY = e.touches[0].pageY
        let selColor = document.querySelector('#selColor').value
        let selWidth = document.querySelector('#selWidth').value
        console.log(selColor, selWidth)

        if(penType === 'pen'){
            if(previousPoint){
                // 设置画笔属性
                context.lineCap = 'round'
                context.lineJoin = 'round'

                context.strokeStyle = selColor
                context.lineWidth = selWidth
                context.fill = selColor
                context.beginPath()
                context.moveTo(previousPoint.pageX, previousPoint.pageY)
                context.lineTo(pageX, pageY)
                context.stroke()
            }
            previousPoint = {pageX, pageY}
        }else if(penType === 'eraser'){
            context.clearRect(pageX - selWidth/2, pageY - selWidth/2, selWidth, selWidth)
        }
    })
    canvas.addEventListener('touchend', function(){
        previousPoint = null
    })
    save.onclick = function(){
        // var canvas = document.getElementById('canvas')
        var data = canvas.toDataURL('image/png')
        var newWindow = window.open('about:blank', 'image from canvas')
        newWindow.document.write('<img src="'+data+'" alt="from canvas"/>')
    }
    clearAll.onclick = function(){
        context.clearRect(0, 0, canvas.width, canvas.height)
    }
}