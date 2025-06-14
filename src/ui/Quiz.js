import { Question } from "./Question";

export const Quiz = ({ alignmentPayload, onSubmit }) => (
  <form method="post" action={onSubmit}>
    <div className="slider">
      <div className="questionBox slides">
        <div id={`question--1`}>
          <div class="modal-dialog outer-border nameDialog">
            <label for="name">What's your name?</label>
            <br></br>
            <input autocomplete="off" name="1" maxlength="10" />
            <button
              class="next quizBtn btn"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `#question-0`;
              }}
            >
              Next
            </button>
          </div>
        </div>
        {alignmentPayload.questionBank.map((item, i) => (
          <Question alignmentPayload={alignmentPayload} i={i} item={item} />
        ))}
      </div>
    </div>
  </form>
);
