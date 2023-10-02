import { useEffect, useRef, useState } from "react";
import { Plane } from "./lib/plane";
import { SyntheticEvent } from "react";

function useCanvas() {
  const [mouseHandler, setMouseHandler] = useState(() => {
    return (e: SyntheticEvent<HTMLCanvasElement, MouseEvent>) => {
      console.log(e);
    };
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 400;
    canvas.height = 400;
    const plane = new Plane(canvas);
    const handleMouseMove = (
      e: SyntheticEvent<HTMLCanvasElement, MouseEvent>
    ) => {
      plane.vectorA.x = e.nativeEvent.offsetX - plane.offset.x;
      plane.vectorA.y = e.nativeEvent.offsetY - plane.offset.y;
    };
    setMouseHandler(() => handleMouseMove);
    const ctx = canvas.getContext("2d");
    let animationFrameId: number;
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      plane.render(ctx);

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return { canvasRef, mouseHandler };
}
export default useCanvas;
