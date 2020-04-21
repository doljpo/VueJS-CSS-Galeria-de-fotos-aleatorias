# vue-rnd-gallery

Galeria de imagens obtidas aleatoriamente.

A galeria possui apenas uma página que carrega 6 fotos aleatórias utilizando picsum (que busca imagens no site unsplash).
Consiste em uma página html (index.html) que utiliza vue.js através de uma instância Vue no arquivo main.js.

Funções nas fotos (on hover):
* Favoritar: Marca a foto como favorita. Foto favorita não pode ser substituída;
* Salvar: Faz o download da foto;
* Substituir: Troca a foto, desde que não seja favorita;

Funções na página (botões):
* Atualizar Fotos: Busca novas fotos substituindo as que não foram marcadas como favoritas;
* Salvar Favoritas: Realiza o download de todas fotos marcadas como favoritas. O browser pode solicitar permissão para baixar múltiplas fotos.
* Alterar Fundo: Altera o gradiente de background da página aleatoriamente.

Fontes que auxiliaram o desenvolvimento:

Efeito loading:
    https://dribbble.com/shots/5557955-Infinity-Loader

Fotos obtidas através da api picsum:
    https://picsum.photos/ 

Fotos da Picsum são originalmente obtidas no site unsplash:
    https://unsplash.com/

Efeito gradiente de fundo criado em:
    https://cssgradient.io/

Função original de download de imagens:
    https://stackoverflow.com/a/54345008/11599158