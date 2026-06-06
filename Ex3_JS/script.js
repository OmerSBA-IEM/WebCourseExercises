const characters = [
    {
        key: "m",
        name: "Mowgli",
        description: "The brave boy who grew up in the jungle",
        image: "images/mowgli.png",
        sound: "sounds/mowgli.mp3"
    },
    {
        key: "b",
        name: "Baloo",
        description: "The friendly bear who loves music and fun",
        image: "images/baloo.png",
        sound: "sounds/baloo.mp3"
    },
    {
        key: "g",
        name: "Bagheera",
        description: "The smart black panther who protects Mowgli",
        image: "images/bagheera.png",
        sound: "sounds/bagheera.mp3"
    },
    {
        key: "s",
        name: "Shere Khan",
        description: "The dangerous tiger of the jungle",
        image: "images/shere-khan.png",
        sound: "sounds/shere-khan.mp3"
    },
    {
        key: "k",
        name: "Kaa",
        description: "The snake with the hypnotic voice",
        image: "images/Kaa.png",
        sound: "sounds/kaa.mp3"
    },
    {
        key: "l",
        name: "King Louie",
        description: "The funny king of the monkeys",
        image: "images/king-louie.png",
        sound: "sounds/king-louie.mp3"
    },
    {
        key: "h",
        name: "Hathi",
        description: "The elephant who leads the jungle patrol",
        image: "images/hathi.png",
        sound: "sounds/hathi.mp3"
    },
    {
        key: "n",
        name: "Shanti",
        description: "The girl from the village who catches Mowgli's attention",
        image: "images/shanti.png",
        sound: "sounds/shanti.mp3"
    }
];

const charactersArea = document.getElementById("charactersArea");
const selectedCharacter = document.getElementById("selectedCharacter");
const selectedText = document.getElementById("selectedText");
const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const welcomePopup = document.getElementById("welcomePopup");
const welcomeButton = document.getElementById("welcomeButton");

let currentSound = null;

function createCharacters() {
    for (const character of characters) {
        const card = document.createElement("div");

        card.classList.add("character-card");

        /*
            Element I chose that we did not learn in class: dataset.
            dataset lets me save custom information on each character,
            such as the keyboard key and sound file.
        */
        card.dataset.key = character.key;
        card.dataset.name = character.name;
        card.dataset.sound = character.sound;

        card.innerHTML = `
            <div class="key-badge">${character.key.toUpperCase()}</div>
            <img src="${character.image}" alt="${character.name}">
            <h3>${character.name}</h3>
            <p>${character.description}</p>
        `;

        card.addEventListener("click", function () {
            activateCharacter(character.key);
        });

        charactersArea.appendChild(card);
    }
}

function activateCharacter(key) {
    const character = findCharacterByKey(key);

    if (character === undefined) {
        return;
    }

    stopAllSounds();
    removeActiveClass();

    const selectedCard = document.querySelector(`[data-key="${key}"]`);

    selectedCard.classList.add("active");

    selectedCharacter.innerHTML = character.name;

    selectedText.innerHTML =
        "You chose " + character.name +
        ". Keyboard key: " + character.key.toUpperCase();

    playSound(character.sound);

    setTimeout(function () {
        selectedCard.classList.remove("active");
    }, 900);
}

function findCharacterByKey(key) {
    for (const character of characters) {
        if (character.key === key) {
            return character;
        }
    }

    return undefined;
}

function playSound(soundPath) {
    currentSound = new Audio(soundPath);
    currentSound.currentTime = 0;
    currentSound.play();
}

function stopAllSounds() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

    if (currentSound !== null) {
        currentSound.pause();
        currentSound.currentTime = 0;
    }

    updateMusicButton();
}

function updateMusicButton() {
    if (backgroundMusic.paused) {
        musicButton.innerHTML = "Start Jungle Music";
        musicButton.disabled = false;
    } else {
        musicButton.innerHTML = "Jungle Music Is On";
        musicButton.disabled = true;
    }
}

function removeActiveClass() {
    const allCards = document.querySelectorAll(".character-card");

    for (const card of allCards) {
        card.classList.remove("active");
    }
}

document.addEventListener("keydown", function (event) {
    const pressedKey = event.key.toLowerCase();
    activateCharacter(pressedKey);
});

musicButton.addEventListener("click", function () {
    stopAllSounds();

    backgroundMusic.volume = 0.3;
    backgroundMusic.currentTime = 0;

    backgroundMusic.play()
        .then(function () {
            updateMusicButton();
        })
        .catch(function () {
            updateMusicButton();
            console.log("The browser blocked the background music.");
        });
});

window.addEventListener("load", function () {
    createCharacters();

    backgroundMusic.volume = 0.3;
    
    backgroundMusic.play()
        .then(function () {
            updateMusicButton();
        })
        .catch(function () {
            updateMusicButton();
            console.log("The browser blocked automatic background music.");
        });
});

welcomeButton.addEventListener("click", function () {
    welcomePopup.style.display = "none";
});

backgroundMusic.addEventListener("play", function () {
    updateMusicButton();
});

backgroundMusic.addEventListener("pause", function () {
    updateMusicButton();
});

backgroundMusic.addEventListener("ended", function () {
    updateMusicButton();
});