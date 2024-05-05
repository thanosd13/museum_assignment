document.addEventListener("DOMContentLoaded", function() {
    function performSearch(searchInput) {
        var textToFind = searchInput.value.trim();
        if (textToFind === "") {
            alert("Please enter some text to search!");
            return;
        }

        document.querySelectorAll('mark').forEach(function(mark) {
            mark.outerHTML = mark.innerHTML;  // Replace mark tags with their text content
        });

        var regex = new RegExp(`(${textToFind.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")})`, "gi");
        var count = 0;

        document.querySelectorAll("p, div, h1, h2, h3, h4, h5, h6, label").forEach(function(element) {
            if (element.children.length === 0) {  
                let elementText = element.textContent;
                const matches = elementText.match(regex);
                if (matches) {
                    count += matches.length;
                    element.innerHTML = elementText.replace(regex, `<mark style="background-color: yellow;">$&</mark>`);
                }
            }
        });
    }

    // Set up event listeners for both search boxes
    document.querySelectorAll('.searchBox').forEach(function(input) {
        input.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                performSearch(input);
            }
        });
    });

    window.onscroll = function() {
        var button = document.getElementById("scrollToTopBtn");
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }
    };

    // Setup click event for scroll to top button
    document.getElementById("scrollToTopBtn").addEventListener("click", function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
});

function toggleLanguage(lang) {
    if (lang === 'greek') {
        $('.english').hide();
        $('.greek').show();
    } else {
        $('.greek').hide();
        $('.english').show();
    }
}

$(document).ready(function() {
    toggleLanguage('greek'); // Default to Greek
});

