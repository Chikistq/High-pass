


document.addEventListener('DOMContentLoaded', function () {

  /* scroll*/
  const smoothLinks = document.querySelectorAll('a[href^="#"]')
  for (const smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function(e) {
      e.preventDefault();
      const id = smoothLink.getAttribute('href')
      if (id.length > 1) {
        document.querySelector(id).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  }


  /* validate form */

  new window.JustValidate('.about-us__right-form', {
    colorWrong: '#F06666',
    tooltip: {
      position: 'top',
    },
    rules: {
      email: {
        required: false,
        email: true
      },
    },
    messages: {
      email: 'Введите верный E-mail'
    },
    submitHandler: function(form) {
      const formData = new FormData(form);

      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
          }
        }
      }
      xhr.open('POST', 'mail1.php', true);
      xhr.send(formData);

      form.reset();
    }
  });

  new window.JustValidate('.contacts__request-form', {
    colorWrong: '#FF3030',
    rules: {
      name: {
        required: true,
        minLength: 3,
        maxLength: 30,
        strength: {
          custom: /^[a-zа-яё\s]+$/iu,
        }
      },
      email: {
        required: false,
        email: true
      },
    },
    messages: {
      name: {
        required: "Введите Ваше имя",
        minLength: "Имя слишком короткое",
        strength: "Недопустимый формат"
      },
      email: 'Введите верный E-mail'
    },
    submitHandler: function(form) {
      const formData = new FormData(form);

      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
          }
        }
      }

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);
      console.log(formData)
      form.reset();
    }
  });


  /* search active */
  setSearch({
    openBtnClass: "socials__search", // класс кнопки открытия
    closeBtnClass: "search-form__closebtn", // класс кнопки закрытия
    searchClass: "search-form", // класс формы поиска
    activeClass: "is-opened", // класс открытого состояния
    hiddenClass: "is-closed", // класс закрывающегося состояния (удаляется сразу после закрытия)
    padding: 'header__top'
  });

  function setSearch(params) {
    const openBtn = document.querySelector(`.${params.openBtnClass}`);
    const search = document.querySelector(`.${params.searchClass}`);
    const align = document.querySelector(`.${params.padding}`);
    const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

    search.addEventListener("animationend", function(evt) {
      if (this._isOpened) {
        this.classList.remove(params.activeClass);
        this.classList.remove(params.hiddenClass);
        this._isOpened = false;
      } else {
        this._isOpened = true;
      }
    });

    search.addEventListener('click', function(evt) {
      evt._isSearch = true;
    });

    openBtn.addEventListener("click", function(evt) {
      this.disabled = true;

      if (
        !search.classList.contains(params.activeClass) &&
        !search.classList.contains(params.hiddenClass)
      ) {
        search.classList.add(params.activeClass);
        align.classList.add('is-active')
        openBtn.classList.remove(params.activeClass);
        openBtn.classList.add(params.hiddenClass);
      }
    });

    closeBtn.addEventListener('click', function(event) {
      event.preventDefault()
      openBtn.disabled = false;
      openBtn.classList.remove(params.hiddenClass);
      openBtn.classList.add(params.activeClass);
      align.classList.remove('is-active')
      search.classList.add(params.hiddenClass);
    });

    document.body.addEventListener('click', function(evt) {
      if (!evt._isSearch && search._isOpened) {
        openBtn.classList.remove(params.hiddenClass);
        openBtn.disabled = false;
        search.classList.add(params.hiddenClass);
      }
    });
  }
  /* search active end */

})


/* preload */
const closePreloader = (el, timeout) => {
  el.style.opacity = 1;
  el.style.transition = `opacity ${timeout}ms`;
  el.style.opacity = 0;

  setTimeout(() => {
    el.style.display = 'none';
  }, timeout);
};

window.addEventListener('load', function (event) {
  const el = document.querySelector('.preloader')
  closePreloader(el, 1000)
})
/* preload end */

