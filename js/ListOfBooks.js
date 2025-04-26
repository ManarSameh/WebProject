function borrowBook(button) {

    const loggedIn = localStorage.getItem('users');

    if (!loggedIn || loggedIn !== 'true') {
        alert("Please login first.");
        window.location.href = 'signIn.html'; 
        return;
    }

    let bookContainer = button.closest(".book");
    let container = bookContainer.closest(".container");

    
    let availableElem = bookContainer.querySelector(".available");
    let borrowedElem = bookContainer.querySelector(".borrowed");

    
    let bookTitle = container.querySelector("h3").innerText;
    let bookAuthor = container.querySelector("h4").innerText.replace("Author: ", "").replace("تأليف: ", "").replace("المؤلف: ", "");
    let bookDescription = container.querySelector("p").innerText;
    let bookImage = container.querySelector("img").src;

    let available = parseInt(availableElem.innerText.match(/\d+/)[0]);
    let borrowed = parseInt(borrowedElem.innerText.match(/\d+/)[0]);

    if (available > 0) {
        available--;
        borrowed++;
        availableElem.innerText = `Available: ${available}`;
        borrowedElem.innerText = `Borrowed: ${borrowed}`;
        
        
        addToBorrowedBooks({
            title: bookTitle,
            author: bookAuthor,
            description: bookDescription,
            imageSrc: bookImage,
            id: Date.now() 
        });

        
        updateBookStorage(bookTitle, available, borrowed);
    } else {
        alert("No books available to borrow.");
    }
}

function addToBorrowedBooks(book) {
    let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    borrowedBooks.push(book);
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
}

function updateBookStorage(bookTitle, available, borrowed) {
    let bookData = JSON.parse(localStorage.getItem('libraryBooks')) || {};
    bookData[bookTitle] = {
        available: available,
        borrowed: borrowed
    };
    localStorage.setItem('libraryBooks', JSON.stringify(bookData));
}


function updateBookStorage(bookTitle, available, borrowed) {
    
    let bookData = JSON.parse(localStorage.getItem('libraryBooks')) || {};
    
    bookData[bookTitle] = {
        available: available,
        borrowed: borrowed
    };
    
    localStorage.setItem('libraryBooks', JSON.stringify(bookData));
}


function loadBookData() {
    let bookData = JSON.parse(localStorage.getItem('libraryBooks')) || {};
    
    
    document.querySelectorAll('.container').forEach(container => {
        let bookTitle = container.querySelector('h3').innerText;
        let availableElem = container.querySelector('.available');
        let borrowedElem = container.querySelector('.borrowed');
        
        
        if (bookData[bookTitle]) {
            availableElem.innerText = `Available: ${bookData[bookTitle].available}`;
            borrowedElem.innerText = `Borrowed: ${bookData[bookTitle].borrowed}`;
        }
    });
}

window.addEventListener('DOMContentLoaded', loadBookData);