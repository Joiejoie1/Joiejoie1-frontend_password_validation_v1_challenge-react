
# HENNGE Frontend Password Validation Challenge (React)

This project is a solution for the HENNGE Frontend Password Validation Challenge. It implements a **Create User** form with client-side password validation and integration with the HENNGE API.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Getting Started](#getting-started)  
- [Environment Variables](#environment-variables)  
- [Project Structure](#project-structure)  
- [Usage](#usage)  
- [License](#license)  

---

## Project Overview

The challenge consists of creating a **React frontend form** for user registration that validates passwords based on strict criteria and submits them to the HENNGE API. The form must:

- Validate password input in real-time  
- Handle API success and error responses  
- Display proper accessible error messages  
- Use an **Authorization Bearer token** for API requests  

---

## Features

- **Password Validation Rules:**
  - At least 10 characters
  - At most 24 characters
  - No spaces
  - At least one number
  - At least one uppercase letter
  - At least one lowercase letter
- **API Integration:** POST request to `/challenge-signup` endpoint  
- **Error Handling:**
  - API errors (500)  
  - Unauthorized access (401/403)  
  - Disallowed passwords  
- **Accessibility:** Inputs have accessible names and `aria-invalid` attributes for screen readers  

---

## Getting Started

### Prerequisites

- Node.js 22+  
- pnpm 8+  
- Git  

### Installation

1. Clone the repository:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/REPO_NAME.git
cd REPO_NAME


2. Install dependencies:

pnpm install


Start the development server:

pnpm dev


Open the browser preview to see the Create User form.
