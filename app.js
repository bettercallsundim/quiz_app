const data = [
  {
    qnum: 1,
    question: "What is the capital of India?",
    options: ["New Delhi", "Mumbai", "Chennai", "Kolkata", "Faridpur"],
    answer: 1,
  },
  {
    qnum: 2,
    question: "What is the capital of USA?",
    options: ["Noakhali", "New Jersey", "California", "Dhaka"],
    answer: 3,
  },
  {
    qnum: 3,
    question: "What is the capital of Bangladesh?",
    options: ["Dhaka", "Noakhali", "Chennai", "Kolkata", "North Dakota"],
    answer: 1,
  },
];

const qcont = document.querySelector(".qcont");
const startscreen = document.querySelector(".start-screen");
const strbtn = document.querySelector(".str-btn");
const againbtn = document.querySelector(".again-btn");
const welcome = document.querySelector(".welcome");
const score = document.querySelector(".score");
var x = -1;
var nxtbtn;
var timeline;
var rstbtn;
var tsbtn;
var tls;

// ------start quiz action-----
strbtn.onclick = function () {
  startscreen.classList.add("d-none");
  x++;
  let myVal = showQue();
  const answers = document.querySelectorAll(".ans-list li");
  isRightWrong(answers, myVal);
  afterMath(nxtbtn, rstbtn, myVal);
};

function showQue() {
  const qelm = `
<div class="qitem mx-auto my-4 rounded-4 board bg-white d-flex align-items-start justify-content-center flex-column p-3">
<div class="tools d-flex justify-content-between align-items-center w-100 mb-2">
  <p class="mb-0 fw-bold bg-secondary text-white px-3 rounded-5">${
    data[x].qnum
  } of ${data.length} Questions.</p>
  <div class="timer d-flex flex-column flex-sm-row ">
    <span class="fw-bold bg-danger text-white px-2 rounded-3">Time Left :</span>
    <span class="fw-bold bg-info text-white px-2 rounded-3 flex-grow-0 text-center tls">00:15s</span>
  </div>
</div>
<div class="timeline"></div>
<div class="ques">
  <span class="ques-no">${data[x].qnum}.</span>
  <span class="the-ques">${data[x].question}</span>
</div>
<!-- ---ans box--- -->
<div class="d-flex justify-content-between align-items-center w-100">
  <div class="ans">
    <ol type="A" class="ans-list">
  ${something()}
    </ol>
  </div>
  <div class="submit align-self-end">
    <div>
    <button class="btn nxt-btn btn-danger px-4">Next</button>
    <button class="btn btn-success d-none px-4 rst-btn">Result</button>
    </div>
  </div>
</div>
</div>`;
  qcont.innerHTML = qelm;
  function something() {
    let liArr = [];
    for (let i = 0; i < data[x].options.length; i++) {
      let liIt = `<li class="ans-item">${data[x].options[i]}</li>`;
      liArr.push(liIt);
    }
    return liArr.join("");
  }

  nxtbtn = document.querySelector(".nxt-btn");
  rstbtn = document.querySelector(".rst-btn");
  timeline = document.querySelector(".timeline");
  tls = document.querySelector(".tls");
  const qpad = document.querySelector(".qitem");
  let ttt = 14;
  let prc = 1;
  var stopwatch = setInterval(() => {
    if (ttt == 0 || ttt > 0) {
      tls.innerHTML = `00:${ttt}s`;
      timeline.style.width = `${(100 / 15) * prc}%`;
      prc++;
      ttt--;
    }
  }, 1000);

  ///disabling the next button
  nxtbtn.style.pointerEvents = "none";
  nxtbtn.classList.remove("btn-danger");
  nxtbtn.classList.add("btn-secondary");

  ///putting back next button features
  var stopwatch2 = setTimeout(() => {
    nxtbtn.style.pointerEvents = "";
    nxtbtn.classList.remove("btn-secondary");
    nxtbtn.classList.add("btn-danger");
  }, 15000);

  // dffjfsdf
  if (x == data.length - 1) {
    nxtbtn.classList.add("d-none");
    var stopwatch3 = setTimeout(() => {
      rstbtn.classList.remove("d-none");
    }, 15000);
  }
  return [stopwatch, nxtbtn, qpad, stopwatch3];
}
function afterMath(nE, rED, myVal) {
  // -----next btn action
  nE.onclick = function () {
    x++;
    if (x < data.length) {
      myVal = showQue();
      const answers = document.querySelectorAll(".ans-list li");
      isRightWrong(answers, myVal);
      afterMath(nxtbtn, rstbtn, myVal);
    }
  };
  rED.onclick = function () {
    myVal[2].remove();
    welcome.classList.remove("d-none");
    welcome.classList.add("d-flex");
    score.innerHTML = `Your Score is : ${finalRes}`;
  };
}
let finalRes = 0;

function isRightWrong(answers, myVal) {
  let clickCount = 0;
  answers.forEach((ans, ind) => {
    ans.onclick = function () {
      clearInterval(myVal[0]);
      clearTimeout(myVal[3]);
      myVal[1].style.pointerEvents = "";
      myVal[1].classList.remove("btn-secondary");
      myVal[1].classList.add("btn-danger");
      if (x == data.length - 1) {
        nxtbtn.classList.add("d-none");
        rstbtn.classList.remove("d-none");
      }
      clickCount++;
      if (clickCount < 2) {
        if (ind + 1 == data[x].answer) {
          ans.classList.add("right-ans");
          finalRes++;
        }

        if (ind + 1 != data[x].answer) {
          ans.classList.add("wrong-ans");
          let anslist = data[x].answer;
          answers[anslist - 1].classList.add("right-ans");
        }
      }
    };
  });
}

againbtn.onclick = function () {
  x = -1;
  finalRes = 0;
  welcome.classList.remove("d-flex");
  welcome.classList.add("d-none");
  startscreen.classList.remove("d-none");
};
