# Security Policy

## 🔐 Reporting a Vulnerability

We take the security of the E-Commerce Platform seriously. If you have discovered a security vulnerability, we appreciate your help in disclosing it to us in a responsible manner.

### How to Report a Security Vulnerability

**Please DO NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them using one of the following methods:

1. **Preferred Method**: Report via GitHub Security Advisories
   - Navigate to the [Security tab](https://github.com/PetreCostin/E-commerce-platform/security/advisories) of this repository
   - Click "Report a vulnerability"
   - Fill out the form with details about the vulnerability

2. **Alternative Method**: Email
   - Send an email to the repository owner with details about the vulnerability
   - Include "SECURITY" in the subject line
   - You can find the contact information in the repository owner's GitHub profile

### What to Include in Your Report

Please include the following information to help us better understand and resolve the issue:

- **Type of vulnerability** (e.g., SQL injection, XSS, authentication bypass, etc.)
- **Full paths of source file(s)** related to the vulnerability
- **Location of the affected source code** (tag/branch/commit or direct URL)
- **Step-by-step instructions to reproduce** the issue
- **Proof-of-concept or exploit code** (if possible)
- **Impact of the vulnerability** and how an attacker might exploit it
- **Suggested fix** (if you have one)

### Response Timeline

- **Initial Response**: We will acknowledge receipt of your vulnerability report within **3 business days**
- **Status Updates**: We will provide regular updates on our progress at least every **7 days**
- **Resolution Timeline**: We aim to resolve critical vulnerabilities within **30 days** of disclosure
- **Disclosure**: We will work with you to determine an appropriate disclosure timeline

### What to Expect

1. We will confirm the receipt of your vulnerability report
2. We will investigate and validate the vulnerability
3. We will work on a fix and may ask for additional information
4. We will notify you when the vulnerability is fixed
5. We will publicly acknowledge your responsible disclosure (if you wish)

## 🛡️ Security Measures in Place

This platform implements multiple security layers:

### Authentication & Authorization
- **JWT-based authentication** with secure token management
- **Role-based access control (RBAC)** for admin and user separation
- **BCrypt password hashing** with appropriate salt rounds
- **Session management** with token expiration

### Input Validation
- **Server-side validation** for all user inputs
- **SQL injection prevention** using parameterized queries
- **XSS protection** with input sanitization and output encoding
- **CSRF protection** for state-changing operations

### Data Protection
- **Encryption in transit** using HTTPS/TLS
- **Sensitive data encryption** at rest
- **Secure database credentials** management
- **Environment variable protection** for secrets

### Dependency Management
- **Dependabot** automated dependency updates
- **Regular security audits** of third-party libraries
- **CodeQL scanning** for vulnerability detection
- **Secret scanning** to prevent credential leaks

### Infrastructure Security
- **Docker containerization** for isolation
- **Principle of least privilege** for service accounts
- **Network segmentation** between services
- **Regular security updates** for base images

## 📋 Supported Versions

We provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < Latest| :x:                |

We recommend always using the latest version to ensure you have all security patches.

## 🔒 Security Best Practices for Contributors

If you're contributing to this project:

1. **Never commit secrets** (API keys, passwords, tokens) to the repository
2. **Use environment variables** for sensitive configuration
3. **Keep dependencies up to date** and review Dependabot PRs promptly
4. **Follow secure coding practices**:
   - Validate and sanitize all inputs
   - Use parameterized queries
   - Implement proper error handling without exposing sensitive information
   - Follow the principle of least privilege
5. **Review CodeQL scan results** and address any identified issues
6. **Write security tests** for authentication and authorization features
7. **Document security-relevant changes** in pull requests

## 📚 Additional Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Spring Security Documentation](https://spring.io/projects/spring-security)
- [React Security Best Practices](https://react.dev/learn/keeping-components-pure)
- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)

## 🏆 Security Hall of Fame

We would like to thank the following individuals for responsibly disclosing security vulnerabilities:

<!-- This section will be updated as security researchers report vulnerabilities -->

*No vulnerabilities have been reported yet.*

## 📝 Security Disclosure Policy

We follow a **coordinated disclosure** process:

1. Security researcher reports vulnerability privately
2. We validate and develop a fix
3. We release the security patch
4. After the patch is widely deployed (typically 30 days), we publicly disclose the vulnerability
5. We credit the researcher (with their permission)

Thank you for helping keep the E-Commerce Platform and our users safe!

---

**Last Updated**: January 2026
