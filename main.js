 window.onload = function()
 {  
  function input()
  {
    let n = document.getElementsByTagName('input')[0].value;
    if ((n == '')||(n < 1)||(n > 26))
    {
      alert ('Введите число от 1 до 26');
      
    }
    else
    {
      createCanvas(); 
    }
  }
 document.getElementsByTagName('input')[2].onclick = input;

}


function createCanvas()
{
  let canvas = document.createElement('canvas');
  canvas.id = 'canvas';
  canvas.width = 1500;
  canvas.height = 1000;
  canvas.style.border = "1px solid";
  let body = document.getElementsByTagName("body")[0];
  body.appendChild(canvas);


  let n = document.getElementsByTagName('input')[0].value;
  let ribs = document.getElementsByTagName('input')[1].value;
  let ways = [];
  for(let i = 0; i < n; i++)
  {
    ways[i] = [];
    for(let j = 0; j < n; j++)
    {
      ways[i][j] = 0;
    }
  }
  let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let counter_num = 0;
  let points = [];

  class point 
  {
    constructor(word, x, y) 
    {
      this.word = word;
      this.x = x;
      this.y = y;
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI*2, false);
      ctx.stroke();
      ctx.font = '20px serif';
      ctx.fillText(word, x - 5, y + 5);
      ctx.closePath();
    }
  }

  let ctx = canvas.getContext('2d');
    for(let i = 0; i < n; i++)
    {
      points[counter_num] = new point (letters[counter_num].toUpperCase(), getRandomIntInclusive(20, canvas.width - 20), getRandomIntInclusive(20, canvas.height - 20));
      counter_num++;
    }
      for(let j = 0; j < ribs; j++)
      {
        let num1 = getRandomIntInclusive(0, n-1);
        let num2 = getRandomIntInclusive(0, n-1);
        ctx.beginPath();
        ctx.moveTo(points[num1].x, points[num1].y);
        ctx.lineTo(points[num2].x, points[num2].y);   
        ctx.stroke(); 
        ctx.closePath();
        ways[letters.indexOf(points[num1].word.toLowerCase())][letters.indexOf(points[num2].word.toLowerCase())] = 1;
      }
      console.log(ways);

      let ribsList = {};
      let top;
      let rebra = [];
      for (let h = 0; h < n; h++)
      {
        top = points[h].word;
        for(let d = 0; d < n; d++)
        {
          if((ways[h][d] == 1) && (points[h].word != points[d].word))
          {
            rebra.push(points[d].word);
          }
          if (d == n - 1)
          {
            ribsList[top] = rebra;
            rebra = [];
          }
        }
      }
      console.log(ribsList);


    document.body.append(document.createElement("p"));
    document.body.lastElementChild.textContent="Начало графа:";
    document.body.lastElementChild.append(document.createElement("input"));
    document.body.lastElementChild.lastChild.setAttribute("type", "text");

    document.body.append(document.createElement("p"));
    document.body.lastElementChild.textContent="Конец графа:";
    document.body.lastElementChild.append(document.createElement("input"));
    document.body.lastElementChild.lastChild.setAttribute("type", "text");

    document.body.append(document.createElement("button"));
    document.body.lastElementChild.textContent="BFS";

    document.body.lastElementChild.addEventListener("click", () => {bfs(ctx, points, letters, ribsList, document.getElementsByTagName('input')[3].value, document.getElementsByTagName('input')[4].value)});
}



function bfs(ctx, points, letters, adj, s, t) {
	// adj - смежный список
	// s - начальная вершина
	// t - пункт назначения

  changeColor(ctx, points, letters, s, 'red');
  changeColor(ctx, points, letters, t, 'green');

  s = s.toUpperCase();
  t = t.toUpperCase();

	// инициализируем очередь
	let queue = [];
	// добавляем s в очередь
	queue.push(s);
	// помечаем s как посещенную вершину во избежание повторного добавления в очередь
	s.visited = true;
	while(queue.length > 0) {
		// удаляем первый (верхний) элемент из очереди
		let v = queue.shift();
    changeColor(ctx, points, letters, v, 'yellow');
    console.log(v)
		// abj[v] - соседи v
		for(let neighbor of adj[v]) {
			// если сосед не посещался
			if(!neighbor.visited) {
				// добавляем его в очередь
				queue.push(neighbor);
				// помечаем вершину как посещенную
				neighbor.visited = true;
				// если сосед является пунктом назначения, мы победили
				if(neighbor === t) return true;
			}
		} 
	}
	// если t не обнаружено, значит пункта назначения достичь невозможно
	return false
}




function getRandomIntInclusive(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function changeColor(ctx, points, letters, tochka, cvet)
{
  tochka = tochka.toLowerCase();
  ctx.beginPath();
  ctx.moveTo(points[letters.indexOf(tochka)].x, points[letters.indexOf(tochka)].y);
  ctx.fillStyle = cvet;
  ctx.arc(points[letters.indexOf(tochka)].x, points[letters.indexOf(tochka)].y, 19, 0, Math.PI*2, false);
	ctx.fill();
  ctx.font = '20px serif';
  ctx.fillStyle = 'black';
  ctx.fillText(points[letters.indexOf(tochka)].word, points[letters.indexOf(tochka)].x - 5, points[letters.indexOf(tochka)].y + 5);
  ctx.closePath();
}