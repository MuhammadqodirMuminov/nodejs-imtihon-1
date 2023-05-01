const { read, write } = require('../models/model');

exports.getCategories = (req, res) => {
	const categories = read('categories');
	const subCategories = read('subCategories');

	categories.map(category => {
		category.subCategories = subCategories.filter(c => c.category_id == category.category_id);
	});

	res.JSON(200, JSON.stringify(categories));
};

exports.postCategories = async (req, res) => {
	try {
		const categories = read('categories');
		const newCategory = JSON.parse(await req.body);

		categories.push({
			category_name: newCategory.categoryName,
			category_id: categories.at(-1).category_id + 1 || 1,
		});
		write('categories', categories);

		res.JSON(201, JSON.stringify({ status: 201, message: 'category created !' }));
	} catch (error) {
		res.JSON(400, JSON.stringify({ status: 404, message: error.message }));
	}
};

exports.putCategory = async (req, res) => {
	try {
		const categories = read('categories');

		const { categoryId, categoryName } = JSON.parse(await req.body);

		const filteredCategories = categories.filter(p => p.category_id != categoryId);

		filteredCategories.push({ category_id: categoryId, category_name: categoryName });
		write('categories', filteredCategories);
		res.JSON(201, JSON.stringify({ status: 201, message: 'Category Updated  !' }));
	} catch (error) {
		res.JSON(400, JSON.stringify({ status: 400, message: error.message }));
	}
};

exports.deleteCategory = async (req, res) => {
	try {
		const categories = read('categories');

		const deleteCategory = JSON.parse(await req.body);

		const categoryIndex = categories.findIndex(p => p.category_id == deleteCategory.categoryId);

		if (categoryIndex != -1) {
			const deletedCategory = categories[categoryIndex];
			const filteredCategories = categories.filter(
				c => c.category_id != deletedCategory.category_id
			);

			write('categories', filteredCategories);
			res.JSON(200, JSON.stringify({ status: 200, message: 'category deleted !' }));
		} else {
			return res.JSON(400, JSON.stringify({ status: 404, message: 'category not found' }));
		}
	} catch (error) {
		res.JSON(400, JSON.stringify({ status: 404, message: error.message }));
	}
};
