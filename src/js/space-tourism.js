import '../pages/space-tourism/index.html';

import '../css/reset.css';
import '../css/_fonts.scss';
import '../css/space-tourism/_base.scss';
import '../css/space-tourism/style.scss';
import '../css/space-tourism/_main.scss';

const navigation = document.querySelector('.navigation__list');
const navToggle = document.querySelector('.navigation__toggle');
const body = document.querySelector('.page__body');

navToggle.addEventListener('click', () => {
    const visibility = navigation.getAttribute('data-visible');
    if (visibility === 'false') {
        navigation.setAttribute('data-visible', true);
        navToggle.setAttribute('aria-expanded', true);
        body.classList.add('menu-open');
    } else {
        navigation.setAttribute('data-visible', false);
        navToggle.setAttribute('aria-expanded', false);
        body.classList.remove('menu-open');
    }
})