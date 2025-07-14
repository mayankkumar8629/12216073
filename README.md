# 12216073
# ✂️ Custom URL Shortener with Expiry

This is a custom URL shortener built using Node.js and MongoDB. It allows users to shorten URLs with optional custom short codes and set expiry durations in days. After the expiry, the shortened link becomes inactive.

---

## 🔧 Tech Stack

- **Node.js** (Express) for the backend
- **MongoDB** for storing URLs and metadata
- **Mongoose** for data modeling
- **Postman** / **Thunder Client** for testing

---

## 🚀 Features

- Accepts long URLs and returns shortened versions
- Custom short code support (user-defined slugs)
- Set expiry (in days); defaults to 30 if not provided
- Redirection to original URL using short code
- Basic click tracking (increments on each visit)
- Friendly error messages for all edge cases

---

## 📫 API Endpoints

### 🔗 `POST /api/shorten`
Create a new shortened URL

#### Request Body:
```json
{
  "originalUrl": "https://example.com/long-page",
  "customShortCode": "example123",      // optional
  "validityDays": 10                    // optional (defaults to 30)
}
