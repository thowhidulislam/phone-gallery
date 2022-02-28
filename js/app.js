const loadPhones = () => {
    const searchValue = document.getElementById('search-box').value;
    // console.log(searchValue);

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data))
}

const displayPhones = phones => {
    for (const phone of phones) {
        // console.log(phone.slug)
        // const phoneContainer = document.getElementById('mobile-container');
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
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data))
}

const showDetails = info => {
    console.log(info)
    const detailsContainer = document.getElementById('details-container');
    const div = document.createElement('div');
    div.classList.add('row');
    div.innerHTML = `
        <div class="col-lg-4 mx-auto mb-4">
            <div class="border p-4 mt-4 rounded h-100">
                <div id="details-image-container">
                    <img src="${info.image}" alt="" id="mobile-details-image" class=" mb-4">
                </div>
                    <h3>${info.name}</h3>
                    <h4>Brand name: ${info.brand}</h4>
                    <h4>Main Features</h4>
                    <p>${info.mainFeatures.storage}</p>
                    <p>${info.mainFeatures.displaySize}</p>
                    <p>${info.mainFeatures.chipSet}</p>
                    <p>${info.mainFeatures.displaySize}</p>
                    <h6>${info.releaseDate}</h6>
            </div>
        </div>
    `
    detailsContainer.appendChild(div)

}