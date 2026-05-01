# 🚀 Quick Start - Google Sheets Integration

## ✅ What's Done

- Google Sheets service with authentication & retry logic
- Updated order system to use Sheets instead of CSV
- Environment variable configuration
- Initialization script
- Security (`.gitignore` updated)

---

## 📝 What You Need to Do

### **1. Get Spreadsheet ID**

Open your Google Sheet and copy the ID from URL:

```
https://docs.google.com/spreadsheets/d/{COPY_THIS_PART}/edit
```

### **2. Create `.env.local`**

In the project root (`twister-restaurant/`), create `.env.local`:

```env
GOOGLE_SHEETS_SPREADSHEET_ID=paste_your_spreadsheet_id_here
GOOGLE_SHEETS_SHEET_NAME=Orders
GOOGLE_SERVICE_ACCOUNT_EMAIL=twister-restaurant-account@tabeebak-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDhjAoOGDuEvPhX\nxNAnlCDR6koLEiEKhL0rk0BHH4sQJp+h6m+LzfWNkMpZ+nq2yk0sbbF9IDQAtQrf\njT16aUocsoRTE+emCTQinfsM8oK9OFKg3BwI725RnSFV9zUe1EYUD4rmiuY81GYg\nJPzggkdNDiQ0E5utnAwpyLzSvDXD6iWoaItEWUQbpWBHnYaFE1ptLqg0qMfEUUvO\nFk32kLeMzn6ZvMcIiMe6z16twfquP63e9X6r/EL9Sok8TiDFuKbVUu28xLkTFycn\nWEfVbOOmIAvB/UXVBdMxMzliN4B09w+0sBDXKaR8qnRedEM5oLDaLPVVqNE3dzqk\ndCaIzdCjAgMBAAECggEALPeIgarfIuWx9X2tqlZj/LXjMTXaFIjGVkuzQvrM9Nle\ndh+RQaQ8Uo8NaMcBdDP9EuCDxFiJRaLSmiNEoIUhW3tT2mRbiMTI+iXZCYnH+wWh\no6R+imGB8w+Kt+LjWlQj7Jf0r2X95R7LhZkaOYB/yqMJIMDQBtrXqfT1gGY5qedC\n32Jgw9PZ78gl+2UCUgyE+QxUxVDwI7m1sndM3fw/mKVTRpX/xaK97Vx9nVqgxsge\nsDiMjv0C0nONupeFScYiR77ewJc+kwCufORs6GokXtFnP9ShPDAiSzcW6cQ3lsNY\ncOk+3hIto5zhP6kCx9d63aSfJs0cbJ+nRBgzdCp7kQKBgQD4zaxTN5NgfMxnjs+5\nLFSIs/TI6CMHo1yDzl9PrXghXMUgr9ydjK0K6/fcHMagas8KHxN7GrFHhmzQT8rl\n9hVcal1x/IDoVnEnSP22d/6sH1R4EeYrexmCteHmPWTHw+I5MWaJnJbfs1YuxIjg\njXxYyhgrjDC5mxbl4g6rJYexbwKBgQDoEiiQfOkLFnDID+71c7pVAQchX3Rw6+bX\nq3IyQn2xo6fLyry7Lu1DGGKZnE0/gt0xwHJHwnq20lFvImhZyBYaiQfuGvrULi8U\nuUQoVLXzUx0e9/+SFi71s4WimHoioW2R5MmNWuuRsUJO1qb1Z/QrwtEtaITDripB\nzGYyOJASDQKBgQDx0HQ8LTe//4tq2xJpFvzSIJU47uWc9tlkAaABAMhRJKkzK7lw\nJtnIU6+C7zTdlPHFFI8KhtbmfXAkxmidOJ9qQravoopnRhyT4g0020taXtjqGftr\nJymUMNJtxB2/SlME406VUOwSX2rT6ZBfLyQ756+2I3r36hRHOX6oOMG5YQKBgQC7\nOEL/ZbYAGud7jtchr25IO18MPlzK6JU/snGbOGb802GAGBuwCsigU2DgOedb8HAQ\nPggz+iJTsVK/DIwQukmSuK/sGFn4qRWUa24f908ecRPSMxI8Qac60sxhgw8tNvwV\nMfSkFBBtZgpvXd4tpuKmFzH3pxVMZAp1MLfVliosVQKBgQDty6Lom2z4wNKaJHbY\n2+czJ0weIVaKh6t7NEdBZwvBofM8bzhehbtGfIeZ07jlqxHY688uPGf4BjEOgLhC\nIUU28FBC7jvp1SWznR7P2+MRLYCIojQ/6TRnABO4nbdZgTpOEU+930tgVy4PYPmN\nCm873lNPomJTJgZD427jFbHuEw==\n-----END PRIVATE KEY-----\n"
```

**⚠️ Copy the GOOGLE_PRIVATE_KEY from your service account JSON file (the file currently open in your editor)**

### **3. Share Your Sheet**

1. Open Google Sheet
2. Click **Share**
3. Add: `twister-restaurant-account@tabeebak-project.iam.gserviceaccount.com`
4. Permission: **Editor**
5. Click **Send**

### **4. Initialize the Sheet**

Run this command to create headers:

```bash
npm run sheet:init
```

### **5. Test**

```bash
npm run dev
```

Submit a test order and verify it appears in your Google Sheet.

---

## 🚀 Deploy to Vercel

1. Go to Vercel project → **Settings** → **Environment Variables**
2. Add all 4 variables from `.env.local`
3. **CRITICAL:** When pasting `GOOGLE_PRIVATE_KEY`, keep the `\n` characters (don't replace with line breaks)
4. Save and redeploy

---

## 📚 Full Documentation

See [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) for:

- Detailed troubleshooting
- Rate limits & performance
- Security considerations
- Production monitoring

---

## ❓ Need Help?

**Common issues:**

- **"Missing environment variables"** → Check `.env.local` exists and has all 4 variables
- **"Permission denied"** → Share sheet with service account email
- **"Invalid JWT"** → Copy private key exactly from JSON file (with `\n`)

**Files to check:**

- `src/lib/googleSheets.ts` - Core service
- `src/app/actions/saveOrder.ts` - Order saving logic
- `scripts/init-sheet.mjs` - Setup script
