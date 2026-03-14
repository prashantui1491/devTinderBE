# list of Dev tinder apis

## authRouter:
    1. POST /signup
    2. POST /login
    3. POST /logout

## profileRouter:
    4. GET /profile/view
    5. PATCH /profile/edit
    6. PATCH /profile/password

## connectionRequesrRouter:
    7. POST /request/send/intrested/:userId
    8. POST /request/send/ignored/:userId
    9. POST /request/review/accepted/:requestId
    10. POST /request/review/rejected/:requestId

## userRouter:
    11. GET /user/connections
    12. GET /user/requests
    13. GET /user/feed - get profiles of other users


status: ignore, intrested, accepted, rejected
