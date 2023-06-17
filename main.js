const usernameElement = document.getElementById('username');
const nameInput = document.getElementById('name');
const startButton = document.getElementById('startButton');
const getImageButton = document.getElementById('getImageButton');   
const welcomeSection = document.getElementById('welcome');
const mainContentSection = document.getElementById('mainContent');
const image = document.getElementById('image');

usernameElement.textContent = "введите имя пользователя";

startButton.addEventListener('click', () => {
  const username = nameInput.value;
  if (username) {
    welcomeSection.style.display = 'none';
    mainContentSection.style.display = 'block';
    usernameElement.textContent = username;
  }
});

async function getRandomCapybaraImage() {
    await fetch('https://api.capy.lol/v1/capybaras?random=true').then(response =>  response.json()).then(data => {
      const imageUrl = data.data[0].url;
  
      image.src = imageUrl;
      image.alt = 'Капибара';  
    }).catch(error => console.error('Error: ' + error))
  }
  
  getImageButton.addEventListener('click', () => {
    getRandomCapybaraImage();
  });