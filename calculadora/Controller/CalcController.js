class CalcController{
    constructor(){

        this._operation = []; // Variavel a ser exibida no display

        this._displayCalcEl = document.querySelector("#display"); // --> Aqui, estamos salvando o objeto 'HTML DISPLAY' inteiro.
        this._dateCalcEl = document.querySelector("#data");
        this._timeCalcEl = document.querySelector("#hora");

        this._locale = ('pt-BR');
        this._currentDate;
        

    }


    initialize(){ // tudo neste bloco, inicia assim que a pagina carrega
    this.initButtonsEvent();

    
    
    this.setDateTime() // --> Assim que carrega a pagina, seta o horário e data no display
        setInterval(()=>
                {
                     this.setDateTime()
                },1000);  
    }

    clearAll(){
        this._operation = [];   
     }

    clearEntry(){
        this._operation.pop() //joga fora o ultimo valor do array
    }

    setError(){

        this.displayCalc = "error"; // chama o setter DisplayCalc

    }

    getLastOperation(){
        return this._operation[this._operation.length-1];
    }

    setLastOperation(valor){
        this._operation[this._operation.length - 1] = valor;
    }

    isOperator(valor){
        return (['+', '-', '*', '%', '/'].indexOf(valor) > -1);
    }
    
    pushOperation(valor){
        this._operation.push(valor);
        
        if (this._operation.length > 3){

            let last = this._operation.pop();
            console.log(this._operation);
        }
    }

    addOperation(valor){ // Método para adicionar operador no array .operation

            console.log("A", valor, isNaN(this.getLastOperation()));
        if (isNaN(this.getLastOperation())){  // Verifica Se o ultimo valor do array é um numero

            if(this.isOperator(valor)){  // Se de fato não for um numero, ira entrar nesse laço e será verificado se o caractereé um operador valido da calculadora
               
                
                this.setLastOperation(valor); //Se for um operador valido, entra no array

            }else if(isNaN(valor)){ // --> Aviso que o caractere digitado não é um alagarismo, nem um operador 

                console.log("FOI INSERIDO UM DIGITO INVALIDO");
            } 
            else
                {
                this.pushOperation(valor); //Se ele passou por tudo isso, sõ pode ser um algarismo
            }

            
        }else{
            if(this.isOperator(valor)){ // Se, na ultima posição do array for um numero, inseri o operador no array
               
                this.pushOperation(valor); 

            }
            else{ // Se chegou aqui, é um algarismo, e deve ser
                let novoValor = this.getLastOperation().toString() + valor.toString(); // --> Transforma o ultimo algarismo no array em string, e concatena com o novo valor
                this.setLastOperation(parseInt(novoValor)); // Transforma de string, para int, para poder realizar transformações algebricas/
            }
            
        }

        
       
    }

    execBtn(valor){
        switch(valor){

            case 'ac':
                this.clearAll();
                break;
                
            case 'ce':
                this.clearEntry();
                break;
            
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;

            case 'divisao':
                this.addOperation('/');
                break;
        
            case 'multiplicacao':
                this.addOperation('*');
                break;
            
            case 'porcento':
                this.addOperation('%');
                break;
            
            case 'igual':
                
                break;

            case '.':

            break;
            
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(valor)); //parseInt converte de uma string, para um numero
                break;
                default:
                    this.setError();
                    break;
            }
    }



    addEventListenerAll(element, events, fn){ // --> função para o EventListener funcionar em mais de um evento
    //                                              recebe o elemento, os eventos a serem trabalhados, e a função a ser executada

        events.split(' ').forEach(event => { // events chega como uma string, o método .split separa em arrays a cada espaço, ficando "click, drag "
//                                               Em seguida, para cada array que foi splitado, o repetidor forEach atribui o EventListener correspondende, junto com a função       
            element.addEventListener(event, fn, false);
        })
    }


    initButtonsEvent(){
        
        let buttons = document.querySelectorAll("#buttons > g, #parts > g"); // Atribui a variavel buttons o conjunto de elementos g, no ramo #buttons e #parts
                                                                             
        buttons.forEach((btn,index)=>{  // Percorre a variavel button, procurando por elementos que contenha a informação 'btn'

                this.addEventListenerAll(btn, 'click drag', e => { // Chama a função ListenerAll, e atribui seus parametros
                    
                    //console.log(btn.className.baseVal.replace("btn-", ""));   //printa para cada botão o seu numero, excluindo a informação "btn"
                    let textBtn = btn.className.baseVal.replace("btn-","");     // cria uma variavel, e atribui apenas o texto do botão
                   this.execBtn(textBtn); 
                })

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
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
