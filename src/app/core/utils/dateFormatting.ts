const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
    'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

type DateInput = string | Date | null | undefined;

function toDate(value: DateInput): Date | null {
if (!value) return null;
const d = new Date(value);
return isNaN(d.getTime()) ? null : d;
} 

/** 2026-01-02T03:45:00Z -> "2-jan-2026" */
export function formatDate(value: DateInput): string {
const d = toDate(value);
if (!d) return '';
return `${d.getDate()}-${MONTHS[d.getMonth()]}-${d.getFullYear()}`;
}

/** 2026-01-02T03:45:00Z -> "03:45" */
export function formatTime(value: DateInput): string {
const d = toDate(value);
if (!d) return '';
const hh = String(d.getHours()).padStart(2, '0');
const mm = String(d.getMinutes()).padStart(2, '0');
return `${hh}:${mm}`;
}