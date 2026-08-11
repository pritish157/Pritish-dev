"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, Check, ChevronDown } from "lucide-react";

/**
 * Label Component — Form label with optional required star.
 */
export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn("block text-xs font-semibold uppercase tracking-wider text-slate-300 select-none", className)}
        {...props}
      >
        {children}
        {required && <span className="ml-1 text-rose-400">*</span>}
      </label>
    );
  }
);
Label.displayName = "Label";

/**
 * HelperText Component — Sub-text below input field.
 */
export type HelperTextProps = React.HTMLAttributes<HTMLParagraphElement>;

export const HelperText = React.forwardRef<HTMLParagraphElement, HelperTextProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn("text-xs text-slate-400 mt-1", className)} {...props}>
        {children}
      </p>
    );
  }
);
HelperText.displayName = "HelperText";

/**
 * ErrorMessage Component — Animated error callout line below input field.
 */
export type ErrorMessageProps = React.HTMLAttributes<HTMLParagraphElement>;

export const ErrorMessage = React.forwardRef<HTMLParagraphElement, ErrorMessageProps>(
  ({ className, children, ...props }, ref) => {
    if (!children) return null;
    return (
      <p
        ref={ref}
        role="alert"
        className={cn("flex items-center gap-1.5 text-xs text-rose-400 mt-1 font-medium", className)}
        {...props}
      >
        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
        <span>{children}</span>
      </p>
    );
  }
);
ErrorMessage.displayName = "ErrorMessage";

/**
 * Input Component — Styled input field with optional left/right icon slots.
 */
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, leftIcon, rightIcon, disabled, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {leftIcon && <span className="absolute left-3 text-slate-400 shrink-0 pointer-events-none">{leftIcon}</span>}
        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 backdrop-blur-md transition-all duration-200 focus:border-violet-500/50 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-violet-400/30 disabled:cursor-not-allowed disabled:opacity-50",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error && "border-rose-500/50 focus:border-rose-500 focus:ring-rose-400/30",
            className
          )}
          {...props}
        />
        {rightIcon && <span className="absolute right-3 text-slate-400 shrink-0 pointer-events-none">{rightIcon}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

/**
 * Textarea Component — Styled multi-line text input with character counter.
 */
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
  maxLength?: number;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, maxLength, value, onChange, ...props }, ref) => {
    const charCount = typeof value === "string" ? value.length : 0;

    return (
      <div className="relative w-full space-y-1">
        <textarea
          ref={ref}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className={cn(
            "w-full rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white placeholder-slate-500 backdrop-blur-md transition-all duration-200 focus:border-violet-500/50 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-violet-400/30 disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px] resize-y",
            error && "border-rose-500/50 focus:border-rose-500 focus:ring-rose-400/30",
            className
          )}
          {...props}
        />
        {maxLength && (
          <div className="text-right text-[11px] font-mono text-slate-500">
            {charCount}/{maxLength}
          </div>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

/**
 * Checkbox Component — Custom accessible check input.
 */
export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, checked, onChange, disabled, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <label htmlFor={inputId} className="inline-flex items-center gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          id={inputId}
          ref={ref}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <div className="flex h-5 w-5 items-center justify-center rounded-md border border-white/20 bg-white/[0.04] transition-all peer-checked:border-violet-500 peer-checked:bg-violet-600 peer-focus-visible:ring-2 peer-focus-visible:ring-violet-400/60 peer-disabled:opacity-50">
          <Check className="h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
        {label && <span className="text-sm font-medium text-slate-300">{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";

/**
 * Radio Component — Custom accessible radio option.
 */
export type RadioProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
};

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, checked, onChange, disabled, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <label htmlFor={inputId} className="inline-flex items-center gap-2.5 cursor-pointer select-none">
        <input
          type="radio"
          id={inputId}
          ref={ref}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-white/[0.04] transition-all peer-checked:border-violet-500 peer-focus-visible:ring-2 peer-focus-visible:ring-violet-400/60 peer-disabled:opacity-50">
          <div className="h-2.5 w-2.5 rounded-full bg-violet-400 opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
        {label && <span className="text-sm font-medium text-slate-300">{label}</span>}
      </label>
    );
  }
);
Radio.displayName = "Radio";

/**
 * Switch Component — Accessible toggle switch input.
 */
export type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
};

export function Switch({ checked, onChange, label, disabled = false, className }: SwitchProps) {
  return (
    <label className={cn("inline-flex items-center gap-3 cursor-pointer select-none", disabled && "opacity-50 cursor-not-allowed", className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60",
          checked ? "bg-violet-600" : "bg-white/10"
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
      {label && <span className="text-sm font-medium text-slate-300">{label}</span>}
    </label>
  );
}

/**
 * Select Component — Styled dropdown select control.
 */
export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
  options: { label: string; value: string }[];
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, options, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(
            "w-full appearance-none rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 pr-10 text-sm text-white backdrop-blur-md transition-all duration-200 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-400/30 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
            error && "border-rose-500/50 focus:border-rose-500 focus:ring-rose-400/30",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
      </div>
    );
  }
);
Select.displayName = "Select";
