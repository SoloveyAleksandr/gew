document.addEventListener("DOMContentLoaded", () => {
  const LOADER = document.querySelector('.loader');

  if (LOADER) {
    const loaderTL = gsap.timeline({
      onComplete: () => {
        LOADER.classList.add('_disable')
      }
    });

    loaderTL.to('.loader-img', {
      width: "15vw",
      height: "15vw",
      opacity: 1,
      duration: 2,
    })
      .fromTo('.loader-img-path_1', {
        x: "10%",
        y: "-10%",
        filter: "drop-shadow(0 0 0.1rem #fff)",
      },
        {
          x: "0%",
          y: "0%",
          filter: "drop-shadow(0 0 0rem #fff)",
          duration: 1,
        }, 'sin')
      .fromTo('.loader-img-path_2', {
        filter: "drop-shadow(0 0 0.1rem #fff)",
      },
        {
          filter: "drop-shadow(0 0 0rem #fff)",
          duration: 1,
        }, 'sin')
      .fromTo('.loader-img-path_3', {
        x: "-10%",
        y: "10%",
        filter: "drop-shadow(0 0 0.1rem #fff)",
      },
        {
          x: "0%",
          y: "0%",
          filter: "drop-shadow(0 0 0rem #fff)",
          duration: 1,
        }, 'sin')
      .to('.loader-img', {
        scale: 0.95,
        duration: 1,
      }, 'sin')
      .from('body', {
        overflow: 'hidden'
      })
      .to('.loader', {
        opacity: 0,
        duration: 1.5,
        delay: 1,
      })
  }

  // HEADER & MENU
  if (document.querySelector('.header')) {
    // menu
    const MENU_BTN = document.querySelector('.header-btn');
    MENU_BTN.onclick = () => MENU_BTN.classList.toggle('_active');

    // search
    const SEARCH_BTN = document.querySelector('.header-search-btn__search');
    const SEARCH_INPUT = document.querySelector('.header-search__input');

    class Search {
      constructor(btn, input) {
        this.btn = btn;
        this.input = input;
        this.isActive = false;
        this.init();
      }

      init() {
        window.onclick = this.closeSearch.bind(this);
        this.input.onclick = (e) => e.stopPropagation();
        this.btn.onclick = (e) => {
          e.stopPropagation();
          this.isActive ?
            this.closeSearch.call(this) :
            this.openSearch.call(this);
        };
      }

      openSearch() {
        this.isActive = true;
        if (window.innerWidth <= 650) {
          this.input.classList.add('_active');
          this.input.focus();
        }
      }

      closeSearch() {
        this.isActive = false;
        this.input.classList.remove('_active');
      }
    }

    new Search(SEARCH_BTN, SEARCH_INPUT);
  }
  //<==


  // MAIN
  if (document.querySelector('.main-swiper')) {
    let pagination = null;

    const swiper = new Swiper('.main-swiper', {
      effect: 'fade',
      loop: true,
      speed: 500,
      autoplay: {
        delay: 3000,
      },
      pagination: {
        type: "custom",
        el: '.main-swiper-pagination-btns',
        renderCustom: function (swiper, current, total) {
          if (pagination) {
            pagination.setActiveBtn(current - 1);
            pagination.setActiveTitle(current - 1);
          }
        }
      }
    });
    swiper.autoplay.stop();

    const titles = gsap.utils.toArray('.main-swiper-pagination__title');
    const btns = gsap.utils.toArray('.main-swiper-pagination-btn');

    class Pagination {
      constructor(btns, titles, swiper) {
        this.btns = btns;
        this.titles = titles;
        this.swiper = swiper;
        this.init();
      }

      init() {
        this.btns.forEach((btn, index) => {
          btn.onclick = () => {
            this.swiper.slideTo(index + 1);
            this.setActiveBtn(index);
            this.setActiveTitle(index);
          }
        })
      }

      setActiveBtn(index) {
        this.btns.forEach((btn, i) => {
          if (i === index) {
            btn.classList.add('_active');
          } else {
            btn.classList.remove('_active');
          }
        })
      }

      setActiveTitle(index) {
        this.titles.forEach((title, i) => {
          if (i === index) {
            title.classList.add('_active');
          } else {
            title.classList.remove('_active');
          }
        })
      }
    }

    pagination = new Pagination(btns, titles, swiper);

    if (document.querySelector('.main-swiper-conteiner')) {
      gsap.from('.main-swiper', {
        opacity: 0,
        scale: 0,
        duration: 2.5,
        delay: 5,
      });
      gsap.from('.main-swiper-wrapper', {
        opacity: 0,
        y: '-100vh',
        duration: 1.2,
        delay: 6,
        onComplete: () => swiper.autoplay.start(),
      });

      gsap.from('.main-title', {
        x: "-100vw",
        duration: 2,
        delay: 6,
      });
      gsap.from('.main-subtitle', {
        x: "-100vw",
        duration: 2,
        delay: 6.5,
      });
    }
  }

  if (document.querySelector('.main-collections')) {
    const animList = gsap.utils.toArray('.main-collections-item');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.main-collections',
        start: "top 50%",
        end: "bottom 10%",
        toggleActions: "play none play reverse",
      }
    })
    animList.forEach((item, index) => {
      tl.from(item, {
        opacity: 0,
        y: '+=20rem',
        duration: 1,
        delay: index * 0.2,

      }, 'sin')
    })
  }

  if (document.querySelector('.main-portfolio-swiper')) {
    const swiper = new Swiper('.main-portfolio-swiper', {
      effect: 'slide',
      loop: true,
      speed: 500,
      autoplay: {
        delay: 3000,
      },
      centeredSlides: true,
      slidesPerView: 'auto',
      touchMoveStopPropagation: true,

      pagination: {
        el: '.main-portfolio-pagination',
        type: 'bullets',
        bulletClass: 'main-portfolio-pagination__bullet',
        bulletActiveClass: '_active',
        clickable: true,
      },
    });
  }

  // CATALOG
  if (document.querySelector('.catalog-list')) {
    const animList = gsap.utils.toArray('.catalog-list-item');

    animList.forEach(item => {
      gsap.from(item, {
        opacity: 0,
        y: '15rem',
        duration: 1,
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          end: "bottom 0",
          toggleActions: "play none play reverse",
        }
      })
    })
  }
  //<==

  // WORK
  if (document.querySelector('.work')) {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: '(min-width: 1025px) and (prefers-reduced-motion: no-preference)',
    }, () => {
      const tl = gsap.timeline();
      const images = gsap.utils.toArray('.work-anim-img');
      images.forEach((item, index) => {
        tl.from(item, {
          opacity: 0,
          y: '20rem',
          duration: 1,
          delay: index * 0.2 + 1,
        }, 'sin');
      });
    });
  }
  //<== 

})