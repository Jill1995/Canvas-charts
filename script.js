var data = [
  { name: "Pizza", count: 800, color: "blue" },
  { name: "Nachos", count: 563, color: "red" },
  { name: "Pasta", count: 231, color: "green" },
  { name: "Salad", count: 423, color: "purple" },
  { name: "Taco", count: 300, color: "white" },
];

//barchart canvas
const c = document.getElementById("Drawing");
const ctx = c.getContext("2d");

ctx.font = "italic 12px sans-serif";
drawBars(c, ctx, data, 5);
drawAxes(ctx);

//pie chart canvas
const c2 = document.getElementById("Drawing2");
const ctx2 = c2.getContext("2d");

drawPieChart(c2, ctx2, data);

function drawBars(c, context, dataset, scaleFactor) {
  for (let i = 0; i < dataset.length; i++) {
    let h = dataset[i].count / scaleFactor;
    let bottomMargin = 20;
    let barWidth = 20;
    let x = 250;
    let step = i * 45;

    context.save();
    context.fillStyle = dataset[i].color;
    context.fillRect(x + step, c.height - h - bottomMargin, barWidth, h);
    context.fillStyle = "black";
    context.fillText(dataset[i].name, x + step, 295);
    context.fillText(
      dataset[i].count.toString(),
      x + step,
      c.height - h - bottomMargin - 10
    );

    context.stroke();
    context.restore();
  }
}

function drawAxes(context) {
  context.save();
  context.beginPath();
  //Y axis
  context.moveTo(230, 280);
  context.lineTo(230, 20);
  //X axis
  context.moveTo(230, 280);
  context.lineTo(500, 280);
  context.stroke();
  context.restore();
}

function drawPieChart(canvas, context, dataset) {
  let total = 0;
  for (let i = 0; i < dataset.length; i++) {
    total += dataset[i].count;
  }
  console.log(total);
  let angles = [];
  let angle;
  let beginAngle = 0;
  let endAngle = 0;
  for (let j = 0; j < dataset.length; j++) {
    angle = (dataset[j].count / total) * Math.PI * 2;
    angles.push(angle);

    beginAngle = endAngle;
    endAngle += angles[j];

    context.save();

    context.beginPath();
    context.fillStyle = dataset[j].color;
    context.moveTo(canvas.width / 2, canvas.height / 2);
    context.arc(canvas.width / 2, canvas.height / 2, 100, beginAngle, endAngle);
    context.lineTo(canvas.width / 2, canvas.height / 2);
    //context.stroke();
    context.fill();
    context.restore();
  }
  console.log(angles);
}
