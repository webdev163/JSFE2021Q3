if (module.hot) {
  module.hot.accept();
}

import './progressBar';
import './exploreSlider';
import './gallery';
import './rippleButton';
import './ticketsPopup';

// eslint-disable-next-line no-console
console.log(`
Выполненные критерии:

✔ Вёрстка валидная +10

✔ Вёрстка семантическая. В коде страницы присутствуют необходимые по заданию элементы (указано минимальное количество, может быть больше) +24

✔ Вёрстка соответствует макету +45

✔ Форма покупки билетов соответствует требованиям технического задания +22

✔ Требования к css соответствуют техническому заданию + 18

✔ Интерактивность, реализуемая через css (плавная прокрутка по якорям, параллакс, полноэкранные панорамы Google Street View и др.) присутствует +25

✔ Интерактивность, реализуемая через js (передвижение ползунков громкости, кликами по кнопкам + и - в секции Tiskets, ripple-эффект, картины в блоке Galery отображаются в рандомном порядке) присутствует  +16

Итого: 150 / 150 (160)`);
