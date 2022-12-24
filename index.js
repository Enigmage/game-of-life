const s = p => {
  let dim, rows, cols, board, start;
  p.setup = () => {
    dim = 40;
    let myCanvas = p.createCanvas(1600, 800);
    p.frameRate(10);
    myCanvas.parent("my-canvas");
    p.background("#bbb");

    rows = p.floor(p.height / dim);
    cols = p.floor(p.width / dim);

    board = new Array(cols);
    for (let i = 0; i < cols; i++) {
      board[i] = new Array(rows);
    }
    start = false;
    init();
  };
  p.draw = () => {
    if (start) generate();
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (board[i][j] === 1) p.fill("#99ff66");
        else p.fill("#333300");
        p.stroke(0);
        p.rect(i * dim, j * dim, dim - 1, dim - 1);
      }
    }
  };
  const init = () => {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (i === 0 || j === 0 || i === cols - 1 || j === rows - 1)
          board[i][j] = 1;
        else board[i][j] = 0;
      }
    }
  };
  const generate = () => {
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        let aliveNeighbours = findAliveNeighbours(r, c);
        let alive = board[c][r];
        if (alive) {
          if (aliveNeighbours <= 1 || aliveNeighbours > 3) board[c][r] = 0;
        } else {
          if (aliveNeighbours === 3) board[c][r] = 1;
        }
      }
    }
  };

  const findAliveNeighbours = (r, c) => {
    let output = 0;
    let di = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
      [-1, -1],
    ];
    for (let i = 0; i < di.length; i++) {
      let tr = r + di[i][0];
      let tc = c + di[i][1];
      if (tr >= 0 && tr < rows && tc >= 0 && tc < cols && board[tc][tr] === 1)
        output++;
    }
    return output;
  };
  document.getElementById("reset-button").addEventListener("click", e => {
    e.preventDefault();
    start = false;
    document.getElementById("start-button").innerHTML = "Start";
    init();
  });
  document.getElementById("start-button").addEventListener("click", e => {
    e.preventDefault();
    start = !start;
    let buttonElement = document.getElementById("start-button");
    if (!start) buttonElement.innerHTML = "Start";
    else buttonElement.innerHTML = "Pause";
  });
};

let sketch = new p5(s);
