import React, { useState } from 'react'

export const PHONE_COUNTRIES = [
  { code: 'IN', label: 'India', dial: '91', len: 10 },
  { code: 'US', label: 'United States', dial: '1', len: 10 },
  { code: 'CA', label: 'Canada', dial: '1', len: 10 },
  { code: 'GB', label: 'United Kingdom', dial: '44', len: 10 },
  { code: 'AE', label: 'UAE (Dubai)', dial: '971', len: 9 },
  { code: 'SA', label: 'Saudi Arabia', dial: '966', len: 9 },
  { code: 'QA', label: 'Qatar', dial: '974', len: 8 },
  { code: 'KW', label: 'Kuwait', dial: '965', len: 8 },
  { code: 'OM', label: 'Oman', dial: '968', len: 8 },
  { code: 'BH', label: 'Bahrain', dial: '973', len: 8 },
  { code: 'SG', label: 'Singapore', dial: '65', len: 8 },
  { code: 'MY', label: 'Malaysia', dial: '60', len: 9 },
  { code: 'AU', label: 'Australia', dial: '61', len: 9 },
  { code: 'NZ', label: 'New Zealand', dial: '64', len: 9 },
  { code: 'ZA', label: 'South Africa', dial: '27', len: 9 }
]

export default function PhoneField({ id = 'phone', required = true }) {
  const [code, setCode] = useState('IN')
  const [value, setValue] = useState('')
  const country = PHONE_COUNTRIES.find((c) => c.code === code) || PHONE_COUNTRIES[0]

  const handleCountry = (event) => {
    const next = PHONE_COUNTRIES.find((c) => c.code === event.target.value)
    if (!next) return
    setCode(next.code)
    setValue((current) => current.slice(0, next.len))
  }

  const handleNumber = (event) => {
    setValue(event.target.value.replace(/\D/g, '').slice(0, country.len))
  }

  return (
    <div className="field phone-field">
      <label htmlFor={id}>Phone number {required ? '*' : ''}</label>
      <div className="phone-field__row">
        <select
          className="phone-field__code"
          value={code}
          onChange={handleCountry}
          aria-label="Country code"
        >
          {PHONE_COUNTRIES.map((c) => (
            <option value={c.code} key={c.code} title={c.label}>
              +{c.dial} {c.code}
            </option>
          ))}
        </select>
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={value}
          onChange={handleNumber}
          placeholder={`${country.len}-digit number`}
          maxLength={country.len}
          pattern={`[0-9]{${country.len}}`}
          title={`Enter a ${country.len}-digit phone number`}
          required={required}
          data-phone-input=""
        />
      </div>
      <input
        type="hidden"
        name="client_phone"
        value={value ? `+${country.dial} ${value}` : ''}
      />
    </div>
  )
}
