import {Observable} from 'rxjs';

class BiqHelperImage {

  resize$(p_obj) {
    let params = {
      file: null,
      max_size: 1200
    };

    Object.assign(params, p_obj);

    return Observable.create( ( observer ) => {

      const reader = new FileReader();
      reader.readAsDataURL(params.file);

      reader.onerror = error => {
        console.error(error)
        reader.abort();
      };

      reader.onload = event => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          let img_width = img.width;
          let img_height = img.height;

          let is_img_need_resize = img_width > params.max_size || img_height > params.max_size;
          let is_img_portrait = img_width < img_height;
          let is_square = img_width === img_height;

          let new_width = 0;
          let new_height = 0;
          if ( is_img_need_resize ) {
            let ratio = img_width/img_height;

            if (is_square) {
              new_width = params.max_size;
              new_height = params.max_size;
            } else if ( is_img_portrait && !is_square ) {
              new_height = params.max_size;
              new_width = new_height * ratio;
            } else if ( !is_img_portrait && !is_square ) {
              new_width = params.max_size;
              new_height = new_width / ratio;
            }

          } else {
            new_width = img_width;
            new_height = img_height;
          }

          new_width = Math.ceil( new_width );
          new_height = Math.ceil( new_height );

          const canvas = document.createElement('canvas');
          canvas.width = new_width;
          canvas.height = new_height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, new_width, new_height);

          ctx.canvas.toBlob( blob => {

/*            const file = new File([blob], fileName, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });*/

            observer.next({
              blob: blob,
              data_url: ctx.canvas.toDataURL(),
              type: params.file.type,
              name: params.file.name
            });

            observer.complete();

          }, params.file.type);

        };//img.onload()

      };//reader.onload()

    } );//Observable.create()

  }//resize()

}

export { BiqHelperImage };

const biqHelperImage = new BiqHelperImage();

export default biqHelperImage;