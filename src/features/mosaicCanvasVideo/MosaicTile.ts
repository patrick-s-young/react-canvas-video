export class MosaicTile {
  // constant values directly initialized by constructor args
  context: CanvasRenderingContext2D;
  inPoint: number;
  copyFrom: { x: number, y: number, width: number, height: number };
  drawTo: { x: number, y: number, width: number, height: number };
  // constant values indirectly initialized by constructor args
  video: HTMLVideoElement;

  // used by 'fadeIn()' and 'fadeOut()' animation
  // mehtods to calculate transparency of video drawn to canvas
  fadeDuration: number;
  fadeStartTime: number;
  opacity: number;

  // timing of assigning animation methods 'fadeIn' and 'fadeOut' 
  // to currentEventAction(). Occurs within updateEvent()
  events: Array<{ time: number, action: string }>;
  nextEventTime: number; 
  nextEventIndex: number; 
  maxEventIndex: number;
  currentEventAction: (this: MosaicTile) => void;

  constructor (
    context: CanvasRenderingContext2D,
    inPoint: number,
    copyVideoFromArea: { x: number, y: number, width: number, height: number },
    drawToCanvasArea: { x: number, y: number, width: number, height: number },
    tileAnimEvents: Array<{ time: number, action: string }>,
    tileIndex: number
  ) {
    // constant values directly initialized by corresponding constructor args
    this.context = context;
    this.inPoint = inPoint;
    this.copyFrom = copyVideoFromArea;
    this.drawTo = drawToCanvasArea;
    // constant values indirectly initialized by constructor args
    this.video = document.getElementById(`v${tileIndex}`) as HTMLVideoElement;
    /*
    this.video.src = src; 
    this.video.autoplay = true;
    this.video.loop = true;
    this.video.muted = true;
    this.video.play();
    */
    // constant class values
    this.fadeDuration = 500;
    // dynamic values
    this.currentEventAction = this.drawImage;
    this.fadeStartTime = 0;
    this.opacity = 0;
    // animation object
   
    
    // animation events
    this.events = tileAnimEvents;
    this.nextEventTime = tileAnimEvents[0].time;
    this.nextEventIndex = 0;
    this.maxEventIndex = tileAnimEvents.length;
  }


  updateEvent(this: MosaicTile) {
    const newCurrentEventAction = this.events[this.nextEventIndex].action;
    this.nextEventIndex = (this.nextEventIndex + 1) % this.maxEventIndex;
    this.nextEventTime = this.events[this.nextEventIndex].time;

    switch(newCurrentEventAction) {
      case 'fadeIn':
        this.fadeIn();
        break;
      case 'fadeOut':
        this.fadeOut();
        break;
      default:
        console.log(`ERROR: no case for ${newCurrentEventAction}`);
    }
  }

  resetEvents() {
    this.nextEventIndex = 0;
    this.nextEventTime = this.events[0].time;
  }

  fadeIn() {
    this.video.currentTime = this.inPoint;
    // onseeked
    this.video.play();
    this.fadeStartTime = Date.now();
    this.currentEventAction = () => {
      const timeElapsed = Date.now() - this.fadeStartTime;
      this.opacity = timeElapsed / this.fadeDuration;
      if (this.opacity > 1) {
        this.opacity = 1;
        this.currentEventAction = this.drawImage;
        return;
      }
      this.drawImage();
    }
  }

  fadeOut() {
    this.fadeStartTime = Date.now();
    this.currentEventAction = () => {
      const timeElapsed = Date.now() - this.fadeStartTime;
      this.opacity = 1 - timeElapsed / this.fadeDuration;
      if (this.opacity <= 0) {
        this.opacity = 0;
        this.drawImage();
        this.currentEventAction = this.wait;
        return;
      }
      this.drawImage();
    }
  }

  drawImage(this: MosaicTile) {
    this.context.clearRect(this.drawTo.x, this.drawTo.y, this.drawTo.width, this.drawTo.height);
    this.context.save();

    this.context.globalAlpha = this.opacity;
    this.context.drawImage(
      this.video,
      this.copyFrom.x, this.copyFrom.y, this.copyFrom.width, this.copyFrom.height,
      this.drawTo.x, this.drawTo.y, this.drawTo.width, this.drawTo.height);

    this.context.restore();
  }

  wait() {
    // opacity is zero. wait for fadeIn event
  }

}
