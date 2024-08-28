import { createPortal } from "react-dom";
import PortalAside from "../../features/shared/PortalAside";

type usePortalProps = {
  message: string;
  variant?: "danger" | "success" | null | undefined;
};

export default function usePortal({ message, variant }: usePortalProps) {
  return createPortal(
    <PortalAside variant={variant}>{message}</PortalAside>,
    document.body
  );
}
