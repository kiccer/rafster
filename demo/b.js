let m = 0
function b () {
    console.log(222)
    if (m++ > 400) return
    requestAnimationFrame(b)
}

b()
