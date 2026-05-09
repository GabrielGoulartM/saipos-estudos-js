class CalcController{
    constructor(){

        
        this._displayCalcEl = document.querySelector("#display"); // --> Aqui, estamos salvando o objeto HTML DISPLAY inteiro.
        this._dateCalcEl = document.querySelector("#data");
        this._timeCalcEl = document.querySelector("#hora");

        this._locale = ('pt-BR');
        this._currentDate;


    }


    initialize(){ // tudo neste bloco, inicia assim que a pagina carrega

        


        this.displayDate = this.currentDate.toLocaleDateString(this._locale); 
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    
    
        setInterval(()=>
                {
                    this.displayDate = this.currentDate.toLocaleDateString(this._locale); //chamamos o setter displayDate e atribuimos o mesmo valor 
                    this.displayTime = this.currentDate.toLocaleTimeString(this._locale); // que se encontra no get do currentDate, mas coletando apenas o Date/Time
                },1000);
        
        
        
    
    
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML; // O que o InnerHTML faz?
        //                                       R: Pegamos exatamento o HTML dentro do elemento
    }

    set displayCalc(valor){
        this._displayCalcEl.innerHTML = valor;
    }



    get displayDate(){
        return this._dateCalcEl.innerHTML;
    }

    set displayDate(valor){
        this._dateCalcEl.innerHTML = valor;
    }





    get displayTime(){
        return this._timeCalcEl.innerHTML;
    }

    set displayTime(valor){
        this._timeCalcEl.innerHTML = valor;
    }


    get currentDate(){
        return this._currentDate = new Date;
    }


}
