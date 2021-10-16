const page = document.querySelector('.page')
const container = page.querySelector('.planet')
const buttonsPlanets = page.querySelectorAll('.header__menu-link')
const buttonsInfo = page.querySelectorAll('.planet__button')
const buttonVenus = page.querySelector('.header__menu-link_type_venus')
const buttonMenuVenus = page.querySelector('.popup__item_type_venus')
const buttonMercury = page.querySelector('.header__menu-link_type_mercury')
const buttonMenuMercury = page.querySelector('.popup__item_type_mercury')
const buttonEarth = page.querySelector('.header__menu-link_type_earth')
const buttonMenuEarth = page.querySelector('.popup__item_type_earth')
const buttonMars = page.querySelector('.header__menu-link_type_mars')
const buttonMenuMars = page.querySelector('.popup__item_type_mars')
const buttonJupiter = page.querySelector('.header__menu-link_type_jupiter')
const buttonMenuJupiter = page.querySelector('.popup__item_type_jupiter')
const buttonSaturn = page.querySelector('.header__menu-link_type_saturn')
const buttonMenuSaturn = page.querySelector('.popup__item_type_saturn')
const buttonUranus = page.querySelector('.header__menu-link_type_uranus')
const buttonMenuUranus = page.querySelector('.popup__item_type_uranus')
const buttonNeptune = page.querySelector('.header__menu-link_type_neptune')
const buttonMenuNeptune = page.querySelector('.popup__item_type_neptune')
const buttonMenu = page.querySelector('.header__button-menu')
const popup = page.querySelector('.popup')

function getServerData() {
  return fetch ('./data.json', {
    method: 'GET',
  })
  .then((res) => {
    if(res.ok) {
      return res.json()
    }
    else {
      return Promise.reject(res.status)
    }
  })
}

function getTemplate() {
  const planet = document.querySelector('.planet__template').content.querySelector('.planet__box').cloneNode(true);
  return planet;
};

function generatePlanet() {
  this._planet = getTemplate()
  this._planetPicture = this._planet.querySelector('.planet__picture')
  this._planetPictureStructure = this._planet.querySelector('.planet__picture_type_structure')
  this._planetPictureGeology = this._planet.querySelector('.planet__picture_type_geology')
  this._planetName = this._planet.querySelector('.planet__name')
  this._planetDescription = this._planet.querySelector('.planet__description')
  this._planetLink = this._planet.querySelector('.planet__link')
  this._planetRotationValue = this._planet.querySelector('.planet__fact-name_type_rotation-value')
  this._planetRevolutionValue = this._planet.querySelector('.planet__fact-name_type_revolution-value')
  this._planetRadiusValue = this._planet.querySelector('.planet__fact-name_type_radius-value')
  this._planetTempValue = this._planet.querySelector('.planet__fact-name_type_temp-value')
  this._buttonOverview = this._planet.querySelector('.planet__button_type_overview')
  this._buttonStructure = this._planet.querySelector('.planet__button_type_structure')
  this._buttonSurface = this._planet.querySelector('.planet__button_type_surface')
  this._buttonMobileOverview = this._planet.querySelector('.planet__button-mobile-link_type_overview')
  this._buttonMobileStructure = this._planet.querySelector('.planet__button-mobile-link_type_structure')
  this._buttonMobileSurface = this._planet.querySelector('.planet__button-mobile-link_type_surface')
  this._buttonsInfoMobile = this._planet.querySelectorAll('.planet__button-mobile-link')
  this._buttonsInfo = this._planet.querySelectorAll('.planet__button')
  return this._planet
}

function createPlanet(arr, planetColor) {
  getServerData()
  .then(data => {
    const planet = generatePlanet()
    this._buttonOverview.style.background = planetColor;
    this._buttonMobileOverview.style.borderBottom = `4px solid ${planetColor}`
    this._planetName.textContent = data[arr].name.toUpperCase(),
    this._planetPictureStructure.src = data[arr].images.internal,
    this._planetPicture.src = data[arr].images.planet,
    this._planetPicture.alt = data[arr].name,
    this._planetPictureGeology.src = data[arr].images.geology,
    this._planetPictureGeology.alt = data[arr].name,
    this._planetDescription.textContent = data[arr].overview.content,
    this._planetLink.href = data[arr].overview.source,
    this._planetRotationValue.textContent = data[arr].rotation,
    this._planetRevolutionValue.textContent = data[arr].revolution,
    this._planetRadiusValue.textContent = data[arr].radius,
    this._planetTempValue.textContent = data[arr].temperature
    setEventListeners(arr, planetColor)
    removePlanet()
    addPlanet(planet)
  })
  .catch((err) => {
    console.log(`Error: ${err}`)
  })
}
createPlanet(0, '#419EBB')

function addPlanet(planet) {
  container.prepend(planet)
}

function removePlanet() {
  container.innerHTML = ''
}

function removeSurface() {
  if (this._planetPictureGeology.classList.contains('planet__picture_type_geology_active')) {
  this._planetPictureGeology.classList.remove('planet__picture_type_geology_active')
  }
}

function openMenu() {
  popup.classList.add('popup_opened')
  buttonMenu.classList.add('header__button-menu_disabled')
  buttonMenu.addEventListener('click', closeMenu);
}

function closeMenu() {
  popup.classList.remove('popup_opened')
  buttonMenu.classList.remove('header__button-menu_disabled')
  buttonMenu.removeEventListener('click', closeMenu);
}


function deactivateButtonElement(buttons) {
  buttons.forEach(button => {
    if (button.tagName == 'A') {
      button.style.border = 'none'
    } else {
      button.style.background = 'none'
    }
  })
}

function activateButtonElement(element, planetColor, buttons) {
  deactivateButtonElement(buttons)
  buttons.forEach(button => {
    if (button.tagName == 'A') {
      element.style.borderBottom  = `4px solid ${planetColor}`
    } else {
      element.style.background = `${planetColor}`
    }
  })
}

function getStructureData(arr) {
  getServerData()
  .then(data => {
    removeSurface()
    this._planetDescription.textContent = data[arr].structure.content,
    this._planetPictureStructure.src = data[arr].images.internal,
    this._planetLink.href = data[arr].structure.source
  })
  .catch((err) => {
    console.log(`Error: ${err}`)
  })
}

function getOverviewData(arr) {
  getServerData()
    .then(data => {
      removeSurface()
      this._planetDescription.textContent = data[arr].overview.content,
      this._planetPicture.src = data[arr].images.planet,
      this._planetLink.href = data[arr].overview.source
    })
    .catch((err) => {
      console.log(`Error: ${err}`)
    })
}

function getSurfaceData(arr) {
  getServerData()
  .then(data => {
    this._planetDescription.textContent = data[arr].geology.content,
    this._planetPictureGeology.classList.add('planet__picture_type_geology_active')
    this._planetLink.href = data[arr].geology.source
  })
  .catch((err) => {
    console.log(`Error: ${err}`)
  })
}

function setEventListeners(arr, planetColor) {
  this._buttonMobileStructure.addEventListener('click', () => {
    getStructureData(arr)
    activateButtonElement(this._buttonMobileStructure, planetColor, this._buttonsInfoMobile)
  })
  this._buttonStructure.addEventListener('click', () => {
    getStructureData(arr)
    activateButtonElement(this._buttonStructure, planetColor, this._buttonsInfo)
  })
  this._buttonOverview.addEventListener('click', () => {
    getOverviewData(arr)
    activateButtonElement(this._buttonOverview, planetColor, this._buttonsInfo)
  })
  this._buttonMobileOverview.addEventListener('click', () => {
    getOverviewData(arr)
    activateButtonElement(this._buttonMobileOverview, planetColor, this._buttonsInfoMobile)
  })
  this._buttonSurface.addEventListener('click', () => {
    getSurfaceData(arr)
    activateButtonElement(this._buttonSurface, planetColor, this._buttonsInfo)
  })
  this._buttonMobileSurface.addEventListener('click', () => {
    getSurfaceData(arr)
    activateButtonElement(this._buttonMobileSurface, planetColor, this._buttonsInfoMobile)
  })
}

buttonMenu.addEventListener('click', openMenu)

buttonMenuMercury.addEventListener('click', () => {
  createPlanet(0, '#419EBB')
})

buttonMercury.addEventListener('click', () => {
  createPlanet(0, '#419EBB')
  activateButtonElement(buttonMercury, '#419EBB', buttonsPlanets)
})

buttonMenuVenus.addEventListener('click', () => {
  createPlanet(1, '#EDA249')
})

buttonVenus.addEventListener('click', () => {
  createPlanet(1, '#EDA249')
  activateButtonElement(buttonVenus, '#EDA249', buttonsPlanets)
})

buttonMenuEarth.addEventListener('click', () => {
  createPlanet(2, '#6D2ED5')
})

buttonEarth.addEventListener('click', () => {
  createPlanet(2, '#6D2ED5')
  activateButtonElement(buttonEarth, '#6D2ED5', buttonsPlanets)
})

buttonMenuMars.addEventListener('click', () => {
  createPlanet(3, '#D14C32')
})

buttonMars.addEventListener('click', () => {
  createPlanet(3, '#D14C32')
  activateButtonElement(buttonMars, '#D14C32', buttonsPlanets)
})

buttonMenuJupiter.addEventListener('click', () => {
  createPlanet(4, '#D83A34')
})

buttonJupiter.addEventListener('click', () => {
  createPlanet(4, '#D83A34')
  activateButtonElement(buttonJupiter, '#D83A34', buttonsPlanets)
})

buttonMenuSaturn.addEventListener('click', () => {
  createPlanet(5, '#FCCB6B')
})

buttonSaturn.addEventListener('click', () => {
  createPlanet(5, '#FCCB6B')
  activateButtonElement(buttonSaturn, '#FCCB6B', buttonsPlanets)
})

buttonMenuUranus.addEventListener('click', () => {
  createPlanet(6, '#65F0D5')
})

buttonUranus.addEventListener('click', () => {
  createPlanet(6, '#65F0D5')
  activateButtonElement(buttonUranus, '#65F0D5', buttonsPlanets)
})

buttonMenuNeptune.addEventListener('click', () => {
  createPlanet(7, '#497EFA')
})

buttonNeptune.addEventListener('click', () => {
  createPlanet(7, '#497EFA')
  activateButtonElement(buttonNeptune, '#497EFA', buttonsPlanets)
})

popup.addEventListener('click', closeMenu)