// ---------- Dropdown Data ---------- //
const options = {
    category: ["Tops", "Bottoms", "Shoes", "Outerwear", "Accessories"],
    subcategory: {
        Tops: ["T-Shirt", "Tank Top", "Blouse", "Sweater"],
        Bottoms: ["Jeans", "Shorts", "Skirt", "Leggings"],
        Shoes: ["Sneakers", "Heels", "Boots", "Sandals"],
        Outerwear: ["Jacket", "Coat", "Hoodie"],
        Accessories: ["Hat", "Bag", "Belt", "Scarf"]
    },
    gender: ["Women", "Men", "Unisex"],
    sizeSystem: ["Alpha", "Numerical", "Shoe"],
    sizing: {
        Alpha: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"],
        Numerical: ["000", "00", "0", "2", "4", "6", "8", "10", "12", "14"],
        Shoe: ["Men's 4", "Men's 5", "Men's 6", "Men's 7", "Men's 8", "Men's 9", "Men's 10", "Men's 11", "Men's 12", "Men's 13"]
    },
    condition: ["New", "Like New", "Good", "Fair"],
    colour: ["White", "Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink", "Beige", "Brown", "Grey", "Black"],
    styleTags: ["Basics", "Streetwear", "Athletic", "Office", "Y2K", "Minimalist", "Vintage"]
};

// ---------- Dropdown Initialization ---------- //
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".dropdown").forEach(dropdown => {
        createDropdown(dropdown);
    });

    // Close menus when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
        }
    });
});

function createDropdown(dropdown) {
    const key = dropdown.dataset.target;

    // Insert display text
    dropdown.innerHTML = `<span class='placeholder'>Select...</span>`;

    const menu = document.createElement("div");
    menu.classList.add("dropdown-menu");

    let items = options[key] || [];

    // For subcategory (dependent)
    if (key === "subcategory") items = [];

    // Build menu items
    items?.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("dropdown-item");
        div.textContent = item;
        div.onclick = () => addChip(key, item);
        menu.appendChild(div);
    });

    dropdown.appendChild(menu);

    // Toggle open
    dropdown.addEventListener("click", () => {
        dropdown.classList.toggle("open");
    });
}

// ---------- Chip System ---------- //
function addChip(key, value) {
    const chipContainer = document.getElementById(key + "Chips");

    // Prevent duplicates
    if ([...chipContainer.children].some(chip => chip.dataset.value === value)) return;

    const chip = document.createElement("div");
    chip.classList.add("chip");
    chip.dataset.value = value;
    chip.innerHTML = `${value} <span class='remove'>×</span>`;

    chip.querySelector('.remove').onclick = () => chip.remove();

    chipContainer.appendChild(chip);

    // Update subcategories when picking a category
    if (key === "category") updateSubcategories(value);
}

// ---------- Subcategory Update ---------- //
function updateSubcategories(category) {
    const subDropdown = document.querySelector('.dropdown[data-target="subcategory"] .dropdown-menu');
    subDropdown.innerHTML = "";

    const items = options.subcategory[category] || [];

    items.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("dropdown-item");
        div.textContent = item;
        div.onclick = () => addChip("subcategory", item);
        subDropdown.appendChild(div);
    });
}

// ---------- Image Preview ---------- //
document.getElementById("photos").addEventListener("change", function () {
    const files = [...this.files].slice(0, 4); // Limit 4
    const preview = document.getElementById("previewContainer");
    preview.innerHTML = "";

    files.forEach(file => {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        preview.appendChild(img);
    });
});

// ---------- Form Submit ---------- //
document.getElementById("listingForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const listingID = "LISTING-" + Math.random().toString(36).substring(2, 9);

    const data = {
        id: listingID,
        status: "active",
        name: document.getElementById("listingName").value,
        brand: document.getElementById("brand").value,
        description: document.getElementById("description").value,
        trade: document.getElementById("tradePref").value,
        sizeSystem: getChipValues("sizeSystemChips"),
        gender: getChipValues("genderChips"),
        condition: getChipValues("conditionChips"),
        colour: getChipValues("colourChips"),
        category: getChipValues("categoryChips"),
        subcategory: getChipValues("subcategoryChips"),
        styles: getChipValues("styleTagsChips"),
        // TODO: send image files + API
    };

    console.log("Listing Submitted:", data);
    alert("Listing created! ID: " + listingID);
});

function getChipValues(id) {
    return [...document.getElementById(id).children].map(chip => chip.dataset.value);
}