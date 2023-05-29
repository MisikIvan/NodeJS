const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf-8");
const dimensions = data.split(" ").map(Number);

const a = dimensions[0];
const b = dimensions[1];
const c = dimensions[2];

const numCubes = a * b * c;
const numPaintedFaces = 2 * (a * b + b * c + c * a);
const numFacesToPaint = numPaintedFaces - 2 * (a * b + b * c + c * a) + 4 * (a + b + c);

fs.writeFileSync("output.txt", `${numCubes} ${numFacesToPaint}`);
