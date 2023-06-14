interface IProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<IProps> = ({ children }) => {
  return (
    <main>
      <section className="container mx-auto grid min-h-screen place-items-center px-4">
        {children}
      </section>
    </main>
  );
};

export default AuthLayout;
