import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/src/utils/cn";
import { Icon, type IconName } from "./icon";

const fieldBase =
  "w-full rounded-lg border border-ink-200 bg-white text-sm text-ink-900 placeholder:text-ink-400 transition-colors duration-150 hover:border-ink-300 focus:border-pine-500 focus:outline-none focus:ring-2 focus:ring-pine-500/20 disabled:cursor-not-allowed disabled:bg-paper-100 disabled:opacity-60";

export interface FieldProps {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  icon?: IconName;
  className?: string;
}

function FieldShell({
  label,
  hint,
  error,
  required,
  className,
  children,
}: FieldProps & { children: ReactNode }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label className="block text-sm font-medium text-ink-800">
          {label}
          {required && (
            <span className="ml-0.5 text-error-600" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-xs text-error-600" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-ink-500">{hint}</p>
      ) : null}
    </div>
  );
}

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    FieldProps {
  inputClassName?: string;
}

export function TextField({
  label,
  hint,
  error,
  required,
  icon,
  className,
  inputClassName,
  id,
  ...props
}: TextFieldProps) {
  const inputId = id ?? `field-${label?.replace(/\s+/g, "-").toLowerCase() ?? props.name ?? "input"}`;
  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <div className="relative">
        {icon && (
          <Icon
            name={icon}
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
          />
        )}
        <input
          id={inputId}
          className={cn(
            fieldBase,
            "h-11 px-4",
            icon && "pl-10.5",
            inputClassName
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />
      </div>
    </FieldShell>
  );
}

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    FieldProps {
  inputClassName?: string;
}

export function TextArea({
  label,
  hint,
  error,
  required,
  className,
  inputClassName,
  id,
  ...props
}: TextAreaProps) {
  const inputId = id ?? `field-${label?.replace(/\s+/g, "-").toLowerCase() ?? props.name ?? "textarea"}`;
  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <textarea
        id={inputId}
        className={cn(fieldBase, "px-4 py-3 resize-y", inputClassName)}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
        }
        {...props}
      />
    </FieldShell>
  );
}

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    FieldProps {
  options: { value: string; label: string }[];
  placeholder?: string;
  inputClassName?: string;
}

export function Select({
  label,
  hint,
  error,
  required,
  options,
  placeholder,
  className,
  inputClassName,
  id,
  ...props
}: SelectProps) {
  const inputId = id ?? `field-${label?.replace(/\s+/g, "-").toLowerCase() ?? props.name ?? "select"}`;
  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <div className="relative">
        <select
          id={inputId}
          className={cn(fieldBase, "h-11 appearance-none px-4 pr-10", inputClassName)}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          size={16}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400"
        />
      </div>
    </FieldShell>
  );
}
