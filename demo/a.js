let i = 0

function a () {
    console.log('a', i++)
    if (i++ > 1e6) return
    requestAnimationFrame(a)
}

a()
