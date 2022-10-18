let params = new URLSearchParams(document.location.search);
let scriptParams = new URLSearchParams(new URL(document.currentScript.src).search);

Reveal.initialize({
    controls: true,
    progress: true,
    hash: true,
    disableLayout: true,
    plugins: [ RevealNotes, RevealSearch ],
    showNotes: scriptParams.has("showNotes") ? !params.has("hideNotes") : params.has("showNotes"),
    slideNumber: 'c/t',
});

Reveal.on('ready', layoutSlide);
Reveal.on('slidechanged', layoutSlide);

function layoutSlide(event) {
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
    
    let revealHeader = document.querySelector('#reveal-header');
    if (revealHeader) {
        revealHeader.innerHTML = null;
        if (event.currentSlide.dataset.header) {
            revealHeader.innerHTML = event.currentSlide.dataset.header;
        }
    }

    let revealFooter = document.querySelector('#reveal-footer');
    if (revealFooter) {
        revealFooter.innerHTML = null;
        if (event.currentSlide.dataset.backgroundImage) {
            let text = document.createElement("SPAN");
            text.innerText = "Crédits photo : ";
            revealFooter.appendChild(text);
            
            let link = document.createElement("A");
            link.href = event.currentSlide.dataset.backgroundCredits;
            link.innerText = event.currentSlide.dataset.backgroundAuthor;
            if (event.currentSlide.dataset.backgroundAuthorNickname) {
                link.innerText += " (" + event.currentSlide.dataset.backgroundAuthorNickname + ")";
            }
            revealFooter.appendChild(link);
            
            let textPost = document.createElement("SPAN");
            textPost.innerText = " sur Unsplash";
            revealFooter.appendChild(textPost);
        }
    }
    
    let speakerNotes = document.querySelector('.reveal .speaker-notes');
    if (speakerNotes) {
        speakerNotes.style.marginTop = revealHeader.offsetHeight + 'px';
    }
}