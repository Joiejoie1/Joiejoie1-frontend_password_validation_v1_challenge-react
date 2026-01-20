import type { CSSProperties, Dispatch, SetStateAction } from 'react';
import React, { useState } from 'react';

interface CreateUserFormProps {
  setUserWasCreated: Dispatch<SetStateAction<boolean>>;
}

function CreateUserForm({ setUserWasCreated }: CreateUserFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  // Client-side password validation
  function validatePassword(password: string): string[] {
    const errors: string[] = [];

    if (password.length < 10) errors.push('Password must be at least 10 characters long');
    if (password.length > 24) errors.push('Password must be at most 24 characters long');
    if (password.includes(' ')) errors.push('Password cannot contain spaces');
    if (!/[0-9]/.test(password)) errors.push('Password must contain at least one number');
    if (!/[A-Z]/.test(password)) errors.push('Password must contain at least one uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('Password must contain at least one lowercase letter');

    return errors;
  }

  // Handle form submission
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setApiError(null);

    const errors = validatePassword(password);
    setValidationErrors(errors);

    if (!username || errors.length > 0) return;

    submitForm();
  }

  // Submit to API
  async function submitForm() {
    try {
      const response = await fetch(
        'https://api.challenge.hennge.com/password-validation-challenge-api/001/challenge-signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsic29uaXFqampAZ21haWwuY29tIl0sImlzcyI6Imhlbm5nZS1hZG1pc3Npb24tY2hhbGxlbmdlIiwic3ViIjoiY2hhbGxlbmdlIn0.fESInhJY1IicBrGbMQpHWtKYZVnxlu7bWmuQEOkdkFs', // replace with real token
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.status === 401 || response.status === 403) {
        setApiError('Not authenticated to access this resource.');
        return;
      }

      if (response.status === 500) {
        setApiError('Something went wrong, please try again.');
        return;
      }

      const data = await response.json();

      if (!response.ok && data?.errors?.includes('not_allowed')) {
        setApiError('Sorry, the entered password is not allowed, please try a different one.');
        return;
      }

      if (response.ok) {
        setUserWasCreated(true);
      }
    } catch {
      setApiError('Something went wrong, please try again.');
    }
  }

  return (
    <div style={formWrapper}>
      <form style={form} onSubmit={handleSubmit} noValidate>
        {/* make sure the username and password are submitted */}
        {/* make sure the inputs have the accessible names of their labelsn */}
        {/* Username Input */}
        <label htmlFor="username" style={formLabel}>
          Username
        </label>
        <input
          id="username"
          style={formInput}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-required="true"
          aria-invalid={validationErrors.length > 0 || apiError ? 'true' : 'false'}
        />

        {/* Password Input */}
        <label htmlFor="password" style={formLabel}>
          Password
        </label>
        <input
          id="password"
          type="password"
          style={formInput}
          value={password}
          onChange={(e) => {
            const value = e.target.value;
            setPassword(value);
            setValidationErrors(validatePassword(value));
          }}
          aria-required="true"
          aria-invalid={validationErrors.length > 0 ? 'true' : 'false'}
        />

        {/* Display Client-side Validation Errors */}
        {validationErrors.length > 0 && (
          <ul style={errorList} role="alert">
            {validationErrors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}

        {/* Display API Errors */}
        {apiError && (
          <p style={apiErrorStyle} role="alert">
            {apiError}
          </p>
        )}

        <button style={formButton}>Create User</button>
      </form>
    </div>
  );
}

export { CreateUserForm };

const formWrapper: CSSProperties = {
  maxWidth: '500px',
  width: '80%',
  backgroundColor: '#efeef5',
  padding: '24px',
  borderRadius: '8px',
};

const form: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const formLabel: CSSProperties = {
  fontWeight: 700,
};

const formInput: CSSProperties = {
  outline: 'none',
  padding: '8px 16px',
  height: '40px',
  fontSize: '14px',
  backgroundColor: '#f8f7fa',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: '4px',
};

const formButton: CSSProperties = {
  outline: 'none',
  borderRadius: '4px',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  backgroundColor: '#7135d2',
  color: 'white',
  fontSize: '16px',
  fontWeight: 500,
  height: '40px',
  padding: '0 8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '8px',
  alignSelf: 'flex-end',
  cursor: 'pointer',
};

const errorList: CSSProperties = {
  color: 'red',
  marginTop: '4px',
  marginBottom: '4px',
};

const apiErrorStyle: CSSProperties = {
  color: 'red',
  fontWeight: 600,
  marginTop: '8px',
};
