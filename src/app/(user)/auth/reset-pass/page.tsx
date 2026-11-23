import ResetPasswordContent from "../_components/ResetPasswordContent";


type Props = {
  searchParams: Promise<{
    token?: string;
  }>;
};

const ResetPasswordPage = async ({ searchParams }: Props) => {
  const { token } = await searchParams;

  return (
    <ResetPasswordContent resetPasswordToken={token ?? null} />
  );
};

export default ResetPasswordPage;
