/*=========================== using function for spinner ===========================*/

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

const showBooks = () => {
    const searchField = document.getElementById('searchInput');
    const showInput = searchField.value;

    //showing spinner
    toggleSpinner('block');

    console.log(showInput);
    searchField.value = '';

    // loading api
    const url = `https://openlibrary.org/search.json?q=${showInput}`
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => showResult(data.docs, data.numFound));
}
/*=========================== using function for book result ===========================*/
const showResult = (books, numList) => {
    const output = document.getElementById('showDetails');

    // error handling for mis-spelled or blank input

    if (numList === 0) {
        const booksNum = document.getElementById('book-foundlist');
        booksNum.innerHTML = ` <h1><span class="text-red-600">Sorry !! No Results Found</span> 
        <br>❌<br>Make sure that all words are spelled correctly or Try different keywords </h1>`;
        output.textContent = '';
        toggleSpinner('none');
    } else {
        const booksNum = document.getElementById('book-foundlist');
        booksNum.innerHTML = ` <h1>Search Result : Total <span class="text-blue-400">${numList}</span> Books Found</h1>`;
        output.textContent = '';

        books.forEach(book => {
            console.log(book);
            /*=========================== loading images from api ===========================*/

            //    conditions if there is no image
            book?.cover_i
                ? (imgUrlMedium = `https://covers.openlibrary.org/b/id/${book?.cover_i}-M.jpg`)
                : (imgUrlMedium = "images/error.png");

            // creating div to make card and to show search result
            const div = document.createElement('div');
            div.classList.add('mx-auto');
            div.classList.add('mb-6');
            div.classList.add('mt-12');

            /*=========================== dynamic card for book result ===========================*/
            div.innerHTML = `
            <div class=" w-80 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 duration-500 transform transition cursor-pointer">
                <img src="${imgUrlMedium}" class="object-cover w-full h-72" alt="">
                <div class="p-5">
                <h1 class="text-2xl font-bold text-blue-500">${book.title.slice(0, 20)}</h1>
                <p class="mt-2 text-lg font-semibold text-gray-600">Author : ${book.author_name[0].slice(0, 20)}</p>
                <p class="mt-1 text-gray-500 font-">Publisher : ${book.publisher[0].slice(0, 20) ? book.publisher[0].slice(0, 20) : "Not Found"}</pa>
                <p class="mt-1 text-gray-500 font-">First Published On : ${book.first_publish_year ? book.first_publish_year : "Not Found"}</pa>
                </div>
            </div>
            `;
            output.appendChild(div);
            toggleSpinner('none');
        });

    }


}


/*============== if any problem occurs, requesting to visit my netlify live link below ===========

=========================== https://assignment-book-archive.netlify.app/ =========================

======================= thanks a lot for your precious time , best regards ========================*/