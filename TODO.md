# Provider - vtex
### Bootstrapping
- [X]  Run boilerplate-cli to generate a new app
- [X]  Change/add enviroment variables in `.env` file
- [X]  Configure the integration modifying the `config/app.ts`  file

### vtex functions
- [x]  **Manifest**: Create Manifest Endpoint and Function
- [x]  **Payment-Method**: Create Payment Methods Endpoint and Function
- [x]  **Payments**: Create Payments Endpoint and Function
- [x]  **Cancellations**: Create Cancellations Endpoint and Function
- [x]  **Refunds**: Create Refunds Endpoint and Function
- [x]  **Settlements**: Create Settlements Endpoint and Function

### Provider functions
- [x]  **Session**: Create new session for make a payment

### Webhooks
- [x]  Handle order created (in `controllers/ipn.controller.ts`)
- [x]  Update order and send to vtex

### Finishing
- [x]  Update Postman collection and copy to */docs* folder
- [x]  Adapt and/or extend README.md
  - [x]  Environment Variables
  - [x]  Project Structure
  - [x]  API Endpoints
  - [x]  State Diagrams

### Testing
- [x] Mongoose Models
  - [x] Adapt Order
  - [x] Adapt User
- [x] Services
  - [x] `services/provider.service.ts`
  - [x] `services/vtex.service.ts`
  - [x] `services/database/order.service.ts`
  - [x] `services/database/user.service.ts`
- [x] Middlewares
  - [x] `middlewares/error.middleware.ts`
- [x] Routes
  - [x] `routes/ipn.routes.ts`   
  - [x] `routes/vitals.routes.ts`
  - [x] `routes/vtex.routes.ts`
  