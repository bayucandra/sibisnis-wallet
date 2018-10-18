 // Node Modules
import React, { Component } from 'react';
// import ReactCrop, {makeAspectCrop} from 'react-image-crop';//TODO: plan to uninstall soon
import ReactCrop from 'react-cropper';
import 'cropperjs/dist/cropper.css'

/** Custom JS libs */
import biqHelper from "../../../lib/biqHelper";

// Custom CSS
import './PhotoCrop.scss';

class PhotoCrop extends Component {

  constructor( props ) {
    super(props);

  }

  _crop(){
    console.log( this.cropper.getCropBoxData() );
    console.log( this.cropper.getCanvasData() );
    // console.log(this.cropper.getCroppedCanvas().toDataURL());
    // let dataUrl = this.ref.cropper.getCroppedCanvas().toDataURL();
    // console.log(dataUrl);
  }

  _ready(){
    // let canvas_data = this.prop.cropper.getCanvasData();

  }

  render() {
    return (
        <ReactCrop
          className="photo-crop"
          aspectRatio={1}
          src={this.props.src}
          ref={this.props.imageCropRefSet}
          ready={this._ready.bind(this)}
          zoomable={false}
        />
    )
  }
}

export default PhotoCrop;