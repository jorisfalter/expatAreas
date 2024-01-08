// let start_array = [
//   [-8.995264387023342, 37.52613001504033],
//   [-8.995264387023342, 37.027291043969406],
//   [-7.513023249060555, 37.027291043969406],
//   [-7.513023249060555, 37.52613001504033],
//   [-8.995264387023342, 37.52613001504033],
// ];

let start_array = [
  [-2, -1],
  [-2, 1],
  [2, 1],
  [2, -1],
  [-2, -1],
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
let x_maxIndex = positive_x.indexOf(x_length); // Find the index of the max value
let y_maxIndex = positive_y.indexOf(y_length); // Find the index of the max value

// I'm indifferent between long and short axis, I'm not sure if this is a problem
let a_axis = (x_length * 1.2) / 2;
let b_axis = (y_length * 1.2) / 2;

// Now I need to find the middle point
// I know the first coordinate
// I just need to know the second
// if maxIndex is 0, it means the second coordinate, if maxIndex is 1, it means the third coordinate

let x2 = start_array[x_maxIndex + 1][0];
let y2 = start_array[y_maxIndex + 1][1];

let Cx = x2 + (x1 - x2) / 2;
let Cy = y2 + (y1 - y2) / 2;

// I need to prepare a list of coordinates which I want to solve for y
let x_array_zero_left = Cx - a_axis; // should return zero for y
let x_array_zero_right = Cx + a_axis; // should return zero for y

// this is the array of points we will find y coords for
let x_array = [];
// [x_array_zero_left, Cx, x_array_zero_right];
let total_diff = x1 - x2;
let diff_per_point = total_diff / 10;
for (let j = 0; j <= 10; j++) {
  x_array.push(x1 - diff_per_point * j);
}

// define empty results arrays
let coordinates_pairs_pos = [];
let coordinates_pairs_neg = [];

// Now we have the center points (Cx and Cy) and the long and short axis a and b
// We can calculate coordinates
for (let i = 0; i < x_array.length; i++) {
  let num = (x_array[i] - Cx) ** 2;
  console.log(num);
  let denom = a_axis ** 2;
  console.log(denom);

  let fract = num / denom;
  let below_sqrt = 1 - fract;
  let b_sqrt = b_axis * Math.sqrt(below_sqrt);
  let y_pos = Cy + b_sqrt;
  let y_neg = Cy - b_sqrt;
  coordinates_pairs_pos.push([x_array[i], y_pos]);
  coordinates_pairs_neg.push([x_array[i], y_neg]);
}

console.log(coordinates_pairs_pos);
console.log(coordinates_pairs_neg);
