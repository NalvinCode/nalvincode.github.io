const navbar = document.querySelector(".navbar");
const homeBody = document.querySelector(".home-body");
const aboutBody = document.querySelector(".about-body");
const prinBody = document.querySelector(".principals-body");
const contBody = document.querySelector(".contact-body");
const logos = document.querySelectorAll(".logos-table td a");
const lengBtns = document.querySelectorAll(".lenguage, .lenguage-sm");
const lengArrow = document.querySelector(".lenguage i");
const lengDropdown = document.querySelector('.lenguage-dropdown');
const navItems = document.querySelectorAll(".navigation li a");
const lengSelect = document.querySelectorAll(".spanish-div, .english-div");
const hamburger = document.querySelector(".navbar .hamburger")
const hambNav = document.querySelector(".hamburger-navigation");
const hamBtns = document.querySelectorAll(".hamburger-navigation a, .hamburger-navigation .close-navigation");

$( document ).ready(function() {
    let dropdownWth = lengDropdown.clientWidth;
    let moveTo = (window.scrollX + lengArrow.getBoundingClientRect().left) - (dropdownWth / 2);
    $(lengDropdown).css("transform", "translateX(" + moveTo + "px)");
    console.log( "ready!" );
});

//Intersection Observer

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7
}

const observer = new IntersectionObserver( (entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            let entryTarget = entry.target;

            navItems.forEach(item => {
                $(item).css("color", "#d3d0d0");
            });
    
            navbar.classList.add('dark');

            switch(entryTarget){
                case homeBody:
                    $(navItems[0]).css("color", "#ffffff");
                    navbar.classList.remove('dark');
                break;
                case aboutBody:
                    $(navItems[1]).css("color", "#ffffff");
                break;
                case prinBody:
                    $(navItems[2]).css("color", "#ffffff");
                break;
                case contBody:
                    $(navItems[3]).css("color", "#ffffff");
                break;
                default:
                break;
            }
        }
    })
}, observerOptions);


observer.observe(homeBody);
observer.observe(aboutBody);
observer.observe(prinBody);
observer.observe(contBody);

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

lengBtns.forEach(e => {
    e.addEventListener("click", function(){
        let lengIcon = e.firstChild;

        if(lengDropdown.style.opacity == 1){
            $(lengDropdown).css("opacity", "0");
            $(lengDropdown).css("z-index", "-1");
            $('.lenguage-dropdown div').each(function() {
                $( this ).css("cursor", "default");
              });
    
            $('.lenguage-dropdown div').each(function() {
                $( this ).css("pointer-events", "none");
            });
        }else{
            let dropdownWth = lengDropdown.clientWidth;
            let moveTo = (window.scrollX + lengIcon.getBoundingClientRect().left 
                         + (lengIcon.clientWidth / 2)) 
                         - (dropdownWth / 2);
            if(lengDropdown.getBoundingClientRect().left != moveTo){
                if(e == document.querySelector(".lenguage-sm")){
                    $(lengDropdown).css("transform", "translate(" + moveTo + "px, 10px)");
                }else{
                    $(lengDropdown).css("transform", "translateX(" + moveTo + "px)");
                }
            }
    
            $(lengDropdown).css("opacity", "1");
            $(lengDropdown).css("z-index", "999999");
            $('.lenguage-dropdown .spanish-div, .lenguage-dropdown .english-div').each(function() {
                $( this ).css("cursor", "pointer");
              });
    
            $('.lenguage-dropdown div').each(function() {
                $( this ).css("pointer-events", "auto");
            });
        }
    });
})

hamburger.addEventListener("click", function(){
    $(hambNav).css("transform", "translateX(0)");
});

hamBtns.forEach(e => {
    e.addEventListener("click", function(){
        $(hambNav).css("transform", "translateX(100%)");
    });
});