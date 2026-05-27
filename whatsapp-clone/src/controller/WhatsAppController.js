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

    // Método para captura dos dados via FormData
    HTMLFormElement.prototype.getForm = function () {
      return new FormData(this);
    };

    // Converte FormaData para JSON
    HTMLFormElement.prototype.toJSON = function () {
      let json = {};

      this.getForm().forEach((value, key) => {
        json[key] = value;
      });
      return json;
    };
  }

  // Fecha os painéis a esquerda
  closeAllLeftPanel() {
    this.el.panelAddContact.hide();
    this.el.panelEditProfile.hide();
  }

  // Força o fechamento do menu de attachment
  closeMenuAttach(e) {
    document.removeEventListener("click", this.closeMenuAttach);
    this.el.menuAttach.removeClass("open");
    console.log("MENU REMOVIDO");
  }

  initEvents() {
    // Interações com o painel de MINHA FOTO
    this.el.myPhoto.on("click", (e) => {
      //Atribui evento 'click' no icone de MINHA FOTO

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

    //Evento de click no botão de confirmar editar nome de perfil

    this.el.btnSavePanelEditProfile.on("click", (e) => {
      console.log(this.el.inputNamePanelEditProfile.innerHTML); // printa o valor dentro do elemento HTML
    });

    // Faz a captura do dado via FormData
    this.el.formPanelAddContact.on("submit", (e) => {
      e.preventDefault();
      let formData = new FormData(this.el.formPanelAddContact);
    });

    //Evento de clicar no contato, e aparecer a conversa
    this.el.contactsMessagesList.querySelectorAll(".contact-item").forEach((item) => {
      // procura dentro de contactsMessagesLista os itens que tenham a classe CSS correspondente
      item.on("click", (e) => {
        // para cada item com a classe contact-item, atribui o evento click
        this.el.home.hide(); // Ao clicar, o home é ocultado

        this.el.main.css({
          // Ao clicar, mostra a tela principal, que está configurada para flex
          display: "flex",
        });
      });
    });

    // Evento de clicar no clip de anexar itens na conversa
    this.el.btnAttach.on("click", (e) => {
      e.stopPropagation();
      this.el.menuAttach.addClass("open");
      document.addEventListener("click", this.closeMenuAttach.bind(this));
    });

    this.el.btnAttachPhoto.on("click", (e) => {
      this.el.inputPhoto.click();
    });

    this.el.inputPhoto.on("click", (e) => {
      console.log(this.el.inputPhoto.files);
      [...this.el.inputPhoto.files].forEach((file) => {
        console.log(file);
      });
    });

    this.el.btnAttachCamera.on("click", (e) => {
      this.closeAllMainPanel();
      this.el.panelCamera.addClass("open");
      this.el.panelCamera.css({
        height: "calc(100% - 120px)",
      });
    });

    this.el.btnClosePanelCamera.on("click", (e) => {
      this.el.panelCamera.removeClass("open");
      this.el.panelMessagesContainer.show();
    });

    this.el.btnTakePicture.on("click", (e) => {
      console.log("foto tirada");
    });

    //interações com o botão de anexar documento
    this.el.btnAttachDocument.on("click", (e) => {
      this.closeAllMainPanel();
      this.el.panelDocumentPreview.addClass("open");
      this.el.panelDocumentPreview.css({
        height: "calc(100% - 120px)",
      });
    });

    //interação com o botão FECHAR o campo de anexar documento

    this.el.btnClosePanelDocumentPreview.on("click", (e) => {
      this.closeAllMainPanel();
      this.el.panelMessagesContainer.show();
    });

    this.el.btnSendDocument.on("click", (e) => {
      console.log("DOCUMENTO ENVIADO");
    });

    this.el.btnAttachContact.on("click", (e) => {
      this.el.modalContacts.show();
    });

    this.el.btnCloseModalContacts.on("click", (e) => {
      this.el.modalContacts.hide();
    });

    // Interações com o botão de microfone
    this.el.btnSendMicrophone.on("click", (e) => {
      this.el.recordMicrophone.show();
      this.el.btnSendMicrophone.hide();
      this.startRecordMicrophoneTime();
    });

    // Interações com o botão de CANCELAR gravação do microfone
    this.el.btnCancelMicrophone.on("click", (e) => {
      this.closeRecordMicrophone();
    });

    // Interações com o botão de ENVIAR gravação do microfone
    this.el.btnFinishMicrophone.on("click", (e) => {
      this.closeRecordMicrophone();
    });
  }

  //Método para fechar todos os paineis do botão de attechment
  closeAllMainPanel() {
    this.el.panelMessagesContainer.hide();
    this.el.panelDocumentPreview.removeClass("open");
    this.el.panelCamera.removeClass("open");
  }

  closeRecordMicrophone() {
    this.el.recordMicrophone.hide();
    this.el.btnSendMicrophone.show();
    clearInterval(this._recordMicrophoneInterval);
  }

  startRecordMicrophoneTime() {
    let start = Date.now();

    this._recordMicrophoneInterval = setInterval(() => {
      this.el.recordMicrophoneTimer.innerHTML = Date.now() - start;
    }, 100);
  }
}
