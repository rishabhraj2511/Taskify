export default function Button({
  children,
  variant = 'primary',
  className = '',
  style = {},
  ...props
}) {
  const variantClass = variant === 'ghost'
    ? 'btn-ghost'
    : variant === 'secondary'
      ? 'btn-secondary'
      : 'btn-primary';

  return (
    <button
      className={`${variantClass} ${className}`.trim()}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}
