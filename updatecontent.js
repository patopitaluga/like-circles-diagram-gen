/**
 * Draws the user avatar.
 *
 * @param {object} _thisP5Insance - the p5 instance.
 * @param {boolean} _hideRings -
 */
const updateContent = function(_thisP5Insance, _hideRings) {
  /* global title, circlesByLevels, clickeableButtons */

  // Sets the background every time to replace previous render.
  _thisP5Insance.background(255, 204, 100);

  // Circle sizes settings. Is required to be here because it's relative to _thisP5Insance size.
  const radiusByLevels = [
    0,
    _thisP5Insance.width / 5.4,
    _thisP5Insance.width / 3.27,
    _thisP5Insance.width / 2.4,
  ];
  const sizesByLevel = [
    Math.round(_thisP5Insance.width * 221 / 1080),
    Math.round(_thisP5Insance.width * 128 / 1080),
    Math.round(_thisP5Insance.width * 117 / 1080),
    Math.round(_thisP5Insance.width * 91 / 1080),
  ];
  // Draw the center circle.
  _thisP5Insance.fill(255, 255, 255);
  _thisP5Insance.noStroke();
  _thisP5Insance.circle(0, 0, sizesByLevel[0]);
  _thisP5Insance.fill(0, 0, 0);
  _thisP5Insance.textSize(28);
  _thisP5Insance.textAlign(_thisP5Insance.CENTER, _thisP5Insance.CENTER);
  _thisP5Insance.text('You', 0, 3);

  // Draw the rings
  _thisP5Insance.fill(0, 0, 0, 0);
  if (!_hideRings) {
    _thisP5Insance.stroke(255, 214, 130);
    _thisP5Insance.strokeWeight(sizesByLevel[1] + 1);
    _thisP5Insance.circle(0, 0, _thisP5Insance.width / 2.70);
    _thisP5Insance.strokeWeight(sizesByLevel[2] + 1);
    _thisP5Insance.circle(0, 0, _thisP5Insance.width / 1.625);
    _thisP5Insance.strokeWeight(sizesByLevel[3] + 1);
    _thisP5Insance.circle(0, 0, _thisP5Insance.width / 1.2);
  }
  _thisP5Insance.stroke(255, 255, 255);
  _thisP5Insance.strokeWeight(_thisP5Insance.width / 250);
  if (circlesByLevels[1].length > 0)
    _thisP5Insance.circle(0, 0, _thisP5Insance.width / 2.70);
  if (circlesByLevels[2].length > 0)
    _thisP5Insance.circle(0, 0, _thisP5Insance.width / 1.625);
  if (circlesByLevels[3].length > 0)
    _thisP5Insance.circle(0, 0, _thisP5Insance.width / 1.2);

  _thisP5Insance.noStroke();

  // Draw the rest of the circles.
  for (let r = 0; r <= 3; r++) {
    let angleAccumulatorForThisLevel = 0;
    circlesByLevels[r].forEach((_eachCircle) => {
      let offset = 45;
      if (r === 1) offset = 65;
      if (r === 2) offset = 85;
      if (r === 3) offset = 105;

      _eachCircle.x = radiusByLevels[r] * _thisP5Insance.sin(angleAccumulatorForThisLevel + offset);
      _eachCircle.y = radiusByLevels[r] * _thisP5Insance.cos(angleAccumulatorForThisLevel + offset);
      _eachCircle.size = sizesByLevel[r];

      if (_eachCircle.image) {
        _eachCircle.p5Img = _thisP5Insance.createImage(_eachCircle.size, _eachCircle.size);

        let width = _eachCircle.size;
        let proportionalHeight = Math.round((_eachCircle.size * _eachCircle.maxHeight) / _eachCircle.maxWidth);
        if (proportionalHeight < _eachCircle.size) {
          proportionalHeight = _eachCircle.size;
          width = proportionalHeight * _eachCircle.maxWidth / _eachCircle.maxHeight;
        }
        _eachCircle.p5Img.drawingContext.drawImage(
          _eachCircle.image, // the image
          (width - _eachCircle.size) / -2, // x position
          0, // x position
          width, // the resized width.
          proportionalHeight // the resized height proportional to the new width.
        );

        // Mask the image in a circle.
        const circleMask = _thisP5Insance.createGraphics(_eachCircle.size, _eachCircle.size);
        circleMask.fill('rgba(0, 0, 0, 1)');
        circleMask.circle(_eachCircle.p5Img.width / 2, _eachCircle.p5Img.height / 2, _eachCircle.size);
        _eachCircle.p5Img.mask(circleMask);

        // Sets the uploaded image in the circle element.
        _thisP5Insance.image(
          _eachCircle.p5Img, // which image.
          _eachCircle.x - _eachCircle.size / 2, // position x
          _eachCircle.y - _eachCircle.size / 2, // position y
        );
      }

      angleAccumulatorForThisLevel += _thisP5Insance.TWO_PI / circlesByLevels[r].length; // the step = pi / 2
    });
  }

  // Sets the title that the user has written in the canvas.
  _thisP5Insance.fill(255, 255, 255);
  _thisP5Insance.textSize(_thisP5Insance.height / 17);
  _thisP5Insance.textAlign(_thisP5Insance.CENTER, _thisP5Insance.CENTER);
  _thisP5Insance.text(title, 0, _thisP5Insance.height / -2.2);
};
