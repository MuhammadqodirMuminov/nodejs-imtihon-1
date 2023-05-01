const { read, write } = require('../models/model');

exports.getSubCategories = (req, res) => {
	const subCategories = read('subCategories');
	const products = read('products');

	subCategories.map(subCategory => {
		subCategory.products = products.filter(p => p.sub_category_id == subCategory.sub_category_id);
		delete subCategory.category_id;
	});

	res.JSON(200, JSON.stringify(subCategories));
};

exports.postSubCategories = async (req, res) => {
	try {
		const subCategories = read('subCategories');
		const newSubCategory = JSON.parse(await req.body);

		const existSubCategory = subCategories.filter(
			s => s.sub_category_name == newSubCategory.subCategoryName
		);

		if (existSubCategory.length) {
			return res.JSON(
				400,
				JSON.stringify({ status: 404, message: 'subCategories alrerady exist !' })
			);
		}

		subCategories.push({
			sub_category_id: subCategories.at(-1).sub_category_id + 1 || 1,
			category_id: newSubCategory.categoryId,
			sub_category_name: newSubCategory.subCategoryName,
		});
		write('subCategories', subCategories);
		res.JSON(201, JSON.stringify({ status: 201, message: 'subCategory created !' }));
	} catch (error) {
		res.JSON(400, JSON.stringify({ status: 404, message: error.message }));
	}
};

exports.putSubCategories = async (req, res) => {
	const subCategories = read('subCategories');

	const { subCategoryId, subCategoryName } = JSON.parse(await req.body);

	const subCategoryIndex = subCategories.findIndex(p => p.sub_category_id == subCategoryId);

	if (subCategoryIndex != -1) {
		const updateSubCategoryId = subCategories[subCategoryIndex];

		const filteredSubCategories = subCategories.filter(
			p => p.sub_category_id != updateSubCategoryId.sub_category_id
		);

		filteredSubCategories.push({
			sub_category_id: subCategoryId,
			category_id: updateSubCategoryId.category_id,
			sub_category_name: subCategoryName,
		});
		write('subCategories', filteredSubCategories);
		res.JSON(201, JSON.stringify({ status: 201, message: 'subCategory Updated  !' }));
	} else {
		return res.JSON(404, JSON.stringify({ status: 404, message: 'subCategory not found !' }));
	}
};

exports.deleteSubCategory = async (req, res) => {
	try {
		const subCategories = read('subCategories');

		const { subCategoryId } = JSON.parse(await req.body);

		const subCategoryIndex = subCategories.findIndex(p => p.sub_category_id == subCategoryId);

		if (subCategoryIndex != -1) {
			const deletedSubCategory = subCategories[subCategoryIndex];
			const filteredCategory = subCategories.filter(
				u => u.sub_category_id != deletedSubCategory.sub_category_id
			);

			write('subCategories', filteredCategory);
			res.JSON(200, JSON.stringify({ status: 200, message: 'subCategory deleted !' }));
		} else {
			return res.JSON(400, JSON.stringify({ status: 404, message: 'subCategory not found' }));
		}
	} catch (error) {
		res.JSON(400, JSON.stringify({ status: 404, message: error.message }));
	}
};
