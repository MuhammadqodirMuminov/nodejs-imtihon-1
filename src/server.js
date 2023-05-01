const { createServer } = require('http');
const Express = require('./lib/express');

const adminController = require('./controllers/admin.controller');
const categoryController = require('./controllers/category.conytoller');
const subCategoriesController = require('./controllers/subcategory.controller');
const productsController = require('./controllers/products.controller');
const { readViews } = require('./models/model');

const server = createServer((req, res) => {
	const app = new Express(req, res);

	// VIEWS ROUTES

	app.GET('/', (req, res) => {
		const index = readViews('index', 'views', '.html');
		res.HTML(200, index);
	});

	app.GET('/routes', (req, res) => {
		const routes = readViews('routes', 'views', '.html');
		res.HTML(200, routes);
	});

	// ADMIN ROUTES

	app.POST('/signin', adminController.getAdmin);

	//  CATEGORY ROUTES

	app.GET('/categories', categoryController.getCategories);

	app.POST('/categories', categoryController.postCategories);

	app.PUT('/categories', categoryController.putCategory);

	app.DELETE('/categories', categoryController.deleteCategory);

	//  SUBCATEGORY ROUTES

	app.GET('/subcategories', subCategoriesController.getSubCategories);

	app.POST('/subcategories', subCategoriesController.postSubCategories);

	app.PUT('/subcategories', subCategoriesController.putSubCategories);

	app.DELETE('/subcategories', subCategoriesController.deleteSubCategory);

	// PRODUCTS ROUTES

	app.GET('/products', productsController.getFilters);

	app.POST('/products', productsController.postProducts);

	app.PUT('/products', productsController.putProducts);

	app.DELETE('/products', productsController.deleteProducts);
});

const PORT = process.env.PORT || 4100;
server.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
