 // Node Modules
import React, { Component } from 'react';
import ReactCrop, {makeAspectCrop} from 'react-image-crop';

// Custom CSS
import './PhotoCrop.scss';

const getCroppedImg = (image, pixelCrop, fileName) => {

  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  var img2 = document.createElement('img'); // use DOM HTMLImageElement
  img2.src = image;
  const ctx = canvas.getContext('2d');
  // debugger;
  ctx.drawImage(
    img2,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As Base64 string
  const base64Image = canvas.toDataURL('image/jpeg');

  return base64Image;
  // As a blob
  // return new Promise((resolve, reject) => {
  //   canvas.toBlob(file => {
  //     file.name = fileName;
  //     resolve(file);
  //   }, 'image/jpeg');
  // });
}

class PhotoCrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crop: {
        x: 10,
        y: 10,
        width: 80,
        height: 80,
        aspect: 1 / 1,
      },
      src: null,
      pixelCrop: {
        x: 10,
        y: 10,
        width: 80,
        height: 80,
        aspect: 1 / 1,
      },
      croppedSrc: null
    }
  }

  onImageLoaded = (image) => {
    // debugger;
    let crop = {
      x: 15,
      y: 15,
      width: 70,
      height: 70,
      aspect: 1 / 1,
    }

    if (image.height > image.width) {
      crop.height = (image.width / image.height) * 100;
      crop.x = 0;
      crop.y = (100 - crop.height) / 2;
      crop.width = 100;
    } else if (image.height < image.width) {
      crop.width = (image.height / image.width) * 100;
      crop.y = 0;
      crop.x = (100 - crop.width) / 2;
      crop.height = 100;
    } else {
      crop.x = 0;
      crop.y = 0;
      crop.width = 100;
      crop.height = 100;
    }

    this.setState({
      crop: crop
    });
  }

  onCropComplete = (crop, pixelCrop) => {
    this.setState({ pixelCrop })

    let cropedImage = getCroppedImg(this.props.src, this.state.pixelCrop, 'cropped-image');
    this.props.onImageCrop(cropedImage);
  }

  onCropChange = (crop, pixelCrop) => {
    this.setState({ crop })
  }

  onImageCroped = (file, pixelCrop, fileName) => {
    // As a blob
    // getCroppedImg(file,pixelCrop,fileName)
    // .then((result)=>{
    //   console.log("Croped Image ====>", result);
    // })

    let cropedImage = getCroppedImg(file, pixelCrop, fileName);
    this.props.onImageCrop(cropedImage);
    this.setState({ croppedSrc: cropedImage });
  }

  render() {
    return (
      <div className="photo-crop-container">
        <div className="photo-crop-container__desktop">
          <ReactCrop
            src={this.props.src}
            crop={this.state.crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
            imageStyle={{ height: '252px' }}
            className="my-image"
          />
        </div>
        <div className="photo-crop-container__mobile">
          <ReactCrop
            src={this.props.src}
            crop={this.state.crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
            imageStyle={{ height: '170px' }}
            className="my-image"
          />
        </div>
      </div>
    )
  }
}

export default PhotoCrop;