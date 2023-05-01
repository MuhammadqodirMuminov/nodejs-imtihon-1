/* 
    /categories
    [
        {
            categoryId: 1,
            categoryName: 'electronics',
            subCategories: [
                {
                    subCategoryId: 1,
                    subCategoryName: 'smart phones'
                },
                {
                    subCategoryId: 2,
                    subCategoryName: 'televisions'
                },
                {
                    subCategoryId: 3,
                    subCategoryName: 'laptops'
                }
            ]
        },
        {
            categoryId: 2,
            categoryName: 'clothes',
            subCategories: [
                {
                    subCategoryId: 4,
                    subCategoryName: 'boots'
                },
                {
                    subCategoryId: 5,
                    subCategoryName: 'shirts'
                }
            ]
        }

    ]


    /subcategories
    [
        {
            subCategoryId: 1,
            subCategoryName: 'smart phones',
            products: [
                {
                    product_id: 1, 
                    model: 'redmi',   
                    productName: 'redmi note 6 pro', 
                    color: 'black', 
                    price: '140'
                },
                { 
                    product_id: 2, 
                    model: 'samsung', 
                    product_name: 'galaxy 7', 
                    color: 'red', 
                    price: '190' 
                },
                { 
                    product_id: 7,
                    sub_category_id: 1, 
                    model: 'iphone', 
                    product_name: '14', 
                    olor: 'red', 
                    price: '1000' 
                }
            ]
        }
    ]





    /products -> []

    /products?categoryId=1
    /products?subCategoryId=2
    /products?subCategoryId=1&model=samsung
    /products?model=samsung




    

    POST
    /categories
        categoryName
    PUT
    /categories
        categoryId categoryName
    
    DELETE
    /categories
        categoryId

    POST
    /subcategories
        categoryId, subCategoryName

    PUT
    /subcategories
        subCategoryId subCategoryName
    
    DELETE
    /subcategories
        subCategoryId





    
    POST
    /products
        subCategoryId, productName, price, color, model

    PUT
    /products
        productId productName price
    
    DELETE
    /products
        productId
    
    
*/



// github --> link
// file zip 

// 01.05 20:00

