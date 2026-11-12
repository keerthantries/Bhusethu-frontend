# Bhusethu Backend

Express API for property uploads and website contact forms.

## Run

```bash
npm install
npm run dev
```

Runs on `http://localhost:5000` (override with `PORT` in `.env`).

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Health check |
| GET | `/api/properties` | List uploaded properties |
| POST | `/api/properties` | Upload property (`multipart/form-data`, `images` field) |
| GET | `/api/contact` | List contact submissions |
| POST | `/api/contact` | Submit contact form |

Properties and contacts are stored in `data/*.json`; images in `uploads/`.

## V1 plan

1. Property upload + list (done)
2. Contact forms from Home, Contact and enquiry modal (done)
3. Admin authentication (next)
4. Database + image storage (next)
