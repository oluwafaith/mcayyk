import { site, telHref } from "@/lib/site";
import { PhoneIcon } from "./Icons";

/** Thumb-friendly booking bar, mobile only. */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/90 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_-12px_rgb(0_0_0/0.18)] backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a href={telHref(site.phones[0])} className="btn btn-outline min-h-12 px-3">
          <PhoneIcon />
          Call Now
        </a>
        <a href="#contact" className="btn btn-gold min-h-12 px-3">
          Book Now
        </a>
      </div>
    </div>
  );
}
