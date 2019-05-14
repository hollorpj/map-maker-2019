import {Boundary} from "src/app/canvas/interface/boundary";

export interface MouseEventConsumer {

  /**
   * Set the pixel boundaries for which events will be pushed to this consumer for
   */
  setBoundary(boundary : Boundary);

  /**
   * Returns true if the point is in the boundary
   * Meant to be used to determine whether to call a consume event
   */
  isClickWithinBoundary(clickX : number, clickY : number) : boolean;

  /**
   * Invoked when a mouse down event is detected
   */
  consumeMouseDown(event);

  /**
   * Invoked when a mouse up event is detected
   */
  consumeMouseUp(event);

  /**
   * Invoked when the mouse moves with the component
   */
  consumeMouseMove(event);

  /**
   * Invoked when a mouse enter event is detected
   */
  consumeMouseEnter(event);

  /**
   * Invoked when a mouse leave event is detected
   */
  consumeMouseLeave(event);

  /**
   * Sets the method which will be invoked during mouse down events
   */
  setMouseDownCallback(callback);

  /**
   * Sets the method which will be invoked during mouse up events
   */
  setMouseUpCallback(callback);

  /**
   * Sets the method which will be invoked during mouse enter events
   */
  setMouseEnterCallback(callback);

  /**
   * Sets the method which will be invoked during mouse leave events
   */
  setMouseLeaveCallback(callback);


  /**
   * Sets the method which will be invoked during mouse move events
   */
  setMouseMoveCallback(callback);



}
