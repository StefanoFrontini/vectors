import useCanvas from "./useCanvas";

function Canvas() {
  const { canvasRef, mouseHandler } = useCanvas(600, 600);

  return (
    <canvas id="canvas" ref={canvasRef} onMouseMove={mouseHandler}></canvas>
  );
}

export default Canvas;
