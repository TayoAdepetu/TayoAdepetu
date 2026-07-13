````md
# Healthcare Consultation Platform — MVP Engineering Specification

## Overview

This document defines the architecture, engineering standards, product requirements, directory structure, development principles, and implementation roadmap for building the MVP of a global-first healthcare consultation platform focused initially on Nigerians at home and abroad.

The platform enables healthcare professionals to:
- Create rich professional profiles
- Become discoverable
- Offer online consultations
- Manage availability and bookings
- Conduct audio/video sessions

Patients can:
- Discover professionals
- Book appointments
- Pay online
- Conduct consultations
- Receive AI-assisted guidance for choosing the right type of professional

The platform should be architected for future scalability into:
- AI-assisted healthcare navigation
- Telemedicine infrastructure
- Healthcare marketplace
- Medical social/professional network

---

# Core Product Philosophy

This is NOT merely a video consultation app.

This is:
- A professional identity platform for healthcare professionals
- A healthcare consultation marketplace
- A telemedicine infrastructure layer
- An AI-assisted patient routing platform

The MVP should prioritize:
1. Trust
2. Simplicity
3. Fast onboarding
4. Search/discovery
5. Booking
6. Reliable consultations
7. Clean UX
8. Scalability

---

# Technology Stack

## Frontend

### Mobile App
- React Native
- Expo
- TypeScript
- Expo Router
- React Query / TanStack Query
- Zustand (lightweight state management)

### Web App
- Next.js App Router
- TypeScript
- TailwindCSS
- Shadcn UI
- React Query

---

# Backend

## API Server
- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- Redis
- BullMQ (queues/jobs)
- JWT Authentication
- WebSocket Gateway

---

# Infrastructure

## Storage
- AWS S3 or Cloudflare R2

## Realtime
- WebSockets
- Agora OR Daily.co for video/audio calls

## Payments
- Flutterwave initially
- Stripe later

## Notifications
- Firebase Cloud Messaging
- Email provider (Resend/Postmark)

---

# Monorepo Structure

Everything MUST exist inside a single monorepo for full AI assistant context.

Use Turborepo.

```txt
healthcare-platform/
│
├── apps/
│   ├── mobile/                # React Native Expo app
│   ├── web/                   # Next.js website/app
│   ├── api/                   # NestJS backend
│   └── admin/                 # Optional future admin app
│
├── packages/
│   ├── ui/                    # Shared UI components
│   ├── types/                 # Shared TypeScript types
│   ├── config/                # Shared configs
│   ├── validation/            # Zod schemas
│   ├── utils/                 # Shared utilities
│   ├── api-client/            # Shared API SDK
│   └── constants/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── docs/
│
├── .env
├── turbo.json
├── package.json
└── README.md
````

---

# Engineering Standards

## General Rules

* Use strict TypeScript everywhere
* Never use `any`
* Use server-side validation
* Use Zod for DTO validation where applicable
* Prefer composition over inheritance
* Use clean architecture principles
* Keep business logic out of controllers/components
* Write reusable abstractions carefully
* Avoid premature optimization
* Build for maintainability

---

# Authentication

Use JWT auth with:

* Access tokens
* Refresh tokens
* Secure session handling

Supported auth:

* Email/password
* Google OAuth
* Apple Sign In (mobile)

Future:

* Phone authentication

---

# User System

IMPORTANT:
Users are NOT separated into fixed "patient" or "professional" accounts.

A single user may:

* Be a patient
* Be a professional
* Be both simultaneously

Architecture should support this.

---

# Core Database Models

## User

```ts
User {
  id
  email
  phoneNumber
  passwordHash
  firstName
  lastName
  profilePhoto
  roles
  createdAt
  updatedAt
}
```

---

## ProfessionalProfile

```ts
ProfessionalProfile {
  id
  userId
  headline
  bio
  yearsOfExperience
  languages
  consultationFee
  consultationModes
  country
  state
  city
  verifiedStatus
  verificationSubmittedAt
}
```

---

## Specialty

```ts
Specialty {
  id
  name
  slug
}
```

---

## ProfessionalSpecialty

```ts
ProfessionalSpecialty {
  professionalProfileId
  specialtyId
}
```

---

## Education

```ts
Education {
  id
  professionalProfileId
  institution
  degree
  fieldOfStudy
  startDate
  endDate
}
```

---

## EmploymentHistory

```ts
EmploymentHistory {
  id
  professionalProfileId
  organization
  position
  startDate
  endDate
}
```

---

## Certification

```ts
Certification {
  id
  professionalProfileId
  title
  issuingOrganization
  issueDate
}
```

---

## Appointment

```ts
Appointment {
  id
  patientId
  professionalId
  scheduledStart
  scheduledEnd
  status
  consultationMode
  paymentStatus
}
```

---

## AvailabilitySlot

```ts
AvailabilitySlot {
  id
  professionalProfileId
  dayOfWeek
  startTime
  endTime
  timezone
}
```

---

## Conversation

```ts
Conversation {
  id
}
```

---

## Message

```ts
Message {
  id
  conversationId
  senderId
  content
  createdAt
}
```

---

# MVP Features

# Phase 1 — Core MVP

## Authentication

* Signup
* Login
* Password reset
* OAuth

---

## Professional Profiles

Professionals should be able to:

* Create profile
* Add bio
* Add specialties
* Add education
* Add employment history
* Add certifications
* Add languages
* Add consultation fees
* Add profile image
* Set availability

Public professional profiles should be SEO-friendly on web.

Example:

```txt
/professionals/dr-jane-doe
```

---

## Discovery/Search

Patients should be able to:

* Search by specialty
* Search by symptoms keywords
* Search by language
* Search by country
* Search by consultation fee
* Search by availability

---

# AI-Assisted Professional Discovery

Patients may not know which type of professional they need.

Build an AI-assisted routing feature.

Example:

```txt
"I have chest pain and shortness of breath."
```

AI should:

* Analyze symptoms
* Recommend professional categories
* Suggest urgency level

IMPORTANT:
This is NOT diagnosis.

It is:

* Guidance
* Triage
* Routing

Add medical disclaimers everywhere.

---

# Booking System

Patients should be able to:

* View professional availability
* Book appointments
* Pay for appointments
* Receive reminders

Professionals should:

* Accept bookings
* Manage schedules
* Reschedule/cancel appointments

---

# Consultation System

Use Agora OR Daily.co SDKs.

Features:

* Video calls
* Audio calls
* Session rooms
* Session tokens
* Waiting room
* Call state tracking

DO NOT build WebRTC infrastructure manually.

---

# Messaging

MVP messaging should support:

* Text chat
* File attachments later

Users should NOT immediately see each other's private phone numbers.

Communication should happen within platform initially.

---

# Payments

Initial payment provider:

* Flutterwave

Features:

* Appointment payment
* Escrow-like holding
* Platform commission
* Refund support

Future:

* Stripe
* Subscriptions
* Wallets

---

# Notifications

Use:

* Push notifications
* Email notifications

Examples:

* Booking confirmation
* Appointment reminders
* Session starting alerts

---

# Verification System

Critical for trust.

Professionals should submit:

* Government ID
* Medical licenses
* Certifications

Admin reviews manually.

Verified professionals receive badge.

---

# Admin Dashboard

Admin features:

* View users
* Verify professionals
* Moderate content
* Handle reports
* Manage disputes
* View analytics

Admin can be built inside Next.js initially.

---

# API Design Principles

* REST API initially
* Use versioning
* Use DTO validation
* Return consistent response shapes

Example:

```ts
{
  success: true,
  data: {},
  message: ""
}
```

---

# Security Requirements

* Encrypt sensitive data
* Use HTTPS everywhere
* Rate limit APIs
* Protect against brute force
* Validate uploads
* Use signed URLs for uploads
* Audit important actions

---

# Performance Requirements

* Lazy load heavy screens
* Optimize mobile bundle size
* Paginate large queries
* Cache expensive queries
* Use Redis where useful

---

# Mobile UX Principles

The app should feel:

* Calm
* Professional
* Trustworthy
* Minimal
* Healthcare-grade

Avoid:

* Excessive animations
* Overly playful interfaces
* Clutter

---

# Design Direction

Design inspiration:

* LinkedIn
* Headway
* Headspace
* BetterHelp
* Airbnb
* Linear

Use:

* Clean spacing
* Excellent typography
* Professional colors
* Accessibility-first design

---

# API Modules (NestJS)

```txt
src/modules/
│
├── auth/
├── users/
├── professionals/
├── patients/
├── appointments/
├── availability/
├── messaging/
├── notifications/
├── payments/
├── ai/
├── admin/
└── uploads/
```

---

# Shared Packages

## packages/types

Shared TypeScript interfaces/types.

## packages/validation

Zod schemas.

## packages/api-client

Typed API SDK for web/mobile.

## packages/ui

Shared UI components.

---

# State Management

## Mobile

* Zustand
* React Query

## Web

* React Query
* Minimal global state

Avoid Redux unless absolutely necessary.

---

# Real-Time Features

Use WebSockets for:

* Chat
* Appointment updates
* Call events
* Notifications

---

# Future Features (NOT MVP)

DO NOT build these yet:

* EHR/EMR systems
* Insurance integrations
* Pharmacy marketplace
* AI diagnosis
* Prescription management
* Lab integrations
* Medical records system
* Social feed
* Community forums

---

# Development Workflow

* Build incrementally
* Ship vertical slices
* Prioritize working flows over perfect abstractions
* Avoid overengineering
* Use feature-based architecture

---

# Suggested MVP Development Order

## Step 1

Setup monorepo.

## Step 2

Setup auth system.

## Step 3

Build professional profile system.

## Step 4

Build search/discovery.

## Step 5

Build scheduling.

## Step 6

Build booking/payment.

## Step 7

Integrate video/audio consultations.

## Step 8

Build messaging.

## Step 9

Build admin moderation.

## Step 10

Add AI-assisted routing.

---

# Important Product Constraints

* This is NOT a diagnosis platform.
* This is NOT emergency healthcare.
* Users must be reminded to seek emergency services when needed.
* AI must never claim certainty.
* Medical disclaimers must exist in appropriate places.

---

# Final Engineering Principles

Always optimize for:

* Clarity
* Scalability
* Maintainability
* Developer experience
* User trust
* Reliability

Prefer:

* Simplicity over cleverness
* Clear abstractions over premature architecture
* Product usefulness over technical complexity

The MVP should feel:

* Premium
* Calm
* Trustworthy
* Fast
* Professional

```
```
