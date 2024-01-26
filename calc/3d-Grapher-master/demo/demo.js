var equation, squareCount, highQuality
let animate;
const ieq = () => {
    savebutton = document.getElementById("1")
    savebutton.style.display = "none"
    againbutton = document.getElementById('2')
    againbutton.style.display = "block"
    equation = document.getElementById("ieq").value
    squareCount = document.getElementById("squareCount").value
    if (document.getElementById("highQuality").value === "on") highQuality = true
    else highQuality = false
    animateGraph()
}

const animateGraph = () => {
    var el = document.getElementById("bg")
    el.width = 2100 // Make sure to keep this width-height 3:2 ratio
    el.height = 1400

    const c = el.getContext("2d")
    const w = c.canvas.width
    const h = c.canvas.height

    c.scale(1, -1)
    c.translate(0, -h)

    const x_Ra = [-5, 5] // x-range of graph
    const y_Ra = [-5, 5] // y-range of graph

    var lightSource = [2.5, 2.5, 2.5]
    var i_hat = [1, 0]
    var j_hat = [1255.77, 0.999]

    var k = 1
    var f = (x, y) => k * eval(equation)
    var v = true

    var theta, tanTheta, tanThetaSquared
    theta = tanTheta = tanThetaSquared = 0

    var blend = (c, int) => {

        var mi = 0
        var max = 0
        for (var i = 0; i < c.length; i++) {

            if (c[i] > max) {

                mi = i
                max = c[i]

            }

        }
        var int255 = 255 * int
        return [int255 * c[0] / c[mi], int255 * c[1] / c[mi], int255 * c[2] / c[mi]]

    }


    var brightness = (x, y, z, lTheta, lPhi) => {

        var mini = (x) => x / (x + 1)

        if (highQuality) {
            displacement = ((x_Ra[1] * x_Ra[1] / 4) + (y_Ra[1] * y_Ra[1] / 4)) / Math.max((x - lightSource[0]) * (x - lightSource[0]) + (y - lightSource[1]) * (y - lightSource[1]) + (z - lightSource[2]) * (z - lightSource[2]), 0.01)
            angSTheta = -((Math.atan(lightSource[1] / Math.max(lightSource[0], 0.01))) % 3.14159)
            distL = Math.sqrt(lightSource[0] * lightSource[0] + lightSource[1] * lightSource[1])
            angSPhi = -((Math.atan(lightSource[2] / Math.max(distL, 0.01))) % 3.14159)
            angLTheta = 1 / Math.max( (angSTheta - (lTheta % 3.14159)) * (angSTheta - (lTheta % 3.14159)), 0.01)
            angLPhi = 1 / Math.max( (angSPhi - (lPhi % 3.14159)) * (angSPhi - (lPhi % 3.14159)), 0.01)
            return mini(20 * mini(displacement) * mini(angLTheta) * mini(angLPhi)) // 20 represents luminosity level
        } else {

            distL = Math.sqrt(lightSource[0] * lightSource[0] + lightSource[1] * lightSource[1])
            angSPhi = -((Math.atan(lightSource[2] / Math.max(distL, 0.01))) % 3.14159)
            angLPhi = 1 / Math.max( (angSPhi - (lPhi % 3.14159)) * (angSPhi - (lPhi % 3.14159)), 0.01)
            return mini(20 * mini(angLPhi)) // 20 represents luminosity level
        }

    }


    var graph = (f, steps) => {

        var ix = 0
        var iy = 0

        var evalPts = []
        var i = 0
        var x = x_Ra[0]

        while (i <= steps) {

            evalPts.push([])
            var y = y_Ra[0]
            var counter = 0

            while (counter <= steps) {

                evalPts[i].push(f(x, y))
                y += (y_Ra[1] - y_Ra[0]) / steps
                counter++

            }

            x += (x_Ra[1] - x_Ra[0]) / steps
            i++

        }

        var start = [x_Ra[0], y_Ra[0]]
        var sizes = [(x_Ra[1] - x_Ra[0]) / steps, (y_Ra[1] - y_Ra[0]) / steps]

        var x = start[0]
        while (ix < steps) {

            iy = 0
            var y = start[1]
            while (iy < steps) {

                var lTheta = ( Math.atan((evalPts[ix + 1][iy] - evalPts[ix][iy]) / sizes[0]) + Math.atan((evalPts[ix + 1][iy + 1] - evalPts[ix][iy + 1]) / (sizes[0])) / 2)
                var lPhi = ( Math.atan((evalPts[ix][iy + 1] - evalPts[ix][iy]) / sizes[1]) + Math.atan((evalPts[ix + 1][iy + 1] - evalPts[ix + 1][iy]) / (sizes[1])) / 2)
                var light = brightness(x, y, evalPts[ix][iy], lTheta, lPhi)

                var c1 = blend([0, 200, 255], light) // c1[0] is color 1
                var c2 = blend([0, 255, 0], light) // c2[0] is color 2

                if (ix % 2 == iy % 2) c.fillStyle = "rgb(" + c1[0] + "," + c1[1] + "," + c1[2] + ")"
                else c.fillStyle = "rgb(" + c2[0] + "," + c2[1] + "," + c2[2] + ")"

                let project = (x, y, z) => {
                    away = (( i_hat[1] * x + j_hat[1] * y ) - y_Ra[0]) / (y_Ra[1] - y_Ra[0])

                    return [0.25 * away + (-0.5 * away + 1) * ((i_hat[0] * x + j_hat[0] * y) - x_Ra[0]) / (x_Ra[1] - x_Ra[0]), away + z / ((y_Ra[1] - y_Ra[0] + x_Ra[1] - x_Ra[0]) / 2)]
                }

                p1 = project(x, y, evalPts[ix][iy])
                p2 = project(x + (x_Ra[1] - x_Ra[0]) / steps, y, evalPts[ix + 1][iy])
                p3 = project(x + (x_Ra[1] - x_Ra[0]) / steps, y + (y_Ra[1] - y_Ra[0]) / steps, evalPts[ix + 1][iy + 1])
                p4 = project(x, y + (y_Ra[1] - y_Ra[0]) / steps, evalPts[ix][iy + 1])

                c.beginPath()
                var w4 = w / 4
                var h4 = h / 4
                c.moveTo(w4 * (2 * p1[0] + 1), h4 * (2 * p1[1] + 1))
                c.lineTo(w4 * (2 * p2[0] + 1), h4 * (2 * p2[1] + 1))
                c.lineTo(w4 * (2 * p3[0] + 1), h4 * (2 * p3[1] + 1))
                c.lineTo(w4 * (2 * p4[0] + 1), h4 * (2 * p4[1] + 1))
                c.lineTo(w4 * (2 * p1[0] + 1), h4 * (2 * p1[1] + 1))
                c.fill()

                iy++
                y += sizes[1]

            }

            ix++
            x += sizes[0]

        }

    }


    var refresh = () => {
        theta += 0.005 // 0.005 represent rotation speed
        tanTheta = Math.tan(theta)
        tanThetaSquared = tanTheta * tanTheta
        theta %= 6.28318

        var val = Math.sqrt(1 / (tanThetaSquared + 1))
        var eval = Math.sqrt(-(i_hat[0] * i_hat[0]) + 1)
        if (tanTheta >= 0) {

            if (theta > 3.14159) {

                i_hat[0] = -val 
                i_hat[1] = -eval

            } else {

                i_hat[0] = val
                i_hat[1] = eval

            }

        } else {

            i_hat[0] = -val 
            i_hat[1] = eval

        }

        let nTheta = (theta + 1.570795) % 6.28318
        let tanNTheta = Math.tan(nTheta)
        let tanNThetaSquared = tanNTheta * tanNTheta
        let val2 = Math.sqrt(1 / (tanNThetaSquared + 1))
        let eval2 = Math.sqrt(-(j_hat[0] * j_hat[0]) + 1)
        if (tanNTheta >= 0) {

            if (nTheta > 3.14159) {

                j_hat[0] = -val2
                j_hat[1] = -eval2

            } else {

                j_hat[0] = val2
                j_hat[1] = eval2

            }

        } else {

            j_hat[0] = -val2 
            j_hat[1] = eval2

        }

        c.fillStyle = "white"
        c.fillRect(0, 0, w, h)

        graph(f, squareCount) // 64 represents graph square amount
        if (k >= 1) {
            v = false
        } else if (k <= -1) {
            v = true
        }
        if (v) {
            k += 0.05
        } else{
            k -= 0.05
        }

        theta += 0.005 // 0.005 represent rotation speed
        animate = window.requestAnimationFrame(refresh)
    }

    refresh()
}

const cancel = () => {
    window.cancelAnimationFrame(animate)
}
