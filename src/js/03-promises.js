import Notiflix from 'notiflix';

const refs = {
  firstDelay: document.querySelector('[name="delay"]'),
  stepDelay: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  submitBtn: document.querySelector('button'),
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay)
    })
  }

  const submitHandler = e => {
    e.preventDefault();
    if (!e.target.tagName === 'BUTTON') return;

    const {
      elements: { delay, step, amount },
    } = e.currentTarget

for (let i = 1; i <= amount.value; i++) {
  createPromise(i, delay.value)
  .then(({ position, delay}) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  })
  delay.value = parseInt(delay.value) + parseInt(step.value)
}
e.currentTarget.reset();
delay.value = '';
step.value = '';
amount.value = '';
}

const formEl = document.querySelector('.form')
formEl.addEventListener('submit', submitHandler);



// import Notiflix from 'notiflix';

// const refs = {
//   firstDelay: document.querySelector('[name="delay"]'),
//   stepDelay: document.querySelector('[name="step"]'),
//   amount: document.querySelector('[name="amount"]'),
//   submitBtn: document.querySelector('button'),
// }

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const shouldResolve = Math.random() > 0.3;
//       if (shouldResolve) {
//         resolve({ position, delay })
//       } else {
//         reject({ position, delay })
//       }
//     }, delay)
//     })
//   }

//   const submitHandler = e => {
//     e.preventDefault();
//     if (!e.target.tagName === 'BUTTON') return;

//     const {
//       elements: { delay, step, amount },
//     } = e.currentTarget

// for (let i = 1; i <= amount; i++) {
//   createPromise(i, firstDelay)
//   .then(({ position, delay}) => {
//     Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
//   })
//   .catch(({ position, delay }) => {
//     Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//   })
//   firstDelay += stepDelay
// }
// e.currentTarget.reset();
//   }

//   const formEl = document.querySelector('.form')
//   formEl.addEventListener('submit', submitHandler);