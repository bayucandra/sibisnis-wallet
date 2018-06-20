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
        aspect: 1 / 1,
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
    // debugger;
    let crop = {
      x: 15,
      y: 15,
      width: 70,
      height: 70,
      aspect: 1 / 1,
    }

    if (image.height > image.width) {
      crop.x = 0;
      crop.width = 100;
    } else {
      crop.y = 0;
      crop.height = 100;
    }
    this.setState({crop:crop})
    // this.setState({
    //   crop: makeAspectCrop({
    //     x: 50,
    //     y: 50,
    //     aspect: 1 / 1,
    //     width: 50,
    //   }, image.width / image.height),
    // });
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

        {/* <button onClick={this.onImageCroped.bind(this, this.props.src, this.state.pixelCrop, 'croped-file')}>Get Croped Image</button>
        {this.state.croppedSrc ? <img src={this.state.croppedSrc} alt="image-src" height="200" width="200" /> : ''} */}
      </div>
    )
  }
}

export default PhotoCrop;