import LoginForm from "@/components/form/login-form";

const LoginPage = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold text-center">Login</h1>
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
