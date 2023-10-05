import { useEffect, useRef, useState } from "react";
import { Plane } from "./lib/plane";
import { SyntheticEvent } from "react";

function useCanvas(canvasWidth: number, canvasHeight: number) {
  const [mouseHandler, setMouseHandler] = useState(() => {
    return (e: SyntheticEvent<HTMLCanvasElement, MouseEvent>) => {
      console.log(e);
    };
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const plane = new Plane(canvas);
    const ctx = canvas.getContext("2d");
    // let animationFrameId: number;
    const handleMouseMove = (
      e: SyntheticEvent<HTMLCanvasElement, MouseEvent>
    ) => {
      plane.vectorA.x = e.nativeEvent.offsetX - plane.offset.x;
      plane.vectorA.y = e.nativeEvent.offsetY - plane.offset.y;
      update();
    };
    setMouseHandler(() => handleMouseMove);
    function update() {
      if (!ctx) return;
      plane.render(ctx);
    }
    update();
    // function animate() {
    //   if (!ctx) return;
    //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //   plane.render(ctx);

    //   animationFrameId = requestAnimationFrame(animate);
    // }

    // animate();

    // return () => {
    //   cancelAnimationFrame(animationFrameId);
    // };
  }, [canvasHeight, canvasWidth]);

  return { canvasRef, mouseHandler };
}
export default useCanvas;
