/**
 * This object will contain every level of circles with the circles as objects with their props.
 */
const circlesByLevels = [
  [{ set: true }],
  [{ set: true }],
  [{ set: true }],
];
let settingImage = '';

// for (let r = 8; r > 1; r--)  circlesByLevels[0].push({ set: false });
// for (let r = 15; r > 1; r--) circlesByLevels[1].push({ set: false });
// for (let r = 26; r > 1; r--) circlesByLevels[2].push({ set: false });

let sketch = function(p) {
  let avatarImg;
  let title = 'Your list';
  /**
   * Draws the user avatar.
   */
  const updateContent = function() {
    /** global avatarImg, p */
    p.background(255, 204, 100);

    p.textSize(32);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(title, 0, containerHeight / -2.2);

    // Draw user avatar in the center
    if (avatarImg) {
      // avatarImg.resize(avatarSize, avatarSize);
      const circleMask = p.createGraphics(avatarSize, avatarSize);
      circleMask.fill('rgba(0, 0, 0, 1)');
      circleMask.circle(Math.floor(avatarImg.width / 2), Math.floor(avatarImg.height / 2), avatarSize);
      avatarImg.mask(circleMask);
      p.image(avatarImg, avatarImg.width / -2, avatarImg.height / -2);
    } else {
      p.noStroke();
      p.circle(0, 0, avatarSize);
      p.textSize(28);
      p.textAlign(p.CENTER, p.CENTER);
      p.text('You', 0, 3);
    }

    // Draw the other circles.
    for (let r = 0; r <= 2; r++) {
      let angle = 0;
      const step = p.TWO_PI / circlesByLevels[r].length;
      const offset = 45;

      let thisLevelRadius;
      let size;
      if (r === 0) { thisLevelRadius = containerWidth / 5.4; size = containerWidth * 128 / 1080; }
      if (r === 1) { thisLevelRadius = containerWidth / 3.27; size = containerWidth * 117 / 1080; }
      if (r === 2) { thisLevelRadius = containerWidth / 2.4; size = containerWidth * 91 / 1080; }
      circlesByLevels[r].forEach((_eachCircle) => {
        if (!_eachCircle.set) return;
        _eachCircle.x = thisLevelRadius * p.sin(angle + offset);
        _eachCircle.y = thisLevelRadius * p.cos(angle + offset);
        _eachCircle.size = size;

        if (_eachCircle.img) {
          // _eachCircle.img.resize(_eachCircle.imgWidth, _eachCircle.imgHeight);
          const circleMask = p.createGraphics(_eachCircle.size, _eachCircle.size);
          circleMask.fill('rgba(0, 0, 0, 1)');
          circleMask.circle(_eachCircle.img.width / 2, _eachCircle.img.height / 2, _eachCircle.size);
          _eachCircle.img.mask(circleMask);
          p.image(_eachCircle.img, _eachCircle.x - _eachCircle.size / 2, _eachCircle.y - _eachCircle.size / 2);
        } else {
          p.circle(_eachCircle.x, _eachCircle.y, size);

          p.textSize(20);
          p.textAlign(p.CENTER, p.CENTER);
          p.text('+', _eachCircle.x, _eachCircle.y);
        }

        angle += step;
      });
    }
  };

  let containerWidth;
  let containerHeight;
  let avatarSize;
  const theSetup = function(forceWidth) {
    if (document.getElementById('defaultCanvas0'))
      document.getElementById('defaultCanvas0').style.display = 'none';
    containerWidth = Math.min(document.getElementById('container').offsetWidth, document.getElementById('container').offsetHeight);
    containerHeight = containerWidth;
    if (forceWidth) {
      containerWidth = forceWidth;
      containerHeight = containerWidth;
    }
    avatarSize = Math.round(containerWidth * 221 / 1080);
    // containerWidth = 1080;
    // containerHeight = 1080;

    // if (document.getElementById('defaultCanvas0')) {
      // p.resizeCanvas(containerWidth, containerHeight);
    // } else {
      p.createCanvas(containerWidth, containerHeight);
    // }
    document.getElementById('defaultCanvas0').style.display = 'block';

    p.background(255, 204, 100);

    p.translate(containerWidth / 2, containerHeight / 2);
    updateContent();
  }
  p.setup = function() {
    theSetup();

    p.mouseMoved = function() {
      const d = p.dist(p.mouseX, p.mouseY, containerWidth / 2, containerHeight / 2);
      if (d < avatarSize / 2) {
        p.cursor('pointer');
        return;
      }
      let overOneCircle = false;
      for (let r = 0; r <= 2; r++) {
        circlesByLevels[r].forEach((_eachCircle) => {
          if (!_eachCircle.set) return;
          const d = p.dist(p.mouseX, p.mouseY, (containerWidth / 2) + _eachCircle.x, (containerHeight / 2) + _eachCircle.y);
          if (d < _eachCircle.size / 2) {
            overOneCircle = true;
            r = 3;
          }
        });
      }
      if (overOneCircle) {
        p.cursor('pointer');
        return;
      }

      p.cursor('default');
    };
    p.mousePressed = function() {
      let d = p.dist(p.mouseX, p.mouseY, containerWidth / 2, containerHeight / 2);
      if (d < avatarSize / 2) {
        settingImage = '0';
        document.getElementById('fileInput').click();
        return;
      }
      let overOneCircle = false;
      for (let r = 0; r <= 2; r++) {
        circlesByLevels[r].forEach((_eachCircle, _index) => {
          if (!_eachCircle.set) return;
          const d = p.dist(p.mouseX, p.mouseY, (containerWidth / 2) + _eachCircle.x, (containerHeight / 2) + _eachCircle.y);
          if (d < _eachCircle.size / 2) {
            settingImage = r + '-' + _index;
            document.getElementById('fileInput').click();
            r = 3;
          }
        });
      }
    };
  }

  window.addEventListener('resize', function() {
    theSetup();
  });

  document.getElementById('export').addEventListener('click', function() {
    theSetup(1080);

    p.save();
    theSetup();
  });

  document.getElementById('titleInput').addEventListener('keyup', function() {
    theSetup();
  });

  /**
   *
   */
  document.getElementById('fileInput').addEventListener('change', function() {
    document.getElementById('loadingfile').classList.add('loadingfile--active');
    const file = document.getElementById('fileInput').files[0];

    if (!file.type.match(/image*/)) return;

    console.log('An image has been loaded');

    var reader = new FileReader();
    reader.onload = function(readerEvent) {
      /* global Image*/
      var image = new Image();
      image.onload = function(imageEvent) {
        var canvas = document.createElement('canvas');
        let maxSize;
        if (settingImage === '0') {
          maxSize = avatarSize;
        } else {
          const settingImageParts = settingImage.split('-');
          maxSize = circlesByLevels[Number(settingImageParts[0])][Number(settingImageParts[1])].size;
        }
        var width = maxSize;
        var height = width * image.height / image.width;
        if (height < maxSize) {
          height = maxSize;
          width = height * image.width / image.height;
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(image, 0, 0, width, height);
        var dataUrl = canvas.toDataURL('image/jpeg');

        // var imgz = document.createElement('img'); // for testing
        // imgz.src =  dataUrl
        // document.body.appendChild(imgz);

        var raw = new Image();
        raw.src = dataUrl;
        raw.onload = function() {
          document.getElementById('fileInput').value = '';
          if (settingImage === '0') {
            avatarImg = p.createImage(maxSize, maxSize);
            avatarImg.drawingContext.drawImage(raw, 0, 0);
          } else {
            const settingImageParts = settingImage.split('-');
            circlesByLevels[Number(settingImageParts[0])][Number(settingImageParts[1])].img = p.createImage(maxSize, maxSize);
            circlesByLevels[Number(settingImageParts[0])][Number(settingImageParts[1])].img.drawingContext.drawImage(raw, 0, 0);
            circlesByLevels[Number(settingImageParts[0])].push({ set: true });
          }
          document.getElementById('loadingfile').classList.remove('loadingfile--active');
          updateContent();
        }
        if (settingImage === '0') {
          avatarImg = p.loadImage(dataUrl);
        } else {
          const settingImageParts = settingImage.split('-');
          circlesByLevels[Number(settingImageParts[0])][Number(settingImageParts[1])].img = p.loadImage(dataUrl);
        }
      };
      image.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file);
  });
};
new p5(sketch, 'container');
