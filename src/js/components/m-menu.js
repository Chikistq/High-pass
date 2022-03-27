document.querySelector('#burger').addEventListener('click', function(e) {
  e.currentTarget.classList.add('open')
  function addOpen() {
    document.querySelector('body').style.overflow = 'hidden';
    document.querySelector('.header__top').classList.add('open')
    document.querySelector('.header__mobile').classList.add('open')
    document.querySelector('.header__mobile-menu').classList.add('open')
  }

  function removeOpen() {
    document.querySelector('body').style.overflow = 'auto';
    document.querySelector('.header__mobile-menu').classList.remove('open')
    setTimeout(function () {
      document.querySelector('.header__mobile').classList.remove('open')
      document.querySelector('.header__top').classList.remove('open')

    }, 400)

  }


  addOpen()
  if (this.classList.contains('open')) {
    document.querySelectorAll('.bur-close').forEach( link => {
      link.addEventListener('click', function(ddd) {
        document.getElementById('burger').classList.remove('open')
        removeOpen()
      })
    })
  } else {
    removeOpen()
  }
})