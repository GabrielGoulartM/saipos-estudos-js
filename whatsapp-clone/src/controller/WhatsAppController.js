class WhatsAppController {
  constructor() {
    console.log("Construturor ativo");

    this.elementsPrototype();
    this.loadElements();
    this.initEvents();
  }

  //Traz as classes com ID do HTML, para o JS
  loadElements() {
    this.el = {}; // objeto el inicia como vazio

    // Para cada elemento com ID, armazena em this.el com nome em camelCase
    // Ex: <div id="caixa-mensagens"> vira this.el.caixaMensagens
    document.querySelectorAll("[id]").forEach((element) => {
      this.el[Format.getCamelCase(element.id)] = element;
    });
  }

  // Aplica métodos globais a Elementos do HTML
  elementsPrototype() {
    Element.prototype.hide = function () {
      this.style.display = "none";
    };

    Element.prototype.show = function () {
      this.style.display = "block";
    };

    Element.prototype.toggle = function () {
      //Se tiver oculto, mostre, se não, oculte
      this.style.display = this.style.display === "none" ? "block" : "none";
      return this;
    };

    Element.prototype.on = function (events, fn) {
      events.split(" ").forEach((event) => {
        this.addEventListener(event, fn);
      });
      return this;
    };

    // Pega as propriedades de um objeto STYLES, e aplica no css inline
    Element.prototype.css = function (styles) {
      //o loop percorre o styles, para cada iteração, será pego o nome das chaves do objeto
      for (let name in styles) {
        // o valor de cada chave é aplicado aos objetos do meu .div
        this.style[name] = styles[name];
      }
      return this;
    };

    Element.prototype.addClass = function (name) {
      this.classList.add(name);
      return this;
    };

    Element.prototype.removeClass = function (name) {
      this.classList.remove(name);
      return this;
    };

    Element.prototype.toggleClass = function (name) {
      this.classList.toggle(name);
      return this;
    };

    Element.prototype.hasClass = function (name) {
      return this.classList.contains(name);
    };

    HTMLFormElement.prototype.getForm = function () {
      return new FormData(this);
    };

    HTMLFormElement.prototype.toJSON = function () {
      let json = {};

      this.getForm().forEach((value, key) => {
        json[key] = value;
      });
      return json;
    };
  }

  closeAllLeftPanel() {
    this.el.panelAddContact.hide();
    this.el.panelEditProfile.hide();
  }

  initEvents() {
    // Interações com o painel de MINHA FOTO
    this.el.myPhoto.on("click", (e) => {
      //Atribui evento click no iconde de MINHA FOTO

      this.closeAllLeftPanel(); //Garante que os paineis a esquerda estão fechados

      this.el.panelEditProfile.show(); //defini o elemento como 'display: blocked', deixando-o visivel ao CSS

      setTimeout(() => {
        //timeOut para dar tempo pro sistema fazer a animação de transição

        this.el.panelEditProfile.addClass("open"); // Cria a classe panelEditProfile Open, deixando o painel visivel.
      }, 300);
    });

    // Interações com o painel de NOVO CONTATO
    this.el.btnNewContact.on("click", (e) => {
      this.closeAllLeftPanel();
      this.el.panelAddContact.show();
      this.el.panelAddContact.addClass("open");
    });

    // Fecha o painel de perfil
    this.el.btnClosePanelEditProfile.on("click", (e) => {
      this.el.panelEditProfile.removeClass("open");
    });

    //fecha o painel de adicionar contato
    this.el.btnClosePanelAddContact.on("click", (e) => {
      this.el.panelAddContact.removeClass("open");
    });

    //Interações com o botão de foto
    this.el.photoContainerEditProfile.on("click", (e) => {
      this.el.inputProfilePhoto.click(); //função .click esta forçando o evento de click para abrir a janela de selecionar imagem
    });

    //Interações com os paineis de edição de nome
    this.el.inputNamePanelEditProfile.on("keypress", (e) => {
      //atribui evento de click ao div de Nome do usuario
      if (e.key === "Enter") {
        e.preventDefault(); // isso impede do navegador dar refresh ao clicar enter
        this.el.btnSavePanelEditProfile.click(); // força o evento click no botão de salvar o nome de perfil
      }
    });

    //Evento de click no botão de confirma
    this.el.btnSavePanelEditProfile.on("click", (e) => {
      console.log(this.el.inputNamePanelEditProfile.innerHTML); // printa o valor dentro do elemento HTML
    });

    this.el.formPanelAddContact.on("submit", (e) => {
      e.preventDefault();
      let formData = new FormData(this.el.formPanelAddContact);
    });
  }
}
