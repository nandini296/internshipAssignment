// Button
let right = document.getElementById("nextbtn");

let left = document.getElementById("prevbtn");

// Questions
let request = new XMLHttpRequest();
request.open("GET", "./api.json");
request.send();
let ques;
request.onload = () => {
  console.log(request);
  if (request.status == 200) {
    // console.log(JSON.parse(request.response));
    ques = JSON.parse(request.response);

    let selectedOption = document.querySelectorAll(".optionDiv ul");
    let listElements = document.querySelectorAll("ul li");

    let question = document.querySelector("p");
    let addQuesNo = document.getElementById("quesNo");
    let currentQuestion = 0;
    // Numbering
    let totalNumber = ques.length;

    let numbering = currentQuestion + 1 + "/" + totalNumber;
    document.querySelector(".countingPara").innerHTML = numbering;
    let submitBtn = document.querySelector(".submitBtn");

    // numberingFunc(currentQuestion);
    // Initially
    question.innerHTML = "Question " + ques[0].no + " : " + ques[0].q;
    // console.log(ques[0].options.length);
    for (let j = 0; j < ques[0].options.length; j++) {
      let element = document.createElement("li");
      element.innerHTML = ques[0].options[j];
      document.getElementById("list").appendChild(element);
    }

    // Next Button
    function NextQuestion(i) {
      if (i >= ques.length) {
        i = ques.length - 1;
      }
      // console.log(ques.length,"current Question NEXT");
      question.innerHTML = "Question " + ques[i].no + " : " + ques[i].q;
      if (ques[i].data != "Text") {
        for (let j = 0; j < ques[i].options.length; j++) {
          let element = document.createElement("li");
          element.innerHTML = ques[i].options[j];
          document.getElementById("list").appendChild(element);
        }
      } else {
        var x = document.createElement("TEXTAREA");
        x.setAttribute("type", "text");
        x.cols ="40";
        x.rows ="3";
        document.getElementById("list").appendChild(x);
      }


      listElements = document.querySelectorAll("ul li");
      clickColorChange();
      clickedAnswer(currentQuestion);
      let numbering = currentQuestion + 1 + "/" + totalNumber;
      document.querySelector(".countingPara").innerHTML = numbering;
    }

    right.addEventListener("click", () => {
      if (currentQuestion >= ques.length) {
        currentQuestion = ques.length - 1;
      }
      if (currentQuestion < 0) {
        currentQuestion = 0;
      }

      let size = ques[currentQuestion].options.length;
      while (size > 0) {
        document
          .querySelector("ul li")
          .parentElement.removeChild(document.querySelector(" ul li"));
        size--;
      }
      currentQuestion++;
      NextQuestion(currentQuestion);
    });

    // Prev Button
    function PrevQuestion(i) {
      if (i < 0) {
        i = 0;
      }
      // console.log(i,"current Question PREV");
      question.innerHTML = "Question " + ques[i].no + " : " + ques[i].q;
      for (let j = 0; j < ques[i].options.length; j++) {
        let element = document.createElement("li");
        element.innerHTML = ques[i].options[j];
        document.getElementById("list").appendChild(element);
      }
      listElements = document.querySelectorAll("ul li");
      submit();
      clickColorChange();
      clickedAnswer(currentQuestion);
      console.log(currentQuestion);
      let numbering = currentQuestion + 1 + "/" + totalNumber;
      document.querySelector(".countingPara").innerHTML = numbering;
    }

    left.addEventListener("click", () => {
      // console.log(currentQuestion);
      if (currentQuestion < 0) {
        currentQuestion = 0;
      }
      if (currentQuestion >= ques.length) {
        currentQuestion = ques.length - 1;
      }
      // console.log(currentQuestion,"Checkkk");
      let size = ques[currentQuestion].options.length;
      while (size > 0) {
        document
          .querySelector("ul li")
          .parentElement.removeChild(document.querySelector(" ul li"));
        size--;
      }

      currentQuestion--;
      PrevQuestion(currentQuestion);
    });

    listElements = document.querySelectorAll("ul li");

    let colored = -1;
    function clickColorChange() {
      if (currentQuestion < 0) {
        currentQuestion = 0;
      } else if (currentQuestion >= ques.length) {
        currentQuestion = ques.length - 1;
      }
      localStorage.setItem("nandini","okay")
      for (let i = 0; i < listElements.length; i++) {
        listElements[i].addEventListener("click", () => {
          console.log(i)
          localStorage.setItem(currentQuestion, i);
          let clickedAns = localStorage.getItem(currentQuestion);
          listElements[i].style.background = "red";
          for (let j = 0; j < listElements.length; j++) {
            if (clickedAns != j) {
              listElements[j].style.background = "white";
              //   listElements[j].style.color = "black";
            } else {
              continue;
            }
          }
        });
      }
    }

    
    clickColorChange();

    function clickedAnswer(current) {
      if (current < 0) {
        current = 0;
      } else if (current >= ques.length) {
        current = ques.length - 1;
      }

      // let i = ques[current].color;
      let answer = localStorage.getItem(currentQuestion);
      listElements[answer].style.background = "red";

      for (let j = 0; j < listElements.length; j++) {
        if (clickedAnswer != j) {
          listElements[j].style.background = "white";

        } else {
          continue;
        }
      }
    }
  } else {
    console.log(`error ${request.status} ${request.statusText}`);
  }
};
