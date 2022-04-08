import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
// маска для телефона
import IMask from 'imask';
// стили
import "../scss/style.scss";

// поддерживает ли вебп или нет
import * as webp from "./files/webp.js";
webp.isWebp();

document.addEventListener("DOMContentLoaded", function (event) {

  // СЛАЙДЕР В НАЧАЛЕ (первый)
  new Swiper('.main-screen__swiper', {
    navigation: {
      nextEl: '.main-screen__swiper-next',
    },
    loop: true,
    slidesPerView: 1.3,
    spaceBetween: 10,
    simulateTouch: true,
    grabCursor: true,
    // centeredSlides: true,
  });

  // ВТОРОЙ СЛАЙДЕР
  const paginationDots = document.querySelectorAll('.dots-item');

  const secondSwiper = new Swiper('.popular-dishes__swiper', {
    navigation: {
      prevEl: '.popular-dishes__swiper-prev',
      nextEl: '.popular-dishes__swiper-next',
    },
    loop: true,
    slidesPerView: 1,
    simulateTouch: true,
    grabCursor: true,
  });

  // суть такова: когда точка пагинации становится крупнее (8на8 вместо 4на4), ее позиция становится слишком кривой относительно
  // полосы под точками, следующий код меняет позицию (left) точки на единичку влево, чтоб хоть немного ровнее все это дело смотрелось.
  // Интересно, что произойдет при адаптации всего этого дела (надеюсь ничего (страшного) (в теории и не должно))
  let prevSlide;
  let prevPos;

  secondSwiper.on('transitionEnd', function () {

    // получили активный слайд и значение его left без px 
    let slide = paginationDots[secondSwiper.realIndex];
    let pos = parseInt(window.getComputedStyle(slide, null).getPropertyValue('left').match(/\d+/));

    // удалили у всех (на всякий случай) элементов класс активности и добавили его только тому, кому надо
    paginationDots.forEach(item => {
      item.classList.remove('active');
    })
    slide.classList.add('active');

    // Предыдущий слайд - если имеет какое либо значение, то установить этому слайду предыдущую позицию
    if (prevSlide) {
      prevSlide.style.left = prevPos + 'px';
    }

    prevSlide = slide;
    prevPos = pos;

    // и вот собственно сама суть
    slide.style.left = pos - 1 + 'px';
  });

  // маска для номера телефона
  phoneMask = IMask(
    document.getElementById('phone-mask'), {
      mask: '+{7} (000) 000-00-00'
    });


});

//Бургер меню
let menuBtn = document.querySelector('.menu__icon');
let menu = document.querySelector('.menu__body');

menuBtn.addEventListener('click', function () {
  menuBtn.classList.toggle('active');
  menu.classList.toggle('active');

  if (document.body.style.overflow != 'hidden') {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }
});


// const popupLinks = document.querySelectorAll('.popup-link');
// const body = document.querySelector('body');

// setTimeout = 800;
// let unlock = true;


// let index = 0;

// if (popupLinks.length > 0) { //Проверка на то, существует ли ссылка 
//   for (; index < popupLinks.length; index++) {
//     const popupLink = popupLinks[index];
//     popupLink.addEventListener("click", function (e) {
//       const popupName = popupLink.getElementById('href').replace('#', '');
//       const curentPopup = document.getElementById(popupName);
//       popupOpen(curentPopup);
//       e.preventDefault();
//     });
//   }
// }

// //Закрытие модального окна
// const popupCloseiIcon = document.querySelectorAll('.close-popup');

// if (popupLinks.length > 0) {
//   for (; index < popupCloseiIcon.length; index++) {
//     const el = popupCloseiIcon[index];
//     el.addEventListener("click", function (e) {
//       popupClose(el.closest('.popup')); // обьект который является ближайшем родителем ссылка с классом popup
//       e.preventDefault();
//     });
//   }
// }

// function popupOpen(curentPopup) {
//   if (curentPopup && unlock) {
//     const popupActive = document.querySelector('.open');
//     if (popupActive) {
//       popupClose(popupActive, false);
//     } else bodyLock();
//     curentPopup.classList.add('open');
//     curentPopup.addEventListener("click", function (e) {
//       if (!e.target.closest('.popup__content')) {
//         popupClose(e.target.closest('.popup'));
//       }
//     });
//   }
// }

// function popupClose(popupActive, doUnlock = true) {
//     if(unlock){
//       popupActive.classList.remove('open');
//       if(doUnlock){
//         bodyUnLock();
//       }
//     }
// }