class CalcController{
    constructor(){

        
        this._displayCalcEl = document.querySelector("#display"); // --> Aqui, estamos salvando o objeto HTML DISPLAY inteiro.
        this._dateCalcEl = document.querySelector("#data");
        this._timeCalcEl = document.querySelector("#hora");

        this._locale = ('pt-BR');
        this._currentDate;
        this._initButtonsEvent;

    }


    initialize(){ // tudo neste bloco, inicia assim que a pagina carrega
    this.initButtonsEvent();
        
    
    this.setDateTime() // --> Assim que carrega a pagina, seta o horário e data no display
        setInterval(()=>
                {
                     this.setDateTime()
                },1000);  
    }

    initButtonsEvent(){
        
        let buttons = document.querySelectorAll("#buttons > g, #parts > g"); // atribui a variavel buttons o conjunto de elementos g, no ramo #buttons e #parts
        buttons.forEach((btn,index)=>{ //declaração da função forEach, que percorre o array em busca do valor "btn"
                btn.addEventListener('click', e => { // cada vez que o forEach encontrar um btn, ele atribui o metodo EventListener para ele
                    console.log(btn.className.baseVal.replace("btn-", ""));
                })
        })
    }
    
    
    setDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale); //chamamos o setter displayDate e atribuimos nele o mesmo valor  
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale); // que se encontra no get currentDate, porém especifincando apenas o time e date
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


    get currentDate(){ // Busca a data e hora atual
        return this._currentDate = new Date;
    }


}
