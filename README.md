# BE - Unit 4

PVD: https://docs.google.com/document/d/1Os7tF6ugUC_3bFkN-WyqjIMbtXUx4Od9beoMa2XAgGg/edit?usp=sharing

Deployed URL: https://anywherefitness2.herokuapp.com/

## Endpoints

### Methods
| Endpoint | Method | Requirements |
|----------|--------|--------------|
| /api/auth/register | POST | username, password, full_name, signup_code (optional--only provide this if the user needs to be registered as an instructor) |
| /api/auth/login | POST | username, password |
| /api/auth/user/:id | PUT | none. (Provide any changes to be made in body object with their respective property name e.g 'password: "x1234"') |
| /api/classes | GET | Valid token in req.headers.authorization |

##### Query strings on [/api/classes]
/api/classes?type=1 will return all classes with a type of 1 (misc).

/api/classes?name=Yoga 101&cancelled=false - returns all classes with name _Yoga 101_ and _not_ cancelled

Search queries for this route support any class property. Refer to the class schema to see each property and their respective types.

#### Schema for /api/classes
| Name            | Type        | Required | Notes                                                                                                       |
|-----------------|-------------|----------|-------------------------------------------------------------------------------------------------------------|
| name            | String      | Yes      | Class's name. Unique to each class.                                                                         |
| type            | Int         | No       | Refers to the class's category. 1 = Misc, 2 = Yoga, 3 = Crossfit. Defaults to _1_ (misc) (if not provided). |
| start_time      | String date | Yes      | UTC Time. In format, _YYYY-DD-MM HH:MM:SS_                                                                  |
| durationHr      | Float       | Yes      | Refers to class length (in hours). Possible values: _1_,  _0.5_, _1.3_, and so on.                          |
| intensity_level | Int         | Yes      | Refers to class difficulty level. 1-3. _1_ being the easiest, and _3_ being the hardest.                    |
| location        | String      | Yes      | Class's location. e.g _Los Angeles, CA_                                                                     |
| attendees_amt   | Int         | No       | The amount of clients registered to attend a class. Defaults to _0_ (if not provided).                      |
| max_class_size  | Int         | No       | Max amount of clients a class can take. Defaults to _64_ (if not provided).                                 |
| cancelled       | bool        | No       | If the class has been cancelled or not. Defaults to _false_ (if not provided)                               |