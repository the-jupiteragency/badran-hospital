import Image from "next/image";
import Link from "next/link";

interface WhatsAppButtonProps {
  className?: string
}

export function WhatsAppButton({ className }: WhatsAppButtonProps) {
  const phoneNumber = "201029640837"; // Updated WhatsApp number
  const message = "Hello, I would like to inquire about your services";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  // Default fixed styles if no className provided, or just merge them? 
  // User wants it to be part of FAB, so it shouldn't be fixed by default if passed a className?
  // Let's just allow className to append/override.
  // Actually, for FAB usage, we usually strip 'fixed bottom-6 right-6'.
  
  const defaultClasses = "fixed bottom-6 right-6 z-50"
  const appliedClasses = className ? className : defaultClasses

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${appliedClasses} hover:scale-110 transition-transform duration-300 flex items-center justify-center group`}
      aria-label="Contact us on WhatsApp"
    >
      <Image
        src="/icons/whatsapp.svg"
        alt="WhatsApp"
        width={48}
        height={48}
        className="group-hover:scale-110 transition-transform"
      />
    </Link>
  );
}
