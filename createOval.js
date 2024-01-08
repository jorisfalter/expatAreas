let start_array = [
  [-8.995264387023342, 37.52613001504033],
  [-8.995264387023342, 37.027291043969406],
  [-7.513023249060555, 37.027291043969406],
  [-7.513023249060555, 37.52613001504033],
  [-8.995264387023342, 37.52613001504033],
];

// find the x and y distance between coordinates. Because I don't always use the same sequence (eg clockwise coords) I have to iteratively find the coordinates
let x1 = start_array[0][0];
let y1 = start_array[0][1];
let diff_array_x = [
  x1 - start_array[1][0],
  x1 - start_array[2][0],
  x1 - start_array[3][0],
];
let diff_array_y = [
  y1 - start_array[1][1],
  y1 - start_array[2][1],
  y1 - start_array[3][1],
];

// Make it positive
let positive_x = diff_array_x.map((value) => Math.abs(value));
let positive_y = diff_array_y.map((value) => Math.abs(value));

let x_length = Math.max(...positive_x);
let y_length = Math.max(...positive_y);

console.log(x_length);
console.log(y_length);
