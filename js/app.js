//Define Global Variables
const sections = document.querySelectorAll('section');
const btnTop = document.getElementById('btnTop');
const navList = document.getElementById('nav-list');
let timer;

//Creat a funtion to generate a dynamic navbar
const creatList = (() => {
    sections.forEach( function(section){
        const listClass = section.getAttribute('id');
        const listTitle = section.getAttribute('id');
        const listInnerHtml = `${listTitle}`;
        const listItem = document.createElement('li');
        listItem.classList.add(listClass);
        listItem.innerHTML = listInnerHtml;
        navList.appendChild(listItem);
    })
})();

//Select the navbar items and active the first section in the page
const navItems = document.querySelectorAll('li');
navItems[0].classList.add('active');

//Build a onclick event listener to implement the scroll effect in JS
navList.addEventListener('click', (event) =>{
    const targetClass = event.target.getAttribute('class');
    const sectionToScroll = document.getElementById(targetClass);
    sectionToScroll.scrollIntoView({behavior: "smooth"});
})

//Build a scroll event listener to add active class in right element in JS
window.addEventListener('scroll', () => {

//Implement navbar visible when the user scroll
    window.clearTimeout(timer);
    document.getElementsByClassName('nav')[0].style.visibility = "visible";
    let current = '';

//Loop to add/remove active class for sections.active
    sections.forEach( (section) => {
        section.classList.remove('active');
        const topOfSection = section.offsetTop;
        const viewHeight = section.clientHeight;

//Compare all the offsetTop of sections to pageYOffect, we can get which page is the user viewing
//Reduce the clientHeight from the section.offsetTop can make the effect of page charging look more fluent(in my opinion only XD)
        if (pageYOffset >= topOfSection - viewHeight/5 ){
            current = section.getAttribute('id');
            section.classList.add("active");
        }
    })

//Loop to add/remove active class for li.active
    navItems.forEach( (li) => {
        li.classList.remove('active');
        if (li.classList.contains(current)){
            li.classList.add('active');
        }
    })

//Implement the button that to back to top visible when the user is viewing below the half of first page, and it will hidden when the user go back top
    if (pageYOffset > document.getElementById('second-page').offsetTop /2){
        document.getElementById('btnTop').style.visibility = "visible";
    } else {
        document.getElementById('btnTop').style.visibility = "hidden";
    }
})

//Implement navbar hidden when the user stop scrolling
window.addEventListener('scroll', () => {
    timer = setTimeout(() => {
        document.getElementsByClassName('nav')[0].style.visibility= "hidden";
    }, 2000);
},false)

//Implement the button that to back to top
btnTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'        
      });
})



