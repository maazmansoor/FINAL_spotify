// Spotify API credentials
const clientId = "b180920d0d0f411b98bfdeedab00615a";
const clientSecret = "4292c7c09db34ad99b169c3d86ff2196";

// Spotify API endpoints
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const featuredPlaylistsEndpoint =
    "https://api.spotify.com/v1/browse/featured-playlists";
const categoryPlaylistsEndpoint =
    "https://api.spotify.com/v1/browse/categories/{category_id}/playlists";

// Function to get access token




async function getAccessToken() {
    const response = await fetch(tokenEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: "grant_type=client_credentials",
    });

    const data = await response.json();
    return data.access_token;
}

async function getPlaylists(filter, countryCode) {
    try {
        const accessToken = await getAccessToken();
        let response;

        if (filter === "featured") {
            if (countryCode) {
                response = await fetch(
                    featuredPlaylistsEndpoint + `?country=${countryCode}`,
                    {
                        headers: {
                            Authorization: "Bearer " + accessToken,
                        },
                    }
                );
            } else {
                response = await fetch(featuredPlaylistsEndpoint, {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                });
            }
                } else {
                    if (countryCode){
            const categoryId = filter;
            response = await fetch(
                categoryPlaylistsEndpoint.replace("{category_id}", categoryId) +
                `?country=${countryCode}`,
                {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                }
            )} else {const categoryId = filter;
                response = await fetch(
                    categoryPlaylistsEndpoint.replace("{category_id}", categoryId),
                    {
                        headers: {
                            Authorization: "Bearer " + accessToken,
                        },
                    }
                )};
        }

        const data = await response.json();
  

        return data.playlists.items;
    } catch (error) {
        return "error";
    }
}
function handleContainerDisplay(playlists, containerId) {
    const container = document.getElementById(containerId);
    if (playlists === "error") {
        container.style.display = 'none';
    } else {
        container.style.display = 'block';
    }
}
function displayPlaylists(playlists, country, containerId) {
    if (playlists === "error") {
        return;
    }
    else {
        try {
    const playlistsHtml = playlists
        .map((playlist) => {
            return `<div class="swiper-slide p-1">
        <div class="rounded-lg"> 
        <a href="${playlist.external_urls.spotify}">
          <img alt="${playlist.name}" class="h-full w-full" src="${playlist.images[0].url}">
          </a>
        </div>
      </div>`;
        })
        .join("");

    const playlistsContainer = document.getElementById(containerId);

    // Replace content with new playlists
    playlistsContainer.innerHTML = `
    <div class="mb-10">
      <h2 class="text-xl font-semibold">Top Playlists ${country}</h2>
      <div class="swiper-container">
        <div class="swiper-wrapper">${playlistsHtml}</div>
      </div>
    </div>`;

    // Initialize Swiper
    new Swiper(".swiper-container", {
        slidesPerView: 2,
        breakpoints: {
            640: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 10
            },
        },
    });
}
catch(error){
    console.log(error);}
}}

async function init() {
    const initialFilter = "featured";

    // Get the selected countries from the div elements
    
    const countryElements = document.querySelectorAll("#featuredPlaylists div");
    const countries = Array.from(countryElements).map((element) =>
        element.getAttribute("value")
    );

    // Fetch and display playlists for Pakistan and US
    const playlistsGlobal= await getPlaylists(initialFilter);
    displayPlaylists(playlistsGlobal, "Global", "globalContainer");

    const playlistsUSA = await getPlaylists(initialFilter, "US");
    displayPlaylists(playlistsUSA, "USA (United States)", "usaContainer");

    const playlistsUK = await getPlaylists(initialFilter, "GB");
    displayPlaylists(playlistsUK, "United Kingdom", "ukContainer");

    const playlistsAlgeria = await getPlaylists(initialFilter, "DZ");
    displayPlaylists(playlistsAlgeria, "Algeria", "algeriaContainer");

    const playlistsArgentina = await getPlaylists(initialFilter, "AR");
    displayPlaylists(playlistsArgentina, "Argentina", "argentinaContainer");

    const playlistsAustralia = await getPlaylists(initialFilter, "AU");
    displayPlaylists(playlistsAustralia, "Australia", "australiaContainer");

    const playlistsBahrain = await getPlaylists(initialFilter, "BH");
    displayPlaylists(playlistsBahrain, "Bahrain", "bahrainContainer");

    const playlistsBrazil = await getPlaylists(initialFilter, "BR");
    displayPlaylists(playlistsBrazil, "Brazil", "brazilContainer");

    const playlistsCanada = await getPlaylists(initialFilter, "CA");
    displayPlaylists(playlistsCanada, "Canada", "canadaContainer");

    const playlistsChile = await getPlaylists(initialFilter, "CL");
    displayPlaylists(playlistsChile, "Chile", "chileContainer");

    const playlistsColombia = await getPlaylists(initialFilter, "CO");
    displayPlaylists(playlistsColombia, "Colombia", "colombiaContainer");

    const playlistsCzechRepublic = await getPlaylists(initialFilter, "CZ");
    displayPlaylists(playlistsCzechRepublic, "Czech Republic", "czechContainer");

    const playlistsDenmark = await getPlaylists(initialFilter, "DK");
    displayPlaylists(playlistsDenmark, "Denmark", "denmarkContainer");

    const playlistsDominicanRepublic = await getPlaylists(initialFilter, "DO");
    displayPlaylists(
        playlistsDominicanRepublic,
        "Dominican Republic",
        "dominicanContainer"
    );

    const playlistsFinland = await getPlaylists(initialFilter, "FI");
    displayPlaylists(playlistsFinland, "Finland", "finlandContainer");

    const playlistsFrance = await getPlaylists(initialFilter, "FR");
    displayPlaylists(playlistsFrance, "France", "franceContainer");

    const playlistsGermany = await getPlaylists(initialFilter, "DE");
    displayPlaylists(playlistsGermany, "Germany", "germanyContainer");

    const playlistsGreece = await getPlaylists(initialFilter, "GR");
    displayPlaylists(playlistsGreece, "Greece", "greeceContainer");

    const playlistsHongKong = await getPlaylists(initialFilter, "HK");
    displayPlaylists(playlistsHongKong, "Hong Kong", "hongkongContainer");

    const playlistsIceland = await getPlaylists(initialFilter, "IS");
    displayPlaylists(playlistsIceland, "Iceland", "icelandContainer");

    const playlistsIndias = await getPlaylists(initialFilter, "IN");
    displayPlaylists(playlistsIndias, "India", "indiaContainer");

    const playlistsIndonesia = await getPlaylists(initialFilter, "ID");
    displayPlaylists(playlistsIndonesia, "Indonesia", "indonesiaContainer");

    const playlistsIreland = await getPlaylists(initialFilter, "IE");
    displayPlaylists(playlistsIreland, "Ireland", "irelandContainer");

    const playlistsIsrael = await getPlaylists(initialFilter, "IL");
    displayPlaylists(playlistsIsrael, "Israel", "israelContainer");

    const playlistsItaly = await getPlaylists(initialFilter, "IT");
    displayPlaylists(playlistsItaly, "Italy", "italyContainer");

    const playlistsJapan = await getPlaylists(initialFilter, "JP");
    displayPlaylists(playlistsJapan, "Japan", "japanContainer");

    const playlistsJordan = await getPlaylists(initialFilter, "JO");
    displayPlaylists(playlistsJordan, "Jordan", "jordanContainer");

    const playlistsKuwait = await getPlaylists(initialFilter, "KW");
    displayPlaylists(playlistsKuwait, "Kuwait", "kuwaitContainer");

    const playlistsLebanon = await getPlaylists(initialFilter, "LB");
    displayPlaylists(playlistsLebanon, "Lebanon", "lebanonContainer");

    const playlistsMalaysia = await getPlaylists(initialFilter, "MY");
    displayPlaylists(playlistsMalaysia, "Malaysia", "malaysiaContainer");

    const playlistsMexico = await getPlaylists(initialFilter, "MX");
    displayPlaylists(playlistsMexico, "Mexico", "mexicoContainer");

    const playlistsMorocco = await getPlaylists(initialFilter, "MA");
    displayPlaylists(playlistsMorocco, "Morocco", "moroccoContainer");

    const playlistsNetherlands = await getPlaylists(initialFilter, "NL");
    displayPlaylists(playlistsNetherlands, "Netherlands", "netherlandsContainer");

    const playlistsNewZealand = await getPlaylists(initialFilter, "NZ");
    displayPlaylists(playlistsNewZealand, "New Zealand", "newzealandContainer");

    const playlistsNorway = await getPlaylists(initialFilter, "NO");
    displayPlaylists(playlistsNorway, "Norway", "norwayContainer");

    const playlistsOman = await getPlaylists(initialFilter, "OM");
    displayPlaylists(playlistsOman, "Oman", "omanContainer");

    const playlistsPalestine = await getPlaylists(initialFilter, "PS");
    displayPlaylists(playlistsPalestine, "Palestine", "palestineContainer");

    const playlistsPhilippines = await getPlaylists(initialFilter, "PH");
    displayPlaylists(playlistsPhilippines, "Philippines", "philippinesContainer");

    const playlistsPoland = await getPlaylists(initialFilter, "PL");
    displayPlaylists(playlistsPoland, "Poland", "polandContainer");

    const playlistsPortugal = await getPlaylists(initialFilter, "PT");
    displayPlaylists(playlistsPortugal, "Portugal", "portugalContainer");

    const playlistsQatar = await getPlaylists(initialFilter, "QA");
    displayPlaylists(playlistsQatar, "Qatar", "qatarContainer");

    const playlistsRomania = await getPlaylists(initialFilter, "RO");
    displayPlaylists(playlistsRomania, "Romania", "romaniaContainer");

    const playlistsSaudiArabia = await getPlaylists(initialFilter, "SA");
    displayPlaylists(playlistsSaudiArabia, "Saudi Arabia", "saudiContainer");

    const playlistsSingapore = await getPlaylists(initialFilter, "SG");
    displayPlaylists(playlistsSingapore, "Singapore", "singaporeContainer");

    const playlistsSouthAfrica = await getPlaylists(initialFilter, "ZA");
    displayPlaylists(
        playlistsSouthAfrica,
        "South Africa",
        "southafricaContainer"
    );

    const playlistsSouthKorea = await getPlaylists(initialFilter, "KR");
    displayPlaylists(playlistsSouthKorea, "South Korea", "southkoreaContainer");

    const playlistsSpain = await getPlaylists(initialFilter, "ES");
    displayPlaylists(playlistsSpain, "Spain", "spainContainer");

    const playlistsSweden = await getPlaylists(initialFilter, "SE");
    displayPlaylists(playlistsSweden, "Sweden", "swedenContainer");

    const playlistsSwitzerland = await getPlaylists(initialFilter, "CH");
    displayPlaylists(playlistsSwitzerland, "Switzerland", "switzerlandContainer");

    const playlistsTaiwan = await getPlaylists(initialFilter, "TW");
    displayPlaylists(playlistsTaiwan, "Taiwan", "taiwanContainer");

    const playlistsThailand = await getPlaylists(initialFilter, "TH");
    displayPlaylists(playlistsThailand, "Thailand", "thailandContainer");

    const playlistsTunisia = await getPlaylists(initialFilter, "TN");
    displayPlaylists(playlistsTunisia, "Tunisia", "tunisiaContainer");

    const playlistsTurkey = await getPlaylists(initialFilter, "TR");
    displayPlaylists(playlistsTurkey, "Turkey", "turkeyContainer");

    const playlistsUAE = await getPlaylists(initialFilter, "AE");
    displayPlaylists(playlistsUAE, "United Arab Emirates", "uaeContainer");

    const playlistsVietnam = await getPlaylists(initialFilter, "VN");
    displayPlaylists(playlistsVietnam, "Vietnam", "vietnamContainer");
}

async function changeFilter(selectedFilter) {
    // Fetch and display playlists for Pakistan and US
    const playlistsGlobal = await getPlaylists(selectedFilter);
    handleContainerDisplay(playlistsGlobal, "globalContainer");
    displayPlaylists(playlistsGlobal, "Global", "globalContainer");

    const playlistsUSA = await getPlaylists(selectedFilter, "US");
    handleContainerDisplay(playlistsUSA, "usaContainer");

    displayPlaylists(playlistsUSA, "USA (United States)", "usaContainer");

    const playlistsUK = await getPlaylists(selectedFilter, "GB");
    handleContainerDisplay(playlistsUK, "ukContainer");

    displayPlaylists(playlistsUK, "United Kingdom", "ukContainer");

    const playlistsAlgeria = await getPlaylists(selectedFilter, "DZ");
    handleContainerDisplay(playlistsAlgeria, "algeriaContainer");

    displayPlaylists(playlistsAlgeria, "Algeria", "algeriaContainer");

    const playlistsArgentina = await getPlaylists(selectedFilter, "AR");
    handleContainerDisplay(playlistsArgentina, "argentinaContainer");

    displayPlaylists(playlistsArgentina, "Argentina", "argentinaContainer");

    const playlistsAustralia = await getPlaylists(selectedFilter, "AU");
    handleContainerDisplay(playlistsAustralia, "australiaContainer");

    displayPlaylists(playlistsAustralia, "Australia", "australiaContainer");

    const playlistsBahrain = await getPlaylists(selectedFilter, "BH");
    handleContainerDisplay(playlistsBahrain, "bahrainContainer");

    displayPlaylists(playlistsBahrain, "Bahrain", "bahrainContainer");

    const playlistsBrazil = await getPlaylists(selectedFilter, "BR");
    handleContainerDisplay(playlistsBrazil, "brazilContainer");

    displayPlaylists(playlistsBrazil, "Brazil", "brazilContainer");

    const playlistsCanada = await getPlaylists(selectedFilter, "CA");
    handleContainerDisplay(playlistsCanada, "canadaContainer");

    displayPlaylists(playlistsCanada, "Canada", "canadaContainer");

    const playlistsChile = await getPlaylists(selectedFilter, "CL");
    handleContainerDisplay(playlistsChile, "chileContainer");

    displayPlaylists(playlistsChile, "Chile", "chileContainer");

    const playlistsColombia = await getPlaylists(selectedFilter, "CO");
    handleContainerDisplay(playlistsColombia, "colombiaContainer");

    displayPlaylists(playlistsColombia, "Colombia", "colombiaContainer");

    const playlistsCzechRepublic = await getPlaylists(selectedFilter, "CZ");
    handleContainerDisplay(playlistsCzechRepublic, "czechContainer");

    displayPlaylists(playlistsCzechRepublic, "Czech Republic", "czechContainer");

    const playlistsDenmark = await getPlaylists(selectedFilter, "DK");
    handleContainerDisplay(playlistsDenmark, "denmarkContainer");

    displayPlaylists(playlistsDenmark, "Denmark", "denmarkContainer");

    const playlistsDominicanRepublic = await getPlaylists(selectedFilter, "DO");
    handleContainerDisplay(playlistsDominicanRepublic, "dominicanContainer");

    displayPlaylists(
        playlistsDominicanRepublic,
        "Dominican Republic",
        "dominicanContainer"
    );

    const playlistsFinland = await getPlaylists(selectedFilter, "FI");
    handleContainerDisplay(playlistsFinland, "finlandContainer");

    displayPlaylists(playlistsFinland, "Finland", "finlandContainer");

    const playlistsFrance = await getPlaylists(selectedFilter, "FR");
    handleContainerDisplay(playlistsFrance, "franceContainer");

    displayPlaylists(playlistsFrance, "France", "franceContainer");

    const playlistsGermany = await getPlaylists(selectedFilter, "DE");
    handleContainerDisplay(playlistsGermany, "germanyContainer");

    displayPlaylists(playlistsGermany, "Germany", "germanyContainer");

    const playlistsGreece = await getPlaylists(selectedFilter, "GR");
    handleContainerDisplay(playlistsGreece, "greeceContainer");

    displayPlaylists(playlistsGreece, "Greece", "greeceContainer");

    const playlistsHongKong = await getPlaylists(selectedFilter, "HK");
    handleContainerDisplay(playlistsHongKong, "hongkongContainer");

    displayPlaylists(playlistsHongKong, "Hong Kong", "hongkongContainer");

    const playlistsIceland = await getPlaylists(selectedFilter, "IS");
    handleContainerDisplay(playlistsIceland, "icelandContainer");

    displayPlaylists(playlistsIceland, "Iceland", "icelandContainer");

    const playlistsIndia = await getPlaylists(selectedFilter, "IN");
    handleContainerDisplay(playlistsIndia, "indiaContainer");

    displayPlaylists(playlistsIndia, "India", "indiaContainer");

    const playlistsIndonesia = await getPlaylists(selectedFilter, "ID");
    handleContainerDisplay(playlistsIndonesia, "indonesiaContainer");

    displayPlaylists(playlistsIndonesia, "Indonesia", "indonesiaContainer");

    const playlistsIreland = await getPlaylists(selectedFilter, "IE");

    displayPlaylists(playlistsIreland, "Ireland", "irelandContainer");
    handleContainerDisplay(playlistsIreland, "irelandContainer");

    const playlistsIsrael = await getPlaylists(selectedFilter, "IL");
    handleContainerDisplay(playlistsIsrael, "israelContainer");

    displayPlaylists(playlistsIsrael, "Israel", "israelContainer");

    const playlistsItaly = await getPlaylists(selectedFilter, "IT");
    handleContainerDisplay(playlistsItaly, "italyContainer");

    displayPlaylists(playlistsItaly, "Italy", "italyContainer");

    const playlistsJapan = await getPlaylists(selectedFilter, "JP");
    handleContainerDisplay(playlistsJapan, "japanContainer");

    displayPlaylists(playlistsJapan, "Japan", "japanContainer");

    const playlistsJordan = await getPlaylists(selectedFilter, "JO");
    handleContainerDisplay(playlistsJordan, "jordanContainer");

    displayPlaylists(playlistsJordan, "Jordan", "jordanContainer");

    const playlistsKuwait = await getPlaylists(selectedFilter, "KW");
    handleContainerDisplay(playlistsKuwait, "kuwaitContainer");

    displayPlaylists(playlistsKuwait, "Kuwait", "kuwaitContainer");

    const playlistsLebanon = await getPlaylists(selectedFilter, "LB");
    handleContainerDisplay(playlistsLebanon, "lebanonContainer");

    displayPlaylists(playlistsLebanon, "Lebanon", "lebanonContainer");

    const playlistsMalaysia = await getPlaylists(selectedFilter, "MY");
    handleContainerDisplay(playlistsMalaysia, "malaysiaContainer");

    displayPlaylists(playlistsMalaysia, "Malaysia", "malaysiaContainer");

    const playlistsMexico = await getPlaylists(selectedFilter, "MX");
    handleContainerDisplay(playlistsMexico, "mexicoContainer");

    displayPlaylists(playlistsMexico, "Mexico", "mexicoContainer");

    const playlistsMorocco = await getPlaylists(selectedFilter, "MA");
    handleContainerDisplay(playlistsMorocco, "moroccoContainer");

    displayPlaylists(playlistsMorocco, "Morocco", "moroccoContainer");

    const playlistsNetherlands = await getPlaylists(selectedFilter, "NL");
    handleContainerDisplay(playlistsNetherlands, "netherlandsContainer");

    displayPlaylists(playlistsNetherlands, "Netherlands", "netherlandsContainer");

    const playlistsNewZealand = await getPlaylists(selectedFilter, "NZ");
    handleContainerDisplay(playlistsNewZealand, "newzealandContainer");

    displayPlaylists(playlistsNewZealand, "New Zealand", "newzealandContainer");

    const playlistsNorway = await getPlaylists(selectedFilter, "NO");
    handleContainerDisplay(playlistsNorway, "norwayContainer");

    displayPlaylists(playlistsNorway, "Norway", "norwayContainer");

    const playlistsOman = await getPlaylists(selectedFilter, "OM");
    handleContainerDisplay(playlistsOman, "omanContainer");

    displayPlaylists(playlistsOman, "Oman", "omanContainer");

    const playlistsPalestine = await getPlaylists(selectedFilter, "PS");
    handleContainerDisplay(playlistsPalestine, "palestineContainer");

    displayPlaylists(playlistsPalestine, "Palestine", "palestineContainer");

    const playlistsPhilippines = await getPlaylists(selectedFilter, "PH");
    handleContainerDisplay(playlistsPhilippines, "philippinesContainer");

    displayPlaylists(playlistsPhilippines, "Philippines", "philippinesContainer");

    const playlistsPoland = await getPlaylists(selectedFilter, "PL");
    handleContainerDisplay(playlistsPoland, "polandContainer");

    displayPlaylists(playlistsPoland, "Poland", "polandContainer");

    const playlistsPortugal = await getPlaylists(selectedFilter, "PT");
    handleContainerDisplay(playlistsPortugal, "portugalContainer");

    displayPlaylists(playlistsPortugal, "Portugal", "portugalContainer");

    const playlistsQatar = await getPlaylists(selectedFilter, "QA");
    handleContainerDisplay(playlistsQatar, "qatarContainer");

    displayPlaylists(playlistsQatar, "Qatar", "qatarContainer");

    const playlistsRomania = await getPlaylists(selectedFilter, "RO");
    handleContainerDisplay(playlistsRomania, "romaniaContainer");

    displayPlaylists(playlistsRomania, "Romania", "romaniaContainer");

    const playlistsSaudiArabia = await getPlaylists(selectedFilter, "SA");
    handleContainerDisplay(playlistsSaudiArabia, "saudiContainer");

    displayPlaylists(playlistsSaudiArabia, "Saudi Arabia", "saudiContainer");

    const playlistsSingapore = await getPlaylists(selectedFilter, "SG");
    handleContainerDisplay(playlistsSingapore, "singaporeContainer");

    displayPlaylists(playlistsSingapore, "Singapore", "singaporeContainer");

    const playlistsSouthAfrica = await getPlaylists(selectedFilter, "ZA");
    handleContainerDisplay(playlistsSouthAfrica, "southafricaContainer");

    displayPlaylists(playlistsSouthAfrica, "South Africa", "southafricaContainer");

    const playlistsSouthKorea = await getPlaylists(selectedFilter, "KR");
    handleContainerDisplay(playlistsSouthKorea, "southkoreaContainer");

    displayPlaylists(playlistsSouthKorea, "South Korea", "southkoreaContainer");

    const playlistsSpain = await getPlaylists(selectedFilter, "ES");
    handleContainerDisplay(playlistsSpain, "spainContainer");

    displayPlaylists(playlistsSpain, "Spain", "spainContainer");

    const playlistsSweden = await getPlaylists(selectedFilter, "SE");
    handleContainerDisplay(playlistsSweden, "swedenContainer");

    displayPlaylists(playlistsSweden, "Sweden", "swedenContainer");

    const playlistsSwitzerland = await getPlaylists(selectedFilter, "CH");
    handleContainerDisplay(playlistsSwitzerland, "switzerlandContainer");

    displayPlaylists(playlistsSwitzerland, "Switzerland", "switzerlandContainer");

    const playlistsTaiwan = await getPlaylists(selectedFilter, "TW");
    handleContainerDisplay(playlistsTaiwan, "taiwanContainer");

    displayPlaylists(playlistsTaiwan, "Taiwan", "taiwanContainer");

    const playlistsThailand = await getPlaylists(selectedFilter, "TH");
    handleContainerDisplay(playlistsThailand, "thailandContainer");

    displayPlaylists(playlistsThailand, "Thailand", "thailandContainer");

    const playlistsTunisia = await getPlaylists(selectedFilter, "TN");
    handleContainerDisplay(playlistsTunisia, "tunisiaContainer");

    displayPlaylists(playlistsTunisia, "Tunisia", "tunisiaContainer");

    const playlistsTurkey = await getPlaylists(selectedFilter, "TR");
    handleContainerDisplay(playlistsTurkey, "turkeyContainer");

    displayPlaylists(playlistsTurkey, "Turkey", "turkeyContainer");

    const playlistsUAE = await getPlaylists(selectedFilter, "AE");
    handleContainerDisplay(playlistsUAE, "uaeContainer");

    displayPlaylists(playlistsUAE, "United Arab Emirates", "uaeContainer");

    const playlistsVietnam = await getPlaylists(selectedFilter, "VN");
    handleContainerDisplay(playlistsVietnam, "vietnamContainer");

    displayPlaylists(playlistsVietnam, "Vietnam", "vietnamContainer");

    


}

init();

