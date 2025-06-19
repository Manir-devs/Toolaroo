// Toggle Side Drawer (if using a sidebar/drawer)
function toggleDrawer() {
    const drawer = document.getElementById("drawer");
    drawer.classList.toggle("open");
}

// Toggle Light/Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    // Change icon based on mode
    const icon = document.querySelector(".icon-btn");
    if (document.body.classList.contains("dark-mode")) {
        icon.innerText = "☀️";  // Light mode icon
    } else {
        icon.innerText = "🌙";  // Dark mode icon
    }
}


// Open Instagram Contact Link
function openContact() {
    window.open("https://instagram.com/artistry_with_manir___", "_blank");
}

// Share Current Page using Web Share API
function shareCurrentPage() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: "Check this out!",
            url: window.location.href
        }).catch((error) => console.log('Sharing failed:', error));
    } else {
        alert("Web Share API is not supported in this browser.");
    }
}


// Close drawer on outside click, but prevent click from propagating
document.addEventListener("click", function(event) {
    const drawer = document.getElementById("drawer");
    const menuButton = document.querySelector(".menu-icon");

    // If drawer is open
    if (drawer.classList.contains("open")) {
        // If clicked outside the drawer and not the menu button
        if (!drawer.contains(event.target) && !menuButton.contains(event.target)) {
            event.stopPropagation(); // Stop the click from affecting other elements
            event.preventDefault();  // Prevent default behavior
            drawer.classList.remove("open");
        }
    }
}, true); // Capture phase to catch it before reaching target

//loading screen

  window.addEventListener('load', function () {
    const toolarooLoader = document.getElementById('toolaroo-preloader');
    toolarooLoader.style.opacity = '0';
    setTimeout(() => toolarooLoader.style.display = 'none', 500);
  });


//reloadpage
function reloadPage() {
    location.reload(); 
  }
  
