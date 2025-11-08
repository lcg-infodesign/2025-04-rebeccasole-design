function preload() {
   data = loadTable("assets/data.csv", "csv", "header");
}

function setup() {
  createCanvas(400, 400);

  let parameters = getURLParams();

  
  let selected = data.findRows(parameters.country, "country")[0];

  let dimensions = [
    "Access to financial assets",
    "Access to justice",
    "Access to land assets",
    "Access to non-land assets",
    "Child marriage eradication",
    "Female genital mutilation eradication",
    "Freedom of movement",
    "Household responsibilities",
    "Political voice",
    "Violence against women eradication",
    "Workplace rights"
  ];

  background ("white");

    for(let i = 0; i < dimensions.length; i++) {
      // filtro sul valore
      let dim = dimensions [i];
      let value = selected.get (dim);

      let angle = map (i, 0, dimensions.length, 0, 360);
      let barLength = map (value, 0, 100, 20, 200);

      push();
      // mi sposto al centro
      translate (windowWidth / 2, windowHeight / 2);
      angleMode(DEGREES);
      rotate (angle);
      line (20, 0, barLength, 0);

      pop();
    }
  
}

function draw() {
 
}
