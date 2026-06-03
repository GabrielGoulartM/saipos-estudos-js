export class Format {
  static getCamelCase(text) {
    // cria um div "fake"
    let div = document.createElement("div");

    // O navegador automaticamente converte para
    // camelCase quando acessa via .dataset, então ".data-caixa-mensagens" vira dataset.caixaMensagens
    div.innerHTML = `<div data-${text}="id">/</div>`;

    // Pega o nome da primeira propriedade
    return Object.keys(div.firstChild.dataset)[0]; // por exemplo: caixaMensagens
  }

  static toTime(duration) {
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
  }
}
