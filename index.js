let background_speed = 1.1;
let ground_speed = 3;
let gravity = 0.2;
let background = document.querySelector('.background-img');
let background_props = background.getBoundingClientRect();
let ground = document.querySelector('.ground');
let ground_props = ground.getBoundingClientRect();
let bird = document.querySelector('.bird');
let bird_props = bird.getBoundingClientRect();
let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');
let game_state = 'Start';
document.addEventListener('keydown', (e) => {
  if (e.key == 'Enter' && game_state != 'Play') {
    document.querySelectorAll('.pipe_sprite').forEach((e) => {
      e.remove();
    });
    let pipe_init_sprite = document.createElement('div');
    pipe_init_sprite.className = 'pipe_sprite';
    pipe_init_sprite.haha = '1';
    document.body.appendChild(pipe_init_sprite);
    bird.style.top = '40vh';
    game_state = 'Play';
    message.innerHTML = '';
    score_title.innerHTML = 'Score : ';
    score_val.innerHTML = '0';
    play();
  }
});
function play() {
  function move_background() {
    if (game_state != 'Play') return;
    background.style.left =
      ((background_props.left - background_speed) % window.innerWidth) + 'px';
    background_props = background.getBoundingClientRect();
    requestAnimationFrame(move_background);
  }
  function move_ground() {
    if (game_state != 'Play') return;
    ground.style.left =
      ((ground_props.left - ground_speed) % window.innerWidth) + 'px';
    ground_props = ground.getBoundingClientRect();
    // pipe

    let pipe_sprite = document.querySelectorAll('.pipe_sprite');
    pipe_sprite.forEach((element) => {
      let pipe_sprite_props = element.getBoundingClientRect();
      bird_props = bird.getBoundingClientRect();
      if (element.haha != '1' && pipe_sprite_props.right <= 0) {
        element.remove();
      } else if (
        element.haha != '1' &&
        ((bird_props.top + bird_props.height / 3 + bird_props.height / 10 >=
          pipe_sprite_props.top &&
          bird_props.top + bird_props.height / 3 + bird_props.height / 10 <=
            pipe_sprite_props.bottom &&
          ((bird_props.right - bird_props.width / 8 >= pipe_sprite_props.left &&
            bird_props.right - bird_props.width / 8 <=
              pipe_sprite_props.right) ||
            (bird_props.left + bird_props.width / 8 >= pipe_sprite_props.left &&
              bird_props.left + bird_props.width / 8 <=
                pipe_sprite_props.right))) ||
          (bird_props.bottom - bird_props.height / 3 - bird_props.height / 10 >=
            pipe_sprite_props.top &&
            bird_props.bottom -
              bird_props.height / 3 -
              bird_props.height / 10 <=
              pipe_sprite_props.bottom &&
            ((bird_props.right - bird_props.width / 8 >=
              pipe_sprite_props.left &&
              bird_props.right - bird_props.width / 8 <=
                pipe_sprite_props.right) ||
              (bird_props.left + bird_props.width / 8 >=
                pipe_sprite_props.left &&
                bird_props.left + bird_props.width / 8 <=
                  pipe_sprite_props.right))))
      ) {
        game_state = 'End';
        message.innerHTML = 'Press Enter To Restart';
        message.style.left = '28vw';
        return;
      } else {
        if (
          pipe_sprite_props.right < bird_props.left &&
          pipe_sprite_props.right + ground_speed >= bird_props.left &&
          element.haha == 'real'
        ) {
          score_val.innerHTML = +score_val.innerHTML + 1;
        }
        element.style.left = pipe_sprite_props.left - ground_speed + 'px';
      }
    });

    requestAnimationFrame(move_ground);
  }
  requestAnimationFrame(move_background);
  requestAnimationFrame(move_ground);

  let bird_dy = 0;
  function apply_gravity() {
    bird_dy = bird_dy + gravity;
    document.addEventListener('keydown', (e) => {
      if (e.key == 'ArrowUp' || e.key == ' ') {
        bird_dy = -6.5;
      }
    });

    if (
      bird_props.top + bird_props.height / 2 <= 0 ||
      bird_props.top + bird_props.height / 2 >= ground_props.top
    ) {
      game_state = 'End';
      message.innerHTML = 'Press Enter To Restart';
      message.style.left = '28vw';
      return;
    }
    if (game_state != 'Play') return;
    bird.style.top = bird_props.top + bird_dy + 'px';
    bird_props = bird.getBoundingClientRect();
    requestAnimationFrame(apply_gravity);
  }
  requestAnimationFrame(apply_gravity);

  let pipe_seperation = 0;
  let pipe_gap = 42;
  function create_pipe() {
    if (game_state != 'Play') return;
    if (pipe_seperation > 115) {
      pipe_seperation = 0;
      let pipe_posi = Math.floor(Math.random() * 43) + 8;
      let pipe_sprite_inv = document.createElement('img');
      pipe_sprite_inv.src = 'pipe_inv.png';
      pipe_sprite_inv.className = 'pipe_sprite';
      pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
      pipe_sprite_inv.style.left = '100vw';
      document.body.appendChild(pipe_sprite_inv);
      let pipe_sprite = document.createElement('img');
      pipe_sprite.src = 'pipe.png';
      pipe_sprite.className = 'pipe_sprite';
      pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
      pipe_sprite.style.left = '100vw';
      pipe_sprite.haha = 'real';
      document.body.appendChild(pipe_sprite);
    }
    pipe_seperation++;
    requestAnimationFrame(create_pipe);
  }
  requestAnimationFrame(create_pipe);
}
