import React, { Component } from "react";
import ReactDom from "react-dom";
import "./assets/style.css";
import quizServices from "./quizServices";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";

class QuizBee extends Component {
  state = {
    questionBank: [],
    score: 0,
    responses: 0
  };
  getQuestions = () => {
    quizServices().then(question => {
      this.setState({
        questionBank: question
      });
    });
  };
  playAgain = () => {
    this.getQuestions();
    this.setState({
      score: 0,
      responses: 0
    });
  };
  computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      this.setState({
        score: this.state.score + 1
      });
    }
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5
    });
  };
  componentDidMount() {
    this.getQuestions();
  }
  render() {
    return (
      <div className="container">
        <div className="title">QuizBee</div>
        {this.state.questionBank.length > 0 &&
          this.state.responses < 5 &&
          this.state.questionBank.map(
            ({ question, answers, correct, questionId }) => (
              <QuestionBox
                question={question}
                option={answers}
                key={questionId}
                selected={answer => this.computeAnswer(answer, correct)}
              />
            )
          )}
        {this.state.responses === 5 ? (
          <Result score={this.state.score} playAgain={this.playAgain} />
        ) : null}
      </div>
    );
  }
}

ReactDom.render(<QuizBee />, document.getElementById("root"));
