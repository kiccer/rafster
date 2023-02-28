function b () {
    console.log(111)
    requestAnimationFrame(b)
}

b()
