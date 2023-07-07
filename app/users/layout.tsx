import getUsers from "@/lib/getUsers";
import Sidebar from "@/components/Sidebar.client";
import User from "@/components/User.client";
import getServerAuthSession from "@/lib/getServerAuthSession";

interface IProps {
  children: React.ReactNode;
}

const UsersLayout: React.FC<IProps> = async ({ children }) => {
  const session = await getServerAuthSession();
  const users = await getUsers();
  return (
    <main className="flex h-screen w-full">
      <Sidebar session={session}>
        <ul className="mt-4 h-[calc(100%-118px)] overflow-y-auto overflow-x-clip md:h-[calc(100%-150px)]">
          {users.map((user, i) => (
            <li key={i} className="py-1">
              <User
                id={user.id}
                image={user.image}
                name={user.name}
                key={user.id}
              />
            </li>
          ))}
        </ul>
      </Sidebar>
      {children}
    </main>
  );
};

export default UsersLayout;
