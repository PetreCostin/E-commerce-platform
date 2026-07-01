# Security Policy

## 🔐 Reporting a Vulnerability

We take the security of the E-Commerce Platform seriously. If you have discovered a security vulnerability, please disclose it responsibly.

**Please DO NOT report security vulnerabilities through public GitHub issues.**

Instead, use one of the following methods:

1. **Preferred**: GitHub Security Advisories – navigate to the [Security tab](https://github.com/PetreCostin/E-commerce-platform/security/advisories), click "Report a vulnerability", and fill out the form.
2. **Alternative**: Email the repository owner with "SECURITY" in the subject line.

### What to Include

- Type of vulnerability (e.g. SQL injection, authentication bypass)
- Affected file paths, tags/branches/commits
- Step-by-step reproduction instructions
- Proof-of-concept or exploit code (if available)
- Suggested fix (if you have one)

### Response Timeline

| Stage            | Target       |
|------------------|--------------|
| Acknowledgement  | 3 business days |
| Status updates   | Every 7 days |
| Critical fix     | 30 days      |

## 🛡️ Security Measures

### Authentication & Authorization

- **JWT-based authentication** – tokens are signed with HMAC-SHA256 and validated on every request by `JwtAuthenticationFilter`
- **BCrypt password hashing** – strength 12; plain-text passwords are never stored or logged
- **Stateless sessions** – no server-side session state; `SessionCreationPolicy.STATELESS`
- **Role-based access control (RBAC)** – `ROLE_USER` and `ROLE_ADMIN` enforced via `@PreAuthorize` and the security filter chain

### CSRF

CSRF protection is **intentionally disabled** for this stateless REST API.

The API uses JWT tokens sent in the `Authorization: ****** request header. Because the token is stored in `localStorage` (not in a cookie), browsers do not automatically attach it to cross-origin requests. This means the standard CSRF attack vector does not apply, and disabling Spring's CSRF filter is the correct and documented approach for stateless JWT APIs.

If you add cookie-based session authentication to this application in the future, re-enable CSRF protection.

### Input Validation

- All user inputs are validated server-side with Jakarta Bean Validation (`@Valid`, `@NotBlank`, `@Email`, `@Size`, etc.)
- JPA parameterized queries prevent SQL injection

### CORS

- Allowed origins are read from the `app.cors.allowed-origins` environment variable (comma-separated)
- Default value covers local development only (`localhost:3000`, `localhost:5173`)
- Set `ALLOWED_ORIGINS` to your production domain before deploying

### Secrets Management

- The `JWT_SECRET` is read from the `JWT_SECRET` environment variable at runtime
- Docker Compose ships a placeholder default value; **override it in production** via a `.env` file or your secrets manager
- Sensitive defaults are **never** hard-coded in production code paths

### Dependency Management

- Dependabot monitors npm, Maven, Docker, and GitHub Actions dependencies
- CodeQL scans Java and JavaScript code for security issues
- Trivy scans the file system for known CVEs in CI

## 📋 Supported Versions

| Version | Supported          |
|---------|--------------------|
| Latest  | ✅                 |
| < Latest| ❌                 |

Always use the latest version to ensure all security patches are included.

## 🔒 Security Best Practices for Contributors

1. **Never commit secrets** (API keys, passwords, tokens)
2. **Use environment variables** for all sensitive configuration
3. **Keep dependencies up to date** and review Dependabot PRs promptly
4. **Validate and sanitize** all user inputs server-side
5. **Follow the principle of least privilege** for roles and service accounts
6. **Document security-relevant changes** in pull requests

## �� Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Spring Security Reference](https://docs.spring.io/spring-security/reference/)
- [OWASP JWT Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)

---

**Last Updated**: July 2026
