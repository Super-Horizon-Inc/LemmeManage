import { AsyncStorage } from 'react-native';

export default class AuthService {

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    signin = () => {
        const customers = fetch("https://1433e97e5482.ngrok.io/lemme/user/signin", {
            method: 'POST',
            headers: {
                Accept : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({username: this.username, password: this.password})
            })
            .then(response => 
                response.json()            
            )
            .then(json => {
                AsyncStorage.setItem('user', json.accessToken);
                return json;

            })
            .catch(error => {                   
                console.error(error);
            });

        return customers;
    }

    signup = () => {
        const customers = fetch("https://1433e97e5482.ngrok.io/lemme/user/signup", {
            method: 'POST',
            headers: {
                Accept : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({username: this.username, password: this.password})
            })
            .then(response => 
                response.json()            
            )
            .then(json => {
                AsyncStorage.setItem('user', json.accessToken);
                return json;

            })
            .catch(error => {                   
                console.error(error);
            });
        return customers;
    }

    getCurrentUser = async () => {
        return await AsyncStorage.getItem('user');
    }

    logout = () => {
        AsyncStorage.removeItem('user');

        fetch("https://1433e97e5482.ngrok.io/lemme/user/logout", {
            method: 'GET',
            headers: {
                Accept : 'application/json',
                'Content-Type' : 'application/json'
            },
            })
            .then(response => 
                response.text()
            )
            .then(text => {
            })
            .catch(error => {                   
                console.error(error);
            });
    }

}