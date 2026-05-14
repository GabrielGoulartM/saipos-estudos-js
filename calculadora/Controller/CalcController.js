class CalcController{
    constructor(){

        this._operation = []; // Variavel a ser exibida no display
        this._lastOperador = ''; //variavel que defini o ultimo operador do display
        this._lastNumber = ''; // variavel que defini o ultimo caractere do display

        this._displayCalcEl = document.querySelector("#display"); // --> Aqui, estamos salvando o objeto 'HTML DISPLAY' inteiro.
        this._dateCalcEl = document.querySelector("#data");
        this._timeCalcEl = document.querySelector("#hora");

        this._locale = ('pt-BR');
        this._currentDate;
        

    }


    initialize(){ // tudo neste bloco, inicia assim que a pagina carrega
    this.initButtonsEvent();
    this.setLastNumberToDisplay();
    
    
    this.setDateTime() // --> Assim que carrega a pagina, seta o horário e data no display
        setInterval(()=>
                {
                     this.setDateTime()
                },1000);  
    }

    clearAll(){
        this._operation = [];   // defini o array como vazio 
        this.setLastNumberToDisplay(); // Chama 
     }

    clearEntry(){
        this._operation.pop() //joga fora o ultimo valor do array
        this.setLastNumberToDisplay();
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

    //.indexOf procura o item dentro do array de caracteres, se encontrar, retorna true
    isOperator(valor){ 
        return (['+', '-', '*', '%', '/'].indexOf(valor) > -1);
    }
    
    pushOperation(valor){
        this._operation.push(valor);
        
        if (this._operation.length > 3){

            

            this.calc();

            
        }
    }

    calc(){
        let last = "";
        let result = "";

        if(this._operation.length < 3){
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperador, this._lastNumber];
        }



        this._lastOperador= this.getLastitem(); // pega o ultimo operador, e atribui a lastOperator

        if(this._operation.length > 3){
         last = this._operation.pop(); // se o array for maior que 3, ultimo digito cai fora
        
         
         this._lastNumber = this.getResult(); //pega o ultimo resultado, e atribui a lastNumber
        }   else if(this._operation.length == 3){

        
        this._lastNumber = this.getLastitem(false); // atribui ao LastNumber, o resultado do array
        }

        console.log("._lastOperator", this._lastOperador);
        console.log("._lastNumber", this._lastNumber);

        result = this.getResult();

        if(last == "%"){
            result = result / 100;
            this._operation = [result];
        }else{
            

             this._operation = [result];

             if(last){
                this._operation.push(last);
             }
        }


        

        this.setLastNumberToDisplay();
    }




    getResult(){
        return eval(this._operation.join("")); // Eval calcula a expressão, independente do tipo da variavel, .join junta as expressões

    }

    getLastitem(digit = true){ // --> Se chamar o método com argmnts vazio {}, procurando por operador,
        // se passar (false), procura por um numero
        let lastItem; //variavel de escopo local, tem que retornar ela ao global usando return
        
        for(let i = this._operation.length - 1; i>=0; i--){  // percorre o array de trás para frente
           
           
                    // Se na posição do index i for um operador, retorna true, este true sera comparado o digit, se bater, definir lastItem como o operador do display
                    // Se não bater, o valor na posição index i é um numero
                if(this.isOperator(this._operation[i]) == digit){  
                    lastItem = this._operation[i];
                    break;
                    }
            } 
            if(!lastItem){
                lastItem = {isOperator} ? this._lastOperador : this._lastNumber; // (?) isso ficou bem confuso, me aprofundarei mais depois
            }
            return lastItem;
            }
        

    



    setLastNumberToDisplay(){
        let lastNumber = this.getLastitem(false);
        

        
     if(!lastNumber){
        lastNumber = 0;
     }
        this.displayCalc = lastNumber; // exibi no display o ultimo numero do array
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
                this.setLastNumberToDisplay();
            }

            
        }else{
            if(this.isOperator(valor)){ // Se, na ultima posição do array for um numero, inseri o operador no array
               
                this.pushOperation(valor); 

            }
            else{ // Se chegou aqui, é um algarismo, e deve ser
                let novoValor = this.getLastOperation().toString() + valor.toString(); // --> Transforma o ultimo algarismo no array em string, e concatena com o novo valor
                this.setLastOperation(parseInt(novoValor)); // Transforma de string, para int, para poder realizar transformações algebricas

                this.setLastNumberToDisplay();
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
                this.calc();
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
