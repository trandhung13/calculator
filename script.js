class Calculator {
    constructor(previousOperAndTextElement, currentOperAndTextElement) {
        this.previousOperAndTextElement = previousOperAndTextElement
        this.currentOperAndTextElement = currentOperAndTextElement
        this.clear()
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperAnd.includes('.')) return
        this.currentOperAnd = this.currentOperAnd.toString() + number.toString()
    }

    clear() {
        this.currentOperAnd = ''
        this.previousOperAnd = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperAnd = this.currentOperAnd.slice(0, -1)
    }
    
    chooseOperation(operation) {
        if (this.operation === '') return
        if (this.previousOperAnd != '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperAnd = this.currentOperAnd
        this.currentOperAnd = ''
    }
    
    getDisplayNumber(number) {
        let stringNumber = number.toString()
        let intergeDigits = parseFloat(stringNumber.split('.')[0])
        let decimalDigits = stringNumber.split('.')[1]
        let intergeDisplay
        if (isNaN(intergeDigits)) {
            intergeDisplay = ''
        } else {
            intergeDisplay = intergeDigits.toLocaleString('en')
        }
        if (decimalDigits != null) {
            return `${intergeDisplay}.${decimalDigits}`
        } else {
            return intergeDisplay
        }
    }

    updateDisplay() {
        this.currentOperAndTextElement.innerHTML = this.getDisplayNumber(this.currentOperAnd)
        if (this.operation != null) {
            this.previousOperAndTextElement.innerHTML = `${this.getDisplayNumber(this.previousOperAnd)} ${this.operation}`
        } else {
            this.previousOperAndTextElement.innerHTML = ''
        }
    }

    compute() {
        let computation
        let current = parseFloat(this.currentOperAnd)
        let prev = parseFloat(this.previousOperAnd)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperAnd = computation
        this.previousOperAnd = ''
        this.operation = undefined
    }
}

const previousOperAndTextElement = document.querySelector('[data-previous-operand]')
const currentOperAndTextElement = document.querySelector('[data-current-operand]')
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const equalsButton = document.querySelector('[data-equals]')

const calculator = new Calculator(previousOperAndTextElement, currentOperAndTextElement)

numberButtons.forEach(number => {
    number.onclick = () => {
        calculator.appendNumber(number.innerHTML)
        calculator.updateDisplay()
    }
})

operationButtons.forEach(operation => {
    operation.onclick = () => {
        calculator.chooseOperation(operation.innerHTML)
        calculator.updateDisplay()
    }
})

equalsButton.onclick = () => {
    calculator.compute()
    calculator.updateDisplay()
}

allClearButton.onclick = () => {
    calculator.clear()
    calculator.updateDisplay()
}

deleteButton.onclick = () => {
    calculator.delete()
    calculator.updateDisplay()
}

