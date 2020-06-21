# Vue Random Image Gallery

Galeria de imagens obtidas aleatoriamente.

A galeria possui apenas uma página que carrega 6 fotos aleatórias utilizando [picsum](https://picsum.photos/) (que busca imagens no site [unsplash](https://unsplash.com/)).
Consiste em uma página html (index.html) que utiliza vue.js através de uma instância Vue no arquivo main.js.

Funções nas fotos (on hover):
* Favoritar: Marca a foto como favorita. *Fotos favoritas não podem ser substituídas*;
* Salvar: Faz o download da foto;
* Substituir: Substitui por outra foto aleatoriamente, desde que não seja favorita;

Funções na página (botões):
* Atualizar Fotos: Busca novas fotos aleatoriamente substituindo as que não foram marcadas como favoritas;
* Salvar Favoritas: Realiza o download de todas fotos marcadas como favoritas. O browser pode solicitar permissão para baixar múltiplas fotos.
* Alterar Fundo: Altera o gradiente de background da página aleatoriamente.

Fontes/ferramentas que auxiliaram o desenvolvimento:

Efeito loading:
    https://dribbble.com/shots/5557955-Infinity-Loader

Fotos obtidas através da api picsum:
    https://picsum.photos/ 

Fotos da Picsum são originalmente obtidas no site unsplash:
    https://unsplash.com/

Função original de download de imagens:
    https://stackoverflow.com/a/54345008/11599158
