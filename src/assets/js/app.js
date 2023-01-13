document.addEventListener("DOMContentLoaded", () => {
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

  // animation


  //<==
})