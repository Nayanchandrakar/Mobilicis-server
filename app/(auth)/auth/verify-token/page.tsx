import { TokenVerification } from "./_components/token-verifction";

interface VerifyTokenPageProps {
  searchParams: {
    token: string;
  };
}

const VerifyTokenPage = async ({ searchParams }: VerifyTokenPageProps) => {
  const { token } = searchParams;
  if (!token) {
    return "";
  }

  return <TokenVerification token={token} />;
};

export default VerifyTokenPage;
