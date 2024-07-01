class CalculatorStatus {
    constructor() {
        this._pendingResetCurrentOperand = false;
        this._hasResult = false;
    }

    set pendingResetCurrentOperand(value) {
    
        this._pendingResetCurrentOperand = value;
        
    }

    set hasResult(value) {
        
        this._hasResult = value;
        
    }

    reset() {
        this._pendingResetCurrentOperand = false;
        this._hasResult = false;
    }
}