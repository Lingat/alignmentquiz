import React from "react";

export const Question = ({ alignmentPayload, item, i }) => {
  const questionsLength = alignmentPayload.questionBank.length - 1;
  return (
    <div id={`question-${i}`}>
      <h3 style={{ textAlign: "center" }}>
        {i + 1} / {questionsLength}
      </h3>
      <fieldset class="questionRadio modal-dialog outer-border">
        <legend>{item.question}</legend>

        {item.choices.length > 5 && (
          <>
            <select name={item.question}>
              {item.choices.map((choice, i) => (
                <option value={`{ "x": ${choice.x}, "y": ${choice.y} }`}>
                  {choice.answer}
                </option>
              ))}
            </select>
          </>
        )}
        {item.choices.length <= 5 &&
          item.choices.map((choice, i) => (
            <div>
              <input
                type="radio"
                id={choice.answer}
                name={item.question}
                value={`{ "x": ${choice.x}, "y": ${choice.y} }`}
                defaultChecked={i === 0}
              />
              <label for={choice.answer}>{choice.answer}</label>
            </div>
          ))}
      </fieldset>
      {i > -1 && (
        <button
          class="prev quizBtn btn"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `#question-${i - 1}`;
          }}
        >
          Previous
        </button>
      )}

      {i < questionsLength ? (
        <button
          class="next quizBtn btn"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `#question-${i + 1}`;
          }}
        >
          Next
        </button>
      ) : (
        <button type="submit" class="btn quizBtn next">
          Submit
        </button>
      )}
    </div>
  );
};
