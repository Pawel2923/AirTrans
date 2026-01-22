import MobileBottomNav from "./MobileBottomNav";
import MobileTopNav from "./MobileTopNav";

interface MobileNavProps {
  auth: boolean;
  isActive: (path: string) => boolean;
}

const MobileNav = ({ auth, isActive }: MobileNavProps) => {
  return (
    <>
        <MobileTopNav auth={auth} />
        <MobileBottomNav auth={auth} isActive={isActive} />
    </>
  );
};

export default MobileNav;
