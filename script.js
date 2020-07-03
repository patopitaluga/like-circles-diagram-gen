/**
 * This object will contain every level of circles with the circles as objects with their props.
 */
const circlesByLevels = [[], [], [], [],]; // four sets of "circles" including the central one.
const clickeableButtons = []; // four buttons to upload images;
let settingImage = -1; // Required to comunicate which group of will be updated when the onchange is triggered in the file input.
let title = 'Your list';

/**
 * Inits p5 in a container with id="container".
 */
new p5(function(_thisP5Insance) {
  let containerWidth;
  let containerHeight;
  const maxImageSize = 221;
  const theSetup = function(forceWidth) {
    if (document.getElementById('defaultCanvas0'))
      document.getElementById('defaultCanvas0').style.display = 'none';
    containerWidth = Math.min(document.getElementById('container').offsetWidth, document.getElementById('container').offsetHeight);
    containerHeight = containerWidth;
    if (forceWidth) {
      containerWidth = forceWidth;
      containerHeight = containerWidth;
    }

    _thisP5Insance.createCanvas(containerWidth, containerHeight);
    document.getElementById('defaultCanvas0').style.display = 'block';

    _thisP5Insance.background(255, 204, 100);

    _thisP5Insance.translate(containerWidth / 2, containerHeight / 2);
    updateContent(_thisP5Insance);
  }
  _thisP5Insance.setup = function() {
    theSetup();

    let mouseIsOverAvatar = false;
    let mouseIsOverCircle = 0;

    /**
     * Handle mouse move to check if it's over the avatar or a ring.
     */
    _thisP5Insance.mouseMoved = function() {
      mouseIsOverAvatar = false;
      mouseIsOverOneCircle = 0;
      const d = _thisP5Insance.dist(_thisP5Insance.mouseX, _thisP5Insance.mouseY, (_thisP5Insance.width / 2), (_thisP5Insance.height / 2));
      if (d < Math.round(_thisP5Insance.width * 221 / 1080) / 2) { // the relative size of 221px in full width, / 2 because is the radius.
        mouseIsOverAvatar = true;
      }
      if (
        d > _thisP5Insance.width / 8 &&
        d < _thisP5Insance.width / 4.05
      )
        mouseIsOverOneCircle = 1;
      if (
        d > _thisP5Insance.width / 3.99 &&
        d < _thisP5Insance.width / 2.75
      )
        mouseIsOverOneCircle = 2;
      if (
        d > _thisP5Insance.width / 2.7 &&
        d < _thisP5Insance.width / 2.15
      )
        mouseIsOverOneCircle = 3;
      if (mouseIsOverAvatar || mouseIsOverOneCircle > 0) {
        _thisP5Insance.cursor('pointer');
        return;
      }
      _thisP5Insance.cursor('default');
    };

    /**
     * Handle mouse click to check if it's the avatar or a ring.
     */
    _thisP5Insance.mouseClicked = function() {
      if (mouseIsOverAvatar) {
        settingImage = 0;
        document.getElementById('fileInput').click();
      }
      if (mouseIsOverOneCircle > 0) {
        settingImage = mouseIsOverOneCircle;
        document.getElementById('fileInput').click();
      }
    };
  }

  window.addEventListener('resize', function() {
    theSetup();
  });

  document.getElementById('export').addEventListener('click', function() {
    theSetup(1080);

    _thisP5Insance.save(); // p5 image generator.
    theSetup();
  });

  document.getElementById('titleInput').addEventListener('keyup', function() {
    title = document.getElementById('titleInput').value;
    updateContent(_thisP5Insance);
  });

  document.getElementById('fileInput').addEventListener('change', () => { fileUpload(_thisP5Insance, maxImageSize); });
}, 'container');
