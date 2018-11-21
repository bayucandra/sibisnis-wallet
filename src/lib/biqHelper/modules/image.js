class BiqHelperImageClass {

  compress(file) {
    const width = 500;
    const height = 300;
    const fileName = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = error => console.log(error);
    reader.onload = event => {
      const img = new Image();
      img.src = event.target.result;
      console.log(event.target.result);
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = width;
        elem.height = height;
        const ctx = elem.getContext('2d');
        // img.width and img.height will give the original dimensions
        ctx.drawImage(img, 0, 0, width, height);

        ctx.canvas.toBlob((blob) => {
          const file = new File([blob], fileName, {
            type: 'image/jpeg',
            lastModified: Date.now()
          });
          console.log(file);
        }, 'image/jpeg', 1);

      };


    };
  }

}

export { BiqHelperImageClass };

const biqHelperImage = new BiqHelperImageClass();

export default biqHelperImage;