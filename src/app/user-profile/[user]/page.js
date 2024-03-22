import { currentUser } from "@clerk/nextjs";

const ProfilePage = async () => {
  const user = await currentUser();
  const profilePicture = user.profileImageUrl;
  let username;
  if (user && user.username) {
    username = user.username;
  } else if (user && user.firstName && user.lastName) {
    username = `${user.firstName} ${user.lastName}`;
  } else {
    username = "Anonymous";
  }
  console.log(profilePicture);

  return (
    <div>
      <div className="text-center">
        <img
          src={profilePicture}
          className="rounded-full w-32 h-32 object-cover mx-auto mt-8"
          alt="Profile"
        />
        <h1 className="text-xl mt-4">{username}&#39;s Page</h1>
      </div>
      <div>
        <h1>Blog Posts</h1>
      </div>
    </div>
  );
};

export default ProfilePage;
