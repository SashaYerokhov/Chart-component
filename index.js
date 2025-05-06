const ctx = document.getElementById("myChart");
// console.log(ctx);
let jsonData;

fetch("data.json")
  .then(function (response) {
    if (response.ok === true) {
      return response.json();
    }
  })

  .then(function (data) {
    // console.log(data);
    // console.log(data.amount); // undefined

    jsonData = data;
    // console.log(jsonData);

    // createChart(data);
    // Функция обновления графика
    const maxAmount = Math.max(...jsonData.map((data) => data.amount)); // Нашли максимальное значение
    // console.log(maxAmount);

    // Создание столбика графика
    jsonData.forEach((data) => {
      // console.log(data.amount);
      const bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.backgroundColor = "hsl(10, 79%, 65%)";
      bar.style.height = "0";
      // console.log(maxAmount);
      // console.log(data.amount);
      if(data.amount === maxAmount) {
        bar.style.backgroundColor = "hsl(186, 34%, 60%)";
      }

      // всплывающая подсказка - tooltip
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      bar.appendChild(tooltip);
      // https://medium.com/@codenova/exercise-creating-a-custom-tooltip-with-vanilla-javascript-287d2dcfe0c2

      // Для hover-эффекта
      // onmouseover - генерируется при наведении указателя мыши на элемент
      bar.onmouseover = function () {
        bar.style.backgroundColor = "hsl(10, 100%, 76%)";
        tooltip.textContent = `$${data.amount}`
        tooltip.style.display = 'block';
        if(data.amount === maxAmount) {
          bar.style.backgroundColor = "hsl(187, 48.50%, 80.20%)";
        }
      };
      // onmouseleave - генерируется при смещении указателя мыши, находящегося на элементе, за его пределы
      bar.onmouseleave = function () {
        bar.style.backgroundColor = "hsl(10, 79%, 65%)";
        tooltip.style.display = 'none';
        if(data.amount === maxAmount) {
          bar.style.backgroundColor = "hsl(186, 34%, 60%)";
        }
      };

      // Добавление дней недели внизу графика
      const label = document.createElement("div");
      label.textContent = data.day;
      label.classList.add("label");
      bar.appendChild(label);

      // Добавление столбиков к див графика
      ctx.appendChild(bar);

      // Анимация высоты столбика
      setTimeout(() => {
        bar.style.height = `${(data.amount / maxAmount) * 100}%`;
      }, 100);
      // console.log(maxAmount)
    });
;
  });
