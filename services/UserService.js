import AuthService from './AuthService.js';

export default class UserService {

    constructor() {}

    storeSetting = async (discount, password) => {

        const username = await new AuthService().getCurrentUsername();
        
        return await fetch("https://f4329af93339.ngrok.io/lemme/user/auth/setting", {
            method: 'PUT',
            headers: {
                Accept : 'application/json',
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({username:username, password:password, discount:discount})
            })
            .then(response => 
                response.json()          
            )
            .then(json => {
                //console.log(json);
                return json.message;
            })
            .catch(error => {                   
                console.error(error);
            });
    }

}