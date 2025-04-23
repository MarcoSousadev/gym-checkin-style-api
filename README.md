# App

GympPass style app.

## RFs (Functional requeriments)

- [x] Should be possible to sign in;
- [x] Should be possible to log in;
- [x] Should be possible to obtain the profile of a logged user;
- [x] Should be possible to obtain the number of check-ins of the logged user;
- [x] Should be possible for the user to obtain his history of check-ins;
- [x] Should be possible to find nearby gym (10km)
- [x] Should be possible to find gym's by name
- [x] Should be possible for the user make a check-in;
- [x] Should be possible validate the user check-in;
- [x] Should be possible to sign in a gym;


## RNs (Bussiness Rules)

- [x] The user shouldn't sign-in with a duplicated e-mail;
- [x] The user can't make 2 check-ins same day;
- [x] The user can't make check-in if he/she is not nearby the gym;
- [x] The check-in can only be validated within 20 minutes;
- [ ] The check-in can only be validated by a admin;
- [ ] The gym can only be sign-in by a admin;
  

## RNFs (Not Functional Requirements )

- [x] The user password needs to be crypto
- [x] The data of the application needs to be persist in a PostgresSQL
- [x] All of the list needs to be paged with 20 items only;
- [ ] The user should be validade by a JWT (JSON Web Token)
