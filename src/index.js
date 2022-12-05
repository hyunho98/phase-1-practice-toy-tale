let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/toys')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for(const toy of data) {
        let card = createCard(toy);
        document.getElementById('toy-collection').append(createCard(toy));
        createButton(card.querySelector('button').id);
      }
    });
});

form = document.querySelector('.add-toy-form');
inputs = form.querySelectorAll('.input-text');
form.addEventListener('submit', (e) => {});

onsubmit = ((e) => {
  e.preventDefault();
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'name': `${inputs[0].value}`,
      'image': `${inputs[1].value}`,
      'likes': 0
    })
  })
  .then((response) => response.json())
  .then((data) => {
    const card = createCard(data);
    document.getElementById('toy-collection').append(card);
    createButton(card.querySelector('button').id)
  })
})

function createCard(toyObj) {
  const card = document.createElement('div');
  const h2 = document.createElement('h2');
  const img = document.createElement('img');
  const p = document.createElement('p');
  const button = document.createElement('button');
  card.className = 'card';
  h2.innerText = toyObj.name;
  img.src = toyObj.image;
  img.className = 'toy-avatar';
  p.innerText = `${toyObj.likes} Likes`;
  button.className = 'like-btn';
  button.id = toyObj.id;
  button.innerText = 'Like ❤️';
  card.append(h2, img, p, button);
  return card;
}


function createButton(id) {
  let button = document.getElementById(id);
  document.getElementById(id).addEventListener('click', (e) => {
        fetch(`http://localhost:3000/toys/${e.target.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            'likes': parseInt(button.parentNode.querySelector('p').innerText) + 1
          })
        })
        .then ((response) => response.json())
        .then ((data) => {
          document.getElementById(`${data.id}`).parentNode.querySelector('p').innerText = `${data.likes} Likes`;
        });
  })
}
