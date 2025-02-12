let searchBtn = document.getElementById("search-btn");
let searchInput = document.getElementById("search-input");
let result = document.getElementById("result");

searchBtn.addEventListener("click",async function () {
	const countryName = searchInput.value.trim().replace(/\s/g,"");
	const API = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
	console.log(API);
    result.innerHTML=`<h3>Loading...</h3>`;
	try {
		// Gọi API bằng async/await
		let response = await fetch(API);
		if (!response.ok) throw new Error("Invalid country name");

		let data = await response.json();

		// Hiển thị kết quả sau khi tải xong
		result.innerHTML = `
            <img src="${data[0].flags.svg}" alt="${data[0].name.common} flag" loading="lazy">
            <h2>${data[0].name.common}</h2>
            <div class="wrapper">
                <h4>Capital:</h4>
                <span>${data[0].capital}</span>
            </div>
            <div class="wrapper">
                <h4>Continent:</h4>
                <span>${data[0].continents}</span>
            </div>
            <div class="wrapper">
                <h4>Population:</h4>
                <span>${data[0].population.toLocaleString()}</span>
            </div>
            <div class="wrapper">
                <h4>Common Languages:</h4>
                <span>${Object.values(data[0].languages).join(", ")}</span>
            </div>
        `;
	} catch (error) {
		// Nếu có lỗi (ví dụ: nhập sai tên quốc gia), hiển thị thông báo lỗi
		result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
	}
});
