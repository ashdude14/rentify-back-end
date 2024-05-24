# To implement the Email Service 
## Import nodemailer package 
``` 
npm i nodemailer
```
<b> Create a temporary Email Account using Ethereal </b>

## Make configuration for Nodemailer

```js
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'madisen.nikolaus@ethereal.email', // temporary email address
        pass: 'WRz1CMEA87xAhFdVYK' // temporary password 
    }
});
```
### Set up the .env file
```
MONGO_URI=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=
HOST=smtp.ethereal.email
```

User Authentication Endpoints
Register User

URL: /api/users/register (done)
Method: POST
Description: Registers a new user (either buyer or seller) with their details.
Request Body: { firstName, lastName, email, phoneNumber, password, isSeller }
Login User

URL: /api/users/login (done)
Method: POST
Description: Authenticates a user and returns a JWT token.
Request Body: { email, password }
Get User Profile

URL: /api/users/profile (done)
Method: GET
Description: Retrieves the authenticated user's profile.
Protected: Yes
Property Management Endpoints
Add Property

URL: /api/properties (done)
Method: POST
Description: Allows a seller to add a new property.
Protected: Yes
Request Body: { title, description, price, address, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges }
Get All Properties

URL: /api/properties (done)
Method: GET
Description: Retrieves a list of all properties.
Get Seller's Properties

URL: /api/properties/myproperties (TBC)---->
Method: GET
Description: Retrieves properties posted by the authenticated seller.
Protected: Yes
Update Property

URL: /api/properties/:id (TBC) -->
Method: PUT
Description: Allows a seller to update details of a specific property.
Protected: Yes
Request Body: { title, description, price, address, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges }
Delete Property

URL: /api/properties/:id (TBC) -->
Method: DELETE
Description: Allows a seller to delete a specific property.
Protected: Yes
Interested Buyer Endpoints
Mark Interest in Property
URL: /api/properties/interest/:id (done)
Method: POST
Description: Allows a buyer to express interest in a property, and sends an email to the seller with buyer's details.
Protected: Yes
Extra Features (If Implemented)
Like a Property
URL: /api/properties/like/:id  (done)
Method: POST
Description: Allows a buyer to like a property and tracks the count.
Protected: Yes