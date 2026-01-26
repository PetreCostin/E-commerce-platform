# Security Configuration Guide

This document provides step-by-step instructions for configuring security features that require repository administrator access in GitHub.

## 📋 Table of Contents

1. [Dependabot Configuration](#1-dependabot-configuration)
2. [CodeQL Code Scanning](#2-codeql-code-scanning)
3. [Secret Scanning](#3-secret-scanning)
4. [Branch Protection Rules](#4-branch-protection-rules)
5. [Collaborator Permissions Audit](#5-collaborator-permissions-audit)
6. [Security Advisories](#6-security-advisories)

---

## 1. Dependabot Configuration

### ✅ Automated Configuration
The Dependabot configuration has been set up in `.github/dependabot.yml`.

### 🔧 Manual Steps Required

1. **Verify Dependabot is enabled**:
   - Go to repository **Settings** > **Security** > **Code security and analysis**
   - Under "Dependabot", ensure the following are enabled:
     - ✅ **Dependabot alerts**: Enabled
     - ✅ **Dependabot security updates**: Enabled
     - ✅ **Dependabot version updates**: Enabled (uses `.github/dependabot.yml`)

2. **Configure Dependabot secrets** (if needed):
   - Settings > Secrets and variables > Dependabot
   - Add any private registry credentials if using private packages

### 📝 What This Does
- Automatically checks for vulnerable dependencies
- Creates pull requests to update dependencies
- Monitors npm (frontend), Maven (backend), Docker, and GitHub Actions dependencies

---

## 2. CodeQL Code Scanning

### ✅ Automated Configuration
The CodeQL workflow has been set up in `.github/workflows/codeql.yml`.

### 🔧 Manual Steps Required

1. **Enable Code Scanning**:
   - Go to repository **Settings** > **Security** > **Code security and analysis**
   - Under "Code scanning", click **Set up** > **Advanced**
   - The workflow will run automatically on push, pull requests, and weekly schedules

2. **Review CodeQL Alerts**:
   - Navigate to **Security** > **Code scanning**
   - Review and triage any alerts
   - Dismiss false positives with justification

### 📝 What This Does
- Scans Java and JavaScript code for vulnerabilities
- Runs on every push to main/develop branches
- Runs on all pull requests
- Scheduled weekly scans every Monday
- Generates SARIF reports for security dashboard

---

## 3. Secret Scanning

### 🔧 Manual Steps Required

**Note**: Secret scanning is available for public repositories automatically, and for private repositories with GitHub Advanced Security.

1. **Enable Secret Scanning**:
   - Go to repository **Settings** > **Security** > **Code security and analysis**
   - Under "Secret scanning", click **Enable**
   - Options:
     - ✅ **Secret scanning**: Detect secrets in code
     - ✅ **Push protection**: Block commits containing secrets

2. **Enable Secret Scanning for Custom Patterns** (optional):
   - Settings > Security > Code security and analysis > Secret scanning
   - Click **Configure** > **New pattern**
   - Define custom regex patterns for organization-specific secrets

3. **Review Secret Alerts**:
   - Navigate to **Security** > **Secret scanning alerts**
   - Review any detected secrets
   - Revoke and rotate any exposed credentials

### 📝 What This Does
- Automatically scans commits for exposed secrets (API keys, tokens, passwords)
- Prevents accidental exposure of credentials
- Provides alerts when secrets are detected
- Supports 200+ secret patterns from popular services

### 🔐 Supported Secret Types
- AWS credentials
- Azure credentials
- Google Cloud credentials
- GitHub tokens
- Stripe API keys
- Database connection strings
- JWT secrets
- And many more...

---

## 4. Branch Protection Rules

### 🔧 Manual Steps Required

**Note**: Branch protection rules require repository admin access.

1. **Access Branch Protection Settings**:
   - Go to repository **Settings** > **Branches**
   - Under "Branch protection rules", click **Add rule**

2. **Configure Protection for `main` Branch**:

   **Branch name pattern**: `main`

   **Required Settings**:
   
   - ✅ **Require a pull request before merging**
     - ✅ Require approvals: **1** (minimum)
     - ✅ Dismiss stale pull request approvals when new commits are pushed
     - ✅ Require review from Code Owners (if using CODEOWNERS file)
   
   - ✅ **Require status checks to pass before merging**
     - ✅ Require branches to be up to date before merging
     - Select status checks:
       - `CodeQL Analysis (java)`
       - `CodeQL Analysis (javascript)`
       - Any CI/CD build jobs
       - Any test jobs
   
   - ✅ **Require conversation resolution before merging**
   
   - ✅ **Require signed commits** (recommended)
   
   - ✅ **Include administrators** (enforce rules for admins too)
   
   - ✅ **Restrict pushes that create matching branches**
     - Only allow specific users/teams to push
   
   - ✅ **Allow force pushes**: **Disabled**
   
   - ✅ **Allow deletions**: **Disabled**

3. **Configure Protection for `develop` Branch** (if applicable):
   - Repeat steps above with slightly relaxed rules if needed
   - Branch name pattern: `develop`

4. **Save Changes**:
   - Click **Create** or **Save changes**

### 📝 What This Does
- Prevents direct pushes to main branch
- Requires peer review before merging
- Ensures all tests and security scans pass
- Maintains code quality and security standards
- Enforces collaborative development practices

---

## 5. Collaborator Permissions Audit

### 🔧 Manual Steps Required

1. **Review Current Collaborators**:
   - Go to repository **Settings** > **Collaborators and teams**
   - Review all users and their access levels

2. **Apply Principle of Least Privilege**:

   **Access Levels**:
   - **Read**: Can view and clone the repository
   - **Triage**: Can manage issues and pull requests without write access
   - **Write**: Can push to the repository
   - **Maintain**: Can manage repository without access to sensitive actions
   - **Admin**: Full repository access

   **Recommended Assignments**:
   - Core maintainers: **Admin** (minimum number)
   - Regular contributors: **Write**
   - External contributors: **Triage** or **Read**
   - CI/CD bots: **Write** (use fine-grained tokens when possible)

3. **Review Team Permissions** (for organizations):
   - Settings > Collaborators and teams > Teams
   - Review each team's access level
   - Remove teams that no longer need access

4. **Implement Regular Audits**:
   - Schedule quarterly access reviews
   - Remove access for inactive collaborators
   - Document access decisions

5. **Use Fine-Grained Personal Access Tokens**:
   - For automation, use fine-grained tokens with minimal scopes
   - Set expiration dates on all tokens
   - Regularly rotate tokens

### 📝 Audit Checklist

- [ ] All collaborators have appropriate access levels
- [ ] No users have admin access unless necessary
- [ ] External contributors use fork-and-pull workflow
- [ ] CI/CD uses dedicated service accounts with minimal permissions
- [ ] Inactive users have been removed
- [ ] Team access is documented and justified
- [ ] Access review schedule is established

### 📊 Audit Log

Maintain a log of permission changes:

```markdown
| Date       | User        | Action               | Justification                  | Approved By |
|------------|-------------|----------------------|--------------------------------|-------------|
| YYYY-MM-DD | username    | Granted write access | Contributing to Feature X      | admin-name  |
| YYYY-MM-DD | old-user    | Removed access       | No longer with organization    | admin-name  |
```

---

## 6. Security Advisories

### 🔧 Manual Steps Required

1. **Enable Private Vulnerability Reporting**:
   - Go to repository **Settings** > **Security** > **Code security and analysis**
   - Enable **Private vulnerability reporting**

2. **Create Security Advisory** (when needed):
   - Navigate to **Security** > **Advisories**
   - Click **New draft security advisory**
   - Fill in vulnerability details:
     - Severity (Critical, High, Medium, Low)
     - CVE ID (if applicable)
     - Affected versions
     - Patched versions
     - Description and impact
     - Workarounds (if any)

3. **Coordinate Disclosure**:
   - Work with the reporter in a private fork
   - Develop and test the fix
   - Release security patch
   - Publish advisory after patch deployment

### 📝 What This Does
- Provides a secure channel for reporting vulnerabilities
- Allows coordinated disclosure
- Creates temporary private forks for fixes
- Generates security advisories visible to users

---

## 📊 Security Monitoring Dashboard

After configuration, monitor security from the **Security** tab:

- **Overview**: Security posture at a glance
- **Dependabot alerts**: Vulnerable dependencies
- **Code scanning alerts**: CodeQL findings
- **Secret scanning alerts**: Exposed credentials
- **Security advisories**: Published vulnerabilities

---

## ✅ Post-Configuration Verification

After completing all steps, verify:

1. [ ] Dependabot is creating PRs for dependency updates
2. [ ] CodeQL workflow runs successfully on each push
3. [ ] Secret scanning is actively monitoring commits
4. [ ] Branch protection prevents direct pushes to main
5. [ ] Only authorized collaborators have write access
6. [ ] Security advisories are enabled
7. [ ] All security features appear in the Security tab

---

## 🔄 Ongoing Maintenance

**Weekly**:
- Review and merge Dependabot PRs
- Check CodeQL scan results
- Monitor secret scanning alerts

**Monthly**:
- Review branch protection effectiveness
- Update security configurations as needed
- Review collaborator access

**Quarterly**:
- Conduct full security audit
- Review and update SECURITY.md
- Update security training for contributors
- Perform collaborator access audit

---

## 📚 Additional Resources

- [GitHub Security Features Documentation](https://docs.github.com/en/code-security)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [CodeQL Documentation](https://codeql.github.com/docs/)
- [Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)

---

**Last Updated**: January 2026
**Document Owner**: Repository Administrators
**Review Schedule**: Quarterly
