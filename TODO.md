- extract resource endpoint definition from item.effects.ts to separate definition

- redirect do home when login token expires 

- fail on post request should call action remove item from store (must make distiction on two action remove item, remove from store) (which was add to state, but not saved in db)

- add timestamps value object to every entity

- load store after login

- don't lose store after logout, but restrict in frontend - not show it (
add logged in interceptor on protected endpoints routes ?
)

- rebuild error communicate - don't use modal, but bootstrap messaging
- remove dynamic error message component from auth component

- implement shelfes

- implement items /show, /edit 
- implement items  list with search input and pointer 

- [minor] id should be add on backend and there should be action update id after 200 in state - which actualize id
frontend shouldn't be possible to change id - it's voulnerable.
 Not so impoartant since idis are encapsulated per user id now
