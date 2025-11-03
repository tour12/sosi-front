
# Sosi Hair Store — Full Stack (HTML/CSS/JS + Node/Express + MySQL)

## 1) Requirements
- XAMPP (MySQL running)
- Node.js 18+

## 2) Setup
```bash
cd backend
cp .env.example .env
# edit DB creds if needed

npm install
# Create DB schema & seed
# In phpMyAdmin (http://localhost/phpmyadmin), run:
#   - database/schema.sql
#   - database/seed.sql
# Or via mysql CLI:
#   mysql -u root -p < ../database/schema.sql
#   mysql -u root -p sosi_hair_store < ../database/seed.sql

npm run start
```

API will run on http://localhost:3008

Open frontend directly: file path `frontend/index.html`, or serve the static helper route:
- http://localhost:3008/sosi-hair-store/frontend/index.html

## 3) Admin
- Go to: http://localhost:3008/sosi-hair-store/frontend/pages/admin/login.html
- Default admin:
  - email: admin@sosi.com
  - password: admin123

## 4) Notes
- Image uploads are saved to `backend/uploads/` and accessible at `/uploads/...`
- Cart is cookie-less and uses a cart code kept in localStorage.
- Payments are COD/BANK placeholder for MVP.
