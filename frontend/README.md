# 🛍️ Marketplace Frontend — React Assessment

A simple yet functional **React Marketplace** frontend built for the technical assessment.  
This application integrates with the provided **Marketplace Backend API**, focusing on core functionality, clean code, and responsive design.

---

## 🚀 Tech Stack

- **React 18 (Vite)**
- **React Router DOM**
- **Axios** for API communication
- **Context API** for authentication & cart
- **Custom CSS** for clean UI
- **Backend API:** `http://localhost:3000/api`

---

## 🧩 Features Implemented

### ✅ Authentication
- Login form (POST `/api/auth/login`)
- JWT token stored in `localStorage`
- Protected routes via React Router
- Logout clears session and redirects to `/login`

### 🛒 Products
- Fetch products from `/api/products`
- Displays product **name**, **price**, and **image**
- Handles loading and error states gracefully
- Search and filter by price (min & max)
- Product details page (`/products/:id`)

### 🧺 Shopping Cart
- Add items to cart from list or details
- Update quantity or remove item
- Persistent cart state (Context API)
- Live total calculation
- Responsive slide-in cart panel

### 👤 User Profile
- Fetch logged-in user info from `/api/auth/profile`
- Edit profile (first/last name)
- Shows success and error messages

### 📦 Orders
- Fetch orders from `/api/orders`
- Displays order ID, items, total, and delivery status
- Order status badges (Delivered / Shipped / Pending)

### 💅 UI / UX
- Modern responsive layout
- Image fallback (“No image” placeholder)
- Loading & error messages across all pages
- Clean navbar with cart indicator & logout button
- Mobile-friendly grid and layout

---

## 🧱 Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Top navigation bar
│   ├── ProductCard.jsx     # Product item card
│   ├── Cart.jsx            # Cart side panel
├── pages/
│   ├── Login.jsx           # Login page
│   ├── Products.jsx        # Product list page
│   ├── ProductDetail.jsx   # Product detail page
│   ├── Profile.jsx         # Profile management page
│   └── Orders.jsx          # Orders listing
├── context/
│   ├── AuthContext.jsx     # Authentication logic
│   └── CartContext.jsx     # Cart state management
├── services/
│   └── api.js              # Axios setup and API calls
├── App.jsx                 # Routing and layout
├── main.jsx                # Entry point
└── index.css               # Global styles
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone and Install

```bash
git clone https://github.com/<your-username>/marketplace-frontend.git
cd marketplace-frontend
npm install
```

### 2️⃣ Run Backend (in another terminal)

```bash
cd backend
npm install
npm run dev
```

The backend should be running at:  
`http://localhost:3000/api`

### 3️⃣ Run Frontend

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🔐 Test Credentials

| Email | Password |
|-------|-----------|
| `john.doe@example.com` | `password123` |

---

## 🧾 API Endpoints Used

| Feature | Endpoint | Method |
|----------|-----------|--------|
| Login | `/api/auth/login` | POST |
| Products | `/api/products` | GET |
| Product Detail | `/api/products/:id` | GET |
| Orders | `/api/orders` | GET |
| Profile | `/api/auth/profile` | GET |
| Update Profile | `/api/auth/profile` | PUT |

---

## 🧠 Design & Implementation Notes

- **State Management:**  
  Used React Context API for authentication and cart handling.

- **API Handling:**  
  Configured Axios instance with interceptor to attach JWT automatically.

- **Error Handling:**  
  All API calls use `try/catch` with user-friendly messages and fallbacks.

- **Image Handling:**  
  Uses first image from `product.images[0]`.  
  Falls back to “No image” if loading fails or image missing.

- **Performance:**  
  Added `loading="lazy"` to all images for faster rendering.

- **Responsive Design:**  
  Works seamlessly across mobile, tablet, and desktop layouts.

---

## 🧮 Assessment Criteria Coverage

| Criteria | Status | Implementation |
|-----------|:------:|----------------|
| Login + Token | ✅ | AuthContext, localStorage |
| Product Listing | ✅ | `/api/products` endpoint |
| Product Details | ✅ | `/api/products/:id` |
| Cart Add/Update | ✅ | CartContext state |
| Code Structure | ✅ | Components + Contexts |
| Error Handling | ✅ | All API calls |
| Reusable Components | ✅ | ProductCard, Cart, Navbar |
| Loading States | ✅ | On all async fetches |
| Responsive Design | ✅ | CSS grid & flexbox |
| User Navigation | ✅ | Navbar + Protected routes |

---

## 🧑‍💻 Developer Notes

- Built with **Vite** for fast dev environment.
- Focused on **clarity, maintainability, and structure**.
- Handles **API errors, image loading issues**, and **state persistence**.
- Every feature tested with real API calls and fallback states.

---

## 🧩 Author

**Mohan Babu Doddapeneni**  

