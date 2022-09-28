
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display  = displayStyle;
}
const toggleResult = displayStyle => {
    document.getElementById('details').style.display = displayStyle;
}
const searchPhone = () => {
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;
    toggleSpinner('block');
    toggleResult('none');
    loadPhone(searchText);
    document.getElementById('searchField').value='';

}

const loadPhone = searchText => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(json => displayPhone(json.data))

}

const displayPhone = phones => {
    const container = document.getElementById('phones');
    for (const phone of phones) {
        console.log(phone.slug);
        const div = document.createElement('div');
        div.innerHTML = `<div class="flex flex-col items-center bg-indigo-500 gap-4 px-8 py-8">
        <div class=flex justify-center>
            <img src="${phone.image}" alt="">
        </div>
        <div class="text-3xl text-white">
            ${phone.phone_name}
        </div>
        <div class="text-2xl text-white">${phone.brand}</div>
        <div>
            <button onclick="phoneDetails('${phone.slug}')" class="px-8 py-2 rounded bg-indigo-400 text-white text-xl">
                Details
            </button>
        </div>
    </div>
    `;
        container.appendChild(div);
    }
    toggleSpinner('none');
    toggleResult('grid');

}
const phoneDetails = (slug) => {
    console.log('slug', slug)
    console.log('hi')
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    console.log('url', url)
    fetch(url)
        .then(res => res.json())
        .then(json => displayPhoneDetails(json.data))


};

const displayPhoneDetails = details => {
    const container = document.getElementById('details');
    
    container.textContent = '';


    const div = document.createElement('div');
    console.log(details);
    div.classList.add('details');
    div.innerHTML = `
    <div>
                <h1 class="text-4xl text-center my-8">Details</h1>
                <div class="flex flex-col items-center text-2xl gap-4">
                <img src = "${details.image }" alt="">
                <h2>Name: ${details.name}
                    <p>Storage: ${details.mainFeatures.storage}</p>
                    <p>Release Date: ${details.releaseDate}</p>
                </div>
            </div>
    `;
    container.appendChild(div);
    
    
}



