 // Node Modules
import React, { Component } from 'react';
import ReactCrop from 'react-cropper';
import 'cropperjs/dist/cropper.css'

/** Custom JS libs */

// Custom CSS
import './PhotoCrop.scss';

class PhotoCrop extends Component {
/*
  _ready = ()=>{

  };*/

  render() {
    return (
        <ReactCrop
          className={"photo-crop" + ( !this.props.imgIsSet ? ' hidden' : '' )}
          aspectRatio={1}
          src={this.props.src}
          ref={this.props.imageCropRefSet}
          ready={this._ready}
          zoomable={false}
          autoCropArea={1}
        />
    )
  }
}

export default PhotoCrop;