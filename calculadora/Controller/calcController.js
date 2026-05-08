class calcController {
    constructor(){

        this._displayCalc = "0";
        this._currentDate;


    }


    initialize(){ // tudo neste bloco, inicia assim que a pagina carrega

        let displayCalcEl = document.querySelector("#display");
        let dateCalcEl = document.querySelector("#data");
        let timeCalcEl = document.querySelector("#hora");
    
    
        displayCalcEl.innerHTML = "t3ste";
    
    }

    get displayCalc(){
        return this._displayCalc;
    }

    set displayCalc(valor){
        this._displayCalc = valor;
    }

    get currentDate(){
        return this._currentDate;
    }

    set currentDate(valor){
        this._currentDate = valor;
    }







}
