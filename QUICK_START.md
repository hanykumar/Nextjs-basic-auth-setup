# Quick Start Guide - HK-Space Phase 1

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create Environment File**
   ```bash
   cp .env.example .env.local
   # Edit .env.local and change JWT_SECRET for production
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   # Server runs on http://localhost:3000
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## User Flows

### Registration Flow
1. User visits `/auth/register`
2. Fills email and password (8+ chars)
3. System creates user with bcrypt-hashed password
4. JWT token generated and set in httpOnly cookie
5. Redirected to `/dashboard`

### Login Flow
1. User visits `/auth/register`
2. Enters email and password
3. System verifies password with bcrypt
4. JWT token generated and set in httpOnly cookie
5. Redirected to `/dashboard`

### Dashboard Access
1. `/dashboard` checks for valid JWT in cookie
2. If no token → redirect to `/auth/login`
3. If valid token → display user info and admin status
4. Logout button clears cookie and redirects to login

## API Endpoints

### Public Endpoints
- `GET /` - Homepage
- `GET /auth/login` - Login page
- `GET /auth/register` - Register page
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Authenticate user

### Protected Endpoints (require auth cookie)
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - Logout (clear cookie)
- `GET /dashboard` - User dashboard page

## File Organization

**Database Layer** (`lib/db/`)
- Database initialization, schema, CRUD operations

**Authentication** (`lib/auth/`)
- Password hashing, JWT tokens, secure cookies

**Validation** (`lib/utils/`)
- Input validation and error messages

**API Routes** (`app/api/auth/`)
- Authentication endpoints

**Pages** (`app/auth/`, `app/dashboard/`)
- User-facing forms and dashboards

**Components** (`components/`)
- Reusable UI components (Navigation)

**State Management** (`lib/context/`)
- React Context for auth state

## Key Technologies

| Layer | Tech | Purpose |
|-------|------|---------|
| **Database** | SQLite + better-sqlite3 | Local data persistence |
| **Auth** | bcrypt | Password hashing |
| **Tokens** | JWT | Stateless authentication |
| **Frontend** | React 19 | UI components |
| **Framework** | Next.js 16 | Full-stack framework |
| **Styling** | Tailwind CSS | Responsive design |
| **Language** | TypeScript | Type safety |

## Common Tasks

### Create Admin User
Edit `.env.local` to add an admin flag (not yet in UI):
```typescript
// In register flow, add:
const isAdmin = true; // For admin registration
```

### Debug Auth Issues
1. Check browser DevTools → Application → Cookies
2. Look for `hk_auth_token` cookie
3. Verify it's httpOnly and Secure (in prod)
4. Check server logs for errors

### Extend Authentication
- Add password reset: Create new API route
- Add email verification: Add verification table
- Add rate limiting: Use middleware
- Add audit logging: Add to database

## Security Notes

⚠️ **Production Checklist:**
- [ ] Change `JWT_SECRET` in `.env.local`
- [ ] Enable HTTPS (secure cookies require it)
- [ ] Add rate limiting on auth endpoints
- [ ] Enable email verification
- [ ] Set up monitoring/logging
- [ ] Regular security audits
- [ ] Backup database regularly
- [ ] Use strong JWT_SECRET (32+ chars)

## Troubleshooting

**Issue: "Cannot open database"**
- Solution: Data directory is created automatically, check permissions

**Issue: "Invalid token"**
- Solution: Token expired or corrupted cookie, clear and re-login

**Issue: "User already exists"**
- Solution: Email already registered, use different email or reset DB

**Issue: Wrong password**
- Solution: Passwords are case-sensitive, check caps lock

**Issue: HTTPS required**
- Solution: In production, ensure `NODE_ENV=production` for secure cookies

## API Examples

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepass123",
    "passwordConfirm": "securepass123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepass123"
  }' \
  -c cookies.txt
```

### Get User (with cookie)
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -b cookies.txt
```

### Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -b cookies.txt
```

## Performance Tips

1. **Database**: SQLite with WAL is optimized for read-heavy workloads
2. **JWT Expiry**: Set to 7 days for balance between security and UX
3. **Bcrypt Rounds**: 10 rounds (~100ms hash time) is recommended
4. **Cookie Size**: Keep JWT payload minimal

## Next: Phase 2

Ready to implement:
- File listing from hard disk
- Upload/download handling
- Folder structure
- File metadata
- Permissions system

## Support

For issues or questions:
1. Check `PHASE_1_SUMMARY.md` for detailed info
2. Review API route implementations
3. Check browser console for client errors
4. Check server logs for backend errors

## License

Part of HK-Space Project
