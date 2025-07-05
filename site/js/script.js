// Javascript para o modo claro e escuro
// Pega o checkbox
const botaoDark = document.getElementById('toggle-dark');

// Verifica se tem no localStore seleção do dark theme
if(localStorage.getItem('data-theme') == 'dark'){
    botaoDark.checked = true;
}


// Liga a função ao checkbox
// ou seja, o usuário ao cliar no botão, se o valor do mesmo
// for true
botaoDark.addEventListener('change', () => {    
    let theme = localStorage.getItem('data-theme'); 
    if(!botaoDark.checked){
        changeThemeToLight();
    }else{
        changeThemeToDark();
    }
});

//Função para alterar para o modo escuro
const changeThemeToDark = () =>{
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("data-theme", "dark");
}

const changeThemeToLight = () => {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("data-theme", "light");
}

let theme = localStorage.getItem('data-theme');
if(theme == "dark") changeThemeToDark();

document.addEventListener('DOMContentLoaded', function() {
    
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const closeButton = document.getElementsByClassName("close-button")[0];
    const images = document.querySelectorAll(".zoomable-image");

    // Adicionar evento de clique a cada imagem
    images.forEach(function(img) {
        img.addEventListener('click', function() {
            modal.style.display = "flex";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        });
    });

    // Adicionar evento de clique ao botão de fechar
    closeButton.addEventListener('click', function() {
        modal.style.display = "none";
    });

    // Fechar o modal ao clicar fora da imagem (no fundo escuro)
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Botão Voltar ao Topo
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'inline-block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});