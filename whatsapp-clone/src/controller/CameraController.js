export class CameraController {
  constructor(videoEl) {
    this.videoEl = videoEl;

    navigator.mediaDevices.getUserMedia({
      video: true
    }).then(stream => { 
      // A partir de stream, acessamos os elementos que estão sendo enviados (video, audio, etc)
      this._stream = stream;
      this.videoEl.srcObject = stream;
      this.videoEl.play();

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
}