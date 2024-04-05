// Declare a global variable to store the uuid
let coinUuid;

// Select the DOM element to display the price
let priceElementBTC = document.querySelector(".fa-solid.fa-bitcoin-sign");
let priceElementETH = document.querySelector(".fa-brands.fa-ethereum");

let table = document.querySelector(".table");
let row =1;

let live = document.querySelector(".live-rates");
let about = document.querySelector(".about");
let contact = document.querySelector(".contact");
let faq = document.querySelector(".faq-btn");

let homebtn = document.querySelector(".home-btn");

let mainCards = document.querySelectorAll(".main-cards");



const options = {
  headers: {
    'x-access-token': 'coinrankinge95bc29521c0493700611f9a23f9e63b4f14a7e5a5320467',
  },
};
      
      async function fetchData() {
        try {
            const coinsResponse = await fetch('https://api.coinranking.com/v2/coins', options);
            const coinsData = await coinsResponse.json();
    
            for (let i = 0; i < 9; i++) {
                const coinUuid = coinsData.data.coins[i].uuid;
                const coinResponse = await fetch(`https://api.coinranking.com/v2/coin/${coinUuid}`, options);
                const coinData = await coinResponse.json();

                
                let box = document.querySelectorAll('.main-cards-content')[i];
                console.log(box);
                let img = box.querySelector('img');
                img.src=coinData.data.coin.iconUrl;

                let h1 = box.querySelector('h1');
                h1.innerHTML = coinData.data.coin.name;

                let main_price = box.querySelector(".main-price");
                let fetched_price = Math.round(coinData.data.coin.price*1000)/1000;
                main_price.innerHTML = `$ ${fetched_price}`;

                let change = box.querySelector(".change");
                let fetchedChange = coinData.data.coin.change;
                change.innerHTML = fetchedChange;

                if (parseFloat(fetchedChange) < 0) {
                    change.style.color = 'red';
                } 
                else {
                    change.style.color = 'green';
                  }
                
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    fetchData();
    
    

    
live.addEventListener("click",()=>{

  window.scrollTo(0, 500);

})

about.addEventListener("click",()=>{

  window.scrollTo(0, 1050);


})

contact.addEventListener("click",()=>{

  window.scrollTo(0, 3100);

})


faq.addEventListener("click",()=>{

  window.scrollTo(0, 2300);
})
  
homebtn.addEventListener("click",()=>{

  window.scrollTo(0,30);
})


window.onscroll = () => {
  animateSection(".content", 200);
  animateSection(".faq", 300);
  animateSection(".why-us",120)
};

function animateSection(selector, offsetValue) {
  let section = document.querySelector(selector);

  let top = window.scrollY;
  let offset = section.offsetTop - offsetValue;
  let height = section.offsetHeight;

  if (top >= offset && top < offset + height) {
    section.classList.add('show-animate');
  }
  else{

    section.classList.remove('show-animate');
  }
}
