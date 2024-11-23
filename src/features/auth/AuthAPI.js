import { getCookie } from "../../app/Constants";
import { jwtDecode } from 'jwt-decode';

export function createUser(userData) {
    return new Promise(async (resolve) => {
        // console.log(userData);
        const response = await fetch("http://127.0.0.1:8080/users",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        var data = await response.json();
        // console.log(data)
        data = data.user
        resolve({ data });
    });
}

export function checkUser(loginInfo) {
    return new Promise(async (resolve) => {
        // console.log(loginInfo)
        const email = loginInfo.email;
        const password = loginInfo.password;
        const response = await fetch(`http://127.0.0.1:8080/users?email=${email}&password=${password}`);
        var data = await response.json();
        
        if (response.ok) {
            document.cookie = `ecommerce_token=${data.access_token}; max-age=86400; path=/;`;

            // Retrieve the token
            // const ecommerceToken = getCookie('ecommerce_token');
            // console.log('Retrieved Token:', ecommerceToken);  // Output the token to the console

            resolve({ data: data.user });
        } else {
            resolve({ message: data.msg });
        }
    });
}

// export function checkUser(loginInfo) {
//     return new Promise(async (resolve) => {
//         const response = await fetch("http://127.0.0.1:8080/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(loginInfo),
//         });

//         const data = await response.json();
        
//         if (response.ok) {
//             // Set the JWT token in a cookie
//             document.cookie = `access_token=${data.access_token}; max-age=86400; path=/; HttpOnly`;
//             resolve({ data: data });
//         } else {
//             resolve({ message: data.msg });
//         }
//     });
// }



export function LogOutUser(userId) {
    return new Promise(async (resolve) => {
        document.cookie = `ecommerce_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        resolve({ data: " Success " });
    });
}
export function forgetPassword(email) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://127.0.0.1:8080/users",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(email)
        });
        var data = await response.json();
        data = data.message
        resolve({ data });
    });
}

export function authUser() {
    return new Promise(async (resolve) => {
        const ecommerceToken = getCookie('ecommerce_token');
        if (ecommerceToken) {
            const info = jwtDecode(ecommerceToken);
            // console.log(info);
            resolve({ data : info });
        } else {
            console.log('User is not authenticated');
            resolve({ message: 'User is not authenticated' });
        }
    });
}
