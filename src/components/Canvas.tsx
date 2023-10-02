import useCanvas from "./useCanvas";

function Canvas() {
  const { canvasRef, mouseHandler } = useCanvas();

  return (
    <canvas id="canvas" ref={canvasRef} onMouseMove={mouseHandler}></canvas>
  );
}

export default Canvas;
