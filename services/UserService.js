import AuthHeader from './AuthHeader.js';

export default class UserService {

    constructor() {

    }

    storeSetting = async (discount) => {

        const header = await AuthHeader();
        
        await fetch("https://cccea34872d6.ngrok.io/lemme/user/setting", {
            method: 'PUT',
            headers: {
                Accept : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization': header.Authorization
            },
            body: JSON.stringify(discount)
            })
            .then(response => 
                response.text()            
            )
            .then(text => {
                console.log(text);

            })
            .catch(error => {                   
                console.error(error);
            });
    }

    // getQualifiedCustomers = (discount) => {
    // }
}