/**
 * Handles the file upload when the input "file" element changes.
 *
 * @param {object} _thisP5Insance - the p5 instance.
 * @param {number} _maxImageSize -
 */
const fileUpload = function(_thisP5Insance, _maxImageSize) {
  /* global circlesByLevels */
  document.getElementById('loadingfile').classList.add('loadingfile--active');
  const file = document.getElementById('fileInput').files[0];

  if (!file.type.match(/image*/)) return;

  // console.log('An image has been loaded');

  var reader = new FileReader();
  reader.onload = function(readerEvent) {
    /* global Image*/
    var image = new Image();
    image.onload = function(imageEvent) {
      var canvas = document.createElement('canvas');
      /*  */
      let width = _maxImageSize;
      let height = width * image.height / image.width;
      if (height < _maxImageSize) {
        height = _maxImageSize;
        width = height * image.width / image.height;
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(image, 0, 0, width, height);
      var dataUrl = canvas.toDataURL('image/jpeg');

      // var imgz = document.createElement('img'); // for testing
      // imgz.src =  dataUrl
      // document.body.appendChild(imgz);

      const rawImage = new Image();
      rawImage.src = dataUrl;
      rawImage.onload = function() {
        document.getElementById('fileInput').value = '';
        circlesByLevels[settingImage].push({
          image: rawImage,
          maxWidth: width,
          maxHeight: height,
        });
        document.getElementById('loadingfile').classList.remove('loadingfile--active');
        updateContent(_thisP5Insance);
      }
    };
    image.src = readerEvent.target.result;
  };
  reader.readAsDataURL(file);
}
