# 🚀 Azure Deployment Guide - VoteGuard Frontend

This guide will help you deploy your Next.js frontend to Azure App Service.

## 📋 Prerequisites

- Azure account with active subscription
- Azure CLI installed (or use Azure Portal)
- Git installed on your machine
- Your backend already deployed at: `https://voteguard-backend-2026.azurewebsites.net`

---

## 🎯 Method 1: Deploy via Azure Portal (Recommended for Beginners)

### Step 1: Create Azure Web App

1. **Go to Azure Portal**
   - Navigate to https://portal.azure.com
   - Click "Create a resource"
   - Search for "Web App" and click "Create"

2. **Configure Basic Settings**
   ```
   Resource Group: voteguard-resources (or create new)
   Name: voteguard-frontend-2026
   Publish: Code
   Runtime stack: Node 20 LTS
   Operating System: Linux
   Region: (Same as your backend)
   ```

3. **Configure Pricing**
   - Choose "Basic B1" or "Free F1" for testing
   - Click "Review + Create"
   - Click "Create" and wait for deployment

### Step 2: Configure Environment Variables

1. **Navigate to Configuration**
   - Go to your Web App resource
   - Click "Configuration" in the left menu
   - Click "Application settings"

2. **Add Environment Variables**
   Click "+ New application setting" for each:
   
   ```
   NEXT_PUBLIC_CONTRACT_ADDRESS = 0xE08b2c325F4e64DDb7837b6a4b1443935473ECB2
   NEXT_PUBLIC_RPC_URL = https://eth-sepolia.g.alchemy.com/v2/pzdCNUvpnwmLF32CHOX2b
   NEXT_PUBLIC_ALCHEMY_API_KEY = pzdCNUvpnwmLF32CHOX2b
   NEXT_PUBLIC_CHAIN_ID = 11155111
   NEXT_PUBLIC_API_URL = https://voteguard-backend-2026.azurewebsites.net
   NEXT_PUBLIC_EXPLORER_URL = https://sepolia.etherscan.io
   WEBSITE_NODE_DEFAULT_VERSION = 20-lts
   SCM_DO_BUILD_DURING_DEPLOYMENT = true
   ```

3. **Save Configuration**
   - Click "Save" at the top
   - Click "Continue" to restart the app

### Step 3: Deploy Code

#### Option A: Deploy from Local Git

1. **Set up Local Git**
   - In Azure Portal, go to "Deployment Center"
   - Select "Local Git"
   - Click "Save"
   - Copy the Git Clone URL

2. **Deploy from Terminal**
   ```bash
   # Initialize git if not already done
   git init
   git add .
   git commit -m "Initial commit for Azure deployment"
   
   # Add Azure remote
   git remote add azure <YOUR_GIT_CLONE_URL>
   
   # Deploy
   git push azure main:master
   ```

3. **Enter Credentials**
   - Use your Azure deployment credentials
   - Go to "Deployment Center" > "Local Git/FTPS credentials" to get/set credentials

#### Option B: Deploy from GitHub

1. **Push Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <YOUR_GITHUB_REPO_URL>
   git push -u origin main
   ```

2. **Connect Azure to GitHub**
   - In Azure Portal, go to "Deployment Center"
   - Select "GitHub"
   - Authorize and select your repository
   - Select branch: `main`
   - Click "Save"
   - Azure will automatically deploy from GitHub

### Step 4: Configure Startup Command

1. **Set Startup Command**
   - Go to "Configuration" > "General settings"
   - In "Startup Command" field, enter:
     ```
     npm run start
     ```
   - Click "Save"

### Step 5: Verify Deployment

1. **Check Deployment Logs**
   - Go to "Deployment Center" > "Logs"
   - Verify build and deployment succeeded

2. **Browse Your Site**
   - Click "Browse" at the top of your Web App resource
   - Or visit: `https://voteguard-frontend-2026.azurewebsites.net`

---

## 🎯 Method 2: Deploy via Azure CLI

### Step 1: Install and Login to Azure CLI

```bash
# Install Azure CLI (if not installed)
# macOS:
brew install azure-cli

# Login to Azure
az login
```

### Step 2: Create Resource Group (if needed)

```bash
az group create \
  --name voteguard-resources \
  --location eastus
```

### Step 3: Create App Service Plan

```bash
az appservice plan create \
  --name voteguard-plan \
  --resource-group voteguard-resources \
  --sku B1 \
  --is-linux
```

### Step 4: Create Web App

```bash
az webapp create \
  --resource-group voteguard-resources \
  --plan voteguard-plan \
  --name voteguard-frontend-2026 \
  --runtime "NODE:20-lts"
```

### Step 5: Configure Environment Variables

```bash
az webapp config appsettings set \
  --resource-group voteguard-resources \
  --name voteguard-frontend-2026 \
  --settings \
    NEXT_PUBLIC_CONTRACT_ADDRESS="0xE08b2c325F4e64DDb7837b6a4b1443935473ECB2" \
    NEXT_PUBLIC_RPC_URL="https://eth-sepolia.g.alchemy.com/v2/pzdCNUvpnwmLF32CHOX2b" \
    NEXT_PUBLIC_ALCHEMY_API_KEY="pzdCNUvpnwmLF32CHOX2b" \
    NEXT_PUBLIC_CHAIN_ID="11155111" \
    NEXT_PUBLIC_API_URL="https://voteguard-backend-2026.azurewebsites.net" \
    NEXT_PUBLIC_EXPLORER_URL="https://sepolia.etherscan.io" \
    WEBSITE_NODE_DEFAULT_VERSION="20-lts" \
    SCM_DO_BUILD_DURING_DEPLOYMENT="true"
```

### Step 6: Configure Startup Command

```bash
az webapp config set \
  --resource-group voteguard-resources \
  --name voteguard-frontend-2026 \
  --startup-file "npm run start"
```

### Step 7: Deploy Code

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial deployment"

# Configure deployment user (first time only)
az webapp deployment user set \
  --user-name <YOUR_USERNAME> \
  --password <YOUR_PASSWORD>

# Get deployment URL
az webapp deployment source config-local-git \
  --name voteguard-frontend-2026 \
  --resource-group voteguard-resources

# Deploy
git remote add azure <DEPLOYMENT_URL_FROM_ABOVE>
git push azure main:master
```

---

## 🎯 Method 3: Deploy using VS Code Azure Extension

### Step 1: Install Extension

1. Open VS Code
2. Install "Azure App Service" extension
3. Sign in to Azure

### Step 2: Deploy

1. Right-click on your project folder
2. Select "Deploy to Web App"
3. Follow the prompts:
   - Select subscription
   - Select "Create new Web App"
   - Enter name: `voteguard-frontend-2026`
   - Select Node.js runtime
   - Wait for deployment to complete

### Step 3: Configure Environment Variables

1. In VS Code, open Azure extension
2. Find your Web App
3. Right-click > "Open in Portal"
4. Follow Step 2 from Method 1 to add environment variables

---

## 🔧 Post-Deployment Configuration

### Enable HTTPS Redirect

```bash
az webapp update \
  --resource-group voteguard-resources \
  --name voteguard-frontend-2026 \
  --https-only true
```

### Configure CORS (if needed)

```bash
az webapp cors add \
  --resource-group voteguard-resources \
  --name voteguard-frontend-2026 \
  --allowed-origins 'https://voteguard-backend-2026.azurewebsites.net'
```

### Set up Custom Domain (Optional)

1. Go to "Custom domains" in Azure Portal
2. Click "Add custom domain"
3. Follow the instructions to verify and add your domain

---

## 📊 Monitoring and Troubleshooting

### View Logs

```bash
# Stream logs in real-time
az webapp log tail \
  --resource-group voteguard-resources \
  --name voteguard-frontend-2026

# Or in Azure Portal:
# Go to "Log stream" in your Web App resource
```

### Common Issues

#### Issue 1: Build Fails
**Solution:** Check that all dependencies are in `dependencies` (not `devDependencies`) in package.json

#### Issue 2: App Doesn't Start
**Solution:** 
- Verify startup command is set to `npm run start`
- Check logs for errors
- Ensure all environment variables are set

#### Issue 3: 404 on API Calls
**Solution:**
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check backend is running
- Test backend directly

#### Issue 4: Environment Variables Not Working
**Solution:**
- Environment variables in Azure override `.env.local`
- Restart the app after changing env vars
- Verify variable names start with `NEXT_PUBLIC_`

### Restart Your App

```bash
az webapp restart \
  --resource-group voteguard-resources \
  --name voteguard-frontend-2026
```

---

## 🔄 Continuous Deployment

### Set up GitHub Actions

Create `.github/workflows/azure-deploy.yml`:

```yaml
name: Deploy to Azure Web App

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_CONTRACT_ADDRESS: ${{ secrets.NEXT_PUBLIC_CONTRACT_ADDRESS }}
          NEXT_PUBLIC_RPC_URL: ${{ secrets.NEXT_PUBLIC_RPC_URL }}
          NEXT_PUBLIC_ALCHEMY_API_KEY: ${{ secrets.NEXT_PUBLIC_ALCHEMY_API_KEY }}
          NEXT_PUBLIC_CHAIN_ID: ${{ secrets.NEXT_PUBLIC_CHAIN_ID }}
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
          NEXT_PUBLIC_EXPLORER_URL: ${{ secrets.NEXT_PUBLIC_EXPLORER_URL }}
        
      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'voteguard-frontend-2026'
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: .
```

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Frontend accessible at `https://voteguard-frontend-2026.azurewebsites.net`
- [ ] Login page loads correctly
- [ ] Can connect to MetaMask
- [ ] Backend API calls work (check Network tab)
- [ ] Environment variables are loaded
- [ ] No console errors
- [ ] HTTPS is enforced
- [ ] Can complete full voting flow

---

## 🎉 Your Deployed URLs

- **Frontend:** `https://voteguard-frontend-2026.azurewebsites.net`
- **Backend:** `https://voteguard-backend-2026.azurewebsites.net`
- **Smart Contract:** `0xE08b2c325F4e64DDb7837b6a4b1443935473ECB2` (Sepolia)

---

## 📞 Need Help?

- Azure Documentation: https://docs.microsoft.com/azure/app-service/
- Next.js Deployment: https://nextjs.org/docs/deployment
- Check logs: `az webapp log tail --name voteguard-frontend-2026 --resource-group voteguard-resources`

---

## 🔐 Security Reminders

- ✅ Never commit `.env` files with real keys to GitHub
- ✅ Use Azure Application Settings for environment variables
- ✅ Enable HTTPS-only mode
- ✅ Set up Azure Key Vault for sensitive data (production)
- ✅ Configure proper CORS policies
- ✅ Keep dependencies updated: `npm audit fix`
