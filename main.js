const $ = document;
const alert = $.querySelector(".alert");
const textInput = $.querySelector(".text");
const copyPass = $.querySelector(".icon-copy");
const inputLength = $.getElementById("inputLength");
const upperLetterCheck = $.getElementById("upperLetterCheck");
const lowerLetterCheck = $.getElementById("lowerLetterCheck");
const numCheck = $.getElementById("numCheck");
const symbolCheck = $.getElementById("symbolCheck");
const generateBtn = $.querySelector(".generate-pass");
const getRandoms = {
  Upper: randomUpper,
  Lower: randomLower,
  Numbers: randomNumber,
  Symbols: randomSymbol
}

copyPass.addEventListener("click", copyToClipBoard)

generateBtn.addEventListener("click", () => {
  const length = +inputLength.value
  const hasUpper = upperLetterCheck.checked
  const hasLower = lowerLetterCheck.checked
  const hasNumber = numCheck.checked
  const hasSymbol = symbolCheck.checked

  textInput.value = generatePass(hasUpper, hasLower, hasNumber, hasSymbol, length);
})

function generatePass(Upper, Lower, Numbers, Symbols, length) {
  let generatedPass = ""
  const typesCount = Upper + Lower + Numbers + Symbols
  const typesArray = [{ Upper }, { Lower }, { Numbers }, { Symbols }].filter(item => Object.values(item)[0])
  
  if (typesCount === 0) {
    return ""
  }
  for (let i = 0; i < length; i += typesCount) {
    typesArray.forEach(type => {
      const functionName = Object.keys(type)[0];
      generatedPass += getRandoms[functionName]()
    })
  }
  const resultPass = generatedPass.slice(0, length)
  return resultPass
}

function copyToClipBoard() {
  let textArea = document.createElement("textarea");
  const password = textInput.value

  if (!password) {
    return
  }
  textArea.value = password
  $.body.append(textArea)
  textArea.select()
  $.execCommand("copy")
  textArea.remove()
  alert.style.top = "50px"
  setTimeout(() => {
    alert.style.top = "-200px"
  }, 3000);
}

function randomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function randomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function randomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function randomSymbol() {
  return String.fromCharCode(Math.floor(Math.random() * 15) + 33)
}
