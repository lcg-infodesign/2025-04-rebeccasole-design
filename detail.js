let data;
let colors;
let targetLoss = 0;
let animatedLoss = 0;

function preload() {
  data = loadTable("assets/data.csv", "csv", "header");
}

function setup() {
  let canvas = createCanvas(500, 500);
  canvas.parent("canvas-holder");
  angleMode(DEGREES);

  colors = {
    Cereals: color("#e2b44c"),
    Fruits: color("#e47b74"),
    Vegetables: color("#90b97c"),
    Meat: color("#c05a4d"),
    Dairy: color("#b9d5e4"),
    Fish: color("#87a7f0"),
    Roots: color("#d9a26e"),
    Others: color("#c7c7c7")
  };

  // leggo i parametri dalla URL
  const params = getURLParams();

  // sostituisco "%20" con spazio
  let country   = decodeURIComponent(params.country);
  let commodity = decodeURIComponent(params.commodity);
  let category  = decodeURIComponent(params.category);

  // variabile di riferimento
  targetLoss = float(params.loss);

  // inserisco i dati nella pagina HTML
  select("#title").html(commodity);
  select("#menu").html(`
    <strong>Category:</strong> ${category}<br>
    <strong>Country:</strong> ${country}<br>
    <strong>Target loss:</strong> ${nf(targetLoss, 1, 1)}%
  `);
}

function draw() {
  background("#fffaf5");
  translate(width / 2, height / 2);

  // recupero categoria per selezionare colore piatto
  let params = getURLParams();
  let category = params.category;
  let plateColor = colors[category] || color("#c7c7c7");

  // animazione graduale
  animatedLoss = lerp(animatedLoss, targetLoss, 0.05);

  // bordo piatto
  noFill();
  stroke(220);
  strokeWeight(25);
  ellipse(0, 0, 320);

  // interno piatto colorato
  noStroke();
  fill(plateColor);
  ellipse(0, 0, 280);

  // parte sprecata (bianca)
  fill(255);
  arc(0, 0, 280, 280, 0, map(animatedLoss, 0, 100, 0, 360));

  // ombra interna leggera
  noFill();
  stroke(255, 200);
  strokeWeight(4);
  ellipse(0, 0, 200);

  // decorazione centrale
  noStroke();
  fill(255, 220);
  ellipse(0, 0, 70);

  // testo informativo
  resetMatrix();
  textAlign(CENTER);
  fill(60);
  textSize(18);
  text("Porzione sprecata", width / 2, height / 2 + 170);
  textSize(30);
  text(`${nf(animatedLoss, 1, 1)}%`, width / 2, height / 2 + 205);
}
