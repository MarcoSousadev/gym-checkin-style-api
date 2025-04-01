# App

GympPass style app.

## RFs (Requisitos funcionais)

- [ ] Should be possible to sign in;
- [ ] Should be possible to log in;
- [ ] Should be possible to obtain the profile of a logged user;
- [ ] Should be possible to obtain the number of check-ins of the logged user;
- [ ] Should be possible for the user to obtain his history of check-ins;
- [ ] Should be possible to find near by gym
- [ ] Should be possible to find gym's by name
- [ ] Should be possible for the user make a check-in;
- [ ] Should be possible validate the user check-in;
- [ ] Should be possible to sign in a gym;


## RNs (Regras de negócio)

- [ ] The user shouldn't sign-in with a duplicated e-mail;
- [ ] The user can't make 2 check-ins same day;
- [ ] The user can't make check-in if he/she is not nearby the gym;
- [ ] The check-in can only be validated within 20 minutes;
- [ ] The check-in can only be validated by a admin;
- [ ] The gym can only be sign-in by a admin;
  

## RNFs (Requisitos não funcionais)

- [ ] The user password needs to be crypto
- [ ] The data of the application needs to be persist in a PostgressSQL
- [ ] All of the list needs to be paged with 20 items only;
- [ ] The user should be validade by a JWT (JSON Web Token)
