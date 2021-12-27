import mainPage from './pages/main/main';
import './router';

mainPage.render();

// eslint-disable-next-line no-console
console.log(`
Выполненные критерии:

✔ Вёрстка страниц приложения и навигация между ними +30

  - стартовая страница содержит название приложения и кнопку "Начать игру" или аналогичную. Выполняются требования к вёрстке +10
  - на странице с ёлкой есть меню с настройками, слоты с добавленными в избранное игрушками, ёлка. Выполняются требования к вёрстке +10
  - в header приложения есть навигация, которая позволяет с каждой страницы приложения перейти на две другие страницы +10

✔ Меню с настройками +50

  У пользователя есть возможность:
  - выбрать один из нескольких (минимум 8) фонов +10
  - выбрать одну из нескольких (минимум 4) ёлок +10
  - включить/отключить падающий снег +10
  - включить/отключить новогоднюю музыку +10
  - выбранные настройки сохраняются в local storage и отображаются при перезагрузке страницы. Если музыка сохранилась включённой, она начинает играть при первом клике. Есть кнопка сброса настроек, которая очищает local storage +10

✔ Гирлянда +40

  У пользователя есть возможность:
  - добавить на ёлку мерцающую разноцветную гирлянду +20
  - выбрать один из нескольких (минимум 4) цветов лампочек гирлянды или оставить её разноцветной +10
  - внешний вид гирлянды соответствует предложенному образцу или является его улучшенной версией +10

✔ Игрушки в избранном +80

  - в слотах находятся игрушки, которые были добавлены в избранное на странице с игрушками +10
  - если в избранное не была добавлена ни одна игрушка, в слотах отображаются первые 20 игрушек коллекции исходных данных +10
  - игрушки из слотов с игрушками можно перетянуть на ёлку используя drag and drop +10
  - если в процессе перетягивания игрушку отпускают за пределами ёлки, она возвращается в свой слот +10
  - повешенные на ёлку игрушки можно перетягивать в пределах ёлки +10
  - повешенные на ёлку игрушки можно снимать с ёлки, при этом они возвращаются в свой слот +10
  - возле слота с каждой игрушкой указывается количество игрушек в слоте равное количеству экземпляров игрушки в массиве с исходными данными +10
  - когда игрушку "вешают на ёлку" количество игрушек в слоте уменьшается, когда игрушку "снимают с ёлки", количество игрушек в слоте увеличивается, когда все экземпляры игрушки помещаются на ёлку, отображается пустой слот +10

✔ Дополнительный функционал на выбор +20

  - есть кнопка "Сохранить" при клике по которой текущее состояние страницы с ёлкой сохраняется в local storage, изображение ёлки с размещёнными на ней игрушками добавляется в секцию "Вы нарядили". При клике по карточкам из этой секции восстанавливается состояние страницы с ёлкой на момент сохранения +10
  - очень высокое качество оформления приложения + дополнительный функционал, а именно: +10
    1. Дополнительная кнопка для сброса текущих игрушек, висящих на елке
    2. Всплывающее окно с сообщением об успешном сохранении елки
    3. Плавные переходы между страницами

Итого: 220 / 220`);
