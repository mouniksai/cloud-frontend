# 🔧 Admin Authentication Deployment Fix

## Problem Summary

Admin authentication was failing in production (Azure) with:

- `[AUTH] No token provided for GET /validate-token`
- `401 Unauthorized` errors
- Working locally but not in deployment

## Root Cause

The admin dashboard was **only using cookies** without sending the `Authorization` header explicitly. In cross-origin deployments (especially Azure), cookies can be unreliable due to:

- CORS restrictions
- SameSite cookie policies
- HTTPS requirements for secure cookies

## ✅ What Was Fixed

### 1. **Added getCookie Utility**

Added the missing `getCookie` function to extract tokens from cookies in the admin dashboard.

### 2. **Updated All Admin API Calls**

Modified all fetch requests in the admin dashboard to send both:

- `credentials: 'include'` (for cookie support)
- `Authorization: Bearer ${token}` (explicit header - **primary method**)

**Files Updated:**

- `/app/admin/dashboard/page.js`
  - Token validation endpoint
  - Stats fetching
  - Periodic auth checks
  - Create election form
  - Add candidate form
  - Fetch elections dropdown

## 🚀 Required Backend Environment Configuration

### **CRITICAL: Azure Backend Environment Variables**

In your Azure App Service configuration, ensure these environment variables are set:

```bash
# CRITICAL: Set your production frontend URL
FRONTEND_URL=https://your-voteguard-frontend.azurewebsites.net

# OR if using custom domain
FRONTEND_URL=https://voteguard.yourdomain.com

# Other required variables
JWT_SECRET=your_production_jwt_secret_here
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=production
PORT=8080  # Azure uses 8080 by default
```

### How to Set in Azure Portal:

1. Go to Azure Portal → App Service (backend)
2. Navigate to **Configuration** → **Application settings**
3. Add/Update `FRONTEND_URL` with your **exact frontend URL**
4. **IMPORTANT:** No trailing slash!
   - ✅ Correct: `https://voteguard-frontend.azurewebsites.net`
   - ❌ Wrong: `https://voteguard-frontend.azurewebsites.net/`
5. Click **Save** and **Restart** the App Service

### Verify CORS Configuration

Your backend (`cloud-backend/server.js`) already has:

```javascript
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
```

This will automatically allow your production frontend once `FRONTEND_URL` is set.

## 🧪 How to Test

### 1. **Check Backend Logs in Azure**

After deploying and logging in:

```
[AUTH] Token valid for user <user_id>, role: admin
```

If you see this, authentication is working! ✅

### 2. **Browser DevTools Check**

Open Chrome DevTools → Network tab:

1. Look for `/api/admin/validate-token` request
2. Check **Request Headers** → Should include:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. Check **Response** → Should be `200 OK` with admin user data

### 3. **Quick Test Script**

Run this in the browser console while on the admin dashboard:

```javascript
console.log("Token:", document.cookie.match(/voteGuardToken=([^;]+)/)?.[1]);
```

If it returns a token, the cookie exists. The Authorization header ensures it's sent correctly.

## 🔍 Common Deployment Issues & Solutions

### Issue 1: Still Getting 401 After Fix

**Cause:** Backend `FRONTEND_URL` not set or incorrect
**Solution:**

1. Verify `FRONTEND_URL` in Azure backend settings
2. Restart Azure App Service
3. Clear browser cache and cookies
4. Login again

### Issue 2: CORS Errors in Console

**Cause:** Frontend URL doesn't match backend CORS origin
**Solution:**

```bash
# Backend should log on startup:
🌐 CORS Origin: https://your-actual-frontend-url.azurewebsites.net
```

If this doesn't match, update `FRONTEND_URL` environment variable.

### Issue 3: Cookie Not Being Set

**Cause:** Mixed HTTP/HTTPS or incorrect SameSite settings
**Solution:** Ensure both frontend and backend use HTTPS in production. The code already handles this:

```javascript
sameSite: process.env.NODE_ENV === "production" ? "none" : "lax";
secure: process.env.NODE_ENV === "production";
```

### Issue 4: Works in Incognito but Not Regular Browser

**Cause:** Stale cookies or cached credentials
**Solution:**

1. Clear all cookies for your domain
2. Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
3. Login again

## 📋 Deployment Checklist

Before deploying to production:

- [ ] Backend `FRONTEND_URL` environment variable set correctly
- [ ] Backend `JWT_SECRET` set to secure production value
- [ ] Backend `DATABASE_URL` pointing to production PostgreSQL
- [ ] Backend `NODE_ENV=production` set
- [ ] Frontend `.env.local` has correct `NEXT_PUBLIC_API_URL` pointing to backend
- [ ] Both frontend and backend deployed to HTTPS endpoints
- [ ] Test admin login flow in production
- [ ] Check browser DevTools Network tab for successful auth
- [ ] Verify backend logs show successful token validation

## 🎯 Quick Command Reference

### Deploy Frontend to Azure

```bash
cd /Users/mouniksai/Documents/cloud-frontend
npm run build
# Then deploy via Azure portal or CLI
```

### Deploy Backend to Azure

```bash
cd /Users/mouniksai/Documents/cloud-frontend/cloud-backend
# Ensure all dependencies are in package.json
npm install --production
# Deploy via Azure portal or CLI
```

### Check Logs in Azure

```bash
# Using Azure CLI
az webapp log tail --name voteguard-backend-2026 --resource-group your-resource-group
```

## 🔐 Security Notes

1. **Never commit `.env` or `.env.local` files** to Git
2. Use Azure Key Vault for sensitive secrets in production
3. Rotate `JWT_SECRET` periodically
4. Monitor authentication logs for suspicious activity
5. Set appropriate JWT expiration times (currently 1 hour)

## ✨ Verification After Deployment

1. **Login as admin** using your admin credentials
2. **Navigate to** `/admin/dashboard`
3. **Check console** - should see no errors
4. **Verify stats load** - system overview panel should display
5. **Try creating an election** - should work without 401 errors
6. **Check periodic auth** - dashboard should stay authenticated for 5 minutes

---

## Need Help?

If you still encounter issues:

1. **Check backend logs** in Azure Portal → Log Stream
2. **Verify environment variables** in Azure Portal → Configuration
3. **Test locally first** to ensure code changes work
4. **Compare local vs production** environment variables
5. **Clear all browser data** and try fresh login

---

**Last Updated:** 2026-03-02  
**Status:** ✅ Fixed and Deployed
