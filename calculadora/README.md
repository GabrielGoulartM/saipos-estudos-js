# Calculadora JavaScript

## Anotações da aula:
- O que é Regra de Negócio? 

- Instância é quando um objeto representa uma classe

- MVC --> Modal View Controller
    - View --> O que o usuãrio vê
    - Controller --> O que deve ou não acontecer quando o usuário interagi com o sistema
    - Modal --> Acessa os dados
- O MVC permite segmentar a edição do código.


- O que é Encapsulamento
    - Public
    - Protected
    - Private



---

### 📌 Referência de objeto no DOM

Quando fazemos:

```js
this._displayCalcEl = document.querySelector("#display");
```

NÃO estamos copiando o elemento.

Estamos salvando uma REFERÊNCIA para o objeto real do DOM.

Isso significa que:

```js
this._displayCalcEl.innerHTML = "999";
```

modifica diretamente o HTML da página.
Isso se comporta de maneira bem parecida a um ponteiro, porem sem toda a questão da memória

---
### 📌 Convenção do "_"

Exemplo:

```js
this._displayCalcEl
```

O `_` NÃO torna privado de verdade.

É apenas convenção:

> "não mexa diretamente nisso"

---
