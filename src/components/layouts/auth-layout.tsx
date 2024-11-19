import { Toaster } from 'sonner';

interface AuthLayoutProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  linkText?: string;
  linkHref?: string;
  linkLabel?: string;
}

export default function AuthLayout({
  title,
  description,
  children,
}: AuthLayoutProps) {
  return (
    <>
      <span>{title}</span>
      <span>{description}</span>
      <span>{children}</span>
      <Toaster position='bottom-right' richColors />
    </>
  );
}
