export const Graph = ({ alignmentPayload, x, y, name, onRetry }) => {
  const scaleGraph = window.innerWidth > 750 ? 2.8 : 1.4;
  const width = window.innerWidth / scaleGraph;
  const height = window.innerWidth / scaleGraph;
  const padding = 40;
  console.log({ scaleGraph, wwidth: window.innerWidth });
  // Define logical bounds (including negative values)
  const xMin = -100,
    xMax = 100;
  const yMin = -100,
    yMax = 100;

  // Convert logical x to screen X coordinate
  const scaleX = (val) =>
    padding + ((val - xMin) / (xMax - xMin)) * (width - 2 * padding);

  // Convert logical y to screen Y coordinate (inverting SVG y-axis)
  const scaleY = (val) =>
    height - padding - ((val - yMin) / (yMax - yMin)) * (height - 2 * padding);

  const cx = scaleX(x);
  const cy = scaleY(y);

  const xAxisY = scaleY(0); // Y coordinate for X-axis line
  const yAxisX = scaleX(0); // X coordinate for Y-axis line

  const xName = x > 0 ? alignmentPayload.x[1] : alignmentPayload.x[0];
  const yName = y > 0 ? alignmentPayload.y[1] : alignmentPayload.y[0];

  const leaningTowards = Math.abs(x) > Math.abs(y) ? xName : yName;

  const finalAnswer =
    Math.abs(x) === Math.abs(y) ? `${xName} / ${yName}` : leaningTowards;

  // normie centrist area
  const isCenter = x >= -10 && x <= 10 && y <= 10 && y >= -10;
  const centerName = alignmentPayload.center;
  const dotPlacement = (dotX, dotY, userName, color, bold = false) => (
    <>
      <circle cx={dotX} cy={dotY} r={5} fill={color} />
      <text x={dotX + 6} y={dotY - 6} fontSize="12" fill="black">
        {userName}
      </text>
    </>
  );

  return (
    <div className="graphAndText">
      <div class="window">
        <div class="title-bar">
          <h1 class="title">
            {isCenter
              ? `you are a ${centerName}`
              : `You are a ${finalAnswer} bender.`}
          </h1>
        </div>
        <div class="separator"></div>

        <div class="window-pane">
          <svg
            className="graph"
            width={width}
            height={height}
            style={{ border: "1px solid black" }}
          >
            {/* X-axis */}
            <line
              x1={padding}
              y1={xAxisY}
              x2={width - padding}
              y2={xAxisY}
              stroke="black"
            />

            {/* Y-axis */}
            <line
              x1={yAxisX}
              y1={padding}
              x2={yAxisX}
              y2={height - padding}
              stroke="black"
            />
            {alignmentPayload.people.map((p) => {
              return dotPlacement(scaleX(p.x), scaleY(p.y), p.name, p.colour);
            })}

            {dotPlacement(cx, cy, name, "blue", true)}

            <text x={width - padding} y={yAxisX} fontSize="12" fill="black">
              {alignmentPayload.x[1]}
            </text>
            <text x={padding} y={yAxisX} fontSize="12" fill="black">
              {alignmentPayload.x[0]}
            </text>
            <text x={xAxisY} y={padding} fontSize="12" fill="black">
              {alignmentPayload.y[1]}
            </text>
            <text x={xAxisY} y={height - padding} fontSize="12" fill="black">
              {alignmentPayload.y[0]}
            </text>
          </svg>
          <div>
            {isCenter && <p>Yikes</p>}
            <p>
              {xName}: {x > 0 ? x : -x} {yName}: {y > 0 ? y : -y}
            </p>

            <button class="btn" onClick={onRetry}>
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
