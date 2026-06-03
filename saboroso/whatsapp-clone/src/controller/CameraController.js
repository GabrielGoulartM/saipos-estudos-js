export class CameraController {
  constructor(videoEl) {
    this._videoEl = videoEl;

    navigator.mediaDevices.getUserMedia({
      video: true
    }).then(stream => { 
      // A partir de stream, acessamos os elementos que estão sendo enviados (video, audio, etc)
      this._stream = stream;
      this._videoEl.srcObject = stream;
      this._videoEl.play();

    }).catch(err => {
      console.error(err);
    });
  }

  // O método stop deve ficar AQUI, dentro da classe
  stop() {
    // Verificação de segurança: só tenta parar se o stream realmente existir
    if (this._stream) {
      this._stream.getTracks().forEach(track => {  // Corrigido de -> para =>
        track.stop();
      });
    }
  }

  takePicture(mimeType = 'image/png'){
  let canvas = document.createElement('canvas');
  

  canvas.setAttribute('height', this._videoEl.videoHeight);
  canvas.setAttribute('width', this._videoEl.videoWidth);


  let context = canvas.getContext('2d');

  context.drawImage(this._videoEl, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL(mimeType);

}
}


