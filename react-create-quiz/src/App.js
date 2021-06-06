import React, { Component } from "react";
class App extends Component{
  render() {
    return (
      <div>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Trivial Trivia</title>
        {/* <link rel="stylesheet" href="Dapage.css"> */}
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{__html: "\n      input[type=\"text\"] {\n        border-radius: 5px;\n        margin: 3px;\n        outline: none;\n      }\n      textarea {\n        border-radius: 10px;\n        margin: 5px;\n        outline: none;\n      }\n      body {\n        /* background-image: url(https://static.vecteezy.com/system/resources/thumbnails/001/343/485/small_2x/comic-zoom-speed-free-vector.jpg); */\n        background-image: linear-gradient(\n            rgba(0, 0, 0, 0.5),\n            rgba(0, 0, 0, 0.5)\n          ),\n          url(\"img/bg.jpg\");\n        background-size: cover;\n        /* background-repeat: no-repeat; */\n        background-position: center;\n        background-attachment: fixed;\n      }\n      .question_each {\n        width: 80%;\n        margin: auto;\n        margin-top: 30px;\n        margin-bottom: 30px;\n        border: 1px solid white;\n        border-radius: 20px;\n        padding: 10px;\n      }\n      .questions_view {\n        color: white;\n        padding: 20px;\n        margin: auto;\n        margin-top: 40px;\n        border: 1px none;\n        border-radius: 20px;\n        background-color: rgba(27, 77, 128, 0.7);\n        width: 60%;\n        margin-bottom: 40px;\n        padding: 20px 20px;\n      }\n    " }} />
        <form action="http://localhost:3000/quiz_created" method="post" style={{margin: '0 auto'}} id="form">
          <div className="questions_view">
            <h1 className="text-warning" align="center" style={{fontSize: '50px'}}>
              Create Quiz
            </h1>
            {/* <h3 align="center"> */}
            <center>
              <label htmlFor="Combobox">Which domain does your question belong to?</label><br /><br />
              <select name="category" id="Combobox">
                <optgroup label="Combobox">
                  <option value="SELECT">SELECT A CATEGORY</option>
                  <option value="Geography">Geography</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Computers">Computers</option>
                  <option value="Science">Science</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </optgroup></select><br /><br />
              <label htmlFor="quizname">Quiz Name</label><br />
              <textarea id="quizname" name="quizname" rows={2} cols={50} placeholder="Enter quiz name" defaultValue={"          "} />
              <br /><br />
              {/* <hr
            style="
              border-style: dotted;
              border-color: white;
              border-width: 5px 0 0 0;
              /* border-radius: 100%; * /
              width: 60%;
              margin: 40px 0;
            "
          /> */}
              {/* Question 1 */}
              <div className="question_each">
                <label htmlFor="question">1 . Enter your question:</label><br /><br />
                <textarea id="question" name="question[]" rows={3} cols={50} placeholder="Enter your question" defaultValue={"            "} /><br />
                <br />
                <label htmlFor="option">Add options:</label><br /><br />
                <input type="text" id="optiona" name="optiona[]" />
                <input type="checkbox" name="correct[]" id="option1" defaultValue="optiona" /><br />
                <input type="text" id="optionb" name="optionb[]" />
                <input type="checkbox" name="correct[]" id="option2" defaultValue="optionb" /><br />
                <input type="text" id="optionc" name="optionc[]" />
                <input type="checkbox" name="correct[]" id="option3" defaultValue="optionc" /><br />
                <input type="text" id="optiond" name="optiond[]" />
                <input type="checkbox" name="correct[]" id="option4" defaultValue="optiond" /><br />
              </div>
              {/* <hr
            style="
              border-style: dotted;
              border-color: white;
              border-width: 5px 0 0 0;
              /* border-radius: 100%; * /
              width: 60%;
              margin: 40px 0;
            "
          /> */}
              {/* Question 2*/}
              <div className="question_each">
                <label htmlFor="question">2 . Enter your question:</label><br /><br />
                <textarea id="question" name="question[]" rows={3} cols={50} placeholder="Enter your question" defaultValue={"            "} /><br />
                <br />
                <label htmlFor="option">Add options:</label><br /><br />
                <input type="text" id="optiona" name="optiona[]" />
                <input type="checkbox" name="correct[]" id="option1" defaultValue="optiona" /><br />
                <input type="text" id="optionb" name="optionb[]" />
                <input type="checkbox" name="correct[]" id="option2" defaultValue="optionb" /><br />
                <input type="text" id="optionc" name="optionc[]" />
                <input type="checkbox" name="correct[]" id="option3" defaultValue="optionc" /><br />
                <input type="text" id="optiond" name="optiond[]" />
                <input type="checkbox" name="correct[]" id="option4" defaultValue="optiond" /><br />
              </div>
              {/* <hr
            style="
              border-style: dotted;
              border-color: white;
              border-width: 5px 0 0 0;
              /* border-radius: 100%; * /
              width: 60%;
              margin: 40px 0;
            "
          /> */}
              {/* Question 3*/}
              <div className="question_each">
                <label htmlFor="question">3 . Enter your question:</label><br /><br />
                <textarea id="question" name="question[]" rows={3} cols={50} placeholder="Enter your question" defaultValue={"            "} /><br />
                <br />
                <label htmlFor="option">Add options:</label><br /><br />
                <input type="text" id="optiona" name="optiona[]" />
                <input type="checkbox" name="correct[]" id="option1" defaultValue="optiona" /><br />
                <input type="text" id="optionb" name="optionb[]" />
                <input type="checkbox" name="correct[]" id="option2" defaultValue="optionb" /><br />
                <input type="text" id="optionc" name="optionc[]" />
                <input type="checkbox" name="correct[]" id="option3" defaultValue="optionc" /><br />
                <input type="text" id="optiond" name="optiond[]" />
                <input type="checkbox" name="correct[]" id="option4" defaultValue="optiond" /><br />
              </div>
              {/* <hr
            style="
              border-style: dotted;
              border-color: white;
              border-width: 5px 0 0 0;
              /* border-radius: 100%; * /
              width: 60%;
              margin: 40px 0;
            "
          /> */}
              {/* Question 4*/}
              <div className="question_each">
                <label htmlFor="question">4 . Enter your question:</label><br /><br />
                <textarea id="question" name="question[]" rows={3} cols={50} placeholder="Enter your question" defaultValue={"            "} /><br />
                <br />
                <label htmlFor="option">Add options:</label><br /><br />
                <input type="text" id="optiona" name="optiona[]" />
                <input type="checkbox" name="correct[]" id="option1" defaultValue="optiona" /><br />
                <input type="text" id="optionb" name="optionb[]" />
                <input type="checkbox" name="correct[]" id="option2" defaultValue="optionb" /><br />
                <input type="text" id="optionc" name="optionc[]" />
                <input type="checkbox" name="correct[]" id="option3" defaultValue="optionc" /><br />
                <input type="text" id="optiond" name="optiond[]" />
                <input type="checkbox" name="correct[]" id="option4" defaultValue="optiond" /><br />
              </div>
              {/* <hr
            style="
              border-style: dotted;
              border-color: white;
              border-width: 5px 0 0 0;
              /* border-radius: 100%; * /
              width: 60%;
              margin: 40px 0;
            "
          /> */}
              {/* Question 5*/}
              <div className="question_each">
                <label htmlFor="question">5 . Enter your question:</label><br /><br />
                <textarea id="question" name="question[]" rows={3} cols={50} placeholder="Enter your question" defaultValue={"            "} /><br />
                <br />
                <label htmlFor="option">Add options:</label><br /><br />
                <input type="text" id="optiona" name="optiona[]" />
                <input type="checkbox" name="correct[]" id="option1" defaultValue="optiona" /><br />
                <input type="text" id="optionb" name="optionb[]" />
                <input type="checkbox" name="correct[]" id="option2" defaultValue="optionb" /><br />
                <input type="text" id="optionc" name="optionc[]" />
                <input type="checkbox" name="correct[]" id="option3" defaultValue="optionc" /><br />
                <input type="text" id="optiond" name="optiond[]" />
                <input type="checkbox" name="correct[]" id="option4" defaultValue="optiond" /><br /><br />
              </div>
              {/* <input type="submit" value="Add question" onclick="AddRow()" /> */}
              <input type="submit" defaultValue="Submit questions" className="btn btn-warning btn-lg cat_options computer" style={{width: '200px'}} />
              <br /><br />
            </center>
          </div>
        </form>
      </div>
    );
  }
};

export default App;
