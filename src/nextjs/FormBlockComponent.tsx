// @ts-nocheck
'use client';

/**
 * FormBlockComponent - Client-side form component with state management
 *
 * Handles form state, validation, and submission to the API endpoint.
 * Used by BlockRenderer to render form blocks from Payload CMS.
 * Uses QwickApps themed form components for consistent styling.
 *
 * Copyright (c) 2025 QwickApps.com. All rights reserved.
 */

import React, { useState, FormEvent } from 'react';
import { Alert, CircularProgress, Box, Button as MuiButton } from '@mui/material';
import { Section, Text, Button, FormField, FormSelect, FormCheckbox, Captcha } from './framework';
import type { CaptchaProvider } from './framework';
import { useSettings } from './SettingsProvider';

interface FormFieldConfig {
  fieldName: string;
  label: string;
  inputType: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select' | 'checkbox';
  required?: boolean;
  placeholder?: string;
  options?: Array<{
    label: string;
    value: string;
  }>;
}

interface FormBlockComponentProps {
  formId?: string;
  formName: string;
  heading?: string;
  description?: string;
  fields: FormFieldConfig[];
  submitButtonText?: string;
  successMessage?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  enableCaptcha?: boolean;
}

export function FormBlockComponent({
  formId,
  formName,
  heading,
  description,
  fields,
  submitButtonText,
  successMessage,
  padding,
  enableCaptcha = false,
}: FormBlockComponentProps) {
  const { settings } = useSettings();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Get CAPTCHA settings - only show if enabled both globally AND for this form
  const captchaProvider = (enableCaptcha && settings?.captcha?.provider) || 'none';
  const captchaSiteKey = settings?.captcha?.siteKey;

  const handleChange = (fieldName: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      if (field.required && !formData[field.fieldName]) {
        newErrors[field.fieldName] = `${field.label} is required`;
      }

      // Email validation
      if (field.inputType === 'email' && formData[field.fieldName]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.fieldName])) {
          newErrors[field.fieldName] = 'Please enter a valid email address';
        }
      }
    });

    // CAPTCHA validation
    if (captchaProvider && captchaProvider !== 'none' && !captchaToken) {
      setErrorMessage('Please complete the CAPTCHA verification');
      setErrors(newErrors);
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/form-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId,
          formName,
          formData,
          captchaToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setSubmitStatus('success');
      setFormData({});
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('There was an error submitting the form. Please try again.');
    }
  };

  if (submitStatus === 'success') {
    return (
      <Section padding={padding}>
        <Box sx={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
          <MuiButton
            variant="outlined"
            onClick={() => setSubmitStatus('idle')}
          >
            Submit Another Response
          </MuiButton>
        </Box>
      </Section>
    );
  }

  return (
    <Section padding={padding}>
      <Box sx={{ maxWidth: '600px', margin: '0 auto' }}>
        {heading && (
          <Text variant="h2" align="center" style={{ marginBottom: '16px' }}>
            {heading}
          </Text>
        )}
        {description && (
          <Text variant="body1" align="center" style={{ marginBottom: '32px', color: 'var(--theme-on-surface-variant)' }}>
            {description}
          </Text>
        )}

        {submitStatus === 'error' && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {fields.map((field, index) => {
              const fieldValue = formData[field.fieldName] || (field.inputType === 'checkbox' ? false : '');

              if (field.inputType === 'checkbox') {
                return (
                  <FormCheckbox
                    key={`${field.fieldName}-${index}`}
                    label={field.label}
                    checked={!!fieldValue}
                    onChange={(checked) => handleChange(field.fieldName, checked)}
                    required={field.required}
                    helperText={errors[field.fieldName]}
                  />
                );
              }

              if (field.inputType === 'select') {
                return (
                  <FormSelect
                    key={`${field.fieldName}-${index}`}
                    label={field.label}
                    value={fieldValue}
                    onChange={(value) => handleChange(field.fieldName, value)}
                    options={field.options || []}
                    required={field.required}
                    placeholder={field.placeholder}
                    helperText={errors[field.fieldName]}
                  />
                );
              }

              // All text-based inputs (text, email, tel, number, textarea)
              return (
                <FormField
                  key={`${field.fieldName}-${index}`}
                  label={field.label}
                  value={fieldValue}
                  onChange={(value) => handleChange(field.fieldName, value)}
                  type={field.inputType === 'textarea' ? 'text' : field.inputType}
                  multiline={field.inputType === 'textarea'}
                  rows={field.inputType === 'textarea' ? 4 : undefined}
                  required={field.required}
                  placeholder={field.placeholder}
                  helperText={errors[field.fieldName]}
                />
              );
            })}

            {/* CAPTCHA */}
            {captchaProvider && captchaProvider !== 'none' && captchaSiteKey && (
              <Captcha
                provider={captchaProvider as CaptchaProvider}
                siteKey={captchaSiteKey}
                onVerify={setCaptchaToken}
                onExpire={() => setCaptchaToken(null)}
                onError={(error) => {
                  console.error('CAPTCHA error:', error);
                  setErrorMessage('CAPTCHA verification failed. Please try again.');
                }}
              />
            )}

            <Button
              type="submit"
              variant="contained"
              buttonSize="large"
              disabled={submitStatus === 'submitting'}
              style={{ marginTop: '8px' }}
            >
              {submitStatus === 'submitting' ? (
                <>
                  <CircularProgress size={20} style={{ marginRight: '8px', color: 'inherit' }} />
                  Submitting...
                </>
              ) : (
                submitButtonText
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </Section>
  );
}
