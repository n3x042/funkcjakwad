function oblicz() {
    var a = parseFloat(document.getElementById('a').value);
    var b = parseFloat(document.getElementById('b').value);
    var c = parseFloat(document.getElementById('c').value);

    var delta = b * b - 4 * a * c;
    var x1, x2;

    if (delta > 0) {
        x1 = (-b + Math.sqrt(delta)) / (2 * a);
        x2 = (-b - Math.sqrt(delta)) / (2 * a);
        document.getElementById('x1').innerText = "x1 wynosi = " + x1.toFixed(2);
        document.getElementById('x2').innerText = "x2 wynosi = " + x2.toFixed(2);
    } else if (delta === 0) {
        x1 = -b / (2 * a);
        document.getElementById('x1').innerText = "x1 = x2 wynosi = " + x1.toFixed(2);
        document.getElementById('x2').innerText = "";
    } else {
        document.getElementById('x1').innerText = "Brak pierwiastków rzeczywistych";
        document.getElementById('x2').innerText = "";
    }

    document.getElementById('delta').innerText = "∆ = " + delta;

    drawParabola(a, b, c);
}



function drawParabola(a, b, c) {
    var canvas = document.getElementById('parabolaCanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // zakres osi 
    var minX = -10;
    var maxX = 10;
    var minY = -50;
    var maxY = 50;

    // skala osi 
    var scaleX = canvas.width / (maxX - minX);
    var scaleY = canvas.height / (maxY - minY);

    // rysowanie osi x i y 
    ctx.beginPath();
    ctx.moveTo(0, scaleY * (maxY - 0));
    ctx.lineTo(canvas.width, scaleY * (maxY - 0));
    ctx.moveTo(scaleX * (0 - minX), 0);
    ctx.lineTo(scaleX * (0 - minX), canvas.height);
    ctx.strokeStyle = 'white';
    ctx.stroke();

    // oznaczenia na osi x
    for (var x = -10; x <= 10; x++) {
        var xPos = scaleX * (x - minX);
        ctx.beginPath();
        ctx.moveTo(xPos, scaleY * (maxY - 0) - 5);
        ctx.lineTo(xPos, scaleY * (maxY - 0) + 5);
        ctx.strokeStyle = 'white';
        ctx.stroke();
        ctx.font = "10px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(x, xPos - 3, scaleY * (maxY - 0) + 15);
    }

    // oznaczenia na osi y 
    for (var y = -50; y <= 50; y += 10) {
        var yPos = scaleY * (maxY - y);
        ctx.beginPath();
        ctx.moveTo(scaleX * (0 - minX) - 5, yPos);
        ctx.lineTo(scaleX * (0 - minX) + 5, yPos);
        ctx.strokeStyle = 'white';
        ctx.stroke();
        ctx.font = "10px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(y, scaleX * (0 - minX) - 20, yPos + 3);
    }

    // parabola
    ctx.beginPath();
    ctx.moveTo(scaleX * (minX - minX), scaleY * (maxY - (a * minX * minX + b * minX + c)));
    for (var x = minX + 0.1; x <= maxX; x += 0.1) {
        var y = a * x * x + b * x + c;
        ctx.lineTo(scaleX * (x - minX), scaleY * (maxY - y));
    }
    ctx.strokeStyle = 'blue';
    ctx.stroke();
}
