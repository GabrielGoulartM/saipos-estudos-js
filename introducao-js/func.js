console.log("teste")


function SomaNormal (x,y){
    let a;
    a = x+y;
    return a;
}




function SomaComEval(x, y, operador){
    return eval(`${x} ${operador} ${y}`);
}



let teste = SomaNormal(10,10);
let teste2  = SomaComEval(15,15, '+')


console.log("abaixo, resultado com a função no padrão que gosto de usar: ",teste);

console.log("abaixo, função conforme demonstrado no video: ", teste2);