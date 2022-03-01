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
            // console.log(data.data);

            if (data.data.length == 0) {
                const noResultContainer = document.getElementById('no-result');
                const div = document.createElement('div');
                div.style.textAlign = "center";
                // div.style.marginTop = "center";
                div.innerHTML = `
               <p>No result found!</p>
               `
                noResultContainer.appendChild(div);
            }
            else {
                displayPhones(data.data.slice(0, 20));
            };

        })
}

const displayPhones = phones => {
    const phone = phones.slice(0, 20);
    for (const phone of phones) {
        const rowDiv = document.getElementById('row');
        const div = document.createElement('div');
        div.classList.add('col-lg-4')
        div.innerHTML = `
                <div class="border p-4 mt-4 rounded h-100">
                    <div id="mobile-container">
                        <img src="${phone.image}" alt="" id="mobile-image" class=" mb-4">
                    </div>
                        <h3>${phone.phone_name}</h3>
                        <h4>${phone.brand}</h4>
                    <button onclick="loadDetails('${phone.slug}')" id="btn-details" class="p-2 w-75 mt-3">Details</button>
                </div>
        `
        rowDiv.appendChild(div);
    }
}

const loadDetails = id => {
    document.getElementById('details-container').textContent = '';
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data))
}

const showDetails = info => {
    console.log(info)
    const detailsContainer = document.getElementById('details-container');
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `
        <div class="card-body">
            <div class=" p-3 mt-4 rounded h-100 w-100 m-auto d-sm-flex d-md-flex flex-md-column d-lg-flex flex-lg-row ">
                <div id="details-image-container">
                    <img src="${info.image}" alt="" id="mobile-details-image" class=" mb-4">
                </div>
                <div class ="ms-sm-2 ms-md-3 ms-lg-5">
                    <h3>${info.name}</h3>
                    <h4>Brand name: ${info.brand}</h4>
                    <h4 class="mt-3">Main Features</h4>
                    <p>Storage:${info.mainFeatures.storage}</p>
                    <p>Display Size:${info.mainFeatures.displaySize}</p>
                    <p>Chip set: ${info.mainFeatures.chipSet}</p>
                    <p>Sensors: ${info.mainFeatures.sensors}</p>
                    <p>Others: USB: ${info.others.USB}, Bluetooth: ${info.others.Bluetooth}, WLAN: ${info.others.WLAN}, Radio: ${info.others.Radio}, NFC: ${info.others.NFC}, GPS: ${info.others.GPS}</p>
                    <p>Release date: ${info.releaseDate}</p>
                </div>
            </div>
        </div>
    `
    detailsContainer.appendChild(div)

}
