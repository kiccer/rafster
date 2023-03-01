let i = 0

function a () {
    console.log(111)
    if (i++ > 100) return
    requestAnimationFrame(a)
}

a()
