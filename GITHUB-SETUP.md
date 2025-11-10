# 🚀 GitHub Setup Guide

## ✅ Git Configuration Complete!

Your Git is now configured with:
- **Username:** EdmondAllan
- **Email:** 231501044@rajalakshmi.edu.in

---

## 🔧 Using Git in Kiro Terminal

### Every time you open a new Kiro terminal, run this first:

```powershell
.\refresh-git.ps1
```

Or manually refresh PATH:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

---

## 🔑 Setup GitHub Authentication

### Option 1: Personal Access Token (Easiest)

1. **Go to GitHub.com** and login
2. Click your profile picture → **Settings**
3. Scroll down → **Developer settings** (bottom left)
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token (classic)**
6. Fill in:
   - **Note:** `My PC - Intell Counselling`
   - **Expiration:** 90 days (or No expiration)
   - **Select scopes:** 
     - ✅ `repo` (all)
     - ✅ `workflow`
     - ✅ `write:packages`
7. Click **Generate token**
8. **COPY THE TOKEN** (you won't see it again!)

**Save your token somewhere safe!**

---

## 📤 Push Your Project to GitHub

### Step 1: Create New Repository on GitHub

1. Go to **https://github.com/new**
2. **Repository name:** `intell-counselling-app`
3. **Description:** `Intel Counselling Web Application with Razorpay Payment Integration`
4. Keep it **Public** or **Private** (your choice)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **Create repository**

### Step 2: Initialize Git in Your Project

First, refresh Git PATH:
```powershell
.\refresh-git.ps1
```

Then run these commands:

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Initial commit - Razorpay payment integration complete"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/EdmondAllan/intell-counselling-app.git
```

```bash
git push -u origin main
```

**When prompted for password:** Paste your Personal Access Token (not your GitHub password!)

---

## 🔄 Daily Git Workflow

### Before starting work:
```bash
.\refresh-git.ps1
git pull
```

### After making changes:
```bash
git add .
git commit -m "Description of changes"
git push
```

---

## 📋 Common Git Commands

**Check status:**
```bash
git status
```

**View commit history:**
```bash
git log --oneline
```

**Create a new branch:**
```bash
git checkout -b feature-name
```

**Switch branches:**
```bash
git checkout main
```

**Pull latest changes:**
```bash
git pull
```

**Push changes:**
```bash
git push
```

---

## 🐛 Troubleshooting

### "git: command not found" in Kiro terminal
**Solution:** Run `.\refresh-git.ps1` first

### "Authentication failed"
**Solution:** Use your Personal Access Token, not your password

### "fatal: not a git repository"
**Solution:** Run `git init` in your project folder

### Want to undo last commit?
```bash
git reset --soft HEAD~1
```

### Want to see what changed?
```bash
git diff
```

---

## 🎯 Next Steps

1. ✅ Git is configured
2. ⏳ Create GitHub repository
3. ⏳ Generate Personal Access Token
4. ⏳ Push your project to GitHub

---

## 📞 Quick Reference

**Your Git Config:**
- Name: EdmondAllan
- Email: 231501044@rajalakshmi.edu.in

**Refresh Git in Kiro:**
```powershell
.\refresh-git.ps1
```

**Push to GitHub:**
```bash
git add .
git commit -m "Your message"
git push
```

---

Ready to push your project to GitHub? Follow the steps above! 🚀
