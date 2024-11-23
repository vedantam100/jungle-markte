export function fetchAllProducts() {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/products') 
    const data = await response.json()
    resolve({data})
  }
  );
}
export function fetchSelectedProduct(id) {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://127.0.0.1:8080/products/' + id) 
    const data = await response.json()
    resolve({data})
  }
  );
}
export function fetchProductsByFilters(filter,sort,pagination) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10} 
  // TODO : on server we will support multi values in filter
  // console.log("error")
  let queryString = '';
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues.join(',')}&`; // Join the array values with commas
    }
  }
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
    // console.log(queryString);
  }
  // console.log(pagination)
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
    // console.log(queryString);
  }
  let data1

  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://127.0.0.1:8080/productfilter?'+queryString) 
    let data = await response.json()

    data1 = data.data
    resolve({data:{products:data1,totalItems:data.total_items}})
  }
  );
}
export function fetchBrands() {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://127.0.0.1:8080/brands') 
    const data = await response.json()
    resolve({data})
  }
  );
}
export function fetchCategories() {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://127.0.0.1:8080/categories') 
    const data = await response.json()
    resolve({data})
  }
  );
}
export function creatProduct(productInfo) {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    var response = await fetch('http://127.0.0.1:8080/products/' ,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productInfo)
    }) 
    var data = await response.json()
    resolve({data})
  }
  );
}

export function deleteProductById(productId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://127.0.0.1:8080/products/"+productId,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    resolve( {data} );
});
}