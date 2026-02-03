# GitHub Pages Setup Instructions

## ⚠️ Important: Enable GitHub Pages First

The 404 error means GitHub Pages hasn't been enabled yet. Follow these steps:

## Step 1: Enable GitHub Pages

1. **Go to Repository Settings**
   - Visit: https://github.com/TechnoBlogger14o3/AlgoLab/settings/pages

2. **Configure Build and Deployment**
   - Under "Build and deployment" section:
   - **Source**: Select **"GitHub Actions"** (NOT "Deploy from a branch")
   - Click **Save**

## Step 2: Verify Workflow Permissions

1. **Go to Actions Settings**
   - Visit: https://github.com/TechnoBlogger14o3/AlgoLab/settings/actions

2. **Set Workflow Permissions**
   - Scroll to "Workflow permissions"
   - Select **"Read and write permissions"**
   - Check **"Allow GitHub Actions to create and approve pull requests"** (optional)
   - Click **Save**

## Step 3: Trigger Deployment

After enabling Pages, the workflow should run automatically. If not:

1. **Go to Actions Tab**
   - Visit: https://github.com/TechnoBlogger14o3/AlgoLab/actions

2. **Run Workflow Manually**
   - Click on **"Deploy to GitHub Pages"** workflow
   - Click **"Run workflow"** button (top right)
   - Select branch: **main**
   - Click **"Run workflow"**

## Step 4: Wait for Deployment

- The workflow will take 2-5 minutes to complete
- You can watch the progress in the Actions tab
- Once complete, the site will be live at:
  - **https://technoblogger14o3.github.io/AlgoLab/**

## Troubleshooting

### If workflow fails:
1. Check the Actions tab for error messages
2. Ensure GitHub Pages is enabled (Step 1)
3. Ensure workflow permissions are set (Step 2)
4. Make sure the workflow file exists: `.github/workflows/deploy.yml`

### If site shows 404:
- Wait a few minutes after enabling Pages
- Check if the workflow completed successfully
- Verify the base path in `vite.config.ts` is `/AlgoLab/`

## Quick Checklist

- [ ] GitHub Pages enabled in Settings → Pages
- [ ] Source set to "GitHub Actions"
- [ ] Workflow permissions set to "Read and write"
- [ ] Workflow has run successfully (check Actions tab)
- [ ] Site accessible at https://technoblogger14o3.github.io/AlgoLab/
