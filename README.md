# BE - Unit 4

PVD: https://docs.google.com/document/d/1Os7tF6ugUC_3bFkN-WyqjIMbtXUx4Od9beoMa2XAgGg/edit?usp=sharing
Deployed URL:

## Endpoints

### Methods
| Endpoint | Method | Requirements |
|----------|--------|--------------|
| /api/auth/register | POST | username, password, full_name, signup_code (optional--only provide this if the user needs to be registered as an instructor) |
| /api/auth/login | POST | username, password |
| /api/auth/user/:id | PUT | none. (Provide any changes to be made in body object with their respective property name e.g 'password: "x1234"') |

#### Schema for x