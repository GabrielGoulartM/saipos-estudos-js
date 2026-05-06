## Pasta destinada anotações dos conteudos da seção 1 da trilha.

ópicos / Cues (Perguntas-chave)
Como funciona a tipagem no JavaScript?
Qual a diferença entre == e ===?
Como funcionam variáveis em JS?
Como exibir dados no console?
Como funcionam template strings?
O que é a função eval()?
Como são declaradas funções em JS?



🔹 Tipagem no JavaScript
O JavaScript é fracamente tipado (ou dinamicamente tipado).
Isso significa que uma variável pode mudar de tipo durante a execução.

Exemplo:

var y = 10;
var x = "10";

🔹 Comparação de valores
console.log(x == y); // true
== compara apenas o valor (faz conversão de tipo automaticamente).

=== compara valor e tipo, sendo mais seguro:
console.log(x === y); // false

🔹 Variáveis e tipos
var, let, const são usados para declarar variáveis.
Tipos comuns: number, string, boolean, object, undefined.

🔹 Console e saída de dados
console.log() → exibe informações no console do navegador.
alert() → exibe uma janela de alerta no navegador.

🔹 Template Strings
Permitem inserir variáveis dentro de strings usando crase `.
let nome = "Gabriel";
console.log(`Olá, ${nome}`);

✔ Importante: o ${variavel} só funciona dentro de template strings (backticks).

🔹 Funções em JavaScript
Função tradicional:
function soma(a, b) {
    return a + b;
}
Similar a linguagens mais estruturadas.

Função com eval():
let expressao = "2 + 2";
console.log(eval(expressao)); // 4
eval() executa uma string como código JavaScript (Conforme demonstrando no arquivo func.js)
⚠️ Pode ser perigoso e não é recomendado em projetos reais, segundo fontes na web