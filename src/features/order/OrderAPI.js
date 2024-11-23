export function createOrder(item) {
    return new Promise(async (resolve) => {
      // console.log(item);
        const response = await fetch("http://127.0.0.1:8080/order",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        const data = await response.json();
        // console.log(data)
        resolve({ data });
    });
}
export function fetchOrderById(orderId) {
    return new Promise(async (resolve) =>{
      // console.log(orderId);
      const response = await fetch("http://127.0.0.1:8080/order?orderId="+orderId) 
      const data = await response.json()
      // console.log(data)
      resolve({data})
    }
    );
  }
export function fetchAllOrderById(userId) {
return new Promise(async (resolve) =>{
    // console.log('http://localhost:8080/orders/?user.id=' + userId)
    const response = await fetch('http://127.0.0.1:8080/order?userId=' + userId) 
    const data = await response.json()
    // console.log(data)
    resolve({data})
}
);
}
export function fetchAllOrders() {
    return new Promise(async (resolve) =>{
      const response = await fetch('http://127.0.0.1:8080/order') 
      const data = await response.json()
      resolve({data})
    }
    );
  }
export function updateOrder(update) {
  return new Promise(async (resolve) => {
    // console.log(update)
    
      const response = await fetch("http://127.0.0.1:8080/order",{
          method: 'PATCH',
          body: JSON.stringify(update),
          
          headers: {
              'Content-Type': 'application/json'
          },
      });
      const data = await response.json();
      // console.log({data})
      resolve({ data });
  });
}