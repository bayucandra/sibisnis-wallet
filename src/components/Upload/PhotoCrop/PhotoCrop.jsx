 // Node Modules
import React, { Component } from 'react';
import ReactCrop, {makeAspectCrop} from 'react-image-crop';

// Custom CSS
import './PhotoCrop.scss';

class PhotoCrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crop: {
        x: 10,
        y: 10,
        width: 80,
        height: 80,
        aspect: 1,
      },
      src: null,
      pixelCrop: {
        x: 10,
        y: 10,
        width: 80,
        height: 80,
        aspect: 1,
      },
      croppedSrc: null
    }
  }

  onImageLoaded = (image, pixelCrop, something) => {
    // debugger;
    let crop = {
      x: 15,
      y: 15,
      width: 70,
      height: 70,
      aspect: 1
    };

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
    console.log(image);
    console.log(pixelCrop);
    console.log(something);
    console.log(this.pixelCrop);
    this.props.parseCroppedImg( pixelCrop );
    console.log('onImageLoaded');

  };

  onCropComplete = (crop, pixelCrop) => {
    this.setState({ pixelCrop })
    console.log('onCropComplete');

    // let cropedImage = this.props.getCroppedImg(this.props.src, this.state.pixelCrop, 'cropped-image');
  };

  onCropChange = (crop, pixelCrop) => {
    console.log('onCropChange');
    console.log(crop);
    console.log(pixelCrop);
    this.setState({ crop });
    this.props.parseCroppedImg( pixelCrop );
  };

  onImageCroped = (file, pixelCrop, fileName) => {
    // As a blob
    // getCroppedImg(file,pixelCrop,fileName)
    // .then((result)=>{
    //   console.log("Croped Image ====>", result);
    // })

    this.setState({ croppedSrc: cropedImage });
  };

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