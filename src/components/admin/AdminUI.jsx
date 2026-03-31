import clsx from "clsx";
import { Search, X } from "lucide-react";

const buttonVariants = {
  primary:
    "bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-500 text-slate-950 shadow-[0_16px_40px_rgba(56,189,248,0.26)] hover:shadow-[0_20px_48px_rgba(139,92,246,0.28)]",
  secondary:
    "border border-white/10 bg-white/[0.06] text-white hover:border-cyan-300/30 hover:bg-white/[0.1]",
  ghost: "border border-transparent bg-transparent text-slate-300 hover:bg-white/[0.05] hover:text-white",
  danger:
    "border border-rose-400/20 bg-rose-500/10 text-rose-100 hover:border-rose-300/40 hover:bg-rose-500/15",
};

export function AdminPageHeader({ eyebrow = "Admin Panel", title, description, actions, meta }) {
  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
      <div className="max-w-3xl">
        <p className="eyebrow-text">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">{title}</h1>
        {description ? (
          <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-[15px]">{description}</p>
        ) : null}
        {meta ? <div className="mt-5 flex flex-wrap gap-3">{meta}</div> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}

export function AdminBadge({ children, tone = "default", className = "" }) {
  const tones = {
    default: "border-white/10 bg-white/[0.05] text-slate-200",
    cyan: "border-cyan-300/20 bg-cyan-300/10 text-cyan-100",
    violet: "border-violet-300/20 bg-violet-400/10 text-violet-100",
    rose: "border-rose-300/20 bg-rose-400/10 text-rose-100",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-[0.14em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function AdminButton({
  as: Component = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  type = "button",
  ...props
}) {
  const sizeClasses = {
    sm: "px-4 py-2.5 text-sm",
    md: "px-5 py-3 text-sm",
    lg: "px-6 py-3.5 text-sm",
    icon: "h-11 w-11 p-0",
  };

  return (
    <Component
      type={Component === "button" ? type : undefined}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60",
        buttonVariants[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function AdminCard({ children, className = "", tone = "default", as: Component = "section", ...props }) {
  const toneClasses = {
    default:
      "border-white/10 bg-white/[0.05] shadow-[0_18px_60px_rgba(2,8,23,0.25)] backdrop-blur-xl",
    muted:
      "border-white/10 bg-slate-950/65 shadow-[0_18px_60px_rgba(2,8,23,0.3)] backdrop-blur-xl",
    gradient:
      "border-cyan-300/15 bg-[linear-gradient(140deg,rgba(34,211,238,0.14),rgba(15,23,42,0.7),rgba(139,92,246,0.16))] shadow-[0_24px_80px_rgba(14,165,233,0.12)] backdrop-blur-xl",
  };

  return (
    <Component
      className={clsx(
        "relative overflow-hidden rounded-[1.75rem] border p-6",
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      {children}
    </Component>
  );
}

export function AdminField({ label, hint, required = false, className = "", children }) {
  return (
    <label className={clsx("block", className)}>
      <span className="mb-2.5 block text-sm font-medium text-slate-100">
        {label}
        {required ? <span className="ml-1 text-cyan-200">*</span> : null}
      </span>
      {children}
      {hint ? <span className="mt-2 block text-xs leading-6 text-slate-400">{hint}</span> : null}
    </label>
  );
}

export function AdminInput({ className = "", ...props }) {
  return (
    <input
      className={clsx(
        "w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white shadow-inner shadow-black/20 transition duration-300 placeholder:text-slate-500 focus:border-cyan-300/40 focus:bg-white/[0.08]",
        className,
      )}
      {...props}
    />
  );
}

export function AdminTextarea({ className = "", rows = 5, ...props }) {
  return (
    <textarea
      rows={rows}
      className={clsx(
        "w-full rounded-[1.4rem] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white shadow-inner shadow-black/20 transition duration-300 placeholder:text-slate-500 focus:border-cyan-300/40 focus:bg-white/[0.08]",
        className,
      )}
      {...props}
    />
  );
}

export function AdminSearchInput({ className = "", wrapperClassName = "", ...props }) {
  return (
    <div className={clsx("relative", wrapperClassName)}>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        size={16}
      />
      <AdminInput className={clsx("rounded-full py-3 pl-11 pr-4", className)} {...props} />
    </div>
  );
}

export function AdminMetricCard({ label, value, icon: Icon, change, accent = "cyan", description }) {
  const accents = {
    cyan: "from-cyan-400/18 via-sky-400/10 to-transparent text-cyan-100",
    violet: "from-violet-400/20 via-fuchsia-400/10 to-transparent text-violet-100",
    emerald: "from-emerald-400/20 via-teal-400/10 to-transparent text-emerald-100",
    amber: "from-amber-300/20 via-orange-400/10 to-transparent text-amber-100",
  };

  return (
    <AdminCard className="min-h-[190px]">
      <div className={clsx("absolute inset-0 bg-gradient-to-br", accents[accent])} />
      <div className="relative flex h-full flex-col justify-between gap-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-300">{label}</p>
            <p className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">{value}</p>
          </div>
          {Icon ? (
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-white">
              <Icon size={20} />
            </div>
          ) : null}
        </div>
        <div className="space-y-2">
          {change ? <p className="text-sm font-medium text-slate-100">{change}</p> : null}
          {description ? <p className="text-sm leading-6 text-slate-400">{description}</p> : null}
        </div>
      </div>
    </AdminCard>
  );
}

export function AdminModal({ isOpen, title, eyebrow, description, onClose, children, className = "" }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.16),transparent_30%)]" />
      <AdminCard
        tone="muted"
        className={clsx(
          "relative z-10 max-h-[calc(100vh-2rem)] w-full max-w-5xl overflow-y-auto border-white/10 bg-slate-950/90 p-6 sm:p-7",
          className,
        )}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="max-w-2xl">
            {eyebrow ? <p className="eyebrow-text">{eyebrow}</p> : null}
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-[2rem]">{title}</h2>
            {description ? <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p> : null}
          </div>
          <AdminButton
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0 border border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
            aria-label="Close modal"
          >
            <X size={18} />
          </AdminButton>
        </div>
        {children}
      </AdminCard>
    </div>
  );
}

export function AdminDataTable({
  columns,
  rows,
  renderActions,
  emptyState = "No items found.",
  mobileTitleKey,
}) {
  if (!rows.length) {
    return (
      <AdminCard className="border-dashed text-center">
        <p className="text-sm text-slate-400">{emptyState}</p>
      </AdminCard>
    );
  }

  const primaryKey = mobileTitleKey ?? columns[0]?.key;

  return (
    <>
      <div className="hidden overflow-hidden rounded-[1.6rem] border border-white/10 bg-slate-950/55 md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/[0.04]">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={clsx(
                      "px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400",
                      column.headerClassName,
                    )}
                  >
                    {column.header}
                  </th>
                ))}
                {renderActions ? (
                  <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                    Actions
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((row) => (
                <tr key={row.id} className="transition duration-300 hover:bg-white/[0.03]">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={clsx("px-5 py-4 align-top text-sm leading-7 text-slate-200", column.cellClassName)}
                    >
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                  {renderActions ? (
                    <td className="px-5 py-4 align-top">
                      <div className="flex justify-end gap-2">{renderActions(row)}</div>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 md:hidden">
        {rows.map((row) => (
          <AdminCard key={row.id} className="space-y-4 p-5">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-100/70">
                {columns.find((column) => column.key === primaryKey)?.header ?? "Item"}
              </p>
              <div className="text-base font-semibold text-white">
                {columns.find((column) => column.key === primaryKey)?.render
                  ? columns.find((column) => column.key === primaryKey)?.render(row)
                  : row[primaryKey]}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {columns
                .filter((column) => column.key !== primaryKey)
                .map((column) => (
                  <div key={column.key}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                      {column.header}
                    </p>
                    <div className="mt-2 text-sm leading-7 text-slate-200">
                      {column.render ? column.render(row) : row[column.key]}
                    </div>
                  </div>
                ))}
            </div>

            {renderActions ? <div className="flex justify-end gap-2">{renderActions(row)}</div> : null}
          </AdminCard>
        ))}
      </div>
    </>
  );
}
