function generateOvalCoordinates(coord1, coord2, coord3, coord4, numPoints) {
  // Calculate the center of the oval
  const centerX = (coord1[0] + coord2[0] + coord3[0] + coord4[0]) / 4;
  const centerY = (coord1[1] + coord2[1] + coord3[1] + coord4[1]) / 4;

  // Calculate semi-major and semi-minor axes lengths
  const semiMajor = Math.sqrt(
    Math.pow(coord1[0] - centerX, 2) + Math.pow(coord1[1] - centerY, 2)
  );
  const semiMinor = Math.sqrt(
    Math.pow(coord2[0] - centerX, 2) + Math.pow(coord2[1] - centerY, 2)
  );

  const angle = Math.atan2(coord2[1] - centerY, coord2[0] - centerX);

  // Generate points around the oval
  const coordinates = [];
  for (let i = 0; i < numPoints; i++) {
    const theta = (i / numPoints) * 2 * Math.PI;
    const x =
      centerX +
      semiMajor * Math.cos(theta) * Math.cos(angle) -
      semiMinor * Math.sin(theta) * Math.sin(angle);
    const y =
      centerY +
      semiMajor * Math.cos(theta) * Math.sin(angle) +
      semiMinor * Math.sin(theta) * Math.cos(angle);
    coordinates.push([x, y]);
  }

  return coordinates;
}

// Example usage:

const numPoints = 20; // Adjust as needed

const ovalCoordinates = generateOvalCoordinates(
  [34.8, 24.91],
  [35.34, 23.52],
  [35.55, 24.93],
  [35.13, 26.37],
  numPoints
);
console.log(ovalCoordinates);
