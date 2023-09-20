'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(el=>el.addEventListener('click',openModal))

btnCloseModal.addEventListener('click', closeModal);//close from x button
overlay.addEventListener('click', closeModal);// it will close the modal if we click on overlay portion of page

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
}); // closing the model using escape button

//////////////////////////////////////////////////////////////////////////////

// selecting ,creating ,inserting and deleting element 


// selecting element

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

const header=document.querySelector('.header');

const allSection = document.querySelectorAll('.section');



const allbuttons = document.getElementsByTagName('button'); // all button return html
//console.log(allbuttons);
 

// console.log((document.getElementsByClassName('btn')))


// creating and inserting 
// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');

//message.textContent = "here is some text"; //we simply addding text can read also

message.innerHTML = 'we are using created element through java script.<button class="btn btn--close-cookie"> Got it </button>'; // we are writting the whole html code in that div element we can read also from

//--------------------------------------
// below all the program are to add the message in header

//header.prepend(message); // first child of header 
//header.append(message); // last child of headder

// to do both prepend and append at same time
// header.append(message.cloneNode(true))

header.insertAdjacentElement('afterbegin',message)
// header.before(message);
// header.after(message);
//-------------------------------------------------
// deleting element

document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  message.remove(); // remove method is new

  //message.parentElement.removeChild(message);//OLD way
});

// styles 
message.style.backgroundColor = "#37383d"
message.style.width = '120%';

console.log(message.style.height); // it return nothing because in inline text height is not specified it is specified in css
console.log(message.style.backgroundColor); // here we get value because it is specified in inline html code;

// console.log(getComputedStyle(message));// get computed give all properties from web page originaly 

console.log(getComputedStyle(message).color); // this color is specified in css

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 25 + 'px';

// css style changing
document.documentElement.style.setProperty('--color-primary', 'orange')

//attributes

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src); // here we get ip of live server 
console.log(logo.className);

// non standard way
console.log(logo.designer); // we dont get because it is not expected there
console.log(logo.getAttribute('designer'));

logo.alt = "beautiful logo ❤️";

logo.setAttribute('company', 'bankist') // to create a attribute

console.log(logo.getAttribute('src')); // here we get the value written in DOM

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

// data attributes

console.log(logo.dataset.versionNumber);

// classes

logo.classList.remove('c');
logo.classList.add('c', 'j');
console.log(logo.classList.toggle('c'));
console.log(logo.classList.contains('c'));

// dont use
// logo.className='jonas'; it will change all 

///////////////////////////////////////////////////////////////////////////////

// smooth scrooling feature 
// two method of doing so

// old method 
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(window.pageYOffset)// it give the how much page is scrolled
  //scrolling

  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);
  

  // new way of scrolling
  section1.scrollIntoView({behavior:'smooth'})
})
//////////////////////////////////////////////////////////////////////////

const h1 = document.querySelector('h1');
const  alertH1= function (e) {
  alert('add event listener you are reading a h1 elemetn');
  // event will remove arter the time interval
  // setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 9000);
  // below function is used to remove the event listener
  h1.removeEventListener('mouseenter', alertH1);
};

// below code call the just above function
// h1.addEventListener('mouseenter', alertH1);

// removal of event after some time


// both do same work

// h1.onmouseenter= function (e) {
//   alert('add event listener you are reading a h1 elemetn')
// };


//-------------------------------------------------------------------------
// event propagation have two type are 
// bubbling and capturing

//  event bubbling 

// rgb(255,255,255)
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);


// const randomcolor = () =>`rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`
// 
// console.log(randomcolor());
// 
// //  here you can  se the bubbling that is accuring here
// // e represent event
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomcolor();
//   //console.log('LINK', e.target, e.currentTarget);
//   // this keyword and the current target are representing the same 
//   //console.log(e.currentTarget == this);
// 
//   // stop the propagation of event in middle 
//   // e.stopPropagation(); // remaining will not acure after this line
// 
// 
// })// click here all the parent element get the effect
// 


//document.querySelector('.nav__links').addEventListener('click', function (e) {
//this.style.backgroundColor= randomcolor();
//console.log('CONTAINER',e.target,e.currentTarget);
//})// on clicking the this classs element then we get the effect on parent element but no effect on child element or classes

// document.querySelector('.nav').addEventListener('click', function (e) {
  //this.style.backgroundColor = randomcolor();
  // console.log('NAV', e.target, e.currentTarget);
// });// this true is capturing now it is reverse propagation of bubbling as default it set to false



// application of bubbling for smooth transition

//1.add event listiner to common parent 
//2 determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id =e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
  }
})

// traditional waay 

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });


// DOM TRAVERSING 

// h1 

//going downward : child


// console.log(h1.querySelectorAll('.highlight')); 
// console.log(h1.children)
// h1.firstElementChild.style.color = 'white'
// h1.lastElementChild.style.color = 'orangered'

// going upward: parents

// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';


// going sideways : sibling 

//  console.log(h1.previousElementSibling);
//  console.log(h1.nextElementSibling);
//  
//  console.log(h1.previousSibling);
//  console.log(h1.nextSibling);
//  
//  console.log(h1.parentElement.children);

//  [...h1.parentElement.children].forEach(function (el) {
//  if (el !== h1) {
//    el.style.transform = 'scale(0.5)';
//  }
//})

const tabs = document.querySelectorAll('.operations__tab');
const tabscontainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');


tabscontainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".operations__tab");
  


  // removing of all clicked value
  tabs.forEach(el => el.classList.remove("operations__tab--active"));
  tabsContent.forEach(el => el.classList.remove("operations__content--active"));

  // showing that clicked data 
  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

});

/////////////////////////////////////////////////////////////////////
// menu fade animation
 
const nav = document.querySelector('.nav');



const handel = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(el => {
      if (el != link) el.style.opacity = opacity;
    })
    logo.style.opacity = opacity;
  }
};




nav.addEventListener('mouseover', (e) =>handel(e, 0.5));

nav.addEventListener('mouseout', (e) =>handel(e,1));

///////////////////////////////////////////////////////////////////

// sticky navigation

// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > window.outerHeight) {
//     console.log(nav.classList.add('sticky'));
//   }
//   else {
//     nav.classList.remove('sticky');
//   }
// })

// intersection observe API (TO DO SAME THING IN EFFICENT WAY)

// const obscallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// }

// const obsOptions = {
//   root: null,
//   threshold: 0.1, // means 10%
// }

// const observer = new IntersectionObserver(obscallback, obsOptions);
// observer.observe(section1);

// its implementation 

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  }
  else {
    nav.classList.remove('sticky')
  }
}

const headerobserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin:`-${navHeight}px`,
});

headerobserver.observe(header);
 
///////////////////////////////////////////////////
// another use of intersection API (scrolling stuf)


const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); // stop observing
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

/////////////////////////////////////////////////////////////
// LAZY LOADING IMAGES 

const imgTargets = document.querySelectorAll('img[data-src]');
const loadimg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img'); // o make it slow we uses it inside function with load event listener
  });

  observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(loadimg, {
  root: null,
  threshold: 0.09,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));

//////////////////////////////////////////////////////////////////


const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');


let curSlide = 0;
const maxSlide = slides.length


// creating Dots 
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

// showing which slide is active
const activateDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(el => el.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};


// adding event on clicking dot
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  };
});



// movement of slide
const goToSlide = function (slide) {
  slides.forEach((s, i) => { s.style.transform = `translateX(${100 * (i - slide)}%)` });
};


goToSlide(0); // first initialising the slide to 0
activateDot(0);

// next slide

const nextslide = function () {
  if (curSlide === (maxSlide - 1)) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};


// prev slide
const prevslide = function () {
  if (curSlide == 0) {
    curSlide = (maxSlide - 1)
  } else {
    curSlide--;
  };
  goToSlide(curSlide);
  activateDot(curSlide);

};


btnRight.addEventListener('click',nextslide );
btnLeft.addEventListener('click', prevslide);
// moving left or right using keyboard
document.addEventListener('keydown', function (e) {
  if (e.key == 'ArrowRight') {
    nextslide();

  }
  else if (e.key == 'ArrowLeft') {
    prevslide();
  }
});





// smooth scrolling if we click on any footer links
document.querySelector('.footer__nav').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('footer__link')) {
    header.scrollIntoView({ behavior: "smooth" });
  };
});






