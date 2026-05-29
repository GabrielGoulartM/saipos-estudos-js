export class CameraController {
  constructor(videoEl) {
    
    this.videoEl = videoEl; 

   
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(stream => {
        
       
        this.videoEl.srcObject = stream;
        this.videoEl.play();

    }).catch(err => {
        console.error(err);
    });
  }
}