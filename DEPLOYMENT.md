# GitHub Pages Deployment Guide

## ⚠️ Important: Enable GitHub Pages First

Before the workflow can deploy, you **must** enable GitHub Pages in your repository settings.

## Step-by-Step Instructions

### 1. Enable GitHub Pages

1. Go to your repository: https://github.com/TechnoBlogger14o3/AlgoLab
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **"Build and deployment"**:
   - **Source**: Select **"GitHub Actions"** (NOT "Deploy from a branch")
   - Click **Save**

### 2. Verify Workflow Permissions

1. Still in **Settings**, go to **Actions** → **General**
2. Scroll down to **"Workflow permissions"**
3. Select **"Read and write permissions"**
4. Check **"Allow GitHub Actions to create and approve pull requests"** (optional)
5. Click **Save**

### 3. Trigger Deployment

After enabling Pages, the workflow will automatically run on the next push. Or you can manually trigger it:

1. Go to **Actions** tab
2. Select **"Deploy to GitHub Pages"** workflow
3. Click **"Run workflow"**
4. Select branch: **main**
5. Click **"Run workflow"**

### 4. Check Deployment Status

1. Go to **Actions** tab
2. Click on the latest workflow run
3. Wait for it to complete (usually 2-5 minutes)
4. Once successful, your site will be live at:
   - **https://technoblogger14o3.github.io/AlgoLab/**

## Troubleshooting

### Error: "Get Pages site failed"
- **Solution**: GitHub Pages is not enabled. Follow Step 1 above.

### Error: "Resource not accessible by integration"
- **Solution**: Check workflow permissions in Settings → Actions → General → Workflow permissions

### Error: "Not Found"
- **Solution**: Make sure you've enabled GitHub Pages and selected "GitHub Actions" as the source

### Private Repository
- **Note**: GitHub Pages for private repos requires GitHub Pro ($4/month) or higher
- **Alternative**: Use Netlify or Vercel (free tier supports private repos)

## Manual Deployment (Alternative)

If GitHub Actions doesn't work, you can deploy manually:

```bash
# Build the project
npm run build

# The dist folder contains the built files
# You can upload these to any static hosting service
```

## Need Help?

If you continue to have issues:
1. Check the Actions tab for detailed error messages
2. Verify GitHub Pages is enabled in Settings → Pages
3. Ensure workflow permissions are set correctly
