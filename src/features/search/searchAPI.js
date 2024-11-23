export function fetchSearchedProducts(query) {
    return new Promise(async (resolve) =>{
      //TODO: we will not hard-code server URL here
      const response = await fetch('http://127.0.0.1:8080/search/' + query) 
      const data = await response.json()
      resolve({data})
    }
    );
  }
  export function fetchFilteredProducts(product , filter , option) {
    // console.log(filter , option)
    return new Promise(async (resolve) =>{
      var data = {}
  
      product.forEach((product, index) => {
        if(product[filter] === option){
          data[index] = product;
        }
      })
      var data = Object.values(data);
      // console.log(data);
      resolve({data})
    });
  }