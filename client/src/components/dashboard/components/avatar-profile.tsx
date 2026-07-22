import { avatarWithName } from "@/lib/utils";
import { useAuthState } from "@/store/useAuthState";

export function AvatarProfile() {
  const { user } = useAuthState();
  const letters = avatarWithName(user?.name || "");
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-primary group-hover:text-primary-foreground bg-secondary">
      {letters}
    </div>
  );
}
