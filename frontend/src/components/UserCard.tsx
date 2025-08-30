interface UserCardProps {
  name: string;
  email: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, email }) => {
  return (
    <div className="bg-white border flex flex-col gap-2 border-gray-200 p-8 md:p-12 lg:p-16 shadow-md rounded-lg mt-4 w-full max-w-xl mx-auto">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
        Welcome, {name} !
      </h2>
      <p className="text-gray-600 text-sm sm:text-base md:text-lg">
        Email: {email}
      </p>
    </div>
  );
};

export default UserCard;