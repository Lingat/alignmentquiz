import "./App.css";
import { useState } from "react";
import alignmentPayload from "./avatar.json";
import { Graph } from "./ui/Graph";
import { Quiz } from "./ui/Quiz";

const App = () => {
  const [alignment, setAlignment] = useState({ x: 0, y: 0 });
  const [showGraph, setShowGraph] = useState(false);
  const [showQuiz, setShowQuiz] = useState(true);
  const [userInfo, setUserInfo] = useState({ name: "you" });

  const submitQuiz = (form) => {
    const formData = [...form.entries()];
    let x = 0;
    let y = 0;
    formData.forEach((item) => {
      try {
        const change = JSON.parse(item[1]);
        // don't allow it to break the graph
        if (change.x || change.y) {
          if (x < 100 && x > -100) x += change.x;
          if (y < 100 && y > -100) y += change.y;
        }
        console.log(1);
      } catch (err) {
        return;
      }
    });

    setAlignment({ x, y });
    setUserInfo({ name: formData[0][1] });

    setShowQuiz(false);
    setShowGraph(true);
  };

  return (
    <div className="wrapper">
      <p className="heading center">{alignmentPayload.name}</p>
      <div className="quiz">
        {showQuiz && (
          <Quiz alignmentPayload={alignmentPayload} onSubmit={submitQuiz} />
        )}
        <div>
          {showGraph && (
            <Graph
              alignmentPayload={alignmentPayload}
              x={alignment.x}
              y={alignment.y}
              name={`${userInfo.name} (you)`}
              onRetry={() => {
                setShowGraph(false);
                setShowQuiz(true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
