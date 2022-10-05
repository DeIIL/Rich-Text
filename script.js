let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionsButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let scapingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

//List das fontlists
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

const initializer = () => {
  highlighter(alignButtons, true);
  highlighter(scapingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  //criando opções de fontes
  fontList.map(value =>{
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  //fontSize só é permitido até o tamanho 7
  for (let i = 1; i < 7; i++){
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  //tamanho padrão
  fontSizeRef.value = 3;
};

//main
const modifyText = (command, defaultUi, value) =>{
  //exeCommand executa p comando no texto selecionado
  document.execCommand(command, defaultUi, value);
};

//para operações básicas que não precisaram de parametros
optionsButtons.forEach(button => {
  button.addEventListener("click", () =>{
    modifyText(button.id, false, null);
  });
});

//operações que requerem parâmetros
advancedOptionsButton.forEach(button => {
  button.addEventListener("change", () =>{
    modifyText(button.id, false, button.value);
  });
});

//Link
linkButton.addEventListener("click", () =>{
  let userLink = prompt("Enter a URL");
  if(/http/i.test(userLink)){
    modifyText(linkButton.id, false, userLink);
  }
  else{
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

const highlighter = (className, needsRemoval) => {
  className.forEach((button) =>{
      button.addEventListener("click", () => {
        //needsRemoval = verdadeiro quer dizer que só um botão deve ficar "iluminado" e outro deve ficar normal
        if(needsRemoval){
          let alreadyActive = false;

          if(button.classList.contains("active")){
            alreadyActive = true;
          }
          //Remove a "iluminação" dos outros botões
          highlighterRemover(className);
          if(!alreadyActive){
            //botao clicado que esta iluminado
            button.classList.add("active");
          }
        }
        else{
          //se outros botoes estiverem iluminados
          button.classList.toggle("active");
        }
      });
  });
};

const highlighterRemover = (className) =>{
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

window.onload = initializer();
