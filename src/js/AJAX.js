var AnswerURL = 'http://vhost3.lnu.se:20080/answer/1'
var QuestionURL = 'http://vhost3.lnu.se:20080/question/1'
var xhttp = new XMLHttpRequest()
function get (url) {
  return new Promise(function (resolve, reject) {
    xhttp.open('GET', url, true)
    xhttp.onload = function () {
      var questions = JSON.parse(xhttp.responseText)
      if (xhttp.status === 404 && questions.message === 'Correct answer!') {
        console.log('Quiz is finished and your answer was correct')
      }
      if (xhttp.status === 200) {
        resolve(JSON.parse(xhttp.response))
        var questions = JSON.parse(xhttp.responseText)
        getTheQuestions(questions)
        AnswerURL = questions.nextURL
        console.log('GET MESSAGE' + questions.message)
        if (questions.alternatives != null) {
          var altText1 = document.getElementById('alt1TEXT')
          var altText2 = document.getElementById('alt2TEXT')
          var altText3 = document.getElementById('alt3TEXT')
          var altText4 = document.getElementById('alt4TEXT')
          var rad = document.getElementById('alternatives').options
          if (questions.alternatives.alt1 != null) {
            altText1.style.animation = 'fadein 2s'
            altText1.innerHTML = questions.alternatives.alt1
            alt1.style.display = 'inline-block'
          } else {
            alt1.style.display = 'none'
            altText1.style.display = 'none'
          }

          if (questions.alternatives.alt2 != null) {
            altText2.style.animation = 'fadein 3s'
            altText2.innerHTML = questions.alternatives.alt2
            alt2.style.display = 'inline-block'
          } else {
            alt2.style.display = 'none'
            altText2.style.display = 'none'
          }

          if (questions.alternatives.alt3 != null) {
            altText3.style.animation = 'fadein 4s'
            altText3.innerHTML = questions.alternatives.alt3
            alt3.style.display = 'inline'
          } else {
            alt3.style.display = 'none'
            altText3.style.display = 'none'
          }

          if (questions.alternatives.alt4 != null) {
            altText4.style.animation = 'fadein 5s'
            altText4.innerHTML = questions.alternatives.alt4
            alt4.style.display = 'inline'
            altText4.style.display = 'inline'
          } else {
            alt4.style.display = 'none'
            altText4.style.display = 'none'
          }

          textField.style.display = 'none'
          alternatives.style.transition = 'all 2s'
          alternatives.style.display = 'inline-block'

          var prev = null
          for (var i = 0; i < rad.length; i++) {
            rad[i].checked = false

            rad[i].onclick = function () {
              if (this !== prev) {
                prev = this
              }
              if (this === prev) {
                btn = true
                button.style.opacity = 1
                textField.style.boxShadow = '0px 0px 70px #B400FF'
                button.disabled = false
                tips.style.animation = 'fadein 4s'
                document.getElementById('tips').innerHTML = ''

                button.style.background = '#8D1EF4'
                button.style.color = 'white'
                answer.style.paddingBottom = '5px'
                currentAlternative = this.value
                console.log(this.value)
              } else {
                btn = false
                button.style.background = '#000000'
                button.style.color = '#313131'
                changeColor('tips', 'yellow')
                textField.value = ''
                button.style.opacity = 0.5
                button.disabled = true
                button.style.boxShadow = '0px 0px 70px #170909'
                answer.style.paddingBottom = '20px'
                textField.style.boxShadow = '0px 0px 70px #FF0000'
                document.getElementById('tips').innerHTML = 'You should choose at least one alternative!'
              }
            }
          }
        } else {
          textField.style.display = 'inline-block'
          alternatives.style.display = 'none'
        }

        question.style.animation = 'fadein 2s'
        question.innerHTML = 'Please Answer The Question'
        checkTextField()
      } else {
        reject(xhttp.statusText)
      }
    }

    xhttp.onerror = function () {
      reject(xhttp.statusText)
    }
    xhttp.send()
    if (xhttp.status === 404) {
      console.log('EXAM IS OVER')
    }
  })
}
var xhttp2 = new XMLHttpRequest() // Global variable to let us access it from time counter
function post (url, answ) {
  return new Promise(function (resolve, reject) {
    var data = '{answer :' + 'answ' + '}'
    var json = JSON.stringify(eval('(' + data + ')'))

    xhttp2.open('POST', url, true)
    xhttp2.setRequestHeader('Content-type', 'application/json')
    xhttp2.onload = function () {
      if (xhttp2.status === 200) {
        resolve(JSON.parse(xhttp2.response))
        var questions2 = JSON.parse(xhttp2.responseText)
        QuestionURL = questions2.nextURL
        console.log('POST MESSAGE:  ' + questions2.message)
        if (questions2.nextURL != null) {
          get(questions2.nextURL)
        }// Added early to fix the bug in post function. Problem solved: did not change the innerHTML into new question. how ever there are still bugs flying around which I will fix them :D
        if (questions2.nextURL == null) {
          console.log('LAST ANSWER WAS CORRECT!!!!!!!!!!!!!!!!!!!')
          finalQuestion = questions2.nextURL
        }
        textField.value = ''
      } else if (xhttp2.status === 400) {

      }
      if (xhttp2.status === 404) {
        console.log('Quiz is OVERRRRRRRRRRRRRRRR')
      }
    }

    xhttp2.onerror = function () {
      reject(xhttp2.statusText)
    }
    if (xhttp2.status !== 404) {
      xhttp2.send(json)
    }
  })
}
