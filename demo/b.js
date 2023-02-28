function b () {
    console.log(222)
    requestAnimationFrame(b)
}

b()
