// Drag & Drop Interface
// namespace는 js기능이 아니라 ts기능 중 하나이다

namespace App {
  export interface Draggable {
    dragStartHandler(e: DragEvent): void;
    dragEndHandler(e: DragEvent): void;
  }

  export interface DragTarget {
    dragOverHandler(e: DragEvent): void;
    dropHandler(e: DragEvent): void;
    dragLeaveHandler(e: DragEvent): void;
  }
}
