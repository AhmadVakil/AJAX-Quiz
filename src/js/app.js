var clearHistory = document.getElementById('webStorageButton')
var questionThreeHTML = document.getElementById('threeHTML')
var alternatives = document.getElementById('alternatives')
var questionFourHTML = document.getElementById('fourHTML')
var questionFiveHTML = document.getElementById('fiveHTML')
var question = document.getElementById('questions-part')
var questionOneHTML = document.getElementById('oneHTML')
var questionTwoHTML = document.getElementById('twoHTML')
var buttonText = document.getElementById('button-name')
var secondsViewer = document.getElementById('seconds')
var answer = document.getElementById('answers-part')
var playerHTML = document.getElementById('userName')
var textField = document.getElementById('txtField')
var footer = document.getElementById('page-footer')
var yellowTips = document.getElementById('quotes')
var allTimes = document.getElementById('allTimes')
var note = document.getElementById('note-part')
var time = document.getElementById('time-part')
var body = document.getElementById('bodyPart')
var button = document.getElementById('start')
var tips = document.getElementById('tips')
var alt1 = document.getElementById('alt1')
var alt2 = document.getElementById('alt2')
var alt3 = document.getElementById('alt3')
var alt4 = document.getElementById('alt4')
var currentAlternative = ''
var sortedString = []
var finalQuestion = ''
var totalTime = 0
var winnerTimes = []
button.disabled = true

button.style.animation = 'fadein 3s'
if (typeof (Storage) !== 'undefined') {
  if (localStorage.totalTimePlayed) {
    var ttime = localStorage.totalTimePlayed
    allTimes.style.animation = 'fadein 2s'
    allTimes.innerHTML = ttime
  } else {
    // localStorage.totalTimePlayed = 'There are no records'
    allTimes.style.animation = 'fadein 2s'
    allTimes.innerHTML = 'There are no records'
  }

  if (localStorage.firstTime) {
    var one = localStorage.firstTimeRecord
    var two = localStorage.secondTimeRecord
    var three = localStorage.thirdTimeRecord
    var four = localStorage.fourthTimeRecord
    var five = localStorage.fifthTimeRecord
    var player = localStorage.playerNameRecord

    questionOneHTML.innerHTML = one
    questionTwoHTML.innerHTML = two
    questionThreeHTML.innerHTML = three
    questionFourHTML.innerHTML = four
    questionFiveHTML.innerHTML = five
    playerHTML.innerHTML = player
  } else {
    // localStorage.firstTime = 'No record'
    // questionOneHTML.style.animation = 'fadein 2s'
    questionOneHTML.innerHTML = 'No record'
    questionTwoHTML.innerHTML = 'No record'
    questionThreeHTML.innerHTML = 'No record'
    questionFourHTML.innerHTML = 'No record'
    questionFiveHTML.innerHTML = 'No record'
    playerHTML.innerHTML = 'No Name Provided!'
  }
} else {
  questionOneHTML.innerHTML = 'The Web Storage is undefined for your browser!'
  questionTwoHTML.innerHTML = 'The Web Storage is undefined for your browser!'
  questionThreeHTML.innerHTML = 'The Web Storage is undefined for your browser!'
  questionFourHTML.innerHTML = 'The Web Storage is undefined for your browser!'
  questionFiveHTML.innerHTML = 'The Web Storage is undefined for your browser!'
  playerHTML.innerHTML = 'The Web Storage is undefined for your browser!'
  allTimes.innerHTML = 'The Web Storage is undefined for your browser!'
}

alternatives.style.display = ' none'

function sumUpTime (data) {
  totalTime += data
  quizTotalTimeCounter(totalTime)
  return totalTime
}

function quizTotalTimeCounter (data) {
  if (typeof (Storage) !== 'undefined') {
    if (localStorage.totalTimePlayed) {
      localStorage.totalTimePlayed = data
      allTimes.style.animation = 'fadein 2s'
      allTimes.innerHTML = localStorage.totalTimePlayed
    } else {
      localStorage.totalTimePlayed = Number(data)
      allTimes.style.animation = 'fadein 2s'
      allTimes.innerHTML = localStorage.totalTimePlayed
    }
  } else {
    allTimes.style.animation = 'fadein 2s'
    allTimes.innerHTML = 'The Web Storage is undefined for your browser!'
  }
}

var questPartString = 'Please follow the instructions to do the quiz!'
yellowTips.style.animation = 'fadein 6s'
yellowTips.insertAdjacentHTML('beforeend', questPartString)

var questPartString2 = 'Are you ready? <br>Please enter your name down below to get started!'
question.style.animation = 'fadein 8s'
question.insertAdjacentHTML('beforeend', questPartString2)

var answerPartString = 'What is your name?'
answer.style.animation = 'fadein 9s'
answer.insertAdjacentHTML('beforeend', answerPartString)

var notePartString = 'Note: Consider the time before you get started.<br> You only have 20 seconds for each question to answer!<br>The top five fastest answers and the username will be displayed'
note.style.animation = 'fadein 11s'
note.insertAdjacentHTML('beforeend', notePartString)

var buttonNameString = 'Start The Quiz Now!'
buttonText.style.animation = 'fadein 13s'
buttonText.insertAdjacentHTML('beforeend', buttonNameString)

var tipsString = 'Hint: Please choose a name for your self!'

var timePart = 'Time will appear here'
time.style.animation = 'fadein 15s'
time.insertAdjacentHTML('beforeend', timePart)

var footerPartString = 'If you have any question, please use contact page or send me an email to: av222gx@student.lnu.se'
footer.style.animation = 'fadein 17s'
footer.insertAdjacentHTML('beforeend', footerPartString)

let btn = false

textField.value = 'YOUR NAME HERE'
button.style.background = '#000000'
textField.addEventListener('input', function () {
  tips.innerHTML = ''
  answer.style.paddingBottom = '0px'
  if (textField.value.length >= 0) {
    tips.style.color = 'red'
  }
  checkTextField()
})

textField.addEventListener('click', function () {
  checkTextField()
})

textField.addEventListener('mouseover', function () {
  checkTextField()
})

function saveTime () {
  return answerSeconds
}

clearHistory.addEventListener('click', function () {
  if (typeof (Storage) !== 'undefined') {
    if (localStorage.totalTimePlayed) {
      localStorage.removeItem('totalTimePlayed')
      localStorage.removeItem('firstTimeRecord')
      localStorage.removeItem('secondTimeRecord')
      localStorage.removeItem('thirdTimeRecord')
      localStorage.removeItem('fourthTimeRecord')
      localStorage.removeItem('fifthTimeRecord')

      questionOneHTML.innerHTML = 'No Record'
      questionTwoHTML.innerHTML = 'No Record'
      questionThreeHTML.innerHTML = 'No Record'
      questionFourHTML.innerHTML = 'No Record'
      questionFiveHTML.innerHTML = 'No Record'
      allTimes.style.animation = 'fadein 2s'
      allTimes.innerHTML = '0' + ' Seconds'
    } else {
      allTimes.style.animation = 'fadein 2s'
      allTimes.innerHTML = '0' + ' Seconds'
    }
  } else {
    console.log(localStorage.totalTimePlayed + ' time(s).Sorry, your browser does not support web storage...')
  }
})

/*
My NOTE:
All important events/designs will happen after pressing main button. To find a bug I always follow this button and I can track it easier.
This button is also in connection with other functions, which are: Colors, fades, get, post, secondCounter etc.
*/
var pageCounter = 0
var playerName = ''
button.addEventListener('click', function () {
  pageCounter++
  checkTextField()
  if (pageCounter === 1) {
    document.getElementById('tips').innerHTML = tipsString
    get(QuestionURL)
    secondCounter(20)
    button.style.paddingLeft = '10px'
    button.style.paddingRight = '10px'
    button.style.animation = 'fadein 3s'
    button.innerHTML = 'Submit Answer'
    playerName = textField.value
    console.log(playerName)
    textField.value = ''
  }
  if (btn === false) {
    tips.style.color = 'white'
    answer.style.paddingBottom = '20px'

    changeColor('tips', 'yellow')
  }

  if (pageCounter > 1) {
    tips.style.animation = 'fadein 3s'
    document.getElementById('tips').innerHTML = 'Please Write or choose Your Answer!'
    secondCounter(20)
    get(QuestionURL)

    if (textField.style.display !== 'none') {
      post(AnswerURL, textField.value)
      get(QuestionURL)
      var s = saveTime()
      console.log('Second: ' + s)
    }
    if (textField.style.display === 'none') {
      post(AnswerURL, currentAlternative)
      get(QuestionURL)
      s = saveTime()
    }
  }
  if (pageCounter > 1) {
    localStorage.playerNameRecord = playerName
    playerHTML.innerHTML = playerName

    winnerTimes[pageCounter - 2] = answerSeconds

    winnerTimes.sort(function (a, b) { return a - b })
    sortedString.map(String)
    sortedString[0] = 'It took ' + String(winnerTimes[0]) + ' Seconds for ' + playerName + ' to Answer A Question'
    localStorage.firstTimeRecord = sortedString[0]

    sortedString[1] = 'It took ' + String(winnerTimes[1]) + ' Seconds for ' + playerName + ' to Answer A Question'
    localStorage.secondTimeRecord = sortedString[1]

    sortedString[2] = 'It took ' + String(winnerTimes[2]) + ' Seconds for ' + playerName + ' to Answer A Question'
    localStorage.thirdTimeRecord = sortedString[2]

    sortedString[3] = 'It took ' + String(winnerTimes[3]) + ' Seconds for ' + playerName + ' to Answer A Question'
    localStorage.fourthTimeRecord = sortedString[3]

    sortedString[4] = 'It took ' + String(winnerTimes[4]) + ' Seconds for ' + playerName + ' to Answer A Question'
    localStorage.fifthTimeRecord = sortedString[4]
    var sumOfAll = 0
    for (var i = 0; i < winnerTimes.length; i++) {
      sumOfAll += winnerTimes[i]
    }
    localStorage.totalTimePlayed = sumOfAll
    document.getElementById('total').innerHTML = 'Total Time Played By ' + playerName
  }
})

function getTheQuestions (data) {
  answer.style.animation = 'fadein 2s'
  answer.innerHTML = data.question
}

function checkTextField () {
  var texts = textField.value
  if (texts === null || texts === 'YOUR NAME HERE' || texts.length === 0) {
    btn = false
    button.style.background = '#000000'
    button.style.color = '#313131'
    changeColor('tips', 'yellow')
    textField.value = ''
    button.style.opacity = 0.5
    button.disabled = true
    button.style.boxShadow = '0px 0px 70px #170909'
    answer.style.paddingBottom = '30px'
    textField.style.boxShadow = '0px 0px 70px #FF0000'
    tips.style.animation = 'fadein 2s'
    document.getElementById('tips').innerHTML = 'Please Answer The Question!'
  } else {
    btn = true
    button.style.opacity = 1
    textField.style.boxShadow = '0px 0px 70px #B400FF'
    button.disabled = false
    button.style.background = '#8D1EF4'
    button.style.color = 'white'
  }
}

function changeColor (idEl, color) {
  document.getElementById(idEl).style.color = color
}
