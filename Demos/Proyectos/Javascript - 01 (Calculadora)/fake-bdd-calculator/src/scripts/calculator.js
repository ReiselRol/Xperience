const MAX_DIGITS_IN_DISPLAY = 10
const COMMA_CHARACTER = ','
const display = document.querySelector('div[name="display"] span')
const COMMA_BUTTON = document.getElementsByName('point')[0]
const NEGATE_BUTTON = document.getElementsByName('negate')[0]
const CLEAN_BUTTON = document.getElementsByName('clean')[0]
const ZERO_BUTTON = document.getElementsByName('zero')[0]
const ONE_BUTTON = document.getElementsByName('one')[0]
const TWO_BUTTON = document.getElementsByName('two')[0]
const THREE_BUTTON = document.getElementsByName('three')[0]
const FOUR_BUTTON = document.getElementsByName('four')[0]
const FIVE_BUTTON = document.getElementsByName('five')[0]
const SIX_BUTTON = document.getElementsByName('six')[0]
const SEVEN_BUTTON = document.getElementsByName('seven')[0]
const EIGHT_BUTTON = document.getElementsByName('eight')[0]
const NINE_BUTTON = document.getElementsByName('nine')[0]
const DIVIDE_BUTTON = document.getElementsByName('divide')[0]
const MULTUPLY_BUTTON = document.getElementsByName('multiply')[0]
const SUBSTRACT_BUTTON = document.getElementsByName('subtract')[0]
const SUM_BUTTON = document.getElementsByName('sum')[0]
const EQUAL_BUTTON = document.getElementsByName('equal')[0]

let inMemoryNumber = 0 
let savedOperator = ''
let isANumberOnMemory = false
let isTheOperationFinished = false 
let isRecentlyAddedAOperation = false

const setDisplay = (value) => {
  value = fixComma(value)
  value = value.toString().replace(".", COMMA_CHARACTER)
  display.innerHTML = value
}

const resetEnabledDisabledButtons = () => {

  COMMA_BUTTON.enabled = true
  NEGATE_BUTTON.enabled = true
  CLEAN_BUTTON.enabled = true
  ZERO_BUTTON.enabled = true
  ONE_BUTTON.enabled = true
  TWO_BUTTON.enabled = true
  THREE_BUTTON.enabled = true
  FOUR_BUTTON.enabled = true
  FIVE_BUTTON.enabled = true
  SIX_BUTTON.enabled = true
  SEVEN_BUTTON.enabled = true
  EIGHT_BUTTON.enabled = true
  NINE_BUTTON.enabled = true
  DIVIDE_BUTTON.enabled = true
  MULTUPLY_BUTTON.enabled = true
  SUBSTRACT_BUTTON.enabled = true
  SUM_BUTTON.enabled = true
  EQUAL_BUTTON.enabled = true

}

const fixComma = (numberToFix) => {
  if (checkADotOnThis(numberToFix)) {
    const valueLenght = numberToFix.length

    if (numberToFix[valueLenght - 1] === COMMA_CHARACTER) {
      let newNumberWithoutComma = ''
      for (let eachNumber = 0; eachNumber < valueLenght - 1; eachNumber++) newNumberWithoutComma += '' + numberToFix[eachNumber]
      return newNumberWithoutComma
    } else return numberToFix
  } else return numberToFix
}

const getDisplayNumber = () => {
  let numero = display.innerHTML
  numero = numero.replace(COMMA_CHARACTER, '.')
  numero = parseFloat(numero)
  return numero
}

const invertNumberDisplay = () => {
  if (checkOnDisplayZero() === false && checkOnDisplayZeroWithDot() === false) {
    let displayNumber = display.innerHTML
    if (checkANegativeNumberDisplay()) displayNumber = displayNumber.slice(1)
    else displayNumber = '-' + displayNumber

    setDisplay(displayNumber)
  }
}

const reset = () => {
  resetEnabledDisabledButtons()
  setDisplay(0)
  disableOrEnableButtons()
  ZERO_BUTTON.disabled = true
  NEGATE_BUTTON.disabled = true
  inMemoryNumber = 0
  savedOperator = ''
  unhighlighAll()
}

const disableOrEnableButtons = () => {

  SUM_BUTTON.disabled = false
  MULTUPLY_BUTTON.disabled = false
  SUBSTRACT_BUTTON.disabled = false
  NEGATE_BUTTON.disabled = false
  DIVIDE_BUTTON.disabled = false
  EQUAL_BUTTON.disabled = false

  if (!checkAnErrorOnDisplay()) {
    if (isTheOperationFinished) {

      ZERO_BUTTON.disabled = false
      NEGATE_BUTTON.disabled = false
      ONE_BUTTON.disabled = false
      TWO_BUTTON.disabled = false
      THREE_BUTTON.disabled = false
      FOUR_BUTTON.disabled = false
      FIVE_BUTTON.disabled = false
      SIX_BUTTON.disabled = false
      SEVEN_BUTTON.disabled = false
      EIGHT_BUTTON.disabled = false
      NINE_BUTTON.disabled = false
      COMMA_BUTTON.disabled = false

    } else if (isRecentlyAddedAOperation) {

      ZERO_BUTTON.disabled = false
      NEGATE_BUTTON.disabled = true
      ONE_BUTTON.disabled = false
      TWO_BUTTON.disabled = false
      THREE_BUTTON.disabled = false
      FOUR_BUTTON.disabled = false
      FIVE_BUTTON.disabled = false
      SIX_BUTTON.disabled = false
      SEVEN_BUTTON.disabled = false
      EIGHT_BUTTON.disabled = false
      NINE_BUTTON.disabled = false
      COMMA_BUTTON.disabled = false

    } else if (!checkTheMaxLenght()) {
      if (checkOnDisplayZero()) {
        ZERO_BUTTON.disabled = true
        NEGATE_BUTTON.disabled = true
      } else {
        ZERO_BUTTON.disabled = false
        NEGATE_BUTTON.disabled = false
      }
      ONE_BUTTON.disabled = false
      TWO_BUTTON.disabled = false
      THREE_BUTTON.disabled = false
      FOUR_BUTTON.disabled = false
      FIVE_BUTTON.disabled = false
      SIX_BUTTON.disabled = false
      SEVEN_BUTTON.disabled = false
      EIGHT_BUTTON.disabled = false
      NINE_BUTTON.disabled = false
      if (!checkADotOnDisplay()) COMMA_BUTTON.disabled = false
      else COMMA_BUTTON.disabled = true
    } else {
      ZERO_BUTTON.disabled = true
      ONE_BUTTON.disabled = true
      TWO_BUTTON.disabled = true
      THREE_BUTTON.disabled = true
      FOUR_BUTTON.disabled = true
      FIVE_BUTTON.disabled = true
      SIX_BUTTON.disabled = true
      SEVEN_BUTTON.disabled = true
      EIGHT_BUTTON.disabled = true
      NINE_BUTTON.disabled = true
      COMMA_BUTTON.disabled = true
    }
  } else {
    ZERO_BUTTON.disabled = true
    ONE_BUTTON.disabled = true
    TWO_BUTTON.disabled = true
    THREE_BUTTON.disabled = true
    FOUR_BUTTON.disabled = true
    FIVE_BUTTON.disabled = true
    SIX_BUTTON.disabled = true
    SEVEN_BUTTON.disabled = true
    EIGHT_BUTTON.disabled = true
    NINE_BUTTON.disabled = true
    COMMA_BUTTON.disabled = true
    SUM_BUTTON.disabled = true
    MULTUPLY_BUTTON.disabled = true
    SUBSTRACT_BUTTON.disabled = true
    NEGATE_BUTTON.disabled = true
    DIVIDE_BUTTON.disabled = true
    EQUAL_BUTTON.disabled = true
  }
}

const addToTheDisplay = (value) => {
  if (isRecentlyAddedAOperation) setDisplay(0)
  if (isTheOperationFinished) {
    setDisplay(0)
    isTheOperationFinished = false
  }

  if (!checkTheMaxLenght()) {
    let actualDisplay = display.innerHTML
    if (checkOnDisplayZero()) {
      if (value === COMMA_CHARACTER) setDisplay('0' + COMMA_CHARACTER)
      else setDisplay(value)
    } else if (checkOnDisplayMinusZero()) {
      if (value !== 0) {
        if (value === COMMA_CHARACTER) actualDisplay = '-0,'
        else actualDisplay = '-' + value
        setDisplay(actualDisplay)
      }
    } else {
      if (value === COMMA_CHARACTER) {
        if (checkADotOnDisplay() === false) {
          actualDisplay += value
          setDisplay(actualDisplay)
        }
      } else {
        actualDisplay += value
        setDisplay(actualDisplay)
      }
    }
  }
  isRecentlyAddedAOperation = false
  disableOrEnableButtons()
}

const numbersBeforeComma = (numberToCheck) => {
  const numero = numberToCheck.toString().split('.')[0].replace('-', '')
  return numero.length
}

const roundNumber = (numberToRound, decimal) => {
  let multiple = 1

  for (let i = 0; i < decimal; i++) multiple *= 10

  let numero = numberToRound * multiple
  numero = Math.round(numero)
  numero /= multiple

  return numero
}

const showResults = (value) => {
  let result = value.toString()

  if (isRecentlyAddedAOperation) setDisplay('ERROR')
  else if (checkADotOnThis(value) === false) {
    if (checkOnRangeOfNotError(value)) setDisplay(result)
    else setDisplay('ERROR')
  } else {
    if (checkOnRangeOfNotError(value)) {
      const countOfNumberBeforeComma = numbersBeforeComma(value)
      if (value < 0) value = roundNumber(value, MAX_DIGITS_IN_DISPLAY - countOfNumberBeforeComma)
      else value = roundNumber(value, MAX_DIGITS_IN_DISPLAY - countOfNumberBeforeComma)

      result = value.toString()

      // In this line we are taking the last numbers that are zeros and we remove them replacing them with nothing

      result = result.replace(/\.?0+$/, '')
      result = result.replace('.', COMMA_CHARACTER)
      setDisplay(result)
    } else setDisplay('ERROR')
  }
}

const emptyStoredMemory = () => {
  inMemoryNumber = getDisplayNumber()
}

const operatorSelect = (operator) => {
  if (isRecentlyAddedAOperation === false) {
    if (!isANumberOnMemory) {
      savedOperator = operator
      emptyStoredMemory()
    } else {
      operate()
      savedOperator = operator
      emptyStoredMemory()
    }
    isANumberOnMemory = true
    isRecentlyAddedAOperation = true
  } else savedOperator = operator

  disableOrEnableButtons()
}

const operate = () => {
  
  if (savedOperator === '+') {
    doAddition()
    resetMemoryNumberAndOperator()
  } else if (savedOperator === '-') {
    doSubstraction()
    resetMemoryNumberAndOperator()
  } else if (savedOperator === '*') {
    doMultiplication()
    resetMemoryNumberAndOperator()
  } else if (savedOperator === '/') {
    doDivision()
    resetMemoryNumberAndOperator()
  } else {
    setDisplay(getDisplayNumber())
    resetMemoryNumberAndOperator()
  }

  disableOrEnableButtons()

}

const resetMemoryNumberAndOperator = () => {
  savedOperator = ''
  isANumberOnMemory = false
  inMemoryNumber = 0
  isTheOperationFinished = true
}

const doAddition = () => {
  const total = inMemoryNumber + getDisplayNumber()
  showResults(total)
}

const doSubstraction = () => {
  const total = inMemoryNumber - getDisplayNumber()
  showResults(total)
}

const doMultiplication = () => {
  const total = inMemoryNumber * getDisplayNumber()
  showResults(total)
}

const doDivision = () => {
  const total = inMemoryNumber / getDisplayNumber()
  showResults(total)
}

document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.key === 'Escape' || event.keyCode === 27) reset()
  else if (event.ctrlKey && isRecentlyAddedAOperation === false) invertNumberDisplay()
  else if (event.key === '0') addToTheDisplay(0)
  else if (event.key === '1') addToTheDisplay(1)
  else if (event.key === '2') addToTheDisplay(2)
  else if (event.key === '3') addToTheDisplay(3)
  else if (event.key === '4') addToTheDisplay(4)
  else if (event.key === '5') addToTheDisplay(5)
  else if (event.key === '6') addToTheDisplay(6)
  else if (event.key === '7') addToTheDisplay(7)
  else if (event.key === '8') addToTheDisplay(8)
  else if (event.key === '9') addToTheDisplay(9)
  else if (event.key === '+') {
    unhighlighAll()
    operatorSelect('+')
  }
  else if (event.key === '-') {
    unhighlighAll()
    if (getDisplayNumber() === 0) setDisplay('-0')
    else operatorSelect('-') 
  }
  else if (event.key === '*') {
    unhighlighAll()
    operatorSelect('*')
  }
  else if (event.key === '/') {
    unhighlighAll()
    operatorSelect('/')
  }
  else if (event.key === 'Enter') operate()
  else if (event.key === COMMA_CHARACTER) addToTheDisplay(COMMA_CHARACTER)
})

COMMA_BUTTON.addEventListener('click', () => { addToTheDisplay(COMMA_CHARACTER) })
NEGATE_BUTTON.addEventListener('click', () => { if (isRecentlyAddedAOperation === false) invertNumberDisplay() })
CLEAN_BUTTON.addEventListener('click', () => { reset() })
ZERO_BUTTON.addEventListener('click', () => { addToTheDisplay(0) })
ONE_BUTTON.addEventListener('click', () => { addToTheDisplay(1) })
TWO_BUTTON.addEventListener('click', () => { addToTheDisplay(2) })
THREE_BUTTON.addEventListener('click', () => { addToTheDisplay(3) })
FOUR_BUTTON.addEventListener('click', () => { addToTheDisplay(4) })
FIVE_BUTTON.addEventListener('click', () => { addToTheDisplay(5) })
SIX_BUTTON.addEventListener('click', () => { addToTheDisplay(6) })
SEVEN_BUTTON.addEventListener('click', () => { addToTheDisplay(7) })
EIGHT_BUTTON.addEventListener('click', () => { addToTheDisplay(8) })
NINE_BUTTON.addEventListener('click', () => { addToTheDisplay(9) })
DIVIDE_BUTTON.addEventListener('click', () => { 
  highlightThisButton(DIVIDE_BUTTON)
  operatorSelect('/')
})
MULTUPLY_BUTTON.addEventListener('click', () => {
  highlightThisButton(MULTUPLY_BUTTON)
  operatorSelect('*')
})
SUBSTRACT_BUTTON.addEventListener('click', () => { 
  highlightThisButton(SUBSTRACT_BUTTON)
  if (getDisplayNumber() === 0) setDisplay('-0')
  else operatorSelect('-') 
})
SUM_BUTTON.addEventListener('click', () => {
  highlightThisButton(SUM_BUTTON)
  operatorSelect('+')
})
EQUAL_BUTTON.addEventListener('click', () => { operate() })

const checkTheMaxLenght = () => {
  const displayString = display.innerHTML
  let totalLenght = displayString.length

  if (displayString.includes(',')) totalLenght -= 1

  if (totalLenght >= MAX_DIGITS_IN_DISPLAY) return true
  else return false
}

const checkOnDisplayZero = () => {
  const displayString = display.innerHTML

  if (displayString === '0') return true
  else return false
}

const checkOnDisplayMinusZero = () => {

  const displayString = display.innerHTML

  if (displayString === '-0') return true
  else return false

}

const checkADotOnDisplay = () => {
  const displayString = display.innerHTML

  if (displayString.includes(COMMA_CHARACTER)) return true
  else return false
}

const checkADotOnThis = (value) => {
  const displayString = value.toString()

  if (displayString.includes('.')) return true
  else return false
}

const checkANegativeNumberDisplay = () => {
  const displayString = display.innerHTML

  if (displayString.includes('-')) return true
  else return false
}

const checkOnDisplayZeroWithDot = () => {
  const displayString = display.innerHTML

  if (displayString === '0' + COMMA_CHARACTER) return true
  else return false
}

const checkOnRangeOfNotError = (number) => {
  let numeroLimite = ''

  for (let i = 0; i < MAX_DIGITS_IN_DISPLAY; i++) numeroLimite = numeroLimite + 9

  numeroLimite = parseInt(numeroLimite)

  if (numeroLimite >= number && number >= -numeroLimite) return true
  else return false
}

const checkAnErrorOnDisplay = () => {
  if (display.innerHTML === 'ERROR') return true
  else return false
}

const unhighlighAll = () => {

  SUM_BUTTON.classList.remove('highlighted')
  SUBSTRACT_BUTTON.classList.remove('highlighted')
  MULTUPLY_BUTTON.classList.remove('highlighted')
  DIVIDE_BUTTON.classList.remove('highlighted')

}

const highlightThisButton = (button) => {

  unhighlighAll()
  button.classList.toggle('highlighted')

}

reset()
