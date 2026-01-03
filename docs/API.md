# Mwanzo Skills Campus - API Integration Documentation

## Overview

This document provides comprehensive API integration guidelines for connecting the Mwanzo Skills Campus frontend with a Java Spring Boot backend.

## Base Configuration

### Environment Variables

```env
# .env.local (for development)
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_API_TIMEOUT=30000

# .env.production
VITE_API_BASE_URL=https://api.mwanzo.co.ke/api/v1
```

### API Client Setup

Create an API client service for all HTTP requests:

```typescript
// src/services/apiClient.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('auth_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}
```

---

## API Endpoints by Module

### 1. Authentication Module

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/auth/register` | POST | Register new user | `{ email, password, name, phone }` | `{ userId, token }` |
| `/auth/login` | POST | User login | `{ email, password }` | `{ token, user }` |
| `/auth/logout` | POST | User logout | - | `{ success }` |
| `/auth/refresh` | POST | Refresh token | `{ refreshToken }` | `{ token }` |
| `/auth/forgot-password` | POST | Request password reset | `{ email }` | `{ success }` |
| `/auth/reset-password` | POST | Reset password | `{ token, newPassword }` | `{ success }` |
| `/auth/verify-email` | POST | Verify email | `{ token }` | `{ success }` |

**Spring Boot Controller Example:**

```java
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        // Implementation
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        // Implementation
    }
}
```

---

### 2. Courses Module

| Endpoint | Method | Description | Query Params | Response |
|----------|--------|-------------|--------------|----------|
| `/courses` | GET | List all courses | `category, level, sort, page, limit` | `{ courses[], total, page }` |
| `/courses/:slug` | GET | Get course details | - | `{ course }` |
| `/courses/:id/enroll` | POST | Enroll in course | - | `{ enrollment }` |
| `/courses/:id/progress` | GET | Get course progress | - | `{ progress, completedLessons[] }` |
| `/courses/:id/progress` | PUT | Update progress | `{ lessonId, completed }` | `{ progress }` |
| `/courses/featured` | GET | Get featured courses | `limit` | `{ courses[] }` |
| `/courses/trending` | GET | Get trending courses | `limit` | `{ courses[] }` |

**Data Models:**

```java
// Course.java
@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    private String slug;
    private String title;
    private String shortDescription;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @ManyToOne
    private Tutor tutor;
    
    @ManyToOne
    private Category category;
    
    private BigDecimal price;
    private BigDecimal originalPrice;
    private Double rating;
    private Integer reviewCount;
    private Integer studentCount;
    private String duration;
    private Integer lessonsCount;
    
    @Enumerated(EnumType.STRING)
    private Level level; // BEGINNER, INTERMEDIATE, ADVANCED
    
    private String thumbnail;
    private String previewVideo;
    private Boolean isTrending;
    private Boolean isFeatured;
    private LocalDateTime lastUpdated;
    
    @ElementCollection
    private List<String> whatYouLearn;
    
    @ElementCollection
    private List<String> requirements;
    
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<CurriculumSection> curriculum;
}
```

---

### 3. Users/Students Module

| Endpoint | Method | Description | Response |
|----------|--------|-------------|----------|
| `/users/me` | GET | Get current user profile | `{ user }` |
| `/users/me` | PUT | Update profile | `{ user }` |
| `/users/me/enrollments` | GET | Get enrolled courses | `{ enrollments[] }` |
| `/users/me/certificates` | GET | Get certificates | `{ certificates[] }` |
| `/users/me/applications` | GET | Get job applications | `{ applications[] }` |

---

### 4. Jobs Module

| Endpoint | Method | Description | Query Params | Response |
|----------|--------|-------------|--------------|----------|
| `/jobs` | GET | List all jobs | `type, location, skills, page` | `{ jobs[], total }` |
| `/jobs/:id` | GET | Get job details | - | `{ job }` |
| `/jobs/:id/apply` | POST | Apply for job | `{ coverLetter, resumeUrl }` | `{ application }` |
| `/jobs` | POST | Create job (Business) | `{ jobData }` | `{ job }` |
| `/jobs/:id` | PUT | Update job (Business) | `{ jobData }` | `{ job }` |
| `/jobs/:id` | DELETE | Delete job (Business) | - | `{ success }` |
| `/jobs/:id/applicants` | GET | Get applicants (Business) | - | `{ applicants[] }` |

---

### 5. Tutors Module

| Endpoint | Method | Description | Response |
|----------|--------|-------------|----------|
| `/tutors` | GET | List all tutors | `{ tutors[] }` |
| `/tutors/:id` | GET | Get tutor details | `{ tutor }` |
| `/tutors/apply` | POST | Apply to be tutor | `{ applicationId }` |
| `/tutors/me/courses` | GET | Get tutor's courses | `{ courses[] }` |
| `/tutors/me/earnings` | GET | Get earnings | `{ earnings }` |
| `/tutors/me/students` | GET | Get enrolled students | `{ students[] }` |

---

### 6. Payments Module (M-Pesa Integration)

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/payments/initiate` | POST | Initiate M-Pesa STK Push | `{ phone, amount, courseId }` | `{ checkoutRequestId }` |
| `/payments/callback` | POST | M-Pesa callback webhook | M-Pesa payload | - |
| `/payments/status/:id` | GET | Check payment status | - | `{ status, transaction }` |
| `/payments/history` | GET | Get payment history | - | `{ transactions[] }` |

**M-Pesa Integration Notes:**

```java
// MpesaService.java
@Service
public class MpesaService {
    
    private final String consumerKey = "YOUR_CONSUMER_KEY";
    private final String consumerSecret = "YOUR_CONSUMER_SECRET";
    private final String shortcode = "YOUR_SHORTCODE";
    private final String passkey = "YOUR_PASSKEY";
    
    public STKPushResponse initiateSTKPush(String phone, BigDecimal amount, String reference) {
        // 1. Generate access token
        // 2. Format phone number (254XXXXXXXXX)
        // 3. Generate timestamp and password
        // 4. Make STK Push request to Safaricom API
        // 5. Return checkout request ID
    }
}
```

---

### 7. Business/Employer Module

| Endpoint | Method | Description | Response |
|----------|--------|-------------|----------|
| `/business/register` | POST | Register business account | `{ business }` |
| `/business/me` | GET | Get business profile | `{ business }` |
| `/business/me/jobs` | GET | Get posted jobs | `{ jobs[] }` |
| `/business/me/dashboard` | GET | Dashboard stats | `{ stats }` |

---

### 8. Content/CMS Module

| Endpoint | Method | Description | Response |
|----------|--------|-------------|----------|
| `/content/about` | GET | Get about page content | `{ content }` |
| `/content/faq` | GET | Get FAQ content | `{ categories[] }` |
| `/content/testimonials` | GET | Get testimonials | `{ testimonials[] }` |

---

### 9. Support Module

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/support/ticket` | POST | Create support ticket | `{ type, subject, message }` | `{ ticketId }` |
| `/support/tickets` | GET | Get user's tickets | - | `{ tickets[] }` |
| `/contact` | POST | Submit contact form | `{ name, email, subject, message }` | `{ success }` |

---

### 10. Enterprise Module

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/enterprise/inquiry` | POST | Submit enterprise inquiry | `{ companyName, contactName, email, phone, employeeCount, message }` | `{ leadId }` |

---

## Security Configuration

### Spring Security Setup

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**").permitAll()
                .requestMatchers("/api/v1/courses/**").permitAll()
                .requestMatchers("/api/v1/jobs/**").permitAll()
                .requestMatchers("/api/v1/content/**").permitAll()
                .requestMatchers("/api/v1/users/**").authenticated()
                .requestMatchers("/api/v1/business/**").hasRole("BUSINESS")
                .requestMatchers("/api/v1/tutors/me/**").hasRole("TUTOR")
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:5173",
            "https://mwanzo.co.ke"
        ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

---

## Error Handling

### Standard Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      { "field": "email", "message": "Invalid email format" }
    ]
  },
  "timestamp": "2025-01-03T10:30:00Z"
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Validation Error |
| 500 | Server Error |

---

## Frontend Integration Examples

### Using React Query

```typescript
// src/hooks/useCourses.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/services/apiClient';

export function useCourses(params?: CourseQueryParams) {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: () => apiRequest<CoursesResponse>('/courses', { 
      method: 'GET',
      // Add query params
    }),
  });
}

export function useEnrollCourse() {
  return useMutation({
    mutationFn: (courseId: string) => 
      apiRequest<EnrollmentResponse>(`/courses/${courseId}/enroll`, {
        method: 'POST',
      }),
    onSuccess: () => {
      // Invalidate queries, show toast, etc.
    },
  });
}
```

---

## Database Schema (PostgreSQL)

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar_url VARCHAR(500),
    role VARCHAR(20) DEFAULT 'STUDENT',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Courses table
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    tutor_id UUID REFERENCES users(id),
    category_id UUID REFERENCES categories(id),
    price DECIMAL(10, 2),
    original_price DECIMAL(10, 2),
    rating DECIMAL(2, 1) DEFAULT 0,
    student_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_trending BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Enrollments table
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    course_id UUID REFERENCES courses(id),
    progress INTEGER DEFAULT 0,
    completed_at TIMESTAMP,
    enrolled_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- Jobs table
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    type VARCHAR(50),
    salary VARCHAR(100),
    description TEXT,
    posted_by UUID REFERENCES users(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Deployment Checklist

- [ ] Set up environment variables for production
- [ ] Configure CORS for production domains
- [ ] Set up SSL/TLS certificates
- [ ] Configure M-Pesa production credentials
- [ ] Set up database backups
- [ ] Configure logging and monitoring
- [ ] Set up CI/CD pipeline
- [ ] Configure rate limiting
- [ ] Set up email service (for notifications)
- [ ] Configure CDN for static assets

---

## Contact

For API integration support, contact the development team at dev@mwanzo.co.ke
