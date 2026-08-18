document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       RASTREAMENTO DE CLIQUES NO WHATSAPP - GA4
       ===================================================== */

    const linksWhatsApp = document.querySelectorAll('a[href*="wa.me/"]');

    linksWhatsApp.forEach((link) => {

        link.addEventListener("click", () => {

            if (typeof gtag === "function") {

                gtag("event", "clique_whatsapp", {
                    link_url: link.href,
                    link_text: link.textContent.trim(),
                    page_location: window.location.href
                });

            }

        });

    });


    /* =====================================================
       LIGHTBOX DAS FOTOS
       ===================================================== */

    const grupos = document.querySelectorAll(".espaco-cartas");

    if (!grupos.length) {
        return;
    }


    /* =====================================================
       CRIA O LIGHTBOX
       ===================================================== */

    const lightbox = document.createElement("div");

    lightbox.className = "lightbox";

    lightbox.innerHTML = `
        <button
            class="lightbox-fechar"
            type="button"
            aria-label="Fechar imagem"
        >
            &times;
        </button>

        <button
            class="lightbox-anterior"
            type="button"
            aria-label="Imagem anterior"
        >
            &#10094;
        </button>

        <img
            class="lightbox-imagem"
            src=""
            alt=""
        >

        <button
            class="lightbox-proxima"
            type="button"
            aria-label="Próxima imagem"
        >
            &#10095;
        </button>
    `;

    document.body.appendChild(lightbox);


    const imagemAmpliada =
        lightbox.querySelector(".lightbox-imagem");

    const botaoFechar =
        lightbox.querySelector(".lightbox-fechar");

    const botaoAnterior =
        lightbox.querySelector(".lightbox-anterior");

    const botaoProxima =
        lightbox.querySelector(".lightbox-proxima");


    let imagensAtuais = [];
    let indiceAtual = 0;


    /* =====================================================
       MOSTRA A IMAGEM
       ===================================================== */

    function mostrarImagem() {

        const imagem = imagensAtuais[indiceAtual];

        if (!imagem) {
            return;
        }

        imagemAmpliada.src = imagem.src;
        imagemAmpliada.alt = imagem.alt || "";

    }


    /* =====================================================
       ABRE O LIGHTBOX
       ===================================================== */

    grupos.forEach((grupo) => {

        const imagens = Array.from(
            grupo.querySelectorAll(".carta")
        );


        imagens.forEach((imagem, indice) => {

            imagem.addEventListener("click", () => {

                imagensAtuais = imagens;
                indiceAtual = indice;

                mostrarImagem();

                lightbox.classList.add("ativo");

                document.body.classList.add(
                    "lightbox-aberto"
                );

            });

        });

    });


    /* =====================================================
       IMAGEM ANTERIOR
       ===================================================== */

    function imagemAnterior() {

        if (!imagensAtuais.length) {
            return;
        }

        indiceAtual--;

        if (indiceAtual < 0) {
            indiceAtual = imagensAtuais.length - 1;
        }

        mostrarImagem();

    }


    /* =====================================================
       PRÓXIMA IMAGEM
       ===================================================== */

    function proximaImagem() {

        if (!imagensAtuais.length) {
            return;
        }

        indiceAtual++;

        if (indiceAtual >= imagensAtuais.length) {
            indiceAtual = 0;
        }

        mostrarImagem();

    }


    /* =====================================================
       BOTÕES DE NAVEGAÇÃO
       ===================================================== */

    botaoAnterior.addEventListener("click", (evento) => {

        evento.stopPropagation();

        imagemAnterior();

    });


    botaoProxima.addEventListener("click", (evento) => {

        evento.stopPropagation();

        proximaImagem();

    });


    /* =====================================================
       FECHA O LIGHTBOX
       ===================================================== */

    function fecharLightbox() {

        lightbox.classList.remove("ativo");

        document.body.classList.remove(
            "lightbox-aberto"
        );

        imagemAmpliada.src = "";
        imagemAmpliada.alt = "";

    }


    /* =====================================================
       BOTÃO X
       ===================================================== */

    botaoFechar.addEventListener("click", (evento) => {

        evento.stopPropagation();

        fecharLightbox();

    });


    /* =====================================================
       CLIQUE FORA DA IMAGEM
       ===================================================== */

    lightbox.addEventListener("click", (evento) => {

        if (evento.target === lightbox) {
            fecharLightbox();
        }

    });


    /* =====================================================
       CONTROLES PELO TECLADO
       ===================================================== */

    document.addEventListener("keydown", (evento) => {

        if (!lightbox.classList.contains("ativo")) {
            return;
        }


        /* ESC fecha */

        if (evento.key === "Escape") {
            fecharLightbox();
        }


        /* Seta esquerda */

        if (evento.key === "ArrowLeft") {
            imagemAnterior();
        }


        /* Seta direita */

        if (evento.key === "ArrowRight") {
            proximaImagem();
        }

    });

});