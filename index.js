const page = document.querySelector('.page')
const container = page.querySelector('.planet')
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
  this._planetButton = this._planet.querySelector('.planet__button')
  this._buttonMobileOverview = this._planet.querySelector('.planet__button-mobile-link_type_overview')
  this._buttonMobileStructure = this._planet.querySelector('.planet__button-mobile-link_type_structure')
  this._buttonMobileSurface = this._planet.querySelector('.planet__button-mobile-link_type_surface')
  return this._planet
}

function createPlanet(arr) {
  getServerData()
  .then(data => {
    const planet = generatePlanet()
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
    setEventListeners(arr)
    removePlanet()
    addPlanet(planet)
  })
  .catch((err) => {
    console.log(`Error: ${err}`)
  })
}
createPlanet(0)

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

function activateElement(element, elementActive) {
  document.querySelector(`.${elementActive}`).classList.remove(elementActive)
  document.querySelector(element).classList.add(elementActive)
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

function setEventListeners(arr) {
  this._buttonMobileStructure.addEventListener('click', () => {
    getStructureData(arr)
    activateElement('.planet__button-mobile-link_type_structure', 'planet__button-mobile-link_active')
  })
  this._buttonStructure.addEventListener('click', () => {
    getStructureData(arr)
    activateElement('.planet__button_type_structure', 'planet__button_active')
  })
  this._buttonOverview.addEventListener('click', () => {
    getOverviewData(arr)
    activateElement('.planet__button_type_overview', 'planet__button_active')
  })
  this._buttonMobileOverview.addEventListener('click', () => {
    getOverviewData(arr)
    activateElement('.planet__button-mobile-link_type_overview', 'planet__button-mobile-link_active')
  })
  this._buttonSurface.addEventListener('click', () => {
    getSurfaceData(arr)
    activateElement('.planet__button_type_surface', 'planet__button_active')
  })
  this._buttonMobileSurface.addEventListener('click', () => {
    getSurfaceData(arr)
    activateElement('.planet__button-mobile-link_type_surface', 'planet__button-mobile-link_active')
  })
}

function showPlanet(arr, planet) {
  createPlanet(arr)
  activateElement(`.header__menu-link_type_${planet}`, 'header__menu-link_active')
}

buttonMenu.addEventListener('click', openMenu)

buttonMenuMercury.addEventListener('click', () => {
  showPlanet(0, 'mercury')
  closeMenu()
})

buttonMercury.addEventListener('click', () => {
  showPlanet(0, 'mercury')
})

buttonMenuVenus.addEventListener('click', () => {
  showPlanet(1, 'venus')
  closeMenu()
})

buttonVenus.addEventListener('click', () => {
  showPlanet(1, 'venus')
})

buttonMenuEarth.addEventListener('click', () => {
  showPlanet(2, 'earth')
  closeMenu()
})

buttonEarth.addEventListener('click', () => {
  showPlanet(2, 'earth')
})

buttonMenuMars.addEventListener('click', () => {
  showPlanet(3, 'mars')
  closeMenu()
})

buttonMars.addEventListener('click', () => {
  showPlanet(3, 'mars')
})

buttonMenuJupiter.addEventListener('click', () => {
  showPlanet(4, 'jupiter')
  closeMenu()
})

buttonJupiter.addEventListener('click', () => {
  showPlanet(4, 'jupiter')
})

buttonMenuSaturn.addEventListener('click', () => {
  showPlanet(5, 'saturn')
  closeMenu()
})

buttonSaturn.addEventListener('click', () => {
  showPlanet(5, 'saturn')
})

buttonMenuUranus.addEventListener('click', () => {
  showPlanet(6, 'uranus')
  closeMenu()
})

buttonUranus.addEventListener('click', () => {
  showPlanet(6, 'uranus')
})

buttonMenuNeptune.addEventListener('click', () => {
  showPlanet(7, 'neptune')
  closeMenu()
})

buttonNeptune.addEventListener('click', () => {
  showPlanet(7, 'neptune')
})
