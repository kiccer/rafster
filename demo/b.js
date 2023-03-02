let m = 0
function b () {
    console.log('b', m++)
    if (m++ > 400) return
    requestAnimationFrame(b)
}

b()
