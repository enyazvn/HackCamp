import React, { useState, useEffect } from "react";

export default function CreateListing() {
  const options = {
    category: ["Tops", "Bottoms", "Shoes", "Outerwear", "Accessories"],
    subcategory: {
      Tops: ["T-Shirt", "Tank Top", "Blouse", "Sweater"],
      Bottoms: ["Jeans", "Shorts", "Skirt", "Leggings"],
      Shoes: ["Sneakers", "Heels", "Boots", "Sandals"],
      Outerwear: ["Jacket", "Coat", "Hoodie"],
      Accessories: ["Hat", "Bag", "Belt", "Scarf"],
    },
    gender: ["Women", "Men", "Unisex"],
    sizeSystem: ["Alpha", "Numerical", "Shoe"],
    sizing: {
      Alpha: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      Numerical: ["000", "00", "0", "2", "4", "6", "8", "10", "12", "14"],
      Shoe: [
        "Men's 4",
        "Men's 5",
        "Men's 6",
        "Men's 7",
        "Men's 8",
        "Men's 9",
        "Men's 10",
        "Men's 11",
        "Men's 12",
        "Men's 13",
      ],
    },
    condition: ["New", "Like New", "Good", "Fair"],
    colour: [
      "White",
      "Red",
      "Orange",
      "Yellow",
      "Green",
      "Blue",
      "Purple",
      "Pink",
      "Beige",
      "Brown",
      "Grey",
      "Black",
    ],
    styleTags: [
      "Basics",
      "Streetwear",
      "Athletic",
      "Office",
      "Y2K",
      "Minimalist",
      "Vintage",
    ],
  };

  const [form, setForm] = useState({});
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "category") {
      setSubcategoryList(options.subcategory[value] || []);
      setForm((prev) => ({ ...prev, subcategory: "" }));
    }
  };

  const handleImages = (e) => {
    const files = [...e.target.files].slice(0, 4);
    setImages(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const listingID = "LISTING-" + Math.random().toString(36).substring(2, 9);
    alert("Listing created! ID: " + listingID);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create a New Listing</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Listing Name */}
        <div>
          <label className="block mb-1">Listing Name *</label>
          <input
            type="text"
            name="listingName"
            required
            className="w-full border p-2 rounded"
            placeholder="e.g. Aritzia TNA Hoodie"
            onChange={handleChange}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1">Category *</label>
          <select
            name="category"
            required
            className="w-full border p-2 rounded"
            onChange={handleChange}
          >
            <option value="">Select category</option>
            {options.category.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        <div>
          <label className="block mb-1">Subcategory *</label>
          <select
            name="subcategory"
            required
            className="w-full border p-2 rounded"
            value={form.subcategory || ""}
            onChange={handleChange}
          >
            <option value="">Select subcategory</option>
            {subcategoryList.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1">Gender *</label>
          <select
            name="genderSize"
            required
            className="w-full border p-2 rounded"
            onChange={handleChange}
          >
            <option value="">Select gender</option>
            {options.gender.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Size System */}
        <div>
          <label className="block mb-1">Sizing System *</label>
          <select
            name="sizeSystem"
            required
            className="w-full border p-2 rounded"
            onChange={handleChange}
          >
            <option value="">Select sizing system</option>
            {options.sizeSystem.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1">Location *</label>
          <input
            type="text"
            name="location"
            disabled
            className="w-full border p-2 rounded bg-gray-100"
            placeholder="Loading your location..."
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block mb-1">Brand *</label>
          <input
            type="text"
            name="brand"
            required
            className="w-full border p-2 rounded"
            placeholder="e.g. Aritzia, Nike, Zara"
            onChange={handleChange}
          />
        </div>

        {/* Condition */}
        <div>
          <label className="block mb-1">Condition *</label>
          <select
            name="condition"
            required
            className="w-full border p-2 rounded"
            onChange={handleChange}
          >
            <option value="">Select condition</option>
            {options.condition.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Colour */}
        <div>
          <label className="block mb-1">Colour *</label>
          <select
            name="color"
            required
            className="w-full border p-2 rounded"
            onChange={handleChange}
          >
            <option value="">Select colour</option>
            {options.colour.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Style Tags */}
        <div>
          <label className="block mb-1">Style Tags *</label>
          <select
            name="styleTags"
            multiple
            required
            className="w-full border p-2 rounded"
            onChange={handleChange}
          >
            {options.styleTags.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1">Description (optional)</label>
          <textarea
            name="description"
            className="w-full border p-2 rounded"
            placeholder="Add any extra details..."
            onChange={handleChange}
          />
        </div>

        {/* Trade Preferences */}
        <div>
          <label className="block mb-1">Trade Preferences (optional)</label>
          <textarea
            name="tradePreferences"
            className="w-full border p-2 rounded"
            placeholder='e.g. "Looking to trade for size 6 shoes"'
            onChange={handleChange}
          />
        </div>

        {/* Upload Images */}
        <div>
          <label className="block mb-1">Upload Photos (up to 4)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImages}
          />
        </div>

        {/* Preview */}
        <div className="flex gap-2 mt-2">
          {images.map((src, i) => (
            <img key={i} src={src} alt="preview" className="w-20 h-20 object-cover rounded" />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded mt-4 hover:bg-gray-800"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
}
