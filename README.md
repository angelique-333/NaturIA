# Naturia – App de Identificação de Espécies

> Projeto desenvolvido para a disciplina de Programação para Dispositivos Móveis.

## 1. Descrição do Problema
Atualmente, há uma desconexão crescente entre a sociedade e a biodiversidade local. Muitas pessoas encontram plantas, animais ou fungos e não possuem conhecimento ou ferramentas acessíveis para identificá-los rapidamente. Além disso, a falta de informação sobre áreas de risco ambiental dificulta a preservação e a segurança da comunidade.

## 2. Justificativa e ODS
Este projeto está vinculado ao **ODS 15 - Vida Terrestre** (Proteger, recuperar e promover o uso sustentável dos ecossistemas terrestres).

**Meta 15.5:** Tomar medidas urgentes e significativas para reduzir a degradação de habitats naturais e estancar a perda de biodiversidade.

O *Naturia* justifica-se ao utilizar a tecnologia para democratizar o conhecimento botânico e zoológico. Ao facilitar a identificação de espécies e alertar sobre áreas de risco, o app engaja o cidadão comum na observação e preservação da natureza, promovendo a educação ambiental de forma prática e interativa.

## 3. Público-Alvo
* Estudantes e pesquisadores de biologia/meio ambiente.
* Trilheiros e turistas de natureza.
* Cidadãos interessados em biodiversidade local.

## 4. Objetivos do App
* **Geral:** Facilitar o reconhecimento da biodiversidade e promover a segurança ambiental através de dispositivos móveis.
* **Específicos:**
    * Permitir a captura e identificação simulada de espécies (fauna, flora e funga).
    * Fornecer visualização de áreas de risco em mapas interativos.
    * Oferecer uma interface acessível via Web (PWA) e Mobile.

## 5. Tecnologias e Tipo de Aplicação
[cite_start]O projeto foi desenvolvido como uma aplicação **Híbrida / PWA (Progressive Web App)**[cite: 81], permitindo execução tanto no navegador quanto em dispositivos móveis.

* **Framework:** React Native (com Expo).
* **Linguagem:** JavaScript.
* **Hospedagem Web:** Netlify.
* **Ferramentas:** Expo Go para testes.

## 6. Funcionalidades
1.  **Identificação de Espécies:** Captura de fotos de plantas, animais ou fungos com identificação simulada.
2.  **Alertas em Mapa:** Exibição de alertas de áreas de risco em mapas interativos.
3.  **Interface Responsiva:** Layout otimizado para uso em smartphones e desktops.

## 7. Instruções de Instalação e Uso

### Acesso Rápido (Versão Web)
Você pode utilizar o aplicativo diretamente pelo navegador sem necessidade de instalação:
🔗 **[Acesse o Naturia no Netlify](https://harmonious-entremet-a224c3.netlify.app)**

### Execução Local (Para desenvolvedores)
Caso queira rodar o código-fonte em sua máquina:

**Requisitos do Sistema:**
* Node.js (versão 14 ou superior)
* NPM ou Yarn
* Dispositivo móvel com app *Expo Go* instalado (opcional)

**Passo a passo:**
1.  Clone este repositório.
2.  Abra o terminal na pasta do projeto.
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Inicie o projeto:
    ```bash
    npx expo start
    ```
5.  Escaneie o QR Code com o app Expo Go (Android/iOS) ou pressione `w` para abrir no navegador.

## 8. Evidências do Projeto
*(As capturas de tela estão disponíveis na pasta `/screenshots` deste repositório)*

![Tela Inicial](screenshots/home.png)
![Identificação](screenshots/id.png)
![Mapa](screenshots/mapa.png)

## 9. Autores
* Nome do Integrante 1
* Nome do Integrante 2
* Nome do Integrante 3
* Nome do Integrante 4
* Nome do Integrante 5
