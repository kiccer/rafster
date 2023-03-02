let i = 0

function a () {
    console.log('a', i++)
    if (i++ > 100) return
    requestAnimationFrame(a)
}

a()
