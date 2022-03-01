// const searchBtn = document.getElementById('search-btn');
// searchBtn.addEventListener('click', () => {
//     const searchArea = document.getElementById('search-area');
//     searchArea.value = '';
//     // console.log(searchArea);


//     const loadPhones = () => {
//         const url = `https://openapi.programming-hero.com/api/phones?search=${searchArea.value}`;
//         fetch(url)
//             .then(res => res.json())
//             .then(phone => displayPhones(phone))
//     };
//     loadPhones();

//     const displayPhones = (phone) => {
//         console.log(phone);
//         const container = document.getElementById('result-container');

//         const phonesData = phone.data;
//         const resultCount = document.getElementById('result-count');
//         if (phonesData.length > 20) {
//             resultCount.innerHTML = ` ${phone.data.length} results found for ${searchArea.value}`;
//         } else if (phonesData.length == 20) {
//             resultCount.innerHTML = `${phone.data.length} result found for ${searchArea.value}`;
//         }
//         searchArea.value = "";
//         container.textContent = "";

//         phone.data.forEach((phones) => {
//             const div = document.createElement('div');
//             div.classList.add('col');
//             div.innerHTML = `
//             <div class="card shadow border-0 p-2">
//                 <img src="${phones.image}" class="card-img-top" alt="...">
//                 <div class="card-body">
//                     <h5 class="card-title">${phones.phone_name}</h5>
//                     <p class="card-text">${phones.brand}</p>
//                     <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#phone-details" onclick="">More Details</button>
//                 </div>
//             </div>
//             `;
//             container.appendChild(div);
//         })
//     };
// });

// const phoneDetails = (data) => {
//     const url = `https://openapi.programming-hero.com/api/phone/${data}`;
//     fetch(url)
//         .then(res => res.json)
//         .then(data => console.log(data));
// }
// const displayPhonesDetails = (data) => {
//     console.log(data);
//     const parentDetail = document.getElementById('show-detail');
//     const cardContent = document.createElement('div');
//     cardContent.classList.add('col');
//     cardContent.innerHTML = `
//     <div class="col-md-4">
//                 <img src="..." class="img-fluid rounded-start" alt="...">
//             </div>
//             <div class="col-md-8">
//                 <div class="card-body">
//                     <h5 class="card-title">Card title</h5>
//                     <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//                     <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
//                 </div>
//             </div>
//     `;
// }

const searchPhone = () => {
    const searchArea = document.getElementById('search-area');
    const textArea = searchArea.value;
    console.log(textArea);

    searchArea.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${textArea}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data))
}
const displayPhones = data => {
    console.log(data);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    data.forEach(phones => {
        console.log(phones);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
                <img src="${phones.image}" class="card-img-top w-50" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phones.phone_name}</h5>
                    <p class="card-text">${phones.brand}</p>
                    <a onclick="loadPhonesDetail('${phones.slug}')" href="#" class="btn btn-primary d-grid gap-2 col-6 mx-auto">Details</a>
                </div>
            </div>
        `;
        searchResult.appendChild(div);

    })
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
<img src="${data.image}" class="card-img-top w-50" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.phone_name}</h5>
            <p class="card-text">${data.brand}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        `;
    phoneDetail.appendChild(div);
}