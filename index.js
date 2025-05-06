const ctx = document.getElementById("myChart");
let jsonData;

fetch("data.json")
  .then(function (response) {
    if (response.ok === true) {
      return response.json();
    }
  })

  .then(function (data) {

    jsonData = data;

    const maxAmount = Math.max(...jsonData.map((data) => data.amount)); 

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

      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      bar.appendChild(tooltip);

      bar.onmouseover = function () {
        bar.style.backgroundColor = "hsl(10, 100%, 76%)";
        tooltip.textContent = `$${data.amount}`
        tooltip.style.display = 'block';
        if(data.amount === maxAmount) {
          bar.style.backgroundColor = "hsl(187, 48.50%, 80.20%)";
        }
      };
      bar.onmouseleave = function () {
        bar.style.backgroundColor = "hsl(10, 79%, 65%)";
        tooltip.style.display = 'none';
        if(data.amount === maxAmount) {
          bar.style.backgroundColor = "hsl(186, 34%, 60%)";
        }
      };

      const label = document.createElement("div");
      label.textContent = data.day;
      label.classList.add("label");
      bar.appendChild(label);

      ctx.appendChild(bar);

      setTimeout(() => {
        bar.style.height = `${(data.amount / maxAmount) * 100}%`;
      }, 100);
    });
;
  });
