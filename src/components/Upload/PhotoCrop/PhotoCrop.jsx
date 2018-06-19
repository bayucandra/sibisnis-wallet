import React, { Component } from 'react';
import ReactCrop, {makeAspectCrop} from 'react-image-crop';
import './PhotoCrop.css';

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
      },
      src: null,
      pixelCrop: {
        x: 10,
        y: 10,
        width: 80,
        height: 80,
      },
      croppedSrc: null
    }
  }

  onImageLoaded = (image) => {
    this.setState({
      crop: makeAspectCrop({
        x: 0,
        y: 0,
        aspect: 1 / 1,
        width: 50,
      }, image.width / image.height),
    });
    console.log('onCropComplete', image)
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
        <ReactCrop
          src={this.props.src}
          crop={this.state.crop}
          onImageLoaded={this.onImageLoaded}
          onComplete={this.onCropComplete}
          onChange={this.onCropChange}
        />
        {/* <button onClick={this.onImageCroped.bind(this, this.props.src, this.state.pixelCrop, 'croped-file')}>Get Croped Image</button>
        {this.state.croppedSrc ? <img src={this.state.croppedSrc} alt="image-src" height="200" width="200" /> : ''} */}
      </div>
    )
  }
}

export default PhotoCrop;