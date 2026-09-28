
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

let currentIndex = 0; 


function openLightbox(index) {
    currentIndex = index;
    
    const selectedImgSrc = galleryItems[currentIndex].getAttribute('src');
    lightboxImg.setAttribute('src', selectedImgSrc);

    lightbox.classList.add('active');
}
function closeLightbox() {
    lightbox.classList.remove('active');
}

function changeImage(direction) {
    currentIndex += direction;

    
    if (currentIndex >= galleryItems.length) {
        currentIndex = 0;
    }

    if (currentIndex < 0) {
        currentIndex = galleryItems.length - 1;
    }

    
    const newImgSrc = galleryItems[currentIndex].getAttribute('src');
    lightboxImg.setAttribute('src', newImgSrc);
}

    
    function filterGallery(category) {
        const items = document.querySelectorAll('.gallery-item');
        const buttons = document.querySelectorAll('.filter-buttons button');

        
        buttons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('onclick').includes(category)) {
                button.classList.add('active');
            }
        });

        
        items.forEach(item => {
            if (category === 'all' || item.classList.contains(category)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    
}