# 🍕 PizzaHub — Full-Stack Pizza Delivery Application

**OIBSIP (Oasis Infobyte) Internship — Web Development Track, Level 3, Task 1**

A production-shaped, full-stack pizza ordering and inventory management platform with separate User and Admin roles, a 4-step custom pizza builder, real payment integration, live order tracking, and automated low-stock alerts.

🔗 **Live app:** https://oibsip-phi.vercel.app
🔗 **Live API:** https://oibsip-gfey.onrender.com

---

## ✨ Features

### User side
- Registration with email verification (via [Resend](https://resend.com))
- JWT-based login and session persistence
- Forgot / reset password flow
- Dashboard with a curated pizza catalog ("Popular Pizzas")
- 4-step custom pizza builder (base → sauce → cheese → vegetables), driven by live inventory stock
- "Customize" any preset pizza (loads its recipe into the builder for editing)
- "Buy Now" for a one-click direct checkout of any preset pizza
- Order Summary with server-computed pricing
- Razorpay checkout (test mode)
- Live order status tracking (Order Received → In Kitchen → Sent to Delivery) via polling
- Order history ("My Orders")

### Admin side
- Separate admin login (not linked from the public registration flow)
- Inventory dashboard — view stock for all bases, sauces, cheeses, and vegetables, grouped by category
- Manual stock/threshold updates with inline editing
- Automatic stock decrement after every successfully paid order
- Automated low-stock email alerts via a scheduled `node-cron` job (every 30 minutes)
- Order management panel — view all orders with customer details, update order status with one click
- Status changes are reflected on the customer's tracking page within seconds (polling)

---

## 🛠️ Tech Stack

**Frontend**
- React 18 (Vite)
- React Router v6
- Tailwind CSS v4
- Axios

**Backend**
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT authentication, bcrypt password hashing
- Razorpay (test mode) for payments
- Resend (HTTP email API) for verification/reset emails
- node-cron for scheduled inventory monitoring

**Deployment**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📂 Project Structure

```
WebDev-L3-PizzaDeliveryApp/
├── client/                  # React frontend
│   ├── public/images/       # Static pizza/hero images
│   └── src/
│       ├── api/             # Axios call functions per resource
│       ├── components/      # ui/, layout/, builder/, landing/ primitives
│       ├── context/         # AuthContext, BuilderContext
│       ├── pages/           # auth/, user/, admin/ page components
│       ├── routes/          # ProtectedRoute, AdminRoute guards
│       ├── App.jsx
│       └── main.jsx
│
└── server/                  # Express backend
    ├── config/               # db.js, razorpay.js
    ├── models/                # User, Inventory, Pizza, Order
    ├── controllers/           # auth, inventory, pizza, order logic
    ├── routes/                # Route definitions per resource
    ├── middleware/            # JWT auth + admin-only guards
    ├── jobs/                  # lowStockCron.js
    ├── utils/                 # sendEmail, pricing, tokens, validators
    ├── seed.js                # Seeds inventory + pizza catalog
    └── server.js
```

---

## 🔑 Environment Variables

### `server/.env`
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=a_long_random_string

CLIENT_URL=http://localhost:5173

RESEND_API_KEY=your_resend_api_key

RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
```

### `client/.env`
```
VITE_API_URL=http://localhost:5000/api
```

A `.env.example` is provided in `server/` — copy it to `.env` and fill in real values. `.env` is gitignored and never committed.

---

## 🚀 Running Locally

### Backend
```bash
cd server
npm install
cp .env.example .env   # then fill in real values
npm run seed             # populates inventory + pizza catalog
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:5173`.

### Creating an admin account
There's no admin signup form by design (per the task's requirement that admin access not be reachable from the public registration flow). To create one locally:
1. Register a normal account and verify its email
2. In MongoDB Atlas (or a local Mongo client), manually change that user's `role` field from `"user"` to `"admin"`
3. Log in again at `/admin/login` (the JWT is signed with role at login time, so a fresh login is required after the change)

---

## 💳 Testing Payments (Razorpay Test Mode)

Razorpay's checkout widget opens in test mode. Recommended test method: select **Netbanking**, choose any bank, and click **Success** on the simulated bank page — this is the most reliable path in test mode and avoids card-specific test data.

If testing with a card instead, use Razorpay's official test card `4111 1111 1111 1111`, any future expiry, and any 3-digit CVV.

---

## ⚠️ Known Limitations

- **Email deliverability sandbox restriction**: the app uses Resend's free-tier sandbox sending domain (`onboarding@resend.dev`), which is pre-authenticated for reliable delivery but restricted to sending only to the email address associated with the Resend account used for this deployment. A custom authenticated domain would remove this restriction in a real production deployment; it was out of scope (cost/time) for this internship submission.
- Verification/reset emails may land in the recipient's spam folder on first contact, since the sandbox sending domain is new and unbranded. This is a deliverability/reputation characteristic, not a functional bug — the emails do arrive and their links work correctly.
- Stock decrement on payment uses an atomic MongoDB `$inc` operation but does not use a database transaction across the full order — under very high concurrent load on the same ingredient, this is a theoretical (not observed) edge case a production system would harden further.

---

## 🧑‍💻 Author

Naol Dera — Software Engineering student, Jimma University Institute of Technology
Built as part of the OIBSIP Web Development Internship, Level 3, Task 1.