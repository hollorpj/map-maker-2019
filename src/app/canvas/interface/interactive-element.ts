import {MouseEventConsumer} from "src/app/canvas/interface/mouse-event-consumer";
import {Drawable} from "src/app/canvas/interface/drawable";

export interface InteractiveElement extends MouseEventConsumer, Drawable {

}
