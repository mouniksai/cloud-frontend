# 🚀 Quick Azure Deployment Commands

## Deploy in 5 Minutes (Azure Portal Method)

### 1. Create Web App
```bash
# Login to Azure Portal
https://portal.azure.com

# Create Web App with these settings:
- Name: voteguard-frontend-2026
- Runtime: Node 20 LTS
- OS: Linux
- Region: East US (or match your backend)
```

### 2. Add Environment Variables
Go to Configuration > Application settings and add:
```
NEXT_PUBLIC_API_URL=https://voteguard-backend-2026.azurewebsites.net
NEXT_PUBLIC_CONTRACT_ADDRESS=0xE08b2c325F4e64DDb7837b6a4b1443935473ECB2
NEXT_PUBLIC_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/pzdCNUvpnwmLF32CHOX2b
NEXT_PUBLIC_ALCHEMY_API_KEY=pzdCNUvpnwmLF32CHOX2b
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_EXPLORER_URL=https://sepolia.etherscan.io
WEBSITE_NODE_DEFAULT_VERSION=20-lts
SCM_DO_BUILD_DURING_DEPLOYMENT=true
```

### 3. Deploy Code
```bash
# From your project directory
git add .
git commit -m "Deploy to Azure"

# Get deployment URL from Azure Portal > Deployment Center > Local Git
git remote add azure <YOUR_GIT_URL>
git push azure main:master
```

### 4. Set Startup Command
Go to Configuration > General Settings:
```
Startup Command: npm run start
```

### 5. Test Your App
```
https://voteguard-frontend-2026.azurewebsites.net
```

---

## Deploy via Azure CLI (Fastest for Developers)

```bash
# 1. Login
az login

# 2. Create resource group (if needed)
az group create --name voteguard-resources --location eastus

# 3. Create app service plan
az appservice plan create \
  --name voteguard-plan \
  --resource-group voteguard-resources \
  --sku B1 \
  --is-linux

# 4. Create web app
az webapp create \
  --resource-group voteguard-resources \
  --plan voteguard-plan \
  --name voteguard-frontend-2026 \
  --runtime "NODE:20-lts"

# 5. Set environment variables
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

# 6. Set startup command
az webapp config set \
  --resource-group voteguard-resources \
  --name voteguard-frontend-2026 \
  --startup-file "npm run start"

# 7. Deploy code
git init
git add .
git commit -m "Deploy to Azure"
az webapp deployment source config-local-git \
  --name voteguard-frontend-2026 \
  --resource-group voteguard-resources
git remote add azure <URL_FROM_ABOVE_COMMAND>
git push azure main:master

# 8. View logs
az webapp log tail \
  --resource-group voteguard-resources \
  --name voteguard-frontend-2026
```

---

## Useful Commands

### View Logs
```bash
az webapp log tail --name voteguard-frontend-2026 --resource-group voteguard-resources
```

### Restart App
```bash
az webapp restart --name voteguard-frontend-2026 --resource-group voteguard-resources
```

### Update Environment Variable
```bash
az webapp config appsettings set \
  --resource-group voteguard-resources \
  --name voteguard-frontend-2026 \
  --settings KEY=VALUE
```

### Test Backend Connection
```bash
curl https://voteguard-backend-2026.azurewebsites.net/api/health
```

### Test Frontend
```bash
curl https://voteguard-frontend-2026.azurewebsites.net
```

---

## Troubleshooting

### Build Failed?
```bash
# Check logs
az webapp log tail --name voteguard-frontend-2026 --resource-group voteguard-resources

# Verify package.json scripts
cat package.json | grep -A 5 '"scripts"'
```

### App Won't Start?
```bash
# Verify startup command
az webapp config show \
  --resource-group voteguard-resources \
  --name voteguard-frontend-2026 \
  --query "appCommandLine"

# Should return: npm run start
```

### Environment Variables Not Working?
```bash
# List all app settings
az webapp config appsettings list \
  --resource-group voteguard-resources \
  --name voteguard-frontend-2026 \
  --output table
```

---

## 📱 Test Your Deployment

1. **Frontend:** https://voteguard-frontend-2026.azurewebsites.net
2. **Backend:** https://voteguard-backend-2026.azurewebsites.net
3. **Check browser console** for any errors
4. **Test login flow** with MetaMask
5. **Verify API calls** in Network tab

---

For detailed instructions, see [AZURE_DEPLOYMENT.md](./AZURE_DEPLOYMENT.md)
