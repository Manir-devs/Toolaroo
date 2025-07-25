// Toggle Side Drawer (if using a sidebar/drawer)
function toggleDrawer() {
    const drawer = document.getElementById("drawer");
    drawer.classList.toggle("open");
}

// Toggle Light/Dark Mode
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const icon = document.getElementById("themeToggleBtn");

    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      icon.innerText = "☀️";
    } else {
      document.body.classList.remove("dark-mode");
      icon.innerText = "🌙";
    }
  });

  function toggleDarkMode() {
    const icon = document.getElementById("themeToggleBtn");
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      icon.innerText = "☀️";
      localStorage.setItem("theme", "dark");
    } else {
      icon.innerText = "🌙";
      localStorage.setItem("theme", "light");
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
  
  
  const allowedKeys = ['theme', 'fontSize', 'lang'];

  function openStoragePopup() {
    document.getElementById("storagePopup").style.display = "block";
    refreshStorageList();
  }

  function closeStoragePopup() {
    document.getElementById("storagePopup").style.display = "none";
  }

  function refreshStorageList() {
    const list = document.getElementById("storageList");
    list.innerHTML = "";

    if (localStorage.length === 0) {
      list.textContent = "No items in localStorage.";
      return;
    }

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);

      const item = document.createElement("li");
      item.style.marginBottom = "10px";

      const keyEl = document.createElement("strong");
      keyEl.textContent = key;

      const valueEl = document.createElement("span");
      valueEl.textContent = ": " + value;

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.style.marginLeft = "10px";
      delBtn.id = "delet-item-btn";
      delBtn.onclick = function () {
        deleteStorageItem(key);
      };

      item.appendChild(keyEl);
      item.appendChild(valueEl);
      item.appendChild(delBtn);

      list.appendChild(item);
    }
  }

  function deleteStorageItem(key) {
    localStorage.removeItem(key);
    refreshStorageList();
  }

  function addStorageItem() {
    const key = document.getElementById("newKey").value;
    const value = document.getElementById("newValue").value.trim();

    if (!allowedKeys.includes(key)) {
      alert("Invalid key.");
      return;
    }

    if (value === "") {
      alert("Value cannot be empty.");
      return;
    }

    localStorage.setItem(key, value);
    document.getElementById("newValue").value = "";
    refreshStorageList();
  }
  