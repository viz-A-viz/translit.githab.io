export function animationShow(input) {
  input.animate(
    [
      { transform: 'translate(0,100%) scale(0,0)' },
      { transform: 'scale(1,1)' },
    ],
    {
      duration: 100,
      easing: 'ease',
    }
  );
}

export function animationAddRow(input) {
  input.animate([{ opacity: 0, height: 0 }, { opacity: 0.3 }, {}], {
    duration: 200,
    easing: 'ease-in-out',
  });
}

export function animationDeleteRow(input) {
  input.animate([{}, { opacity: 0.3 }, { opacity: 0, height: 0 }], {
    duration: 200,
    easing: 'ease-in-out',
  });
  const timerId = setInterval(() => {
    input.remove();
  }, 200);
}

export function animationPushButton(input) {
  input.animate([{}, { transform: 'scale(0.9)' }, {}], {
    duration: 200,
    easing: 'ease-in-out',
  });
}
