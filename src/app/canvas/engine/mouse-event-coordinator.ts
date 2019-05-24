import {MouseEventConsumer} from "src/app/canvas/interface/mouse-event-consumer";

export class MouseEventCoordinator {

  private mouseEventConsumers : MouseEventConsumer[] = [];

  /**
   * Takes in a reference to the DOM element for which the mouse event coordinator will listen for
   */
  constructor(elementReference) {
    let that = this;

    elementReference.onmousedown = function(mouseEvent) {
      that.bubbleMouseDownEvents(mouseEvent);
    }

    elementReference.onmouseup = function(mouseEvent) {
      that.bubbleMouseUpEvents(mouseEvent);
    }

    elementReference.onmousemove = function(mouseEvent) {
      that.bubbleMouseMoveEvents(mouseEvent);
    }

    elementReference.onmouseenter = function(mouseEvent) {
      that.bubbleMouseEnterEvents(mouseEvent);
    }

    elementReference.onmouseleave = function(mouseEvent) {
      that.bubbleMouseLeaveEvents(mouseEvent);
    }

  }

  public addConsumer(mouseEventConsumer : MouseEventConsumer) {
    this.mouseEventConsumers.push(mouseEventConsumer);
  }

  private bubbleMouseDownEvents(mouseEvent) {
    const clickX = mouseEvent.offsetX;
    const clickY = mouseEvent.offsetY;

    for (let i = 0; i < this.mouseEventConsumers.length; i++) {
      if (this.mouseEventConsumers[i].isClickWithinBoundary(clickX, clickY)) {
        this.mouseEventConsumers[i].consumeMouseDown(mouseEvent);
      }
    }

  }

  private bubbleMouseUpEvents(mouseEvent) {
    const clickX = mouseEvent.offsetX;
    const clickY = mouseEvent.offsetY;

    for (let i = 0; i < this.mouseEventConsumers.length; i++) {
      if (this.mouseEventConsumers[i].isClickWithinBoundary(clickX, clickY)) {
        this.mouseEventConsumers[i].consumeMouseUp(mouseEvent);
      }
    }
  }

  private bubbleMouseMoveEvents(mouseEvent) {
    const clickX = mouseEvent.offsetX;
    const clickY = mouseEvent.offsetY;

    for (let i = 0; i < this.mouseEventConsumers.length; i++) {
      if (this.mouseEventConsumers[i].isClickWithinBoundary(clickX, clickY)) {
        this.mouseEventConsumers[i].consumeMouseMove(mouseEvent);
      }
    }
  }

  private bubbleMouseEnterEvents(mouseEvent) {
    const clickX = mouseEvent.offsetX;
    const clickY = mouseEvent.offsetY;

    for (let i = 0; i < this.mouseEventConsumers.length; i++) {
      if (this.mouseEventConsumers[i].isClickWithinBoundary(clickX, clickY)) {
        this.mouseEventConsumers[i].consumeMouseEnter(mouseEvent);
      }
    }
  }

  private bubbleMouseLeaveEvents(mouseEvent) {
    const clickX = mouseEvent.offsetX;
    const clickY = mouseEvent.offsetY;

    for (let i = 0; i < this.mouseEventConsumers.length; i++) {
      if (this.mouseEventConsumers[i].isClickWithinBoundary(clickX, clickY)) {
        this.mouseEventConsumers[i].consumeMouseLeave(mouseEvent);
      }
    }
  }

}
