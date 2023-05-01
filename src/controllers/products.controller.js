const { read, write } = require('../models/model');

exports.getFilters = (req, res) => {
	const query = req.query;
	const subCategories = read('subCategories');
	const products = read('products');

	if (Object.keys(query).length == 1 && query.categoryId != undefined) {
		const categoryId = query.categoryId;

		const filteredSubcategories = subCategories.filter(subCategory => {
			if (subCategory.category_id == categoryId) {
				subCategory.products = products.filter(
					p => p.sub_category_id == subCategory.sub_category_id
				);
				return subCategory;
			}
		});

		const result = filteredSubcategories.map(item => item.products).flat(1);

		res.JSON(200, JSON.stringify(result));
	} else if (Object.keys(query).length == 1 && query.subCategoryId != undefined) {
		const subCategoryId = query.subCategoryId;

		const filteredProducts = products.filter(product => product.sub_category_id == subCategoryId);
		res.JSON(200, JSON.stringify(filteredProducts));
	} else if (Object.keys(query).length == 2 && query.subCategoryId != undefined) {
		const subCategoryId = query.subCategoryId;
		const model = query.model;

		const filteredProducts = products.filter(product => {
			if (product.sub_category_id == subCategoryId && product.model == model) return product;
		});

		if (filteredProducts.length) {
			res.JSON(200, JSON.stringify(filteredProducts));
		} else {
			res.JSON(200, JSON.stringify({ status: 400, message: 'this model has no products' }));
		}
	} else if (Object.keys(query).length == 1 && query.model != undefined) {
		const model = query.model;

		const filteredProducts = products.filter(p => p.model == model);
		res.JSON(200, JSON.stringify(filteredProducts));
	} else {
		res.JSON(200, JSON.stringify([]));
	}
};

exports.postProducts = async (req, res) => {
	try {
		const products = read('products');
		const { subCategoryId, productName, price, color, model } = JSON.parse(await req.body);

		products.push({
			product_id: products.at(-1).product_id + 1 || 1,
			sub_category_id: subCategoryId,
			model: model,
			product_name: productName,
			color: color,
			price: price,
		});
		write('products', products);
		res.JSON(201, JSON.stringify({ status: 201, message: 'product created !' }));
	} catch (error) {
		res.JSON(400, JSON.stringify({ status: 404, message: error.message }));
	}
};


exports.putProducts =  async (req, res) => {
	try {
		const products = read('products');

		const { productId, productName, price } = JSON.parse(await req.body);

		const filteredProducts = products.filter(p => p.product_id != productId);
		const deletedProduct = products.find(p => p.product_id == productId);

		filteredProducts.push({
			product_id: productId,
			sub_category_id: deletedProduct.sub_category_id,
			product_name: productName,
			color: deletedProduct.color,
			price: price,
		});
		write('products', filteredProducts);
		res.JSON(201, JSON.stringify({ status: 201, message: 'products Updated  !' }));
	} catch (error) {
		res.JSON(404, JSON.stringify({ status: 404, message: error.message }));
	}
}

exports.deleteProducts =  async (req, res) => {
	try {
		const products = read('products');

		const { productId } = JSON.parse(await req.body);
		const productIndex = products.findIndex(p => p.product_id == productId);
		if (productIndex != -1) {
			const deletedProduct = products[productIndex];
			const filteredProducts = products.filter(u => u.product_id != deletedProduct.product_id);

			write('products', filteredProducts);
			res.JSON(200, JSON.stringify({ status: 200, message: 'peoduct deleted !' }));
		} else {
			return res.JSON(400, JSON.stringify({ status: 404, message: 'product not found' }));
		}
	} catch (error) {
		res.JSON(400, JSON.stringify({ status: 404, message: error.message }));
	}
}

