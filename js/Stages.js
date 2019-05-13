class Stage {
  constructor(rootElement, nextStage) {
    this.rootElement = rootElement
    this.nextStage = nextStage
  }

  begin() {
    throw new Error('you must override begin()')
  }

  cleanUp() {
    throw new Error('you must override cleanUp()')
  }
}

class TextStage extends Stage {
  begin() {
    // set this.text when overriding
    let text = this.text()
    let color = this.color()
    let delay = this.delay()
    let fontSize = this.fontSize()
    let animate = this.animate()
    let script = this.script()
    let el = document.createElement('h1')
    el.innerHTML = text
    el.setAttribute('style', `
      text-align: center;
      font-family: Arial;
      font-size: ${fontSize};
      color: white
    `)

    let that = this

    if (animate) {
    	el.classList.add('animated')
    	for (var i = animate.length - 1; i >= 0; i--) {
    		el.classList.add(animate[i])
    	}
    	el.addEventListener('animationend', () => {
    		setTimeout(function () {
      			that.nextStage()
    		}, delay)
    	})
    	this.rootElement.appendChild(el)
    } else {
    	setTimeout(function () {
      		that.nextStage()
    	}, delay)
    	this.rootElement.appendChild(el)
    }

    if (script) {
    	script()
    }
    
  }

  delay() {
    return 1000 // default delay
  }

  color() {
  	return "#000000"
  }

  fontSize() {
  	return "80px"
  }

  animate() {
  	return false
  }

  script() {
  	return false
  }

  cleanUp() {
    this.rootElement.innerHTML = ''
  }
}

class SUGGESTION extends TextStage {
  text() { return 'view on computer for best experience' }
  delay() { return '1300' }
}

class IntroPrefacePreface0 extends TextStage {
  text() { return '.' }
  delay() { return 450 }
}

class IntroPrefacePreface1 extends TextStage {
  text() { return '..' }
  delay() { return 450 }
}
class IntroPrefacePreface2 extends TextStage {
  text() { return '...' }
  delay() { return 450 }
}

class IntroPreface0 extends TextStage {
  text() { return 'loading' }
  delay() { return 500 }
}

class IntroPreface1 extends TextStage {
  text() { return 'loading mission' }
  delay() { return 500 }
}

class IntroPreface2 extends TextStage {
  text() { return 'loading mission' }
  delay() { return 500 }
}

class IntroPreface3 extends TextStage {
  text() { return 'loading mission "' }
  delay() { return 100 }
}

class IntroPreface4 extends TextStage {
  text() { return 'loading mission "h' }
  delay() { return 100 }
}

class IntroPreface5 extends TextStage {
  text() { return 'loading mission "ha' }
  delay() { return 100 }
}

class IntroPreface6 extends TextStage {
  text() { return 'loading mission "hac' }
  delay() { return 100 }
}

class IntroPreface7 extends TextStage {
  text() { return 'loading mission "hack' }
  delay() { return 100 }
}

class IntroPreface8 extends TextStage {
  text() { return 'loading mission "hack b' }
  delay() { return 100 }
}

class IntroPreface9 extends TextStage {
  text() { return 'loading mission "hack bh' }
  delay() { return 100 }
}

class IntroPreface10 extends TextStage {
  text() { return 'loading mission "hack bhs"' }
  delay() { return 1500 }
}

class Intro extends Stage {
  begin() {
    let that = this

    let cdmx = document.createElement('h1')
    cdmx.textContent = 'coding'

    that.rootElement.appendChild(cdmx)

    let speed = 1

    let yDirection = 1
    let xDirection = 1

    let x = 0
    let y = 0

    let fontSize = 42

    let fontColor = 'white'
    let bgColor = '#595d60'

    let fontWeight = 'normal'

    const frameInterval = 1000 / 60 // every 60th of a second

    let frameAnim
    let colorChangeAnim
    let textChangeAnim

    const executeFrame = function () {
      const style = `font-family: Arial;font-size: ${fontSize}px;font-weight: ${fontWeight};color: ${fontColor};position: absolute;top: ${y}px;left: ${x}px;margin: 0;padding: 0;`

      cdmx.setAttribute('style', style)

      that.rootElement.setAttribute('style', `background-color: ${bgColor};
      `)


      // below screen
      if (x + cdmx.scrollWidth > window.innerWidth) {
        xDirection = -1
      }

      // above screen
      if (x <= 0) {
        xDirection = 1
      }

      // right of screen
      if (y + cdmx.scrollHeight > window.innerHeight) {
        yDirection = -1
      }

      // left of screen
      if (y <= 0) {
        yDirection = 1
      }

      x += xDirection * speed
      y += yDirection * speed
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        speed = speed * 1.005
        fontSize = fontSize * 1.003
      } else {
        speed = speed * 1.005
        fontSize = fontSize * 1.003
      }

      frameAnim = setTimeout(executeFrame, frameInterval)
    }

    const colorChangeInterval = 1000 / 2 // every 0.5 seconds
    const executeColorChange = function () {

      if (bgColor == '#595d60') {
        bgColor = '#64696b'
      } else {
        bgColor = '#595d60'
      }

      colorChangeAnim = setTimeout(executeColorChange, colorChangeInterval)
    }

    let textChangeInterval = 1000 / 3 // every 3rd of a second, increasing below
    const executeTextChange = function () {
      let current = cdmx.textContent
      if (current == 'coding') {
        current = 'is'
      } else if (current == 'is') {
        current = 'a'
      } else if (current == 'a') {
        current = 'superpower'
      } else if (current = 'superpower') {
        current = 'coding'
      }

      cdmx.textContent = current
      textChangeInterval = textChangeInterval / 1.005

      textChangeAnim = setTimeout(executeTextChange, textChangeInterval)
    }

    frameAnim = setTimeout(executeFrame, frameInterval)
    colorChangeAnim = setTimeout(executeColorChange, colorChangeInterval)
    textChangeAnim = setTimeout(executeTextChange, textChangeInterval)

    that.rootElement.setAttribute('style', `background-color: #36393a;`)

    // cancel animation
    setTimeout(function () {
      clearTimeout(frameAnim)
      clearTimeout(colorChangeAnim)
      clearTimeout(textChangeAnim)

      that.nextStage()
    }, 12000)
  }

  cleanUp() {
    this.rootElement.removeAttribute('style')
    this.rootElement.innerHTML = ''
  }
}

class Wait extends TextStage {
  text() { return '"wait"' }
  delay() { return 1700 }
}

class WhatFor extends TextStage {
  text() { return '"what is this for?"' }
  delay() { return 1700 }
}

class gladYouAsked extends TextStage {
  text() { return 'i\'m glad you asked.'}
  animate() { return ["lightSpeedIn", "fast"]}
}

class StartingAClub extends TextStage {
  text() { return 'a new club is coming to bhs' }
  animate() { return ["flash", "fast"] }
  delay() { return 2500 }
}

class HackClub0 extends TextStage {
  text() { return 'it\'s called: ' }
  delay() { return 500 }
}

class HackClub1 extends TextStage {
  text() { return 'it\'s called: .' }
  delay() { return 500 }
}

class HackClub2 extends TextStage {
  text() { return 'it\'s called: ..' }
  delay() { return 500 }
}

class HackClub3 extends TextStage {
  text() { return 'it\'s called: ...' }
  delay() { return 2000 }
}

class bhsHC0 extends TextStage {
  text() { return 'B' }
  delay() { return 50 }
}

class bhsHC1 extends TextStage {
  text() { return 'Be' }
  delay() { return 50 }
}

class bhsHC2 extends TextStage {
  text() { return 'Ber' }
  delay() { return 50 }
}

class bhsHC3 extends TextStage {
  text() { return 'Berk' }
  delay() { return 50 }
}

class bhsHC4 extends TextStage {
  text() { return 'Berkl' }
  delay() { return 50 }
}

class bhsHC5 extends TextStage {
  text() { return 'Berkle' }
  delay() { return 50 }
}

class bhsHC6 extends TextStage {
  text() { return 'Berkley' }
  delay() { return 50 }
}

class bhsHC7 extends TextStage {
  text() { return 'Berkley H' }
  delay() { return 50 }
}

class bhsHC8 extends TextStage {
  text() { return 'Berkley Ha' }
  delay() { return 50 }
}

class bhsHC9 extends TextStage {
  text() { return 'Berkley Hac' }
  delay() { return 50 }
}

class bhsHC10 extends TextStage {
  text() { return 'Berkley Hack' }
  delay() { return 50 }
}

class bhsHC11 extends TextStage {
  text() { return 'Berkley Hack C' }
  delay() { return 50 }
}

class bhsHC12 extends TextStage {
  text() { return 'Berkley Hack Cl' }
  delay() { return 50 }
}

class bhsHC13 extends TextStage {
  text() { return 'Berkley Hack Clu' }
  delay() { return 50 }
}

class bhsHC14 extends TextStage {
  text() { return 'Berkley Hack Club' }
  animate() { return ["tada", "fast"] }
  delay() { return 1400 }
}

class whatsthat extends TextStage {
  text() { return '"what\'s that?"' }
  delay() { return 1800 }
}

class onceagain extends TextStage {
  text() { return "what a great question to ask." }
  delay() { return 2210 }
}

class membersLearn extends TextStage {
  text() { return "members will learn how to make..." }
  delay() { return 1500 }
  animate() { return ["fadeInDownBig", "fast"] }
}

class websites extends TextStage {
  text() { return "websites" }
  animate() { return ["zoomInLeft", "fast"] }
}

class games extends TextStage {
  text() { return "games" }
  animate() { return ["zoomInUp", "fast"] }
}

class apps extends TextStage {
  text() { return "and apps that work on your phone!"}
  delay() { return 1800 }
  animate() { return ["zoomInRight", "fast"] }
}

class fun extends TextStage {
  text() { return 'so basically, you\'ll learn how to make cool things' }
  delay() { return 3100 }
}

class donthavetoknow extends TextStage {
  text() { return 'you don\'t even have to know how to code!' }
  delay() { return 2900 }
}

class join extends TextStage {
  text() { return 'i think you should join' }
  delay() { return 2000 }
}

class hurt extends TextStage {
  text() { return 'it can\'t hurt' }
  delay() { return 1500 }
  animate() { return ["hinge", "slow"] }
}

class submit extends TextStage {
	text() { return `<div id="emailUI">
		We'll email you soon.
		<br>
		<input type="email" id="email" name="email" placeholder="example@gmail.com" style="font-size: 50px; text-align: center"><br>
		<button id="submit" style="font-size: 50px; border-radius: 15px;"><p style="
    padding-left: 5px;
    padding-top: 5px;
    padding-right: 5px;
    padding-bottom: 5px;
    margin: 0px;
    ">Submit</p></button>
		<p style="font-size: 20px">Please use an email that you actually check.</p>
    <button id="remind" style="font-size: 25px; border-radius: 15px;"><p style="
    padding-left: 5px;
    padding-top: 5px;
    padding-right: 5px;
    padding-bottom: 5px;
    margin: 0px;
    ">Join Remind Instead</p></button></div>
		`}

    animate() { return ["lightSpeedIn", "slower"] }

	  script() { return function() {
			$("#submit").click(() => {
				axios.post('https://formcarry.com/s/x2oPwUGIWA2', {email: $("#email").val()}).then(() => {
					$("#root").empty()
			    $("#root").append(`<div id="remindLaterUI">
				  	<h1 style="text-align: center;
            font-family: Arial;
            font-size: 80px;"> Thanks! We'll email you soon! 😊
            </h1></div>
				  `)
				})
			})

      $("#remind").click(() => {
        $("#root").empty()
        $("#root").append(`<div id="joinRemindUI">
          <h1 style = "text-align: center;
          font-family: Arial;
          color: white;
          font-size: 60px;"><a href="http://remind.com/join/berkleyhc" style="color:white"> Click here to join the remind! </a></h1></div>
        `)
			})
		}
	}
}
