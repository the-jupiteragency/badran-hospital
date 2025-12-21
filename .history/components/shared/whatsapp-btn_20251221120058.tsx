import Image from "next/image";
import Link from "next/link";

export function WhatsAppButton() {
  const phoneNumber = "201234567890"; // Replace with actual WhatsApp number
  const message = "Hello, I would like to inquire about your services";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      aria-label="Contact us on WhatsApp"
    >
      <Image
        src="/icons/whatsapp.svg"
        alt="WhatsApp"
        width={52}
        height={52}
        className="group-hover:scale-110 transition-transform"
      />
    </Link>
  );
}
