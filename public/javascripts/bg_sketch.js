function getRands(){
    var x_rand=[];
    var y_rand=[];
    let N = parseInt(random(5,10));
    let h = windowHeight/N;
    let x_sd = windowWidth/8;
    x_rand.push(abs(randomGaussian(0, x_sd)));
    y_rand.push(-20);
    for (let i = 0; i <= N; i++) {
        x_rand.push(abs(randomGaussian(0, x_sd))*(-1)**i);
        y_rand.push(h*i + randomGaussian(0, h/2));
    }
    x_rand.push(-abs(randomGaussian(0, x_sd)))
    y_rand.push(windowHeight+20);
    return [x_rand, y_rand];
}

function drawCurve() {
    let rands = getRands();
    let x = rands[0];
    let y = rands[1];
    beginShape();
    curveVertex(x[0],y[0]);
    for (let i = 0; i < x.length; i++) {
        curveVertex(x[i], y[i]);
    }
    curveVertex(x[x.length-1],y[y.length-1]);
    endShape();
}

function drawCurves() {
    translate(windowWidth/2, 0);
    drawCurve();
    drawCurve();
    drawCurve();
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.class('background');
    canvas.position(0,0);
    canvas.style('z-index', '-1');
    noFill();
    stroke(100);
    strokeWeight(0.5);
}

function draw() {
    noLoop();
    drawCurves();
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}
