 - implement datatable for userItemList
 - implement flag borrowed
 - make redirection to list after userItem add/update save 
 - implement item /show
 - handle http request failures - actualize store/update itemUser flow 
 - add timestamps value object to every entity

- don't lose store after logout, but restrict in frontend - not show it (
add logged in interceptor on protected endpoints routes ?
)

- rebuild error messages - don't use modal, but bootstrap messaging
- rewrite dynamic error message component in auth component to usual one

- implement shelves


 
- implement items  list with search input and pointer 

- [minor] id should be add on backend and there should be action update id after 200 in state - which actualize id
frontend shouldn't be possible to change id - it's voulnerable.
 Not so impoartant since idis are encapsulated per user id now
- prepare local storage for storing items and sync with server
