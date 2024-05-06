//Menu quando è in mobile 
const Menu = document.querySelector('#bloccomenu');
Menu.addEventListener('click', menuTenda);
let isVisible = false;
function menuTenda(event) {  
  const MenuT = document.querySelector('#menu_tenda');

  isVisible = !isVisible;
  if (isVisible) {
    MenuT.classList.remove('hidden');
  } else {
    MenuT.classList.add('hidden');
  }
}

//Cambio sfondo quando clicchiamo su un pallino
const SFONDO1= 'im7.jpg';
const SFONDO2= 'slide_2.jpg';
const SFONDO3= 'im12.jpg';

const Cerchio=document.querySelectorAll('#palline');
for(let i=0; i<Cerchio.length; i++){
    Cerchio[i].addEventListener('click', cambioSfondo);
}

function cambioSfondo(event){
    const elementoSelezionato = event.target;
    const indice = elementoSelezionato.dataset.index;
    const bloccoFoto=document.querySelector('#blocco_foto');
    const scritta2=document.querySelector('#infofoto2');
    const node1=document.createTextNode("LA NOSTRA STORIA E LO STAFF");
    const node2=document.createTextNode("SCOPRI IL NOSTRO MENU'");
    const node3=document.createTextNode("LEGGI IL NOSTRO BLOG");
    scritta2.innerHTML='';
    
    if(indice === '1'){
        bloccoFoto.style.backgroundImage = `url(${SFONDO1})`;
        scritta2.appendChild(node1);
        
    }else if (indice === '2'){
        //Secondo point 
        bloccoFoto.style.backgroundImage = `url(${SFONDO2})`;
        scritta2.appendChild(node2);
        
    } else if (indice === '3'){
        bloccoFoto.style.backgroundImage = `url(${SFONDO3})`;
        scritta2.appendChild(node3);
    }
}



//Dettagli 
const dettagli=document.querySelector('.testoDettagli');
dettagli.addEventListener('click',LeggiDiPiu);
let visible=false;
function LeggiDiPiu(event){
    const testonuovo=document.querySelector('#testonascosto');
    const text = event.currentTarget.querySelector('span');
    const blocco=document.querySelector("blocco_centrale");
    visible=!visible;
    if(visible){
        testonuovo.classList.remove('hidden');
        text.textContent='LEGGI DI MENO';
    }else{
        testonuovo.classList.add('hidden');
        text.textContent='LEGGI DI PIU';

    }
}

//per visualizzare la galleria
const PHOTO_LIST = ["im1.jpg", "im4.jpg", "im2.jpg", "im8.jpg"];

function createImage(src){
    const image = document.createElement('img');
    image.src=src;
    return image;
}

const album=document.querySelector('#album');
for(let i=0; i<PHOTO_LIST.length; i++){
    const photoSrc = PHOTO_LIST[i];
    const image= createImage(photoSrc);
    image.addEventListener('click',onThumbnailClick);
    album.appendChild(image);
}

function onThumbnailClick(event){
    const modalView=document.querySelector('#modal-view');
    const image=createImage(event.currentTarget.src);
    document.body.classList.add('no-scroll');
    //modalView.style.top=window.scroll+'px';
    modalView.innerHTML='';
    modalView.appendChild(image);
    modalView.classList.remove('hidden');
}

function onModalClick(){
    document.body.classList.remove('no-scroll');
    const modalView=document.querySelector('#modal-view');
    //modalView.classList.add('hidden');
    modalView.classList.add('hidden');
}

const modalView=document.querySelector('#modal-view');
modalView.addEventListener('click',onModalClick);

const galleriaItems = document.querySelectorAll('#album img');
for(let i=0; i < galleriaItems.length; i++){
    const item = galleriaItems[i];
    item.addEventListener('click', onThumbnailClick);
}

//POSIZIONE 
fetch('https://js.api.here.com/v3/3.1/mapsjs-core.js')
  .then(response => response.text())
  .then(data => {
    var platform = new H.service.Platform({
        apikey: 'XEw1ZjzglmD9ioGSFhR2yTNCxCxCMGpXINXjMPkYikg'
    });
    var defaultLayers = platform.createDefaultLayers();
    var map = new H.Map(document.getElementById('mapContainer'), 
        defaultLayers.vector.normal.map,
        {
            center: { lat: 50, lng: 5 },
            zoom: 4,
            pixelRatio: window.devicePixelRatio || 1
        }
    );
    window.addEventListener('resize', () => map.getViewPort().resize()); //assicuriamoci che la mappa occupa l'intero spazio 
    //Facciamo la mappa interattiva
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    var ui = H.ui.UI.createDefault(map, defaultLayers);
    var LocationOfMarker = { lat:37.85275575694404 , lng: 15.289545700163597 };
    
    var icon = new H.map.Icon('rosso.png', { //posizione del ristorante
        size: { w: 60, h: 60 } 
    });
    var marker = new H.map.Marker(LocationOfMarker, { icon: icon });
    map.addObject(marker);
    map.setCenter(LocationOfMarker)
    map.setZoom(16);
    
    var LocationOfMarker = { lat: 37.85360320013881, lng: 15.288952121710082 }; //posizione palazzo
    var icon = new H.map.Icon('blu.png', {
        size: { w: 50, h: 50 } 
    });
    var marker = new H.map.Marker(LocationOfMarker, { icon: icon });
    map.addObject(marker);
    map.setCenter(LocationOfMarker);
    
    var LocationOfMarker = { lat:37.851030616981056 , lng: 15.29064870763517 }; //posizione villa
    var icon = new H.map.Icon('verde.png', {
        size: { w: 50, h: 50 } 
    });
    var marker = new H.map.Marker(LocationOfMarker, { icon: icon });
    map.addObject(marker);
    map.setCenter(LocationOfMarker);
    
    var LocationOfMarker = { lat: 37.852444543277066, lng: 15.292606365232796 }; //posizione teatro 
    var icon = new H.map.Icon('arancione.png', {
        size: { w: 50, h: 50 } 
    });
    var marker = new H.map.Marker(LocationOfMarker, { icon: icon });
    map.addObject(marker);
    map.setCenter(LocationOfMarker);
  })
  .catch(error => {
    console.error('Si è verificato un problema con l\'operazione di fetch:', error);});

//SPOTIFY
function onJson(json) {
    console.log('JSON ricevuto');
    console.log(json);
    const library = document.querySelector('#playlist-view');
    library.innerHTML = '';
    const results = json.playlists.items;
    let num_results = results.length;
    if(num_results > 6)
      num_results = 6;
    for(let i=0; i<num_results; i++)
    {
      const playlist_data = results[i]
      const title = playlist_data.name;
      const description = playlist_data.description;
      const selected_image = playlist_data.images[0].url;
      const playlist = document.createElement('div');
      playlist.classList.add('playlist');
      const img = document.createElement('img');
      img.src = selected_image;
      const titleCaption = document.createElement('span');
      titleCaption.textContent = title;
      const descriptionCaption = document.createElement('span');
      descriptionCaption.textContent = description;
      playlist.appendChild(img);
      playlist.appendChild(titleCaption);
      playlist.appendChild(descriptionCaption);
      library.appendChild(playlist);
    }
}

  
  function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }
  
  function search(event)
  {
    // Impedisci il submit del form
    event.preventDefault();
    // Leggi valore del campo di testo
    const playlist_input = document.querySelector('#search-blocco');
    const playlist_value = encodeURIComponent(playlist_input.value);
    console.log('Eseguo ricerca: ' + playlist_value);
    // Esegui la richiesta
    if(token){
        fetch("https://api.spotify.com/v1/search?type=playlist&q=" + playlist_value,
      {
        headers:
        {
          'Authorization': 'Bearer ' + token
        }
      }
    ).then(onResponse).then(onJson);
  }else{
    console.log('Token non disponibile');
  }}

  function onTokenJson(json)
  {
    console.log(json);
    // Imposta il token global
    token = json.access_token;
  }
  
  function onTokenResponse(response)
  {
    return response.json();
  }

  // OAuth credentials --- NON SICURO!
  const client_id = '5469b650a8154b5d9c181d168ae345e3';
  const client_secret = '9b4a38f7c5264360a4d813a23cebd29c';
  // Dichiara variabile token
  let token;
  // All'apertura della pagina, richiediamo il token
  fetch("https://accounts.spotify.com/api/token",
      {
     method: "post",
     body: 'grant_type=client_credentials',
     headers:
     {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
     }
    }
  ).then(onTokenResponse).then(onTokenJson);
  // Aggiungi event listener al form
  const form = document.querySelector('form');
  form.addEventListener('submit', search);