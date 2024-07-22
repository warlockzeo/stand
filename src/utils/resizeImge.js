// /* Utility function to convert a canvas to a BLOB */
// const dataURLToBlob = function (dataURL) {
//   const BASE64_MARKER = ';base64,';
//   let parts;
//   let contentType;
//   let raw;

//   if (dataURL.indexOf(BASE64_MARKER) === -1) {
//     parts = dataURL.split(',');
//     contentType = parts[0].split(':')[1];
//     raw = parts[1];

//     return new Blob([raw], { type: contentType });
//   }

//   parts = dataURL.split(BASE64_MARKER);
//   contentType = parts[0].split(':')[1];
//   raw = window.atob(parts[1]);
//   const rawLength = raw.length;

//   const uInt8Array = new Uint8Array(rawLength);

//   for (const i = 0; i < rawLength; ++i) {
//     uInt8Array[i] = raw.charCodeAt(i);
//   }

//   return new Blob([uInt8Array], { type: contentType });
// };
// /* End Utility function to convert a canvas to a BLOB      */

//const resizeImage = () => {
//   // Ensure it's an image
//   if (file.type.match(/image.*/)) {
//     // Load the image
//     const reader = new FileReader();
//     reader.onload = function (readerEvent) {
//       const image = new Image();
//       image.onload = function (imageEvent) {
//         // Resize the image
//         let canvas = document.createElement('canvas'),
//           max_size = 544, // TODO : pull max size from a site config
//           width = image.width,
//           height = image.height;
//         if (width > height) {
//           if (width > max_size) {
//             height *= max_size / width;
//             width = max_size;
//           }
//         } else {
//           if (height > max_size) {
//             width *= max_size / height;
//             height = max_size;
//           }
//         }
//         canvas.width = width;
//         canvas.height = height;
//         canvas.getContext('2d').drawImage(image, 0, 0, width, height);
//         const dataUrl = canvas.toDataURL('image/jpeg');
//         const resizedImage = dataURLToBlob(dataUrl);
//         $.event.trigger({
//           type: 'imageResized',
//           blob: resizedImage,
//           url: dataUrl,
//         });
//       };
//       image.src = readerEvent.target.result;
//     };
//     reader.readAsDataURL(file);
//   }
//};

const resizeImage = (settings) => {
  const { file, maxSize } = settings;
  const reader = new FileReader();
  const image = new Image();
  const canvas = document.createElement('canvas');

  const dataURItoBlob = function (dataURI) {
    const bytes =
      dataURI.split(',')[0].indexOf('base64') >= 0
        ? atob(dataURI.split(',')[1])
        : unescape(dataURI.split(',')[1]);
    const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const max = bytes.length;
    const ia = new Uint8Array(max);
    for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
    return new File([ia], { type: mime });
  };

  const resize = () => {
    let width = image.width;
    let height = image.height;
    if (width > height) {
      if (width > maxSize) {
        height *= maxSize / width;
        width = maxSize;
      }
    } else {
      if (height > maxSize) {
        width *= maxSize / height;
        height = maxSize;
      }
    }
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(image, 0, 0, width, height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    return dataURItoBlob(dataUrl);
  };

  return new Promise(function (ok, no) {
    if (!file.type.match(/image.*/)) {
      no(new Error('Not an image'));
      return;
    }
    reader.onload = function (readerEvent) {
      image.onload = function () {
        return ok(resize());
      };
      image.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file);
  });
};
export default resizeImage;
