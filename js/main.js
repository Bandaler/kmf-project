document.addEventListener('DOMContentLoaded', () => {
  const menuDesktop = () => {
    let menu = document.querySelectorAll('.menu-item > a');
    menu.forEach(el => {
      el.addEventListener('click', (e) => {
        el.classList.toggle('active');

      })

      document.body.addEventListener('click', (e) => {
        if (!e.target.closest('.submenu, .menu-item > a')) {
          el.classList.remove('active')
        }
      })
      menu.forEach(el => {
        el.addEventListener('click', (e) => {
          const target = e.target;
          menu.forEach(el => {
            if (el === target) {
              el.classList.toggle('active')
            } else {
              el.classList.remove('active')
            }
          })
        })
      })
    })

  }

  menuDesktop();

  const mainscreenSlider = () => {
    let mainSlider = document.querySelector('.mainscreen-slider');
    const arrowLeft = document.querySelector('.main-slide__arrow--prev');
    const arrowRight = document.querySelector('.main-slide__arrow--next');

    if (mainSlider) {
      var main = new Splide('.mainscreen-slider', {
        perPage: 1,
        pagination: true,
        type: 'loop',
        arrows: false,
        breakpoints: {
          '600': {
            // height    : 465,
            // autoWidth: true,
          }
        },
      }).mount();

      const goToSlide = target => e => {
        main.go(target);

      }

      const goBackSlide = target => e => {
        main.go(target);

      }

      arrowRight.addEventListener('click', goToSlide('>'));
      arrowLeft.addEventListener('click', goBackSlide('<'));
    }

  }

  mainscreenSlider();

  businessSlider = () => {
    let businessSlider = document.querySelector('.business-slider');
    const arrowLeft = document.querySelector('.business-slide__arrow--prev');
    const arrowRight = document.querySelector('.business-slide__arrow--next');

    if (businessSlider) {
      var main = new Splide('.business-slider', {
        perPage: 3,
        pagination: true,
        type: 'loop',
        arrows: false,
        breakpoints: {
          '1200': {
            perPage: 3,
            gap: 24
          },
          '992': {
            destroy: true
          }
        },
      }).mount();

      const goToSlide = target => e => {
        main.go(target);

      }

      const goBackSlide = target => e => {
        main.go(target);

      }

      arrowRight.addEventListener('click', goToSlide('>'));
      arrowLeft.addEventListener('click', goBackSlide('<'));
    }

  }

  businessSlider();


  const LANGUAGES_MAP = {
    ru: 'Рус',
    kz: 'Каз'
  }

  class SelectOptions {
    constructor(selector) {
      this.selector = selector;
      this.container = document.getElementById(selector);
      this.button = this.container.querySelector('.select-button');
      this.state = this.button.querySelector(".select-state");
      this.options = this.container.querySelectorAll(".select-option");
      this.listen();
    }

    listen() {
      this.button.addEventListener("click", () =>
        this.container.classList.toggle("active")
      );

      this.options.forEach((option) => {
        option.addEventListener("click", () => {
          const selectedOptionText = option.querySelector(".select-option__text");
          this.state.innerText = selectedOptionText.innerText;
          this.state.setAttribute('data-lang', selectedOptionText.getAttribute('data-lang'));
          this.state.dispatchEvent(new Event('change'));
          this.container.classList.remove("active");
        });
      });

      document.body.addEventListener('click', (e) => {
        if (!e.target.closest(`#${this.selector}, .select-options`)) {
          this.container.classList.remove("active");
        }
      })
    }
  }

  const selectOptions = new SelectOptions('select-menu');



  class LanguageSwitcher {
    constructor(selector) {
      this.switcher = document.getElementById(selector);
      this.getLang();
      this.listen();
    }

    getLang() {
      const search = window.location.search;
      this.params = new URLSearchParams(search);
      this.lang = this.params.get('lang') || 'ru';
      this.switcher.setAttribute('data-lang', this.lang);
      this.switcher.innerText = LANGUAGES_MAP[this.lang];
    }

    listen() {
      this.switcher.addEventListener('change', () => {
        this.params.set('lang', this.switcher.getAttribute('data-lang'));
        window.location.search = this.params;
      })
    }
  }

  const languageSwitcher = new LanguageSwitcher('lang-switcher');

  const menuMobile = () => {
    let menuBtn = document.querySelector('.burger');
    let menu = document.querySelector('.nav-right');


    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('open');
      menu.classList.toggle('active');
    })

  }

  menuMobile();


})


function stickyElement(e) {
  
  var nav = document.querySelector('.header');
  let hedSpace = document.querySelector('.fake-header__space');
  var headerHeight = getComputedStyle(nav).height.split('px')[0];
  var scrollValue = window.scrollY;
  
  if (scrollValue > headerHeight){
    nav.classList.add('is-fixed');
    hedSpace.classList.add('relative');

  } else if (scrollValue < headerHeight){
    nav.classList.remove('is-fixed');
    hedSpace.classList.remove('relative');
    
  }

}

window.addEventListener('scroll', stickyElement);

