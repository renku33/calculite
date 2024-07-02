// eslint-disable-next-line no-unused-vars
class CalculatorStatus {
  constructor () {
    this._pendingResetCurrentOperand = false
    this._hasResult = false
  }

  get pendingResetCurrentOperand () {
    return this._pendingResetCurrentOperand
  }

  setPendingResetCurrentOperand (value) {
    this._pendingResetCurrentOperand = value
  }

  get hasResult () {
    return this._hasResult
  }

  setHasResult (value) {
    this._hasResult = value
  }

  reset () {
    this._pendingResetCurrentOperand = false
    this._hasResult = false
  }
}
