const Product = require("../models/product_db");
const Category = require("../models/categories_db");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const fs = require("fs");

const addProduct = async (req, res) => {
  try {
    console.log("Files received:", req.files); // Debugging line
    console.log("Data rece=eivd:", req.body.productImagesURL);
    
    const imageFiles = req.files;
  
    // Ensure the required fields exist
    const productImages = imageFiles.productImagesURL || [];
    const certifications = imageFiles.certifications || [];

    if (productImages.length === 0) {
      return res.status(400).json({ message: "No product images uploaded" });
    }

    if (certifications.length === 0) {
      return res.status(400).json({ message: "No certifications uploaded" });
    }

    // Upload both product images and certifications in parallel
    const imageUrls = await Promise.all(
      productImages.map(async (file) => {
        const uploadResult = await uploadOnCloudinary(file.path);
        return uploadResult ? uploadResult.url : null;
      })
    );

    const certificationsUrls = await Promise.all(
      certifications.map(async (file) => {
        const uploadResult = await uploadOnCloudinary(file.path);
        return uploadResult ? uploadResult.url : null;
      })
    );

    // Prepare the product data with both image URLs
    const productData = {
      ...req.body,
      productImagesURL: imageUrls.filter((url) => url !== null),
      certifications: certificationsUrls.filter((url) => url !== null),
    };


    // Create the new product
    const newProduct = await Product.create(productData);
    const category = await Category.findOne({ name: req.body.category });
   
    const subcategory = category.subcategories.find(sub => sub.name === req.body.subCategory);
   
    subcategory.items.push(newProduct._id);
    await category.save();
    // Respond with success
    res.status(200).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add product", error: error.message });
  }
};

module.exports = { addProduct };





