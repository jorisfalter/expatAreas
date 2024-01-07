function makeShapeCurved(coordinates, numInterpolations) {
  if (coordinates.length !== 4) {
    console.error("Input must have exactly 4 coordinates.");
    return coordinates;
  }

  // Calculate the interpolated points between each pair of coordinates
  const curvedCoordinates = [];
  for (let i = 0; i < 4; i++) {
    const x1 = coordinates[i][0];
    const y1 = coordinates[i][1];
    const x2 = coordinates[(i + 1) % 4][0];
    const y2 = coordinates[(i + 1) % 4][1];

    for (let j = 0; j <= numInterpolations; j++) {
      const t = j / (numInterpolations + 1);
      const x = x1 + t * (x2 - x1);
      const y = y1 + t * (y2 - y1);
      curvedCoordinates.push([x, y]);
    }
  }

  return curvedCoordinates;
}

// Example usage:

const numPoints = 20; // Adjust as needed

const ovalCoordinates = makeShapeCurved(
  [
    [34.8, 24.91],
    [35.34, 23.52],
    [35.55, 24.93],
    [35.13, 26.37],
  ],
  numPoints
);
console.log(ovalCoordinates);
