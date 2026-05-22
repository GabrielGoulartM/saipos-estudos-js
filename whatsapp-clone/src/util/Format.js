class Format{
    static getCamelCase(text){

        // cria um div "fake"
        let div = document.createElement('div'); 

        // O navegador automaticamente converte para 
        // camelCase quando acessa via .dataset, então ".data-caixa-mensagens" vira dataset.caixaMensagens
        div.innerHTML = `<div data-${text}="id">/</div>`; 

        // Pega o nome da primeira propriedade
        return Object.keys(div.firstChild.dataset)[0];   // por exemplo: caixaMensagens
       
    }
}