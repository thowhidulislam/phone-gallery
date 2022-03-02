/* -------------------------------------
    Displaying search result section
---------------------------------------- */
//fetching mobile data from API
const loadPhones = () => {
    document.getElementById('no-result').textContent = '';
    document.getElementById('details-container').textContent = "";
    document.getElementById('row').textContent = "";
    const searchValue = document.getElementById('search-box').value;
    document.getElementById('search-box').value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            console.log(data.data);
            if (data.data.length == 0) {
                const noResultContainer = document.getElementById('no-result');
                const div = document.createElement('div');
                div.style.textAlign = "center";
                div.innerHTML = `
               <p class="text-danger">No result found!</p>
               `
                noResultContainer.appendChild(div);
            }
            else {
                displayPhones(data.data.slice(0, 20));
            };

        })
}

//Displaying mobile phones on UI
const displayPhones = phones => {
    const phone = phones.slice(0, 20);
    for (const phone of phones) {
        const rowDiv = document.getElementById('row');
        const div = document.createElement('div');
        div.classList.add('col-lg-4')
        div.innerHTML = `
                <div class="border p-4 mt-4 rounded h-100 text-center">
                    <div id="mobile-container">
                        <img src="${phone.image}" alt="" id="mobile-image" class=" mb-4">
                    </div>
                        <h3>${phone.phone_name}</h3>
                        <h4>${phone.brand}</h4>
                    <button onclick="loadDetails('${phone.slug}')" id="btn-details" class="p-2 w-75 mt-3 border-0 ">Details</button>
                </div>
        `
        rowDiv.appendChild(div);
    }
}

/* ----------------------------------
     Showing mobile details section
------------------------------------- */

// fetching details from API
const loadDetails = id => {
    document.getElementById('details-container').textContent = '';
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data))
}
// showing details on UI
const showDetails = info => {
    console.log(info)
    const detailsContainer = document.getElementById('details-container');
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `
        <div class="card-body">
            <div class=" p-3 mt-4 rounded h-100 w-100 m-auto d-sm-flex d-md-flex d-lg-flex flex-sm-column  flex-lg-row ">
                <div id="details-image-container">
                    <img src="${info.image}" alt="" id="mobile-details-image" class=" mb-4 mx-auto d-block ">
                </div>
                <div class ="ms-sm-2 ms-md-1 ms-lg-5">
                    <h3 class=" text-center text-sm-center text-lg-start">${info.name}</h3>
                    <p class=" text-center text-sm-center text-lg-start">Release date: ${info.releaseDate ? info.releaseDate : 'No release date found'}</p>
                    <h4 class="mt-3 text-center text-sm-center text-lg-start">Main Features</h4>
                    <p>Storage: ${info.mainFeatures.storage}</p>
                    <p>Display Size: ${info.mainFeatures.displaySize}</p>
                    <p>Chip set: ${info.mainFeatures.chipSet}</p>
                    <p>Sensors: ${info.mainFeatures.sensors}</p>
                    <p>Others: USB: ${info.others ? info.others.USB : 'No'}, Bluetooth: ${info.others ? info.others.Bluetooth : 'No'}, WLAN: ${info.others ? info.others.WLAN : 'No'}, Radio: ${info.others ? info.others.Radio : 'No'}, NFC: ${info.others ? info.others.NFC : 'No'}, GPS: ${info.others ? info.others.GPS : 'No'}</p> 
                </div>
            </div>
        </div>
    `
    detailsContainer.appendChild(div)
}
