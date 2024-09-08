/**
 * @file UserAvatar.js component
 * @brief Global component to display user avatar
 *
 * Global component to display user avatar
 */
import { useEffect, useState } from "react";
import { Avatar } from "antd";
import avatarDefault from "assets/images/avatarDefault.jpg"
import useAvatarUrl from "components/AvatarCustomUrl/useAvatarUrl";

/**
 * @brief to display user avatar
 * @param userId ID of the collaborator
 * @param userName firstname of the collaborator
 * @param size Size of the display image
 */
const UserAvatar = ({ userId, userName, size }) => {
  const [id, setId] = useState(null)
  useEffect(() => {
    setId(userId)
  }, [userId])
  const userAvatarUrl = useAvatarUrl(id);
  const avatarWidth = size ? size : "32px";

  return (
    <Avatar
      src={userAvatarUrl ? userAvatarUrl : avatarDefault}
      alt={`Avatar image of ${userName}`}
      style={{ width: avatarWidth }}
    />
  );
};

export default UserAvatar;
