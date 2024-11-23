export function addToCart(item) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://127.0.0.1:8080/cart",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        var data = await response.json();
        data = data.data
        resolve({ data });
    });
}
export function fetchItemByUserId(userId) {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://127.0.0.1:8080/cart?userId='+userId) 
      const data = await response.json()
    //   console.log(data);
      resolve({data})
    }
    );
  }
export function deleteItemFromCart(itemId) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://127.0.0.1:8080/cart",{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemId)
        });
        resolve({ data:{id:itemId.itemId} });
    });
}


// User Update Function Below 
export function updateUser(update) {
    return new Promise(async (resolve) => {
        // console.log(update);
        const response = await fetch("http://127.0.0.1:8080/cart",{
            method: 'PATCH',
            body: JSON.stringify(update),
            
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        resolve({ data });
    });
}
export function deleteUserCart(userId) {
    return new Promise(async (resolve) => {
        const response = await fetchItemByUserId(userId);
        const items = response.data;
        
        var bag=0
        for (var item of items) {
            await deleteItemFromCart({itemId: item.id , user : userId})
        }
        resolve({ status : "Success" });
        
    });
}
