var answerSeconds = 0
function secondCounter (startTime) {
  var smartColor = 255 // green should be decreased
  var timeLeft = startTime
  var time = document.getElementById('time-part')
  var smartSize = 40
  var timerId = setInterval(countdown, 1000)
  time.style.color = 'rgb(' + 255 + ',' + 255 + ',' + 0 + ')'
  secondsViewer.style.color = 'rgb(' + 255 + ',' + 255 + ',' + 0 + ')'
  function countdown () {
    smartColor -= 13 // 255/20 = 12.75 So if we decrease it, red will appear step by step depending on seconds
    time.style.color = 'rgb(' + 255 + ',' + smartColor + ',' + 0 + ')'
    secondsViewer.style.color = 'rgb(' + 255 + ',' + smartColor + ',' + 0 + ')'
    smartSize += 5
    secondsViewer.style.animation = 'fadein 2s'
    secondsViewer.style.fontSize = smartSize + 'px'
    if (timeLeft <= 10 && timeLeft !== -1) {
      time.style.animation = 'fadein 3s'
      time.innerHTML = 'Hurry Up!<br><br>'
      secondsViewer.style.animation = 'fadein 2s'
      secondsViewer.innerHTML = timeLeft
    } else if (timeLeft > 10) {
      time.innerHTML = 'seconds remaining<br><br>'
      secondsViewer.style.animation = 'fadein 2s'
      secondsViewer.innerHTML = timeLeft
    }

    if (finalQuestion == null) { // Game is over and user answered all the questions
      clearTimeout(timerId)
      time.style.animation = 'fadein 2s'
      time.innerHTML = 'Well Done!<br>Timer is stopped!'
      secondsViewer.innerHTML = ''
      tips.style.opacity = 0.2
      button.style.display = 'none'
      textField.style.display = 'none'
      alternatives.style.display = 'none'
      answer.style.transition = '2.5s'
      answer.style.paddingBottom = '30px'
      answer.style.animation = 'fadein 2s'
      answer.innerHTML = 'WOW!!<br>You could answer all questions correctly in time.<br>Start the game again and record your highscores<br><br><a href=index.html>Start Again</a>'
      question.style.color = '#FF0000'
      question.style.animation = 'fadein 2s'
      question.innerHTML = 'Quiz Is Done and You WON!'
      tips.style.animation = 'fadein 3s'
      tips.innerHTML = 'I told you, if you repeat it you will get it done!<br>Contact me if you like to implement this quiz!'
      tips.style.opacity = 1
      questionOneHTML.innerHTML = sortedString[0]
      questionTwoHTML.innerHTML = sortedString[1]
      questionThreeHTML.innerHTML = sortedString[2]
      questionFourHTML.innerHTML = sortedString[3]
      questionFiveHTML.innerHTML = sortedString[4]
    }
    if (xhttp2.status === 400) {
      clearTimeout(timerId)
      time.style.animation = 'fadein 2s'
      time.innerHTML = 'Wrong Answer!<br>Start Again'
      secondsViewer.innerHTML = ''
      tips.style.opacity = 0.2
      button.style.display = 'none'
      textField.style.display = 'none'
      alternatives.style.display = 'none'
      answer.style.transition = '2.5s'
      answer.style.paddingBottom = '30px'
      answer.style.animation = 'fadein 2s'
      answer.innerHTML = 'Game Over<br><a href=index.html>Start Over</a>'
      question.style.color = '#FF0000'
      question.style.animation = 'fadein 2s'
      question.innerHTML = 'Wrong Answer!'
      tips.style.animation = 'fadein 2s'
      tips.innerHTML = 'Wrong Answer!<br>In order to finish the quiz you have to answer all question correctly within the specified time.'
      tips.style.opacity = 1
    }

    if (timeLeft === -1) {
      clearTimeout(timerId)
      time.style.animation = 'fadein 2s'
      time.innerHTML = 'Time Is Over!<br>Start Again'
      secondsViewer.innerHTML = ''
      tips.style.opacity = 0.2
      button.style.display = 'none'
      textField.style.display = 'none'
      alternatives.style.display = 'none'
      answer.style.transition = '2.5s'
      answer.style.paddingBottom = '0px'
      answer.style.animation = 'fadein 2s'
      answer.innerHTML = 'Game Over<br><a href=index.html>Start Over</a>'
      question.style.color = '#FF0000'
      question.style.animation = 'fadein 2s'
      question.innerHTML = 'Time Is Over!'
      tips.textContent = 'Sorry, you should try to answer before 20 seconds. However, I am sure you can do it :) You just need to repeat it to explore it!'
      tips.style.opacity = 1
    } else {
      timeLeft--
      answerSeconds = 20 - timeLeft - 1 // More accurate

      button.addEventListener('click', function () { // Timer should be reseted when user press the button, otherwise the last timer will still count and interrupt the time
        if (textField.value !== '' || textField.value !== null || textField.value !== 'YOUR NAME HERE') {
          clearTimeout(timerId)
          // answerSeconds = timeLeft
        }
      })
    }
  }
  if (pageCounter > 1) {
    sumUpTime(answerSeconds)
  }
}
