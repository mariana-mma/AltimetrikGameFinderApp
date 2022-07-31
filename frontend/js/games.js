const cardsSection = document.getElementById("cardsContainer");
const base_url = 'https://rawg.io/api';
const api_key = 'be591b53b20846a1badbf93b73218da7';
const searchBar = document.getElementById("search-input");
const searchResults = document.getElementById("results");
const crossCircle = document.getElementById("cancel-search");
let searchData = [];
let searchTimeout = null;

// Call game API with fetch
const api_url = `${base_url}/games?key=${api_key}`;


const getGames = async() => {
    const response = await fetch(api_url);
    if (response.status !==200){
        throw new Error('Cannot fetch the data');
    }
    const data = await response.json();
    let info = data.results;
    return info;
};

getGames()
    .then(
        data => {getGamesInfo(data)
        .then(response => createCard(response))})
    .catch(err =>  alert( err.message ));


function getGamesInfo(gameInfo) {
    const promises = [];
    for (let index = 0; index < gameInfo.length; index++) {
        const gameId = gameInfo[index].id;
    
        const games = fetch(
        `${base_url}/games/${gameId}?key=${api_key}`
        )
        .then((res) => res.json())
        .then((data) => {
            const completeGameData = Object.assign(gameInfo[index], data);
            return completeGameData;
        });
        promises.push(games);
    }
    return Promise.all(promises);
};

// Card components
function renderGenres(genres){
    let genreList = "";
    for (let i=0; i < genres.length; i++){
        let genre = genres[i];
        let genreName = genre.name;
        if(i===(genres.length-1)){
            genreList+= genreName;
        }
        else{   
            genreList+= `${genreName}, `;
        }
    }
    return genreList;
};


function createCard(game) {

    game.forEach(game => {
        cardsSection.innerHTML += `
    <div id="gamesCard" class="gameCard">
        <img src=${game.background_image} alt="This is a visual representation of ${game.name}">
        <div class="heartButton">
            <button>${heartSvg}</button>
        </div>
        <article id="aCard">
            <div id="gameTitle" class="cardTitle">
                <h3>${game.name}</h3>
                <h5>#</h5>
            </div>
            <div id="gameInfo" class="cardInfo">
                <div class="shortText">
                    <p><span>Release date:</span>${game.released}</p>
                    <p><span>Genres:</span> ${renderGenres(game.genres)}</p>
                </div>
                <div>
                    ${platformGame(game.parent_platforms)}
                </div>
            </div>
            <div id="gameDescription" class="cardDescription hidden">${game.description}
            </div>
        </article>
    </div>
    `;
    })
    };

function platformGame(parent_platforms) {
    let platformList = "";
    
    for (let i=0; i < parent_platforms.length; i++){
        let platform = parent_platforms[i].platform;
    
        let platformName = platform.name;
        switch(platformName){
            case 'PC':
                platformList += pcSvg;
                break;
            case 'PlayStation':
                platformList += playSvg;
                break;
            case 'Xbox':
                platformList += xboxSvg;
                break;
            case 'Nintendo':
                platformList += nintendoSvg;
                break;
        }
    }
    return platformList;
};

var heartSvg = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_912_1831)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.333 9.33342C10.4797 9.33342 8.99967 10.8174 8.99967 12.6228C8.99967 14.6548 10.1757 16.8228 11.9943 18.9468C13.5223 20.7294 15.3783 22.3374 16.9997 23.6348C18.621 22.3374 20.477 20.7281 22.005 18.9468C23.8237 16.8228 24.9997 14.6534 24.9997 12.6228C24.9997 10.8174 23.5197 9.33342 21.6663 9.33342C19.813 9.33342 18.333 10.8174 18.333 12.6228C18.333 12.9764 18.1925 13.3155 17.9425 13.5656C17.6924 13.8156 17.3533 13.9561 16.9997 13.9561C16.6461 13.9561 16.3069 13.8156 16.0569 13.5656C15.8068 13.3155 15.6663 12.9764 15.6663 12.6228C15.6663 10.8174 14.1863 9.33342 12.333 9.33342ZM16.9997 8.87875C16.4351 8.18642 15.7233 7.62865 14.916 7.24601C14.1088 6.86337 13.2264 6.66549 12.333 6.66675C9.03167 6.66675 6.33301 9.32009 6.33301 12.6228C6.33301 15.6241 8.02234 18.4094 9.96901 20.6814C11.9437 22.9868 14.365 24.9721 16.181 26.3854C16.4151 26.5675 16.7031 26.6663 16.9997 26.6663C17.2962 26.6663 17.5843 26.5675 17.8183 26.3854C19.6343 24.9721 22.0557 22.9854 24.0303 20.6814C25.977 18.4094 27.6663 15.6241 27.6663 12.6228C27.6663 9.32009 24.9677 6.66675 21.6663 6.66675C19.7863 6.66675 18.101 7.52809 16.9997 8.87875Z" fill="white"/>
</g>
<defs>
<filter id="filter0_d_912_1831" x="-5" y="-6" width="44" height="43.9985" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="3"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_912_1831"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_912_1831" result="shape"/>
</filter>
</defs>
</svg>`;

var playSvg = `<svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.55164 9.53674e-06L9.55164 18.2774L13.3604 19.5885L13.3604 4.26319C13.3604 3.54103 13.6567 3.06155 14.132 3.22645C14.7534 3.41372 14.8742 4.07895 14.8742 4.79307L14.8742 10.9138C17.2449 12.1606 19.1114 10.9131 19.1114 7.62345C19.1114 4.26188 18.0171 2.76435 14.7972 1.56033C13.5271 1.10084 11.1734 0.325457 9.55164 9.53674e-06Z" fill="#FFFFFF"/>
<path d="M14.3503 16.9129L20.1076 14.3203C20.7589 14.0148 20.8585 13.5998 20.3314 13.3817C19.796 13.1596 18.8404 13.2232 18.1821 13.5222L14.3503 15.2325V12.5036L14.5698 12.412C14.5698 12.412 15.6789 11.9148 17.239 11.7008C18.796 11.4848 20.7055 11.7289 22.2063 12.4446C23.8969 13.1241 24.0864 14.1153 23.6587 14.8051C23.2247 15.4877 22.1726 15.9815 22.1726 15.9815L14.3503 19.5367" fill="#FFFFFF"/>
<path d="M1.7099 17.2146C-0.0868735 16.6444 -0.386499 15.4395 0.433179 14.7435C1.18926 14.1079 2.47691 13.6295 2.47691 13.6295L7.79974 11.4675V13.9281L3.97289 15.4908C3.29503 15.767 3.1934 16.1557 3.73939 16.359C4.29514 16.5706 5.28141 16.5137 5.95966 16.2286L7.79974 15.4728V17.6695C7.68114 17.6921 7.54927 17.715 7.42892 17.7384C5.5943 18.0852 3.63971 17.9428 1.7099 17.2146Z" fill="#FFFFFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.7661 19.4589C23.6149 19.6145 23.4164 19.7024 23.2027 19.7024C22.989 19.7024 22.784 19.6145 22.6326 19.4589C22.4831 19.3005 22.4004 19.0936 22.4004 18.8706C22.4004 18.4089 22.7591 18.0357 23.2027 18.0357C23.4164 18.0357 23.6149 18.1208 23.7661 18.2798C23.9156 18.4352 24 18.6456 24 18.8706C24 19.0936 23.9156 19.3005 23.7661 19.4589ZM22.5352 18.8707C22.5352 18.6808 22.6033 18.5067 22.7279 18.3776C22.8555 18.2458 23.0258 18.1747 23.2027 18.1747C23.3798 18.1747 23.5458 18.2458 23.6703 18.3776C23.7959 18.5067 23.8638 18.6808 23.8638 18.8707C23.8638 19.2511 23.567 19.5599 23.2027 19.5599C23.0258 19.5599 22.8555 19.4896 22.7279 19.3594C22.6033 19.2281 22.5352 19.0558 22.5352 18.8707ZM23.5677 19.2169C23.5748 19.2384 23.5835 19.2511 23.5958 19.2548L23.607 19.2614V19.3143H23.4334L23.4302 19.3036L23.4184 19.2717C23.4164 19.2548 23.4141 19.2328 23.4117 19.1957L23.404 19.0508C23.402 18.9993 23.3859 18.9694 23.3561 18.9496C23.334 18.9419 23.3039 18.9359 23.259 18.9359H23.018V19.3143H22.8599V18.3849H23.2745C23.3421 18.3849 23.399 18.3975 23.4426 18.4167C23.53 18.4596 23.5748 18.5368 23.5748 18.6455C23.5748 18.6988 23.5621 18.7487 23.5402 18.7856C23.5212 18.8116 23.4988 18.8353 23.4744 18.8585L23.4809 18.8633C23.4974 18.8754 23.5138 18.8874 23.5235 18.9051C23.5456 18.9305 23.5556 18.9731 23.5574 19.028L23.5614 19.1463C23.5621 19.1766 23.5644 19.2002 23.5677 19.2169ZM23.3807 18.7599C23.4063 18.7427 23.4184 18.7085 23.4184 18.6561C23.4184 18.6009 23.4001 18.5641 23.3642 18.5458C23.3421 18.5368 23.3146 18.5303 23.2779 18.5303H23.018V18.7914H23.2635C23.3123 18.7914 23.3511 18.7809 23.3807 18.7599Z" fill="#FFFFFF"/>
</svg>`;

var xboxSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C11.9286 0 13.5238 0.616246 14.9762 1.65266C15 1.65266 15 1.68067 15 1.70868C15 1.73669 14.9762 1.73669 14.9524 1.73669C13.0952 1.2605 10.2857 3.13725 10.0238 3.33333H10H9.97619C9.71429 3.13725 6.90476 1.2605 5.04762 1.73669C5.02381 1.73669 5 1.73669 5 1.70868C5 1.68067 5 1.65266 5.02381 1.65266C6.47619 0.616246 8.07143 0 10 0ZM16.3903 17.5988C17.8903 16.0464 12.9308 10.5648 10.0035 8.33333C10.0035 8.33333 9.97935 8.33333 9.97935 8.35759C7.07626 10.5648 2.09261 16.0464 3.61674 17.5988C5.31021 19.1026 7.56011 20 10.0035 20C12.447 20 14.6727 19.1026 16.3903 17.5988ZM2.73973 3.38078C2.72831 3.38078 2.7226 3.38705 2.7169 3.39332C2.71119 3.39959 2.70548 3.40585 2.69406 3.40585C1.0274 5.2358 0 7.76763 0 10.5501C0 12.8313 0.707763 14.9621 1.87215 16.6416C1.87215 16.6667 1.89498 16.6667 1.91781 16.6667C1.94064 16.6667 1.94064 16.6416 1.91781 16.6165C1.21005 14.2351 4.79452 8.4946 6.64384 6.0881L6.66667 6.06303C6.66667 6.03796 6.66667 6.03796 6.64384 6.03796C3.83562 2.9797 2.89954 3.30558 2.73973 3.38078ZM13.3333 6.05268L13.3562 6.02759C16.1644 2.99144 17.1005 3.31764 17.2374 3.36782C17.2469 3.36782 17.2525 3.36782 17.2574 3.36962C17.2642 3.37215 17.2698 3.37825 17.2831 3.39291C18.9726 5.22464 20 7.75895 20 10.5442C20 12.8276 19.2922 14.9604 18.1279 16.6416C18.1279 16.6667 18.105 16.6667 18.0822 16.6667V16.6165C18.7671 14.2327 15.2055 8.48662 13.3562 6.07777C13.3333 6.07777 13.3333 6.05268 13.3333 6.05268Z" fill="#FFFFFF"/>
</svg>`;

var nintendoSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.8608 24H14.1696C14.0755 24 14.0001 23.9245 14.0001 23.8302V0.150943C14.0001 0.0754717 14.0566 0 14.1508 0H17.8608C21.2506 0 24.0001 2.75472 24.0001 6.15094V17.8491C24.0001 21.2453 21.2506 24 17.8608 24ZM21.1564 13.2076C21.1564 11.8679 20.0641 10.7736 18.727 10.7736C17.3899 10.7736 16.3165 11.8679 16.2976 13.2076C16.2976 14.5472 17.3899 15.6415 18.727 15.6415C20.0641 15.6415 21.1564 14.5472 21.1564 13.2076Z" fill="#FFFFFF"/>
<path d="M3.99988 8C3.99988 9.1 4.89988 10 5.99988 10C7.09988 10 7.99988 9.1 7.99988 8C7.99988 6.9 7.09988 6 5.99988 6C4.88321 6 3.99988 6.88333 3.99988 8Z" fill="#FFFFFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.38173 0H11.8238C11.9217 0 12 0.0754717 12 0.169811V23.8302C12 23.9245 11.9217 24 11.8238 24H6.38173C2.85807 24 0 21.2453 0 17.8491V6.15094C0 2.75472 2.85807 0 6.38173 0ZM6.38169 22.0755H10.0032V1.92458H6.38169C5.20714 1.92458 4.11089 2.37741 3.2887 3.16986C2.44694 3.96232 1.99669 5.01892 1.99669 6.15099V17.8491C1.99669 18.9812 2.46652 20.0378 3.2887 20.8302C4.11089 21.6416 5.20714 22.0755 6.38169 22.0755Z" fill="#FFFFFF"/>
</svg>`;

var pcSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 9.16667H9.16667V1.53647L20 0V9.16667ZM8.33333 1.66667V9.16667H0V2.77865L8.33333 1.66667ZM8.33333 10H0V17.0992L8.33333 18.3333V10ZM9.16667 18.3262V10H20V20L9.16667 18.3262Z" fill="#FFFFFF"/>
</svg>`;

// Set to one or three columns

function oneColumn(){
    const cardsSection = document.getElementById("cardsContainer");
    const showDescription = document.querySelectorAll("#gameDescription");
    const descriptArr = Array.from(showDescription);

    cardsSection.classList.remove("cards-container");
    cardsSection.classList.add("cards-container--oneColumn");

    for (let i=0; i < descriptArr.length; i++) {
        let eachDescript = descriptArr[i];
        eachDescript.classList.remove("hidden");
    }
};

function threeColumns(){
    const cardsSection = document.getElementById("cardsContainer");
    const showDescription = document.querySelectorAll("#gameDescription");
    const descriptArr = Array.from(showDescription);

    cardsSection.classList.remove("cards-container--oneColumn");
    cardsSection.classList.add("cards-container");

    for (let i=0; i < descriptArr.length; i++) {
        let eachDescript = descriptArr[i];
        eachDescript.classList.add("hidden");
    }
};

// Change button colors

const btnThreeColumn = document.querySelector('#three-display');
const btnOneColumn = document.querySelector('#one-display');

btnThreeColumn.addEventListener('click', function() {

    if (btnOneColumn.classList.contains('btnColorOn')){
        btnOneColumn.classList.remove('btnColorOn')
    }
    this.classList.remove('btnColorOff');
});

btnOneColumn.addEventListener('click', function() {

    if (!btnThreeColumn.classList.contains('btnColorOff')){
        btnThreeColumn.classList.add('btnColorOff')
    }
    this.classList.toggle('btnColorOn');
});

// Search functionality
searchBar.oninput = function (e) {
    const searchGame = e.target.value.toLowerCase();

    if (searchGame.length > 0) {
        if(searchTimeout != null){
            clearTimeout(searchTimeout)
        }
        searchTimeout = setTimeout(() => {
            let resultsArr = [];
            requestGame(searchGame);
        
            resultsArr = searchData.filter((game) => {
                return (game.name.toLowerCase().startsWith(searchGame.toLowerCase()) ||
                game.parent_platforms.some((gamePlatform) => gamePlatform.platform.name.startsWith(searchGame.toLowerCase()))
                )
            });
            resultsArr = resultsArr.map((game)=>{
                return game = `<li>${game.name}</li>`;
            });
            searchResults.classList.remove('hidden');
            crossCircle.classList.remove('hidden');
            showSuggestions(resultsArr);
        }, 1000);
        
    } else {
        searchResults.classList.add('hidden');
    }
};

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = searchBar.value;
        listData = `<li>${userValue}</li>`;
    }else{
        listData = list.join('');
    }
    searchResults.innerHTML = listData;
};

// when clicking an <li> it completes the input text
searchResults.onclick = function (e) {
    const setValue = e.target.innerText;
    searchBar.value = setValue;
    this.innerHTML = '';
};

// when pressing enter the games appear
searchBar.addEventListener('keyup', (e) => {
    const searchGame = e.target.value.toLowerCase();
    if(e.code === 'Enter'){
        cardsSection.innerHTML = '';
        searchResults.innerHTML = '';
        crossCircle.classList.add('hidden');
        requestGame(searchGame);
        const filteredGames = searchData.filter((game) => {
            return (
                game.name.toString().toLowerCase().includes(searchGame) ||
                game.parent_platforms.some((gamePlatform) => gamePlatform.platform.name.toLowerCase().includes(searchGame))
            );
        });
        createCard(filteredGames);
    }
});

function requestGame(searchGame) {
    const searchUrl = `${base_url}/games?key=${api_key}&search=${searchGame}`;
    
    fetch(searchUrl)
    .then (response => {
        if (response.status !==200){
            throw new Error('Cannot fetch the data');
        } else {
            return response.json();
        }
    })
    .then(data => {getGamesInfo(data.results)
        .then(response => {
            searchData = response;
    });
    })
    .catch(error => alert(error.message));
};