// document.getElementById('message-error').style.display = 'none';

const searchPhone = () => {
    const searchArea = document.getElementById('search-area');
    const textArea = searchArea.value;
    console.log(textArea);


    searchArea.value = ''
        // document.getElementById('message-error').style.display = 'none';

    const errorDiv = document.getElementById("error-message");

    //error handling
    if (textArea == false) {
        errorDiv.innerText = `Please write something`;
    } else {
        errorDiv.innerText = "";

    }

    const url = `https://openapi.programming-hero.com/api/phones?search=${textArea}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data))



    const displayPhones = data => {
        console.log(data);
        const searchResult = document.getElementById('search-result');

        const PhoneFromData = data;
        const resultCount = document.getElementById("result-count");
        if (PhoneFromData.length > 1) {
            resultCount.innerHTML = `${data.length} results found for "<strong>${searchArea.value}</strong>" 😃`;
        } else if (PhoneFromData.length == 1) {
            resultCount.innerHTML = `${data.length} result found for "<strong>${searchArea.value}</strong>" 😃`;
        } else if (PhoneFromData.length == []) {
            resultCount.innerHTML = `"<strong>Sorry not found</strong>"`;
        }
        searchArea.value = ""
        searchResult.textContent = "";
        data.forEach(phones => {
            console.log(phones);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card">
                <img src="${phones.image}" class="card-img-top w-50" alt="...">
                <div class="card-body">
                    <h5 class="card-title"><strong>Name</strong>: ${phones.phone_name}</h5>
                    <p class="card-text"><strong>Brand</strong>: ${phones.brand}</p>
                    <a onclick="loadPhonesDetail('${phones.slug}')" href="#" class="btn btn-primary d-grid gap-2 col-6 mx-auto">Details</a>
                </div>
            </div>
        `;
            searchResult.appendChild(div);

        })
    }
}
const loadPhonesDetail = id => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}



const displayPhoneDetails = (data) => {
    console.log(data);
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.textContent = '';

    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card">
<img src="${data.image}" class="card-img-top w-50" alt="...">
        <div class="card-body">
            <h4 class="card-title">Phone Name: ${data.name} </h4>
            <strong><p class="card-text">Brand: ${data.brand}</p></strong>
            <hr>
            <h5>Specifications</h5>
            <p class="card-title"><strong>Sensors</strong>: ${data.mainFeatures.sensors}.</p>
            <p class="card-text"><strong>Storage</strong>: ${data.mainFeatures.storage}</p>
            <p class="card-text"><strong>Chip-set</strong>: ${data.mainFeatures.chipSet}</p>
            <p class="card-text"><strong>Memory</strong>: ${data.mainFeatures.memory}</p>
            <p class="card-text"><strong>Display-size</strong>: ${data.mainFeatures.displaySize}</p>
            <strong><h6>Others</h6></strong><hr>
            <p class="card-text"><strong>Bluetooth</strong>: ${data.others?.Bluetooth?data.others.Bluetooth:'No data found'}</p>
            <p class="card-text"><strong>WLAN</strong>: ${data.others?.WLAN?data.others.WLAN:'No data found'}</p>
            <p class="card-text"><strong>GPS</strong>: ${data.others?.GPS?data.others.GPS:'No data found'}</p>
            <p class="card-text"><strong>NFC</strong>: ${data.others?.NFC?data.others.NFC:'No data found'}</p>
            <p class="card-text"><strong>Radio</strong>: ${data.others?.Radio?data.others.Radio:'No data found'}</p>
            <p class="card-text"><strong>Release-Date</strong>: ${data?.releaseDate?data.releaseDate:'No data found'}</p>
            
        </div>
        </div> 
        `;
    phoneDetail.appendChild(div);
}