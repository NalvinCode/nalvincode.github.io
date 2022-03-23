const homeBody = document.querySelector(".home-body");
const navbar = document.querySelector(".navbar");
const logos = document.querySelectorAll(".logos-table td a");
const lengBtn = document.querySelector("#lenguage");
const lengArrow = document.querySelector(".fa-sort-down");
const lengDropdown = document.querySelector('.lenguage-dropdown');

$( document ).ready(function() {
    console.log( "ready!" );
    let dropdownWth = lengDropdown.clientWidth;
    let lengArroWth = lengArrow.clientWidth;
    let moveTo = (window.scrollX + lengArrow.getBoundingClientRect().left) - (dropdownWth / 2)
    $(lengDropdown).css("transform", "translateX(" + moveTo + "px)");
});

//Intersection Observer

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
}

const observer = new IntersectionObserver( (entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            navbar.classList.add('dark');
        }else{
            navbar.classList.remove('dark');
        }
    })
}, observerOptions);

observer.observe(homeBody);

//Carousel

const carouselButtons = document.querySelectorAll("[data-carousel-button]");

carouselButtons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const slides = button.closest("[data-carousel]").querySelector("[data-slides]");

        const activeSlide = slides.querySelector("[data-active]");
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;

         if(newIndex < 0) newIndex = slides.children.length - 1;
         if(newIndex >= slides.children.length) newIndex = 0;

        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
    })
})

//Scroll-to animation

$('.to-section').click(function(e){
    e.preventDefault();
    let target = $($(this).attr('href'));

    if( !$('body, html').is(':animated') ) {
        if(target.length){
            $('body, html').stop();
            let docOffset = $(document).scrollTop;
            let scrollTo = target.offset().top;
            $('body, html').animate({scrollTop: scrollTo+'px'}, 650);
        }
    }
});

//Event-listeners

logos.forEach(item => {
    //Logo underline expand when hover the logo
    item.addEventListener("mouseover", function(){
        anchor = $(item);
        anchor.next().css("width", "50%");
        anchor.next().css("background-color", "#d32f12");
        anchor.closest("td").css("opacity", "1");
    });
    //Logo underline contract when unhover the logo
    item.addEventListener("mouseout", function(){
        anchor = $(item);
        anchor.next().css("width", "20%");
        anchor.next().css("background-color", "#828282");
        anchor.closest("td").css("opacity", "0.9");
    });
  })

lengBtn.addEventListener("click", function(){
    if(lengDropdown.style.opacity == 1){
        $(lengDropdown).css("opacity", "0");
    }else{
        $(lengDropdown).css("opacity", "1")
    }
});