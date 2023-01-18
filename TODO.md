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
- [ ]  **Session**: Create new session for make a payment

### Webhooks
- [ ]  Handle order created (in `controllers/ipn.controller.ts`)
- [ ]  Update order and send to vtex

### Finishing
- [ ]  Update Postman collection and copy to */docs* folder
- [ ]  Adapt and/or extend README.md
  - [ ]  Environment Variables
  - [ ]  Project Structure
  - [ ]  API Endpoints
  - [ ]  State Diagrams

### Testing
- [ ] Mongoose Models
  - [ ] Adapt Order
  - [ ] Adapt User
- [ ] Services
  - [ ] `services/provider.service.ts`
  - [ ] `services/vtex.service.ts`
  - [ ] `services/database/order.service.ts`
  - [ ] `services/database/user.service.ts`
- [ ] Middlewares
  - [ ] `middlewares/error.middleware.ts`
- [ ] Routes
  - [ ] `routes/ipn.routes.ts`   
  - [ ] `routes/vitals.routes.ts`
  - [ ] `routes/vtex.routes.ts`
  