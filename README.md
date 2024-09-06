# 1 Factor Authentication with Express.js and JWT

## About the Project

This project contains a source file for a server primarily for performing 1-factor authentication (1FA). The server can be deployed with minimum configuration (see about [How to Setup the Project](#how-to-setup-the-project)) on any platform for Node.js.

### Security Compliance

There are 4 main things I made sure to do in order to make to project complied with the security standards/practices.

1. Hasing password with bcrypt

2. Validating user inputs (both username and password)

3. Use prepared statement to prevent SQL injection

4. Sign JWT with a long, random string

If you want to increase the level of security, make sure the website uses HTTPS instead of HTTP, and **DO NOT** use user account with more than enough privilege for your database. 

## Tools and Dependencies

- Express.js ([`express`](https://www.npmjs.com/package/express))

- [`cors`](https://www.npmjs.com/package/cors)

- [`dotenv`](https://www.npmjs.com/package/dotenv)

- [`mysql2`](https://www.npmjs.com/package/mysql2) (for MySQL)

- JWT ([`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken))

- [`bcrypt`](https://www.npmjs.com/package/bcrypt)

- [`body-parser`](https://www.npmjs.com/package/body-parser)

- [`cookie-parser`](https://www.npmjs.com/package/cookie-parser)

- [`validator`](https://www.npmjs.com/package/validator)

- [`uuid`](https://www.npmjs.com/package/uuid)

## Development Tools

- [`nodemon`](https://www.npmjs.com/package/nodemon)

## How to Setup the Project

1. Clone the project using `git clone` command.

    ```git
    git clone https://github.com/ChanathipK/one-factor-authen.git
    ```

2. Run `npm install` command. Note that you have to install Node.js which will get you `npm` CLI tool automatically.

3. Create an environment variable file, either `.env.development` or `.env.production`.

    Example `.env.development`
    
    ```
    DB_HOST='127.0.0.1'
    DB_PORT='3306'
    MYSQL_USERNAME='root'
    MYSQL_PASS='1234'
    DATABASE='express_auth_sample'
    CORS_ORIGIN='http://127.0.0.1'
    SERVER_PORT='5000'
    SECRET='...'
    ```