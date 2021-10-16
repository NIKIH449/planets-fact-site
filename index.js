const page = document.querySelector('.page')
const container = page.querySelector('.planet')
const buttonsPlanets = page.querySelectorAll('.header__menu-link')
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
showPlanet(0, '#419EBB')

function addPlanet(planet) {
  container.append(planet)
}

function removePlanet() {
  container.innerHTML = ''
}

function removeSurface() {
  this._planetPictureGeology.classList.remove('planet__picture_type_geology_active')
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

function activateElement(element, planetColor) {
  const buttonsInfo = document.querySelectorAll('.planet__button')
  buttonsInfo.forEach(button => {
    if (button.hasAttribute('style')) {
      button.style.background = 'none'
    }
  })
  element.style.background = planetColor
}

function activateMobileElement(element, planetColor) {
  const buttonsInfo = document.querySelectorAll('.planet__button-mobile-link')
  buttonsInfo.forEach(button => {
    if (button.hasAttribute('style')) {
      button.style.border = 'none'
    }
  })
  element.style.borderBottom  = `4px solid ${planetColor}`
}

function activatePlanetButton(button, color) {
  buttonsPlanets.forEach(button => {
    if (button.hasAttribute('style')) {
      button.style.border = "none"
    }
  })
  button.style.borderBottom = `4px solid ${color}`
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
    activateMobileElement(this._buttonMobileStructure, planetColor)
  })
  this._buttonStructure.addEventListener('click', () => {
    getStructureData(arr)
    activateElement(this._buttonStructure, planetColor)
  })
  this._buttonOverview.addEventListener('click', () => {
    getOverviewData(arr)
    activateElement(this._buttonOverview, planetColor)
  })
  this._buttonMobileOverview.addEventListener('click', () => {
    getOverviewData(arr)
    activateMobileElement(this._buttonMobileOverview, planetColor)
  })
  this._buttonSurface.addEventListener('click', () => {
    getSurfaceData(arr)
    activateElement(this._buttonSurface, planetColor)
  })
  this._buttonMobileSurface.addEventListener('click', () => {
    getSurfaceData(arr)
    activateMobileElement(this._buttonMobileSurface, planetColor)
  })
}

function showPlanet(arr, planetColor) {
  createPlanet(arr, planetColor)
}

buttonMenu.addEventListener('click', openMenu)

buttonMenuMercury.addEventListener('click', () => {
  showPlanet(0, '#419EBB')
  closeMenu()
})

buttonMercury.addEventListener('click', () => {
  showPlanet(0, '#419EBB')
  activatePlanetButton(buttonMercury, '#419EBB')
})

buttonMenuVenus.addEventListener('click', () => {
  showPlanet(1, '#EDA249')
  closeMenu()
})

buttonVenus.addEventListener('click', () => {
  showPlanet(1, '#EDA249')
  activatePlanetButton(buttonVenus, '#EDA249')
})

buttonMenuEarth.addEventListener('click', () => {
  showPlanet(2, '#6D2ED5')
  closeMenu()
})

buttonEarth.addEventListener('click', () => {
  showPlanet(2, '#6D2ED5')
  activatePlanetButton(buttonEarth, '#6D2ED5')
})

buttonMenuMars.addEventListener('click', () => {
  showPlanet(3, '#D14C32')
  closeMenu()
})

buttonMars.addEventListener('click', () => {
  showPlanet(3, '#D14C32')
  activatePlanetButton(buttonMars, '#D14C32')
})

buttonMenuJupiter.addEventListener('click', () => {
  showPlanet(4, '#D83A34')
  closeMenu()
})

buttonJupiter.addEventListener('click', () => {
  showPlanet(4, '#D83A34')
  activatePlanetButton(buttonJupiter, '#D83A34')
})

buttonMenuSaturn.addEventListener('click', () => {
  showPlanet(5, '#FCCB6B')
  closeMenu()
})

buttonSaturn.addEventListener('click', () => {
  showPlanet(5, '#FCCB6B')
  activatePlanetButton(buttonSaturn, '#FCCB6B')
})

buttonMenuUranus.addEventListener('click', () => {
  showPlanet(6, '#65F0D5')
  closeMenu()
})

buttonUranus.addEventListener('click', () => {
  showPlanet(6, '#65F0D5')
  activatePlanetButton(buttonUranus, '#65F0D5')
})

buttonMenuNeptune.addEventListener('click', () => {
  showPlanet(7, '#497EFA')
  closeMenu()
})

buttonNeptune.addEventListener('click', () => {
  showPlanet(7, '#497EFA')
  activatePlanetButton(buttonNeptune, '#497EFA')
})