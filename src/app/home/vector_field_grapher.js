//use canvas name `c` or replace "c" in the code


let x_Ra = [-5, 5]
let y_Ra = [-5, 5]
let z_Ra = [-5, 5]

let alpha = 1
let steps = 10
let colorMax = 2
let max = 1
let min = 0.5

let theta = 0

let rotationSpeed = alpha*Math.PI/30

let f1 = function(x)
{return Math.sqrt(-Math.pow(x, 2)+1)}
let f2 = function(x)
{return -Math.sqrt(-Math.pow(x, 2)+1)}

let i_hat = [1, 0]
let j_hat = [0, 1]

  if ( Math.tan(theta) >= 0 )
  {

      if ( theta > Math.PI )
      {

          i_hat[0] = -Math.sqrt(-1/(-1-Math.pow(Math.tan(theta), 2)))
          i_hat[1] = f2(i_hat[0])

      }
      else {

          i_hat[0] = Math.sqrt(-1/(-1-Math.pow(Math.tan(theta), 2)))
          i_hat[1] = f1(i_hat[0])

      }

  }
  else
  {

      if ( theta > Math.PI )
      {

          i_hat[0] = Math.sqrt(-1/(-1-Math.pow(Math.tan(theta), 2)))
          i_hat[1] = f2(i_hat[0])

      }
      else {

          i_hat[0] = -Math.sqrt(-1/(-1-Math.pow(Math.tan(theta), 2)))
          i_hat[1] = f1(i_hat[0])

      }

  }

  let nTheta = theta+Math.PI/2
  if ( Math.tan(nTheta) >= 0 )
  {

      if ( nTheta > Math.PI )
      {

          j_hat[0] = -Math.sqrt(-1/(-1-Math.pow(Math.tan(nTheta), 2)))
          j_hat[1] = f2(j_hat[0])

      }
      else {

          j_hat[0] = Math.sqrt(-1/(-1-Math.pow(Math.tan(nTheta), 2)))
          j_hat[1] = f1(j_hat[0])

      }

  }
  else
  {

      if ( nTheta > Math.PI )
      {

          j_hat[0] = Math.sqrt(-1/(-1-Math.pow(Math.tan(nTheta), 2)))
          j_hat[1] = f2(j_hat[0])

      }
      else {

          j_hat[0] = -Math.sqrt(-1/(-1-Math.pow(Math.tan(nTheta), 2)))
          j_hat[1] = f1(j_hat[0])

      }

  }


let brightness = function(x, y, z)
{

  let avgx;
  avgx = x_Ra[1]/2
  let avgy;
  avgy = y_Ra[1]/2
  let dist;
  dist = (Math.pow(avgx, 2)+Math.pow(avgy, 2))
  return dist/Math.max(Math.pow(x, 2)+Math.pow(y, 2)+Math.pow(z, 2), 0.01)

};
let blend = function(p)
{

  if ( p <= 0.25 )
  {

      return [0, 255*4*p, 255]

  }
  else if ( p <= 0.5 )
  {

      return [0, 255, 255*(1-4*(p-0.25))]

  }
  else if ( p <= 0.75 )
  {

      return [255*(4*(p-0.5)), 255, 0]

  }
  else {

      return [255, 255*(1-4*(p-0.75)), 0]

  }

};
let mini = function(mag, max)
{

  return Math.sign(mag)*((Math.abs(mag)*max)/(Math.abs(mag)+1))

}
let project2d = function(x, y, z)
{

  let away;
  away = (y-y_Ra[0])/(y_Ra[1]-y_Ra[0])
  let avg;
  avg = (y_Ra[1]-y_Ra[0]+x_Ra[1]-x_Ra[0])/2
  return [1/4*away+(-1/2*away+1)*(x-x_Ra[0])/(x_Ra[1]-x_Ra[0]),away+z/avg]

}
let project = function(x, y, z)
{

  return project2d(i_hat[0]*x+j_hat[0]*y, i_hat[1]*x+j_hat[1]*y, z)

}


let evalPts = []
let iy = 0
let iz = 0
for ( let x = x_Ra[0]; x <= x_Ra[1]; x+=(x_Ra[1]-x_Ra[0])/steps )
{

  evalPts.push([])
  iz = 0
  for ( let y = y_Ra[0]; y <= y_Ra[1]; y+=(y_Ra[1]-y_Ra[0])/steps )
  {

      evalPts[iy].push([])
      for ( let z = z_Ra[0]; z <= z_Ra[1]; z+=(z_Ra[1]-z_Ra[0])/steps )
      {

          evalPts[iy][iz].push(f(x, y, z))

      }
      iz++

  }
  iy++

}

HomeComponent.c.scale(1, -1)
HomeComponent.c.translate(0, -h)


let graph = function(f)
{

  let ix = 0
  let iy = 0
  let iz = 0
  for ( let x = x_Ra[0]; x < x_Ra[1]; x+=(x_Ra[1]-x_Ra[0])/steps )
  {

      iy = 0
      for ( let y = y_Ra[0]; y < y_Ra[1]; y+=(y_Ra[1]-y_Ra[0])/steps )
      {

          iz = 0
          for ( let z = z_Ra[0]; z < z_Ra[1]; z+=(z_Ra[1]-z_Ra[0])/steps )
          {

            let light;
            light = brightness(x, y, z)
            let dist;
            dist = Math.sqrt(Math.pow(evalPts[ix][iy][iz][0], 2)+Math.pow(evalPts[ix][iy][iz][1], 2)+
              Math.pow(evalPts[ix][iy][iz][2], 2))
            let maxDist;
            maxDist = Math.sqrt(3*Math.pow(max, 2))
              co = blend(dist/(maxDist*colorMax))
              c.strokeStyle = "rgba("+co[0]+","+co[1]+","+co[2]+","+light+")"
              c.fillStyle = "rgba("+co[0]+","+co[1]+","+co[2]+","+light+")"

            let p1;
            p1 = project(x, y, z)
            let xm;
            xm = mini(evalPts[ix][iy][iz][0], max)
            let ym;
            ym = mini(evalPts[ix][iy][iz][1], max)
            let zm;
            zm = mini(evalPts[ix][iy][iz][2], max)
              xm = Math.sign(xm)*Math.min(xm*Math.sign(xm), max*min)
              ym = Math.sign(ym)*Math.min(ym*Math.sign(ym), max*min)
              zm = Math.sign(zm)*Math.min(zm*Math.sign(zm), max*min)
            let p2;
            p2 = project(x+xm, y+ym, z+zm)

              c.beginPath()
              c.moveTo(w/4+w/2*p1[0], h/4+h/2*p1[1])
              c.lineTo(w/4+w/2*p2[0], h/4+h/2*p2[1])
              c.stroke()

              c.beginPath()
              c.moveTo(w/4+w/2*(2/3*p2[0]+1/3*p1[0]), h/4+h/2*(2/3*p2[1]+1/3*p1[1]))
              c.lineTo(w/4+w/2*(2/3*p2[0]+1/3*p1[0])-7, h/4+h/2*(2/3*p2[1]+1/3*p1[1]))
              c.lineTo(w/4+w/2*p2[0], h/4+h/2*p2[1])
              c.lineTo(w/4+w/2*(2/3*p2[0]+1/3*p1[0])+7, h/4+h/2*(2/3*p2[1]+1/3*p1[1]))
              c.fill()

              iz++

          }

          iy++

      }

      ix++

  }

}
