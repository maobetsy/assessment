// anime.js
anime({
  targets: '.logo, .nav-item',
  translateY: {
    value: 50,
    duration: 2300
  },
  rotate: {
    value: 0,
    duration: 1800,
    easing: 'easeInOutSine'
  },
  scale: {
    value: 1,
    duration: 1600,
    delay: 800,
    easing: 'easeInOutQuart'
  },
  delay: 250,
});